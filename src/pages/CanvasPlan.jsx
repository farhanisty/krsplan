import { useParams } from "react-router-dom";
import { getById } from "./../facades/planStorage.js";
import {
  UnchoosedSubjectEliminator,
  OverlapTimeEliminator,
  ChoosedSubjectEliminator,
} from "krsplan-engine";
import { getEligibleSubjects } from "./../facades/planUtil.js";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoMdTime } from "react-icons/io";
import { PiStudent } from "react-icons/pi";

const choose = (id, available, choosen, unavailable, subjects) => {
  const choosedSubject = subjects[id - 1];

  const eliminator = new UnchoosedSubjectEliminator(choosedSubject.name);
  eliminator.setNext(new OverlapTimeEliminator(choosedSubject.schedule));

  const newUnavailable = [...unavailable];
  const newAvailable = [];

  for (const aId of available) {
    const targetSubject = subjects[aId - 1];
    const reason = [];
    eliminator.execute(targetSubject, reason);

    if (reason.length === 0) {
      newAvailable.push(aId);
    } else {
      newUnavailable.push(aId);
    }
  }

  return [newAvailable, [...choosen, id], newUnavailable];
};

const stringifySchedule = (schedule) => {
  return `${schedule.day} ${schedule.intervalTime.start.hour}:${schedule.intervalTime.start.minute}-${schedule.intervalTime.end.hour}:${schedule.intervalTime.end.minute}`;
};

export default function CanvasPlan() {
  const { id } = useParams();
  const plan = getById(id);

  const [choosedSubjects, setChoosedSubjects] = useState(
    getEligibleSubjects(plan),
  );

  const [available, setAvailable] = useState(
    choosedSubjects.map((s) => {
      return s.id;
    }),
  );

  const [choosen, setChoosen] = useState(plan.data.choosed);

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
        <div className="bg-slate-50 border flex-1 px-3 py-2 h-[800px] overflow-y-hidden">
          <header className="text-slate-800 pb-5 mb-3 border-b">
            Available
          </header>

          <RenderNonGrouped
            available={available}
            subjects={plan.datasource.datasource}
          />
        </div>
        <div className="bg-slate-50 border flex-1 px-3 py-2">
          <header className="text-slate-800">Choosed</header>
        </div>
      </section>
    </SidebarLayout>
  );
}

function RenderNonGrouped({ available, subjects }) {
  const results = available.map((a) => {
    return subjects[a - 1];
  });

  return (
    <ScrollArea className="h-[90%]">
      <ul className="flex flex-col mt-2 gap-2">
        {results.map((s) => {
          return (
            <li key={s.id} className="bg-white px-3 py-2 shadow rounded border">
              <h1 className="text-sm font-semibold">{s.name}</h1>
              <time className="text-xs flex items-center my-2 gap-2">
                <IoMdTime className="text-lg" />
                <span>{stringifySchedule(s.schedule)}</span>
              </time>
              <ul className="flex gap-2">
                <PiStudent className="text-lg" />
                <div>
                  {s.lecturers.map((lecturer) => {
                    return (
                      <li key={lecturer} className="text-sm">
                        {lecturer}
                      </li>
                    );
                  })}
                </div>
              </ul>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}

function RenderByLecturer({ available, subjects }) {
  const subjectsGroupLecturer = [];

  for (const a of available) {
    const subject = subjects[a - 1];

    const groupItem = subjectsGroupLecturer.find((s) => {
      return s.name === subject.name;
    });

    if (groupItem) {
      groupItem.data.push(subject);
    } else {
      subjectsGroupLecturer.push({
        name: subject.name,
        data: [subject],
      });
    }
  }
  return <h1>hello world</h1>;
}

function RenderBySubject({ available, subjects }) {
  const subjectsGroupName = [];

  for (const a of available) {
    const subject = subjects[a - 1];

    const groupItem = subjectsGroupName.find((s) => {
      return s.name === subject.name;
    });

    if (groupItem) {
      groupItem.data.push(subject);
    } else {
      subjectsGroupName.push({
        name: subject.name,
        data: [subject],
      });
    }
  }

  return (
    <ScrollArea className="h-[90%]">
      <Accordion type="multiple" className="overflow-y-hidden" collapsible>
        {subjectsGroupName.map((groupedItem) => {
          return (
            <AccordionItem key={groupedItem.name} value={groupedItem.name}>
              <AccordionTrigger className="bg-white px-3 font-bold">
                {groupedItem.name}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col mt-2 gap-2">
                  {groupedItem.data.map((subject) => {
                    return (
                      <li
                        key={subject.id}
                        className="bg-white px-3 py-2 shadow rounded border"
                      >
                        <h1 className="text-sm font-semibold">
                          {subject.name}
                        </h1>
                        <time className="text-xs flex items-center my-2 gap-2">
                          <IoMdTime className="text-lg" />
                          <span>{stringifySchedule(subject.schedule)}</span>
                        </time>
                        <ul className="flex gap-2">
                          <PiStudent className="text-lg" />
                          <div>
                            {subject.lecturers.map((lecturer) => {
                              return (
                                <li key={lecturer} className="text-sm">
                                  {lecturer}
                                </li>
                              );
                            })}
                          </div>
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ScrollArea>
  );
}
