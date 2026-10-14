// Folio tools: saved signature placement and page organizer / merge (pdf-lib, offline).
const pad=$('pad'),px=pad.getContext('2d');let drawn=false;
px.lineWidth=5;px.lineCap=px.lineJoin='round';px.strokeStyle='#1e2a78';
(()=>{let on=false;const pt=e=>{const r=pad.getBoundingClientRect();return[(e.clientX-r.left)*pad.width/r.width,(e.clientY-r.top)*pad.height/r.height]};
 pad.onpointerdown=e=>{on=true;pad.setPointerCapture(e.pointerId);px.beginPath();px.moveTo(...pt(e))};
 pad.onpointermove=e=>{if(on){px.lineTo(...pt(e));px.stroke();drawn=true}};pad.onpointerup=pad.onpointercancel=()=>on=false})();
$('sgClear').onclick=()=>{px.clearRect(0,0,pad.width,pad.height);drawn=false};$('sgX').onclick=()=>$('sigSheet').hidden=true;
function trimSig(){const d=px.getImageData(0,0,pad.width,pad.height).data;let x0=1e9,y0=1e9,x1=-1,y1=-1;
  for(let y=0;y<pad.height;y++)for(let x=0;x<pad.width;x++)if(d[(y*pad.width+x)*4+3]){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}
  if(x1<0)return null;const c=document.createElement('canvas');c.width=x1-x0+10;c.height=y1-y0+10;c.getContext('2d').drawImage(pad,x0-5,y0-5,c.width,c.height,0,0,c.width,c.height);return c.toDataURL('image/png')}
$('signBtn').onclick=()=>{$('readSheet').hidden=true;if(app().pdfDocument.isPureXfa){toast('Signing works on regular PDFs, not XFA-only forms');return}
  if(localStorage.folioSig&&confirm('Use your saved signature? (Cancel to draw a new one)'))return placeSig();$('sgClear').onclick();$('sigSheet').hidden=false};
$('sgOk').onclick=()=>{const s=drawn&&trimSig();if(!s){toast('Draw your signature first');return}localStorage.folioSig=s;$('sigSheet').hidden=true;placeSig()};
async function reloadWith(bytes,msg){cur.data=bytes;cur.size=bytes.length;cur.t=Date.now();delete cur.thumb;cur.pages=null;await st('readwrite',s=>s.put(cur));await openDoc(cur);toast(msg)}
function placeSig(){$('tapHint').hidden=false;const vd=vdoc();
  const h=async e=>{const pe=e.target.closest&&e.target.closest('.page');if(!pe)return;e.preventDefault();e.stopPropagation();vd.removeEventListener('click',h,true);$('tapHint').hidden=true;
    const n=+pe.dataset.pageNumber,pv=V().getPageView(n-1),r=pe.getBoundingClientRect(),[x,y]=pv.viewport.convertToPdfPoint(e.clientX-r.left,e.clientY-r.top);
    try{const doc=await PDFLib.PDFDocument.load(new Uint8Array(await currentBytes()),{ignoreEncryption:true}),png=await doc.embedPng(localStorage.folioSig),pg=doc.getPage(n-1),w=150,hh=w*png.height/png.width;
      pg.drawImage(png,{x:x-w/2,y:y-hh/2,width:w,height:hh});await reloadWith(await doc.save(),'Signed. Tap Save to keep it')}catch(err){alert('Could not sign: '+err.message)}};
  $('tapCancel').onclick=()=>{vd.removeEventListener('click',h,true);$('tapHint').hidden=true};vd.addEventListener('click',h,true)}
// ---- page organizer
let PG=[],extra=[];
async function thumbOf(pdf,i){const p=await pdf.getPage(i),v=p.getViewport({scale:110/p.getViewport({scale:1}).width}),c=document.createElement('canvas');c.width=v.width;c.height=v.height;await p.render({canvasContext:c.getContext('2d'),viewport:v}).promise;return c.toDataURL('image/jpeg',.6)}
function drawGrid(){const g=$('pgGrid');g.innerHTML='';PG.forEach((p,i)=>{const el=document.createElement('div');el.className='pg'+(p.del?' gone':'');
  el.innerHTML=`<img src="${p.img}" style="transform:rotate(${p.rot}deg)"><div>${p.src?'＋ ':''}${i+1}</div><div class="b"><button data-a="up">◀</button><button data-a="rot">⟳</button><button data-a="del">${p.del?'↺':'🗑'}</button><button data-a="dn">▶</button></div>`;
  el.querySelectorAll('button').forEach(b=>b.onclick=()=>{const a=b.dataset.a;if(a==='rot')p.rot=(p.rot+90)%360;if(a==='del')p.del=!p.del;
    if(a==='up'&&i>0)[PG[i-1],PG[i]]=[PG[i],PG[i-1]];if(a==='dn'&&i<PG.length-1)[PG[i+1],PG[i]]=[PG[i],PG[i+1]];drawGrid()});g.appendChild(el)})}
$('pagesBtn').onclick=async()=>{$('readSheet').hidden=true;if(app().pdfDocument.isPureXfa){toast('Page tools work on regular PDFs, not XFA-only forms');return}
  $('pgGrid').innerHTML='<p class="muted">Loading pages…</p>';$('pgSheet').hidden=false;const pdf=app().pdfDocument;PG=[];extra=[];
  for(let i=1;i<=pdf.numPages;i++)PG.push({src:0,i:i-1,rot:0,del:false,img:await thumbOf(pdf,i)});drawGrid()};
$('pgX').onclick=()=>$('pgSheet').hidden=true;$('pgAdd').onclick=()=>$('mfile').click();
$('mfile').onchange=async e=>{const lib=frame.contentWindow.pdfjsLib;for(const f of e.target.files){const b=new Uint8Array(await f.arrayBuffer());extra.push(b);const k=extra.length,pdf=await lib.getDocument({data:b.slice()}).promise;
  for(let i=1;i<=pdf.numPages;i++)PG.push({src:k,i:i-1,rot:0,del:false,img:await thumbOf(pdf,i)});pdf.cleanup&&pdf.cleanup()}e.target.value='';drawGrid();toast('Added. Reorder, then Apply')};
$('pgOk').onclick=async()=>{const keep=PG.filter(p=>!p.del);if(!keep.length){toast('Keep at least one page');return}
  try{const srcs=[await PDFLib.PDFDocument.load(new Uint8Array(await currentBytes()),{ignoreEncryption:true})];for(const b of extra)srcs.push(await PDFLib.PDFDocument.load(b,{ignoreEncryption:true}));
    const out=await PDFLib.PDFDocument.create();for(const p of keep){const [cp]=await out.copyPages(srcs[p.src],[p.i]);cp.setRotation(PDFLib.degrees((cp.getRotation().angle+p.rot)%360));out.addPage(cp)}
    $('pgSheet').hidden=true;cur.bms=[];cur.loc=null;await reloadWith(await out.save(),`Done: ${keep.length} pages`)}catch(err){alert('Could not apply: '+err.message)}};
