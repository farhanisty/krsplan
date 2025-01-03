import { useParams } from "react-router-dom";
import RenderBySubject from "./../fragments/plan/renderer/RenderBySubject";
import RenderNonGrouped from "./../fragments/plan/renderer/RenderNonGrouped.jsx";
import RenderByDay from "./../fragments/plan/renderer/RenderByDay.jsx";
import RenderByLecturer from "./../fragments/plan/renderer/RenderByLecturer.jsx";
import ChoosedRenderer from "./../fragments/plan/renderer/ChoosedRenderer.jsx";
import PlanManager from "./../facades/PlanManager.js";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SidebarLayout from "./../layout/SidebarLayout.jsx";
import { useState, useEffect, useRef } from "react";
import ScheduleTableApp from "./../fragments/plan/ScheduleTableApp";
import { PiStudent } from "react-icons/pi";
import { FaLayerGroup } from "react-icons/fa";
import { RxValueNone } from "react-icons/rx";
import { TbMathFunction } from "react-icons/tb";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlineSort } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function CanvasPlan() {
  const { id } = useParams();
  const planManager = new PlanManager(id);

  const [groupBy, setGroupBy] = useState("none");
  const [available, setAvailable] = useState(planManager.available);
  const [choosed, setChoosed] = useState(planManager.plan.data.choosed);
  const [unavailable, setunavailable] = useState([]);

  const chooseAction = (id) => {
    planManager.choose(id);

    setChoosed(planManager.choosed);
    setAvailable(planManager.available);
  };

  const unchooseAction = (id) => {
    planManager.unchoose(id);

    setChoosed(planManager.choosed);
    setAvailable(planManager.available);
  };

  return (
    <SidebarLayout>
      <header className="my-3 mx-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavLink to="/">Plan</NavLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{planManager.plan.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <ScheduleTableApp
        choosed={choosed}
        subjects={planManager.plan.datasource.datasource}
      />

      <section className="flex my-5 mx-5 gap-3 h-[100vh] bg-slate-50 overflow-y-hidden">
        <ChoosedRenderer
          choosed={choosed}
          subjects={planManager.plan.datasource.datasource}
          unchooseAction={unchooseAction}
        />
        <div className="bg-slate-50 border w-3/4 px-3 py-2 h-[100vh] overflow-y-hidden">
          <header className="text-slate-800 pb-5 mb-3 border-b flex justify-between">
            <div>
              <h1>Available</h1>
              <span className="text-sm text-slate-500">
                Total Item: {available.length}
              </span>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="text-xs">
                    <FaLayerGroup className="text-sm" />
                    Group by :{" "}
                    <span className="text-slate-500 capitalize">{groupBy}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setGroupBy("none")}
                    disabled={groupBy === "none" ? true : false}
                  >
                    <RxValueNone />
                    None
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setGroupBy("subject")}
                    disabled={groupBy === "subject" ? true : false}
                  >
                    <TbMathFunction />
                    Subject
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setGroupBy("lecturer")}
                    disabled={groupBy === "lecturer" ? true : false}
                  >
                    <PiStudent />
                    Lecturer
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setGroupBy("day")}
                    disabled={groupBy === "day" ? true : false}
                  >
                    <MdOutlineCalendarToday />
                    Day
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {groupBy === "none" && (
            <RenderNonGrouped
              available={available}
              subjects={planManager.plan.datasource.datasource}
              chooseAction={chooseAction}
            />
          )}
          {groupBy === "subject" && (
            <RenderBySubject
              available={available}
              subjects={planManager.plan.datasource.datasource}
              chooseAction={chooseAction}
            />
          )}
          {groupBy === "lecturer" && (
            <RenderByLecturer
              available={available}
              subjects={planManager.plan.datasource.datasource}
              chooseAction={chooseAction}
            />
          )}
          {groupBy === "day" && (
            <RenderByDay
              available={available}
              subjects={planManager.plan.datasource.datasource}
              chooseAction={chooseAction}
            />
          )}
        </div>
      </section>
    </SidebarLayout>
  );
}
