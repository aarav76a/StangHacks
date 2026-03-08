export function template4(c) {
  const photos = c.photos || {};
  const heroBg = photos.hero?.url ? `background:linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.88) 100%), url('${photos.hero.url}') center/cover no-repeat fixed;` : "";
  const aboutImg = photos.about?.url ? `<div class="about-img-wrap"><img src="${photos.about.url}" alt="" class="about-img"/>${photos.about.credit ? `<div class="img-credit">Photo by <a href="${photos.about.creditLink}" target="_blank">${photos.about.credit}</a> on Pexels</div>` : ""}</div>` : "";
  const a = c.accent || "#10b981";

  const stats = c.stats.map(s => `<div class="stat"><div class="sn">${s.number}</div><div class="sl">${s.label}</div></div>`).join("");
  const steps = c.howItWorks.map(s => `<div class="step"><div class="step-dot"><span>${s.step}</span></div><div><h3>${s.title}</h3><p>${s.desc}</p></div></div>`).join("");
  const features = c.features.map(f => `<div class="fc glass"><div class="fe">${f.emoji}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join("");
  const testimonials = c.testimonials.map(t => `<div class="tc glass"><div class="stars">★★★★★</div><p>"${t.quote}"</p><div class="ta"><div class="av">${t.name[0]}</div><div><strong>${t.name}</strong><span>${t.role}, ${t.company}</span></div></div></div>`).join("");
  const faq = c.faq.map((f,i) => `<div class="fi"><button onclick="toggle(${i})"><span>${f.q}</span><span id="ic${i}">+</span></button><div id="fa${i}" class="fa">${f.a}</div></div>`).join("");
  const pricing = c.pricing.map(p => `<div class="pc glass ${p.highlight?"ph":""}"> ${p.highlight?`<div class="pb">Most Popular</div>`:""}<div class="pt">${p.tier}</div><div class="pp">${p.price}<span>${p.period}</span></div><p class="pd">${p.desc}</p><ul>${p.features.map(f=>`<li><span>✓</span>${f}</li>`).join("")}</ul><a href="#pricing" class="pcta ${p.highlight?"pch":""}">${p.cta}</a></div>`).join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${c.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--a:${a};--bg:#030712;--t:#f8fafc;--m:#94a3b8;--m2:#cbd5e1;--bd:rgba(255,255,255,.08)}
html{scroll-behavior:smooth} [id]{scroll-margin-top:90px}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--t);overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 100% 80% at 20% 20%,${a}18 0%,transparent 50%),radial-gradient(ellipse 80% 60% at 80% 80%,${a}12 0%,transparent 50%);pointer-events:none;z-index:0}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px ${a}30}50%{box-shadow:0 0 40px ${a}60}}
.fu{animation:fadeUp .7s ease both}.fu2{animation:fadeUp .7s .15s ease both}.fu3{animation:fadeUp .7s .3s ease both}
.glass{background:rgba(255,255,255,.04);backdrop-filter:blur(16px);border:1px solid var(--bd)}

nav{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:56px;width:min(1100px,calc(100vw - 32px));background:rgba(3,7,18,.8);backdrop-filter:blur(24px);border:1px solid var(--bd);border-radius:100px}
.logo{font-weight:800;font-size:18px;color:var(--t);text-decoration:none;letter-spacing:-.5px}
.logo span{color:var(--a)}
.nav-links{display:flex;gap:24px}
.nav-links a{color:var(--m);font-size:14px;text-decoration:none;transition:color .2s}
.nav-links a:hover{color:var(--t)}
.ncta{background:var(--a);color:#000;font-weight:700;font-size:13px;padding:8px 20px;border-radius:100px;text-decoration:none;transition:opacity .2s,transform .2s}
.ncta:hover{opacity:.85;transform:scale(1.04)}

.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 24px 80px;position:relative;z-index:1;${heroBg}}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid var(--bd);color:var(--a);font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:7px 18px;border-radius:100px;margin-bottom:32px}
.hero h1{font-weight:800;font-size:clamp(42px,7.5vw,96px);line-height:.98;letter-spacing:-3px;max-width:960px;margin-bottom:28px;background:linear-gradient(135deg,var(--t) 0%,${a} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero p{font-size:clamp(16px,1.8vw,19px);color:var(--m2);max-width:560px;margin-bottom:52px;font-weight:300;line-height:1.85}
.actions{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:80px}
.btn{background:var(--a);color:#000;font-weight:700;font-size:15px;padding:15px 34px;border-radius:100px;text-decoration:none;transition:transform .2s,box-shadow .2s;animation:glow 3s ease infinite}
.btn:hover{transform:translateY(-2px) scale(1.04)}
.btn2{background:rgba(255,255,255,.06);color:var(--t);font-weight:500;font-size:15px;padding:15px 34px;border-radius:100px;text-decoration:none;border:1px solid var(--bd);transition:background .2s}
.btn2:hover{background:rgba(255,255,255,.1)}
.hero-orbs{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.orb{position:absolute;border-radius:50%;filter:blur(80px);animation:float 6s ease-in-out infinite}
.orb1{width:400px;height:400px;background:${a}20;top:10%;left:5%;animation-delay:0s}
.orb2{width:300px;height:300px;background:${a}15;top:20%;right:10%;animation-delay:2s}
.logos-row{display:flex;flex-direction:column;align-items:center;gap:14px}
.logos-label{color:var(--m);font-size:11px;letter-spacing:2px;text-transform:uppercase}
.logos{display:flex;gap:40px;flex-wrap:wrap;justify-content:center}
.logos span{color:#2e3a4e;font-weight:700;font-size:15px}

.stats-band{padding:56px 24px;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);position:relative;z-index:1}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;text-align:center}
.stat{padding:24px}
.stat:not(:last-child){border-right:1px solid var(--bd)}
.sn{font-weight:800;font-size:clamp(32px,5vw,52px);color:var(--a);letter-spacing:-2px;line-height:1;margin-bottom:10px}
.sl{color:var(--m);font-size:13px}

section{padding:100px 24px;position:relative;z-index:1}
.container{max-width:1100px;margin:0 auto}
.lbl{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--a);margin-bottom:16px}
h2.st{font-weight:800;font-size:clamp(30px,4vw,52px);letter-spacing:-1.5px;line-height:1.05;margin-bottom:20px}
.sub{font-size:17px;color:var(--m2);max-width:540px;line-height:1.85;margin-bottom:64px}

.ps-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.ps-card{padding:52px 44px;border-radius:24px}
.ps-card .icon{font-size:40px;margin-bottom:24px}
.ps-card h3{font-weight:700;font-size:22px;margin-bottom:14px;letter-spacing:-.5px}
.ps-card p{color:var(--m2);font-size:16px;line-height:1.9}

.hiw-bg{background:rgba(255,255,255,.02)}
.steps{display:flex;flex-direction:column;gap:0;border-radius:24px;overflow:hidden;border:1px solid var(--bd)}
.step{display:flex;align-items:flex-start;gap:32px;padding:44px 48px;border-bottom:1px solid var(--bd);transition:background .2s}
.step:last-child{border-bottom:none}.step:hover{background:rgba(255,255,255,.03)}
.step-dot{width:52px;height:52px;border-radius:50%;background:${a}20;border:2px solid ${a}60;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.step-dot span{font-weight:800;font-size:18px;color:var(--a)}
.step h3{font-weight:700;font-size:19px;margin-bottom:10px;letter-spacing:-.3px}
.step p{color:var(--m2);font-size:15px;line-height:1.8}

.fg{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.fc{padding:40px 32px;border-radius:20px;transition:transform .2s,border-color .2s}
.fc:hover{transform:translateY(-6px);border-color:${a}40}
.fe{font-size:36px;margin-bottom:20px}
.fc h3{font-weight:700;font-size:18px;margin-bottom:12px;letter-spacing:-.3px}
.fc p{color:var(--m2);font-size:15px;line-height:1.75}

.tg{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.tc{padding:32px;border-radius:20px;transition:transform .2s,border-color .2s}
.tc:hover{transform:translateY(-4px);border-color:${a}40}
.stars{color:var(--a);font-size:14px;margin-bottom:16px;letter-spacing:2px}
.tc p{color:var(--m2);font-size:15px;line-height:1.8;margin-bottom:24px;font-style:italic}
.ta{display:flex;align-items:center;gap:12px}
.av{width:40px;height:40px;border-radius:50%;background:${a}25;border:1px solid ${a}50;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;color:var(--a);flex-shrink:0}
.ta strong{display:block;font-size:14px;font-weight:600}
.ta span{color:var(--m);font-size:12px}

.pricing-bg{background:rgba(255,255,255,.015)}
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.pc{padding:40px 32px;border-radius:24px;display:flex;flex-direction:column;position:relative;transition:transform .2s,border-color .2s}
.pc:hover{transform:translateY(-6px)}
.ph{border-color:${a}50!important;background:linear-gradient(160deg,${a}0d,rgba(255,255,255,.04))}
.pb{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--a);color:#000;font-size:11px;font-weight:700;letter-spacing:1px;padding:4px 16px;border-radius:100px;white-space:nowrap}
.pt{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--m);margin-bottom:14px}
.pp{font-weight:800;font-size:42px;letter-spacing:-2px;margin-bottom:6px}
.pp span{font-size:14px;font-weight:400;color:var(--m);letter-spacing:0;margin-left:4px}
.pd{color:var(--m2);font-size:14px;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid var(--bd)}
.pc ul{list-style:none;flex:1;margin-bottom:32px;display:flex;flex-direction:column;gap:12px}
.pc li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--m2);line-height:1.5}
.pc li span{color:var(--a);font-weight:700;font-size:13px;flex-shrink:0;margin-top:1px}
.pcta{display:block;text-align:center;padding:13px;border-radius:100px;font-weight:600;font-size:14px;text-decoration:none;border:1px solid var(--bd);color:var(--t);transition:background .2s,border-color .2s}
.pcta:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2)}
.pch{background:var(--a)!important;color:#000!important;border-color:var(--a)!important}
.pch:hover{opacity:.88!important}

.faq-list{display:flex;flex-direction:column;border-radius:20px;overflow:hidden;border:1px solid var(--bd)}
.fi{border-bottom:1px solid var(--bd)}.fi:last-child{border-bottom:none}
.fi button{width:100%;background:none;border:none;color:var(--t);font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:500;padding:26px 32px;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;transition:background .15s}
.fi button:hover{background:rgba(255,255,255,.03)}
#ic0,#ic1,#ic2,#ic3{color:var(--a);font-size:22px;flex-shrink:0;transition:transform .25s}
.fa{max-height:0;overflow:hidden;transition:max-height .3s,padding .3s;color:var(--m2);font-size:15px;line-height:1.85;padding:0 32px}
.fa.open{max-height:200px;padding:0 32px 26px}

.cta-banner{text-align:center;padding:120px 24px;position:relative;overflow:hidden}
.cta-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 70% at 50% 50%,${a}18 0%,transparent 70%);pointer-events:none}
.cta-banner h2{font-weight:800;font-size:clamp(32px,5vw,64px);letter-spacing:-2px;margin-bottom:20px;line-height:1.0;background:linear-gradient(135deg,var(--t) 0%,${a} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.cta-banner p{color:var(--m2);font-size:18px;max-width:500px;margin:0 auto 44px;line-height:1.85}

footer{padding:56px 24px;border-top:1px solid var(--bd);position:relative;z-index:1}
.footer-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px}
.fl{display:flex;gap:24px}
.fl a{color:var(--m);font-size:13px;text-decoration:none;transition:color .2s}
.fl a:hover{color:var(--t)}
.fc2{color:#1e293b;font-size:12px;width:100%;text-align:center;margin-top:28px;padding-top:28px;border-top:1px solid var(--bd)}

@media(max-width:900px){
  nav{top:8px;border-radius:16px;padding:0 16px}.nav-links{display:none}
  .ps-grid,.fg,.tg,.pg{grid-template-columns:1fr}
  .stats-grid{grid-template-columns:repeat(2,1fr)}.stat:nth-child(2){border-right:none}.stat:nth-child(1),.stat:nth-child(2){border-bottom:1px solid var(--bd)}
  .step{flex-direction:column;gap:16px;padding:28px 24px}
  section{padding:72px 20px}
}
.about-img-wrap{margin:0 auto 64px;max-width:900px;border-radius:16px;overflow:hidden;position:relative;border:1px solid var(--bd)}.about-img{width:100%;height:420px;object-fit:cover;display:block;filter:brightness(0.85)}.img-credit{position:absolute;bottom:8px;right:12px;font-size:10px;color:rgba(255,255,255,0.4)}.img-credit a{color:rgba(255,255,255,0.4);text-decoration:none}
</style></head><body>
<div class="hero-orbs"><div class="orb orb1"></div><div class="orb orb2"></div></div>
<nav>
  <a href="#" class="logo">${c.name.slice(0,-2)}<span>${c.name.slice(-2)}</span></a>
  <div class="nav-links"><a href="#how-it-works">How it works</a><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div>
  <a href="#pricing" class="ncta">${c.ctaText}</a>
</nav>
<section class="hero">
  <div class="badge fu">${c.tagline}</div>
  <h1 class="fu2">${c.heroHeadline}</h1>
  <p class="fu3">${c.heroSub}</p>
  <div class="actions fu3"><a href="#pricing" class="btn">${c.ctaText} →</a><a href="#how-it-works" class="btn2">See how it works</a></div>
  <div class="logos-row"><div class="logos-label">Trusted by teams at</div><div class="logos">${["Acme Corp","Globex","Initech","Umbrella","Hooli"].map(n=>`<span>${n}</span>`).join("")}</div></div>
</section>
<div class="stats-band"><div class="stats-grid">${stats}</div></div>
<section><div class="container"><div class="lbl">The Challenge</div><h2 class="st">Why this matters</h2>${aboutImg}<div class="ps-grid"><div class="ps-card glass"><div class="icon">😤</div><h3>${c.problemTitle}</h3><p>${c.problemText}</p></div><div class="ps-card glass"><div class="icon">✨</div><h3>${c.solutionTitle}</h3><p>${c.solutionText}</p></div></div></div></section>
<section class="hiw-bg" id="how-it-works"><div class="container"><div class="lbl">How It Works</div><h2 class="st">Up and running in minutes</h2><p class="sub">No complicated setup. No learning curve. Just results.</p><div class="steps">${steps}</div></div></section>
<section id="features"><div class="container"><div class="lbl">Features</div><h2 class="st">Everything you need</h2><p class="sub">Built for speed, designed for scale.</p><div class="fg">${features}</div></div></section>
<section><div class="container"><div class="lbl">Testimonials</div><h2 class="st">Don't take our word for it</h2><p class="sub">Thousands of teams already made the switch.</p><div class="tg">${testimonials}</div></div></section>
<section class="pricing-bg" id="pricing"><div class="container"><div class="lbl">Pricing</div><h2 class="st">Simple, transparent pricing</h2><p class="sub">Start free. Scale when ready. No hidden fees.</p><div class="pg">${pricing}</div></div></section>
<section id="faq"><div class="container"><div class="lbl">FAQ</div><h2 class="st">Got questions?</h2><p class="sub">Everything you need to know.</p><div class="faq-list">${faq}</div></div></section>
<div class="cta-banner"><div class="container"><h2>Ready to get started?</h2><p>${c.footerTagline}</p><a href="#pricing" class="btn" style="display:inline-block">${c.ctaText} →</a></div></div>
<footer><div class="footer-inner"><a href="#" class="logo">${c.name.slice(0,-2)}<span>${c.name.slice(-2)}</span></a><div class="fl"><a href="#">Product</a><a href="#">Pricing</a><a href="#">Blog</a><a href="#">Contact</a></div></div><p class="fc2">© ${new Date().getFullYear()} ${c.name}. All rights reserved.</p></footer>
<script>
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}})});
function toggle(i){const a=document.getElementById('fa'+i),ic=document.getElementById('ic'+i),o=a.classList.contains('open');document.querySelectorAll('.fa').forEach(e=>e.classList.remove('open'));document.querySelectorAll('[id^="ic"]').forEach(e=>e.style.transform='');if(!o){a.classList.add('open');ic.style.transform='rotate(45deg)'}}</script>
</body></html>`;
}
