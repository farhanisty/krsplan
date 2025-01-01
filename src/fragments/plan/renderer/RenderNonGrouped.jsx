import { ScrollArea } from "@/components/ui/scroll-area";
import SubjectItem from "@/components/SubjectItem";

const RenderNonGrouped = ({ available, subjects }) => {
  const results = available.map((a) => {
    return subjects[a - 1];
  });

  return (
    <ScrollArea className="h-[90%]">
      <ul className="flex flex-col mt-2 gap-2">
        {results.map((s) => {
          return <SubjectItem key={s.id} subject={s} />;
        })}
      </ul>
    </ScrollArea>
  );
};

export default RenderNonGrouped;
