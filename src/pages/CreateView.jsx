import SidebarLayout from "./../layout/SidebarLayout.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { get as getPlan } from "./../facades/planStorage.js";
import { insert as insertView } from "./../facades/viewStorage.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlanLayout from "@/layout/PlanLayout.jsx";

const moveItem = (collection, targetCollection, callback) => {
  const item = collection.find((i) => {
    return callback(i);
  });

  if (!item) {
    return [collection, targetCollection, null];
  }

  const newCollection = collection.filter((i) => {
    return i.id !== item.id; 
  });

  const newTargetCollection = [item, ...targetCollection];

  return [newCollection, newTargetCollection, item];
};

export default function CreateView() {
  const [unselectedPlans, setUnselectedPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);

  const inputNameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const allPlans = getPlan();
    setUnselectedPlans(allPlans);
  }, []);

  useEffect(() => {
    console.log(unselectedPlans);
  }, [unselectedPlans]);

  const handleSubmitCreateForm = (e) => {
    e.preventDefault();

    const viewName = inputNameRef.current.value;
    const selectedPlanIds = selectedPlans.map((plan) => plan.id);

    if (!viewName.trim()) {
      console.error("Nama View tidak boleh kosong.");
      return;
    }

    if (selectedPlanIds.length === 0) {
      console.error("Pilih setidaknya satu rencana untuk membuat view.");
      return;
    }

    try {
      insertView(viewName, selectedPlanIds);
      navigate("/view"); 
    } catch (e) {
      console.error("Gagal membuat view:", e);
    }
  };

  const handleOnSelectPlan = (e) => {
    const planName = e.target.value;
    const [newUnselectedPlans, newSelectedPlans, item] = moveItem(
      unselectedPlans,
      selectedPlans,
      (i) => i.name === planName, 
    );

    if (item) {
      
      setUnselectedPlans(newUnselectedPlans);
      setSelectedPlans(newSelectedPlans);
    }
  };

  const handleOnUnselectPlan = (e) => {
    const planName = e.target.value;
    const [newSelectedPlans, newUnselectedPlans, item] = moveItem(
      selectedPlans,
      unselectedPlans,
      (i) => i.name === planName,
    );

    if (item) {
      setSelectedPlans(newSelectedPlans);
      setUnselectedPlans(newUnselectedPlans);
    }
  };

  return (
    <SidebarLayout activePage="view">
      <Header />
      <div className="w-full px-5 flex flex-col md:flex-row gap-5">
        <div className="flex-1 p-2 md:w-1/2">
          <PlanLayout>
            <PlanLayout.Header>Create View Form</PlanLayout.Header>
            <PlanLayout.Body>
              <form onSubmit={handleSubmitCreateForm}>
                <div className="mb-3">
                  <label className="text-sm" htmlFor="name">
                    View Name
                  </label>
                  <input
                    className="block border rounded px-3 py-2 mt-2 w-full"
                    ref={inputNameRef}
                    type="text"
                    id="name"
                    placeholder="Nama View Anda"
                    required
                  />
                </div>
                <Button
                  className="mt-3"
                  type="submit"
                  disabled={selectedPlans.length === 0}
                >
                  Create View
                </Button>
              </form>
            </PlanLayout.Body>
          </PlanLayout>
        </div>

        <div className="flex-1 p-2 md:w-1/2">
          <PlanLayout>
            <PlanLayout.Header>Choose Plans for View</PlanLayout.Header>
            <PlanLayout.Body>
              {unselectedPlans.length === 0 && selectedPlans.length === 0 ? (
                <h1 className="text-slate-400 text-center">
                  Tidak ada rencana tersedia.
                </h1>
              ) : (
                <ScrollArea className="w-full h-[70vh] pr-4">
                  <ul className="space-y-3">
                    {selectedPlans.map((plan) => (
                      <PlanItem
                        key={plan.id}
                        plan={plan}
                        handleOnChange={handleOnUnselectPlan} 
                        variant={true} 
                      />
                    ))}
                    {unselectedPlans.map((plan) => (
                      <PlanItem
                        key={plan.id}
                        plan={plan}
                        handleOnChange={handleOnSelectPlan}
                        variant={false} 
                      />
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </PlanLayout.Body>
          </PlanLayout>
        </div>
      </div>
    </SidebarLayout>
  );
}

function Header() {
  return (
    <header className="my-3 mx-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <NavLink to="/plan">Plan</NavLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}


function PlanItem({ plan, handleOnChange, variant = false }) {
  return (
    <li className="bg-white w-full rounded border px-3 py-2 flex items-center gap-5 shadow-sm">
      <input
        type="checkbox"
        onChange={handleOnChange}
        value={plan.name} 
        checked={variant} 
        className="form-checkbox h-5 w-5 text-blue-600 rounded" 
      />
      <div className="flex w-full items-center gap-2">
        <h1 className="text-lg font-medium text-gray-800">{plan.name}</h1>
        <span className="text-sm text-gray-500 ml-auto">
          Dibuat: {plan.createdAt}
        </span>
      </div>
    </li>
  );
}
