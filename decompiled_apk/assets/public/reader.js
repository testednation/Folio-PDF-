// Folio reader: EPUB, text, Markdown, HTML; image import to PDF. All offline.
const R={d:null,book:null,rend:null};
const THEMES={Paper:['#fbf8f1','#222'],Sepia:['#f4ecd8','#5b4636'],Night:['#121212','#d6d6d6']};
const kindOf=n=>{n=n.toLowerCase();if(n.endsWith('.epub'))return'epub';if(/\.(md|markdown)$/.test(n))return'md';if(/\.html?$/.test(n))return'html';if(n.endsWith('.txt'))return'txt';if(/\.(jpe?g|png|webp|gif)$/.test(n))return'img';return'pdf'};
async function imgToPdf(f){const doc=await PDFLib.PDFDocument.create();const url=URL.createObjectURL(f),im=new Image();im.src=url;await im.decode();
  const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext('2d').drawImage(im,0,0);
  const jpg=await doc.embedJpg(await (await new Promise(r=>c.toBlob(r,'image/jpeg',.92))).arrayBuffer());
  const W=595,H=W*im.naturalHeight/im.naturalWidth,p=doc.addPage([W,H]);p.drawImage(jpg,{x:0,y:0,width:W,height:H});URL.revokeObjectURL(url);return await doc.save()}
$('file').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const k=kindOf(f.name);let buf,name=f.name;
  try{if(k==='img'){toast('Converting image to PDF…');buf=await imgToPdf(f);name=f.name.replace(/\.\w+$/,'')+'.pdf'}else buf=new Uint8Array(await f.arrayBuffer())}catch(err){toast('Could not open that file');return}
  const d={id:Date.now(),name,data:buf,size:buf.length,t:Date.now(),kind:k==='img'?'pdf':k};await st('readwrite',s=>s.put(d));openDoc(d)};
const save=()=>{R.d.seen=Date.now();st('readwrite',s=>s.put(R.d))};
const theme=()=>{const t=THEMES[localStorage.rTheme||'Paper'],r=$('reader');r.style.setProperty('--rbg',t[0]);r.style.setProperty('--rtx',t[1]);
  const fs=(localStorage.rFs||100)+'%';if(R.rend){R.rend.themes.override('color',t[1]);R.rend.themes.override('background',t[0]);R.rend.themes.fontSize(fs)}else $('rView').style.fontSize=fs};
const _openPdf=openDoc;
openDoc=async function(d){if(!d.kind||d.kind==='pdf')return _openPdf(d);R.d=d;$('home').hidden=true;$('reader').hidden=false;$('rTitle').textContent=d.name.replace(/\.\w+$/,'');
  const v=$('rView');v.innerHTML='';v.onscroll=null;$('reader').classList.toggle('txt',d.kind!=='epub');
  if(d.kind==='epub'){v.className='';R.book=ePub(d.data.buffer.slice(0));R.rend=R.book.renderTo(v,{width:'100%',height:'100%',flow:'paginated',spread:'none',allowScriptedContent:false});theme();
    await R.rend.display(d.loc&&d.loc.cfi||undefined);if(d.loc&&d.loc.cfi)toast('Back where you left off');
    const md=await R.book.loaded.metadata;if(md.title){$('rTitle').textContent=md.title;if(!d.title){d.title=md.title;d.name=md.title+'.epub'}}
    try{const cu=await R.book.coverUrl();if(cu&&!d.thumb){const im=new Image();im.src=cu;await im.decode();const c=document.createElement('canvas');c.width=120;c.height=120*im.height/im.width;c.getContext('2d').drawImage(im,0,0,c.width,c.height);d.thumb=c.toDataURL('image/jpeg',.7)}}catch(e){}
    R.rend.on('relocated',l=>{const p=R.book.locations.length()?R.book.locations.percentageFromCfi(l.start.cfi):(l.start.displayed.page/l.start.displayed.total);
      d.loc={cfi:l.start.cfi,page:Math.max(1,Math.round(p*100)),label:currentChapter(l)};d.pages=100;$('rPfill').style.width=(p*100)+'%';
      $('rFoot').textContent=`${d.loc.label||''}  ·  ${Math.round(p*100)}%`;save()});
    R.rend.on('keyup',k=>{if(k.key==='ArrowRight')R.rend.next();if(k.key==='ArrowLeft')R.rend.prev()});
    R.book.ready.then(()=>R.book.locations.generate(1200)).then(()=>{if(R.rend.location)R.rend.emit('relocated',R.rend.location)});
    let sx=0;R.rend.on('touchstart',e=>sx=e.changedTouches[0].screenX);R.rend.on('touchend',e=>{const dx=e.changedTouches[0].screenX-sx;if(dx<-50)R.rend.next();if(dx>50)R.rend.prev()});
  }else{R.book=R.rend=null;v.className='scroll';const t=new TextDecoder().decode(d.data);
    if(d.kind==='md')v.innerHTML=marked.parse(t);else if(d.kind==='html'){const doc=new DOMParser().parseFromString(t,'text/html');doc.querySelectorAll('script,iframe,object,embed,link,meta').forEach(x=>x.remove());doc.querySelectorAll('*').forEach(el=>[...el.attributes].forEach(a=>{if(/^on/i.test(a.name))el.removeAttribute(a.name)}));v.innerHTML=doc.body.innerHTML}
    else{const p=document.createElement('pre');p.textContent=t;v.appendChild(p)}
    if(d.kind==='md')v.querySelectorAll('script').forEach(x=>x.remove());
    theme();await new Promise(r=>requestAnimationFrame(r));
    if(d.loc&&d.loc.f){v.scrollTop=d.loc.f*(v.scrollHeight-v.clientHeight);toast('Back where you left off')}
    let tm;v.onscroll=()=>{const f=v.scrollTop/Math.max(1,v.scrollHeight-v.clientHeight);$('rPfill').style.width=(f*100)+'%';$('rFoot').textContent=Math.round(f*100)+'%';
      d.loc={f,page:Math.max(1,Math.round(f*100))};d.pages=100;clearTimeout(tm);tm=setTimeout(save,500)};v.onscroll()}
  save()};
function currentChapter(l){try{const it=R.book.navigation.get(l.start.href)||R.book.navigation.toc.find(t=>l.start.href.includes(t.href.split('#')[0]));return it?it.label.trim():''}catch(e){return''}}
$('rNext').onclick=()=>R.rend&&R.rend.next();$('rPrev').onclick=()=>R.rend&&R.rend.prev();
$('rBack').onclick=()=>{if(R.book){R.book.destroy();R.book=R.rend=null}$('reader').hidden=true;$('home').hidden=false;listRecent()};
const sheet=(t,html)=>{$('rsTitle').textContent=t;$('rsBody').innerHTML=html;$('rSheet').hidden=false};$('rsClose').onclick=()=>$('rSheet').hidden=true;
$('rToc').onclick=()=>{if(!R.book){const hs=[...$('rView').querySelectorAll('h1,h2,h3')];sheet('Contents',hs.length?'<div class="toc">'+hs.map((h,i)=>`<a href="#" data-i="${i}" class="${h.tagName!=='H1'?'sub':''}"></a>`).join('')+'</div>':'<p class="muted">No headings in this file.</p>');
    $('rsBody').querySelectorAll('a').forEach(a=>{a.textContent=hs[a.dataset.i].textContent;a.onclick=e=>{e.preventDefault();hs[a.dataset.i].scrollIntoView();$('rSheet').hidden=true}});return}
  const items=[];const walk=(l,dep)=>l.forEach(t=>{items.push([t,dep]);if(t.subitems)walk(t.subitems,dep+1)});walk(R.book.navigation.toc,0);
  sheet('Contents','<div class="toc">'+items.map((x,i)=>`<a href="#" data-i="${i}" class="${x[1]?'sub':''}"></a>`).join('')+'</div>');
  $('rsBody').querySelectorAll('a').forEach(a=>{const t=items[a.dataset.i][0];a.textContent=t.label.trim();a.onclick=e=>{e.preventDefault();R.rend.display(t.href);$('rSheet').hidden=true}})};
$('rAa').onclick=()=>{sheet('Text',`<div class="fs"><span>A</span><input id="fsR" type="range" min="70" max="200" step="10" value="${localStorage.rFs||100}"><span style="font-size:22px">A</span></div><div class="thm">${Object.keys(THEMES).map(k=>`<button data-k="${k}" style="background:${THEMES[k][0]};color:${THEMES[k][1]}" class="${(localStorage.rTheme||'Paper')===k?'sel':''}">${k}</button>`).join('')}</div>`);
  $('fsR').oninput=e=>{localStorage.rFs=e.target.value;theme()};$('rsBody').querySelectorAll('.thm button').forEach(b=>b.onclick=()=>{localStorage.rTheme=b.dataset.k;theme();$('rAa').onclick()})};
$('rBm').onclick=()=>{const d=R.d,bms=d.bms||[];sheet('Bookmarks','<button id="rAdd" class="pill" style="margin-bottom:10px">＋ Bookmark here</button><ul class="list" id="rBms"></ul>');
  const ul=$('rBms');if(!bms.length)ul.innerHTML='<li><div class="meta muted small">No bookmarks yet. Folio remembers your place automatically.</div></li>';
  bms.forEach(b=>{const li=document.createElement('li');li.innerHTML=`<span class="bmpage">${b.page}%</span><div class="meta"><div class="nm"></div></div><button class="del icon">✕</button>`;li.querySelector('.nm').textContent=b.label;
    li.querySelector('.meta').onclick=()=>{if(b.cfi)R.rend.display(b.cfi);else{const v=$('rView');v.scrollTop=b.f*(v.scrollHeight-v.clientHeight)}$('rSheet').hidden=true};
    li.querySelector('.del').onclick=()=>{d.bms=d.bms.filter(x=>x!==b);save();$('rBm').onclick()};ul.appendChild(li)});
  $('rAdd').onclick=()=>{const l=d.loc||{page:1};let label=l.label||'';if(!label){try{label=(R.rend?R.rend.getContents()[0].document.body.innerText:$('rView').innerText.slice(Math.round((l.f||0)*$('rView').innerText.length))).trim().slice(0,60)}catch(e){}}
    d.bms=(d.bms||[]).concat({...l,label:label||('At '+l.page+'%'),t:Date.now()});save();toast('Bookmarked');$('rBm').onclick()}};
