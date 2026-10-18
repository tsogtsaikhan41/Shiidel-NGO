/* Shared site script: header/footer, contact, diagram animation, posts */
(function(){
const C = window.SITE_CONFIG || {};
const AREAS = window.AREAS || [];
const byId = Object.fromEntries(AREAS.map(a=>[a.id,a]));
const esc = s => String(s==null?"":s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const Site = window.Site = {esc, byId, reduced};

/* ---------------- header & footer ---------------- */
const NAV = [
  ["services.html","Зөвлөх үйлчилгээ","services"],
  ["academy.html","Манлайллын академи","academy"],["insights.html","Судалгаа","insights"],
  ["blog.html","Блог","blog"]
];
const LOGO = `<img src="assets/logo.png" alt="" width="44" height="44">`;
const INTERESTS = ["5 менежментийн оношилгоо","Тусдаа зөвлөгөө","Цогц зөвлөгөө","Манлайллын академи","Нийгмийн хөтөлбөр","Бусад"];

function header(){
  const page = document.body.dataset.page;
  const el = document.querySelector("[data-header]"); if(!el) return;
  el.outerHTML = `<header class="site-header"><div class="wrap bar">
    <a class="brand" href="index.html" aria-label="Шийдэл, нүүр хуудас">${LOGO}<div><b>Шийдэл</b><span>Тогтвортой хөгжлийн гүүр</span></div></a>
    <nav class="site-nav" id="siteNav" aria-label="Үндсэн цэс"><ul>
      ${NAV.map(([h,t,k])=>`<li><a href="${h}"${k===page?' aria-current="page"':""}>${t}</a></li>`).join("")}
    </ul></nav>
    <a class="btn small" href="#contact">Холбогдох</a>
    <button class="menu-btn" aria-label="Цэс нээх" aria-expanded="false" aria-controls="siteNav"><span></span><span></span><span></span></button>
  </div></header>`;
  const hdr=document.querySelector(".site-header"), nav=document.getElementById("siteNav"), mb=hdr.querySelector(".menu-btn");
  addEventListener("scroll",()=>hdr.classList.toggle("scrolled", scrollY>8),{passive:true});
  mb.addEventListener("click",()=>{const o=nav.classList.toggle("open"); mb.setAttribute("aria-expanded",o);});
  nav.addEventListener("click",e=>{ if(e.target.closest("a")){nav.classList.remove("open"); mb.setAttribute("aria-expanded",false);} });
}

function footer(){
  const el = document.querySelector("[data-footer]"); if(!el) return;
  const media = C.aboutImage ? `<div class="about-media"><img src="${esc(C.aboutImage)}" alt="Манай баг" loading="lazy"></div>` : "";
  el.outerHTML = `<footer class="site-footer dark">
  <section class="about" id="about"><div class="wrap about-grid">
    <div>
      <p class="kicker">Бидний тухай</p>
      <h2>Нэг хэлтсийг биш, бизнесийг бүхэлд нь холбодог.</h2>
      <p class="lede">${esc(C.orgName||"")} нь хүний нөөц, маркетинг, борлуулалт, санхүү, үйл ажиллагааны менежментийг хооронд нь уялдуулж, тогтвортой өсөх бизнесийг бий болгоход чиглэсэн зөвлөх, сургалтын байгууллага юм.</p>
      ${media}
    </div>
    <div>
      <div class="mv">
        <div><h4>Эрхэм зорилго</h4><p>Байгууллагын таван үндсэн менежментийг хооронд нь холбож, тогтвортой хөгжих бизнесийг бий болгох.</p></div>
        <div><h4>Алсын хараа</h4><p>Монголын бизнесүүдийн бүхэлдээ, системтэй хөгжих итгэлтэй түнш болох.</p></div>
      </div>
      <div class="values">
        <div><b>Системтэй сэтгэлгээ</b><span>Асуудлыг бүхэл системийн хүрээнд харна.</span></div>
        <div><b>Үндсэн шалтгаан</b><span>Шинж тэмдгийг биш, үндсийг нь шийднэ.</span></div>
        <div><b>Хэрэгжилт</b><span>Зөвлөгөө өгөөд зогсохгүй, хамтдаа хэрэгжүүлнэ.</span></div>
        <div><b>Хэмжигдэх үр дүн</b><span>Ажлын үр дүнг тоогоор харуулна.</span></div>
      </div>
    </div>
  </div></section>
  <section class="contact" id="contact"><div class="wrap contact-grid">
    <div>
      <p class="kicker">Холбоо барих</p>
      <h2>Бизнесээ хамтдаа холбоё.</h2>
      <p class="lede" style="margin-top:18px">Хүсэлтээ үлдээгээрэй. Бид тантай холбогдож, 30 минутын танилцах уулзалтаар хаанаас эхлэхийг хамтдаа тодорхойлно.</p>
      <dl>
        ${C.phone?`<dt>Утас</dt><dd><a href="tel:${esc(C.phone.replace(/\s/g,""))}">${esc(C.phone)}</a></dd>`:""}
        ${C.email?`<dt>Имэйл</dt><dd><a href="mailto:${esc(C.email)}">${esc(C.email)}</a></dd>`:""}
        ${C.address?`<dt>Хаяг</dt><dd>${esc(C.address)}</dd>`:""}
      </dl>
    </div>
    <form class="form-grid" id="contactForm" novalidate>
      <label class="field">Нэр<input name="name" required autocomplete="name"></label>
      <label class="field">Байгууллага<input name="company" autocomplete="organization"></label>
      <label class="field">Утас эсвэл имэйл<input name="contact" required></label>
      <label class="field">Сонирхож буй чиглэл<select name="interest" id="interest">${INTERESTS.map(i=>`<option>${esc(i)}</option>`).join("")}</select></label>
      <label class="field full">Мессеж<textarea name="message" placeholder="Танай байгууллагад одоо тулгамдаж буй асуудал юу вэ?"></textarea></label>
      <label class="hp" aria-hidden="true">Үүнийг бүү бөглө<input name="_honey" tabindex="-1" autocomplete="off"></label>
      <button class="btn" type="submit">Хүсэлт илгээх</button>
      <p class="status full" id="contactStatus" role="status"></p>
    </form>
  </div></section>
  <div class="foot-bar"><div class="wrap">
    <span>© ${new Date().getFullYear()} ${esc(C.orgName||"")}</span>
    <nav aria-label="Доод цэс">${NAV.map(([h,t])=>`<a href="${h}">${t}</a>`).join("")}<a href="admin.html">Нэвтрэх</a></nav>
  </div></div>
</footer>`;
  const f = document.getElementById("contactForm");
  f.addEventListener("submit", async e=>{
    e.preventDefault();
    const st = document.getElementById("contactStatus"); st.className="status full";
    if(f._honey.value) return;
    if(!f.name.value.trim()||!f.contact.value.trim()){ st.textContent="Нэр болон утас эсвэл имэйлээ оруулна уу."; st.classList.add("err"); return; }
    const btn=f.querySelector("button[type=submit]"); btn.disabled=true; st.textContent="Илгээж байна...";
    const ok = await Site.send("Вэб сайтаас хүсэлт: "+f.interest.value, {
      "Нэр":f.name.value, "Байгууллага":f.company.value, "Холбоо барих":f.contact.value,
      "Сонирхож буй чиглэл":f.interest.value, "Мессеж":f.message.value, "Хуудас":document.title
    });
    btn.disabled=false;
    if(ok){ st.textContent="Баярлалаа. Таны хүсэлт хүлээн авагдлаа, бид удахгүй холбогдоно."; st.classList.add("ok"); f.reset(); }
    else { st.textContent=Site.failText(); st.classList.add("err"); }
  });
}

/* send any form to the configured email via FormSubmit */
Site.send = async function(subject, fields){
  if(!C.email) return false;
  try{
    const r = await fetch("https://formsubmit.co/ajax/"+encodeURIComponent(C.email), {
      method:"POST", headers:{"Content-Type":"application/json","Accept":"application/json"},
      body: JSON.stringify(Object.assign({_subject:subject, _template:"table", _captcha:"false"}, fields))
    });
    const j = await r.json().catch(()=>({}));
    if(r.ok && String(j.success)==="true"){ Site.lastError=null; return true; }
    const msg = String(j.message||"");
    Site.lastError = {activation:/activat/i.test(msg), msg: msg || ("HTTP "+r.status)};
    console.warn("FormSubmit:", r.status, msg);
    return false;
  }catch(e){ Site.lastError={activation:false, msg:String(e.message||e)}; console.warn("FormSubmit:", e); return false; }
};
/* human-readable reason for the last failed send */
Site.failText = function(){
  const e = Site.lastError||{};
  if(e.activation) return `Маягт анх удаа ашиглагдаж байна. ${C.email} хаяг руу FormSubmit-ээс баталгаажуулах имэйл илгээгдлээ. «Activate Form» товчийг дарсны дараа дахин илгээнэ үү.`;
  return `Илгээхэд алдаа гарлаа${e.msg?" ("+e.msg+")":""}. ${C.phone||""} утсаар эсвэл ${C.email||""} хаягаар холбогдоно уу.`;
};

/* "Мэдээлэл авах" buttons: any element with data-ask="..." */
Site.ask = function(interest){
  const sel = document.getElementById("interest"); if(!sel) return;
  if(interest){
    if(![...sel.options].some(o=>o.value===interest)){ const o=document.createElement("option"); o.textContent=interest; sel.insertBefore(o, sel.firstChild); }
    sel.value = interest;
  }
  document.getElementById("contact").scrollIntoView({behavior: reduced?"auto":"smooth"});
  const form = document.getElementById("contactForm");
  form.classList.remove("flash"); void form.offsetWidth; form.classList.add("flash");
  setTimeout(()=>form.name.focus({preventScroll:true}), reduced?0:700);
};
document.addEventListener("click", e=>{
  const a = e.target.closest("[data-ask]"); if(!a) return;
  e.preventDefault(); Site.ask(a.dataset.ask);
});

/* ---------------- bridge diagram ---------------- */
const ORDER = [[0,1],[1,2],[2,3],[3,4],[4,0],[0,2],[1,3],[2,4],[3,0],[4,1]];
function label(t,x,y){
  const L=t.split("|");
  if(L.length===1) return `<text x="${x}" y="${y+5}">${esc(t)}</text>`;
  return `<text x="${x}" y="${y-5}">${esc(L[0])}</text><text x="${x}" y="${y+14}">${esc(L[1])}</text>`;
}
Site.bridge = function(el, opts={}){
  const cx=250, cy=250, r=180, f=n=>n.toFixed(1);
  const P = AREAS.map((a,i)=>{const t=-Math.PI/2+i*2*Math.PI/5; return {id:a.id, x:cx+r*Math.cos(t), y:cy+r*Math.sin(t)};});
  let edges="", sparks="";
  ORDER.forEach(([i,j],k)=>{
    const a=P[i], b=P[j], mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
    const q={x:mx+(cx-mx)*.28, y:my+(cy-my)*.28};
    const m={x:(a.x+2*q.x+b.x)/4, y:(a.y+2*q.y+b.y)/4};
    const c1={x:(a.x+q.x)/2,y:(a.y+q.y)/2}, c2={x:(b.x+q.x)/2,y:(b.y+q.y)/2};
    const ab=`data-a="${a.id}" data-b="${b.id}" data-k="${k}"`;
    edges += `<path class="edge" ${ab} d="M${f(a.x)} ${f(a.y)} Q${f(c1.x)} ${f(c1.y)} ${f(m.x)} ${f(m.y)}"/>`;
    edges += `<path class="edge" ${ab} d="M${f(b.x)} ${f(b.y)} Q${f(c2.x)} ${f(c2.y)} ${f(m.x)} ${f(m.y)}"/>`;
    sparks += `<circle class="spark" data-k="${k}" cx="${f(m.x)}" cy="${f(m.y)}" r="5" opacity="0" style="transform-box:fill-box;transform-origin:center"/>`;
  });
  const nodes = P.map(p=>{
    const a=byId[p.id], attrs = opts.interactive ? `tabindex="0" role="button" aria-label="${esc(a.name)}" aria-pressed="false"` : "";
    return `<g class="node" data-id="${p.id}" ${attrs} style="transform-box:fill-box;transform-origin:center"><circle cx="${f(p.x)}" cy="${f(p.y)}" r="56"/>${label(a.label,+f(p.x),+f(p.y))}</g>`;
  }).join("");
  el.classList.add("bridge"); if(opts.interactive) el.classList.add("interactive");
  el.innerHTML = `<svg viewBox="-12 -12 524 524" ${opts.interactive?"":'aria-hidden="true"'}>${edges}${sparks}<rect class="core-bg" x="166" y="234" width="168" height="32" rx="4"/><text class="core" x="250" y="256">Тогтвортой бизнес</text>${nodes}</svg>`;
  const svg = el.querySelector("svg");
  const api = {
    highlight(id){
      svg.querySelectorAll(".edge").forEach(e=>{const on=e.dataset.a===id||e.dataset.b===id; e.classList.toggle("on",on); e.classList.toggle("off",!on);});
      svg.querySelectorAll(".node").forEach(n=>{const act=n.dataset.id===id; n.classList.toggle("active",act); if(opts.interactive) n.setAttribute("aria-pressed",act);});
    }
  };
  if(opts.interactive && opts.onSelect){
    const pick = n=>{api.highlight(n.dataset.id); opts.onSelect(n.dataset.id);};
    svg.addEventListener("click", e=>{const n=e.target.closest(".node"); if(n) pick(n);});
    svg.addEventListener("keydown", e=>{const n=e.target.closest(".node"); if(n&&(e.key==="Enter"||e.key===" ")){e.preventDefault(); pick(n);}});
  }
  const play = ()=>{
    const done = ()=> opts.onDone && opts.onDone(api);
    if(reduced || !svg.animate){ done(); return; }
    const ease="cubic-bezier(.45,0,.2,1)";
    svg.querySelectorAll(".node").forEach((n,i)=>n.animate([{opacity:0,transform:"scale(.6)"},{opacity:1,transform:"scale(1)"}],{duration:520,delay:i*110,easing:ease,fill:"backwards"}));
    const start=700, gap=230, dur=760;
    svg.querySelectorAll(".edge").forEach(h=>{
      const len=h.getTotalLength(), k=+h.dataset.k;
      h.style.strokeDasharray=len;
      h.animate([{strokeDashoffset:len},{strokeDashoffset:0}],{duration:dur,delay:start+k*gap,easing:ease,fill:"backwards"});
    });
    svg.querySelectorAll(".spark").forEach(s=>{
      const k=+s.dataset.k;
      s.animate([{opacity:0,transform:"scale(0)"},{opacity:1,transform:"scale(1.7)",offset:.35},{opacity:0,transform:"scale(.6)"}],{duration:650,delay:start+k*gap+dur-60,easing:"ease-out"});
    });
    setTimeout(done, start+ORDER.length*gap+dur+200);
  };
  if(opts.playNow) play();
  else if("IntersectionObserver" in window){
    svg.querySelectorAll(".edge").forEach(h=>h.style.opacity="0");
    const io=new IntersectionObserver(es=>{ if(es.some(x=>x.isIntersecting)){ io.disconnect(); svg.querySelectorAll(".edge").forEach(h=>h.style.opacity=""); play(); }},{threshold:.35});
    io.observe(el);
  } else play();
  return api;
};

/* decorative hero art for inner pages: arcs that span like a bridge */
Site.heroArt = function(variant){
  const arcs=[]; const n=variant==="academy"?3:5;
  for(let i=0;i<n;i++){
    const x0=20+i*18, x1=380-i*18, y=260-i*8, top=40+i*34;
    arcs.push(`<path d="M${x0} ${y} Q200 ${top} ${x1} ${y}" stroke="${i%2?"#2C8566":"#1E5C86"}" opacity="${(1-i*.13).toFixed(2)}"/>`);
  }
  const posts=[]; for(let x=60;x<=340;x+=40){ posts.push(`<path d="M${x} 270 V${(270-60*Math.sin(Math.PI*(x-20)/360)).toFixed(0)}" stroke="#0F2B33" opacity=".25"/>`); }
  return `<svg class="hero-art" viewBox="0 0 400 300" aria-hidden="true"><path d="M0 270 H400" stroke="#0F2B33" opacity=".5"/>${posts.join("")}${arcs.join("")}</svg>`;
};

/* ---------------- posts data ---------------- */
let clientP = null;
Site.cmsReady = !!(C.supabaseUrl && C.supabaseAnonKey);
Site.client = function(){
  if(!Site.cmsReady) return Promise.resolve(null);
  if(clientP) return clientP;
  clientP = new Promise(res=>{
    const go=()=>res(window.supabase.createClient(C.supabaseUrl, C.supabaseAnonKey));
    if(window.supabase && window.supabase.createClient) return go();
    const s=document.createElement("script"); s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"; s.onload=go; s.onerror=()=>res(null); document.head.appendChild(s);
  });
  return clientP;
};
Site.listPosts = async function(type, limit){
  const db = await Site.client();
  if(db){
    let q = db.from("posts").select("id,type,title,summary,area,cover_url,author,created_at,blocks").eq("published",true).eq("type",type).order("created_at",{ascending:false});
    if(limit) q=q.limit(limit);
    const {data,error} = await q; if(error){ console.error(error); return []; }
    return data||[];
  }
  const list=(window.SAMPLE_POSTS||[]).filter(p=>p.type===type).sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at)));
  return limit?list.slice(0,limit):list;
};
Site.getPost = async function(id){
  const db = await Site.client();
  if(db){ const {data} = await db.from("posts").select("*").eq("id",id).eq("published",true).maybeSingle(); if(data) return data; }
  return (window.SAMPLE_POSTS||[]).find(p=>p.id===id) || null;
};

const MONTHS = d=>{ const x=new Date(d); if(isNaN(x)) return ""; return `${x.getFullYear()} оны ${x.getMonth()+1}-р сарын ${x.getDate()}`; };
Site.date = MONTHS;
Site.areaName = id => (id && byId[id]) ? byId[id].name : "Ерөнхий";
Site.readMin = p => { const t=(p.blocks||[]).filter(b=>b.type==="text").map(b=>b.value).join(" "); return Math.max(1, Math.round(t.split(/\s+/).length/180)); };
Site.hasVideo = p => (p.blocks||[]).some(b=>b.type==="video"||b.type==="youtube");
Site.link = p => `post.html?id=${encodeURIComponent(p.id)}`;

/* generated cover when a post has no image */
function hash(s){let h=2166136261; for(const c of String(s)){h^=c.charCodeAt(0); h=Math.imul(h,16777619);} return h>>>0;}
Site.coverSVG = function(p){
  const col = (byId[p.area]&&byId[p.area].color) || "#0F2B33";
  let h=hash(p.id||p.title), rnd=()=>{h=Math.imul(h^(h>>>15),2246822507)>>>0; return (h%1000)/1000;};
  let arcs="";
  for(let i=0;i<6;i++){
    const x0=-40+rnd()*160, x1=280+rnd()*160, y=200+rnd()*80, top=-20+rnd()*170;
    arcs+=`<path d="M${x0.toFixed(0)} ${y.toFixed(0)} Q${(150+rnd()*100).toFixed(0)} ${top.toFixed(0)} ${x1.toFixed(0)} ${y.toFixed(0)}" fill="none" stroke="#fff" stroke-opacity="${(.18+rnd()*.35).toFixed(2)}" stroke-width="${(1+rnd()*1.5).toFixed(1)}"/>`;
  }
  const cxp=60+rnd()*280, cyp=40+rnd()*120;
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="250" fill="${col}"/><rect width="400" height="250" fill="url(#g${h%999})" /><defs><linearGradient id="g${h%999}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F2B33" stop-opacity="0"/><stop offset="1" stop-color="#0F2B33" stop-opacity=".45"/></linearGradient></defs>${arcs}<circle cx="${cxp.toFixed(0)}" cy="${cyp.toFixed(0)}" r="5" fill="#fff" fill-opacity=".8"/></svg>`;
};
/* thumbnail: real media first (cover → first image → YouTube → uploaded video),
   brand art as a small corner badge; full brand art only when there is no media */
Site.media = function(p){
  if(p.cover_url) return {kind:"img", url:p.cover_url};
  const bl = p.blocks||[];
  const im = bl.find(b=>b.type==="image" && b.url); if(im) return {kind:"img", url:im.url};
  const yt = bl.find(b=>b.type==="youtube" && Site.ytId(b.url)); if(yt) return {kind:"img", url:`https://i.ytimg.com/vi/${Site.ytId(yt.url)}/hqdefault.jpg`};
  const vd = bl.find(b=>b.type==="video" && b.url); if(vd) return {kind:"video", url:vd.url};
  return null;
};
Site.badgeSVG = function(p){
  const col = (byId[p.area]&&byId[p.area].color) || "#0F2B33";
  return `<svg viewBox="0 0 46 46"><rect width="46" height="46" fill="${col}"/><g fill="none" stroke="#fff" stroke-linecap="round"><path d="M6 36 Q23 6 40 36" stroke-width="2.4"/><path d="M11 36 Q23 15 35 36" stroke-width="1.8" stroke-opacity=".7"/><path d="M16 36 Q23 24 30 36" stroke-width="1.4" stroke-opacity=".5"/></g><circle cx="33" cy="12" r="2.4" fill="#fff"/></svg>`;
};
Site.cover = function(p, cls="cover"){
  const play = Site.hasVideo(p) ? `<span class="play-badge" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M4 2.2v9.6l7.6-4.8z" fill="#fff"/></svg></span>` : "";
  const m = Site.media(p);
  if(!m) return `<div class="${cls}">${Site.coverSVG(p)}${play}</div>`;
  const inner = m.kind==="video"
    ? `<video class="cover-media" src="${esc(m.url)}#t=0.5" muted playsinline preload="metadata" aria-hidden="true"></video>`
    : `<img class="cover-media" src="${esc(m.url)}" alt="" loading="lazy">`;
  return `<div class="${cls} has-media">${inner}<span class="cover-shade" aria-hidden="true"></span><span class="cover-badge" aria-hidden="true">${Site.badgeSVG(p)}</span>${play}</div>`;
};

/* cards */
Site.insightRow = p => `<a class="ins-row" href="${Site.link(p)}"><span class="area">${esc(Site.areaName(p.area))}</span><div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></div><span class="meta">${MONTHS(p.created_at)}<br>${Site.readMin(p)} мин унших</span></a>`;
Site.insightFeature = p => `<a class="ins-feature" href="${Site.link(p)}"><div><p class="kicker">${esc(Site.areaName(p.area))}</p><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><p style="margin-top:22px"><span class="textlink">Судалгааг унших</span></p></div>${Site.cover(p,"cover")}</a>`;
Site.blogCard = p => `<a class="blog-card" href="${Site.link(p)}">${Site.cover(p)}<span class="meta">${esc(p.author||"")}${p.author?", ":""}${MONTHS(p.created_at)}</span><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></a>`;

/* rich body */
Site.ytId = u => { const m=String(u||"").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/); return m?m[1]:null; };
Site.renderBlocks = function(blocks){
  return (blocks||[]).map(b=>{
    if(b.type==="text"){
      return String(b.value||"").split(/\n\s*\n/).map(par=>{ par=par.trim(); if(!par) return "";
        return par.startsWith("## ") ? `<h3>${esc(par.slice(3))}</h3>` : `<p>${esc(par).replace(/\n/g,"<br>")}</p>`; }).join("");
    }
    const cap = b.caption?`<figcaption>${esc(b.caption)}</figcaption>`:"";
    if(b.type==="image") return `<figure><img src="${esc(b.url)}" alt="${esc(b.caption||"")}" loading="lazy">${cap}</figure>`;
    if(b.type==="video") return `<figure><video src="${esc(b.url)}" controls preload="metadata" playsinline></video>${cap}</figure>`;
    if(b.type==="youtube"){ const id=Site.ytId(b.url); return id?`<figure><div class="embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="Видео" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>${cap}</figure>`:""; }
    return "";
  }).join("");
};

/* generic tabs */
Site.tabs = function(root=document){
  root.querySelectorAll('.seg[role="tablist"]').forEach(list=>{
    const tabs=[...list.querySelectorAll('[role="tab"]')];
    const act=t=>tabs.forEach(x=>{const on=x===t; x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; const p=x.getAttribute("aria-controls"); if(p) document.getElementById(p).hidden=!on;});
    tabs.forEach((t,i)=>{
      t.addEventListener("click",()=>act(t));
      t.addEventListener("keydown",e=>{ if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft") return; const n=tabs[(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length]; n.focus(); act(n); });
    });
  });
};

header(); footer();
document.querySelectorAll("[data-hero-art]").forEach(el=>el.innerHTML=Site.heroArt(el.dataset.heroArt));
})();
