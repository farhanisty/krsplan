import SidebarLayout from "./../layout/SidebarLayout.jsx";
import DatasourceLayout from "./../layout/DatasourceLayout.jsx";
import DatasourceItem from "./../components/DatasourceItem";
import CreateDatasource from "./../fragments/datasource/CreateDatasource";
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { get } from "./../facades/datasourceStorage.js";
import { NavLink } from "react-router-dom";

export default function Datasource() {
  const localStorageDatasources = get();
  const datasourceFormatMapped = localStorageDatasources.map((item) => {
    return {
      id: item.id,
      name: item.name,
      createdAt: item.createdAt,
      total: item.datasource.length,
    };
  });

  const [datasource, setDatasource] = useState(datasourceFormatMapped);

  const updateDatasourceState = (ds) => {
    setDatasource(ds);
  };

  return (
    <SidebarLayout activePage="datasource">
      <header className="my-3 mx-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavLink to="/datasource">Datasource</NavLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="w-full px-5 flex my-10">
        <div className="flex-1 p-2">
          <DatasourceLayout>
            <DatasourceLayout.Header>All</DatasourceLayout.Header>
            <DatasourceLayout.Body>
              {datasource.length === 0 ? (
                <p className="text-center text-slate-600">Empty!</p>
              ) : (
                <ul className="mt-5 flex flex-col gap-3">
                  {datasource.map((datasource) => {
                    return (
                      <DatasourceItem
                        key={datasource.name}
                        datasourceProperty={datasource}
                      />
                    );
                  })}
                </ul>
              )}
            </DatasourceLayout.Body>
          </DatasourceLayout>
        </div>
        <div className="flex-1 p-2">
          <CreateDatasource updateDatasourceState={updateDatasourceState} />
        </div>
      </div>
    </SidebarLayout>
  );
}
