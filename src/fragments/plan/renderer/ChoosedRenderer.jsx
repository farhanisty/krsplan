import SubjectItem from "@/components/SubjectItem";
export default function ChoosedRenderer({ choosed, subjects }) {
  return (
    <div className="bg-slate-50 border flex-1 px-3 py-2">
      <header className="text-slate-800">Choosed</header>
      <ul className="flex flex-col gap-3">
        {choosed.map((cId) => {
          return (
            <SubjectItem key={cId} subject={subjects[cId - 1]}></SubjectItem>
          );
        })}
      </ul>
    </div>
  );
}
