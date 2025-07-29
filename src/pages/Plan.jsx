import SidebarLayout from "./../layout/SidebarLayout.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import DatasourceLayout from "./../layout/DatasourceLayout.jsx";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { get } from "./../facades/planStorage.js";
import { MdNavigateNext } from "react-icons/md";
import { CiCalendar, CiPlane } from "react-icons/ci";
import { BiTask } from "react-icons/bi";

export default function Plan() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans(get());
  }, []);
  return (
    <SidebarLayout activePage="plan">
      <header className="my-3 mx-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavLink to="/">Plan</NavLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="w-full px-5 flex my-10">
        <NavLink to="/plan/create">
          <Button>Create new plan</Button>
        </NavLink>
      </div>
      <div className="w-full px-5 flex">
        <div className="flex w-1/2 p-2">
          <DatasourceLayout>
            <DatasourceLayout.Header>All</DatasourceLayout.Header>
            <DatasourceLayout.Body>
              {plans.length === 0 ? (
                <h1 className="text-center">Plan is empty!</h1>
              ) : (
                <ul className="mt-5 flex flex-col gap-3">
                  {plans.map((plan) => {
                    return (
                      <li
                        className="w-full bg-white border rounded p-3 flex justify-between items-center"
                        key={plan.id}
                      >
                        <div>
                          <label
                            htmlFor={`plan-${plan.id}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <h1 className="text-gray-700">
                              <BiTask className="inline mr-1"/> 

                              {plan.name}
                            </h1>
                            <time className="text-sm text-slate-400 mt-2 block flex items-center gap-3">
                              <CiCalendar /> Created At: {plan.createdAt}
                            </time>
                          </label>
                        </div>
                        <NavLink to={`/plan/${plan.id}`}>
                          <button className="hover:bg-slate-300 w-[40px] h-[40px] rounded-full bg-slate-200 flex justify-center items-center">
                            <MdNavigateNext className="text-xl" />
                          </button>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </DatasourceLayout.Body>
          </DatasourceLayout>
        </div>
      </div>
    </SidebarLayout>
  );
}
