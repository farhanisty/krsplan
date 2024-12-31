import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CiCalendar } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";

export default function DatasourceItem({ datasourceProperty }) {
  return (
    <li className="w-full bg-white rounded shadow px-3 py-2 flex justify-between items-center">
      <div>
        <h1 className="text-md">{datasourceProperty.name}</h1>
        <h2 className="text-xs text-slate-400">
          Total: {datasourceProperty.total} subject
        </h2>
        <time className="text-sm text-slate-400 mt-2 block flex items-center gap-3">
          <CiCalendar></CiCalendar> Created At: {datasourceProperty.createdAt}
        </time>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="p-2 rounded-full bg-slate-200">
              <MdNavigateNext className="text-2xl" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>More Action</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
}
