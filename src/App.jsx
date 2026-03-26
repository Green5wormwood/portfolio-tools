import BenefitsRealisation from "./BenefitsRealisation";
import Home from "./Home";
import JourneyMap from "./JourneyMap";
import GapAnalysis from "./GapAnalysis";
<Route path="/benefits-realisation" element={<BenefitsRealisation />} />

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey-map" element={<JourneyMap />} />
        <Route path="/gap-analysis" element={<GapAnalysis />} />
<Route path="/benefits-realisation" element={<BenefitsRealisation />} />
      </Routes>
    </BrowserRouter>
  );
}