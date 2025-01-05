import SubjectItem from "@/components/SubjectItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const UnavailableView = ({ unavailable, subjects }) => {
  const unavailableSubjects = unavailable.map((u) => {
    return { subject: subjects[u.id - 1], reason: u.reason };
  });

  return (
    <div className="p-3 bg-slate-100 border h-full w-full">
      <header className="text-slate-800 pb-5 mb-3 border-b flex justify-between">
        <div>
          <h1>Unavailable</h1>
          <span className="text-sm text-slate-500">
            Total Item: {unavailable.length}
          </span>
        </div>
      </header>

      <div className="h-[90%]">
        <ScrollArea className="h-full ">
          <ul className="flex flex-wrap justify-between mt-2 gap-2">
            {unavailableSubjects.map((subject) => {
              return (
                <div className="w-[32%]" key={subject.subject.id}>
                  <SubjectItem subject={subject.subject}>
                    <SubjectItem.Body>
                      <p className="text-slate-600 text-sm">
                        Unavailable Reasons:
                      </p>

                      <ul>
                        {subject.reason.map((r) => {
                          return (
                            <li className="text-sm text-slate-600" key={r}>
                              - {r}
                            </li>
                          );
                        })}
                      </ul>
                    </SubjectItem.Body>
                  </SubjectItem>
                </div>
              );
            })}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UnavailableView;
