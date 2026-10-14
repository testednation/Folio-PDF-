// Folio "All tools": Acrobat-style document tools, all on-device (pdf-lib + pdf.js).
(()=>{
const sheet=document.createElement('div');sheet.id='toolSheet';sheet.className='sheet';sheet.hidden=true;
const T=[['📄','Page numbers','pnum'],['💧','Watermark','wm'],['🔝','Header & footer','hf'],['✂️','Extract pages','ext'],['🪓','Split PDF','split'],
 ['🗜️','Compress','comp'],['🖼️','Export as images','img'],['⬛','Redact text','red'],['🧱','Flatten form & notes','flat'],['➕','Insert blank page','blank'],
 ['🔄','Rotate all pages','rot'],['ℹ️','Document properties','props']];
sheet.innerHTML='<div class="sh"><b>All tools</b><button class="icon" id="tsX">×</button></div><div id="tGrid"></div><p class="muted small">Highlight, underline, text, drawing and images are in the viewer toolbar. Everything here works offline.</p>';
document.body.appendChild(sheet);const g=sheet.querySelector('#tGrid');
T.forEach(([ic,lab,id])=>{const b=document.createElement('button');b.className='tool';b.innerHTML='<span></span><small></small>';b.firstChild.textContent=ic;b.lastChild.textContent=lab;b.onclick=()=>run(id);g.appendChild(b)});
sheet.querySelector('#tsX').onclick=()=>sheet.hidden=true;
const row=$('pagesBtn').parentElement,tb=document.createElement('button');tb.className='pill';tb.textContent='🧰 All tools';row.appendChild(tb);
tb.onclick=()=>{$('readSheet').hidden=true;sheet.hidden=false};
const L=()=>PDFLib,load=async()=>L().PDFDocument.load(new Uint8Array(await currentBytes()),{ignoreEncryption:true});
const base=()=>cur.name.replace(/\.pdf$/i,'');
async function addDoc(bytes,name){const d={id:Date.now()+Math.floor(Math.random()*1000),name,data:bytes,size:bytes.length,t:Date.now()};await st('readwrite',s=>s.put(d));return d}
function ranges(s,n){const out=new Set();for(const part of s.split(',')){const m=part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);if(!m)continue;let a=+m[1],b=m[2]?+m[2]:a;if(a>b)[a,b]=[b,a];for(let i=a;i<=Math.min(b,n);i++)if(i>=1)out.add(i-1)}return[...out].sort((x,y)=>x-y)}
async function raster(i,scale,boxes){const pg=await app().pdfDocument.getPage(i+1),v=pg.getViewport({scale,rotation:0}),c=document.createElement('canvas');c.width=v.width;c.height=v.height;const x=c.getContext('2d');
  await pg.render({canvasContext:x,viewport:v,annotationMode:2}).promise;if(boxes){x.fillStyle='#000';for(const b of boxes){const T=v.transform,P=(X,Y)=>[T[0]*X+T[2]*Y+T[4],T[1]*X+T[3]*Y+T[5]],p1=P(b[0],b[1]),p2=P(b[2],b[3]),r=[p1[0],p1[1],p2[0],p2[1]];x.fillRect(Math.min(r[0],r[2]),Math.min(r[1],r[3]),Math.abs(r[2]-r[0]),Math.abs(r[3]-r[1]))}}return c}
const jpg=(c,q)=>new Promise(r=>c.toBlob(async b=>r(new Uint8Array(await b.arrayBuffer())),'image/jpeg',q));
async function rasterDoc(pages,scale,q,boxesBy){const src=await load(),out=await L().PDFDocument.create(),n=src.getPageCount();
  for(let i=0;i<n;i++){if(pages&&!pages.includes(i)){const [cp]=await out.copyPages(src,[i]);out.addPage(cp);continue}
    toast(`Processing page ${i+1} of ${n}…`);const c=await raster(i,scale,boxesBy&&boxesBy[i]),im=await out.embedJpg(await jpg(c,q)),{width,height}=c,w=width/scale,h=height/scale,p=out.addPage([w,h]);p.drawImage(im,{x:0,y:0,width:w,height:h})}
  return out}
const kb=n=>n>1e6?(n/1e6).toFixed(1)+' MB':Math.round(n/1e3)+' KB';
async function run(id){sheet.hidden=true;const A=app();if(A.pdfDocument.isPureXfa&&id!=='img'){toast('This tool works on regular PDFs, not XFA-only forms');return}
 try{const {rgb,degrees,StandardFonts}=L();
 if(id==='pnum'){const f=prompt('Page number format ({n} = page, {t} = total):','Page {n} of {t}');if(!f)return;const pos=prompt('Position: bottom-center, bottom-right, top-right','bottom-center')||'bottom-center';
   const d=await load(),font=await d.embedFont(StandardFonts.Helvetica),ps=d.getPages();ps.forEach((p,i)=>{const {width:w,height:h}=p.getSize(),t=f.replace('{n}',i+1).replace('{t}',ps.length),tw=font.widthOfTextAtSize(t,10);
     const x=pos.includes('right')?w-tw-30:pos.includes('left')?30:(w-tw)/2,y=pos.startsWith('top')?h-26:18;p.drawText(t,{x,y,size:10,font,color:rgb(.3,.3,.3)})});return reloadWith(await d.save(),'Page numbers added')}
 if(id==='wm'){const t=prompt('Watermark text:','CONFIDENTIAL');if(!t)return;const d=await load(),font=await d.embedFont(StandardFonts.HelveticaBold);
   for(const p of d.getPages()){const {width:w,height:h}=p.getSize(),s=Math.min(w,h)/Math.max(4,t.length)*1.3,tw=font.widthOfTextAtSize(t,s),a=Math.atan2(h,w);
     p.drawText(t,{x:w/2-Math.cos(a)*tw/2+Math.sin(a)*s/3,y:h/2-Math.sin(a)*tw/2-Math.cos(a)*s/3,size:s,font,color:rgb(.85,.1,.1),opacity:.18,rotate:degrees(a*180/Math.PI)})}return reloadWith(await d.save(),'Watermark added')}
 if(id==='hf'){const hd=prompt('Header text (leave empty for none):',base());if(hd===null)return;const ft=prompt('Footer text (leave empty for none):',new Date().toLocaleDateString());if(ft===null)return;
   const d=await load(),font=await d.embedFont(StandardFonts.Helvetica);for(const p of d.getPages()){const {width:w,height:h}=p.getSize();
     if(hd)p.drawText(hd,{x:30,y:h-24,size:9,font,color:rgb(.35,.35,.35)});if(ft){const tw=font.widthOfTextAtSize(ft,9);p.drawText(ft,{x:w-30-tw,y:16,size:9,font,color:rgb(.35,.35,.35)})}}return reloadWith(await d.save(),'Header and footer added')}
 if(id==='ext'){const n=A.pagesCount,r=prompt(`Pages to extract (for example 1-3, 5). This file has ${n}.`,String(A.page));if(!r)return;const idx=ranges(r,n);if(!idx.length)return toast('No valid pages');
   const src=await load(),out=await L().PDFDocument.create();(await out.copyPages(src,idx)).forEach(p=>out.addPage(p));await addDoc(await out.save(),`${base()} (pages ${r.replace(/\s/g,'')}).pdf`);return toast('Saved as a new file in Recent')}
 if(id==='split'){const n=A.pagesCount,k=+prompt(`Split into files of how many pages each? (${n} pages)`,'1');if(!k||k<1)return;const src=await load();let c=0;
   for(let i=0;i<n;i+=k){const out=await L().PDFDocument.create(),idx=[...Array(Math.min(k,n-i)).keys()].map(j=>i+j);(await out.copyPages(src,idx)).forEach(p=>out.addPage(p));await addDoc(await out.save(),`${base()} part ${++c}.pdf`)}return toast(`Split into ${c} files in Recent`)}
 if(id==='comp'){const before=(await currentBytes()).length,lv=prompt('Compression: 1 = light (keeps text selectable), 2 = strong (smaller, pages become images)','1');if(!lv)return;
   let out;if(lv==='2'){out=await (await rasterDoc(null,1.4,.6)).save()}else{out=await (await load()).save({useObjectStreams:true})}
   if(out.length>=before)return toast(`Already compact (${kb(before)})`);if(!confirm(`${kb(before)} → ${kb(out.length)}. Replace this file? (Cancel saves a compressed copy)`)){await addDoc(out,base()+' (compressed).pdf');return toast('Compressed copy saved in Recent')}
   return reloadWith(out,`Compressed to ${kb(out.length)}`)}
 if(id==='img'){const n=A.pagesCount,z=new JSZip();for(let i=0;i<n;i++){toast(`Page ${i+1} of ${n}…`);z.file(`${base()}-${i+1}.jpg`,await jpg(await raster(i,2),.9))}
   const bytes=await z.generateAsync({type:'uint8array'});return exportFile(bytes,base()+'-images.zip',true)}
 if(id==='red'){const term=prompt('Text to black out everywhere (names, numbers…):');if(!term)return;const q=term.toLowerCase(),boxes={},n=A.pagesCount;let hits=0;
   for(let i=0;i<n;i++){const pg=await A.pdfDocument.getPage(i+1),tc=await pg.getTextContent();for(const it of tc.items){const s=(it.str||'').toLowerCase();let at=s.indexOf(q);
     while(at>=0&&s.length){const [a,,,dd,e,f]=it.transform,h=Math.abs(dd)||Math.abs(a)||it.height,cw=it.width/s.length,x=e+at*cw;(boxes[i]=boxes[i]||[]).push([x-1,f-h*.25,x+cw*q.length+1,f+h*.95]);hits++;at=s.indexOf(q,at+q.length)}}}
   if(!hits)return toast('Not found. Scanned pages need OCR first');if(!confirm(`Black out ${hits} match${hits>1?'es':''} on ${Object.keys(boxes).length} page(s)? The text is removed for good on those pages.`))return;
   const out=await rasterDoc(Object.keys(boxes).map(Number),2,.9,boxes);return reloadWith(await out.save(),`Redacted ${hits} match${hits>1?'es':''}`)}
 if(id==='flat'){const bytes=await currentBytes(),d=await L().PDFDocument.load(new Uint8Array(bytes),{ignoreEncryption:true});try{d.getForm().flatten()}catch(e){}
   if(!confirm('Flatten form fields and comments so they can no longer be edited?'))return;const hasAnn=d.getPages().some(p=>p.node.Annots()&&p.node.Annots().size());
   if(hasAnn){const out=await rasterDoc(null,2,.9);return reloadWith(await out.save(),'Flattened')}return reloadWith(await d.save(),'Form flattened')}
 if(id==='blank'){const d=await load(),at=A.page,ref=d.getPage(at-1).getSize();d.insertPage(at,[ref.width,ref.height]);const b=await d.save();await reloadWith(b,`Blank page added after page ${at}`);return}
 if(id==='rot'){const deg=+prompt('Rotate all pages by 90, 180 or 270 degrees:','90');if(![90,180,270].includes(deg))return;const d=await load();d.getPages().forEach(p=>p.setRotation(degrees((p.getRotation().angle+deg)%360)));return reloadWith(await d.save(),'Rotated')}
 if(id==='props'){const d=await load(),t=prompt('Title:',d.getTitle()||base());if(t===null)return;const au=prompt('Author:',d.getAuthor()||'');if(au===null)return;const sb=prompt('Subject:',d.getSubject()||'');if(sb===null)return;
   d.setTitle(t);d.setAuthor(au);d.setSubject(sb);d.setModificationDate(new Date());d.setProducer('Folio');return reloadWith(await d.save(),'Properties saved')}
 }catch(e){console.error(e);toast('That didn\'t work: '+e.message)}}
window.__folioTool=run;
})();
