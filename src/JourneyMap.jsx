import { useState, useRef } from "react";
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

  /* INPUT SCREEN */
  .input-screen {
    max-width: 760px;
    margin: 0 auto;
    padding: 64px 32px;
  }
  .input-header {
    margin-bottom: 48px;
  }
  .input-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.6rem;
    font-weight: 400;
    color: #e8e2d9;
    line-height: 1.15;
    margin-bottom: 12px;
  }
  .input-header h1 em {
    font-style: italic;
    color: #c9a84c;
  }
  .input-header p {
    font-size: 0.9rem;
    color: #7a7570;
    font-weight: 300;
    line-height: 1.6;
  }
  .field-group {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  .field label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7a7570;
    font-weight: 500;
  }
  .field input {
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    color: #e8e2d9;
    padding: 12px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s;
  }
  .field input:focus {
    border-color: #c9a84c;
  }
  .notes-field {
    margin-bottom: 28px;
  }
  .notes-field label {
    display: block;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7a7570;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .notes-field textarea {
    width: 100%;
    height: 340px;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    color: #e8e2d9;
    padding: 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    line-height: 1.7;
    border-radius: 4px;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s;
  }
  .notes-field textarea:focus {
    border-color: #c9a84c;
  }
  .notes-field .hint {
    margin-top: 8px;
    font-size: 0.75rem;
    color: #4a4540;
    font-style: italic;
  }
  .generate-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #c9a84c;
    color: #0e0e0e;
    border: none;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s, transform 0.1s;
  }
  .generate-btn:hover { background: #debb6a; }
  .generate-btn:active { transform: scale(0.98); }
  .generate-btn:disabled { background: #3a3530; color: #6a6560; cursor: not-allowed; transform: none; }
  .error-msg {
    margin-top: 16px;
    padding: 12px 16px;
    background: #2a1515;
    border: 1px solid #4a2020;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #c07070;
  }

  /* MAP SCREEN */
  .map-screen {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 32px 80px;
  }
  .map-topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 48px;
    padding-bottom: 32px;
    border-bottom: 1px solid #1e1e1e;
  }
  .map-persona {
    flex: 1;
  }
  .map-persona-name {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 400;
    color: #e8e2d9;
    margin-bottom: 4px;
  }
  .map-persona-role {
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 16px;
  }
  .map-persona-quote {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.1rem;
    color: #9a9490;
    max-width: 520px;
    line-height: 1.5;
  }
  .map-meta {
    text-align: right;
    font-size: 0.7rem;
    color: #4a4540;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 2;
  }
  .reset-btn {
    display: block;
    margin-top: 12px;
    background: transparent;
    border: 1px solid #2a2a2a;
    color: #7a7570;
    padding: 8px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s;
  }
  .reset-btn:hover { border-color: #c9a84c; color: #c9a84c; }

  /* STAGES HEADER */
  .section-label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #4a4540;
    margin-bottom: 20px;
    font-weight: 500;
  }
  .stages-grid {
    display: grid;
    gap: 0;
    margin-bottom: 0;
  }
  .stage-header-row {
    display: grid;
    border-bottom: 1px solid #1e1e1e;
  }
  .stage-name-cell {
    padding: 14px 20px;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 500;
    color: #c9a84c;
    border-right: 1px solid #1a1a1a;
    background: #111;
  }
  .stage-name-cell:last-child { border-right: none; }

  .row-label-col {
    width: 110px;
    min-width: 110px;
    padding: 14px 16px;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4a4540;
    font-weight: 500;
    border-right: 1px solid #1a1a1a;
    background: #0e0e0e;
    display: flex;
    align-items: flex-start;
    padding-top: 18px;
  }

  .data-row {
    display: flex;
    border-bottom: 1px solid #1a1a1a;
    min-height: 80px;
  }
  .data-row:last-child { border-bottom: none; }
  .data-cell {
    flex: 1;
    padding: 16px 20px;
    border-right: 1px solid #1a1a1a;
    font-size: 0.82rem;
    line-height: 1.6;
    color: #9a9490;
    font-weight: 300;
  }
  .data-cell:last-child { border-right: none; }
  .data-cell ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .data-cell ul li::before {
    content: "·  ";
    color: #3a3530;
  }
  .data-cell .thought {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 0.82rem;
    color: #7a7570;
    line-height: 1.5;
    margin-bottom: 6px;
  }

  /* EMOTIONAL CURVE */
  .emotion-section {
    margin: 0;
    border-bottom: 1px solid #1a1a1a;
  }
  .emotion-row {
    display: flex;
    min-height: 120px;
    align-items: stretch;
  }
  .emotion-chart {
    flex: 1;
    padding: 16px 20px;
    display: flex;
    align-items: center;
  }
  .emotion-svg { width: 100%; height: 80px; }

  /* PAIN POINTS & OPPORTUNITIES */
  .bottom-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: #1a1a1a;
    margin-top: 1px;
    border-top: 1px solid #1a1a1a;
  }
  .bottom-panel {
    background: #0e0e0e;
    padding: 32px 28px;
  }
  .bottom-panel h3 {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #4a4540;
    margin-bottom: 20px;
    font-weight: 500;
  }
  .pain-item {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #1a1a1a;
  }
  .pain-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  .pain-item p {
    font-size: 0.83rem;
    line-height: 1.6;
    color: #9a9490;
    font-weight: 300;
    margin-bottom: 6px;
  }
  .severity-badge {
    display: inline-block;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 2px;
    font-weight: 500;
  }
  .severity-high { background: #2a1515; color: #c07070; }
  .severity-medium { background: #1a1e10; color: #8aaa60; }
  .severity-low { background: #1a1820; color: #7080a0; }

  .opportunity-item {
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #1a1a1a;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .opportunity-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  .opp-arrow {
    color: #c9a84c;
    font-size: 0.8rem;
    margin-top: 2px;
    flex-shrink: 0;
  }
  .opportunity-item p {
    font-size: 0.83rem;
    line-height: 1.6;
    color: #9a9490;
    font-weight: 300;
  }

  /* SUMMARY */
  .summary-section {
    margin-top: 1px;
    background: #111;
    border-top: 1px solid #1a1a1a;
    padding: 36px 32px;
  }
  .summary-section h3 {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #4a4540;
    margin-bottom: 24px;
    font-weight: 500;
  }
  .summary-cols {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
  }
  .summary-col h4 {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 12px;
    font-weight: 500;
  }
  .summary-col p, .summary-col li {
    font-size: 0.82rem;
    line-height: 1.7;
    color: #7a7570;
    font-weight: 300;
  }
  .summary-col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
  .summary-col ul li::before { content: "→  "; color: #3a3530; }
  .summary-reco {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 0.9rem;
    color: #9a9490;
    line-height: 1.7;
  }

  .map-outer {
    border: 1px solid #1e1e1e;
    border-radius: 4px;
    overflow: hidden;
  }

  /* LOADING */
  .loading-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 20px;
  }
  .loading-overlay p {
    font-size: 0.85rem;
    color: #4a4540;
    letter-spacing: 0.06em;
  }
  .spinner {
    width: 36px; height: 36px;
    border: 2px solid #2a2a2a;
    border-top-color: #c9a84c;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const SYSTEM_PROMPT = `You are an expert UX researcher and journey mapping specialist. 
Your task is to analyze interview notes and produce a structured community member journey map.

Analyze the notes carefully. Identify:
1. Natural journey stages (typically 4-6) that community members move through, from first awareness to current state
2. For each stage: what members DO (actions), what channels/tools they use (touchpoints), what they THINK/FEEL (verbatim-style thoughts), and an emotional score from -3 to +3
3. Pain points with severity (high/medium/low)  
4. Opportunities for improvement
5. A composite persona name and representative quote

Return ONLY valid JSON (no markdown, no explanation) matching this exact schema:
{
  "persona": {
    "name": "Composite member persona name",
    "role": "Short descriptor e.g. 'Digital Community Member'",
    "quote": "A representative quote capturing the core tension"
  },
  "context": "One sentence describing the community journey scope",
  "stages": [
    {
      "name": "Stage name (2-4 words)",
      "description": "One sentence",
      "actions": ["action 1", "action 2", "action 3"],
      "touchpoints": ["channel/tool 1", "channel/tool 2"],
      "thoughts": ["Thought expressed in first person", "Another thought"],
      "emotionalScore": 1
    }
  ],
  "painPoints": [
    { "text": "Pain point description", "severity": "high" }
  ],
  "opportunities": [
    { "text": "Opportunity description" }
  ],
  "summary": {
    "biggestPainPoints": ["Short insight 1", "Short insight 2"],
    "topOpportunities": ["Short opportunity 1", "Short opportunity 2"],
    "recommendation": "2-3 sentence synthesis of the structural problem and recommended focus"
  }
}`;

function EmotionalCurve({ stages }) {
  const scores = stages.map(s => s.emotionalScore ?? 0);
  const W = 600, H = 80, PAD = 20;
  const n = scores.length;
  const xStep = (W - PAD * 2) / Math.max(n - 1, 1);

  const toY = s => PAD + ((3 - s) / 6) * (H - PAD * 2);
  const points = scores.map((s, i) => [PAD + i * xStep, toY(s)]);

  let pathD = "";
  if (points.length > 1) {
    pathD = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const cpx = (points[i - 1][0] + points[i][0]) / 2;
      pathD += ` C ${cpx} ${points[i - 1][1]}, ${cpx} ${points[i][1]}, ${points[i][0]} ${points[i][1]}`;
    }
  }

  const scoreEmoji = s => {
    if (s >= 2) return "😊";
    if (s >= 0) return "🙂";
    if (s >= -1) return "😕";
    return "😠";
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="emotion-svg" preserveAspectRatio="none">
      <line x1={PAD} y1={toY(0)} x2={W - PAD} y2={toY(0)} stroke="#1e1e1e" strokeWidth="1" />
      {pathD && (
        <path d={pathD} fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.7" />
      )}
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="#c9a84c" />
          <text x={x} y={y - 10} textAnchor="middle" fontSize="9" fill="#7a7570">
            {scoreEmoji(scores[i])} {scores[i] > 0 ? "+" : ""}{scores[i]}
          </text>
        </g>
      ))}
      <text x={PAD} y={toY(3) + 3} fontSize="7" fill="#3a3530">+</text>
      <text x={PAD} y={toY(-3) + 3} fontSize="7" fill="#3a3530">−</text>
    </svg>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("input");
  const [apiKey, setApiKey] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [contextNote, setContextNote] = useState("");
  const [notes, setNotes] = useState("");
  const [mapData, setMapData] = useState(null);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!apiKey.trim()) { setError("Please enter your Anthropic API key."); return; }
    if (!notes.trim()) { setError("Please paste your interview notes first."); return; }
    setError("");
    setScreen("loading");

    const userContent = `Community/context: ${communityName || "Digital community"}
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
      setScreen("map");
    } catch (e) {
      setScreen("input");
      setError("Something went wrong: " + (e.message || "Check your notes and try again."));
    }
  };

  const stageCount = mapData?.stages?.length || 1;

  return (
    <div className="app">
      <style>{styles}</style>

      {screen === "input" && (
        <div className="input-screen">
          <div className="input-header">
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#5a5550", cursor: "pointer", fontSize: "0.8rem", marginBottom: "24px", display: "block", padding: 0, fontFamily: "DM Sans, sans-serif" }}>← Back to Tools</button>
            <h1>Community<br /><em>Journey Map</em></h1>
            <p>Paste your interview notes below — one person per section, any format. The AI will synthesise them into a structured journey map with stages, emotional curve, pain points, and opportunities.</p>
          </div>

          <div className="field-group">
            <div className="field">
              <label>Anthropic API Key</label>
              <input
                type="password"
                placeholder="sk-ant-..."
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label>Community / Program Name</label>
              <input
                placeholder="e.g. Internal Digital Community, Product Team, User Group"
                value={communityName}
                onChange={e => setCommunityName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Additional Context (optional)</label>
              <input
                placeholder="e.g. ~25 members, internal team"
                value={contextNote}
                onChange={e => setContextNote(e.target.value)}
              />
            </div>
          </div>

          <div className="notes-field">
            <label>Interview Notes</label>
            <textarea
              placeholder={`Paste your notes here. No special format needed.\n\n--- Person 1 ---\nJoined 6 months ago, found out about the community through a colleague. Attended two events but stopped because the timing didn't work. Feels like the content is good but disconnected from day-to-day work...\n\n--- Person 2 ---\n...`}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <p className="hint">One block per person. Free text, bullet points, or any mix — the AI handles the synthesis.</p>
          </div>

          <button className="generate-btn" onClick={generate} disabled={!notes.trim() || !apiKey.trim()}>
            <span>Generate Journey Map</span>
            <span>→</span>
          </button>

          {error && <div className="error-msg">{error}</div>}
        </div>
      )}

      {screen === "loading" && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Synthesising interview data...</p>
        </div>
      )}

      {screen === "map" && mapData && (
        <div className="map-screen">
          {/* TOP BAR */}
          <div className="map-topbar">
            <div className="map-persona">
              <div className="map-persona-name">{mapData.persona?.name}</div>
              <div className="map-persona-role">{mapData.persona?.role}</div>
              <div className="map-persona-quote">"{mapData.persona?.quote}"</div>
            </div>
            <div className="map-meta">
              <div>{communityName || "Community Journey Map"}</div>
              <div>Current State · Research-backed</div>
              <div style={{ color: "#2a2a2a" }}>——</div>
              <div>{mapData.stages?.length} Stages Identified</div>
              <button className="reset-btn" onClick={() => navigate("/")}>← All Tools</button>
              <button className="reset-btn" onClick={() => setScreen("input")}>← Edit Notes</button>
            </div>
          </div>

          <div className="map-outer">
            {/* STAGE HEADERS */}
            <div className="stage-header-row" style={{ display: "grid", gridTemplateColumns: `110px repeat(${stageCount}, 1fr)` }}>
              <div className="stage-name-cell" style={{ color: "#4a4540", fontSize: "0.6rem" }}>STAGES</div>
              {mapData.stages.map((s, i) => (
                <div key={i} className="stage-name-cell">{s.name}</div>
              ))}
            </div>

            {/* ACTIONS ROW */}
            <div className="data-row">
              <div className="row-label-col">Actions</div>
              {mapData.stages.map((s, i) => (
                <div key={i} className="data-cell">
                  <ul>{s.actions?.map((a, j) => <li key={j}>{a}</li>)}</ul>
                </div>
              ))}
            </div>

            {/* TOUCHPOINTS ROW */}
            <div className="data-row">
              <div className="row-label-col">Touchpoints</div>
              {mapData.stages.map((s, i) => (
                <div key={i} className="data-cell">
                  <ul>{s.touchpoints?.map((t, j) => <li key={j}>{t}</li>)}</ul>
                </div>
              ))}
            </div>

            {/* THOUGHTS ROW */}
            <div className="data-row">
              <div className="row-label-col">Member Thoughts</div>
              {mapData.stages.map((s, i) => (
                <div key={i} className="data-cell">
                  {s.thoughts?.map((t, j) => <p key={j} className="thought">"{t}"</p>)}
                </div>
              ))}
            </div>

            {/* EMOTIONAL CURVE */}
            <div className="emotion-row">
              <div className="row-label-col">Emotional Curve</div>
              <div className="emotion-chart">
                <EmotionalCurve stages={mapData.stages} />
              </div>
            </div>

            {/* PAIN POINTS + OPPORTUNITIES */}
            <div className="bottom-section">
              <div className="bottom-panel">
                <h3>Pain Points</h3>
                {mapData.painPoints?.map((p, i) => (
                  <div key={i} className="pain-item">
                    <p>{p.text}</p>
                    <span className={`severity-badge severity-${p.severity}`}>{p.severity} severity</span>
                  </div>
                ))}
              </div>
              <div className="bottom-panel">
                <h3>Opportunities</h3>
                {mapData.opportunities?.map((o, i) => (
                  <div key={i} className="opportunity-item">
                    <span className="opp-arrow">→</span>
                    <p>{o.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="summary-section">
              <h3>Map Summary</h3>
              <div className="summary-cols">
                <div className="summary-col">
                  <h4>Biggest Pain Points</h4>
                  <ul>{mapData.summary?.biggestPainPoints?.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </div>
                <div className="summary-col">
                  <h4>Top Opportunities</h4>
                  <ul>{mapData.summary?.topOpportunities?.map((o, i) => <li key={i}>{o}</li>)}</ul>
                </div>
                <div className="summary-col">
                  <h4>Recommended Focus</h4>
                  <p className="summary-reco">{mapData.summary?.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}