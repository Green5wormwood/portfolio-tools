import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import JourneyMap from "./JourneyMap";
import GapAnalysis from "./GapAnalysis";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey-map" element={<JourneyMap />} />
        <Route path="/gap-analysis" element={<GapAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}