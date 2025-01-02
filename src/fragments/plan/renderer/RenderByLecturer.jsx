import { ScrollArea } from "@/components/ui/scroll-area";
import GroupedSubject from "@/components/GroupedSubject";
import { splitArray } from "./../../../facades/util.js";

const RenderByLecturer = ({ available, subjects, chooseAction }) => {
  const subjectsGroupLecturer = [];

  for (const a of available) {
    const subject = subjects[a - 1];

    for (const lecturer of subject.lecturers) {
      const groupItem = subjectsGroupLecturer.find((s) => {
        return s.name === lecturer;
      });

      if (groupItem) {
        groupItem.data.push(subject);
      } else {
        subjectsGroupLecturer.push({
          name: lecturer,
          data: [subject],
        });
      }
    }
  }

  const [firstArray, secondArray] = splitArray(subjectsGroupLecturer);

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

export default RenderByLecturer;
