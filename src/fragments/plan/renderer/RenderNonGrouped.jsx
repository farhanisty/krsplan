import { ScrollArea } from "@/components/ui/scroll-area";
import SubjectItem from "@/components/SubjectItem";

const RenderNonGrouped = ({ available, subjects, chooseAction }) => {
  console.log(available);
  const results = available.map((a) => {
    return subjects[a - 1];
  });

  return (
    <ScrollArea className="h-[90%]">
      <ul className="flex flex-col mt-2 gap-2">
        {results.map((subject) => {
          return (
            <SubjectItem key={subject.id} subject={subject}>
              <SubjectItem.Body>
                <SubjectItem.ActionButton
                  onClick={() => {
                    chooseAction(subject.id);
                  }}
                >
                  Choose
                </SubjectItem.ActionButton>
              </SubjectItem.Body>
            </SubjectItem>
          );
        })}
      </ul>
    </ScrollArea>
  );
};

export default RenderNonGrouped;
