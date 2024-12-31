import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plan from "./pages/Plan.jsx";
import CreatePlan from "./pages/CreatePlan.jsx";
import Datasource from "./pages/Datasource.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Plan />} />
        <Route path="/plan/create" element={<CreatePlan />} />
        <Route path="/datasource" element={<Datasource />} />
      </Routes>
    </Router>
  );
}

export default App;
