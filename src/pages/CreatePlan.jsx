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
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { get as getDatasource } from "./../facades/datasourceStorage.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { insert } from "./../facades/planStorage.js";

const moveItem = (collection, targetCollection, callback) => {
  const item = collection.find((i) => {
    return callback(i);
  });

  const newCollection = collection.filter((i) => {
    return i != item;
  });

  const newTargetCollection = [item, ...targetCollection];

  return [newCollection, newTargetCollection, item];
};

export default function CreatePlan() {
  const [datasources, setDatasources] = useState([]);
  const [choosedDatasource, setChoosedDatasource] = useState(null);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [creditCount, setCreditCount] = useState(0);

  const inputNameRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmitCreateForm = (e) => {
    e.preventDefault();

    const name = inputNameRef.current.value;
    const datasourceId = choosedDatasource.id;
    const subjects = selectedSubjects.map((s) => s.name);

    try {
      insert(name, datasourceId, subjects);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnSelectSubject = (e) => {
    const [newUniqueSubjects, newSelectedSubjects, item] = moveItem(
      uniqueSubjects,
      selectedSubjects,
      (i) => {
        return i.name == e.target.value;
      },
    );

    setCreditCount(creditCount + item.credits);
    setSelectedSubjects(newSelectedSubjects);
    setUniqueSubjects(newUniqueSubjects);
  };

  const handleOnUnselectSubject = (e) => {
    const [newSelectedSubjects, newUniqueSubjects, item] = moveItem(
      selectedSubjects,
      uniqueSubjects,
      (i) => {
        return i.name == e.target.value;
      },
    );
    setCreditCount(creditCount - item.credits);

    setUniqueSubjects(newUniqueSubjects);
    setSelectedSubjects(newSelectedSubjects);
  };

  const handleChangeDatasource = (e) => {
    if (e.target.value === "0") {
      return;
    }

    const choosed = datasources.find((ds) => {
      return ds.id == e.target.value;
    });

    setChoosedDatasource(choosed);
  };

  useEffect(() => {
    setDatasources(getDatasource());
  }, []);

  useEffect(() => {
    if (choosedDatasource === null) {
      return;
    }

    setCreditCount(0);
    setSelectedSubjects([]);

    const uniqueData = choosedDatasource.datasource.reduce((acc, current) => {
      if (!acc.some((item) => item.name === current.name)) {
        acc.push(current);
      }
      return acc;
    }, []);

    setUniqueSubjects(uniqueData);
  }, [choosedDatasource]);

  return (
    <SidebarLayout activePage="plan">
      <Header />
      <div className="w-full px-5 flex">
        <div className="flex-1 p-2">
          <DatasourceLayout>
            <DatasourceLayout.Header>Create Plan Form</DatasourceLayout.Header>
            <DatasourceLayout.Body>
              <form onSubmit={handleSubmitCreateForm}>
                <div className="mb-3">
                  <label className="text-sm" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="block border rounded px-3 py-2 mt-2 w-full"
                    ref={inputNameRef}
                    type="text"
                    id="name"
                    placeholder="Plan name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm" htmlFor="name">
                    Datasource
                  </label>

                  <select
                    className="w-full bg-white px-2 py-3 border rounded"
                    name=""
                    id=""
                    onChange={handleChangeDatasource}
                  >
                    <option value="0">Select Datasource</option>
                    {datasources.map((ds) => {
                      return (
                        <option key={ds.id} value={ds.id}>
                          {ds.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Button
                  className="mt-3"
                  disabled={creditCount === 0}
                  onClick={() => console.log("hello world")}
                >
                  Create Plan
                </Button>
              </form>
            </DatasourceLayout.Body>
          </DatasourceLayout>
        </div>

        <div className="flex-1 p-2">
          <DatasourceLayout>
            <DatasourceLayout.Header>Choose Subject</DatasourceLayout.Header>
            <DatasourceLayout.Body>
              {choosedDatasource != null ? (
                <>
                  <div className="bg-white px-3 w-fit shadow border py-2 mb-3">
                    total sks: {creditCount}
                  </div>
                  <ScrollArea className="w-full h-[70vh]">
                    <ul>
                      {selectedSubjects.map((subject) => {
                        return (
                          <DatasourceItem
                            key={subject.id}
                            subject={subject}
                            handleOnChange={handleOnUnselectSubject}
                            variant={true}
                          />
                        );
                      })}
                      {uniqueSubjects.map((subject) => {
                        return (
                          <DatasourceItem
                            key={subject.id}
                            subject={subject}
                            handleOnChange={handleOnSelectSubject}
                          />
                        );
                      })}
                    </ul>
                  </ScrollArea>
                </>
              ) : (
                <h1 className="text-slate-400">Choose datasource first</h1>
              )}
            </DatasourceLayout.Body>
          </DatasourceLayout>
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
            <NavLink to="/">Plan</NavLink>
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

function DatasourceItem({ subject, handleOnChange, variant = false }) {
  return (
    <li className="bg-white w-full rounded border px-3 py-2 flex items-center gap-5">
      <input
        type="checkbox"
        onChange={handleOnChange}
        value={subject.name}
        checked={variant}
      />
      <div className="flex w-full items-center gap-2">
        <h1 className="">{subject.name}</h1>
        <span className="text-slate-400">|</span>
        <h2 className="text-slate-400 text-xs">SKS: {subject.credits}</h2>
      </div>
    </li>
  );
}
