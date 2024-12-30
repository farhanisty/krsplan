import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plan from "./pages/Plan.jsx";
import Datasource from "./pages/Datasource.jsx";
import SidebarLayout from "./layout/SidebarLayout.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Plan />} />
        <Route path="/datasource" element={<Datasource />} />
      </Routes>
    </Router>
  );
}

export default App;
