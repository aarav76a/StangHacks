export function template1(c) {
  const a = c.accent || "#f97316";
  const photos = c.photos || {};
  const heroBg = photos.hero?.url
    ? `background:linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.85) 100%), url('${photos.hero.url}') center/cover no-repeat fixed;`
    : "";
  const aboutImg = photos.about?.url
    ? `<div class="about-img-wrap"><img src="${photos.about.url}" alt="About" class="about-img"/>${photos.about.credit ? `<div class="img-credit">Photo by <a href="${photos.about.creditLink}" target="_blank">${photos.about.credit}</a> on Pexels</div>` : ""}</div>`
    : "";

  const features = c.features.map(f => `<div class="fc"><div class="fe">${f.emoji}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join("");
  const stats = c.stats.map(s => `<div class="stat"><div class="sn">${s.number}</div><div class="sl">${s.label}</div></div>`).join("");
  const steps = c.howItWorks.map(s => `<div class="step"><span class="stepn">${s.step}</span><div><h3>${s.title}</h3><p>${s.desc}</p></div></div>`).join("");
  const testimonials = c.testimonials.map(t => `<div class="tc"><div class="stars">★★★★★</div><p>"${t.quote}"</p><div class="ta"><div class="av">${t.name[0]}</div><div><strong>${t.name}</strong><span>${t.role}, ${t.company}</span></div></div></div>`).join("");
  const faq = c.faq.map((f,i) => `<div class="fi"><button onclick="toggle(${i})"><span>${f.q}</span><span id="ic${i}">+</span></button><div id="fa${i}" class="fa">${f.a}</div></div>`).join("");
  const pricing = c.pricing.map(p => `<div class="pc ${p.highlight?"ph":""}"> ${p.highlight?'<div class="pb">Most Popular</div>':""}<div class="pt">${p.tier}</div><div class="pp">${p.price}<span>${p.period}</span></div><div class="pd">${p.desc}</div><ul>${p.features.map(f=>`<li><span>✓</span>${f}</li>`).join("")}</ul><a href="#pricing" class="pcta ${p.highlight?"pch":""}">${p.cta}</a></div>`).join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${c.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--a:${a};--bg:#080808;--bg2:#0f0f0f;--bg3:#141414;--bd:#1e1e1e;--t:#f0ede8;--m:#777;--m2:#aaa}
html{scroll-behavior:smooth} [id]{scroll-margin-top:90px}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--t);overflow-x:hidden}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.fu{animation:fadeUp .7s ease both}.fu2{animation:fadeUp .7s .15s ease both}.fu3{animation:fadeUp .7s .3s ease both}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:64px;background:rgba(8,8,8,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--bd)}
.logo{font-family:'Syne',sans-serif;font-weight:800;font-size:20px;color:var(--t);text-decoration:none}
.logo span{color:var(--a)}
.nav-links{display:flex;gap:28px}
.nav-links a{color:var(--m);font-size:14px;text-decoration:none;transition:color .2s}
.nav-links a:hover{color:var(--t)}
.ncta{background:var(--a);color:#000;font-weight:600;font-size:13px;padding:8px 20px;border-radius:8px;text-decoration:none;transition:opacity .2s,transform .2s}
.ncta:hover{opacity:.85;transform:translateY(-1px)}

.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 24px 80px;position:relative;overflow:hidden;${heroBg}}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 55% at 50% 40%,${a}1a 0%,transparent 70%);pointer-events:none}
.about-img-wrap{margin:0 auto 64px;max-width:900px;border-radius:16px;overflow:hidden;position:relative;border:1px solid var(--bd)}
.about-img{width:100%;height:420px;object-fit:cover;display:block;filter:brightness(0.85)}
.img-credit{position:absolute;bottom:8px;right:12px;font-size:10px;color:rgba(255,255,255,0.4)}
.img-credit a{color:rgba(255,255,255,0.4);text-decoration:none}
.img-credit a:hover{color:rgba(255,255,255,0.7)}
.badge{display:inline-flex;align-items:center;gap:8px;background:${a}15;border:1px solid ${a}40;color:var(--a);font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:100px;margin-bottom:32px}
.badge::before{content:'●';animation:pulse 2s infinite;font-size:8px}
.hero h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(44px,8vw,100px);line-height:1;letter-spacing:-3px;max-width:980px;margin-bottom:28px}
.hero h1 em{font-style:normal;color:var(--a)}
.hero p{font-size:clamp(16px,2vw,20px);color:var(--m2);max-width:560px;margin-bottom:48px;font-weight:300;line-height:1.8}
.actions{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:80px}
.btn{background:var(--a);color:#000;font-weight:700;font-size:15px;padding:15px 34px;border-radius:10px;text-decoration:none;transition:transform .2s,box-shadow .2s}
.btn:hover{transform:translateY(-2px);box-shadow:0 10px 40px ${a}45}
.btn2{background:transparent;color:var(--t);font-weight:500;font-size:15px;padding:15px 34px;border-radius:10px;text-decoration:none;border:1px solid var(--bd);transition:border-color .2s,background .2s}
.btn2:hover{border-color:#333;background:#111}
.logos-row{display:flex;flex-direction:column;align-items:center;gap:14px}
.logos-label{color:var(--m);font-size:11px;letter-spacing:2px;text-transform:uppercase}
.logos{display:flex;gap:40px;flex-wrap:wrap;justify-content:center}
.logos span{color:#2e2e2e;font-family:'Syne',sans-serif;font-weight:700;font-size:15px}

.stats-band{background:var(--bg2);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:56px 24px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;text-align:center}
.stat{padding:24px 20px}.stat:not(:last-child){border-right:1px solid var(--bd)}
.sn{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(32px,5vw,52px);color:var(--a);letter-spacing:-2px;line-height:1;margin-bottom:10px}
.sl{color:var(--m);font-size:13px;font-weight:500}

section{padding:100px 24px}
.container{max-width:1100px;margin:0 auto}
.lbl{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--a);margin-bottom:16px}
h2.st{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(30px,4vw,52px);letter-spacing:-1.5px;line-height:1.05;margin-bottom:20px}
.sub{font-size:17px;color:var(--m2);max-width:560px;line-height:1.8;margin-bottom:64px}

.ps-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;border:1px solid var(--bd);border-radius:16px;overflow:hidden}
.ps-card{background:var(--bg2);padding:56px 48px}.ps-card:first-child{border-right:1px solid var(--bd)}
.ps-card .icon{font-size:36px;margin-bottom:24px}
.ps-card h3{font-family:'Syne',sans-serif;font-weight:700;font-size:22px;margin-bottom:14px;letter-spacing:-.5px}
.ps-card p{color:var(--m2);font-size:16px;line-height:1.9}

.steps{display:flex;flex-direction:column;border:1px solid var(--bd);border-radius:16px;overflow:hidden}
.step{display:flex;align-items:flex-start;gap:40px;padding:48px 52px;background:var(--bg3);border-bottom:1px solid var(--bd);transition:background .2s}
.step:last-child{border-bottom:none}.step:hover{background:#181818}
.stepn{font-family:'Syne',sans-serif;font-weight:800;font-size:56px;color:${a}28;letter-spacing:-3px;line-height:1;flex-shrink:0;width:70px}
.step h3{font-family:'Syne',sans-serif;font-weight:700;font-size:19px;margin-bottom:10px;letter-spacing:-.3px}
.step p{color:var(--m2);font-size:15px;line-height:1.8}

.features-bg{background:var(--bg2)}
.fg{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;border:1px solid var(--bd);border-radius:16px;overflow:hidden}
.fc{background:var(--bg3);padding:44px 36px;transition:background .2s}
.fc:hover{background:#1c1c1c}
.fe{font-size:36px;margin-bottom:20px}
.fc h3{font-family:'Syne',sans-serif;font-weight:700;font-size:18px;margin-bottom:12px;letter-spacing:-.3px}
.fc p{color:var(--m2);font-size:15px;line-height:1.75}

.tg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.tc{background:var(--bg2);border:1px solid var(--bd);border-radius:16px;padding:36px;transition:border-color .2s,transform .2s}
.tc:hover{border-color:#333;transform:translateY(-4px)}
.stars{color:var(--a);font-size:14px;margin-bottom:18px;letter-spacing:2px}
.tc p{color:var(--m2);font-size:15px;line-height:1.8;margin-bottom:24px;font-style:italic}
.ta{display:flex;align-items:center;gap:12px}
.av{width:40px;height:40px;border-radius:50%;background:${a}20;border:1px solid ${a}40;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:15px;color:var(--a);flex-shrink:0}
.ta strong{display:block;font-size:14px;font-weight:600}
.ta span{color:var(--m);font-size:12px}

.pricing-bg{background:var(--bg2)}
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pc{background:var(--bg3);border:1px solid var(--bd);border-radius:16px;padding:40px 32px;display:flex;flex-direction:column;position:relative;transition:border-color .2s,transform .2s}
.pc:hover{border-color:#333;transform:translateY(-4px)}
.ph{border-color:var(--a)!important;background:linear-gradient(160deg,${a}0a,var(--bg3))}
.pb{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--a);color:#000;font-size:11px;font-weight:700;letter-spacing:1px;padding:4px 16px;border-radius:100px;white-space:nowrap}
.pt{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--m);margin-bottom:14px}
.pp{font-family:'Syne',sans-serif;font-weight:800;font-size:42px;letter-spacing:-2px;margin-bottom:6px}
.pp span{font-size:14px;font-weight:400;color:var(--m);letter-spacing:0;margin-left:4px}
.pd{color:var(--m2);font-size:14px;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid var(--bd)}
.pc ul{list-style:none;flex:1;margin-bottom:32px;display:flex;flex-direction:column;gap:12px}
.pc li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#bbb;line-height:1.5}
.pc li span{color:var(--a);font-weight:700;font-size:13px;flex-shrink:0;margin-top:1px}
.pcta{display:block;text-align:center;padding:12px;border-radius:10px;font-weight:600;font-size:14px;text-decoration:none;border:1px solid var(--bd);color:var(--t);transition:background .2s,border-color .2s}
.pcta:hover{background:#1e1e1e;border-color:#333}
.pch{background:var(--a)!important;color:#000!important;border-color:var(--a)!important}
.pch:hover{opacity:.88!important}

.faq-list{display:flex;flex-direction:column;border:1px solid var(--bd);border-radius:16px;overflow:hidden}
.fi{background:var(--bg2);border-bottom:1px solid var(--bd)}.fi:last-child{border-bottom:none}
.fi button{width:100%;background:none;border:none;color:var(--t);font-family:'Inter',sans-serif;font-size:16px;font-weight:500;padding:26px 36px;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;transition:background .15s}
.fi button:hover{background:#111}
#ic0,#ic1,#ic2,#ic3{color:var(--a);font-size:22px;font-weight:300;flex-shrink:0;transition:transform .25s}
.fa{max-height:0;overflow:hidden;transition:max-height .3s,padding .3s;color:var(--m2);font-size:15px;line-height:1.8;padding:0 36px}
.fa.open{max-height:200px;padding:0 36px 26px}

.cta-banner{background:var(--bg2);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:100px 24px;text-align:center;position:relative;overflow:hidden}
.cta-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 50%,${a}12 0%,transparent 70%);pointer-events:none}
.cta-banner h2{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(32px,5vw,60px);letter-spacing:-2px;margin-bottom:20px;line-height:1.05}
.cta-banner p{color:var(--m2);font-size:18px;max-width:500px;margin:0 auto 44px;line-height:1.8}

footer{padding:56px 24px;border-top:1px solid var(--bd)}
.footer-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px}
.footer-inner a.logo{font-size:18px}
.fl{display:flex;gap:24px}
.fl a{color:var(--m);font-size:13px;text-decoration:none;transition:color .2s}
.fl a:hover{color:var(--t)}
.fc2{color:#2a2a2a;font-size:12px;width:100%;text-align:center;margin-top:28px;padding-top:28px;border-top:1px solid var(--bd)}

@media(max-width:900px){
  nav{padding:0 20px}.nav-links{display:none}
  .ps-grid,.fg,.tg,.pg{grid-template-columns:1fr}
  .ps-card:first-child{border-right:none;border-bottom:1px solid var(--bd)}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .stat:nth-child(2){border-right:none}.stat:nth-child(1),.stat:nth-child(2){border-bottom:1px solid var(--bd)}
  .step{flex-direction:column;gap:16px;padding:32px 24px}.stepn{font-size:40px;width:auto}
  .ps-card{padding:36px 24px}.fi button{padding:22px 24px;font-size:15px}
  .fa,.fa.open{padding-left:24px;padding-right:24px}
}
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
<section><div class="container">
  <div class="lbl">The Challenge</div><h2 class="st">Why this matters</h2>
  ${aboutImg}
  <div class="ps-grid">
    <div class="ps-card"><div class="icon">😤</div><h3>${c.problemTitle}</h3><p>${c.problemText}</p></div>
    <div class="ps-card"><div class="icon">✨</div><h3>${c.solutionTitle}</h3><p>${c.solutionText}</p></div>
  </div>
</div></section>
<section style="background:var(--bg2)" id="how-it-works"><div class="container">
  <div class="lbl">How It Works</div><h2 class="st">Up and running in minutes</h2>
  <p class="sub">No complicated setup. No learning curve. Just results.</p>
  <div class="steps">${steps}</div>
</div></section>
<section id="features" class="features-bg"><div class="container">
  <div class="lbl">Features</div><h2 class="st">Everything you need</h2>
  <p class="sub">Built for speed, designed for scale.</p>
  <div class="fg">${features}</div>
</div></section>
<section><div class="container">
  <div class="lbl">Testimonials</div><h2 class="st">Don't take our word for it</h2>
  <p class="sub">Thousands of teams already made the switch.</p>
  <div class="tg">${testimonials}</div>
</div></section>
<section class="pricing-bg" id="pricing"><div class="container">
  <div class="lbl">Pricing</div><h2 class="st">Simple, transparent pricing</h2>
  <p class="sub">Start free. Scale when ready. No hidden fees.</p>
  <div class="pg">${pricing}</div>
</div></section>
<section id="faq"><div class="container">
  <div class="lbl">FAQ</div><h2 class="st">Got questions?</h2>
  <p class="sub">Everything you need to know before getting started.</p>
  <div class="faq-list">${faq}</div>
</div></section>
<div class="cta-banner"><div class="container"><h2>Ready to get started?</h2><p>${c.footerTagline}</p><a href="#pricing" class="btn" style="display:inline-block">${c.ctaText} →</a></div></div>
<footer><div class="footer-inner">
  <a href="#" class="logo">${c.name.slice(0,-2)}<span>${c.name.slice(-2)}</span></a>
  <div class="fl"><a href="#">Product</a><a href="#">Pricing</a><a href="#">Blog</a><a href="#">Contact</a></div>
</div><p class="fc2">© ${new Date().getFullYear()} ${c.name}. All rights reserved.</p></footer>
<script>
document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href').slice(1);if(!id)return;var el=document.getElementById(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}})})});
function toggle(i){const a=document.getElementById('fa'+i),ic=document.getElementById('ic'+i),o=a.classList.contains('open');document.querySelectorAll('.fa').forEach(e=>e.classList.remove('open'));document.querySelectorAll('[id^="ic"]').forEach(e=>e.style.transform='');if(!o){a.classList.add('open');ic.style.transform='rotate(45deg)'}}
</script></body></html>`;
}
