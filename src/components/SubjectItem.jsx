import { stringifySchedule } from "./../facades/planUtil.js";
import { IoMdTime } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { FaRegBuilding } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import { Button } from "@/components/ui/button";

export default function SubjectItem({ subject }) {
  return (
    <li key={subject.id} className="bg-white px-3 py-2 shadow rounded border">
      <div className="border-b ">
        <h1 className="text-sm font-semibold ">{subject.name}</h1>
      </div>
      <div className="flex space-between gap-2 border-b py-1 w-full border-b text-slate-600">
        <div className="flex-1 border-r pr-3">
          <time className="text-sm flex items-center my-2 gap-2">
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
        </div>
        <div className="pr-3 flex-1">
          <time className="text-xs flex items-center my-2 gap-2">
            <FaRegBuilding className="text-lg" />
            <span className="text-sm">{subject.classRoom}</span>
          </time>
          <ul className="flex gap-2">
            <TiGroupOutline className="text-lg" />
            <span className="text-sm">{subject.className}</span>
          </ul>
        </div>
      </div>

      <div className="py-3">
        <Button className="w-full bg-blue-400 hover:bg-blue-500">Choose</Button>
      </div>
    </li>
  );
}
