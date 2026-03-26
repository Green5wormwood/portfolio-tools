import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

const styles = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0e0e0e; }

  .app {
    font-family: 'DM Sans', sans-serif;
    background: #0e0e0e;
    color: #e8e2d9;
    min-height: 100vh;
  }

  .input-screen {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 32px 80px;
  }
  .input-header { margin-bottom: 48px; }
  .input-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.6rem;
    font-weight: 400;
    color: #e8e2d9;
    line-height: 1.15;
    margin-bottom: 12px;
  }
  .input-header h1 em { font-style: italic; color: #7eb8a4; }
  .input-header p { font-size: 0.88rem; color: #7a7570; font-weight: 300; line-height: 1.6; }
  .back-btn {
    background: none; border: none; color: #5a5550;
    cursor: pointer; font-size: 0.8rem; margin-bottom: 24px;
    display: block; padding: 0; font-family: 'DM Sans', sans-serif;
  }

  .api-row { margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid #1a1a1a; }
  .field { display: flex; flex-direction: column; gap: 8px; flex: 1; }
  .field label {
    font-size: 0.68rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: #5a5550; font-weight: 500;
  }
  .field input, .field textarea, .field select {
    background: #141414; border: 1px solid #222;
    color: #e8e2d9; padding: 12px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem;
    border-radius: 3px; outline: none; transition: border-color 0.2s; width: 100%;
  }
  .field input:focus, .field textarea:focus, .field select:focus { border-color: #7eb8a4; }
  .field textarea { resize: vertical; line-height: 1.65; }
  .field select option { background: #141414; }

  .context-row { display: flex; gap: 16px; margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid #1a1a1a; }

  .benefits-section { margin-bottom: 32px; }
  .benefits-section > .section-label {
    font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: #5a5550; font-weight: 500; margin-bottom: 16px; display: block;
  }

  .benefit-card {
    background: #111; border: 1px solid #1e1e1e;
    border-radius: 4px; padding: 20px; margin-bottom: 12px;
  }
  .benefit-card-header {
    display: flex; gap: 12px; align-items: center; margin-bottom: 14px;
  }
  .benefit-number {
    width: 24px; height: 24px; border-radius: 50%;
    background: #1e2e28; border: 1px solid #7eb8a4;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; color: #7eb8a4; font-weight: 500; flex-shrink: 0;
  }
  .benefit-card-header input {
    background: transparent; border: none; border-bottom: 1px solid #2a2a2a;
    color: #e8e2d9; padding: 4px 0; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 500; outline: none; flex: 1;
    transition: border-color 0.2s;
  }
  .benefit-card-header input:focus { border-bottom-color: #7eb8a4; }
  .benefit-card-header input::placeholder { color: #3a3530; }
  .benefit-meta-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 12px; }
  .benefit-text-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .benefit-text-row textarea { height: 80px; font-size: 0.82rem; }

  .add-benefit-btn {
    background: transparent; border: 1px dashed #2a2a2a; color: #4a4540;
    padding: 10px 20px; font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
    cursor: pointer; border-radius: 3px; width: 100%; transition: all 0.2s; margin-top: 4px;
  }
  .add-benefit-btn:hover { border-color: #7eb8a4; color: #7eb8a4; }

  .generate-btn {
    display: flex; align-items: center; gap: 10px;
    background: #7eb8a4; color: #0e0e0e; border: none;
    padding: 15px 32px; font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem; font-weight: 500; letter-spacing: 0.04em;
    cursor: pointer; border-radius: 3px; transition: background 0.2s, transform 0.1s;
  }
  .generate-btn:hover { background: #9ecfbc; }
  .generate-btn:active { transform: scale(0.98); }
  .generate-btn:disabled { background: #1e2e28; color: #3a5a50; cursor: not-allowed; transform: none; }

  .error-msg {
    margin-top: 14px; padding: 12px 16px; background: #2a1515;
    border: 1px solid #4a2020; border-radius: 3px; font-size: 0.8rem; color: #c07070;
  }
  .no-storage-notice {
    display: flex; align-items: center; gap: 8px; font-size: 0.72rem;
    color: #3a3530; margin-top: 16px; padding: 10px 14px;
    border: 1px solid #1a1a1a; border-radius: 3px;
  }
  .no-storage-notice span { color: #7eb8a4; }

  .loading-overlay {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; min-height: 70vh; gap: 18px;
  }
  .loading-overlay p { font-size: 0.82rem; color: #4a4540; letter-spacing: 0.06em; }
  .spinner {
    width: 32px; height: 32px; border: 2px solid #1e2e28;
    border-top-color: #7eb8a4; border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* OUTPUT */
  .output-screen { max-width: 1100px; margin: 0 auto; padding: 48px 32px 80px; }
  .output-topbar {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 36px; padding-bottom: 28px; border-bottom: 1px solid #1a1a1a;
  }
  .output-title h1 {
    font-family: 'Playfair Display', serif; font-size: 1.8rem;
    font-weight: 400; color: #e8e2d9; margin-bottom: 4px;
  }
  .output-title h1 em { font-style: italic; color: #7eb8a4; }
  .output-title p { font-size: 0.78rem; color: #5a5550; font-weight: 300; }
  .output-meta { text-align: right; font-size: 0.68rem; color: #3a3530; letter-spacing: 0.08em; text-transform: uppercase; line-height: 2.2; }
  .reset-btn {
    display: block; margin-top: 6px; background: transparent;
    border: 1px solid #222; color: #5a5550; padding: 7px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 0.72rem;
    cursor: pointer; border-radius: 3px; transition: all 0.2s;
  }
  .reset-btn:hover { border-color: #7eb8a4; color: #7eb8a4; }

  /* SUMMARY STRIP */
  .summary-strip {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1px; background: #1a1a1a; border: 1px solid #1a1a1a;
    border-radius: 4px; overflow: hidden; margin-bottom: 32px;
  }
  .strip-cell { background: #111; padding: 20px 22px; }
  .strip-label { font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: #4a4540; margin-bottom: 8px; font-weight: 500; }
  .strip-value { font-size: 1.6rem; font-family: 'Playfair Display', serif; color: #e8e2d9; font-weight: 400; }
  .strip-value.green { color: #7eb8a4; }
  .strip-value.amber { color: #c9a84c; }
  .strip-value.red { color: #c07070; }
  .strip-sub { font-size: 0.75rem; color: #4a4540; margin-top: 4px; font-weight: 300; }

  /* BENEFIT CARDS */
  .benefits-grid { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
  .benefit-result-card {
    border: 1px solid #1e1e1e; border-radius: 4px; overflow: hidden;
  }
  .benefit-result-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; background: #111; border-bottom: 1px solid #1a1a1a;
  }
  .benefit-result-left { display: flex; align-items: center; gap: 12px; }
  .rag-dot {
    width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
  }
  .rag-green { background: #7eb8a4; box-shadow: 0 0 6px #7eb8a430; }
  .rag-amber { background: #c9a84c; box-shadow: 0 0 6px #c9a84c30; }
  .rag-red { background: #c07070; box-shadow: 0 0 6px #c0707030; }
  .benefit-result-name {
    font-family: 'Playfair Display', serif; font-size: 1rem;
    font-weight: 400; color: #e8e2d9;
  }
  .benefit-result-owner { font-size: 0.72rem; color: #5a5550; margin-left: 4px; }
  .benefit-result-right { display: flex; align-items: center; gap: 16px; }
  .realisation-pct {
    font-size: 1.1rem; font-family: 'Playfair Display', serif;
    font-weight: 400;
  }
  .pct-green { color: #7eb8a4; }
  .pct-amber { color: #c9a84c; }
  .pct-red { color: #c07070; }
  .deadline-chip {
    font-size: 0.68rem; color: #4a4540; letter-spacing: 0.06em;
    text-transform: uppercase; padding: 3px 8px;
    border: 1px solid #2a2a2a; border-radius: 2px;
  }

  .benefit-result-body {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 1px; background: #1a1a1a;
  }
  .benefit-body-cell { background: #0e0e0e; padding: 16px 18px; }
  .body-cell-label {
    font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: #3a3530; font-weight: 500; margin-bottom: 8px;
  }
  .body-cell-value { font-size: 0.82rem; line-height: 1.6; color: #9a9490; font-weight: 300; }
  .body-cell-value.highlight { color: #7eb8a4; }
  .body-cell-value.warn { color: #c9a84c; }
  .body-cell-value.risk { color: #c07070; }

  .gap-label {
    display: inline-block; font-size: 0.62rem; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 2px 7px; border-radius: 2px;
    font-weight: 500; margin-top: 6px;
  }
  .gap-on-track { background: #0e1e18; color: #7eb8a4; }
  .gap-at-risk { background: #1e1a10; color: #c9a84c; }
  .gap-off-track { background: #2a1515; color: #c07070; }

  /* EXECUTIVE SUMMARY */
  .exec-summary {
    border: 1px solid #1e1e1e; border-radius: 4px; overflow: hidden; margin-top: 12px;
  }
  .exec-header {
    background: #111; padding: 16px 22px; border-bottom: 1px solid #1a1a1a;
    font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: #4a4540; font-weight: 500;
  }
  .exec-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #1a1a1a; }
  .exec-panel { background: #0e0e0e; padding: 24px 22px; }
  .exec-panel h4 {
    font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: #7eb8a4; margin-bottom: 12px; font-weight: 500;
  }
  .exec-panel ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .exec-panel ul li {
    font-size: 0.81rem; line-height: 1.6; color: #7a7570;
    font-weight: 300; padding-left: 14px; position: relative;
  }
  .exec-panel ul li::before { content: "→"; position: absolute; left: 0; color: #3a3530; font-size: 0.75rem; }
  .exec-panel.reco { background: #0e1410; }
  .exec-panel.reco p {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 0.88rem; color: #8a9490; line-height: 1.7;
  }
`;

const SYSTEM_PROMPT = `You are an expert benefits realisation analyst preparing an executive-level snapshot report.

For each benefit provided, analyse the expected outcome against the current state and produce a structured assessment.

Return ONLY valid JSON, no markdown, no explanation:

{
  "initiativeName": "Name of the overall initiative or programme",
  "snapshotDate": "Today's date approximation",
  "overallRAG": "green | amber | red",
  "overallRealisationPct": 72,
  "onTrackCount": 3,
  "atRiskCount": 2,
  "offTrackCount": 1,
  "benefits": [
    {
      "name": "Benefit name",
      "owner": "Owner name",
      "deadline": "Deadline as provided",
      "category": "Category as provided",
      "rag": "green | amber | red",
      "realisationPct": 75,
      "extractedTarget": "The specific measurable target extracted from expected benefit description",
      "extractedActual": "The current state extracted and interpreted from current state description",
      "gap": "Clear one-sentence description of the gap between expected and actual",
      "gapStatus": "on-track | at-risk | off-track",
      "recommendation": "One sentence on what needs to happen next"
    }
  ],
  "executiveSummary": {
    "achievements": ["What is working or on track — specific"],
    "risks": ["What is at risk or off track — specific"],
    "recommendation": "2-3 sentence executive recommendation — what leadership needs to decide or act on"
  }
}

RAG logic:
- Green: on track, 75%+ realisation or ahead of schedule
- Amber: partially realised, at risk, 40-74% realisation or behind schedule
- Red: not realised, blocked, or significantly off track, below 40%

Be precise and clinical. This is for management. Avoid vague language.`;

const emptyBenefit = () => ({
  name: "", owner: "", deadline: "", category: "",
  expectedBenefit: "", currentState: ""
});

const CATEGORIES = ["Cost Reduction", "Time Saving", "Quality Improvement", "Risk Reduction", "Revenue Growth", "Compliance", "Customer Satisfaction", "Employee Experience", "Other"];

const RAG_CLASSES = { green: "rag-green", amber: "rag-amber", red: "rag-red" };
const PCT_CLASSES = { green: "pct-green", amber: "pct-amber", red: "pct-red" };
const GAP_CLASSES = { "on-track": "gap-on-track", "at-risk": "gap-at-risk", "off-track": "gap-off-track" };
const GAP_LABELS = { "on-track": "On Track", "at-risk": "At Risk", "off-track": "Off Track" };

export default function App() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("input");
  const [apiKey, setApiKey] = useState("");
  const [initiativeName, setInitiativeName] = useState("");
  const [initiativeContext, setInitiativeContext] = useState("");
  const [benefits, setBenefits] = useState([emptyBenefit(), emptyBenefit(), emptyBenefit()]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const updateBenefit = (i, field, val) => {
    setBenefits(benefits.map((b, idx) => idx === i ? { ...b, [field]: val } : b));
  };

  const addBenefit = () => { if (benefits.length < 8) setBenefits([...benefits, emptyBenefit()]); };
  const removeBenefit = (i) => { if (benefits.length > 2) setBenefits(benefits.filter((_, idx) => idx !== i)); };

  const generate = async () => {
    if (!apiKey.trim()) { setError("Please enter your Anthropic API key."); return; }
    const filled = benefits.filter(b => b.name.trim() && b.expectedBenefit.trim());
    if (filled.length < 1) { setError("Please fill in at least one benefit with a name and expected outcome."); return; }
    setError("");
    setScreen("loading");

    const userContent = `Initiative: ${initiativeName || "Unnamed Initiative"}
Context: ${initiativeContext || "None provided"}

Benefits to assess:
${filled.map((b, i) => `
Benefit ${i+1}: ${b.name}
Owner: ${b.owner || "Not specified"}
Deadline: ${b.deadline || "Not specified"}
Category: ${b.category || "Not specified"}
Expected benefit: ${b.expectedBenefit}
Current state: ${b.currentState || "Not provided — assess as unknown/early stage"}
`).join("\n")}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey.trim(),
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userContent }]
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const raw = data.content?.find(b => b.type === "text")?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setScreen("output");
    } catch (e) {
      setScreen("input");
      setError("Something went wrong: " + (e.message || "Check your input and try again."));
    }
  };

  const ragColor = r => r === "green" ? "#7eb8a4" : r === "amber" ? "#c9a84c" : "#c07070";

  return (
    <div className="app">
      <style>{styles}</style>

      {screen === "input" && (
        <div className="input-screen">
          <div className="input-header">
            <button className="back-btn" onClick={() => navigate("/")}>← Back to Tools</button>
            <h1>Benefits<br /><em>Realisation</em></h1>
            <p>Define your expected benefits and current state. The AI generates a RAG-rated snapshot with gap analysis and an executive summary — no data stored, session only.</p>
          </div>

          <div className="api-row">
            <div className="field">
              <label>Anthropic API Key</label>
              <input type="password" placeholder="sk-ant-..." value={apiKey} onChange={e => setApiKey(e.target.value)} />
            </div>
          </div>

          <div className="context-row">
            <div className="field">
              <label>Initiative / Programme Name</label>
              <input placeholder="e.g. Zero Touch Automation Programme" value={initiativeName} onChange={e => setInitiativeName(e.target.value)} />
            </div>
            <div className="field">
              <label>Context (optional)</label>
              <input placeholder="e.g. Q1 2026 review, Finance Digital" value={initiativeContext} onChange={e => setInitiativeContext(e.target.value)} />
            </div>
          </div>

          <div className="benefits-section">
            <span className="section-label">Benefits</span>
            {benefits.map((b, i) => (
              <div className="benefit-card" key={i}>
                <div className="benefit-card-header">
                  <div className="benefit-number">{i + 1}</div>
                  <input
                    placeholder={`Benefit name (e.g. Reduce manual processing time)`}
                    value={b.name}
                    onChange={e => updateBenefit(i, "name", e.target.value)}
                  />
                  {benefits.length > 2 && (
                    <button onClick={() => removeBenefit(i)} style={{ background: "none", border: "none", color: "#3a3530", cursor: "pointer", fontSize: "1rem", padding: "0 4px" }}>×</button>
                  )}
                </div>
                <div className="benefit-meta-row">
                  <div className="field">
                    <label>Owner</label>
                    <input placeholder="Name or role" value={b.owner} onChange={e => updateBenefit(i, "owner", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Deadline</label>
                    <input placeholder="e.g. Q2 2026" value={b.deadline} onChange={e => updateBenefit(i, "deadline", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Category</label>
                    <select value={b.category} onChange={e => updateBenefit(i, "category", e.target.value)}>
                      <option value="">Select...</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="benefit-text-row">
                  <div className="field">
                    <label>Expected Benefit</label>
                    <textarea
                      placeholder="Describe the expected outcome, target, or metric. e.g. Reduce manual reconciliation from 3 days to same-day, saving 2 FTE."
                      value={b.expectedBenefit}
                      onChange={e => updateBenefit(i, "expectedBenefit", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Current State</label>
                    <textarea
                      placeholder="Describe where things stand today. e.g. Reconciliation now takes 1.5 days, 1 FTE reassigned, tool partially deployed."
                      value={b.currentState}
                      onChange={e => updateBenefit(i, "currentState", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {benefits.length < 8 && (
              <button className="add-benefit-btn" onClick={addBenefit}>+ Add another benefit</button>
            )}
          </div>

          <button className="generate-btn" onClick={generate} disabled={!apiKey.trim() || !benefits.some(b => b.name.trim() && b.expectedBenefit.trim())}>
            <span>Generate Snapshot</span>
            <span>→</span>
          </button>

          <div className="no-storage-notice">
            <span>◉</span>
            No data stored. Session only — everything clears when you close this tab.
          </div>

          {error && <div className="error-msg">{error}</div>}
        </div>
      )}

      {screen === "loading" && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Analysing benefits realisation...</p>
        </div>
      )}

      {screen === "output" && result && (
        <div className="output-screen">
          <div className="output-topbar">
            <div className="output-title">
              <h1><em>{result.initiativeName || initiativeName || "Initiative"}</em> — Benefits Snapshot</h1>
              <p>{result.snapshotDate} · {result.benefits?.length} benefits assessed</p>
            </div>
            <div className="output-meta">
              <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ragColor(result.overallRAG) }} />
                <span style={{ color: ragColor(result.overallRAG), textTransform: "uppercase" }}>{result.overallRAG} overall</span>
              </div>
              <button className="reset-btn" onClick={() => navigate("/")}>← All Tools</button>
              <button className="reset-btn" onClick={() => setScreen("input")}>← Edit Input</button>
            </div>
          </div>

          {/* SUMMARY STRIP */}
          <div className="summary-strip">
            <div className="strip-cell">
              <div className="strip-label">Overall Realisation</div>
              <div className={`strip-value ${result.overallRAG}`}>{result.overallRealisationPct}%</div>
              <div className="strip-sub">across all benefits</div>
            </div>
            <div className="strip-cell">
              <div className="strip-label">On Track</div>
              <div className="strip-value green">{result.onTrackCount}</div>
              <div className="strip-sub">benefits</div>
            </div>
            <div className="strip-cell">
              <div className="strip-label">At Risk</div>
              <div className="strip-value amber">{result.atRiskCount}</div>
              <div className="strip-sub">benefits</div>
            </div>
            <div className="strip-cell">
              <div className="strip-label">Off Track</div>
              <div className="strip-value red">{result.offTrackCount}</div>
              <div className="strip-sub">benefits</div>
            </div>
          </div>

          {/* BENEFIT CARDS */}
          <div className="benefits-grid">
            {result.benefits?.map((b, i) => (
              <div className="benefit-result-card" key={i}>
                <div className="benefit-result-header">
                  <div className="benefit-result-left">
                    <div className={`rag-dot ${RAG_CLASSES[b.rag]}`} />
                    <span className="benefit-result-name">{b.name}</span>
                    {b.owner && <span className="benefit-result-owner">· {b.owner}</span>}
                  </div>
                  <div className="benefit-result-right">
                    <span className={`realisation-pct ${PCT_CLASSES[b.rag]}`}>{b.realisationPct}%</span>
                    {b.deadline && <span className="deadline-chip">{b.deadline}</span>}
                    {b.category && <span className="deadline-chip">{b.category}</span>}
                  </div>
                </div>
                <div className="benefit-result-body">
                  <div className="benefit-body-cell">
                    <div className="body-cell-label">Expected</div>
                    <div className="body-cell-value">{b.extractedTarget}</div>
                  </div>
                  <div className="benefit-body-cell">
                    <div className="body-cell-label">Current State</div>
                    <div className={`body-cell-value ${b.rag === "green" ? "highlight" : b.rag === "amber" ? "warn" : "risk"}`}>{b.extractedActual}</div>
                  </div>
                  <div className="benefit-body-cell">
                    <div className="body-cell-label">Gap & Next Step</div>
                    <div className="body-cell-value">{b.gap}</div>
                    <span className={`gap-label ${GAP_CLASSES[b.gapStatus]}`}>{GAP_LABELS[b.gapStatus]}</span>
                    <div style={{ marginTop: 8, fontSize: "0.78rem", color: "#5a5550", fontStyle: "italic", lineHeight: 1.5 }}>{b.recommendation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EXECUTIVE SUMMARY */}
          <div className="exec-summary">
            <div className="exec-header">Executive Summary</div>
            <div className="exec-grid">
              <div className="exec-panel">
                <h4>Achievements</h4>
                <ul>{result.executiveSummary?.achievements?.map((a, i) => <li key={i}>{a}</li>)}</ul>
              </div>
              <div className="exec-panel">
                <h4>Risks & Issues</h4>
                <ul>{result.executiveSummary?.risks?.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
              <div className="exec-panel reco">
                <h4>Recommendation</h4>
                <p>{result.executiveSummary?.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}