export function template5(c) {
  const photos = c.photos || {};
  const heroBg = photos.hero?.url ? `background:linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.88) 100%), url('${photos.hero.url}') center/cover no-repeat fixed;` : "";
  const aboutImg = photos.about?.url ? `<div class="about-img-wrap"><img src="${photos.about.url}" alt="" class="about-img"/>${photos.about.credit ? `<div class="img-credit">Photo by <a href="${photos.about.creditLink}" target="_blank">${photos.about.credit}</a> on Pexels</div>` : ""}</div>` : "";
  const a = c.accent || "#dc2626";

  const stats = c.stats.map(s => `<div class="stat"><div class="sn">${s.number}</div><div class="sl">${s.label}</div></div>`).join("");
  const steps = c.howItWorks.map(s => `<div class="step"><div class="stepn">${s.step}</div><div><h3>${s.title}</h3><p>${s.desc}</p></div></div>`).join("");
  const features = c.features.map(f => `<div class="fc"><div class="fe">${f.emoji}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join("");
  const testimonials = c.testimonials.map(t => `<div class="tc"><p class="tq">"${t.quote}"</p><div class="ta"><div class="av">${t.name[0]}</div><div><strong>${t.name}</strong><span>${t.role}, ${t.company}</span></div></div></div>`).join("");
  const faq = c.faq.map((f,i) => `<div class="fi"><button onclick="toggle(${i})"><span>${f.q}</span><span id="ic${i}">+</span></button><div id="fa${i}" class="fa">${f.a}</div></div>`).join("");
  const pricing = c.pricing.map(p => `<div class="pc ${p.highlight?"ph":""}"> ${p.highlight?`<div class="pb">✦ Most Popular</div>`:""}<div class="pt">${p.tier}</div><div class="pp">${p.price}<span>${p.period}</span></div><p class="pd">${p.desc}</p><ul>${p.features.map(f=>`<li><span>✓</span>${f}</li>`).join("")}</ul><a href="#pricing" class="pcta ${p.highlight?"pch":""}">${p.cta}</a></div>`).join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${c.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700;1,900&family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--a:${a};--bg:#fdf6ec;--bg2:#f5ebda;--bg3:#ede0cc;--t:#1c1008;--m:#7a6548;--m2:#5a4830;--bd:#d4c4a8}
html{scroll-behavior:smooth} [id]{scroll-margin-top:90px}
body{font-family:'Nunito',sans-serif;background:var(--bg);color:var(--t);overflow-x:hidden}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes wiggle{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}}
.fu{animation:fadeUp .6s ease both}.fu2{animation:fadeUp .6s .12s ease both}.fu3{animation:fadeUp .6s .24s ease both}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:68px;background:var(--bg);border-bottom:2.5px solid var(--t)}
.logo{font-family:'Fraunces',serif;font-weight:900;font-size:22px;color:var(--t);text-decoration:none;letter-spacing:-.5px}
.logo span{color:var(--a)}
.nav-links{display:flex;gap:28px}
.nav-links a{color:var(--m);font-size:14px;text-decoration:none;font-weight:600;transition:color .2s}
.nav-links a:hover{color:var(--t)}
.ncta{background:var(--a);color:#fff;font-weight:800;font-size:13px;padding:9px 22px;border-radius:100px;text-decoration:none;border:2px solid var(--t);box-shadow:3px 3px 0 var(--t);transition:transform .15s,box-shadow .15s}
.ncta:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--t)}

.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 24px 80px;position:relative;overflow:hidden;${heroBg}}
.hero::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:${a}12;top:-100px;right:-150px;pointer-events:none}
.hero::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:${a}08;bottom:-50px;left:-100px;pointer-events:none}
.badge{display:inline-block;background:${a}20;color:var(--a);font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;padding:8px 20px;border-radius:100px;margin-bottom:28px;border:2px solid ${a}50}
.hero h1{font-family:'Fraunces',serif;font-weight:900;font-size:clamp(44px,7vw,96px);line-height:.98;letter-spacing:-2px;max-width:960px;margin-bottom:28px;color:var(--t)}
.hero h1 em{font-style:italic;color:var(--a)}
.hero p{font-size:clamp(16px,1.8vw,19px);color:var(--m);max-width:540px;margin-bottom:52px;line-height:1.85}
.actions{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-bottom:80px}
.btn{background:var(--a);color:#fff;font-weight:800;font-size:15px;padding:16px 36px;border-radius:100px;text-decoration:none;border:2.5px solid var(--t);box-shadow:4px 4px 0 var(--t);transition:transform .15s,box-shadow .15s}
.btn:hover{transform:translate(-3px,-3px);box-shadow:7px 7px 0 var(--t)}
.btn2{background:transparent;color:var(--t);font-weight:700;font-size:15px;padding:16px 36px;border-radius:100px;text-decoration:none;border:2.5px solid var(--t);box-shadow:4px 4px 0 var(--bd);transition:transform .15s,box-shadow .15s}
.btn2:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--bd)}
.logos-row{display:flex;flex-direction:column;align-items:center;gap:14px}
.logos-label{color:var(--m);font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700}
.logos{display:flex;gap:36px;flex-wrap:wrap;justify-content:center}
.logos span{color:var(--bg3);font-family:'Fraunces',serif;font-weight:700;font-size:15px}

.stats-band{background:var(--t);padding:56px 24px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);max-width:960px;margin:0 auto;text-align:center}
.stat{padding:24px;border-right:2px solid #2e2010}.stat:last-child{border-right:none}
.sn{font-family:'Fraunces',serif;font-weight:900;font-size:clamp(32px,5vw,52px);color:${a};letter-spacing:-2px;line-height:1;margin-bottom:10px}
.sl{color:#aaa;font-size:13px;font-weight:600}

section{padding:96px 24px}
.container{max-width:1100px;margin:0 auto}
.lbl{font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(--a);margin-bottom:16px}
h2.st{font-family:'Fraunces',serif;font-weight:900;font-size:clamp(30px,4vw,56px);letter-spacing:-1.5px;line-height:1.0;margin-bottom:20px}
.sub{font-size:17px;color:var(--m);max-width:540px;line-height:1.9;margin-bottom:64px}

.ps-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.ps-card{background:var(--bg2);border:2.5px solid var(--t);border-radius:24px;padding:52px 44px;box-shadow:6px 6px 0 var(--t);transition:transform .15s,box-shadow .15s}
.ps-card:hover{transform:translate(-3px,-3px);box-shadow:9px 9px 0 var(--t)}
.ps-card .icon{font-size:44px;margin-bottom:24px}
.ps-card h3{font-family:'Fraunces',serif;font-weight:700;font-size:24px;margin-bottom:14px}
.ps-card p{color:var(--m2);font-size:16px;line-height:1.9}

.hiw-bg{background:var(--bg2)}
.steps{display:flex;flex-direction:column;gap:20px}
.step{display:flex;align-items:flex-start;gap:28px;background:var(--bg);border:2.5px solid var(--t);border-radius:20px;padding:40px 40px;box-shadow:5px 5px 0 var(--t);transition:transform .15s,box-shadow .15s}
.step:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--t)}
.stepn{font-family:'Fraunces',serif;font-weight:900;font-size:48px;color:var(--bg);background:var(--t);width:68px;height:68px;display:flex;align-items:center;justify-content:center;border-radius:16px;flex-shrink:0;line-height:1}
.step h3{font-family:'Fraunces',serif;font-weight:700;font-size:20px;margin-bottom:10px}
.step p{color:var(--m);font-size:15px;line-height:1.8}

.fg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.fc{background:var(--bg);border:2.5px solid var(--t);border-radius:20px;padding:40px 32px;box-shadow:5px 5px 0 var(--t);transition:transform .15s,box-shadow .15s}
.fc:hover{transform:translate(-3px,-3px);box-shadow:8px 8px 0 var(--t)}
.fe{font-size:40px;margin-bottom:20px}
.fc h3{font-family:'Fraunces',serif;font-weight:700;font-size:19px;margin-bottom:12px}
.fc p{color:var(--m2);font-size:15px;line-height:1.75}

.tg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.tc{background:var(--bg2);border:2.5px solid var(--t);border-radius:20px;padding:32px;box-shadow:5px 5px 0 var(--t);transition:transform .15s,box-shadow .15s}
.tc:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--t)}
.tq{font-size:15px;line-height:1.85;margin-bottom:24px;color:var(--m2);font-style:italic;font-family:'Fraunces',serif;font-weight:700}
.ta{display:flex;align-items:center;gap:12px}
.av{width:44px;height:44px;border-radius:50%;background:var(--a);border:2.5px solid var(--t);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:900;font-size:18px;color:#fff;flex-shrink:0}
.ta strong{display:block;font-size:14px;font-weight:700}
.ta span{color:var(--m);font-size:12px}

.pricing-bg{background:var(--bg2)}
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pc{background:var(--bg);border:2.5px solid var(--t);border-radius:24px;padding:40px 32px;display:flex;flex-direction:column;position:relative;box-shadow:5px 5px 0 var(--t);transition:transform .15s,box-shadow .15s}
.pc:hover{transform:translate(-3px,-3px);box-shadow:8px 8px 0 var(--t)}
.ph{background:var(--t);color:#fdf6ec;border-color:var(--t)}
.ph .pt{color:#aaa}.ph .pp{color:#fdf6ec}.ph .pp span{color:#888}.ph .pd{color:#bbb;border-color:#333}
.ph ul li{color:#ccc}.ph .pcta{border-color:#333;color:#fdf6ec}
.ph .pcta:hover{background:#2e2010}
.pb{position:absolute;top:-15px;left:50%;transform:translateX(-50%);background:var(--a);color:#fff;font-size:11px;font-weight:800;letter-spacing:1px;padding:5px 18px;border-radius:100px;border:2px solid var(--t);white-space:nowrap}
.pt{font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--m);margin-bottom:14px}
.pp{font-family:'Fraunces',serif;font-weight:900;font-size:44px;letter-spacing:-2px;margin-bottom:6px}
.pp span{font-size:14px;font-weight:500;color:var(--m);letter-spacing:0;margin-left:4px;font-family:'Nunito',sans-serif}
.pd{font-size:14px;margin-bottom:28px;padding-bottom:28px;border-bottom:2px solid var(--bd)}
.pc ul{list-style:none;flex:1;margin-bottom:32px;display:flex;flex-direction:column;gap:12px}
.pc li{display:flex;align-items:flex-start;gap:10px;font-size:14px;line-height:1.5}
.pc li span{color:var(--a);font-weight:800;font-size:13px;flex-shrink:0;margin-top:1px}
.pcta{display:block;text-align:center;padding:13px;border-radius:100px;font-weight:800;font-size:14px;text-decoration:none;border:2.5px solid var(--t);color:var(--t);transition:background .15s;box-shadow:3px 3px 0 var(--bd)}
.pcta:hover{background:var(--bg2)}
.pch{background:var(--a)!important;color:#fff!important;border-color:var(--t)!important;box-shadow:3px 3px 0 var(--t)!important}
.pch:hover{opacity:.9!important}

.faq-list{display:flex;flex-direction:column;gap:12px}
.fi{background:var(--bg);border:2.5px solid var(--t);border-radius:16px;overflow:hidden;box-shadow:4px 4px 0 var(--t)}
.fi button{width:100%;background:none;border:none;color:var(--t);font-family:'Nunito',sans-serif;font-size:16px;font-weight:700;padding:24px 28px;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;transition:background .15s}
.fi button:hover{background:var(--bg2)}
#ic0,#ic1,#ic2,#ic3{color:var(--a);font-size:24px;flex-shrink:0;transition:transform .25s;font-weight:800}
.fa{max-height:0;overflow:hidden;transition:max-height .3s,padding .3s;color:var(--m2);font-size:15px;line-height:1.85;padding:0 28px}
.fa.open{max-height:200px;padding:0 28px 24px}

.cta-banner{background:var(--a);border-top:3px solid var(--t);border-bottom:3px solid var(--t);padding:100px 24px;text-align:center;position:relative;overflow:hidden}
.cta-banner::before{content:'✦';position:absolute;font-size:300px;color:rgba(255,255,255,.06);top:-60px;right:-40px;font-family:'Fraunces',serif;font-weight:900}
.cta-banner h2{font-family:'Fraunces',serif;font-weight:900;font-size:clamp(32px,5vw,64px);letter-spacing:-2px;margin-bottom:20px;color:#fff;line-height:1.0}
.cta-banner p{color:rgba(255,255,255,.8);font-size:18px;max-width:500px;margin:0 auto 44px;line-height:1.85}
.btnw{background:#fff;color:var(--t);font-weight:800;font-size:15px;padding:16px 36px;border-radius:100px;text-decoration:none;display:inline-block;border:2.5px solid var(--t);box-shadow:4px 4px 0 rgba(0,0,0,.3);transition:transform .15s,box-shadow .15s}
.btnw:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 rgba(0,0,0,.3)}

footer{padding:56px 24px;border-top:2.5px solid var(--t);background:var(--bg)}
.footer-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px}
.fl{display:flex;gap:20px}
.fl a{color:var(--m);font-size:13px;text-decoration:none;font-weight:600;transition:color .2s}
.fl a:hover{color:var(--t)}
.fc2{color:var(--bg3);font-size:12px;width:100%;text-align:center;margin-top:28px;padding-top:28px;border-top:1.5px solid var(--bd)}

@media(max-width:900px){
  nav{padding:0 20px}.nav-links{display:none}
  .ps-grid,.fg,.tg,.pg{grid-template-columns:1fr}
  .stats-grid{grid-template-columns:repeat(2,1fr)}.stat:nth-child(2){border-right:none}.stat:nth-child(1),.stat:nth-child(2){border-bottom:2px solid #2e2010}
  .step{flex-direction:column;gap:16px;padding:28px 24px}
  section{padding:72px 20px}
}
.about-img-wrap{margin:0 auto 64px;max-width:900px;border-radius:16px;overflow:hidden;position:relative;border:1px solid var(--bd)}.about-img{width:100%;height:420px;object-fit:cover;display:block;filter:brightness(0.85)}.img-credit{position:absolute;bottom:8px;right:12px;font-size:10px;color:rgba(255,255,255,0.4)}.img-credit a{color:rgba(255,255,255,0.4);text-decoration:none}
</style></head><body>
<nav>
  <a href="#" class="logo">${c.name.slice(0,-2)}<span>${c.name.slice(-2)}</span></a>
  <div class="nav-links"><a href="#how-it-works">How it works</a><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div>
  <a href="#pricing" class="ncta">${c.ctaText}</a>
</nav>
<section class="hero">
  <div class="badge fu">${c.tagline}</div>
  <h1 class="fu2">${c.heroHeadline.replace(/(\S+)\s*$/,'<em>$1</em>')}</h1>
  <p class="fu3">${c.heroSub}</p>
  <div class="actions fu3"><a href="#pricing" class="btn">${c.ctaText} →</a><a href="#how-it-works" class="btn2">See how it works</a></div>
  <div class="logos-row"><div class="logos-label">Trusted by teams at</div><div class="logos">${["Acme Corp","Globex","Initech","Umbrella","Hooli"].map(n=>`<span>${n}</span>`).join("")}</div></div>
</section>
<div class="stats-band"><div class="stats-grid">${stats}</div></div>
<section><div class="container"><div class="lbl">The Challenge</div><h2 class="st">Why this matters</h2>${aboutImg}<div class="ps-grid"><div class="ps-card"><div class="icon">😤</div><h3>${c.problemTitle}</h3><p>${c.problemText}</p></div><div class="ps-card"><div class="icon">✨</div><h3>${c.solutionTitle}</h3><p>${c.solutionText}</p></div></div></div></section>
<section class="hiw-bg" id="how-it-works"><div class="container"><div class="lbl">How It Works</div><h2 class="st">Up and running in minutes</h2><p class="sub">No complicated setup. No learning curve. Just results.</p><div class="steps">${steps}</div></div></section>
<section id="features"><div class="container"><div class="lbl">Features</div><h2 class="st">Everything you need</h2><p class="sub">Built for speed, designed for scale.</p><div class="fg">${features}</div></div></section>
<section style="background:var(--bg2)"><div class="container"><div class="lbl">Testimonials</div><h2 class="st">Don't take our word for it</h2><p class="sub">Thousands of teams already made the switch.</p><div class="tg">${testimonials}</div></div></section>
<section class="pricing-bg" id="pricing"><div class="container"><div class="lbl">Pricing</div><h2 class="st">Simple, transparent pricing</h2><p class="sub">Start free. Scale when ready. No hidden fees.</p><div class="pg">${pricing}</div></div></section>
<section id="faq"><div class="container"><div class="lbl">FAQ</div><h2 class="st">Got questions?</h2><p class="sub">Everything you need to know.</p><div class="faq-list">${faq}</div></div></section>
<div class="cta-banner"><h2>Ready to get started?</h2><p>${c.footerTagline}</p><a href="#pricing" class="btnw">${c.ctaText} →</a></div>
<footer><div class="footer-inner"><a href="#" class="logo">${c.name.slice(0,-2)}<span>${c.name.slice(-2)}</span></a><div class="fl"><a href="#">Product</a><a href="#">Pricing</a><a href="#">Blog</a><a href="#">Contact</a></div></div><p class="fc2">© ${new Date().getFullYear()} ${c.name}. All rights reserved.</p></footer>
<script>
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}})});
function toggle(i){const a=document.getElementById('fa'+i),ic=document.getElementById('ic'+i),o=a.classList.contains('open');document.querySelectorAll('.fa').forEach(e=>e.classList.remove('open'));document.querySelectorAll('[id^="ic"]').forEach(e=>e.style.transform='');if(!o){a.classList.add('open');ic.style.transform='rotate(45deg)'}}</script>
</body></html>`;
}
