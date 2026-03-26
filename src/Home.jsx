import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .home {
    font-family: 'DM Sans', sans-serif;
    background: #0e0e0e;
    color: #e8e2d9;
    min-height: 100vh;
    max-width: 760px;
    margin: 0 auto;
    padding: 80px 32px;
  }
  .home-header { margin-bottom: 64px; }
  .home-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 400;
    line-height: 1.15;
    margin-bottom: 16px;
  }
  .home-header h1 em { font-style: italic; color: #7eb8a4; }
  .home-header p {
    font-size: 0.9rem;
    color: #5a5550;
    font-weight: 300;
    line-height: 1.7;
    max-width: 480px;
  }
  .tools-label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #3a3530;
    margin-bottom: 20px;
    font-weight: 500;
  }
  .tool-card {
    background: #111;
    border: 1px solid #1e1e1e;
    border-radius: 4px;
    padding: 28px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tool-card:hover { border-color: #7eb8a4; background: #131313; }
  .tool-card-left h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 400;
    color: #e8e2d9;
    margin-bottom: 6px;
  }
  .tool-card-left p {
    font-size: 0.82rem;
    color: #5a5550;
    font-weight: 300;
    line-height: 1.5;
  }
  .tool-card-arrow {
    color: #3a3530;
    font-size: 1.2rem;
    transition: color 0.2s, transform 0.2s;
  }
  .tool-card:hover .tool-card-arrow { color: #7eb8a4; transform: translateX(4px); }
  .footer {
    margin-top: 64px;
    font-size: 0.72rem;
    color: #2a2a2a;
    font-weight: 300;
  }
`;

const tools = [
  {
    path: "/journey-map",
    name: "Customer Journey Map",
    description: "Synthesise interview notes into a structured journey map with stages, emotional curve, pain points, and opportunities."
  },
  {
    path: "/gap-analysis",
    name: "Tool Gap Analysis",
    description: "Compare ideal process steps against what a tool actually supports — per role, with gap types and severity."
  }
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <style>{styles}</style>
      <div className="home-header">
        <h1>
  <span style={{ color: "#7eb8a4" }}>Portfolio</span><br />
  <span style={{ color: "#7eb8a4" }}><em>Tools</em></span>
</h1>
<div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#1a3a5c", marginTop: "12px" }}> by Ioana Emilia</div>
        <p>A collection of AI-powered research and analysis tools. Each uses your own Anthropic API key — no data stored, session only.</p>
      </div>
      <div className="tools-label">Available Tools</div>
      {tools.map(tool => (
        <div className="tool-card" key={tool.path} onClick={() => navigate(tool.path)}>
          <div className="tool-card-left">
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
          </div>
          <div className="tool-card-arrow">→</div>
        </div>
      ))}
      <div className="footer">
  <div style={{ marginBottom: 12, color: "#e8e2d9", fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}></div>
  <div>Session only · No storage · Powered by Claude</div>
</div>
    </div>
  );
}