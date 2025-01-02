import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubjectItem from "@/components/SubjectItem";
import GroupedSubject from "@/components/GroupedSubject";
import { splitArray } from "./../../../facades/util.js";

const RenderByDay = ({ available, subjects, chooseAction }) => {
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
      <GroupedSubject
        groupedSubjects={subjectGroupedByDay}
        chooseAction={chooseAction}
      />
    </ScrollArea>
  );
};

export default RenderByDay;
