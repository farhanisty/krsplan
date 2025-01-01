import { useParams } from "react-router-dom";
import { getById } from "./../facades/planStorage.js";
import RenderBySubject from "./../fragments/plan/renderer/RenderBySubject";
import RenderNonGrouped from "./../fragments/plan/renderer/RenderNonGrouped.jsx";
import RenderByDay from "./../fragments/plan/renderer/RenderByDay.jsx";
import {
  getEligibleSubjects,
  stringifySchedule,
} from "./../facades/planUtil.js";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoMdTime } from "react-icons/io";
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

export default function CanvasPlan() {
  const { id } = useParams();
  const plan = getById(id);

  const [groupBy, setGroupBy] = useState("none");
  const [choosedSubjects, setChoosedSubjects] = useState(
    getEligibleSubjects(plan),
  );

  const [available, setAvailable] = useState(
    choosedSubjects.map((s) => {
      return s.id;
    }),
  );

  const [choosed, setChoosed] = useState(plan.data.choosed);

  return (
    <SidebarLayout>
      <header className="my-3 mx-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Plan</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{plan.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <ScheduleTableApp />

      <section className="flex my-5 mx-5 gap-3">
        <div className="bg-slate-50 border flex-1 px-3 py-2">
          <header className="text-slate-800">Choosed</header>
          <ul className="flex flex-col gap-3">
            <li className="bg-white px-3 py-2 shadow rounded border">
              <h1 className="text-sm">Struktur Data</h1>
              <time className="text-xs">Senin 07.00-10.30</time>
              <h2 className="text-sm">Agus Sasmito</h2>
            </li>
            <li className="bg-white px-3 py-2 shadow rounded border">
              <h1 className="text-sm">Struktur Data</h1>
              <time className="text-xs">Senin 07.00-10.30</time>
              <h2 className="text-sm">Agus Sasmito</h2>
            </li>
          </ul>
        </div>
        <div className="bg-slate-50 border flex-1 px-3 py-2 max-h-[100vh] overflow-y-hidden">
          <header className="text-slate-800 pb-5 mb-3 border-b flex justify-between">
            <h1>Available</h1>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  disabled={groupBy !== "none" ? true : false}
                >
                  <Button
                    variant="outline"
                    className="text-xs"
                    disabled={groupBy !== "none" ? true : false}
                  >
                    <MdOutlineSort className="text-sm" />
                    Sort by :{" "}
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
                  <DropdownMenuItem>
                    <PiStudent />
                    Lecturer
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MdOutlineCalendarToday />
                    Day
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  <DropdownMenuItem>
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
              subjects={plan.datasource.datasource}
            />
          )}
          {groupBy === "subject" && (
            <RenderBySubject
              available={available}
              subjects={plan.datasource.datasource}
            />
          )}

          {groupBy === "day" && (
            <RenderByDay
              available={available}
              subjects={plan.datasource.datasource}
            />
          )}
        </div>
        <div className="bg-slate-50 border flex-1 px-3 py-2">
          <header className="text-slate-800">Choosed</header>
        </div>
      </section>
    </SidebarLayout>
  );
}
