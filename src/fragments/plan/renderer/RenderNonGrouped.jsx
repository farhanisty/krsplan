import { ScrollArea } from "@/components/ui/scroll-area";
import AvailableSubjectItem from "@/components/AvailableSubjectItem";

const RenderNonGrouped = ({ available, subjects, chooseAction }) => {
  console.log(available);
  const results = available.map((a) => {
    return subjects[a - 1];
  });

  return (
    <ScrollArea className="h-[90%]">
      <ul className="flex flex-wrap justify-between mt-2 gap-2">
        {results.map((subject) => {
          return (
            <div
              key={subject.id}
              style={{
                width: "49%",
              }}
            >
              <AvailableSubjectItem
                subject={subject}
                chooseAction={chooseAction}
              />
            </div>
          );
        })}
      </ul>
    </ScrollArea>
  );
};

export default RenderNonGrouped;
