import { buildHTML } from "../../lib/template";

async function callGroq(prompt, temperature = 0.7, maxTokens = 2000) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: maxTokens,
      temperature,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq API error ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

function parseJSON(raw) {
  const clean = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/g, "").trim();
  try { return JSON.parse(clean); }
  catch {
    const match = clean.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Could not parse JSON response.");
    return JSON.parse(match[0]);
  }
}

export async function POST(req) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      function send(data) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }
      try {
        const { problem, vibe = "bold" } = await req.json();
        if (!problem?.trim()) throw new Error("No problem provided");

        // AGENT 1: Market Analysis
        send({ step: 1, label: "Market Analyst", status: "Analyzing the problem space…", progress: 10 });

        const analysisRaw = await callGroq(`You are a sharp startup market analyst. Given a problem, identify key insights.
Problem: "${problem}"
Return ONLY a JSON object:
{
  "corePain": "one sharp sentence describing the real pain",
  "targetPersona": "specific person description",
  "existingGap": "why current solutions fall short",
  "opportunityAngle": "the unique angle a startup should attack",
  "emotionalHook": "the emotional trigger to use in copy",
  "marketSize": "realistic market size e.g. '$2B market'"
}`, 0.6, 600);

        const analysis = parseJSON(analysisRaw);
        send({ step: 1, label: "Market Analyst", status: "Market analysis complete ✓", progress: 28, analysis });

        // AGENT 2: Brand & Content
        send({ step: 2, label: "Brand Strategist", status: "Inventing your startup brand…", progress: 38 });

        const vibeMap = {
          bold: "Punchy, high-energy copy. accent: coral (#ff6b47), amber, or lime — NOT blue or purple.",
          minimal: "Calm, confident copy. accent: sophisticated slate or near-black (#1a1a2e).",
          playful: "Fun, witty copy with personality. accent: bright pink (#ff006e) or vivid orange.",
          luxury: "Aspirational, premium copy. accent: gold (#c9a84c) or champagne.",
          brutalist: "Blunt, unapologetic copy. accent: electric red (#ff2d20) or yellow (#ffe600).",
        };

        const contentRaw = await callGroq(`You are a world-class startup branding expert.

Market insights:
- Pain: ${analysis.corePain}
- Persona: ${analysis.targetPersona}
- Gap: ${analysis.existingGap}
- Angle: ${analysis.opportunityAngle}
- Hook: ${analysis.emotionalHook}

Vibe: ${vibeMap[vibe] || vibeMap.bold}
Problem: "${problem}"

Return ONLY raw JSON (no markdown):
{
  "name": "StartupName",
  "tagline": "Punchy tagline under 10 words",
  "accent": "#hexcolor",
  "heroHeadline": "Bold emotional 6-8 word headline",
  "heroSub": "2 sentences about what it does and who it's for.",
  "ctaText": "Action 3-word CTA",
  "problemTitle": "Vivid problem title",
  "problemText": "3 vivid emotional sentences about the pain.",
  "solutionTitle": "Inspiring solution title",
  "solutionText": "3 sentences about how this startup solves it.",
  "howItWorks": [
    {"step":"1","title":"Step","desc":"2 sentences."},
    {"step":"2","title":"Step","desc":"2 sentences."},
    {"step":"3","title":"Step","desc":"2 sentences."}
  ],
  "features": [
    {"emoji":"⚡","title":"Feature","desc":"2 sentences."},
    {"emoji":"🎯","title":"Feature","desc":"2 sentences."},
    {"emoji":"🔒","title":"Feature","desc":"2 sentences."},
    {"emoji":"🚀","title":"Feature","desc":"2 sentences."},
    {"emoji":"💡","title":"Feature","desc":"2 sentences."},
    {"emoji":"📊","title":"Feature","desc":"2 sentences."}
  ],
  "stats": [
    {"number":"10x","label":"Faster than alternatives"},
    {"number":"50k+","label":"Teams already onboard"},
    {"number":"99.9%","label":"Uptime guaranteed"},
    {"number":"4.9★","label":"Average customer rating"}
  ],
  "testimonials": [
    {"quote":"Specific 2-sentence testimonial.","name":"Full Name","role":"Job Title","company":"Company"},
    {"quote":"Specific 2-sentence testimonial.","name":"Full Name","role":"Job Title","company":"Company"},
    {"quote":"Specific 2-sentence testimonial.","name":"Full Name","role":"Job Title","company":"Company"}
  ],
  "faq": [
    {"q":"Real customer question?","a":"2-3 sentence answer."},
    {"q":"Real customer question?","a":"2-3 sentence answer."},
    {"q":"Real customer question?","a":"2-3 sentence answer."},
    {"q":"Real customer question?","a":"2-3 sentence answer."}
  ],
  "pricing": [
    {"tier":"Free","price":"$0","period":"forever","desc":"For individuals","features":["Feature 1","Feature 2","Feature 3","Feature 4"],"cta":"Get Started Free"},
    {"tier":"Pro","price":"$29","period":"per month","desc":"For growing teams","features":["Everything in Free","Feature 5","Feature 6","Priority support","Analytics"],"cta":"Start Free Trial","highlight":true},
    {"tier":"Enterprise","price":"Custom","period":"contact us","desc":"For large orgs","features":["Everything in Pro","Unlimited seats","Custom integrations","Dedicated support","99.99% SLA"],"cta":"Contact Sales"}
  ],
  "footerTagline": "One bold inspiring closing sentence."
}`, 0.85, 4000);

        let content = parseJSON(contentRaw);
        send({ step: 2, label: "Brand Strategist", status: "Startup invented ✓", progress: 65 });

        // AGENT 3: Copy Critic
        send({ step: 3, label: "Copy Editor", status: "Sharpening the copy…", progress: 72 });

        const critiqueRaw = await callGroq(`You are a brutally honest startup copy editor. Improve the weakest headlines in this content.

Name: ${content.name}
Tagline: ${content.tagline}
Hero headline: ${content.heroHeadline}
Hero sub: ${content.heroSub}
Problem title: ${content.problemTitle}
Solution title: ${content.solutionTitle}
Footer tagline: ${content.footerTagline}

Problem: "${problem}"
Persona: ${analysis.targetPersona}
Hook: ${analysis.emotionalHook}

Return ONLY a JSON object with these 7 fields improved (make them sharper, more specific, less generic):
{
  "name": "...",
  "tagline": "...",
  "heroHeadline": "...",
  "heroSub": "...",
  "problemTitle": "...",
  "solutionTitle": "...",
  "footerTagline": "..."
}`, 0.7, 500);

        const refinements = parseJSON(critiqueRaw);
        content = { ...content, ...refinements };
        send({ step: 3, label: "Copy Editor", status: "Copy polished ✓", progress: 88 });

        // Generate specific photo search queries
        const photoQueryRaw = await callGroq(`Given this startup, suggest 2 specific Pexels photo search queries.

Startup: ${content.name}
Problem: "${problem}"
Target persona: ${analysis.targetPersona}
Industry angle: ${analysis.opportunityAngle}

Return ONLY a JSON object:
{
  "heroQuery": "3-5 word query for a dramatic wide hero background photo (e.g. 'busy city street night', 'doctor examining patient', 'remote worker laptop coffee')",
  "aboutQuery": "3-5 word query for a photo showing the problem or people affected (e.g. 'stressed person phone', 'cluttered home office', 'mechanic fixing car')"
}`, 0.5, 200);

        let photoQueries = { heroQuery: analysis.opportunityAngle, aboutQuery: analysis.corePain };
        try { photoQueries = parseJSON(photoQueryRaw); } catch (e) { /* use fallback */ }

        // Fetch Pexels photos
        send({ step: 3, label: "Copy Editor", status: "Finding photos…", progress: 92 });
        const pexelsKey = process.env.PEXELS_API_KEY;
        const photos = { hero: null, about: null };

        if (pexelsKey) {
          try {
            const [heroRes, aboutRes] = await Promise.all([
              fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(photoQueries.heroQuery)}&orientation=landscape&per_page=1`, {
                headers: { Authorization: pexelsKey }
              }),
              fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(photoQueries.aboutQuery)}&orientation=landscape&per_page=1`, {
                headers: { Authorization: pexelsKey }
              }),
            ]);
            if (heroRes.ok) {
              const h = await heroRes.json();
              const photo = h.photos?.[0];
              if (photo) photos.hero = { url: photo.src.large2x, credit: photo.photographer, creditLink: photo.photographer_url };
            }
            if (aboutRes.ok) {
              const ab = await aboutRes.json();
              const photo = ab.photos?.[0];
              if (photo) photos.about = { url: photo.src.large2x, credit: photo.photographer, creditLink: photo.photographer_url };
            }
          } catch (e) {
            console.warn("Pexels fetch failed:", e.message);
          }
        }

        content = { ...content, photos };

        // Build HTML
        send({ step: 3, label: "Copy Editor", status: "Assembling your website…", progress: 96 });
        const html = buildHTML(content, vibe);

        send({ done: true, progress: 100, html, analysis, content, startup: { name: content.name, tagline: content.tagline } });
        controller.close();
      } catch (err) {
        console.error("Error:", err);
        send({ error: err.message || "Something went wrong." });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
