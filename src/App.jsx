import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plan from "./pages/Plan.jsx";
import CreatePlan from "./pages/CreatePlan.jsx";
import CanvasPlan from "./pages/CanvasPlan.jsx";
import Datasource from "./pages/Datasource.jsx";
import DetailDatasource from "./pages/DetailDatasource.jsx";
import NotFound from "./pages/NotFound.jsx";
import View from "./pages/View.jsx";
import CreateView from "./pages/CreateView.jsx";
import ViewPlans from "./pages/ViewPlans.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Plan />} />
        <Route path="/plan/create" element={<CreatePlan />} />
        <Route path="/plan/:id" element={<CanvasPlan />} />
        <Route path="/datasource" element={<Datasource />} />
        <Route path="/datasource/:id" element={<DetailDatasource />} />
        <Route path="/view" element={<View />} />
        <Route path="/view/:id" element={<ViewPlans />} />
        <Route path="/view/create" element={<CreateView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

