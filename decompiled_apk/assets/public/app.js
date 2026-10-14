// Folio: local-only PDF editor shell around Mozilla pdf.js. No network, no analytics.
const $=id=>document.getElementById(id),frame=$('frame');let cur=null;
const db=new Promise((r,j)=>{const q=indexedDB.open('folio',2);q.onupgradeneeded=()=>{const d=q.result;for(const n of['docs','profiles','templates'])if(!d.objectStoreNames.contains(n))d.createObjectStore(n,{keyPath:'id'})};q.onsuccess=()=>r(q.result);q.onerror=j});
async function st(mode,f,store='docs'){const d=await db;return new Promise((r,j)=>{const t=d.transaction(store,mode),q=f(t.objectStore(store));t.oncomplete=()=>r(q&&q.result);t.onerror=j})}
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),2200)}
const pct=d=>d.loc&&d.pages?Math.round(100*d.loc.page/d.pages):0;
async function listRecent(){const all=(await st('readonly',s=>s.getAll())||[]).sort((a,b)=>(b.seen||b.t)-(a.seen||a.t)),ul=$('recent'),q=$('q').value.trim().toLowerCase();ul.innerHTML='';$('none').hidden=all.length>0;$('q').hidden=all.length<4&&!q;
  const c=all.find(d=>d.loc&&d.loc.page>1);$('cont').hidden=!c||!!q;
  if(c){$('contCard').innerHTML=`<div class="contc">${c.thumb?`<img src="${c.thumb}">`:''}<div class="meta" style="flex:1;min-width:0"><div class="nm"></div><div class="sub">${c.kind&&c.kind!=='pdf'?(c.loc.label||'Reading'):'Page '+c.loc.page+' of '+c.pages} · ${pct(c)}%</div><div class="prog"><i style="width:${pct(c)}%"></i></div></div></div>`;
    $('contCard').querySelector('.nm').textContent=c.name;$('contCard').firstChild.onclick=()=>openDoc(c)}
  for(const d of all){if(q&&!d.name.toLowerCase().includes(q))continue;const li=document.createElement('li');li.innerHTML=`${d.thumb?`<img class="thumbimg" src="${d.thumb}">`:`<div class="doc">${(d.kind&&d.kind!=='pdf'?d.kind:'pdf').toUpperCase()}</div>`}<div class="meta"><div class="nm"></div><div class="sub">${new Date(d.seen||d.t).toLocaleDateString()} · ${d.kind&&d.kind!=='pdf'?d.kind.toUpperCase():d.pages?d.pages+' pages':(d.size/1024|0)+' KB'}${d.xfa?' · XFA':''}${(d.bms||[]).length?' · 🔖'+d.bms.length:''}</div>${pct(d)?`<div class="prog"><i style="width:${pct(d)}%"></i></div>`:''}</div><button class="del" aria-label="Remove">✕</button>`;
    li.querySelector('.nm').textContent=d.name;li.querySelector('.meta').onclick=()=>openDoc(d);
    li.querySelector('.del').onclick=async()=>{if(confirm('Remove from recent?')){await st('readwrite',s=>s.delete(d.id));listRecent()}};ul.appendChild(li)}}
$('openBtn').onclick=()=>$('file').click();
$('file').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const buf=new Uint8Array(await f.arrayBuffer());
  const d={id:Date.now(),name:f.name,data:buf,size:buf.length,t:Date.now()};await st('readwrite',s=>s.put(d));openDoc(d)};
const app=()=>frame.contentWindow.PDFViewerApplication;
async function viewerReady(){while(!(frame.contentWindow&&app()&&app().initializedPromise))await new Promise(r=>setTimeout(r,50));await app().initializedPromise}
async function openDoc(d){cur=d;xfaTree=null;uidPath=null;$('title').textContent=d.name;$('badge').hidden=true;$('home').hidden=true;$('viewer').hidden=false;
  await viewerReady();await app().open({data:d.data.slice()});
  const doc=app().pdfDocument;if(doc&&doc.isPureXfa){$('badge').hidden=false;if(!d.xfa){d.xfa=true;st('readwrite',s=>s.put(d))}}}
async function currentBytes(){const doc=app().pdfDocument;return doc.annotationStorage.size?await doc.saveDocument():await doc.getData()}
$('saveBtn').onclick=async()=>{try{await learn();const bytes=await currentBytes();cur.data=bytes;cur.size=bytes.length;cur.t=Date.now();await st('readwrite',s=>s.put(cur));
  await exportFile(bytes,cur.name,false);toast('Saved')}catch(e){alert('Save failed: '+e.message)}};
$('shareBtn').onclick=async()=>{try{await exportFile(await currentBytes(),cur.name,true)}catch(e){if(e.name!=='AbortError')alert('Share failed: '+e.message)}};
async function exportFile(bytes,name,share){const P=window.Capacitor&&Capacitor.Plugins;
  if(P&&P.Filesystem){let b64='';for(let i=0;i<bytes.length;i+=0x8000)b64+=String.fromCharCode.apply(null,bytes.subarray(i,i+0x8000));b64=btoa(b64);
    const r=await P.Filesystem.writeFile({path:'Folio/'+name,data:b64,directory:share?'CACHE':'DOCUMENTS',recursive:true});
    if(share)await P.Share.share({title:name,url:r.uri,dialogTitle:'Share PDF'});return}
  const f=new File([bytes],name,{type:'application/pdf'});
  if(share&&navigator.canShare&&navigator.canShare({files:[f]}))return navigator.share({files:[f]});
  const a=document.createElement('a');a.href=URL.createObjectURL(f);a.download=name;a.click()}
$('back').onclick=async()=>{const doc=app()&&app().pdfDocument;
  if(doc&&doc.annotationStorage.modified&&!confirm('Leave without saving your changes?'))return;
  try{await app().close()}catch(e){}$('viewer').hidden=true;$('home').hidden=false;listRecent();listTemplates()};
listRecent();

// ---- validation: required fields, max length, and common formats (dates, email, numbers)
function nearText(e){const pg=e.closest('.page');if(!pg)return'';const r=e.getBoundingClientRect();let best='',bd=1e9;
  for(const t of pg.querySelectorAll('.xfaRich,.xfaCaption,.xfaDraw,.textLayer span')){if(t.contains(e)||t.querySelector('input,select,textarea'))continue;const s=(t.innerText||t.textContent||'').trim();if(!s||s.length>140)continue;
    const q=t.getBoundingClientRect();if(!q.width)continue;let d;
    if(q.right<=r.left+4&&Math.abs((q.top+q.bottom)/2-(r.top+r.bottom)/2)<r.height)d=r.left-q.right;else if(q.bottom<=r.top+4&&q.right>r.left-20&&q.left<r.right)d=(r.top-q.bottom)*1.2;else continue;
    if(d<bd&&d<160){bd=d;best=s}}return best}
function labelOf(e){let l=e.getAttribute('aria-label')||e.getAttribute('title');
  if(!l){const f=e.closest('.xfaField,.xfaExclgroup,.xfaWrapper');const c=f&&f.querySelector('.xfaCaption');if(c&&c.innerText.trim())l=c.innerText}
  if(!l&&e.id){try{const lb=e.ownerDocument.querySelector(`label[for="${CSS.escape(e.id)}"]`);if(lb)l=lb.innerText}catch(x){}}
  if(!l)l=nearText(e);
  if(!l){let n=e;for(let k=0;k<3&&n&&!l;k++){n=n.parentElement;const t=n&&(n.innerText||'').trim();if(t&&t.length<120&&t!==(e.value||'').trim())l=t}}
  if(!l){let n=e;for(let k=0;k<5&&n&&!l;k++){n=n.parentElement;const t=n&&(n.innerText||'').trim();if(t&&t.length<200)l=t}}
  if(!l){const pg=e.closest('.page');l='Field on page '+(pg?pg.dataset.pageNumber:'?')}return l.replace(/\s+/g,' ').trim().slice(0,120)}
async function renderAll(){const A=app(),d=frame.contentWindow.document,keep=A.page;toast('Checking all pages…');
  for(let i=1;i<=A.pagesCount;i++){const sel=`.page[data-page-number="${i}"] .xfaLayer, .page[data-page-number="${i}"] .annotationLayer`;
    if(!d.querySelector(sel)){A.page=i;for(let t=0;t<40&&!d.querySelector(sel);t++)await new Promise(r=>setTimeout(r,50))}}A.page=keep}
function fieldValues(){const d=frame.contentWindow.document,vals={};
  d.querySelectorAll('[fieldid]').forEach(e=>{const id=e.getAttribute('fieldid'),vis=!!e.offsetParent&&getComputedStyle(e).visibility!=='hidden';
    if(e.type==='radio'||e.type==='checkbox')vals[id]={v:e.checked?(e.getAttribute('xfaon')||'1'):(e.type==='checkbox'?(e.getAttribute('xfaoff')||'0'):null),on:e.checked?(e.getAttribute('xfaon')||'1'):null,vis};
    else vals[id]={v:e.value,vis}});return vals}
let xfaTree=null;
async function getXfaTree(){if(xfaTree)return xfaTree;try{xfaTree=await app().pdfDocument._transport.messageHandler.sendWithPromise('FolioXfaTree',null)}catch(e){xfaTree=null}return xfaTree}
function runXfaScripts(tree,values){return new Promise(res=>{const w=new Worker('xfa-runtime.js');const t=setTimeout(()=>{w.terminate();res({timeout:true,issues:[],stats:{}})},12000);
  w.onmessage=e=>{clearTimeout(t);w.terminate();res(e.data)};w.onerror=e=>{clearTimeout(t);w.terminate();res({error:e.message,issues:[],stats:{}})};w.postMessage({tree,values})})}
function checkText(e,lab,req,scripted){const v=(e.value||'').trim();if(!v)return req?'Required field is empty':null;
  const ml=+e.getAttribute('maxlength');if(ml>0&&v.length>ml)return`Too long (${v.length}/${ml})`;if(e.type==='number'&&isNaN(+v))return'Must be a number';
  if(scripted)return null;const L=lab.toLowerCase();
  if(/e-?mail/.test(L)&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))return'Not a valid email address';
  if(/yyyymmdd/.test(L)){const m=v.match(/^(\d{4})(\d{2})(\d{2})$/);return(!m||isNaN(Date.parse(`${m[1]}-${m[2]}-${m[3]}`)))?'Use the date format YYYYMMDD':null}
  if(/yyyy-mm-dd|\bdate\b/.test(L)&&!/yyyy|year|month|day|\bmm\b|\bdd\b/.test(L.replace('yyyy-mm-dd','')))return(!/^\d{4}-\d{2}-\d{2}$/.test(v)||isNaN(Date.parse(v)))?'Use the date format YYYY-MM-DD':null;
  if(/\byear\b|\byyyy\b/.test(L)&&!/^(19|20)\d{2}$/.test(v))return'Enter a 4-digit year';
  if(/\bmonth\b|\bmm\b/.test(L)&&!(/^\d{1,2}$/.test(v)&&+v>=1&&+v<=12))return'Month must be 01–12';
  if(/\bday\b|\bdd\b/.test(L)&&!(/^\d{1,2}$/.test(v)&&+v>=1&&+v<=31))return'Day must be 01–31';
  if(/(phone|telephone|postal code|zip)/.test(L)&&/[^0-9 ()+\-a-z]/i.test(v))return'Contains invalid characters';return null}
async function validate(opt={}){await renderAll();const w=frame.contentWindow,d=w.document,issues=[];
  const pure=app().pdfDocument.isPureXfa;let formStats=null;
  if(pure){const tree=await getXfaTree();if(tree){const r=await runXfaScripts(tree,fieldValues());formStats=r.stats||{};formStats.timeout=r.timeout;
    for(const i of r.issues){const e=d.querySelector(`[fieldid="${i.uid}"]`);if(e)issues.push({e,lab:(i.msg||labelOf(e)).replace(/\s+/g,' ').trim().slice(0,160),msg:i.kind==='null'?'Required field is empty':i.kind==='format'?'Wrong format':(i.detail||'Fails the form\'s validation rule')})}}}
  const seen=new Set(issues.map(i=>i.e));
  d.querySelectorAll('.folioBad').forEach(e=>e.classList.remove('folioBad'));
  const els=[...d.querySelectorAll('.xfaLayer input,.xfaLayer select,.xfaLayer textarea,.annotationLayer input,.annotationLayer select,.annotationLayer textarea')];
  const groups={};
  for(const e of els){if(e.disabled||e.type==='hidden'||e.type==='button'||seen.has(e))continue;if(formStats&&e.type!=='radio'&&!e.offsetParent)continue;const lab=labelOf(e),req=e.required||e.getAttribute('aria-required')==='true';
    if(e.type==='radio'||e.type==='checkbox'){if(e.type==='radio'){const k=e.name||lab;(groups[k]=groups[k]||{req:false,on:false,els:[],lab}).els.push(e);groups[k].req||=req;groups[k].on||=e.checked}else if(req&&!e.checked)issues.push({e,lab,msg:'Must be checked'});continue}
    const m=checkText(e,lab,req,!!formStats);if(m)issues.push({e,lab,msg:m})}
  for(const g of Object.values(groups))if(g.req&&!g.on)issues.push({e:g.els[0],lab:g.lab,msg:'Choose one option'});
  issues.forEach(i=>i.e.classList.add('folioBad'));
  const ul=$('issues');ul.innerHTML='';$('shT').textContent=(issues.length?`${issues.length} issue${issues.length>1?'s':''} to fix`:'All fields look good ✓')+(formStats?` · ran ${formStats.ran||0} form scripts`:'');
  issues.forEach(i=>{const li=document.createElement('li');li.textContent=i.lab;const s=document.createElement('small');s.textContent=i.msg;li.appendChild(s);
    li.onclick=()=>{$('sheet').hidden=true;i.e.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(()=>i.e.focus(),400)};ul.appendChild(li)});
  if(!opt.quiet)$('sheet').hidden=false;return issues}
$('valBtn').onclick=()=>validate();$('shX').onclick=()=>$('sheet').hidden=true;
frame.addEventListener('load',()=>frame.contentWindow.document.addEventListener('input',e=>e.target.classList&&e.target.classList.remove('folioBad'),true));

// ---- autofill profiles, learning from saved forms, and reusable templates
const norm=s=>(s||'').toLowerCase().replace(/^[\s\-–]*(part|section|question)?\s*[\divx]+[a-z]?\s*[:.)\-–]\s*/i,'').replace(/\(?(yyyy|mm|dd|yyyymmdd|yyyy-mm-dd)\)?/g,m=>' '+m.replace(/[()]/g,'')+' ').replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
const toks=s=>new Set(norm(s).split(' ').filter(w=>w.length>1&&!['the','of','and','or','your','you','are','is','in','as','on','a','if','to','for','name','s'].includes(w)));
function jacc(a,b){if(!a.size||!b.size)return 0;let i=0;a.forEach(x=>{if(b.has(x))i++});return i/(a.size+b.size-i)}
let uidPath=null;
async function fieldPaths(){if(uidPath)return uidPath;uidPath={};const t=app().pdfDocument.isPureXfa?await getXfaTree():null;
  if(t)(function w(o,p){const q=o.name?[...p,o.name]:p;if(o.uid)uidPath[o.uid]=q.slice(-3).join('.');(o.children||[]).forEach(c=>w(c,q))})(t,[]);return uidPath}
async function fieldList(){await renderAll();const d=frame.contentWindow.document,P=await fieldPaths(),out=[];
  d.querySelectorAll('.xfaLayer input,.xfaLayer select,.xfaLayer textarea,.annotationLayer input,.annotationLayer select,.annotationLayer textarea').forEach(e=>{
    if(e.type==='button'||e.type==='hidden'||e.disabled||e.readOnly)return;const id=e.getAttribute('fieldid');
    const nm=(id&&P[id])||e.name||'';let lab=labelOf(e);if(/^Field on page/.test(lab))lab='';out.push({e,nm,lab})});return out}
function readVal(e){if(e.type==='radio')return e.checked?(e.getAttribute('xfaon')||e.value||'on'):null;if(e.type==='checkbox')return e.checked?'__on':'__off';return e.value}
async function captureAnswers(){const m={};for(const f of await fieldList()){const v=readVal(f.e);if(v==null||v===''||v==='__off')continue;
  const rec={v,lab:f.lab,t:f.e.type};if(f.nm)m['n:'+f.nm+(f.e.type==='radio'?'#r':'')]=rec;if(f.lab)m['l:'+norm(f.lab)+(f.e.type==='radio'?'#r':'')]=rec}return m}
function setVal(e,v){if(e.type==='radio'){const on=(e.getAttribute('xfaon')||e.value||'on');if(String(on)!==String(v))return false;if(!e.checked){e.click()}return true}
  if(e.type==='checkbox'){const want=v==='__on';if(e.checked!==want)e.click();return true}
  if(e.tagName==='SELECT'){if(![...e.options].some(o=>o.value===v))return false}
  if(e.value===v)return false;e.focus();e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));e.blur();return true}
async function applyAnswers(ans){const fields=await fieldList(),labelKeys=Object.keys(ans).filter(k=>k.startsWith('l:')).map(k=>({k,t:toks(k.slice(2).replace('#r',''))}));let n=0;
  for(const f of fields){const r=f.e.type==='radio'?'#r':'',cur=readVal(f.e);if(f.e.type!=='radio'&&f.e.type!=='checkbox'&&cur)continue;
    let hit=(f.nm&&ans['n:'+f.nm+r])||(f.lab&&ans['l:'+norm(f.lab)+r]);
    if(!hit&&f.lab){const ft=toks(f.lab);let best=0,bk=null;for(const L of labelKeys){if(!!r!==L.k.endsWith('#r'))continue;const s=jacc(ft,L.t);if(s>best){best=s;bk=L.k}}if(best>=0.75)hit=ans[bk]}
    if(hit&&setVal(f.e,hit.v))n++}
  return n}
async function learn(){try{const a=await captureAnswers();if(!Object.keys(a).length)return;const L=(await st('readonly',s=>s.get('learned'),'profiles'))||{id:'learned',name:'From your previous forms',ans:{},t:0};
  Object.assign(L.ans,a);L.t=Date.now();L.count=(L.count||0)+1;await st('readwrite',s=>s.put(L),'profiles')}catch(e){}}
async function showFill(){const ul=$('profiles');ul.innerHTML='';const ps=((await st('readonly',s=>s.getAll(),'profiles'))||[]).sort((a,b)=>(a.id==='learned'?-1:b.id==='learned'?1:b.t-a.t));
  if(!ps.length)ul.innerHTML='<li><div class="meta muted">No saved answers yet. Save a form you filled in, or save its answers as a profile (like "Me", "Spouse", or "Business").</div></li>';
  for(const p of ps){const li=document.createElement('li'),k=Object.keys(p.ans).filter(x=>x.startsWith('l:')||x.startsWith('n:')).length;
    li.innerHTML=`<div class="ic">${p.id==='learned'?'↺':p.name.slice(0,1).toUpperCase()}</div><div class="meta"><div class="nm"></div><div class="sub muted small" style="margin:0">${k} saved answers</div></div>${p.id==='learned'?'':'<button class="del icon" aria-label="Delete">✕</button>'}`;
    li.querySelector('.nm').textContent=p.name;
    li.querySelector('.meta').onclick=async()=>{$('fillSheet').hidden=true;toast('Filling…');const n=await applyAnswers(p.ans);toast(n?`Filled ${n} field${n>1?'s':''}. Please review before saving.`:'No matching empty fields found')};
    const del=li.querySelector('.del');if(del)del.onclick=async()=>{if(confirm('Delete profile "'+p.name+'"?')){await st('readwrite',s=>s.delete(p.id),'profiles');showFill()}};ul.appendChild(li)}
  $('fillSheet').hidden=false}
$('fillBtn').onclick=showFill;$('fsX').onclick=()=>$('fillSheet').hidden=true;
$('saveProfile').onclick=async()=>{const ans=await captureAnswers(),n=Object.keys(ans).length;if(!n)return toast('Fill in some fields first');
  const name=prompt('Name this profile (for example Me, Spouse, Business):');if(!name)return;await st('readwrite',s=>s.put({id:'p'+Date.now(),name,ans,t:Date.now()}),'profiles');toast('Profile saved');showFill()};
$('saveTpl').onclick=async()=>{const name=prompt('Template name (for example "IMM 1344, sponsoring my spouse"):',cur.name.replace(/\.pdf$/i,''));if(!name)return;
  const bytes=await currentBytes();await st('readwrite',s=>s.put({id:'t'+Date.now(),name,data:bytes,file:cur.name,xfa:!!cur.xfa,t:Date.now()}),'templates');$('fillSheet').hidden=true;toast('Template saved')};
async function listTemplates(){const ts=((await st('readonly',s=>s.getAll(),'templates'))||[]).sort((a,b)=>b.t-a.t),ul=$('templates');ul.innerHTML='';$('tplWrap').hidden=!ts.length;
  for(const t of ts){const li=document.createElement('li');li.innerHTML=`<div class="ic">★</div><div class="meta"><div class="nm"></div><div class="sub muted small" style="margin:0">Starts a new prefilled copy${t.xfa?' · XFA':''}</div></div><button class="del icon" aria-label="Delete">✕</button>`;
    li.querySelector('.nm').textContent=t.name;
    li.querySelector('.meta').onclick=async()=>{const nm=t.file.replace(/\.pdf$/i,'')+' ('+new Date().toLocaleDateString()+').pdf';const d={id:Date.now(),name:nm,data:t.data.slice(),size:t.data.length,t:Date.now(),xfa:t.xfa};await st('readwrite',s=>s.put(d));openDoc(d)};
    li.querySelector('.del').onclick=async()=>{if(confirm('Delete template?')){await st('readwrite',s=>s.delete(t.id),'templates');listTemplates()}};ul.appendChild(li)}}
listTemplates();

$('q').oninput=()=>listRecent();
// ---- reading position, progress, thumbnails
const V=()=>app().pdfViewer,vdoc=()=>frame.contentWindow.document,VC=()=>vdoc().getElementById('viewerContainer');
let saveLocT=null,hookedBus=null;
function hookViewer(){const A=app();if(hookedBus===A.eventBus)return;hookedBus=A.eventBus;
  A.eventBus.on('updateviewarea',e=>{if(!cur||!e.location)return;cur.loc={page:e.location.pageNumber,hash:e.location.pdfOpenParams};
    clearTimeout(saveLocT);saveLocT=setTimeout(()=>{cur.seen=Date.now();st('readwrite',s=>s.put(cur))},600)});
  A.eventBus.on('pagechanging',e=>markCurrent(e.pageNumber));
  VC().addEventListener('scroll',onScroll,{passive:true});
  const s=vdoc().createElement('style');vdoc().head.appendChild(s)}
function markCurrent(n){vdoc().querySelectorAll('.page.folioCurrent').forEach(p=>p.classList.remove('folioCurrent'));const p=vdoc().querySelector(`.page[data-page-number="${n}"]`);if(p)p.classList.add('folioCurrent')}
async function afterOpen(d){hookViewer();const A=app();
  await new Promise(r=>{if(A.pdfViewer.pagesCount&&A.pdfViewer._pages?.length)r();A.eventBus.on('pagesinit',r,{once:true});setTimeout(r,3000)});
  d.pages=A.pagesCount;
  if(d.loc&&d.loc.hash){A.pdfLinkService.setHash(d.loc.hash.replace(/^#/,''));if(d.loc.page>1)toast(`Back where you left off: page ${d.loc.page}`)}
  markCurrent(A.page);drawBookmarks();applyNight();
  if(!d.thumb&&!d.xfa){try{const pg=await A.pdfDocument.getPage(1),vp=pg.getViewport({scale:1}),sc=160/vp.width,c=document.createElement('canvas'),v2=pg.getViewport({scale:sc});c.width=v2.width;c.height=v2.height;
    await pg.render({canvasContext:c.getContext('2d'),viewport:v2}).promise;d.thumb=c.toDataURL('image/jpeg',.7)}catch(e){}}
  d.seen=Date.now();st('readwrite',s=>s.put(d))}
const _open=openDoc;openDoc=async function(d){await _open(d);await afterOpen(d)};
// ---- fast scroller with page bubble + progress bar
let railT=null;
function onScroll(){const c=VC(),r=$('rail'),max=c.scrollHeight-c.clientHeight,f=max>0?c.scrollTop/max:0;
  $('pfill').style.width=(f*100)+'%';const h=r.clientHeight-56;$('thumb').style.top=(f*h)+'px';$('bubble').textContent=`${app().page} / ${app().pagesCount}`;
  r.classList.add('on');clearTimeout(railT);railT=setTimeout(()=>r.classList.remove('on'),1200)}
(function(){const r=$('rail');let drag=false;
  const go=e=>{const b=r.getBoundingClientRect(),f=Math.min(1,Math.max(0,(e.clientY-b.top-28)/(b.height-56))),c=VC();c.scrollTop=f*(c.scrollHeight-c.clientHeight)};
  r.addEventListener('pointerdown',e=>{drag=true;r.classList.add('drag');r.setPointerCapture(e.pointerId);go(e)});
  r.addEventListener('pointermove',e=>{if(drag)go(e)});
  const end=()=>{drag=false;r.classList.remove('drag')};r.addEventListener('pointerup',end);r.addEventListener('pointercancel',end)})();
// ---- bookmarks
function drawBookmarks(){vdoc().querySelectorAll('.folioBmk').forEach(x=>x.remove());for(const b of cur.bms||[]){const p=vdoc().querySelector(`.page[data-page-number="${b.page}"]`);if(p){const m=vdoc().createElement('div');m.className='folioBmk';p.appendChild(m)}}}
function listBms(){const ul=$('bms');ul.innerHTML='';const bms=(cur.bms||[]).slice().sort((a,b)=>a.page-b.page);
  if(!bms.length)ul.innerHTML='<li><div class="meta muted small" style="margin:0">No bookmarks yet. Folio also remembers where you stopped reading automatically.</div></li>';
  for(const b of bms){const li=document.createElement('li');li.innerHTML=`<span class="bmpage">p. ${b.page}</span><div class="meta"><div class="nm"></div><div class="sub muted small" style="margin:0">${new Date(b.t).toLocaleDateString()}</div></div><button class="del icon">✕</button>`;
    li.querySelector('.nm').textContent=b.label;li.querySelector('.meta').onclick=()=>{app().page=b.page;$('readSheet').hidden=true};
    li.querySelector('.del').onclick=()=>{cur.bms=cur.bms.filter(x=>x!==b);st('readwrite',s=>s.put(cur));listBms();drawBookmarks()};ul.appendChild(li)}}
$('bmFab').onclick=()=>{listBms();$('night').classList.toggle('sel',!!localStorage.folioNight);$('readSheet').hidden=false};$('rsX').onclick=()=>$('readSheet').hidden=true;
$('addBm').onclick=async()=>{const p=app().page;let label=`Page ${p}`;try{const t=await (await app().pdfDocument.getPage(p)).getTextContent();const s=t.items.map(i=>i.str).join(' ').replace(/\s+/g,' ').trim();if(s)label=s.slice(0,60)}catch(e){}
  const l=prompt('Bookmark name:',label);if(l===null)return;cur.bms=(cur.bms||[]).filter(b=>b.page!==p);cur.bms.push({page:p,label:l||label,t:Date.now()});await st('readwrite',s=>s.put(cur));listBms();drawBookmarks();toast('Bookmarked page '+p)};
// ---- night mode & fit width
function applyNight(){vdoc().documentElement.classList.toggle('folioNight',!!localStorage.folioNight)}
$('night').onclick=()=>{if(localStorage.folioNight)delete localStorage.folioNight;else localStorage.folioNight='1';applyNight();$('night').classList.toggle('sel',!!localStorage.folioNight)};
$('fitW').onclick=()=>{V().currentScaleValue='page-width';$('readSheet').hidden=true};
// bookmarks markers vanish when pages re-render
frame.addEventListener('load',()=>{const w=frame.contentWindow;const iv=setInterval(()=>{if(w.PDFViewerApplication&&w.PDFViewerApplication.eventBus){clearInterval(iv);w.PDFViewerApplication.eventBus.on('pagerendered',()=>{if(cur){drawBookmarks();markCurrent(app().page)}})}},100)});
