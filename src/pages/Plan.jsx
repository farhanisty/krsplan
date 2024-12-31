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

export default function Plan() {
  const [datasources, setDatasources] = useState([]);
  return (
    <SidebarLayout activePage="plan">
      <header className="my-3 mx-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Plan</BreadcrumbLink>
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
              {datasources.length === 0 && (
                <h1 className="text-center">Plan is empty!</h1>
              )}
            </DatasourceLayout.Body>
          </DatasourceLayout>
        </div>
      </div>
    </SidebarLayout>
  );
}
