import SidebarLayout from "./../layout/SidebarLayout.jsx";
import DatasourceLayout from "./../layout/DatasourceLayout.jsx";
import DatasourceItem from "./../components/DatasourceItem";
import CreateDatasource from "./../fragments/datasource/CreateDatasource";
import { useState, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { get, insert } from "./../facades/datasourceStorage.js";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [importDatasource, setImportDatasource] = useState(null);
  const [inputImportedName, setInputImportedName] = useState("");

  const handleImportDatasource = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error("Tidak ada file yang dipilih.");
      return;
    }

    if (!window.DecompressionStream) {
      console.error("DecompressionStream tidak didukung di browser ini.");
      return;
    }

    try {
      const decompressionStream = new DecompressionStream("gzip");
      const readableStream = file.stream().pipeThrough(decompressionStream);

      const reader = readableStream.getReader();
      const decoder = new TextDecoder();
      let result = "";
      let done = false;

      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;
        if (value) {
          result += decoder.decode(value, { stream: true });
        }
      }

      result += decoder.decode();

      try {
        const jsonData = JSON.parse(result);
        setImportDatasource(jsonData);
        setInputImportedName(jsonData.name);
      } catch (parseError) {
        console.log(parseError);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveImport = () => {
    console.log(JSON.stringify(importDatasource.datasource));
    insert(inputImportedName, importDatasource.datasource);
    setDatasource(get());
    setInputImportedName("");
    setImportDatasource(null);
  };

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

      <section className="mx-5">
        <Dialog>
          <DialogTrigger>
            <Button>Import</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Import Datasource</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Label className="mb-3 block">
                File(must be .krsource extension)
              </Label>
              <Input type="file" onChange={handleImportDatasource}></Input>

              {importDatasource !== null && (
                <>
                  <div className="mt-5">
                    <Label className="mb-3 block">Datasource name</Label>
                    <Input
                      type="text"
                      value={inputImportedName}
                      onChange={(e) => {
                        setInputImportedName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-5">
                    <Button onClick={handleSaveImport}>Save</Button>
                  </div>
                </>
              )}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </section>

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
