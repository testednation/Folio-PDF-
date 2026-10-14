// Folio XFA validation runtime. Runs in a Web Worker that is terminated after each run.
// It executes the form's own <validate> scripts (JavaScript) against current values,
// with a best-effort emulation of the Acrobat/XFA object model. No network or storage access.
for (const k of ['indexedDB','caches','fetch','XMLHttpRequest','WebSocket','EventSource','importScripts','BroadcastChannel','navigator'])
  try { Object.defineProperty(self, k, { value: undefined, configurable: false }); } catch (e) {}

// A proxy that silently absorbs any property access, assignment or call (for UI styling APIs we don't model).
const HOLE = new Proxy(function () {}, {
  get: (t, k) => k === Symbol.toPrimitive ? () => '' : k === 'toString' || k === 'valueOf' ? () => '' : k === 'length' ? 0 : HOLE,
  set: () => true, apply: () => HOLE, construct: () => HOLE, has: () => false });

function pictureOk(pic, v) {
  if (!pic || !v) return true;
  const m = pic.match(/^\s*(date|text|num|time)?\{(.*)\}\s*$/i); const kind = (m ? m[1] || 'text' : 'text').toLowerCase(), p = m ? m[2] : pic;
  if (kind === 'date') {
    let re = '', groups = [];
    const toks = p.match(/YYYY|YY|MMM|MM|M|DD|D|[^YMD]+/g) || [];
    for (const t of toks) {
      if (t === 'YYYY') { re += '(\\d{4})'; groups.push('Y'); } else if (t === 'YY') { re += '(\\d{2})'; groups.push('y'); }
      else if (t === 'MM') { re += '(\\d{2})'; groups.push('M'); } else if (t === 'M') { re += '(\\d{1,2})'; groups.push('M'); }
      else if (t === 'DD') { re += '(\\d{2})'; groups.push('D'); } else if (t === 'D') { re += '(\\d{1,2})'; groups.push('D'); }
      else if (t === 'MMM') { re += '([A-Za-z]{3})'; groups.push('x'); } else re += t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    const mm = new RegExp('^' + re + '$').exec(v.trim()); if (!mm) {
      // XFA also accepts the canonical form YYYY-MM-DD / YYYYMMDD
      return /^\d{4}-?\d{2}-?\d{2}$/.test(v.trim()) && !isNaN(Date.parse(v.trim().replace(/^(\d{4})-?(\d{2})-?(\d{2})$/, '$1-$2-$3')));
    }
    let Y = 2000, M = 1, D = 1; groups.forEach((g, i) => { const n = +mm[i + 1]; if (g === 'Y') Y = n; if (g === 'y') Y = 2000 + n; if (g === 'M') M = n; if (g === 'D') D = n; });
    const d = new Date(Date.UTC(Y, M - 1, D)); return d.getUTCMonth() === M - 1 && d.getUTCDate() === D;
  }
  if (kind === 'text') {
    let re = ''; for (const c of p) re += c === '9' ? '\\d' : c === 'A' ? '[A-Za-z]' : c === 'X' ? '.' : c === 'O' || c === '0' ? '[A-Za-z0-9]' : c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('^' + re + '$').test(v);
  }
  if (kind === 'num') return !isNaN(+String(v).replace(/[ ,$]/g, ''));
  return true;
}

self.onmessage = ev => {
  const { tree, values } = ev.data, issues = new Map(), stats = { scripts: 0, ran: 0, failed: 0, errors: 0 };
  const flag = (n, msg, kind) => { if (!n || !n.uid) return; if (!issues.has(n.uid) || kind === 'script') issues.set(n.uid, { uid: n.uid, msg, kind }); };
  // ---- build node graph
  const all = [];
  (function link(o, parent) { o.parent = parent; all.push(o); (o.children || []).forEach(c => link(c, o)); })(tree, null);
  const valOf = n => {
    if (n.cls === 'field') { const r = values[n.uid]; return r ? r.v : null; }
    if (n.cls === 'exclGroup') { for (const c of n.children || []) { const r = values[c.uid]; if (r && r.on) return r.on; } return null; }
    return null; };
  const present = n => { if (n.cls === 'field') return !!(values[n.uid] && values[n.uid].vis);
    if (n.cls === 'exclGroup') return (n.children || []).some(c => values[c.uid] && values[c.uid].vis); return true; };
  const somOf = n => { const parts = []; for (let x = n; x; x = x.parent) if (x.name) { const sib = x.parent ? (x.parent.children || []).filter(s => s.name === x.name) : [x]; parts.unshift(x.name + '[' + Math.max(0, sib.indexOf(x)) + ']'); } return 'xfa[0].form[0].' + parts.join('.'); };
  const findChild = (n, name) => { // named child, looking through unnamed containers
    for (const c of n.children || []) { if (c.name === name) return c; }
    for (const c of n.children || []) if (!c.name && c.cls !== 'field') { const r = findChild(c, name); if (r) return r; }
    return null; };
  const cache = new Map(); let current = null;
  const proxyOf = n => {
    if (!n) return null; if (cache.has(n)) return cache.get(n);
    const local = {};
    const api = {
      get rawValue() { const v = local.hasOwnProperty('rv') ? local.rv : valOf(n); return v === '' ? null : v; },
      set rawValue(v) { local.rv = v == null ? null : String(v); },
      get formattedValue() { return api.rawValue == null ? '' : String(api.rawValue); },
      get isNull() { return api.rawValue == null || api.rawValue === ''; },
      get name() { return n.name; }, get className() { return n.cls; }, get somExpression() { return somOf(n); },
      get parent() { return proxyOf(n.parent); }, get index() { const s = n.parent ? (n.parent.children || []).filter(x => x.name === n.name) : []; return Math.max(0, s.indexOf(n)); },
      get presence() { return local.presence || (present(n) ? 'visible' : 'hidden'); }, set presence(v) { local.presence = v; },
      get mandatory() { return local.mandatory || (n.validate && n.validate.nullTest) || 'disabled'; }, set mandatory(v) { local.mandatory = v; },
      get access() { return 'open'; }, set access(v) {},
      get validationMessage() { return (n.validate && n.validate.msgs && (n.validate.msgs.scriptTest || n.validate.msgs.nullTest)) || ''; }, set validationMessage(v) {},
      get formatMessage() { return (n.validate && n.validate.msgs && n.validate.msgs.formatTest) || ''; }, set formatMessage(v) {},
      get mandatoryMessage() { return (n.validate && n.validate.msgs && n.validate.msgs.nullTest) || ''; }, set mandatoryMessage(v) {},
      get nodes() { const a = (n.children || []).map(proxyOf); a.item = i => a[i]; a.namedItem = nm => proxyOf(findChild(n, nm)); return a; },
      get length() { return 1; }, get all() { const s = n.parent ? (n.parent.children || []).filter(x => x.name === n.name) : [n]; const a = s.map(proxyOf); a.item = i => a[i]; return a; },
      resolveNode: som => proxyOf(resolve(som, n)), resolveNodes: som => { const r = resolve(som, n); const a = r ? [proxyOf(r)] : []; a.item = i => a[i]; return a; },
      execValidate: () => true, execEvent: () => {}, execInitialize: () => {}, execCalculate: () => {},
      getAttribute: () => '', setAttribute: () => {}, isPropertySpecified: () => false, clearItems: () => {}, addItem: () => {},
      boundItem: v => v, getDisplayItem: () => '', getSaveItem: () => '', get selectedIndex() { return -1; }, set selectedIndex(v) {},
      get instanceManager() { return HOLE; }, get ui() { return HOLE; }, get border() { return HOLE; }, get font() { return HOLE; },
      get caption() { return HOLE; }, get fillColor() { return ''; }, set fillColor(v) {}, get borderColor() { return ''; }, set borderColor(v) {},
      get fontColor() { return ''; }, set fontColor(v) {}, get assist() { return HOLE; }, get value() { return api.rawValue; }, set value(v) { api.rawValue = v; },
      toString() { return api.rawValue == null ? '' : String(api.rawValue); }, valueOf() { return api.rawValue; },
    };
    const p = new Proxy(api, {
      get(t, k) { if (k in t) return t[k]; if (typeof k !== 'string') return undefined;
        const c = findChild(n, k); if (c) return proxyOf(c);
        const so = scriptObj(n, k); if (so) return so; return HOLE; },
      set(t, k, v) { if (k in t) { t[k] = v; } return true; } });
    cache.set(n, p); return p; };
  // ---- script objects (<variables><script name=...>)
  const soCache = new Map();
  function scriptObj(n, name) { const v = (n.vars || []).find(s => s.name === name); if (!v) return null; const key = n.uid + ':' + name;
    if (soCache.has(key)) return soCache.get(key); const obj = {}; soCache.set(key, obj);
    const fnNames = [...(v.code || '').matchAll(/^\s*function\s+([A-Za-z_$][\w$]*)/gm)].map(m => m[1]);
    const varNames = [...(v.code || '').matchAll(/^\s*var\s+([A-Za-z_$][\w$]*)/gm)].map(m => m[1]);
    try { const f = new Function('__s', 'with(__s){' + v.code + '\n;return {' + [...new Set([...fnNames, ...varNames])].map(x => x + ':typeof ' + x + '!=="undefined"?' + x + ':undefined').join(',') + '}}');
      Object.assign(obj, f(scopeFor(n)));
      for (const k of Object.keys(obj)) if (typeof obj[k] === 'function') { const fn = obj[k];
        if (/mark.*(incorrect|invalid|error|wrong)|setinvalid/i.test(k)) obj[k] = function (fld) { if (fld && fld.somExpression && current) flagBySom(fld, current); return HOLE; };
        else if (/mark.*(correct|valid)/i.test(k) && !/incorrect|invalid/i.test(k)) obj[k] = function () { return HOLE; };
        else obj[k] = function () { return fn.apply(this, arguments); }; }
    } catch (e) { stats.errors++; }
    return obj; }
  const bySom = new Map(); all.forEach(n => bySom.set(somOf(n), n));
  function flagBySom(fp, cur) { const n = bySom.get(fp.somExpression) || cur.n; flag(n, cur.msg, 'script'); cur.failed = true; }
  function resolve(som, from) { if (!som) return null; som = String(som).replace(/^\$form\.|^xfa\.form\.|^xfa\[0\]\.form\[0\]\./, '');
    if (som.startsWith('$.')) { som = som.slice(2); } else if (som === '$') return from;
    if (bySom.has('xfa[0].form[0].' + som)) return bySom.get('xfa[0].form[0].' + som);
    const parts = som.split('.').map(s => s.replace(/\[\d+\]|\[\*\]/g, '')).filter(Boolean);
    for (let base = from; base; base = base.parent) { let cur = base, ok = true;
      for (const p of parts) { if (p === '#subform' || p === '#field') continue; const c = cur.name === p && cur === base && parts.length > 1 ? cur : findChild(cur, p); if (!c) { ok = false; break; } cur = c; }
      if (ok) return cur; }
    return null; }
  // ---- globals
  const host = { messageBox: m => { if (current) { flag(current.n, current.msg || String(m).slice(0, 300), 'script'); const it = issues.get(current.n.uid); if (it && !it.detail) it.detail = String(m).replace(/\[object Object\]|undefined/g, '').split(/\n+/).map(s => s.trim()).filter(Boolean).slice(-2).join(' ').slice(0, 240); current.failed = true; } return 1; },
    setFocus() {}, resetData() {}, beep() {}, gotoURL() {}, response: () => '', get validationsEnabled() { return true; }, set validationsEnabled(v) {},
    get name() { return 'Acrobat'; }, get appType() { return 'Exchange-Pro'; }, get version() { return '11.0'; }, get platform() { return 'WIN'; },
    get language() { return 'ENU'; }, get numPages() { return 1; }, get currentPage() { return 0; }, set currentPage(v) {}, get title() { return ''; }, get variation() { return 'Full'; } };
  const xfa = { host, event: { newText: '', prevText: '', change: '', target: HOLE, fullText: '' }, layout: { page: () => 1, pageCount: () => 1, relayout() {}, absPageCount: () => 1, pageSpan: () => 1 },
    resolveNode: s => proxyOf(resolve(s, tree)), resolveNodes: s => { const r = resolve(s, tree); const a = r ? [proxyOf(r)] : []; a.item = i => a[i]; return a; },
    form: null, record: HOLE, datasets: HOLE, config: HOLE, template: HOLE, connectionSet: HOLE, signature: HOLE, sequence: HOLE, context: HOLE };
  xfa.form = new Proxy({}, { get: (t, k) => k === 'resolveNode' ? xfa.resolveNode : k === 'execValidate' || k === 'recalculate' || k === 'execCalculate' || k === 'execInitialize' || k === 'remerge' ? () => true : typeof k === 'string' ? (findChild(tree, k) ? proxyOf(findChild(tree, k)) : HOLE) : undefined, set: () => true });
  const util = { printd: (f, d) => { d = d instanceof Date ? d : new Date(); const z = x => String(x).padStart(2, '0'); return String(f).replace(/yyyy/g, d.getFullYear()).replace(/mm/g, z(d.getMonth() + 1)).replace(/dd/g, z(d.getDate())); },
    scand: (f, s) => { const d = new Date(String(s).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')); return isNaN(d) ? null : d; }, printf: (f, ...a) => a.join(' '), printx: (f, s) => s };
  const app = { alert: m => host.messageBox(m), beep() {}, viewerType: 'Exchange-Pro', viewerVersion: 11, platform: 'WIN', language: 'ENU' };
  const globals = { globInvoker: { value: 'U' }, globValidatePressed: { value: 'true' }, xfa, app, util, event: xfa.event, console: { println() {}, show() {}, clear() {} }, $host: host, $form: xfa.form, $layout: xfa.layout, $event: xfa.event };
  const CORE = new Set(['xfa', 'app', 'event', 'console', '$host', '$form', '$layout', '$event']);
  function scopeFor(n) {
    return new Proxy({}, {
      has(t, k) { if (typeof k !== 'string' || k === '__s' || k === '__c') return false; if (k in globals) return true;
        for (let x = n; x; x = x.parent) { if (x.name === k || findChild(x, k) || (x.vars || []).some(v => v.name === k)) return true; }
        return !(k in self); },
      get(t, k) { if (k === Symbol.unscopables) return undefined; if (CORE.has(k)) return globals[k];
        for (let x = n; x; x = x.parent) { if (x.name === k) return proxyOf(x); const c = findChild(x, k); if (c) return proxyOf(c); const so = scriptObj(x, k); if (so) return so; }
        if (k in globals) return globals[k]; return HOLE; },
      set(t, k, v) { globals[k] = v; return true; } }); }
  // ---- run
  for (const n of all) {
    const V = n.validate; if (!V || (n.cls !== 'field' && n.cls !== 'exclGroup') || !present(n)) continue;
    const label = (V.msgs && (V.msgs.scriptTest || V.msgs.nullTest || V.msgs.formatTest)) || '';
    const raw = valOf(n), empty = raw == null || raw === '';
    if (empty && V.nullTest === 'error') { flag(n, (V.msgs && V.msgs.nullTest) || label, 'null'); continue; }
    if (!empty && V.picture && V.formatTest !== 'disabled' && !pictureOk(V.picture, String(raw))) flag(n, (V.msgs && V.msgs.formatTest) || ('Must match ' + V.picture), 'format');
    if (V.script && !/formcalc/i.test(V.scriptType || '')) {
      stats.scripts++; current = { n, msg: (V.msgs && (V.msgs.scriptTest || V.msgs.formatTest)) || 'This value is not valid', failed: false };
      try { const r = new Function('__s', '__c', 'with(__s){return eval(__c)}').call(proxyOf(n), scopeFor(n), V.script); stats.ran++;
        if (r === false || (Array.isArray(r) && r[0] === false)) { flag(n, current.msg, 'script'); current.failed = true; }
      } catch (e) { stats.errors++; if (stats.errors < 6) (stats.errSamples = stats.errSamples || []).push(String(e).slice(0, 160)); }
      if (current.failed) stats.failed++; current = null; }
  }
  postMessage({ issues: [...issues.values()], stats });
};
