import SidebarLayout from "../layout/SidebarLayout.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getById } from "../facades/planStorage.js"; 
import ViewManager from "@/facades/ViewManager.js";
import ScheduleTableApp from "@/fragments/plan/ScheduleTableApp.jsx";

export default function ViewPlans() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allPlans, setAllPlans] = useState([]);

  useEffect(() => {
    const viewManager = new ViewManager(id);
    const planIds = viewManager.view.planIds || [];
    const plans = planIds.map((planId) => {
      const plan = getById(planId);
      return plan ? { ...plan, id: planId } : null; 
    });
    setAllPlans(plans.filter(Boolean)); 
  }, [id]);

 

  return (
    <SidebarLayout activePage="preview-plans">
      <header className="my-3 mx-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavLink to="/view">View</NavLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View Plans</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="w-full px-5 flex flex-col md:flex-row my-10 gap-5">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Plan List</h2>
          <ul className="space-y-4">
            {allPlans.map((plan) => (
              <li key={plan.id} className="p-4 border rounded-md shadow-sm">
                <h3 className="text-lg font-medium">{plan.name}</h3>
                <p className="text-sm text-gray-600">
                  Created At: {plan.createdAt}
                </p>
                <ScheduleTableApp choosed={plan.data.choosed} subjects={plan.datasource.datasource}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SidebarLayout>
  );
}
