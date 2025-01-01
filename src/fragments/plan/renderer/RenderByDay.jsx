import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubjectItem from "@/components/SubjectItem";

const RenderByDay = ({ available, subjects }) => {
  const subjectGroupedByDay = [];
  let tempDay = null;
  let count = 0;

  for (const a of available) {
    const subject = subjects[a - 1];
    if (tempDay === null) {
      tempDay = subject.schedule.day;
      subjectGroupedByDay.push({
        name: subject.schedule.day,
        data: [subject],
      });
      continue;
    }

    if (tempDay === subject.schedule.day) {
      subjectGroupedByDay[count].data.push(subject);
    } else {
      count++;
      subjectGroupedByDay.push({
        name: subject.schedule.day,
        data: [subject],
      });
      tempDay = subject.schedule.day;
    }
  }

  return (
    <ScrollArea className="h-[90%]">
      <Accordion type="multiple" className="overflow-y-hidden" collapsible>
        {subjectGroupedByDay.map((groupedItem) => {
          return (
            <AccordionItem key={groupedItem.name} value={groupedItem.name}>
              <AccordionTrigger className="bg-white px-3 font-bold">
                {groupedItem.name}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col mt-2 gap-2">
                  {groupedItem.data.map((subject) => {
                    return (
                      <SubjectItem key={subject.id} subject={subject}>
                        <SubjectItem.Body>
                          <SubjectItem.ActionButton>
                            Choose
                          </SubjectItem.ActionButton>
                        </SubjectItem.Body>
                      </SubjectItem>
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
};

export default RenderByDay;
