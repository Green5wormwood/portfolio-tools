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
    max-width: 760px;
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
  .input-header h1 em { font-style: italic; color: #c9a84c; }
  .input-header p {
    font-size: 0.88rem;
    color: #7a7570;
    font-weight: 300;
    line-height: 1.6;
  }
  .back-btn {
    background: none; border: none; color: #5a5550;
    cursor: pointer; font-size: 0.8rem; margin-bottom: 24px;
    display: block; padding: 0; font-family: 'DM Sans', sans-serif;
  }
  .field-group { display: flex; gap: 16px; margin-bottom: 20px; }
  .field { display: flex; flex-direction: column; gap: 8px; flex: 1; }
  .field label {
    font-size: 0.68rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: #5a5550; font-weight: 500;
  }
  .field input, .field textarea {
    background: #141414; border: 1px solid #222;
    color: #e8e2d9; padding: 12px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem;
    border-radius: 3px; outline: none; transition: border-color 0.2s; width: 100%;
  }
  .field input:focus, .field textarea:focus { border-color: #c9a84c; }
  .notes-field { margin-bottom: 28px; }
  .notes-field label {
    display: block; font-size: 0.68rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: #5a5550; font-weight: 500; margin-bottom: 8px;
  }
  .notes-field textarea {
    width: 100%; height: 340px; background: #141414;
    border: 1px solid #222; color: #e8e2d9; padding: 16px;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem;
    line-height: 1.7; border-radius: 3px; resize: vertical; outline: none;
    transition: border-color 0.2s;
  }
  .notes-field textarea:focus { border-color: #c9a84c; }
  .notes-field .hint { margin-top: 8px; font-size: 0.75rem; color: #3a3530; font-style: italic; }
  .generate-btn {
    display: flex; align-items: center; gap: 10px;
    background: #c9a84c; color: #0e0e0e; border: none;
    padding: 15px 32px; font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem; font-weight: 500; letter-spacing: 0.04em;
    cursor: pointer; border-radius: 3px; transition: background 0.2s, transform 0.1s;
  }
  .generate-btn:hover { background: #debb6a; }
  .generate-btn:active { transform: scale(0.98); }
  .generate-btn:disabled { background: #2a2010; color: #6a5530; cursor: not-allowed; transform: none; }
  .error-msg {
    margin-top: 14px; padding: 12px 16px; background: #2a1515;
    border: 1px solid #4a2020; border-radius: 3px; font-size: 0.8rem; color: #c07070;
  }
  .no-storage-notice {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.72rem; color: #3a3530; margin-top: 16px;
    padding: 10px 14px; border: 1px solid #1a1a1a; border-radius: 3px;
  }
  .no-storage-notice span { color: #c9a84c; font-size: 0.8rem; }

  .loading-overlay {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; min-height: 70vh; gap: 18px;
  }
  .loading-overlay p { font-size: 0.82rem; color: #4a4540; letter-spacing: 0.06em; }
  .spinner {
    width: 32px; height: 32px; border: 2px solid #2a2010;
    border-top-color: #c9a84c; border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .map-screen { max-width: 1200px; margin: 0 auto; padding: 48px 32px 80px; }
  .map-topbar {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 32px; padding-bottom: 28px; border-bottom: 1px solid #1a1a1a;
  }
  .map-title h1 {
    font-family: 'Playfair Display', serif; font-size: 1.8rem;
    font-weight: 400; color: #e8e2d9; margin-bottom: 4px;
  }
  .map-title h1 em { font-style: italic; color: #c9a84c; }
  .map-title p { font-size: 0.78rem; color: #5a5550; font-weight: 300; }
  .map-meta { text-align: right; font-size: 0.68rem; color: #3a3530; letter-spacing: 0.08em; text-transform: uppercase; line-height: 2.2; }
  .reset-btn {
    display: block; margin-top: 6px; background: transparent;
    border: 1px solid #222; color: #5a5550; padding: 7px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 0.72rem;
    cursor: pointer; border-radius: 3px; transition: all 0.2s;
  }
  .reset-btn:hover { border-color: #c9a84c; color: #c9a84c; }

  .tabs-bar {
    display: flex; margin-bottom: 28px;
    border-bottom: 1px solid #1a1a1a; overflow-x: auto;
  }
  .tab-btn {
    background: none; border: none; border-bottom: 2px solid transparent;
    color: #4a4540; padding: 12px 20px; font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem; cursor: pointer; transition: all 0.2s;
    white-space: nowrap; letter-spacing: 0.04em; margin-bottom: -1px;
  }
  .tab-btn:hover { color: #9a9490; }
  .tab-btn.active { color: #c9a84c; border-bottom-color: #c9a84c; }

  .map-outer { border: 1px solid #1e1e1e; border-radius: 4px; overflow: hidden; }

  .persona-bar {
    background: #111; padding: 20px 24px; border-bottom: 1px solid #1a1a1a;
    display: flex; align-items: flex-start; justify-content: space-between;
  }
  .persona-name {
    font-family: 'Playfair Display', serif; font-size: 1.3rem;
    font-weight: 400; color: #e8e2d9; margin-bottom: 4px;
  }
  .persona-role {
    font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: #c9a84c; margin-bottom: 10px;
  }
  .persona-quote-label {
    font-size: 0.62rem; color: #3a3530; letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 4px;
  }
  .persona-quote {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 0.95rem; color: #7a7570; max-width: 520px; line-height: 1.5;
  }
  .inferred-badge {
    display: inline-block; font-size: 0.58rem; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 2px 6px; border-radius: 2px;
    background: #1a1a10; color: #6a6530; border: 1px solid #2a2a10;
    margin-left: 6px; vertical-align: middle; font-style: normal;
  }
  .aggregate-label {
    font-size: 0.62rem; color: #3a3530; letter-spacing: 0.1em; text-transform: uppercase;
  }

  .stage-header-row { display: grid; border-bottom: 1px solid #1e1e1e; }
  .stage-name-cell {
    padding: 12px 16px; font-size: 0.7rem; letter-spacing: 0.08em;
    text-transform: uppercase; font-weight: 500; color: #c9a84c;
    border-right: 1px solid #1a1a1a; background: #111;
  }
  .stage-name-cell:last-child { border-right: none; }
  .row-label-col {
    width: 100px; min-width: 100px; padding: 14px;
    font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: #3a3530; font-weight: 500; border-right: 1px solid #1a1a1a;
    background: #0e0e0e; display: flex; align-items: flex-start; padding-top: 16px;
  }
  .data-row { display: flex; border-bottom: 1px solid #1a1a1a; min-height: 70px; }
  .data-row:last-child { border-bottom: none; }
  .data-cell {
    flex: 1; padding: 14px 16px; border-right: 1px solid #1a1a1a;
    font-size: 0.8rem; line-height: 1.6; color: #9a9490; font-weight: 300;
  }
  .data-cell:last-child { border-right: none; }
  .data-cell ul { list-style: none; display: flex; flex-direction: column; gap: 4px; }
  .data-cell ul li::before { content: "·  "; color: #3a3530; }
  .thought {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 0.8rem; color: #7a7570; line-height: 1.5; margin-bottom: 5px;
  }

  .emotion-row { display: flex; min-height: 100px; align-items: stretch; }
  .emotion-chart { flex: 1; padding: 14px 16px; display: flex; align-items: center; }
  .emotion-svg { width: 100%; height: 70px; }

  .bottom-section {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; background: #1a1a1a; margin-top: 1px; border-top: 1px solid #1a1a1a;
  }
  .bottom-panel { background: #0e0e0e; padding: 24px 22px; }
  .bottom-panel h3 {
    font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: #3a3530; margin-bottom: 16px; font-weight: 500;
  }
  .pain-item { margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid #1a1a1a; }
  .pain-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  .pain-item p { font-size: 0.8rem; line-height: 1.6; color: #9a9490; font-weight: 300; margin-bottom: 5px; }
  .severity-badge {
    display: inline-block; font-size: 0.6rem; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 2px 7px; border-radius: 2px; font-weight: 500;
  }
  .severity-high { background: #2a1515; color: #c07070; }
  .severity-medium { background: #1a1e10; color: #8aaa60; }
  .severity-low { background: #1a1820; color: #7080a0; }
  .opportunity-item {
    margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #1a1a1a;
    display: flex; gap: 10px; align-items: flex-start;
  }
  .opportunity-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  .opp-arrow { color: #c9a84c; font-size: 0.75rem; margin-top: 2px; flex-shrink: 0; }
  .opportunity-item p { font-size: 0.8rem; line-height: 1.6; color: #9a9490; font-weight: 300; }

  .group-section {
    background: #111; border-top: 1px solid #1a1a1a; padding: 24px;
  }
  .group-section h3 {
    font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: #3a3530; margin-bottom: 16px; font-weight: 500;
  }
  .group-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #1a1a1a; }
  .group-panel { background: #0e0e0e; padding: 20px; }
  .group-panel h4 {
    font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: #c9a84c; margin-bottom: 12px; font-weight: 500;
  }
  .group-panel ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .group-panel ul li {
    font-size: 0.8rem; line-height: 1.6; color: #7a7570;
    font-weight: 300; padding-left: 14px; position: relative;
  }
  .group-panel ul li::before { content: "·"; position: absolute; left: 0; color: "#3a3530"; }

  .summary-section {
    margin-top: 1px; background: #111; border-top: 1px solid #1a1a1a; padding: 28px 24px;
  }
  .summary-section h3 {
    font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: #3a3530; margin-bottom: 20px; font-weight: 500;
  }
  .summary-cols { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 28px; }
  .summary-col h4 {
    font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: #c9a84c; margin-bottom: 10px; font-weight: 500;
  }
  .summary-col p, .summary-col li { font-size: 0.8rem; line-height: 1.7; color: #7a7570; font-weight: 300; }
  .summary-col ul { list-style: none; display: flex; flex-direction: column; gap: 5px; }
  .summary-col ul li::before { content: "→  "; color: #3a3530; }
  .summary-reco {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 0.88rem; color: #9a9490; line-height: 1.7;
  }
`;

const SYSTEM_PROMPT = `You are an expert UX researcher specialising in customer journey mapping.

Analyse the interview notes provided. Each person is separated by "---" or similar markers.

CRITICAL RULES:
- Never invent quotes. Only paraphrase what was actually said in the notes.
- If you infer something not explicitly stated, mark inferred: true
- Keep individual maps strictly grounded in that person's notes only
- The aggregate synthesises patterns across all individuals
- Emotional scores: infer from the tone and language in the notes (-3 to +3)

Return ONLY valid JSON, no markdown, no explanation:

{
  "customerName": "Name of the customer group or context",
  "individuals": [
    {
      "personLabel": "Person A",
      "persona": {
        "name": "Descriptive archetype name e.g. The Reluctant Participant",
        "role": "One-line descriptor of their situation",
        "coreTension": "Paraphrase of their core attitude — never invent quotes",
        "inferred": false
      },
      "stages": [
        {
          "name": "Stage name (2-4 words)",
          "actions": ["action grounded in notes"],
          "touchpoints": ["channel or interaction point"],
          "thoughts": [
            { "text": "Paraphrase of what they expressed", "inferred": false }
          ],
          "emotionalScore": 1
        }
      ],
      "painPoints": [
        { "text": "Pain point grounded in notes", "severity": "high", "inferred": false }
      ],
      "opportunities": [
        { "text": "Opportunity", "inferred": true }
      ]
    }
  ],
  "aggregate": {
    "persona": {
      "name": "Composite group archetype name",
      "role": "Group descriptor",
      "coreTension": "Core tension across the group — paraphrase only"
    },
    "stages": [
      {
        "name": "Stage name",
        "actions": ["common action across group"],
        "touchpoints": ["common touchpoint"],
        "thoughts": [
          { "text": "Common theme paraphrased", "inferred": false }
        ],
        "emotionalScore": 0
      }
    ],
    "painPoints": [
      { "text": "Common pain point", "severity": "high", "inferred": false }
    ],
    "opportunities": [
      { "text": "Group opportunity", "inferred": false }
    ],
    "convergence": ["Where all or most members align"],
    "divergence": ["Where members significantly differ"],
    "summary": {
      "biggestPainPoints": ["Key insight 1", "Key insight 2"],
      "topOpportunities": ["Opportunity 1", "Opportunity 2"],
      "recommendation": "2-3 sentence synthesis of structural pattern and recommended focus"
    }
  }
}`;

function EmotionalCurve({ stages }) {
  const scores = stages.map(s => s.emotionalScore ?? 0);
  const W = 600, H = 70, PAD = 16;
  const n = scores.length;
  const xStep = (W - PAD * 2) / Math.max(n - 1, 1);
  const toY = s => PAD + ((3 - s) / 6) * (H - PAD * 2);
  const points = scores.map((s, i) => [PAD + i * xStep, toY(s)]);
  let pathD = "";
  if (points.length > 1) {
    pathD = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const cpx = (points[i-1][0] + points[i][0]) / 2;
      pathD += ` C ${cpx} ${points[i-1][1]}, ${cpx} ${points[i][1]}, ${points[i][0]} ${points[i][1]}`;
    }
  }
  const emoji = s => s >= 2 ? "😊" : s >= 0 ? "🙂" : s >= -1 ? "😕" : "😠";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="emotion-svg" preserveAspectRatio="none">
      <line x1={PAD} y1={toY(0)} x2={W-PAD} y2={toY(0)} stroke="#1e1e1e" strokeWidth="1"/>
      {pathD && <path d={pathD} fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.7"/>}
      {points.map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="#c9a84c"/>
          <text x={x} y={y-9} textAnchor="middle" fontSize="8" fill="#7a7570">
            {emoji(scores[i])} {scores[i]>0?"+":""}{scores[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function MapView({ data, isAggregate }) {
  const stageCount = data.stages?.length || 1;
  const gridCols = `100px repeat(${stageCount}, 1fr)`;
  return (
    <div className="map-outer">
      <div className="persona-bar">
        <div>
          <div className="persona-name">{data.persona?.name}</div>
          <div className="persona-role">{data.persona?.role}</div>
          <div className="persona-quote-label">Core tension</div>
          <div className="persona-quote">
            {data.persona?.coreTension}
            {data.persona?.inferred && <span className="inferred-badge">inferred</span>}
          </div>
        </div>
        {isAggregate && <div className="aggregate-label">Aggregate · All Participants</div>}
      </div>

      <div className="stage-header-row" style={{ display: "grid", gridTemplateColumns: gridCols }}>
        <div className="stage-name-cell" style={{ color: "#3a3530", fontSize: "0.6rem" }}>STAGES</div>
        {data.stages?.map((s, i) => <div key={i} className="stage-name-cell">{s.name}</div>)}
      </div>

      <div className="data-row">
        <div className="row-label-col">Actions</div>
        {data.stages?.map((s, i) => (
          <div key={i} className="data-cell">
            <ul>{s.actions?.map((a, j) => <li key={j}>{a}</li>)}</ul>
          </div>
        ))}
      </div>

      <div className="data-row">
        <div className="row-label-col">Touchpoints</div>
        {data.stages?.map((s, i) => (
          <div key={i} className="data-cell">
            <ul>{s.touchpoints?.map((t, j) => <li key={j}>{t}</li>)}</ul>
          </div>
        ))}
      </div>

      <div className="data-row">
        <div className="row-label-col">Thoughts</div>
        {data.stages?.map((s, i) => (
          <div key={i} className="data-cell">
            {s.thoughts?.map((t, j) => (
              <p key={j} className="thought">
                {t.text}
                {t.inferred && <span className="inferred-badge">inferred</span>}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="emotion-row">
        <div className="row-label-col">Emotional Curve</div>
        <div className="emotion-chart">
          <EmotionalCurve stages={data.stages || []} />
        </div>
      </div>

      <div className="bottom-section">
        <div className="bottom-panel">
          <h3>Pain Points</h3>
          {data.painPoints?.map((p, i) => (
            <div key={i} className="pain-item">
              <p>{p.text}{p.inferred && <span className="inferred-badge">inferred</span>}</p>
              <span className={`severity-badge severity-${p.severity}`}>{p.severity} severity</span>
            </div>
          ))}
        </div>
        <div className="bottom-panel">
          <h3>Opportunities</h3>
          {data.opportunities?.map((o, i) => (
            <div key={i} className="opportunity-item">
              <span className="opp-arrow">→</span>
              <p>{o.text}{o.inferred && <span className="inferred-badge">inferred</span>}</p>
            </div>
          ))}
        </div>
      </div>

      {isAggregate && data.convergence && (
        <div className="group-section">
          <h3>Group Patterns</h3>
          <div className="group-grid">
            <div className="group-panel">
              <h4>Where members converge</h4>
              <ul>{data.convergence?.map((c, i) => <li key={i}>{c}</li>)}</ul>
            </div>
            <div className="group-panel">
              <h4>Where members diverge</h4>
              <ul>{data.divergence?.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>
          </div>
        </div>
      )}

      {isAggregate && data.summary && (
        <div className="summary-section">
          <h3>Map Summary</h3>
          <div className="summary-cols">
            <div className="summary-col">
              <h4>Biggest Pain Points</h4>
              <ul>{data.summary?.biggestPainPoints?.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
            <div className="summary-col">
              <h4>Top Opportunities</h4>
              <ul>{data.summary?.topOpportunities?.map((o, i) => <li key={i}>{o}</li>)}</ul>
            </div>
            <div className="summary-col">
              <h4>Recommended Focus</h4>
              <p className="summary-reco">{data.summary?.recommendation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("input");
  const [apiKey, setApiKey] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contextNote, setContextNote] = useState("");
  const [notes, setNotes] = useState("");
  const [mapData, setMapData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!apiKey.trim()) { setError("Please enter your Anthropic API key."); return; }
    if (!notes.trim()) { setError("Please paste your interview notes first."); return; }
    setError("");
    setScreen("loading");

    const userContent = `Customer/context: ${customerName || "Customer group"}
Additional context: ${contextNote || "None provided"}

Interview notes:
${notes}`;

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
      setMapData(parsed);
      setActiveTab(0);
      setScreen("map");
    } catch (e) {
      setScreen("input");
      setError("Something went wrong: " + (e.message || "Check your notes and try again."));
    }
  };

  const tabs = mapData ? [
    ...mapData.individuals.map((ind, i) => ({ label: ind.personLabel || `Person ${i+1}`, isAggregate: false, index: i })),
    { label: "Aggregate", isAggregate: true, index: mapData.individuals.length }
  ] : [];

  const activeData = mapData && tabs[activeTab]
    ? tabs[activeTab].isAggregate ? mapData.aggregate : mapData.individuals[tabs[activeTab].index]
    : null;

  return (
    <div className="app">
      <style>{styles}</style>

      {screen === "input" && (
        <div className="input-screen">
          <div className="input-header">
            <button className="back-btn" onClick={() => navigate("/")}>← Back to Tools</button>
            <h1>Customer<br /><em>Journey Map</em></h1>
            <p>Paste interview notes — one block per person, separated by "---". The AI generates an individual map per person and an aggregate view. No invented quotes — only paraphrases grounded in what was actually said.</p>
          </div>

          <div className="field-group">
            <div className="field">
              <label>Anthropic API Key</label>
              <input type="password" placeholder="sk-ant-..." value={apiKey} onChange={e => setApiKey(e.target.value)} />
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label>Customer / Program Name</label>
              <input placeholder="e.g. Onboarding Flow, Product Users, Internal Team" value={customerName} onChange={e => setCustomerName(e.target.value)} />
            </div>
            <div className="field">
              <label>Additional Context (optional)</label>
              <input placeholder="e.g. 3 interviews, internal digital group" value={contextNote} onChange={e => setContextNote(e.target.value)} />
            </div>
          </div>

          <div className="notes-field">
            <label>Interview Notes</label>
            <textarea
              placeholder={"One block per person, separated by ---\n\n--- Person A ---\nConsiders this a burden but always shows up...\n\n--- Person B ---\n..."}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <p className="hint">Free text or bullet points. Separate people with --- or a clear label.</p>
          </div>

          <button className="generate-btn" onClick={generate} disabled={!notes.trim() || !apiKey.trim()}>
            <span>Generate Journey Maps</span>
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
          <p>Generating individual and aggregate maps...</p>
        </div>
      )}

      {screen === "map" && mapData && (
        <div className="map-screen">
          <div className="map-topbar">
            <div className="map-title">
              <h1><em>{mapData.customerName || customerName || "Customer"}</em> — Journey Map</h1>
              <p>{mapData.individuals?.length} individual maps · aggregate view included</p>
            </div>
            <div className="map-meta">
              <div>{mapData.individuals?.length} Participants</div>
              <button className="reset-btn" onClick={() => navigate("/")}>← All Tools</button>
              <button className="reset-btn" onClick={() => setScreen("input")}>← Edit Notes</button>
            </div>
          </div>

          <div className="tabs-bar">
            {tabs.map((tab, i) => (
              <button
                key={i}
                className={`tab-btn ${activeTab === i ? "active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeData && (
            <MapView data={activeData} isAggregate={tabs[activeTab]?.isAggregate} />
          )}
        </div>
      )}
    </div>
  );
}