// Folio: edit existing text, PDF properties, extract fonts/images. All offline.
(()=>{const g=$('tGrid');if(!g)return;const A=()=>app(),base=()=>cur.name.replace(/\.pdf$/i,'');
const add=(ic,lab,fn)=>{const b=document.createElement('button');b.className='tool';b.innerHTML='<span></span><small></small>';b.firstChild.textContent=ic;b.lastChild.textContent=lab;b.onclick=()=>{$('toolSheet').hidden=true;fn().catch(e=>{console.error(e);busy(false);toast("That didn't work: "+(e.message||e))})};g.prepend(b)};
let bz;const busy=m=>{if(!bz){bz=document.createElement('div');bz.id='proBusy';bz.innerHTML='<div class="spin"></div><b></b><small>Everything stays on this phone</small>';document.body.appendChild(bz)}bz.hidden=!m;if(m)bz.querySelector('b').textContent=m};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function sheet(title,html){let m=$('resSheet');if(!m){m=document.createElement('div');m.id='resSheet';document.body.appendChild(m)}
  m.innerHTML=`<div class="rsBox"><div class="rsHead"><b>${esc(title)}</b><button class="rsX">✕</button></div><div class="rsBody">${html}</div></div>`;m.hidden=false;m.querySelector('.rsX').onclick=()=>m.hidden=true;m.onclick=e=>{if(e.target===m)m.hidden=true};return m}
const load=async()=>PDFLib.PDFDocument.load(new Uint8Array(await currentBytes()),{ignoreEncryption:true,updateMetadata:false});
const {PDFName,PDFDict,PDFRawStream,PDFArray,PDFNumber}=PDFLib;
// ---------- Edit existing text ----------
function stdFont(name,fam){const n=(name+' '+(fam||'')).toLowerCase(),b=/bold|black|heavy|semibold|demi/.test(n),i=/italic|oblique/.test(n),F=PDFLib.StandardFonts;
  if(/courier|mono|consol|code/.test(n))return b&&i?F.CourierBoldOblique:b?F.CourierBold:i?F.CourierOblique:F.Courier;
  if(/times|serif|roman|georgia|garamond|book|minion|cambria/.test(n)&&!/sans/.test(n))return b&&i?F.TimesRomanBoldItalic:b?F.TimesRomanBold:i?F.TimesRomanItalic:F.TimesRoman;
  return b&&i?F.HelveticaBoldOblique:b?F.HelveticaBold:i?F.HelveticaOblique:F.Helvetica}
async function lines(pi){const pg=await A().pdfDocument.getPage(pi+1),tc=await pg.getTextContent(),L=[];
  for(const it of tc.items){if(!it.str||!it.str.trim()||!it.transform)continue;const t=it.transform,h=Math.hypot(t[2],t[3])||10,y=t[5];let l=L.find(l=>Math.abs(l.y-y)<h*.4&&it.transform[4]<=l.x1+h*1.2&&it.transform[4]>=l.x0-h);
    if(!l){l={y,h,x0:t[4],x1:t[4]+it.width,str:'',items:[],font:it.fontName,fam:(tc.styles[it.fontName]||{}).fontFamily};L.push(l)}l.items.push(it);l.x0=Math.min(l.x0,t[4]);l.x1=Math.max(l.x1,t[4]+it.width);l.h=Math.max(l.h,h)}
  for(const l of L){l.items.sort((a,b)=>a.transform[4]-b.transform[4]);let s='',e=null;for(const it of l.items){if(e!=null&&it.transform[4]-e>l.h*.2&&!s.endsWith(' '))s+=' ';s+=it.str;e=it.transform[4]+it.width}l.str=s}
  return L.sort((a,b)=>b.y-a.y||a.x0-b.x0)}
add('✏️','Edit text',async()=>{const pi=(A().page||1)-1,L=await lines(pi);if(!L.length)return toast('No editable text on this page. Run OCR first if it is a scan');
  const m=sheet(`Edit text on page ${pi+1}`,`<input class="rsFind" placeholder="Find a line…"><div class="rsList">${L.map((l,i)=>`<button class="rsLine" data-i="${i}">${esc(l.str)}</button>`).join('')}</div>`);
  m.querySelector('.rsFind').oninput=e=>{const q=e.target.value.toLowerCase();m.querySelectorAll('.rsLine').forEach(b=>b.hidden=!b.textContent.toLowerCase().includes(q))};
  m.querySelectorAll('.rsLine').forEach(b=>b.onclick=()=>{const l=L[+b.dataset.i];m.querySelector('.rsBody').innerHTML=`<p class="muted">Original: ${esc(l.str)}</p><textarea class="rsEdit" rows="3"></textarea><label class="rsRow"><input type="checkbox" class="rsBold"> Bold</label><div class="rsRow"><button class="rsCancel ghost">Cancel</button><button class="rsOk pri">Replace</button></div>`;
    const ta=m.querySelector('.rsEdit');ta.value=l.str;const fnm=stdFont(l.font,l.fam);m.querySelector('.rsBold').checked=/Bold/.test(fnm);ta.focus();m.querySelector('.rsCancel').onclick=()=>m.hidden=true;
    m.querySelector('.rsOk').onclick=async()=>{m.hidden=true;busy('Replacing text…');await replaceLine(pi,l,ta.value,m.querySelector('.rsBold').checked);}})});
async function replaceLine(pi,l,txt,bold){const pg=await A().pdfDocument.getPage(pi+1),vp=pg.getViewport({scale:3}),c=document.createElement('canvas');c.width=vp.width;c.height=vp.height;const x=c.getContext('2d');await pg.render({canvasContext:x,viewport:vp}).promise;
  const [px0,py0]=vp.convertToViewportPoint(l.x0,l.y+l.h*.85),[px1,py1]=vp.convertToViewportPoint(l.x1,l.y-l.h*.25);const rx=Math.min(px0,px1),ry=Math.min(py0,py1),rw=Math.abs(px1-px0),rh=Math.abs(py1-py0);
  const samp=(sx,sy)=>{const d=x.getImageData(Math.max(0,Math.min(c.width-1,sx)),Math.max(0,Math.min(c.height-1,sy)),1,1).data;return[d[0],d[1],d[2]]};
  const bgs=[samp(rx-4,ry+rh/2),samp(rx+rw+4,ry+rh/2),samp(rx+rw/2,ry-3),samp(rx+rw/2,ry+rh+3)].sort((a,b)=>(b[0]+b[1]+b[2])-(a[0]+a[1]+a[2]));const bg=bgs[1];
  const box=x.getImageData(rx,ry,Math.max(1,rw),Math.max(1,rh)).data;let dk=[0,0,0],dv=1e9;for(let i=0;i<box.length;i+=4){const v=Math.abs(box[i]-bg[0])+Math.abs(box[i+1]-bg[1])+Math.abs(box[i+2]-bg[2]);if(-v<dv){dv=-v;dk=[box[i],box[i+1],box[i+2]]}}
  const d=await load(),p=d.getPage(pi);let fn=stdFont(l.font,l.fam);fn=bold?(fn.includes('Bold')?fn:fn.replace(/^(Helvetica|Courier)(Oblique)?$/,(a,f,o)=>f+'-Bold'+(o?'Oblique':'')).replace('Times-Roman','Times-Bold').replace('Times-Italic','Times-BoldItalic')):fn.replace('-BoldOblique','-Oblique').replace('-Bold','').replace('Times-BoldItalic','Times-Italic').replace(/^Times$/,'Times-Roman');
  if(!Object.values(PDFLib.StandardFonts).includes(fn))fn=PDFLib.StandardFonts.Helvetica;const font=await d.embedFont(fn),rgb=PDFLib.rgb,C=a=>rgb(a[0]/255,a[1]/255,a[2]/255);
  const size=l.h,clean=txt.replace(/[^\x20-\x7e\u00a0-\u00ff\n]/g,'?');p.drawRectangle({x:l.x0-1,y:l.y-l.h*.25,width:l.x1-l.x0+2,height:l.h*1.15,color:C(bg)});
  clean.split('\n').forEach((s,i)=>{let sz=size;const w=font.widthOfTextAtSize(s,sz);p.drawText(s,{x:l.x0,y:l.y-i*size*1.2,size:sz,font,color:C(dk)})});
  busy(false);await reloadWith(await d.save(),'Text replaced')}
// ---------- Properties ----------
const fmtD=d=>d?d.toLocaleString():'—',kb=n=>n>1048576?(n/1048576).toFixed(2)+' MB':(n/1024).toFixed(1)+' KB';
function scan(d){const fonts=new Map(),imgs=[];for(const [ref,o] of d.context.enumerateIndirectObjects()){const dict=o instanceof PDFRawStream?o.dict:o instanceof PDFDict?o:null;if(!dict)continue;
    const t=dict.get(PDFName.of('Type')),st=dict.get(PDFName.of('Subtype'));
    if(t===PDFName.of('Font')||(t&&t.toString()==='/Font')){const bf=dict.get(PDFName.of('BaseFont'));const nm=bf?bf.toString().slice(1).replace(/^[A-Z]{6}\+/,''):'(unnamed)';let fd=dict.lookup(PDFName.of('FontDescriptor'));
      const df=dict.lookup(PDFName.of('DescendantFonts'));if(!fd&&df instanceof PDFArray){const d0=df.lookup(0);if(d0)fd=d0.lookup(PDFName.of('FontDescriptor'))}
      let file=null,ext=null;if(fd instanceof PDFDict){for(const [k,e] of [['FontFile2','ttf'],['FontFile3','otf'],['FontFile','pfb']]){const f=fd.lookup(PDFName.of(k));if(f){file=f;ext=e;if(k==='FontFile3'){const s=f.dict.get(PDFName.of('Subtype'));if(s&&s.toString()!=='/OpenType')ext='cff'}break}}}
      const key=nm+(st?st.toString():'');if(!fonts.has(key)||file)fonts.set(key,{name:nm,type:st?st.toString().slice(1):'',embedded:!!file,file,ext})}
    if(o instanceof PDFRawStream&&st&&st.toString()==='/Image'){const n=k=>{const v=dict.lookup(PDFName.of(k));return v instanceof PDFNumber?v.asNumber():v};imgs.push({s:o,w:n('Width'),h:n('Height'),f:String(dict.lookup(PDFName.of('Filter'))||''),cs:String(dict.lookup(PDFName.of('ColorSpace'))||''),bpc:n('BitsPerComponent'),mask:!!dict.get(PDFName.of('ImageMask'))})}}
  return{fonts:[...fonts.values()],imgs}}
add('ℹ️','Properties',async()=>{busy('Reading properties…');const bytes=new Uint8Array(await currentBytes()),d=await load(),md=(await A().pdfDocument.getMetadata()).info||{},{fonts,imgs}=scan(d),p0=d.getPage(0).getSize();
  const ver=new TextDecoder().decode(bytes.slice(0,16)).match(/%PDF-(\d\.\d)/),sz=s=>`${(s.width/72*25.4).toFixed(0)} × ${(s.height/72*25.4).toFixed(0)} mm (${(s.width/72).toFixed(2)} × ${(s.height/72).toFixed(2)} in)`;
  const sizes=new Set(d.getPages().map(p=>{const s=p.getSize();return Math.round(s.width)+'x'+Math.round(s.height)}));busy(false);
  const row=(k,v)=>`<tr><td>${k}</td><td>${esc(v)}</td></tr>`,ed=(k,lab,v)=>`<tr><td>${lab}</td><td><input class="rsMeta" data-k="${k}" value="${esc(v)}"></td></tr>`;
  const m=sheet('Document properties',`<table class="rsTab">${ed('Title','Title',d.getTitle()||md.Title||'')}${ed('Author','Author',d.getAuthor()||md.Author||'')}${ed('Subject','Subject',d.getSubject()||md.Subject||'')}${ed('Keywords','Keywords',d.getKeywords()||md.Keywords||'')}
   ${row('File name',cur.name)}${row('File size',kb(bytes.length))}${row('PDF version',ver?ver[1]:'?')}${row('Pages',d.getPageCount())}${row('Page size',sz(p0)+(sizes.size>1?` (+${sizes.size-1} other sizes)`:''))}
   ${row('Created',fmtD(d.getCreationDate()))}${row('Modified',fmtD(d.getModificationDate()))}${row('Creator app',d.getCreator()||md.Creator||'—')}${row('PDF producer',d.getProducer()||md.Producer||'—')}
   ${row('Encrypted',md.IsEncrypted||d.isEncrypted?'Yes':'No')}${row('Tagged / accessible',d.catalog.get(PDFName.of('MarkInfo'))?'Yes':'No')}${row('Has forms',d.catalog.get(PDFName.of('AcroForm'))?'Yes':'No')}${row('Linearized (fast web view)',md.IsLinearized?'Yes':'No')}
   ${row('Fonts',fonts.length+` (${fonts.filter(f=>f.embedded).length} embedded)`)}${row('Images',imgs.length)}</table>
   <div class="rsSub">Fonts</div>${fonts.map(f=>`<div class="rsF">${esc(f.name)} <small class="muted">${esc(f.type)} · ${f.embedded?'embedded':'not embedded'}</small></div>`).join('')||'<p class="muted">None</p>'}
   <div class="rsRow"><button class="rsSave pri">Save details</button><button class="rsExt ghost">Extract resources…</button></div>`);
  m.querySelector('.rsExt').onclick=()=>{m.hidden=true;window.__folioTool&&0;extract()};
  m.querySelector('.rsSave').onclick=async()=>{const d2=await PDFLib.PDFDocument.load(new Uint8Array(await currentBytes()),{ignoreEncryption:true});m.querySelectorAll('.rsMeta').forEach(i=>{const v=i.value.trim();if(i.dataset.k==='Keywords')d2.setKeywords(v?v.split(/[,;]\s*/):[]);else d2['set'+i.dataset.k](v)});d2.setModificationDate(new Date());m.hidden=true;await reloadWith(await d2.save(),'Properties saved')}});
// ---------- Extract resources ----------
const crcT=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})(),crc=b=>{let c=~0;for(let i=0;i<b.length;i++)c=crcT[(c^b[i])&255]^(c>>>8);return ~c>>>0};
async function toPng(im){const raw=PDFLib.decodePDFRawStream(im.s).decode(),w=im.w,h=im.h,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d'),id=x.createImageData(w,h),o=id.data;
  const cs=im.cs,bpc=im.bpc||8;let nc=/CMYK/.test(cs)?4:/Gray|G\b/.test(cs)||im.mask?1:/RGB/.test(cs)?3:null;if(nc==null){nc=Math.round(raw.length/(w*h))||3;if(![1,3,4].includes(nc))return null}
  if(bpc!==8&&!(bpc===1&&nc===1))return null;const row=Math.ceil(w*nc*bpc/8);
  for(let y=0;y<h;y++)for(let xx=0;xx<w;xx++){const i=(y*w+xx)*4;let r,g,b;if(bpc===1){const v=(raw[y*row+(xx>>3)]>>(7-(xx&7)))&1;r=g=b=(im.mask?1-v:v)*255}else{const j=y*row+xx*nc;if(nc===1)r=g=b=raw[j];else if(nc===3){r=raw[j];g=raw[j+1];b=raw[j+2]}else{const k=raw[j+3];r=255-Math.min(255,raw[j]+k);g=255-Math.min(255,raw[j+1]+k);b=255-Math.min(255,raw[j+2]+k)}}o[i]=r;o[i+1]=g;o[i+2]=b;o[i+3]=255}
  x.putImageData(id,0,0);return new Uint8Array(await (await new Promise(r=>c.toBlob(r,'image/png'))).arrayBuffer())}
async function extract(){busy('Finding fonts and images…');const d=await load(),{fonts,imgs}=scan(d),files=[];
  for(const [i,im] of imgs.entries()){busy(`Image ${i+1} of ${imgs.length}…`);try{if(/DCTDecode/.test(im.f)&&!/CMYK/.test(im.cs))files.push([`images/image-${i+1}.jpg`,im.s.contents]);else if(/JPXDecode/.test(im.f))files.push([`images/image-${i+1}.jp2`,im.s.contents]);
      else{const p=await toPng(im);if(p)files.push([`images/image-${i+1}.png`,p])}}catch(e){console.warn(e)}}
  for(const f of fonts)if(f.file){try{const b=f.file instanceof PDFRawStream?PDFLib.decodePDFRawStream(f.file).decode():null;if(b)files.push([`fonts/${f.name.replace(/[^\w.-]/g,'_')}.${f.ext}`,b])}catch(e){console.warn(e)}}
  const n=d.getPageCount();let txt='';for(let i=0;i<n;i++){const tc=await (await A().pdfDocument.getPage(i+1)).getTextContent();txt+=`--- Page ${i+1} ---\n`+tc.items.map(t=>t.str+(t.hasEOL?'\n':'')).join('')+'\n\n'}
  files.push(['text.txt',new TextEncoder().encode(txt)]);busy(false);
  const imgN=files.filter(f=>f[0].startsWith('images')).length,fontN=files.filter(f=>f[0].startsWith('fonts')).length;
  const m=sheet('Extract resources',`<p>Found <b>${imgN}</b> images${imgs.length>imgN?` (${imgs.length-imgN} in formats I can't export)`:''}, <b>${fontN}</b> embedded fonts${fonts.length>fontN?` (${fonts.length-fontN} more are not embedded in the file)`:''}, and the page text.</p>
   <div class="rsGrid">${files.filter(f=>/\.(jpg|png)$/.test(f[0])).slice(0,24).map(f=>`<img src="${URL.createObjectURL(new Blob([f[1]],{type:f[0].endsWith('png')?'image/png':'image/jpeg'}))}">`).join('')}</div>
   <div class="rsRow"><button class="rsZip pri">Save all as ZIP</button></div><div class="rsSub">Or save one</div><div class="rsList">${files.map((f,i)=>`<button class="rsLine" data-i="${i}">${esc(f[0])} <small class="muted">${kb(f[1].length)}</small></button>`).join('')}</div>`);
  m.querySelector('.rsZip').onclick=async()=>{busy('Zipping…');if(!window.JSZip)await new Promise((r,j)=>{const s=document.createElement('script');s.src='vendor/jszip.min.js';s.onload=r;s.onerror=j;document.head.appendChild(s)});const z=new JSZip();for(const [p,b] of files)z.file(p,b);const out=await z.generateAsync({type:'uint8array'});busy(false);await exportFile(out,base()+' resources.zip',true)};
  m.querySelectorAll('.rsLine').forEach(b=>b.onclick=()=>{const f=files[+b.dataset.i];exportFile(f[1],base()+' '+f[0].split('/').pop(),true)})}
add('🧩','Extract fonts & images',extract);
window.__folioRes={lines,scan,extract,replaceLine};
})();
