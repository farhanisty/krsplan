import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubjectItem from "@/components/SubjectItem";

const RenderBySubject = ({ available, subjects }) => {
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

export default RenderBySubject;
