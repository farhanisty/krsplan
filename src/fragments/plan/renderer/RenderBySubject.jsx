import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import GroupedSubject from "@/components/GroupedSubject";
import { splitArray } from "./../../../facades/util.js";

const RenderBySubject = ({ available, subjects, chooseAction }) => {
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

  const [firstArray, secondArray] = splitArray(subjectsGroupName);

  return (
    <div className="h-[90%] flex flex-row gap-2">
      <ScrollArea className="flex-1">
        <GroupedSubject
          groupedSubjects={firstArray}
          chooseAction={chooseAction}
        />
      </ScrollArea>
      <ScrollArea className="flex-1">
        <GroupedSubject
          groupedSubjects={secondArray}
          chooseAction={chooseAction}
        />
      </ScrollArea>
    </div>
  );
};

export default RenderBySubject;
