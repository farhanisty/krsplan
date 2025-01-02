import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AvailableSubjectItem from "@/components/AvailableSubjectItem";

const GroupedSubject = ({ groupedSubjects, chooseAction }) => {
  return (
    <Accordion
      type="multiple"
      className="overflow-y-hidden flex flex-col"
      collapsible
    >
      {groupedSubjects.map((groupedItem) => {
        return (
          <AccordionItem key={groupedItem.name} value={groupedItem.name}>
            <AccordionTrigger className="bg-white px-3 font-bold">
              {groupedItem.name}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col mt-2 gap-2">
                {groupedItem.data.map((subject) => {
                  return (
                    <AvailableSubjectItem
                      key={subject.id}
                      subject={subject}
                      chooseAction={chooseAction}
                    />
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default GroupedSubject;
