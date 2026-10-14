// Autosave: every edit is written to on-device storage a moment later, so you can leave and come back.
let asT=null,asBusy=false;
async function autosave(){if(!cur||(cur.kind&&cur.kind!=='pdf'))return;const doc=app()&&app().pdfDocument;if(!doc||!window.__dirty)return;window.__dirty=false;
  if(asBusy){asT=setTimeout(autosave,1500);return}asBusy=true;$('autoS').textContent='Saving…';
  try{const bytes=new Uint8Array(await doc.saveDocument());cur.data=bytes;cur.size=bytes.length;cur.t=cur.seen=Date.now();await st('readwrite',s=>s.put(cur));
    doc.annotationStorage.resetModified&&doc.annotationStorage.resetModified();$('autoS').textContent='Saved ✓'}catch(e){console.warn('autosave',e);$('autoS').textContent='Not saved'}asBusy=false}
const kick=()=>{window.__dirty=true;$('autoS').textContent='Editing…';clearTimeout(asT);asT=setTimeout(autosave,2000)};
onFrame(d=>{['input','change'].forEach(ev=>d.addEventListener(ev,kick,true))});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(asT);autosave()}});
// leaving a document now saves instead of asking
const _bk2=$('back').onclick;$('back').onclick=async()=>{clearTimeout(asT);await autosave();const doc=app()&&app().pdfDocument;if(doc&&doc.annotationStorage.resetModified)doc.annotationStorage.resetModified();$('autoS').textContent='';await _bk2()};
