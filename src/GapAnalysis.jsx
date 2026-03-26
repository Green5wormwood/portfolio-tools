import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

const styles = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    font-family: 'DM Sans', sans-serif;
    background: #0e0e0e;
    color: #e8e2d9;
    min-height: 100vh;
  }

  /* INPUT SCREEN */
  .input-screen {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 32px 80px;
  }
  .input-header { margin-bottom: 48px; }
  .input-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem;
    font-weight: 400;
    color: #e8e2d9;
    line-height: 1.15;
    margin-bottom: 12px;
  }
  .input-header h1 em { font-style: italic; color: #7eb8a4; }
  .input-header p {
    font-size: 0.88rem;
    color: #7a7570;
    font-weight: 300;
    line-height: 1.6;
  }

  .api-row {
    display: flex;
    gap: 12px;
    align-items: flex-end;
    margin-bottom: 28px;
    padding-bottom: 28px;
    border-bottom: 1px solid #1a1a1a;
  }
  .api-row .field { flex: 1; }

  .field { display: flex; flex-direction: column; gap: 8px; }
  .field label {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #5a5550;
    font-weight: 500;
  }
  .field input, .field textarea {
    background: #141414;
    border: 1px solid #222;
    color: #e8e2d9;
    padding: 12px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    border-radius: 3px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .field input:focus, .field textarea:focus { border-color: #7eb8a4; }
  .field textarea { resize: vertical; line-height: 1.65; }

  .tool-section {
    margin-bottom: 28px;
    padding-bottom: 28px;
    border-bottom: 1px solid #1a1a1a;
  }
  .tool-section .field textarea { height: 90px; }

  .roles-section { margin-bottom: 32px; }
  .roles-section > label {
    display: block;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #5a5550;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .role-card {
    background: #111;
    border: 1px solid #1e1e1e;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 12px;
  }
  .role-card-header {
    display: flex;
    gap: 12px;
    margin-bottom: 14px;
    align-items: center;
  }
  .role-number {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: #1e1e1e;
    border: 1px solid #7eb8a4;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem;
    color: #7eb8a4;
    font-weight: 500;
    flex-shrink: 0;
  }
  .role-card-header input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #2a2a2a;
    color: #e8e2d9;
    padding: 4px 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    outline: none;
    flex: 1;
    transition: border-color 0.2s;
  }
  .role-card-header input:focus { border-bottom-color: #7eb8a4; }
  .role-card-header input::placeholder { color: #3a3530; }

  .role-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .role-fields textarea { height: 110px; font-size: 0.82rem; }
  .role-fields .field label { color: #4a4540; }

  .add-role-btn {
    background: transparent;
    border: 1px dashed #2a2a2a;
    color: #4a4540;
    padding: 10px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    cursor: pointer;
    border-radius: 3px;
    width: 100%;
    transition: all 0.2s;
    margin-top: 4px;
  }
  .add-role-btn:hover { border-color: #7eb8a4; color: #7eb8a4; }

  .generate-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #7eb8a4;
    color: #0e0e0e;
    border: none;
    padding: 15px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    border-radius: 3px;
    transition: background 0.2s, transform 0.1s;
  }
  .generate-btn:hover { background: #9ecfbc; }
  .generate-btn:active { transform: scale(0.98); }
  .generate-btn:disabled { background: #1e2e28; color: #3a5a50; cursor: not-allowed; transform: none; }

  .error-msg {
    margin-top: 14px;
    padding: 12px 16px;
    background: #2a1515;
    border: 1px solid #4a2020;
    border-radius: 3px;
    font-size: 0.8rem;
    color: #c07070;
  }

  /* LOADING */
  .loading-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 70vh;
    gap: 18px;
  }
  .loading-overlay p { font-size: 0.82rem; color: #4a4540; letter-spacing: 0.06em; }
  .spinner {
    width: 32px; height: 32px;
    border: 2px solid #1e2e28;
    border-top-color: #7eb8a4;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* OUTPUT SCREEN */
  .output-screen {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 32px 80px;
  }

  .output-topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
    padding-bottom: 28px;
    border-bottom: 1px solid #1a1a1a;
  }
  .output-title h1 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 400;
    color: #e8e2d9;
    margin-bottom: 6px;
  }
  .output-title h1 em { font-style: italic; color: #7eb8a4; }
  .output-title p {
    font-size: 0.8rem;
    color: #5a5550;
    font-weight: 300;
  }
  .output-meta {
    text-align: right;
    font-size: 0.68rem;
    color: #3a3530;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 2.2;
  }
  .reset-btn {
    display: block;
    margin-top: 10px;
    background: transparent;
    border: 1px solid #222;
    color: #5a5550;
    padding: 7px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s;
  }
  .reset-btn:hover { border-color: #7eb8a4; color: #7eb8a4; }

  /* SUMMARY STRIP */
  .summary-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #1a1a1a;
    border: 1px solid #1a1a1a;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 32px;
  }
  .strip-cell {
    background: #111;
    padding: 20px 22px;
  }
  .strip-cell .strip-label {
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4a4540;
    margin-bottom: 8px;
    font-weight: 500;
  }
  .strip-cell .strip-value {
    font-size: 1.6rem;
    font-family: 'Playfair Display', serif;
    color: #e8e2d9;
    font-weight: 400;
  }
  .strip-cell .strip-value.red { color: #c07070; }
  .strip-cell .strip-value.amber { color: #c9a84c; }
  .strip-cell .strip-value.green { color: #7eb8a4; }
  .strip-cell .strip-sub {
    font-size: 0.75rem;
    color: #4a4540;
    margin-top: 4px;
    font-weight: 300;
  }

  /* ROLE SECTIONS */
  .role-section { margin-bottom: 28px; }
  .role-section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 1px;
    background: #111;
    border: 1px solid #1e1e1e;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    padding: 16px 20px;
  }
  .role-badge {
    background: #1e2e28;
    border: 1px solid #7eb8a4;
    color: #7eb8a4;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 2px;
    font-weight: 500;
  }
  .role-section-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 400;
    color: #e8e2d9;
  }
  .role-section-header .role-desc {
    font-size: 0.78rem;
    color: #5a5550;
    margin-left: auto;
    font-weight: 300;
    max-width: 320px;
    text-align: right;
  }

  /* STEPS TABLE */
  .steps-table {
    border: 1px solid #1e1e1e;
    border-radius: 0 0 4px 4px;
    overflow: hidden;
  }
  .steps-table-header {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 130px;
    background: #0e0e0e;
    border-bottom: 1px solid #1e1e1e;
  }
  .th {
    padding: 10px 16px;
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #3a3530;
    font-weight: 500;
    border-right: 1px solid #1a1a1a;
  }
  .th:last-child { border-right: none; }

  .step-row {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 130px;
    border-bottom: 1px solid #141414;
    transition: background 0.15s;
  }
  .step-row:last-child { border-bottom: none; }
  .step-row:hover { background: #111; }

  .step-num {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 16px 0;
    font-size: 0.7rem;
    color: #3a3530;
    border-right: 1px solid #141414;
    padding-top: 18px;
    font-weight: 500;
  }
  .step-ideal {
    padding: 14px 16px;
    font-size: 0.82rem;
    line-height: 1.6;
    color: #9a9490;
    font-weight: 300;
    border-right: 1px solid #141414;
  }
  .step-actual {
    padding: 14px 16px;
    font-size: 0.82rem;
    line-height: 1.6;
    font-weight: 300;
    border-right: 1px solid #141414;
  }
  .step-actual.has-gap { color: #c09070; }
  .step-actual.no-gap { color: #7eb8a4; }
  .step-actual.partial { color: #c9a84c; }

  .gap-cell {
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .gap-type {
    font-size: 0.62rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 2px;
    font-weight: 500;
    white-space: nowrap;
  }
  .gap-missing-field { background: #2a1a10; color: #c09070; }
  .gap-missing-feature { background: #2a1515; color: #c07070; }
  .gap-wrong-sequence { background: #1e1a10; color: #c9a84c; }
  .gap-workaround { background: #1a1510; color: #b09060; }
  .gap-none { background: #0e1e18; color: #7eb8a4; }
  .gap-partial { background: #1a1e10; color: #9aaa60; }

  .severity-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }
  .sev-high { background: #c07070; }
  .sev-medium { background: #c9a84c; }
  .sev-low { background: #7eb8a4; }
  .sev-none { background: #3a3530; }

  /* FINDINGS */
  .findings-section {
    margin-top: 32px;
    border: 1px solid #1e1e1e;
    border-radius: 4px;
    overflow: hidden;
  }
  .findings-header {
    background: #111;
    padding: 16px 22px;
    border-bottom: 1px solid #1e1e1e;
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4a4540;
    font-weight: 500;
  }
  .findings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: #1a1a1a;
  }
  .findings-panel {
    background: #0e0e0e;
    padding: 24px 22px;
  }
  .findings-panel h4 {
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7eb8a4;
    margin-bottom: 14px;
    font-weight: 500;
  }
  .findings-panel ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .findings-panel ul li {
    font-size: 0.81rem;
    line-height: 1.6;
    color: #7a7570;
    font-weight: 300;
    padding-left: 14px;
    position: relative;
  }
  .findings-panel ul li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: #3a3530;
    font-size: 0.75rem;
  }
  .findings-panel.reco { background: #0e1410; }
  .findings-panel.reco p {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 0.88rem;
    color: #8a9490;
    line-height: 1.7;
  }

  .export-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid #7eb8a4;
    color: #7eb8a4;
    padding: 10px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s;
    margin-top: 24px;
  }
  .export-btn:hover { background: #1e2e28; }
  .export-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .no-storage-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    color: #3a3530;
    margin-top: 16px;
    padding: 10px 14px;
    border: 1px solid #1a1a1a;
    border-radius: 3px;
  }
  .no-storage-notice span { color: #7eb8a4; font-size: 0.8rem; }
`;

const SYSTEM_PROMPT = `You are a tool design analyst specialising in process compliance and UX gap analysis.

Your task: given a tool description and per-role input (role name, ideal steps, known gaps/actual behaviour), produce a structured gap analysis comparing ideal process vs actual tool capability.

Return ONLY valid JSON, no markdown, no explanation. Schema:

{
  "toolName": "Short tool name",
  "toolSummary": "One sentence describing what the tool is supposed to do",
  "totalSteps": 12,
  "gapsFound": 7,
  "criticalGaps": 3,
  "roles": [
    {
      "roleName": "Role name",
      "roleDescription": "One sentence on what this role does in the process",
      "steps": [
        {
          "stepNumber": 1,
          "idealStep": "What the process requires this role to do",
          "actualStep": "What the tool actually allows/does — be specific about missing fields, missing features, wrong sequence, or workarounds",
          "gapType": "none | missing-field | missing-feature | wrong-sequence | workaround | partial",
          "severity": "none | low | medium | high",
          "gapStatus": "no-gap | has-gap | partial"
        }
      ]
    }
  ],
  "findings": {
    "criticalGaps": ["Gap description 1", "Gap description 2"],
    "workarounds": ["Workaround people likely use 1", "Workaround 2"],
    "recommendation": "2-3 sentence synthesis of the structural problem and what needs to be fixed first"
  }
}

Rules:
- Be precise and clinical — this is evidence, not perception
- If a step works correctly, mark gapType as "none" and severity as "none"
- Label gap types accurately: missing-field (field doesn't exist), missing-feature (functionality absent), wrong-sequence (correct feature but wrong order), workaround (user must go elsewhere), partial (feature exists but incomplete)
- Severity: high = blocks the process, medium = degrades quality or forces workaround, low = inconvenient but manageable
- Keep idealStep and actualStep concise — one sentence each
- Generate realistic step counts based on the process described (typically 4-8 steps per role)`;

const GAP_TYPE_LABELS = {
  "none": "No Gap",
  "missing-field": "Missing Field",
  "missing-feature": "Missing Feature",
  "wrong-sequence": "Wrong Sequence",
  "workaround": "Workaround Required",
  "partial": "Partial"
};

const GAP_TYPE_CLASSES = {
  "none": "gap-none",
  "missing-field": "gap-missing-field",
  "missing-feature": "gap-missing-feature",
  "wrong-sequence": "gap-wrong-sequence",
  "workaround": "gap-workaround",
  "partial": "gap-partial"
};

const SEV_CLASSES = {
  "none": "sev-none",
  "low": "sev-low",
  "medium": "sev-medium",
  "high": "sev-high"
};

const emptyRole = () => ({ name: "", idealSteps: "", actualBehaviour: "" });

export default function App() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("input");
  const [apiKey, setApiKey] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const [roles, setRoles] = useState([emptyRole(), emptyRole(), emptyRole()]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const updateRole = (i, field, val) => {
    const updated = roles.map((r, idx) => idx === i ? { ...r, [field]: val } : r);
    setRoles(updated);
  };

  const addRole = () => {
    if (roles.length < 6) setRoles([...roles, emptyRole()]);
  };

  const removeRole = (i) => {
    if (roles.length > 2) setRoles(roles.filter((_, idx) => idx !== i));
  };

  const generate = async () => {
    if (!apiKey.trim()) { setError("Please enter your Anthropic API key."); return; }
    if (!toolDescription.trim()) { setError("Please describe the tool."); return; }
    const filledRoles = roles.filter(r => r.name.trim() && r.idealSteps.trim());
    if (filledRoles.length < 2) { setError("Please fill in at least 2 roles with a name and ideal steps."); return; }
    setError("");
    setScreen("loading");

    const userContent = `Tool description: ${toolDescription}

${filledRoles.map((r, i) => `Role ${i + 1}: ${r.name}
Ideal steps: ${r.idealSteps}
Known gaps / actual tool behaviour: ${r.actualBehaviour || "Not specified — infer from tool description"}`).join("\n\n")}`;

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
      setError("Something went wrong: " + (e.message || "Check your API key and try again."));
    }
  };

  const [pptxReady, setPptxReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/PptxGenJS/3.12.0/pptxgen.bundle.js";
    script.onload = () => setPptxReady(true);
    document.head.appendChild(script);
  }, []);

  const exportPptx = () => {
    if (!window.PptxGenJS || !result) return;
    const pptx = new window.PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";

    const DARK = "0e0e0e";
    const TEAL = "7eb8a4";
    const LIGHT = "e8e2d9";
    const MID = "9a9490";
    const RED = "c07070";
    const AMBER = "c9a84c";

    const addTitle = (slide, text) => {
      slide.addText(text, { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 22, bold: true, color: LIGHT, fontFace: "Georgia" });
      slide.addShape(pptx.ShapeType.line, { x: 0.5, y: 1.0, w: 12, h: 0, line: { color: "1e1e1e", width: 1 } });
    };

    // SLIDE 1 — Title
    const s1 = pptx.addSlide();
    s1.background = { color: DARK };
    s1.addText(result.toolName, { x: 0.5, y: 1.8, w: 12, h: 1, fontSize: 36, bold: true, color: TEAL, fontFace: "Georgia", italic: true });
    s1.addText("Tool Gap Analysis", { x: 0.5, y: 2.9, w: 12, h: 0.5, fontSize: 18, color: LIGHT, fontFace: "Calibri" });
    s1.addText(result.toolSummary, { x: 0.5, y: 3.6, w: 12, h: 0.6, fontSize: 12, color: MID, fontFace: "Calibri" });
    s1.addText([
      { text: `${result.gapsFound} Gaps  ·  `, options: { color: RED } },
      { text: `${result.criticalGaps} Critical  ·  `, options: { color: RED } },
      { text: `${Math.round(((result.totalSteps - result.gapsFound) / result.totalSteps) * 100)}% Coverage`, options: { color: TEAL } }
    ], { x: 0.5, y: 4.4, w: 12, h: 0.4, fontSize: 13, fontFace: "Calibri", bold: true });

    // SLIDE 2 — Summary
    const s2 = pptx.addSlide();
    s2.background = { color: DARK };
    addTitle(s2, "Summary");
    const stats = [
      { label: "Gaps Found", value: `${result.gapsFound} / ${result.totalSteps}`, color: RED },
      { label: "Critical Gaps", value: String(result.criticalGaps), color: RED },
      { label: "Process Coverage", value: `${Math.round(((result.totalSteps - result.gapsFound) / result.totalSteps) * 100)}%`, color: TEAL }
    ];
    stats.forEach((stat, i) => {
      const x = 0.5 + i * 4.3;
      s2.addShape(pptx.ShapeType.rect, { x, y: 1.4, w: 4, h: 2, fill: { color: "111111" }, line: { color: "1e1e1e", width: 1 } });
      s2.addText(stat.label.toUpperCase(), { x: x + 0.2, y: 1.6, w: 3.6, h: 0.3, fontSize: 8, color: "4a4540", fontFace: "Calibri", bold: true });
      s2.addText(stat.value, { x: x + 0.2, y: 2.0, w: 3.6, h: 0.8, fontSize: 32, color: stat.color, fontFace: "Georgia", bold: true });
    });

    // SLIDES — One per role
    result.roles?.forEach((role, ri) => {
      const rs = pptx.addSlide();
      rs.background = { color: DARK };
      addTitle(rs, `Role ${ri + 1} — ${role.roleName}`);
      rs.addText(role.roleDescription, { x: 0.5, y: 1.1, w: 12, h: 0.3, fontSize: 10, color: "5a5550", fontFace: "Calibri", italic: true });

      const headers = ["#", "Ideal Step", "Actual in Tool", "Gap Type", "Severity"];
      const colW = [0.4, 3.5, 3.5, 2.2, 1.4];
      const colX = [0.5, 0.9, 4.4, 7.9, 10.1];

      headers.forEach((h, hi) => {
        rs.addText(h.toUpperCase(), { x: colX[hi], y: 1.5, w: colW[hi], h: 0.3, fontSize: 7, color: "3a3530", fontFace: "Calibri", bold: true });
      });

      role.steps?.forEach((step, si) => {
        const y = 1.9 + si * 0.55;
        if (y > 6.5) return;
        const rowBg = si % 2 === 0 ? "111111" : "0e0e0e";
        rs.addShape(pptx.ShapeType.rect, { x: 0.5, y, w: 12, h: 0.5, fill: { color: rowBg }, line: { color: "141414", width: 0.5 } });
        rs.addText(String(step.stepNumber), { x: colX[0], y: y + 0.1, w: colW[0], h: 0.3, fontSize: 9, color: "3a3530", fontFace: "Calibri" });
        rs.addText(step.idealStep, { x: colX[1], y: y + 0.05, w: colW[1], h: 0.42, fontSize: 8.5, color: MID, fontFace: "Calibri" });
        const actualColor = step.gapStatus === "no-gap" ? TEAL : step.gapStatus === "partial" ? AMBER : "c09070";
        rs.addText(step.actualStep, { x: colX[2], y: y + 0.05, w: colW[2], h: 0.42, fontSize: 8.5, color: actualColor, fontFace: "Calibri" });
        rs.addText(GAP_TYPE_LABELS[step.gapType] || step.gapType, { x: colX[3], y: y + 0.1, w: colW[3], h: 0.3, fontSize: 8, color: step.gapType === "none" ? TEAL : AMBER, fontFace: "Calibri" });
        const sevColor = step.severity === "high" ? RED : step.severity === "medium" ? AMBER : TEAL;
        rs.addText(step.severity, { x: colX[4], y: y + 0.1, w: colW[4], h: 0.3, fontSize: 8, color: sevColor, fontFace: "Calibri", bold: true });
      });
    });

    // SLIDE — Key Findings
    const sf = pptx.addSlide();
    sf.background = { color: DARK };
    addTitle(sf, "Key Findings");

    const panels = [
      { title: "Critical Gaps", items: result.findings?.criticalGaps, color: RED, x: 0.5 },
      { title: "Likely Workarounds", items: result.findings?.workarounds, color: AMBER, x: 4.7 },
    ];
    panels.forEach(panel => {
      sf.addText(panel.title.toUpperCase(), { x: panel.x, y: 1.2, w: 3.8, h: 0.3, fontSize: 8, color: panel.color, fontFace: "Calibri", bold: true });
      panel.items?.forEach((item, i) => {
        sf.addText(`→  ${item}`, { x: panel.x, y: 1.6 + i * 0.55, w: 3.8, h: 0.45, fontSize: 9, color: MID, fontFace: "Calibri" });
      });
    });

    sf.addText("RECOMMENDED FOCUS", { x: 8.9, y: 1.2, w: 3.6, h: 0.3, fontSize: 8, color: TEAL, fontFace: "Calibri", bold: true });
    sf.addText(result.findings?.recommendation, { x: 8.9, y: 1.6, w: 3.6, h: 3, fontSize: 10, color: "8a9490", fontFace: "Georgia", italic: true });

    pptx.writeFile({ fileName: `${result.toolName || "gap-analysis"}-gap-analysis.pptx` });
  };
  const totalSteps = result ? result.totalSteps : 0;
  const coverage = totalSteps > 0 ? Math.round(((totalSteps - totalGaps) / totalSteps) * 100) : 0;

  return (
    <div className="app">
      <style>{styles}</style>

      {screen === "input" && (
        <div className="input-screen">
          <div className="input-header">
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#5a5550", cursor: "pointer", fontSize: "0.8rem", marginBottom: "24px", display: "block", padding: 0, fontFamily: "DM Sans, sans-serif" }}>← Back to Tools</button>
            <h1>Tool Gap<br /><em>Analysis</em></h1>
            <p>Describe the tool and what each role should ideally do. The AI generates a step-by-step ideal vs actual comparison — no data stored, session only.</p>
          </div>

          {/* API KEY */}
          <div className="api-row">
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

          {/* TOOL DESCRIPTION */}
          <div className="tool-section">
            <div className="field">
              <label>Tool Description</label>
              <textarea
                placeholder="e.g. Internal request management tool. Designed to allow teams to submit, track, and approve requests across departments. Each role has a defined set of actions within the process."
                value={toolDescription}
                onChange={e => setToolDescription(e.target.value)}
              />
            </div>
          </div>

          {/* ROLES */}
          <div className="roles-section">
            <label>Roles</label>
            {roles.map((role, i) => (
              <div className="role-card" key={i}>
                <div className="role-card-header">
                  <div className="role-number">{i + 1}</div>
                  <input
                    placeholder={`Role ${i + 1} name (e.g. Requester, Approver, Administrator)`}
                    value={role.name}
                    onChange={e => updateRole(i, "name", e.target.value)}
                  />
                  {roles.length > 2 && (
                    <button
                      onClick={() => removeRole(i)}
                      style={{ background: "none", border: "none", color: "#3a3530", cursor: "pointer", fontSize: "1rem", padding: "0 4px" }}
                    >×</button>
                  )}
                </div>
                <div className="role-fields">
                  <div className="field">
                    <label>Ideal Steps</label>
                    <textarea
                      placeholder="1. Open new request&#10;2. Enter required fields&#10;3. Select category and assign&#10;4. Submit for approval"
                      value={role.idealSteps}
                      onChange={e => updateRole(i, "idealSteps", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Known Gaps / Actual Behaviour (optional)</label>
                    <textarea
                      placeholder="e.g. No field for start date exists. Position name field is free text with no validation. Department dropdown missing half the org units."
                      value={role.actualBehaviour}
                      onChange={e => updateRole(i, "actualBehaviour", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {roles.length < 6 && (
              <button className="add-role-btn" onClick={addRole}>+ Add another role</button>
            )}
          </div>

          <button
            className="generate-btn"
            onClick={generate}
            disabled={!apiKey.trim() || !toolDescription.trim()}
          >
            <span>Generate Gap Analysis</span>
            <span>→</span>
          </button>

          <div className="no-storage-notice">
            <span>◉</span>
            No data stored. Session only — everything is cleared when you close this tab.
          </div>

          {error && <div className="error-msg">{error}</div>}
        </div>
      )}

      {screen === "loading" && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Analysing process gaps...</p>
        </div>
      )}

      {screen === "output" && result && (
        <div className="output-screen">
          {/* TOP BAR */}
          <div className="output-topbar">
            <div className="output-title">
              <h1><em>{result.toolName}</em> — Gap Analysis</h1>
              <p>{result.toolSummary}</p>
            </div>
            <div className="output-meta">
              <div>{result.roles?.length} Roles Mapped</div>
              <div>{result.totalSteps} Total Steps</div>
              <div style={{ color: "#c07070" }}>{result.gapsFound} Gaps Found</div>
              <button className="reset-btn" onClick={() => navigate("/")}>← All Tools</button>
              <button className="reset-btn" onClick={() => setScreen("input")}>← Edit Input</button>
            </div>
          </div>

          {/* SUMMARY STRIP */}
          <div className="summary-strip">
            <div className="strip-cell">
              <div className="strip-label">Gaps Found</div>
              <div className={`strip-value ${result.criticalGaps > 2 ? "red" : "amber"}`}>{result.gapsFound}</div>
              <div className="strip-sub">of {result.totalSteps} total steps</div>
            </div>
            <div className="strip-cell">
              <div className="strip-label">Critical Gaps</div>
              <div className={`strip-value ${result.criticalGaps > 0 ? "red" : "green"}`}>{result.criticalGaps}</div>
              <div className="strip-sub">block the process entirely</div>
            </div>
            <div className="strip-cell">
              <div className="strip-label">Process Coverage</div>
              <div className={`strip-value ${coverage >= 80 ? "green" : coverage >= 60 ? "amber" : "red"}`}>{coverage}%</div>
              <div className="strip-sub">steps the tool supports</div>
            </div>
          </div>

          {/* ROLE SECTIONS */}
          {result.roles?.map((role, ri) => (
            <div className="role-section" key={ri}>
              <div className="role-section-header">
                <div className="role-badge">Role {ri + 1}</div>
                <h2>{role.roleName}</h2>
                <div className="role-desc">{role.roleDescription}</div>
              </div>
              <div className="steps-table">
                <div className="steps-table-header">
                  <div className="th">#</div>
                  <div className="th">Ideal Step</div>
                  <div className="th">Actual in Tool</div>
                  <div className="th">Gap</div>
                </div>
                {role.steps?.map((step, si) => (
                  <div className="step-row" key={si}>
                    <div className="step-num">{step.stepNumber}</div>
                    <div className="step-ideal">{step.idealStep}</div>
                    <div className={`step-actual ${step.gapStatus}`}>{step.actualStep}</div>
                    <div className="gap-cell">
                      <span className={`gap-type ${GAP_TYPE_CLASSES[step.gapType] || "gap-none"}`}>
                        {GAP_TYPE_LABELS[step.gapType] || step.gapType}
                      </span>
                      {step.severity !== "none" && (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                          <span className={`severity-dot ${SEV_CLASSES[step.severity]}`} />
                          <span style={{ fontSize: "0.62rem", color: "#3a3530", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            {step.severity}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* FINDINGS */}
          <div className="findings-section">
            <div className="findings-header">Key Findings</div>
            <div className="findings-grid">
              <div className="findings-panel">
                <h4>Critical Gaps</h4>
                <ul>
                  {result.findings?.criticalGaps?.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </div>
              <div className="findings-panel">
                <h4>Likely Workarounds</h4>
                <ul>
                  {result.findings?.workarounds?.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
              <div className="findings-panel reco">
                <h4>Recommended Focus</h4>
                <p>{result.findings?.recommendation}</p>
              </div>
            </div>
          </div>
          {/* EXPORT */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
            <button className="export-btn" onClick={exportPptx} disabled={!pptxReady}>
              <span>↓</span>
              <span>Export to PowerPoint</span>
            </button>
          </div>
        </div>
      )}