import SidebarLayout from "./../layout/SidebarLayout.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import DatasourceLayout from "./../layout/DatasourceLayout.jsx";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { get as getViews } from "./../facades/viewStorage.js"; 
import { MdNavigateNext } from "react-icons/md"; 
import { CiCalendar, CiMonitor } from "react-icons/ci";

export default function View() {
  const [allViews, setAllViews] = useState([]);
  const [selectedPlanIds, setSelectedPlanIds] = useState([]);

  useEffect(() => {
    setAllViews(getViews());
  }, []);

  return (
    <SidebarLayout activePage="view">
      <header className="my-3 mx-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavLink to="/view">View</NavLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="w-full px-5 flex my-10">
        <NavLink to="/view/create">
          <Button>Create New View</Button>
        </NavLink>
      </div>

      <div className="w-full px-5 flex flex-col md:flex-row my-10 gap-5">
        <div className="flex p-2 w-1/2">
          <DatasourceLayout>
            <DatasourceLayout.Header>All</DatasourceLayout.Header>
            <DatasourceLayout.Body>
              {allViews.length === 0 ? (
                <h1 className="text-center text-gray-500">No views available, create one first!</h1>
              ) : (
                <ul className="space-y-3">
                  {allViews.map((view) => (
                    <li
                      className="w-full bg-white border rounded p-3 flex justify-between items-center"
                      key={view.id}
                    >
                      <div className="flex items-center space-x-3">
                        <label
                          htmlFor={`plan-${view.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <h1 className="text-gray-800">
                          <CiMonitor className="inline mr-1"/> 
                            {view.name}
                          </h1>
                          <time className="text-sm text-slate-400 mt-2 block flex items-center gap-3">
                            <CiCalendar /> Created At: {view.createdAt}
                          </time>
                        </label>
                      </div>
                      <NavLink to={`/view/${view.id}`}>
                        <button className="hover:bg-slate-300 w-[40px] h-[40px] rounded-full bg-slate-200 flex justify-center items-center">
                          <MdNavigateNext className="text-xl" />
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </DatasourceLayout.Body>
          </DatasourceLayout>
        </div>
             </div>
    </SidebarLayout>
  );
}
