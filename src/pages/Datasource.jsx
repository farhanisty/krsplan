import SidebarLayout from "./../layout/SidebarLayout.jsx";
import DatasourceLayout from "./../layout/DatasourceLayout.jsx";
import DatasourceItem from "./../components/DatasourceItem";
import { SubjectParserImpl } from "krsplan-engine";
import { useRef, useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CiCircleAlert } from "react-icons/ci";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { insert } from "./../facades/datasourceStorage.js";

function CreateDatasource() {
  const nameRef = useRef(null);
  const dataRef = useRef(null);

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      const subjectParserImpl = new SubjectParserImpl(dataRef.current.value);
      insert(nameRef.current.value, subjectParserImpl.parse());
    } catch (e) {
      console.log(e);
      setError({
        message: "Data format unrecognized!",
      });
    }
  };

  return (
    <DatasourceLayout>
      <DatasourceLayout.Header>Create New</DatasourceLayout.Header>
      <DatasourceLayout.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="text-sm" htmlFor="name">
              Name
            </label>
            <input
              ref={nameRef}
              className="block border rounded px-3 py-2 mt-2 w-full"
              type="text"
              id="name"
              placeholder="Datasource name"
              required
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="data">
              Data
            </label>
            <textarea
              ref={dataRef}
              className="block w-full py-2 px-3 mt-2 min-h-[500px] resize-none border"
              required
              name=""
              id="data"
            ></textarea>
          </div>
          {error && (
            <Alert className="mt-5" variant="destructive">
              <CiCircleAlert className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          <div className="mt-5">
            <Button type="submit" className="mr-3">
              Create
            </Button>
            <Button className="shadow" variant="secondary" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </DatasourceLayout.Body>
    </DatasourceLayout>
  );
}

export default function Datasource() {
  const [datasource, setDatasource] = useState([]);

  useEffect(() => {
    const localStorageItems =
      JSON.parse(localStorage.getItem("KRSPLAN_DATASOURCE")) || [];

    const datasourceFormatMapped = localStorageItems.map((item) => {
      return {
        id: item.id,
        name: item.name,
        createdAt: item.createdAt,
        total: item.datasource.length,
      };
    });

    setDatasource(datasourceFormatMapped);
  }, []);

  return (
    <SidebarLayout>
      <header className="my-3 mx-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="w-full px-5 flex my-10">
        <div className="flex-1 p-2">
          <DatasourceLayout>
            <DatasourceLayout.Header>All</DatasourceLayout.Header>
            <DatasourceLayout.Body>
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
            </DatasourceLayout.Body>
          </DatasourceLayout>
        </div>
        <div className="flex-1 p-2">
          <CreateDatasource></CreateDatasource>
        </div>
      </div>
    </SidebarLayout>
  );
}
