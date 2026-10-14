// Folio pro tools, all offline: OCR (Tesseract, on-device), password protect/remove, export to Word.
(()=>{const g=$('tGrid');if(!g)return;
const add=(ic,lab,fn)=>{const b=document.createElement('button');b.className='tool';b.innerHTML='<span></span><small></small>';b.firstChild.textContent=ic;b.lastChild.textContent=lab;b.onclick=()=>{$('toolSheet').hidden=true;fn().catch(e=>{console.error(e);busyOff();toast("That didn't work: "+(e.message||e))})};g.prepend(b)};
let bz;const busy=m=>{if(!bz){bz=document.createElement('div');bz.id='proBusy';bz.innerHTML='<div class="spin"></div><b></b><small>Everything stays on this phone</small>';document.body.appendChild(bz)}bz.hidden=false;bz.querySelector('b').textContent=m},busyOff=()=>{if(bz)bz.hidden=true};
const A=()=>app(),base=()=>cur.name.replace(/\.pdf$/i,''),load=async(o)=>PDFLib.PDFDocument.load(new Uint8Array(await currentBytes()),Object.assign({ignoreEncryption:true},o));
const js=src=>new Promise((r,j)=>{const s=document.createElement('script');s.src=src;s.onload=r;s.onerror=()=>j(new Error('Could not load '+src));document.head.appendChild(s)});
async function render(i,scale){const pg=await A().pdfDocument.getPage(i+1),v=pg.getViewport({scale,rotation:0}),c=document.createElement('canvas');c.width=v.width;c.height=v.height;await pg.render({canvasContext:c.getContext('2d'),viewport:v}).promise;return c}
// ---------- OCR ----------
const mlOK=()=>!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()&&Capacitor.Plugins.MlKitOcr),useML=()=>mlOK()&&(localStorage['folio.ocr']||'mlkit')==='mlkit';
add('⚙️','OCR engine',async()=>{const cur=useML()?'Google ML Kit':'Tesseract';if(!mlOK())return toast('Google ML Kit needs the Android app. Using Tesseract');
  localStorage['folio.ocr']=useML()?'tesseract':'mlkit';toast('OCR engine: '+(useML()?'Google ML Kit (fast, Latin scripts)':'Tesseract (open source)'))});
let worker;async function ocrWorker(){if(worker)return worker;if(!window.Tesseract)await js('vendor/ocr/tesseract.min.js');
  worker=await Tesseract.createWorker('eng',1,{workerPath:'vendor/ocr/worker.min.js',corePath:'vendor/ocr/',langPath:'vendor/ocr',gzip:true,workerBlobURL:false,logger:m=>{if(m.status==='recognizing text'&&bz&&!bz.hidden)bz.querySelector('small').textContent=Math.round(m.progress*100)+'% of this page'}});return worker}
add('🔤','Recognize text (OCR)',async()=>{if(A().pdfDocument.isPureXfa)return toast('OCR works on regular PDFs');const n=A().pagesCount,need=[];
  for(let i=0;i<n;i++){const t=await (await A().pdfDocument.getPage(i+1)).getTextContent();if(t.items.filter(x=>x.str.trim()).length<3)need.push(i)}
  if(!need.length&&!confirm('This PDF already has text. Run OCR on every page anyway?'))return;const pages=need.length?need:[...Array(n).keys()];
  const ML=useML();busy(ML?'Starting Google ML Kit…':'Preparing text recognition…');const w=ML?null:await ocrWorker(),d=await load(),font=await d.embedFont(PDFLib.StandardFonts.Helvetica);let words=0;
  for(const [k,i] of pages.entries()){busy(`Reading page ${i+1} (${k+1} of ${pages.length})…`);const S=2.5,c=await render(i,S),data=ML?(await Capacitor.Plugins.MlKitOcr.recognize({image:c.toDataURL('image/jpeg',.92)})).words.map(x=>({text:x.text,confidence:x.confidence,bbox:{x0:x.x0,y0:x.y0,x1:x.x1,y1:x.y1}})):(await w.recognize(c)).data,pg=d.getPage(i),{width:W,height:H}=pg.getSize(),sx=W/(c.width/S)/S,sy=H/(c.height/S)/S;
    for(const wd of (Array.isArray(data)?data:(data.words||[]))){if(wd.confidence<35)continue;const t=wd.text.replace(/[^\x20-\x7e\u00a0-\u00ff]/g,'');if(!t)continue;const b=wd.bbox,h=(b.y1-b.y0)*sy,size=Math.max(2,h*.9),tw=font.widthOfTextAtSize(t,size),bw=(b.x1-b.x0)*sx;
      pg.drawText(t,{x:b.x0*sx,y:H-b.y1*sy+h*.15,size,font,opacity:0,horizontalScale:undefined});words++;
      if(tw>0&&Math.abs(tw-bw)/bw>.15){/* width mismatch is fine for search/copy */}}}
  busyOff();if(!words)return toast('No readable text found');await reloadWith(await d.save(),`Recognized ${words} words. Search, copy and redact now work`)});
// ---------- Passwords ----------
let CP;async function cryptLib(){if(CP)return CP;const keep=window.PDFLib;await js('vendor/pdf-lib-crypt.min.js');CP=window.PDFLib;window.PDFLib=keep;return CP}
add('🔒','Password protect',async()=>{const pw=prompt('Choose a password to open this PDF:');if(!pw)return;if(prompt('Type it again:')!==pw)return toast("Passwords didn't match");
  busy('Encrypting…');const L=await cryptLib(),d=await L.PDFDocument.load(new Uint8Array(await currentBytes()),{ignoreEncryption:true});
  d.encrypt({userPassword:pw,ownerPassword:pw+'#folio-owner',permissions:{printing:'highResolution',modifying:false,copying:false,annotating:true,fillingForms:true}});
  const bytes=await d.save();busyOff();const keep=confirm('Protected. Replace this file with the locked version? (Cancel saves a locked copy and keeps this one)');
  if(keep)return reloadWith(bytes,'Locked with a password');const nd={id:Date.now(),name:base()+' (locked).pdf',data:bytes,size:bytes.length,t:Date.now()};await st('readwrite',s=>s.put(nd));toast('Locked copy saved in Recent')});
add('🔓','Remove password',async()=>{const pw=prompt('Enter the current password:');if(!pw)return;busy('Unlocking…');const L=await cryptLib();let d;
  try{d=await L.PDFDocument.load(new Uint8Array(await A().pdfDocument.getData()),{password:pw})}catch(e){busyOff();return toast('Wrong password, or this file is not locked')}
  const bytes=await d.save();busyOff();return reloadWith(bytes,'Password removed')});
// ---------- Word ----------
add('📝','Export to Word',async()=>{busy('Building Word document…');if(!window.docx)await js('vendor/docx.umd.js');const D=window.docx,n=A().pagesCount,children=[];
  for(let i=0;i<n;i++){busy(`Converting page ${i+1} of ${n}…`);const pg=await A().pdfDocument.getPage(i+1),tc=await pg.getTextContent(),vp=pg.getViewport({scale:1});
    const its=tc.items.filter(x=>x.str!=null&&x.transform);
    if(its.filter(x=>x.str.trim()).length<3){const c=await render(i,1.5),b=await new Promise(r=>c.toBlob(async x=>r(new Uint8Array(await x.arrayBuffer())),'image/jpeg',.85)),w=600,h=Math.round(600*c.height/c.width);
      children.push(new D.Paragraph({children:[new D.ImageRun({data:b,transformation:{width:w,height:h},type:'jpg'})]}))}
    else{const lines=[];for(const it of its){const y=Math.round(it.transform[5]),hgt=Math.abs(it.transform[3])||it.height||10;let L=lines.find(l=>Math.abs(l.y-y)<hgt*.5);if(!L){L={y,h:hgt,parts:[]};lines.push(L)}L.parts.push(it);L.h=Math.max(L.h,hgt)}
      lines.sort((a,b)=>b.y-a.y);const hs=lines.map(l=>l.h).sort((a,b)=>a-b),med=hs[Math.floor(hs.length/2)]||10;let para=null,prev=null;
      const flush=()=>{if(para){children.push(para.p(para.runs));para=null}};
      for(const l of lines){l.parts.sort((a,b)=>a.transform[4]-b.transform[4]);let txt='';let lastEnd=null;for(const p of l.parts){if(lastEnd!=null&&p.transform[4]-lastEnd>l.h*.25&&!txt.endsWith(' '))txt+=' ';txt+=p.str;lastEnd=p.transform[4]+p.width}
        txt=txt.replace(/\s+/g,' ').trim();if(!txt)continue;const bold=/bold|black|heavy/i.test((tc.styles[l.parts[0].fontName]||{}).fontFamily||l.parts[0].fontName||'');
        const head=l.h>=med*1.35;const gap=prev?prev.y-l.y:0;
        if(head){flush();children.push(new D.Paragraph({heading:l.h>=med*1.8?D.HeadingLevel.HEADING_1:D.HeadingLevel.HEADING_2,children:[new D.TextRun({text:txt})]}));prev=l;continue}
        if(!para||gap>l.h*1.9||(prev&&prev.head)){flush();para={runs:[],p:r=>new D.Paragraph({children:r,spacing:{after:120}})}}
        else if(para.runs.length){const lastT=para.last||'';if(lastT.endsWith('-'))para.runs[para.runs.length-1]=new D.TextRun({text:lastT.slice(0,-1),bold:para.lastBold});else para.runs.push(new D.TextRun({text:' '}))}
        para.runs.push(new D.TextRun({text:txt,bold,size:Math.round(Math.min(28,Math.max(16,l.h*2)))}));para.last=txt;para.lastBold=bold;prev=l}
      flush()}
    if(i<n-1)children.push(new D.Paragraph({children:[new D.PageBreak()]}))}
  const doc=new D.Document({creator:'Folio',title:base(),sections:[{children}]}),blob=await D.Packer.toBlob(doc),bytes=new Uint8Array(await blob.arrayBuffer());busyOff();
  window.__lastDocx=bytes;await exportFile(bytes,base()+'.docx',true)});
})();
