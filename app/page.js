"use client";
import { useState, useEffect, useRef } from "react";

const VIBES = [
  { id: "bold", label: "Bold", emoji: "⚡", desc: "High-contrast, punchy" },
  { id: "minimal", label: "Minimal", emoji: "◻", desc: "Clean, confident" },
  { id: "playful", label: "Playful", emoji: "🎨", desc: "Fun, energetic" },
  { id: "luxury", label: "Luxury", emoji: "✦", desc: "Premium, refined" },
  { id: "brutalist", label: "Brutalist", emoji: "▓", desc: "Raw, unapologetic" },
];

const EXAMPLES = [
  "People forget to drink water",
  "Remote teams feel disconnected",
  "Finding a good mechanic is hard",
  "Nobody reads long emails",
  "Kids spend too much time on screens",
  "Small restaurants can't afford marketing",
];

const AGENTS = [
  { id: 1, name: "Market Analyst", icon: "🔍", color: "#60a5fa" },
  { id: 2, name: "Brand Strategist", icon: "🎯", color: "#c8f04e" },
  { id: 3, name: "Copy Editor", icon: "✏️", color: "#f472b6" },
];

function EditPanel({ content, onApply, rebuilding, onClose }) {
  const original = useRef({ ...content });
  const [draft, setDraft] = useState({ ...content });

  function field(label, key, multiline = false) {
    return (
      <div className="ep-field">
        <label className="ep-label">{label}</label>
        {multiline
          ? <textarea className="ep-input" rows={3} value={draft[key] || ""} onChange={e => setDraft(p => ({ ...p, [key]: e.target.value }))} />
          : <input className="ep-input" value={draft[key] || ""} onChange={e => setDraft(p => ({ ...p, [key]: e.target.value }))} />
        }
      </div>
    );
  }

  function featureField(i, subkey) {
    return (
      <input
        className="ep-input"
        style={{ marginBottom: 4 }}
        placeholder={subkey}
        value={draft.features?.[i]?.[subkey] || ""}
        onChange={e => {
          const features = draft.features ? [...draft.features] : [];
          features[i] = { ...features[i], [subkey]: e.target.value };
          setDraft(p => ({ ...p, features }));
        }}
      />
    );
  }

  function statField(i, subkey) {
    return (
      <input
        className="ep-input"
        style={{ marginBottom: 4 }}
        placeholder={subkey}
        value={draft.stats?.[i]?.[subkey] || ""}
        onChange={e => {
          const stats = draft.stats ? [...draft.stats] : [];
          stats[i] = { ...stats[i], [subkey]: e.target.value };
          setDraft(p => ({ ...p, stats }));
        }}
      />
    );
  }

  return (
    <div className="edit-panel">
      <div className="ep-header">
        <div className="ep-title">✏️ Edit Site</div>
        <div className="ep-sub">Changes apply to the live preview</div>
      </div>
      <div className="ep-body">

        <div className="ep-section">
          <div className="ep-section-title">Brand</div>
          {field("Company Name", "name")}
          {field("Tagline", "tagline")}
          {field("Accent Color (hex)", "accent")}
          {field("CTA Button Text", "ctaText")}
        </div>

        <div className="ep-section">
          <div className="ep-section-title">Hero</div>
          {field("Headline", "heroHeadline")}
          {field("Subheading", "heroSub", true)}
        </div>

        <div className="ep-section">
          <div className="ep-section-title">Problem & Solution</div>
          {field("Problem Title", "problemTitle")}
          {field("Problem Text", "problemText", true)}
          {field("Solution Title", "solutionTitle")}
          {field("Solution Text", "solutionText", true)}
        </div>

        <div className="ep-section">
          <div className="ep-section-title">Stats</div>
          {(draft.stats || []).map((s, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "10px", background: "#0e0e0e", borderRadius: 6, border: "1px solid #161616" }}>
              <div className="ep-label">Stat {i + 1}</div>
              {statField(i, "number")}
              {statField(i, "label")}
            </div>
          ))}
        </div>

        <div className="ep-section">
          <div className="ep-section-title">Features</div>
          {(draft.features || []).map((f, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "10px", background: "#0e0e0e", borderRadius: 6, border: "1px solid #161616" }}>
              <div className="ep-label">Feature {i + 1}</div>
              {featureField(i, "title")}
              {featureField(i, "desc")}
            </div>
          ))}
        </div>

        <div className="ep-section">
          <div className="ep-section-title">Footer</div>
          {field("Footer Tagline", "footerTagline", true)}
        </div>

      </div>
      <div className="ep-footer">
        <button className="ep-apply" disabled={rebuilding} onClick={() => onApply(draft)}>
          {rebuilding ? "Rebuilding…" : "Apply Changes →"}
        </button>
        <button className="ep-reset" onClick={() => setDraft({ ...original.current })}>Reset</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [phase, setPhase] = useState("input");
  const [problem, setProblem] = useState("");
  const [vibe, setVibe] = useState("bold");
  const [agentSteps, setAgentSteps] = useState([]);
  const [progress, setProgress] = useState(0);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [startupName, setStartupName] = useState("");
  const [error, setError] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");
  const [publishError, setPublishError] = useState("");
  const [rebuilding, setRebuilding] = useState(false);
  const iframeRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (phase === "input" && textRef.current) textRef.current.focus();
  }, [phase]);

  useEffect(() => {
    if (phase === "website" && generatedHtml && iframeRef.current) {
      iframeRef.current.srcdoc = generatedHtml;
    }
  }, [phase, generatedHtml]);

  async function generate() {
    if (!problem.trim()) return;
    setError("");
    setPhase("generating");
    setAgentSteps([]);
    setProgress(0);
    setAnalysis(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem, vibe }),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;
          try {
            const event = JSON.parse(raw);
            if (event.error) throw new Error(event.error);

            if (event.progress !== undefined) setProgress(event.progress);

            if (event.step !== undefined && event.status) {
              setAgentSteps(prev => {
                const existing = prev.findIndex(s => s.step === event.step);
                const entry = { step: event.step, label: event.label, status: event.status };
                if (existing >= 0) {
                  const updated = [...prev];
                  updated[existing] = entry;
                  return updated;
                }
                return [...prev, entry];
              });
            }

            if (event.analysis) setAnalysis(event.analysis);
            if (event.startup?.name) setStartupName(event.startup.name);

            if (event.done && event.html) {
              setGeneratedHtml(event.html);
              if (event.content) setContent(event.content);
              setPhase("website");
            }
          } catch (e) {
            if (e.message && !e.message.includes("JSON")) throw e;
          }
        }
      }
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setPhase("input");
    }
  }

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); }
  };

  async function rebuild(updatedContent) {
    setRebuilding(true);
    try {
      const res = await fetch("/api/rebuild", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: updatedContent, vibe }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error);
      setGeneratedHtml(data.html);
      setContent(updatedContent);
      setStartupName(updatedContent.name);
    } catch (e) {
      console.error("Rebuild failed:", e);
    } finally {
      setRebuilding(false);
    }
  }

  async function publish() {
    if (!generatedHtml || publishing) return;
    setPublishing(true);
    setPublishError("");
    setPublishedUrl("");
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: generatedHtml, name: startupName }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Publish failed");
      setPublishedUrl(data.url);
    } catch (e) {
      setPublishError(e.message);
    } finally {
      setPublishing(false);
    }
  }

  if (phase === "input") return (
    <main style={{
      minHeight: "100vh", background: "#080808",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "40px 20px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; }

        .badge { display:inline-flex; align-items:center; gap:8px; background:#c8f04e12; border:1px solid #c8f04e35; color:#c8f04e; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:3px; text-transform:uppercase; padding:6px 16px; border-radius:100px; margin-bottom:32px; }
        .badge-dot { width:6px; height:6px; border-radius:50%; background:#c8f04e; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .title { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(32px,6vw,66px); color:#f0ede8; line-height:1.0; text-align:center; margin-bottom:14px; letter-spacing:-2px; }
        .title span { color:#c8f04e; }
        .sub { color:#444; font-family:'DM Mono',monospace; font-size:12px; text-align:center; margin-bottom:48px; line-height:1.8; max-width:440px; }

        .vibes { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; max-width:600px; margin-bottom:28px; }
        .vibe-btn { background:#0f0f0f; border:1px solid #1c1c1c; color:#444; font-family:'DM Mono',monospace; font-size:11px; padding:8px 16px; border-radius:8px; cursor:pointer; transition:all .2s; display:flex; align-items:center; gap:6px; }
        .vibe-btn:hover { border-color:#333; color:#999; }
        .vibe-btn.active { border-color:#c8f04e60; color:#c8f04e; background:#c8f04e08; }
        .vibe-label { font-size:12px; }
        .vibe-section { display:flex; flex-direction:column; align-items:center; margin-bottom:28px; gap:10px; }
        .vibe-title { color:#2a2a2a; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:2px; text-transform:uppercase; }

        .chips { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; max-width:600px; margin-bottom:28px; }
        .chip { background:#0f0f0f; border:1px solid #1a1a1a; color:#3a3a3a; font-family:'DM Mono',monospace; font-size:11px; padding:6px 14px; border-radius:100px; cursor:pointer; transition:all .15s; }
        .chip:hover { border-color:#c8f04e40; color:#c8f04e; background:#c8f04e06; }

        textarea { width:100%; max-width:600px; min-height:90px; background:#0f0f0f; border:1.5px solid #1a1a1a; color:#f0ede8; font-family:'DM Mono',monospace; font-size:14px; padding:18px 20px; border-radius:12px; resize:vertical; outline:none; transition:border-color .2s, box-shadow .2s; line-height:1.7; }
        textarea:focus { border-color:#c8f04e; box-shadow:0 0 0 3px #c8f04e10; }
        textarea::placeholder { color:#222; }

        .btn { margin-top:12px; width:100%; max-width:600px; background:#c8f04e; color:#080808; font-family:'Syne',sans-serif; font-weight:800; font-size:15px; border:none; border-radius:10px; padding:16px 32px; cursor:pointer; transition:transform .15s, box-shadow .15s; letter-spacing:-.3px; }
        .btn:hover { transform:translateY(-2px); box-shadow:0 10px 40px #c8f04e30; }
        .hint { margin-top:10px; color:#252525; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:2px; text-transform:uppercase; }
        .err { color:#ff6b6b; font-family:'DM Mono',monospace; font-size:12px; margin-top:10px; max-width:600px; text-align:center; padding:10px 16px; background:#ff6b6b08; border:1px solid #ff6b6b25; border-radius:8px; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation: fadeUp .6s ease both; }
        .fu2 { animation: fadeUp .6s .1s ease both; }
        .fu3 { animation: fadeUp .6s .2s ease both; }
        .fu4 { animation: fadeUp .6s .3s ease both; }
      `}</style>

      <span className="badge fu"><span className="badge-dot" />3-Agent AI System</span>
      <h1 className="title fu2">What problem<br />should we <span>solve?</span></h1>
      <p className="sub fu3">Describe any problem. Three AI agents will analyze it, invent a startup, and build the full site.</p>

      <div className="vibe-section fu3">
        <span className="vibe-title">Choose your vibe</span>
        <div className="vibes">
          {VIBES.map(v => (
            <button key={v.id} className={`vibe-btn ${vibe === v.id ? "active" : ""}`} onClick={() => setVibe(v.id)}>
              <span>{v.emoji}</span>
              <span className="vibe-label">{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="chips fu4">
        {EXAMPLES.map(ex => (
          <span key={ex} className="chip" onClick={() => setProblem(ex)}>"{ex}"</span>
        ))}
      </div>

      <textarea
        ref={textRef}
        className="fu4"
        placeholder="e.g. Small restaurants can't afford a marketing team…"
        value={problem}
        onChange={e => setProblem(e.target.value)}
        onKeyDown={handleKey}
      />
      {error && <p className="err">⚠ {error}</p>}
      <button className="btn fu4" onClick={generate}>Launch My Startup →</button>
      <p className="hint">↵ enter to generate</p>
    </main>
  );

  if (phase === "generating") return (
    <main style={{
      minHeight: "100vh", background: "#080808",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "40px 20px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#080808; }

        .gen-title { font-family:'Syne',sans-serif; font-weight:800; font-size:22px; color:#f0ede8; margin-bottom:8px; letter-spacing:-1px; text-align:center; }
        .gen-problem { color:#2a2a2a; font-family:'DM Mono',monospace; font-size:12px; letter-spacing:1px; max-width:480px; text-align:center; margin-bottom:48px; }

        .progress-bar-wrap { width:100%; max-width:500px; height:2px; background:#111; border-radius:2px; margin-bottom:48px; overflow:hidden; }
        .progress-bar { height:100%; background:#c8f04e; border-radius:2px; transition:width .5s ease; box-shadow:0 0 8px #c8f04e60; }

        .agents { display:flex; flex-direction:column; gap:16px; width:100%; max-width:500px; margin-bottom:40px; }
        .agent { display:flex; align-items:flex-start; gap:16px; padding:18px 20px; border-radius:12px; border:1px solid #161616; background:#0c0c0c; transition:all .3s; }
        .agent.active { border-color:#c8f04e30; background:#c8f04e05; }
        .agent.done { border-color:#1e1e1e; opacity:0.6; }
        .agent-icon { font-size:20px; flex-shrink:0; margin-top:2px; }
        .agent-info { flex:1; }
        .agent-name { font-family:'Syne',sans-serif; font-weight:700; font-size:13px; color:#f0ede8; margin-bottom:4px; }
        .agent-status { font-family:'DM Mono',monospace; font-size:11px; color:#3a3a3a; transition:color .3s; }
        .agent.active .agent-status { color:#c8f04e; }
        .agent.done .agent-status { color:#2a2a2a; }
        .agent-indicator { width:8px; height:8px; border-radius:50%; background:#1e1e1e; flex-shrink:0; margin-top:6px; transition:all .3s; }
        .agent.active .agent-indicator { background:#c8f04e; box-shadow:0 0 6px #c8f04e; animation:pulse 1s infinite; }
        .agent.done .agent-indicator { background:#2a2a2a; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .analysis-preview { width:100%; max-width:500px; background:#0c0c0c; border:1px solid #161616; border-radius:12px; padding:20px; }
        .ap-title { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:2px; color:#2a2a2a; text-transform:uppercase; margin-bottom:14px; }
        .ap-row { display:flex; gap:12px; margin-bottom:10px; align-items:flex-start; }
        .ap-key { font-family:'DM Mono',monospace; font-size:10px; color:#333; letter-spacing:1px; min-width:90px; padding-top:1px; flex-shrink:0; }
        .ap-val { font-family:'DM Mono',monospace; font-size:11px; color:#555; line-height:1.5; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn .4s ease both; }
      `}</style>

      <p className="gen-title">Building your startup…</p>
      <p className="gen-problem">"{problem}"</p>

      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="agents">
        {AGENTS.map(agent => {
          const step = agentSteps.find(s => s.step === agent.id);
          const currentMax = agentSteps.length > 0 ? Math.max(...agentSteps.map(s => s.step)) : 0;
          const isDone = step && currentMax > agent.id;
          const isActive = step && !isDone;
          return (
            <div key={agent.id} className={`agent ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>
              <span className="agent-icon">{agent.icon}</span>
              <div className="agent-info">
                <div className="agent-name">{agent.name}</div>
                <div className="agent-status">
                  {step ? step.status : "Waiting…"}
                </div>
              </div>
              <div className="agent-indicator" />
            </div>
          );
        })}
      </div>

      {analysis && (
        <div className="analysis-preview fade-in">
          <div className="ap-title">Market Intelligence</div>
          {analysis.corePain && <div className="ap-row"><span className="ap-key">PAIN</span><span className="ap-val">{analysis.corePain}</span></div>}
          {analysis.targetPersona && <div className="ap-row"><span className="ap-key">PERSONA</span><span className="ap-val">{analysis.targetPersona}</span></div>}
          {analysis.opportunityAngle && <div className="ap-row"><span className="ap-key">ANGLE</span><span className="ap-val">{analysis.opportunityAngle}</span></div>}
          {analysis.marketSize && <div className="ap-row"><span className="ap-key">MARKET</span><span className="ap-val">{analysis.marketSize}</span></div>}
        </div>
      )}
    </main>
  );

  if (phase === "website") return (
    <main style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#080808" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#080808; }

        .toolbar { display:flex; align-items:center; justify-content:space-between; padding:0 20px; background:#0b0b0b; border-bottom:1px solid #161616; height:48px; flex-shrink:0; gap:12px; }
        .tb-left { display:flex; align-items:center; gap:10px; min-width:0; flex:1; }
        .live-dot { width:7px; height:7px; border-radius:50%; background:#c8f04e; box-shadow:0 0 6px #c8f04e; flex-shrink:0; }
        .startup-name { font-family:'Syne',sans-serif; font-weight:700; font-size:13px; color:#f0ede8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .tb-right { display:flex; gap:8px; flex-shrink:0; }
        .tb-btn { background:transparent; border:1px solid #1e1e1e; color:#444; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:1px; padding:6px 14px; border-radius:6px; cursor:pointer; transition:all .15s; white-space:nowrap; }
        .tb-btn:hover { border-color:#333; color:#888; }
        .dl-btn { background:#c8f04e; border:none; color:#080808; font-family:'Syne',sans-serif; font-weight:700; font-size:11px; padding:6px 16px; border-radius:6px; cursor:pointer; transition:all .15s; white-space:nowrap; }
        .dl-btn:hover { background:#d9ff62; }

        .analysis-panel { position:fixed; top:48px; right:0; width:320px; height:calc(100vh - 48px); background:#0a0a0a; border-left:1px solid #161616; z-index:50; overflow-y:auto; transform:translateX(${analysis && showAnalysis ? "0" : "100%"}); transition:transform .3s ease; padding:24px; }
        .ap-close { position:absolute; top:16px; right:16px; background:none; border:none; color:#333; font-size:18px; cursor:pointer; }
        .ap-close:hover { color:#888; }
        .ap-heading { font-family:'Syne',sans-serif; font-weight:700; font-size:16px; color:#f0ede8; margin-bottom:20px; }
        .ap-section { margin-bottom:20px; }
        .ap-label { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:2px; color:#2a2a2a; text-transform:uppercase; margin-bottom:6px; }
        .ap-text { font-family:'DM Mono',monospace; font-size:12px; color:#555; line-height:1.6; }
        .ap-tag { display:inline-block; background:#c8f04e0a; border:1px solid #c8f04e25; color:#c8f04e; font-family:'DM Mono',monospace; font-size:10px; padding:3px 10px; border-radius:100px; margin-top:4px; }

        .insights-btn { background:#0f0f0f; border:1px solid #1e1e1e; color:#555; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:1px; padding:6px 14px; border-radius:6px; cursor:pointer; transition:all .15s; white-space:nowrap; }
        .insights-btn:hover { border-color:#c8f04e40; color:#c8f04e; }
        .edit-btn { background:#0f0f0f; border:1px solid #1e1e1e; color:#555; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:1px; padding:6px 14px; border-radius:6px; cursor:pointer; transition:all .15s; white-space:nowrap; }
        .edit-btn:hover { border-color:#a78bfa50; color:#a78bfa; }
        .edit-btn.active { border-color:#a78bfa50; color:#a78bfa; background:#a78bfa08; }

        .edit-panel { position:fixed; top:48px; left:0; width:340px; height:calc(100vh - 48px); background:#0a0a0a; border-right:1px solid #161616; z-index:50; overflow-y:auto; display:flex; flex-direction:column; }
        .ep-header { padding:20px 20px 0; flex-shrink:0; }
        .ep-title { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#f0ede8; margin-bottom:4px; }
        .ep-sub { font-family:'DM Mono',monospace; font-size:10px; color:#333; margin-bottom:16px; }
        .ep-body { flex:1; overflow-y:auto; padding:0 20px 20px; }
        .ep-section { margin-bottom:24px; }
        .ep-section-title { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:2px; color:#2a2a2a; text-transform:uppercase; margin-bottom:10px; padding-bottom:6px; border-bottom:1px solid #131313; }
        .ep-field { margin-bottom:12px; }
        .ep-label { font-family:'DM Mono',monospace; font-size:10px; color:#383838; margin-bottom:5px; display:block; }
        .ep-input { width:100%; background:#0e0e0e; border:1px solid #191919; color:#d0cdc8; font-family:'DM Mono',monospace; font-size:12px; padding:8px 10px; border-radius:6px; outline:none; transition:border-color .15s; resize:vertical; line-height:1.5; }
        .ep-input:focus { border-color:#a78bfa50; }
        .ep-input::placeholder { color:#222; }
        .ep-footer { padding:16px 20px; border-top:1px solid #131313; flex-shrink:0; display:flex; gap:8px; }
        .ep-apply { flex:1; background:#a78bfa; color:#080808; font-family:'Syne',sans-serif; font-weight:700; font-size:12px; padding:10px; border-radius:8px; border:none; cursor:pointer; transition:all .15s; }
        .ep-apply:hover:not(:disabled) { background:#b89dff; }
        .ep-apply:disabled { opacity:0.5; cursor:not-allowed; }
        .ep-reset { background:transparent; color:#333; font-family:'DM Mono',monospace; font-size:10px; padding:10px 14px; border-radius:8px; border:1px solid #191919; cursor:pointer; transition:all .15s; white-space:nowrap; }
        .ep-reset:hover { color:#666; border-color:#2a2a2a; }
        .pub-btn { background:linear-gradient(135deg,#c8f04e,#a8d43e); border:none; color:#080808; font-family:'Syne',sans-serif; font-weight:700; font-size:11px; padding:6px 18px; border-radius:6px; cursor:pointer; transition:all .2s; white-space:nowrap; display:flex; align-items:center; gap:6px; }
        .pub-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 20px #c8f04e35; }
        .pub-btn:disabled { opacity:0.5; cursor:not-allowed; }
        .url-modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:100; background:#0e0e0e; border:1px solid #c8f04e40; border-radius:16px; padding:32px; width:440px; max-width:90vw; box-shadow:0 24px 80px #000; }
        .url-backdrop { position:fixed; inset:0; background:#00000090; z-index:99; backdrop-filter:blur(4px); }
        .url-modal-title { font-family:'Syne',sans-serif; font-weight:800; font-size:18px; color:#f0ede8; margin-bottom:6px; }
        .url-modal-sub { font-family:'DM Mono',monospace; font-size:11px; color:#444; margin-bottom:20px; }
        .url-box { display:flex; gap:8px; align-items:center; background:#080808; border:1px solid #1e1e1e; border-radius:8px; padding:10px 14px; margin-bottom:16px; }
        .url-text { font-family:'DM Mono',monospace; font-size:12px; color:#c8f04e; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .copy-btn { background:#1a1a1a; border:1px solid #2a2a2a; color:#888; font-family:'DM Mono',monospace; font-size:10px; padding:4px 12px; border-radius:4px; cursor:pointer; flex-shrink:0; transition:all .15s; }
        .copy-btn:hover { border-color:#444; color:#f0ede8; }
        .open-btn { display:block; width:100%; background:#c8f04e; color:#080808; font-family:'Syne',sans-serif; font-weight:700; font-size:14px; padding:12px; border-radius:8px; border:none; cursor:pointer; text-decoration:none; text-align:center; margin-bottom:10px; transition:all .15s; }
        .open-btn:hover { background:#d9ff62; }
        .close-url-btn { display:block; width:100%; background:transparent; color:#333; font-family:'DM Mono',monospace; font-size:11px; padding:8px; border-radius:8px; border:1px solid #1a1a1a; cursor:pointer; transition:all .15s; }
        .close-url-btn:hover { color:#666; border-color:#2a2a2a; }
        .pub-err { font-family:'DM Mono',monospace; font-size:11px; color:#ff6b6b; background:#ff6b6b08; border:1px solid #ff6b6b20; padding:8px 12px; border-radius:6px; margin-top:6px; }
      `}</style>

      <div className="toolbar">
        <div className="tb-left">
          <div className="live-dot" />
          <span className="startup-name">{startupName || "Your Startup"}</span>
        </div>
        <div className="tb-right">
          {analysis && (
            <button className="insights-btn" onClick={() => setShowAnalysis(!showAnalysis)}>
              🔍 Market Intel
            </button>
          )}
          {content && (
            <button className={`edit-btn ${showEditor ? "active" : ""}`} onClick={() => setShowEditor(!showEditor)}>
              ✏️ Edit
            </button>
          )}
          <button className="tb-btn" onClick={() => { setGeneratedHtml(""); setProblem(""); setPhase("input"); setAnalysis(null); setPublishedUrl(""); }}>
            ← New Problem
          </button>
          <button className="dl-btn" onClick={() => {
            const a = document.createElement("a");
            a.href = "data:text/html;charset=utf-8," + encodeURIComponent(generatedHtml);
            a.download = `${startupName || "startup"}-site.html`;
            a.click();
          }}>
            ↓ Download
          </button>
          <button className="pub-btn" onClick={publish} disabled={publishing}>
            {publishing ? <>⏳ Publishing…</> : <>🚀 Publish</>}
          </button>
        </div>
      </div>

      {publishError && (
        <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", zIndex:200 }}>
          <div className="pub-err">⚠ {publishError}</div>
        </div>
      )}

      {publishedUrl && (
        <>
          <div className="url-backdrop" onClick={() => setPublishedUrl("")} />
          <div className="url-modal">
            <div className="url-modal-title">🎉 Your site is live!</div>
            <div className="url-modal-sub">Share this link with anyone — it's live on the internet.</div>
            <div className="url-box">
              <span className="url-text">{publishedUrl}</span>
              <button className="copy-btn" onClick={() => navigator.clipboard.writeText(publishedUrl)}>Copy</button>
            </div>
            <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="open-btn">Open Site →</a>
            <button className="close-url-btn" onClick={() => setPublishedUrl("")}>Close</button>
          </div>
        </>
      )}

      {analysis && showAnalysis && (
        <div className="analysis-panel">
          <button className="ap-close" onClick={() => setShowAnalysis(false)}>✕</button>
          <div className="ap-heading">Market Intelligence</div>
          <div className="ap-section">
            <div className="ap-label">Core Pain</div>
            <div className="ap-text">{analysis.corePain}</div>
          </div>
          <div className="ap-section">
            <div className="ap-label">Target Persona</div>
            <div className="ap-text">{analysis.targetPersona}</div>
          </div>
          <div className="ap-section">
            <div className="ap-label">Existing Gap</div>
                        <div className="ap-text">{analysis.existingGap}</div>
          </div>
          <div className="ap-section">
            <div className="ap-label">Opportunity Angle</div>
            <div className="ap-text">{analysis.opportunityAngle}</div>
          </div>
          <div className="ap-section">
            <div className="ap-label">Emotional Hook</div>
            <div className="ap-text">{analysis.emotionalHook}</div>
          </div>
          <div className="ap-section">
            <div className="ap-label">Market Size</div>
            <div className="ap-tag">{analysis.marketSize}</div>
          </div>
        </div>
      )}

      {showEditor && content && <EditPanel content={content} onApply={rebuild} rebuilding={rebuilding} onClose={() => setShowEditor(false)} />}

      <iframe
        ref={iframeRef}
        style={{ flex: 1, border: "none", width: showEditor ? "calc(100% - 340px)" : "100%", marginLeft: showEditor ? 340 : 0, display: "block", transition: "all .3s" }}
        title="Generated Startup Website"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </main>
  );
}
