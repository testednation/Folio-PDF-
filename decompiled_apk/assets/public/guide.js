// Folio guided filling: one field at a time, checks as you go, jumps to problems.
const G={list:[],i:0,issues:null};
const vd=()=>frame.contentWindow.document;
function fillable(){const seen=new Set(),out=[];
  vd().querySelectorAll('.xfaLayer input,.xfaLayer select,.xfaLayer textarea,.annotationLayer input,.annotationLayer select,.annotationLayer textarea').forEach(e=>{
    if(e.disabled||e.readOnly||e.type==='hidden'||e.type==='button'||!e.offsetParent)return;
    if(e.type==='radio'){const k=e.name||labelOf(e);if(seen.has(k))return;seen.add(k)}out.push(e)});
  return out.sort((a,b)=>{const pa=+(a.closest('.page')?.dataset.pageNumber||0),pb=+(b.closest('.page')?.dataset.pageNumber||0);if(pa!==pb)return pa-pb;
    const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();return Math.abs(ra.top-rb.top)>8?ra.top-rb.top:ra.left-rb.left})}
const isReq=e=>e.required||e.getAttribute('aria-required')==='true';
function quick(e){if(e.type==='radio'){const g=[...vd().querySelectorAll(`input[type=radio][name="${CSS.escape(e.name)}"]`)];return g.some(isReq)&&!g.some(x=>x.checked)?'Choose one option':null}
  if(e.type==='checkbox')return isReq(e)&&!e.checked?'Must be checked':null;return checkText(e,labelOf(e),isReq(e),app().pdfDocument.isPureXfa)}
function mark(e,m){e.classList.toggle('folioBad',!!m);e.classList.toggle('folioOk',!m&&!!(e.value||e.checked))}
function hint(e){const t=e.type,L=labelOf(e).toLowerCase();if(t==='radio')return'Tap one of the choices';if(t==='checkbox')return'Tap to tick the box if it applies';if(e.tagName==='SELECT')return'Pick an option from the list';
  if(/yyyymmdd/.test(L))return'Type the date like 19900131';if(/date/.test(L))return'Type the date like 1990-01-31';if(/e-?mail/.test(L))return'Type your email address';
  return isReq(e)?'Required: please fill this in':'Optional: you can skip it'}
async function startGuide(issuesOnly){await renderAll();G.list=issuesOnly?issuesOnly.map(x=>x.e):fillable();G.issues=issuesOnly||null;G.msgs=issuesOnly?issuesOnly.map(x=>x.msg):null;if(!G.list.length){toast('No fillable fields found');return}
  G.i=issuesOnly?0:Math.max(0,G.list.findIndex(e=>!(e.value||e.checked)));if(G.i<0)G.i=0;document.body.classList.add('guiding');$('gStart').hidden=true;$('guide').hidden=false;go(G.i)}
function go(i,shake){G.i=Math.max(0,Math.min(G.list.length-1,i));const e=G.list[G.i];vd().querySelectorAll('.folioFocus').forEach(x=>x.classList.remove('folioFocus'));
  e.classList.add('folioFocus');e.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(()=>{try{e.focus({preventScroll:true})}catch(x){}},350);
  const m=G.msgs?G.msgs[G.i]:quick(e),n=G.list.length;$('gStep').textContent=G.issues?`Fix ${G.i+1} of ${n}`:`Field ${G.i+1} of ${n}`;$('gLab').textContent=labelOf(e);
  $('gMsg').textContent=m&&(G.issues||e.classList.contains('folioBad'))?'⚠ '+m:hint(e);$('gMsg').classList.toggle('bad',!!m&&(G.issues||e.classList.contains('folioBad')));
  $('gFill').style.width=(100*G.list.filter(x=>x.value||x.checked).length/n)+'%';$('gPrev').disabled=G.i===0;$('gNext').textContent=G.i===n-1?'Check all ›':'Next ›';
  if(shake){$('guide').classList.remove('shake');void $('guide').offsetWidth;$('guide').classList.add('shake')}}
let warned=null;
$('gNext').onclick=()=>{const e=G.list[G.i],m=quick(e);mark(e,m);
  if(m&&warned!==e){warned=e;$('gMsg').textContent='⚠ '+m+' (tap Next again to skip)';$('gMsg').classList.add('bad');go(G.i,true);$('gMsg').textContent='⚠ '+m+' (tap Next again to skip)';return}
  warned=null;if(G.i===G.list.length-1)return finish();go(G.i+1)};
$('gPrev').onclick=()=>{warned=null;go(G.i-1)};
$('gClose').onclick=()=>{$('guide').hidden=true;document.body.classList.remove('guiding');vd().querySelectorAll('.folioFocus').forEach(x=>x.classList.remove('folioFocus'));$('gStart').hidden=false};
async function finish(){$('gMsg').textContent='Checking the whole form…';$('gMsg').classList.remove('bad');const iss=await validate({quiet:true});
  if(iss.length){toast(`${iss.length} thing${iss.length>1?'s':''} to fix. Taking you there`);G.issues=iss;G.list=iss.map(x=>x.e);G.msgs=iss.map(x=>x.msg);document.body.classList.add('guiding');$('guide').hidden=false;go(0,true);return}
  $('gStep').textContent='All done';$('gLab').textContent='Everything looks good ✓';$('gMsg').textContent='Tap Save to keep your filled form.';$('gFill').style.width='100%';
  vd().querySelectorAll('.folioFocus').forEach(x=>x.classList.remove('folioFocus'));$('gNext').textContent='Save';$('gNext').onclick=()=>{$('saveBtn').click();$('gClose').onclick();$('gNext').onclick=nextH}}
const nextH=$('gNext').onclick;
$('gDone').onclick=finish;
// auto-check whenever the user leaves a field, and follow taps
var onFrame=fn=>{let last=null;setInterval(()=>{try{const d=frame.contentWindow.document;if(d!==last&&d.URL.includes('viewer')&&d.readyState!=='loading'){last=d;fn(d)}}catch(x){}},300)};
onFrame(d=>{
  d.addEventListener('focusout',e=>{const t=e.target;if(t&&t.matches&&t.matches('input,select,textarea')){const m=quick(t);mark(t,m);if(!$('guide').hidden&&G.list[G.i]===t)go(G.i)}},true);
  d.addEventListener('change',e=>{const t=e.target;if(t&&t.matches&&t.matches('input[type=radio],input[type=checkbox],select'))mark(t,quick(t))},true);
  d.addEventListener('focusin',e=>{if($('guide').hidden)return;const k=G.list.indexOf(e.target);if(k>=0&&k!==G.i){G.i=k;go(k)}},true);
  d.addEventListener('keydown',e=>{if(e.key==='Enter'&&!$('guide').hidden&&e.target.tagName!=='TEXTAREA'){e.preventDefault();$('gNext').click()}},true)});
// Save checks the form first and offers to fix
const saveH=$('saveBtn').onclick;$('saveBtn').onclick=async()=>{const iss=await validate({quiet:true});
  if(iss.length&&confirm(`${iss.length} field${iss.length>1?'s need':' needs'} attention. Fix now? (Cancel saves anyway)`)){startGuide(iss);return}saveH()};
$('gStart').onclick=()=>{G.msgs=null;startGuide()};
// offer the guide automatically on forms
const _od=openDoc;openDoc=async function(d){await _od(d);$('guide').hidden=true;document.body.classList.remove('guiding');
  if(d.kind&&d.kind!=='pdf'){$('gStart').hidden=true;return}setTimeout(()=>{const n=fillable().length;$('gStart').hidden=!n;if(n)$('gStart').textContent=`✎ Fill step by step · ${n} fields`},1500)};
const _bk=$('back').onclick;$('back').onclick=async()=>{$('guide').hidden=true;$('gStart').hidden=true;document.body.classList.remove('guiding');await _bk()};
