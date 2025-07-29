import SubjectItem from "@/components/SubjectItem";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

export default function ChoosedRenderer({ choosed, subjects, unchooseAction }) {
  const [totalSks, setTotalSKs] = useState(0);

  useEffect(() => {
    const totalSks = choosed.reduce((acc, curr) => {
      return acc + subjects[curr - 1].credits;
    }, 0);
    setTotalSKs(totalSks);
  }, [choosed, subjects]);

  return (
    <div className="bg-slate-50 border flex-1 px-3 py-2">
      <header className="text-slate-800 pb-3">Choosed</header>
      <span className="text-sm text-slate-500 border-b mb-3 block">
        Total SKS: {totalSks}
      </span>
      <ScrollArea className="h-[95%] mb-2">
        <ul className="flex flex-col gap-3">
          {choosed.map((cId) => {
            return (
              <SubjectItem key={cId} subject={subjects[cId - 1]}>
                <SubjectItem.Body>
                  <Button
                    onClick={() => {
                      unchooseAction(cId);
                    }}
                    className="bg-red-400 hover:bg-red-500 w-full"
                  >
                    Unchoose
                  </Button>
                </SubjectItem.Body>
              </SubjectItem>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}
