export function template2(c) {
  const photos = c.photos || {};
  const heroBg = photos.hero?.url ? `background:linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.88) 100%), url('${photos.hero.url}') center/cover no-repeat fixed;` : "";
  const aboutImg = photos.about?.url ? `<div class="about-img-wrap"><img src="${photos.about.url}" alt="" class="about-img"/>${photos.about.credit ? `<div class="img-credit">Photo by <a href="${photos.about.creditLink}" target="_blank">${photos.about.credit}</a> on Pexels</div>` : ""}</div>` : "";
  const a = c.accent || "#e63946";

  const stats = c.stats.map(s => `<div class="stat"><div class="sn">${s.number}</div><div class="sl">${s.label}</div></div>`).join("");
  const steps = c.howItWorks.map(s => `<div class="step"><div class="step-left"><div class="stepn">${s.step.padStart(2,'0')}</div></div><div class="step-right"><h3>${s.title}</h3><p>${s.desc}</p></div></div>`).join("");
  const features = c.features.map(f => `<div class="fc"><div class="fe">${f.emoji}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join("");
  const testimonials = c.testimonials.map(t => `<div class="tc"><p>"${t.quote}"</p><div class="ta"><div class="av">${t.name[0]}</div><div><strong>${t.name}</strong><span>${t.role}, ${t.company}</span></div></div></div>`).join("");
  const faq = c.faq.map((f,i) => `<div class="fi"><button onclick="toggle(${i})"><span>${f.q}</span><span id="ic${i}">+</span></button><div id="fa${i}" class="fa">${f.a}</div></div>`).join("");
  const pricing = c.pricing.map(p => `<div class="pc ${p.highlight?"ph":""}"> ${p.highlight?`<div class="pb">Most Popular</div>`:""}<div class="pt">${p.tier}</div><div class="pp">${p.price}<span>${p.period}</span></div><p class="pd">${p.desc}</p><ul>${p.features.map(f=>`<li><span>✓</span>${f}</li>`).join("")}</ul><a href="#pricing" class="pcta ${p.highlight?"pch":""}">${p.cta}</a></div>`).join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${c.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--a:${a};--bg:#fafaf8;--bg2:#f2f0eb;--bg3:#e8e5de;--bd:#e0ddd6;--t:#1a1814;--m:#6b6560;--m2:#4a4540;--r:12px}
html{scroll-behavior:smooth} [id]{scroll-margin-top:90px}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--t);overflow-x:hidden}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fadeUp .7s ease both}.fu2{animation:fadeUp .7s .15s ease both}.fu3{animation:fadeUp .7s .3s ease both}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:68px;background:rgba(250,250,248,.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--bd)}
.logo{font-family:'Playfair Display',serif;font-weight:900;font-size:22px;color:var(--t);text-decoration:none;letter-spacing:-.5px}
.logo span{color:var(--a)}
.nav-links{display:flex;gap:28px}
.nav-links a{color:var(--m);font-size:14px;text-decoration:none;transition:color .2s}
.nav-links a:hover{color:var(--t)}
.ncta{background:var(--t);color:var(--bg);font-weight:600;font-size:13px;padding:9px 22px;border-radius:8px;text-decoration:none;transition:background .2s}
.ncta:hover{background:var(--a)}

.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:130px 24px 80px;position:relative;${heroBg}}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--bd)}
.badge{display:inline-block;background:${a}18;color:var(--a);font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;padding:6px 18px;border-radius:100px;margin-bottom:36px;border:1px solid ${a}30}
.hero h1{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(44px,7.5vw,104px);line-height:.95;letter-spacing:-3px;max-width:1000px;margin-bottom:32px;color:var(--t)}
.hero h1 em{font-style:italic;color:var(--a)}
.hero p{font-size:clamp(16px,1.8vw,19px);color:var(--m);max-width:540px;margin-bottom:52px;font-weight:300;line-height:1.9}
.actions{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:80px}
.btn{background:var(--t);color:var(--bg);font-weight:600;font-size:15px;padding:15px 34px;border-radius:8px;text-decoration:none;transition:background .2s,transform .2s}
.btn:hover{background:var(--a);transform:translateY(-2px)}
.btn2{background:transparent;color:var(--t);font-weight:500;font-size:15px;padding:15px 34px;border-radius:8px;text-decoration:none;border:1.5px solid var(--bd);transition:border-color .2s}
.btn2:hover{border-color:var(--t)}
.logos-row{display:flex;flex-direction:column;align-items:center;gap:14px}
.logos-label{color:var(--m);font-size:11px;letter-spacing:2px;text-transform:uppercase}
.logos{display:flex;gap:36px;flex-wrap:wrap;justify-content:center}
.logos span{color:var(--bg3);font-family:'Playfair Display',serif;font-weight:700;font-size:15px}

.stats-band{background:var(--t);padding:56px 24px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;text-align:center}
.stat{padding:24px 20px}
.stat:not(:last-child){border-right:1px solid #2e2a24}
.sn{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(32px,5vw,52px);color:${a};letter-spacing:-2px;line-height:1;margin-bottom:10px}
.sl{color:#888;font-size:13px;font-weight:400}

section{padding:100px 24px}
.container{max-width:1100px;margin:0 auto}
.lbl{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--a);margin-bottom:16px}
h2.st{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(30px,4vw,56px);letter-spacing:-2px;line-height:1.0;margin-bottom:20px;color:var(--t)}
.sub{font-size:17px;color:var(--m);max-width:540px;line-height:1.9;margin-bottom:64px}

.ps-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.ps-card{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:52px 44px}
.ps-card .icon{font-size:40px;margin-bottom:24px}
.ps-card h3{font-family:'Playfair Display',serif;font-weight:700;font-size:24px;margin-bottom:14px;letter-spacing:-.5px}
.ps-card p{color:var(--m2);font-size:16px;line-height:1.9}

.steps{display:flex;flex-direction:column;gap:0}
.step{display:grid;grid-template-columns:100px 1fr;border-bottom:1px solid var(--bd);padding:44px 0;transition:background .2s}
.step:last-child{border-bottom:none}
.step-left{display:flex;align-items:flex-start;padding-right:32px;border-right:1px solid var(--bd)}
.stepn{font-family:'Playfair Display',serif;font-weight:900;font-size:48px;color:${a};letter-spacing:-3px;line-height:1}
.step-right{padding-left:40px}
.step h3{font-family:'Playfair Display',serif;font-weight:700;font-size:20px;margin-bottom:12px;color:var(--t)}
.step p{color:var(--m);font-size:15px;line-height:1.85}

.features-bg{background:var(--bg2)}
.fg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.fc{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r);padding:40px 32px;transition:border-color .2s,transform .2s}
.fc:hover{border-color:${a}60;transform:translateY(-4px)}
.fe{font-size:36px;margin-bottom:20px}
.fc h3{font-family:'Playfair Display',serif;font-weight:700;font-size:18px;margin-bottom:12px;color:var(--t)}
.fc p{color:var(--m);font-size:15px;line-height:1.75}

.tg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.tc{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:36px;transition:border-color .2s,transform .2s}
.tc:hover{border-color:${a}50;transform:translateY(-3px)}
.tc p{color:var(--m2);font-size:15px;line-height:1.85;margin-bottom:24px;font-style:italic;font-family:'Playfair Display',serif}
.ta{display:flex;align-items:center;gap:12px}
.av{width:40px;height:40px;border-radius:50%;background:var(--t);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:15px;color:var(--bg);flex-shrink:0}
.ta strong{display:block;font-size:14px;font-weight:600;color:var(--t)}
.ta span{color:var(--m);font-size:12px}

.pricing-bg{background:var(--t)}
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pc{background:#231f19;border:1px solid #2e2a24;border-radius:var(--r);padding:40px 32px;display:flex;flex-direction:column;position:relative;transition:border-color .2s,transform .2s}
.pc:hover{border-color:#444;transform:translateY(-4px)}
.ph{border-color:${a}!important;background:linear-gradient(160deg,${a}0d,#231f19)}
.pb{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:${a};color:#000;font-size:11px;font-weight:700;letter-spacing:1px;padding:4px 16px;border-radius:100px;white-space:nowrap}
.pt{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#666;margin-bottom:14px}
.pp{font-family:'Playfair Display',serif;font-weight:900;font-size:44px;letter-spacing:-2px;margin-bottom:6px;color:#f0ede8}
.pp span{font-size:14px;font-weight:400;color:#666;letter-spacing:0;margin-left:4px;font-family:'DM Sans',sans-serif}
.pd{color:#888;font-size:14px;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #2e2a24}
.pc ul{list-style:none;flex:1;margin-bottom:32px;display:flex;flex-direction:column;gap:12px}
.pc li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#aaa;line-height:1.5}
.pc li span{color:${a};font-weight:700;font-size:13px;flex-shrink:0;margin-top:1px}
.pcta{display:block;text-align:center;padding:12px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;border:1px solid #333;color:#f0ede8;transition:background .2s,border-color .2s}
.pcta:hover{background:#2e2a24;border-color:#444}
.pch{background:${a}!important;color:#000!important;border-color:${a}!important}
.pch:hover{opacity:.88!important}

.faq-list{display:flex;flex-direction:column}
.fi{border-bottom:1px solid var(--bd)}.fi:first-child{border-top:1px solid var(--bd)}
.fi button{width:100%;background:none;border:none;color:var(--t);font-family:'DM Sans',sans-serif;font-size:16px;font-weight:500;padding:26px 0;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;transition:color .15s}
.fi button:hover{color:var(--a)}
#ic0,#ic1,#ic2,#ic3{color:var(--a);font-size:22px;flex-shrink:0;transition:transform .25s}
.fa{max-height:0;overflow:hidden;transition:max-height .3s,padding .3s;color:var(--m);font-size:15px;line-height:1.85;padding:0}
.fa.open{max-height:200px;padding:0 0 26px}

.cta-banner{background:var(--a);padding:100px 24px;text-align:center}
.cta-banner h2{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(32px,5vw,64px);letter-spacing:-2px;margin-bottom:20px;color:#000;line-height:1.0}
.cta-banner p{color:#00000099;font-size:18px;max-width:500px;margin:0 auto 44px;line-height:1.8}
.btnw{background:#000;color:var(--bg);font-weight:700;font-size:15px;padding:15px 34px;border-radius:8px;text-decoration:none;display:inline-block;transition:opacity .2s,transform .2s}
.btnw:hover{opacity:.85;transform:translateY(-2px)}

footer{padding:56px 24px;border-top:1px solid var(--bd)}
.footer-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px}
.fl{display:flex;gap:24px}
.fl a{color:var(--m);font-size:13px;text-decoration:none;transition:color .2s}
.fl a:hover{color:var(--t)}
.fc2{color:var(--bg3);font-size:12px;width:100%;text-align:center;margin-top:28px;padding-top:28px;border-top:1px solid var(--bd)}

@media(max-width:900px){
  nav{padding:0 20px}.nav-links{display:none}
  .ps-grid,.fg,.tg,.pg{grid-template-columns:1fr}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .stat:nth-child(2){border-right:none}.stat:nth-child(1),.stat:nth-child(2){border-bottom:1px solid #2e2a24}
  .step{grid-template-columns:1fr;gap:0}.step-left{border-right:none;border-bottom:1px solid var(--bd);padding-bottom:16px;margin-bottom:16px}
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
<section style="background:var(--bg2)" id="how-it-works"><div class="container"><div class="lbl">How It Works</div><h2 class="st">Up and running in minutes</h2><p class="sub">No complicated setup. No learning curve. Just results.</p><div class="steps">${steps}</div></div></section>
<section id="features" class="features-bg"><div class="container"><div class="lbl">Features</div><h2 class="st">Everything you need</h2><p class="sub">Built for speed, designed for scale.</p><div class="fg">${features}</div></div></section>
<section><div class="container"><div class="lbl">Testimonials</div><h2 class="st">Don't take our word for it</h2><p class="sub">Thousands of teams already made the switch.</p><div class="tg">${testimonials}</div></div></section>
<section class="pricing-bg" id="pricing"><div class="container"><div class="lbl" style="color:${a}">Pricing</div><h2 class="st" style="color:#f0ede8">Simple, transparent pricing</h2><p class="sub" style="color:#888">Start free. Scale when ready. No hidden fees.</p><div class="pg">${pricing}</div></div></section>
<section id="faq"><div class="container"><div class="lbl">FAQ</div><h2 class="st">Got questions?</h2><p class="sub">Everything you need to know.</p><div class="faq-list">${faq}</div></div></section>
<div class="cta-banner"><h2>Ready to get started?</h2><p>${c.footerTagline}</p><a href="#pricing" class="btnw">${c.ctaText} →</a></div>
<footer><div class="footer-inner"><a href="#" class="logo">${c.name.slice(0,-2)}<span>${c.name.slice(-2)}</span></a><div class="fl"><a href="#">Product</a><a href="#">Pricing</a><a href="#">Blog</a><a href="#">Contact</a></div></div><p class="fc2">© ${new Date().getFullYear()} ${c.name}. All rights reserved.</p></footer>
<script>
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}})});
function toggle(i){const a=document.getElementById('fa'+i),ic=document.getElementById('ic'+i),o=a.classList.contains('open');document.querySelectorAll('.fa').forEach(e=>e.classList.remove('open'));document.querySelectorAll('[id^="ic"]').forEach(e=>e.style.transform='');if(!o){a.classList.add('open');ic.style.transform='rotate(45deg)'}}</script>
</body></html>`;
}
