export function template3(c) {
  const photos = c.photos || {};
  const heroBg = photos.hero?.url ? `background:linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.88) 100%), url('${photos.hero.url}') center/cover no-repeat fixed;` : "";
  const aboutImg = photos.about?.url ? `<div class="about-img-wrap"><img src="${photos.about.url}" alt="" class="about-img"/>${photos.about.credit ? `<div class="img-credit">Photo by <a href="${photos.about.creditLink}" target="_blank">${photos.about.credit}</a> on Pexels</div>` : ""}</div>` : "";
  const a = c.accent || "#facc15";

  const stats = c.stats.map(s => `<div class="stat"><div class="sn">${s.number}</div><div class="sl">${s.label}</div></div>`).join("");
  const steps = c.howItWorks.map(s => `<div class="step"><div class="stepn">${s.step}</div><div><h3>${s.title}</h3><p>${s.desc}</p></div></div>`).join("");
  const features = c.features.map(f => `<div class="fc"><div class="fe">${f.emoji}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join("");
  const testimonials = c.testimonials.map(t => `<div class="tc"><div class="tq">"${t.quote}"</div><div class="ta">${t.name[0]}<div><strong>${t.name}</strong><span>${t.role}, ${t.company}</span></div></div></div>`).join("");
  const faq = c.faq.map((f,i) => `<div class="fi"><button onclick="toggle(${i})"><span>${f.q}</span><span id="ic${i}">+</span></button><div id="fa${i}" class="fa">${f.a}</div></div>`).join("");
  const pricing = c.pricing.map(p => `<div class="pc ${p.highlight?"ph":""}"> ${p.highlight?`<div class="pb">★ POPULAR</div>`:""}<div class="pt">${p.tier}</div><div class="pp">${p.price}<span>${p.period}</span></div><p class="pd">${p.desc}</p><ul>${p.features.map(f=>`<li>→ ${f}</li>`).join("")}</ul><a href="#pricing" class="pcta ${p.highlight?"pch":""}">${p.cta}</a></div>`).join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${c.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--a:${a};--bg:#f5f0e8;--t:#0a0a0a;--m:#444;--bd:#0a0a0a}
html{scroll-behavior:smooth} [id]{scroll-margin-top:90px}
body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--t);overflow-x:hidden}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fadeUp .5s ease both}.fu2{animation:fadeUp .5s .1s ease both}.fu3{animation:fadeUp .5s .2s ease both}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:60px;background:var(--bg);border-bottom:3px solid var(--t)}
.logo{font-family:'Space Mono',monospace;font-weight:700;font-size:18px;color:var(--t);text-decoration:none;letter-spacing:-.5px}
.logo span{color:var(--a);background:var(--t);padding:0 4px}
.nav-links{display:flex;gap:0}
.nav-links a{color:var(--t);font-family:'Space Mono',monospace;font-size:12px;text-decoration:none;padding:0 20px;height:60px;display:flex;align-items:center;border-left:2px solid var(--t);transition:background .15s}
.nav-links a:hover{background:var(--t);color:var(--bg)}
.ncta{background:var(--t);color:var(--bg);font-family:'Space Mono',monospace;font-weight:700;font-size:12px;padding:10px 22px;text-decoration:none;border:2px solid var(--t);transition:background .15s,color .15s}
.ncta:hover{background:var(--a);color:var(--t)}

.hero{min-height:100vh;display:grid;grid-template-rows:1fr auto;padding:100px 40px 0;border-bottom:3px solid var(--t);position:relative;overflow:hidden}
.hero-inner{display:flex;flex-direction:column;justify-content:center;max-width:1200px;margin:0 auto;width:100%}
.badge{display:inline-block;background:var(--a);color:var(--t);font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:6px 16px;margin-bottom:28px;border:2px solid var(--t)}
.hero h1{font-family:'Space Mono',monospace;font-weight:700;font-size:clamp(36px,6vw,82px);line-height:1.05;letter-spacing:-2px;max-width:900px;margin-bottom:28px;text-transform:uppercase}
.hero h1 em{font-style:normal;color:var(--bg);background:var(--t);padding:0 8px}
.hero p{font-size:clamp(15px,1.6vw,18px);color:var(--m);max-width:520px;margin-bottom:48px;line-height:1.8}
.actions{display:flex;gap:0;flex-wrap:wrap;margin-bottom:0}
.btn{background:var(--t);color:var(--bg);font-family:'Space Mono',monospace;font-weight:700;font-size:13px;padding:16px 32px;text-decoration:none;border:2px solid var(--t);transition:background .15s,color .15s}
.btn:hover{background:var(--a);color:var(--t)}
.btn2{background:transparent;color:var(--t);font-family:'Space Mono',monospace;font-weight:700;font-size:13px;padding:16px 32px;text-decoration:none;border:2px solid var(--t);border-left:none;transition:background .15s}
.btn2:hover{background:var(--bg)}
.hero-bottom{border-top:3px solid var(--t);margin:0 -40px;padding:24px 40px;display:flex;align-items:center;gap:40px;flex-wrap:wrap}
.logos-label{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--m)}
.logos{display:flex;gap:32px;flex-wrap:wrap}
.logos span{font-family:'Space Mono',monospace;font-size:12px;color:#bbb;font-weight:700}

.stats-band{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:3px solid var(--t)}
.stat{padding:40px 32px;border-right:3px solid var(--t)}.stat:last-child{border-right:none}
.sn{font-family:'Space Mono',monospace;font-weight:700;font-size:clamp(32px,5vw,52px);color:var(--t);letter-spacing:-2px;line-height:1;margin-bottom:8px}
.sl{font-size:13px;color:var(--m)}

section{padding:80px 40px;border-bottom:3px solid var(--t)}
.container{max-width:1200px;margin:0 auto}
.lbl{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--m);margin-bottom:16px}
h2.st{font-family:'Space Mono',monospace;font-weight:700;font-size:clamp(28px,4vw,52px);letter-spacing:-1.5px;line-height:1.05;margin-bottom:20px;text-transform:uppercase}
.sub{font-size:16px;color:var(--m);max-width:520px;line-height:1.8;margin-bottom:56px}

.ps-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;border:3px solid var(--t)}
.ps-card{padding:48px 40px}.ps-card:first-child{border-right:3px solid var(--t)}
.ps-card .icon{font-size:40px;margin-bottom:20px}
.ps-card h3{font-family:'Space Mono',monospace;font-weight:700;font-size:20px;margin-bottom:14px;text-transform:uppercase;letter-spacing:-.5px}
.ps-card p{color:var(--m);font-size:15px;line-height:1.85}

.steps{display:flex;flex-direction:column;border:3px solid var(--t)}
.step{display:flex;align-items:flex-start;gap:32px;padding:40px;border-bottom:3px solid var(--t);transition:background .15s}
.step:last-child{border-bottom:none}.step:hover{background:#eee8d8}
.stepn{font-family:'Space Mono',monospace;font-weight:700;font-size:48px;color:var(--a);background:var(--t);width:72px;height:72px;display:flex;align-items:center;justify-content:center;flex-shrink:0;line-height:1}
.step h3{font-family:'Space Mono',monospace;font-weight:700;font-size:17px;margin-bottom:10px;text-transform:uppercase}
.step p{color:var(--m);font-size:15px;line-height:1.8}

.features-bg{background:#0a0a0a}
.fg{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
.fc{padding:44px 36px;border-right:3px solid #1e1e1e;border-bottom:3px solid #1e1e1e;transition:background .15s}
.fc:nth-child(3n){border-right:none}.fc:nth-child(n+4){border-bottom:none}
.fc:hover{background:#111}
.fe{font-size:36px;margin-bottom:20px}
.fc h3{font-family:'Space Mono',monospace;font-weight:700;font-size:15px;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px;color:#f5f0e8}
.fc p{color:#888;font-size:14px;line-height:1.75}

.tg{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:3px solid var(--t)}
.tc{padding:36px;border-right:3px solid var(--t)}.tc:last-child{border-right:none}
.tq{font-size:15px;line-height:1.85;margin-bottom:24px;color:var(--m);font-style:italic}
.ta{display:flex;align-items:center;gap:12px}
.ta>div:first-child{width:40px;height:40px;background:var(--t);color:var(--a);font-family:'Space Mono',monospace;font-weight:700;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ta strong{display:block;font-size:14px;font-weight:600}
.ta span{color:var(--m);font-size:12px;font-family:'Space Mono',monospace}

.pricing-bg{background:#0a0a0a;color:#f5f0e8}
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:3px solid #333}
.pc{padding:40px 32px;border-right:3px solid #333;display:flex;flex-direction:column;position:relative}
.pc:last-child{border-right:none}
.ph{background:#111;border-color:${a}!important}
.pb{display:inline-block;background:${a};color:#000;font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:1px;padding:4px 12px;margin-bottom:16px}
.pt{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#666;margin-bottom:14px}
.pp{font-family:'Space Mono',monospace;font-weight:700;font-size:42px;letter-spacing:-2px;margin-bottom:6px;color:#f5f0e8}
.pp span{font-size:13px;font-weight:400;color:#666;letter-spacing:0;margin-left:4px;font-family:'Space Grotesk',sans-serif}
.pd{color:#888;font-size:14px;margin-bottom:24px;padding-bottom:24px;border-bottom:2px solid #222}
.pc ul{list-style:none;flex:1;margin-bottom:32px;display:flex;flex-direction:column;gap:10px}
.pc li{font-size:14px;color:#aaa;line-height:1.5;font-family:'Space Mono',monospace}
.pcta{display:block;text-align:center;padding:13px;font-family:'Space Mono',monospace;font-weight:700;font-size:12px;text-decoration:none;border:2px solid #333;color:#f5f0e8;text-transform:uppercase;letter-spacing:1px;transition:background .15s,border-color .15s}
.pcta:hover{background:#1e1e1e;border-color:#444}
.pch{background:${a}!important;color:#000!important;border-color:${a}!important}
.pch:hover{opacity:.88!important}

.faq-list{display:flex;flex-direction:column;border:3px solid var(--t)}
.fi{border-bottom:3px solid var(--t)}.fi:last-child{border-bottom:none}
.fi button{width:100%;background:none;border:none;color:var(--t);font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:500;padding:26px 32px;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;transition:background .15s}
.fi button:hover{background:#eee8d8}
#ic0,#ic1,#ic2,#ic3{color:var(--t);font-size:24px;flex-shrink:0;transition:transform .25s;font-family:'Space Mono',monospace}
.fa{max-height:0;overflow:hidden;transition:max-height .3s,padding .3s;color:var(--m);font-size:15px;line-height:1.85;padding:0 32px}
.fa.open{max-height:200px;padding:0 32px 26px}

.cta-banner{background:var(--a);border-bottom:3px solid var(--t);padding:100px 40px;text-align:center}
.cta-banner h2{font-family:'Space Mono',monospace;font-weight:700;font-size:clamp(28px,5vw,60px);letter-spacing:-2px;margin-bottom:20px;color:var(--t);text-transform:uppercase;line-height:1.05}
.cta-banner p{color:#000000aa;font-size:17px;max-width:480px;margin:0 auto 44px;line-height:1.8}
.btnb{background:var(--t);color:var(--bg);font-family:'Space Mono',monospace;font-weight:700;font-size:13px;padding:16px 36px;text-decoration:none;display:inline-block;border:2px solid var(--t);transition:background .15s,color .15s}
.btnb:hover{background:var(--bg);color:var(--t)}

footer{padding:40px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;border-top:3px solid var(--t)}
.fl{display:flex;gap:0}
.fl a{color:var(--m);font-family:'Space Mono',monospace;font-size:11px;text-decoration:none;padding:8px 16px;border:1px solid var(--bd);border-left:none;transition:background .15s}
.fl a:first-child{border-left:1px solid var(--bd)}
.fl a:hover{background:var(--t);color:var(--bg)}
.fc2{color:#aaa;font-family:'Space Mono',monospace;font-size:11px}

@media(max-width:900px){
  nav{padding:0 20px}.nav-links{display:none}
  .hero{padding:90px 20px 0}.hero-bottom{padding:20px}.actions{flex-wrap:wrap}
  .btn2{border-left:2px solid var(--t)}
  .ps-grid,.fg,.tg,.pg{grid-template-columns:1fr}
  .ps-card:first-child{border-right:none;border-bottom:3px solid var(--t)}
  .tc{border-right:none;border-bottom:3px solid var(--t)}.tc:last-child{border-bottom:none}
  .fc{border-right:none!important}.fc:nth-child(n+4){border-bottom:3px solid #1e1e1e!important}.fc:last-child{border-bottom:none!important}
  .pc{border-right:none;border-bottom:3px solid #333}.pc:last-child{border-bottom:none}
  .stats-band{grid-template-columns:repeat(2,1fr)}.stat:nth-child(2){border-right:none}.stat:nth-child(1),.stat:nth-child(2){border-bottom:3px solid var(--t)}
  section{padding:60px 20px}
}
.about-img-wrap{margin:0 auto 64px;max-width:900px;border-radius:16px;overflow:hidden;position:relative;border:1px solid var(--bd)}.about-img{width:100%;height:420px;object-fit:cover;display:block;filter:brightness(0.85)}.img-credit{position:absolute;bottom:8px;right:12px;font-size:10px;color:rgba(255,255,255,0.4)}.img-credit a{color:rgba(255,255,255,0.4);text-decoration:none}
</style></head><body>
<nav>
  <a href="#" class="logo">${c.name.slice(0,-2)}<span>${c.name.slice(-2)}</span></a>
  <div class="nav-links"><a href="#how-it-works">HOW IT WORKS</a><a href="#features">FEATURES</a><a href="#pricing">PRICING</a><a href="#faq">FAQ</a></div>
  <a href="#pricing" class="ncta">${c.ctaText.toUpperCase()}</a>
</nav>
<section class="hero">
  <div class="hero-inner">
    <div class="badge fu">${c.tagline.toUpperCase()}</div>
    <h1 class="fu2">${c.heroHeadline.toUpperCase().replace(/(\S+)\s*$/,'<em>$1</em>')}</h1>
    <p class="fu3">${c.heroSub}</p>
    <div class="actions fu3"><a href="#pricing" class="btn">${c.ctaText.toUpperCase()} →</a><a href="#how-it-works" class="btn2">SEE HOW IT WORKS</a></div>
  </div>
  <div class="hero-bottom"><div class="logos-label">Trusted by</div><div class="logos">${["Acme Corp","Globex","Initech","Umbrella","Hooli"].map(n=>`<span>${n.toUpperCase()}</span>`).join("")}</div></div>
</section>
<div class="stats-band">${stats}</div>
<section><div class="container"><div class="lbl">The Challenge</div><h2 class="st">Why this matters</h2>${aboutImg}<div class="ps-grid"><div class="ps-card"><div class="icon">😤</div><h3>${c.problemTitle}</h3><p>${c.problemText}</p></div><div class="ps-card"><div class="icon">✨</div><h3>${c.solutionTitle}</h3><p>${c.solutionText}</p></div></div></div></section>
<section id="how-it-works"><div class="container"><div class="lbl">How It Works</div><h2 class="st">Three steps. That's it.</h2><p class="sub">No complicated setup. No learning curve. Just results.</p><div class="steps">${steps}</div></div></section>
<section id="features" class="features-bg"><div class="container"><div class="lbl" style="color:${a}">Features</div><h2 class="st" style="color:#f5f0e8">Everything you need</h2><p class="sub" style="color:#666">Built for speed, designed for scale.</p><div class="fg">${features}</div></div></section>
<section><div class="container"><div class="lbl">Testimonials</div><h2 class="st">Real teams. Real results.</h2><p class="sub">Thousands of teams already made the switch.</p><div class="tg">${testimonials}</div></div></section>
<section class="pricing-bg" id="pricing"><div class="container"><div class="lbl" style="color:${a}">Pricing</div><h2 class="st" style="color:#f5f0e8">Pick your plan.</h2><p class="sub" style="color:#666">Start free. Scale when ready.</p><div class="pg">${pricing}</div></div></section>
<section id="faq"><div class="container"><div class="lbl">FAQ</div><h2 class="st">Questions answered.</h2><p class="sub">Everything you need to know.</p><div class="faq-list">${faq}</div></div></section>
<div class="cta-banner"><h2>Ready to get started?</h2><p>${c.footerTagline}</p><a href="#pricing" class="btnb">${c.ctaText.toUpperCase()} →</a></div>
<footer><a href="#" class="logo">${c.name.slice(0,-2)}<span>${c.name.slice(-2)}</span></a><div class="fl"><a href="#">PRODUCT</a><a href="#">PRICING</a><a href="#">BLOG</a><a href="#">CONTACT</a></div><span class="fc2">© ${new Date().getFullYear()} ${c.name}</span></footer>
<script>
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}})});
function toggle(i){const a=document.getElementById('fa'+i),ic=document.getElementById('ic'+i),o=a.classList.contains('open');document.querySelectorAll('.fa').forEach(e=>e.classList.remove('open'));document.querySelectorAll('[id^="ic"]').forEach(e=>e.style.transform='');if(!o){a.classList.add('open');ic.style.transform='rotate(45deg)'}}</script>
</body></html>`;
}
