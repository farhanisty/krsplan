const generateTimes = (from, to) => {
  const results = [];

  for (let i = from; i <= to; i++) {
    if (i < 10) {
      results.push(`0${i}:00`);
    } else {
      results.push(`${i}:00`);
    }
  }

  return results;
};

const ScheduleTable = ({ children }) => {
  const times = generateTimes(7, 18);

  return (
    <section>
      <div className="relative mx-5">
        <ul className="relative pt-[30px]">
          {times.map((time) => {
            return (
              <li key={time} className="h-[40px] flex gap-3 items-center">
                <time className="text-timelabel hover:text-red-800 ponter hover:text-lg hover:font-semibold">
                  {time}
                </time>
                <div className="h-[1px] bg-timeline w-full"></div>
              </li>
            );
          })}
        </ul>

        <div className="absolute top-0 left-[60px] right-0 flex h-full">
          {children}
        </div>
      </div>
    </section>
  );
};

const DayItem = ({ children }) => {
  return <div className="flex-1 border-r timeline relative">{children}</div>;
};

const DayHeader = ({ children }) => {
  return (
    <header className="h-[30px] flex justify-center items-center capitalize">
      {children}
    </header>
  );
};

const DayBody = ({ children }) => {
  return <ul className="relative">{children}</ul>;
};

const SubjectItem = ({ children, top, height }) => {
  return (
    <li
      className={`absolute w-[95%] overflow-x-hidden overflow-y-scroll px-2 bg-subjectitem border border-blue-300 py-2 rounded-md`}
      style={{
        top: `${top}px`,
        height: `${height}px`,
      }}
    >
      {children}
    </li>
  );
};

SubjectItem.Name = ({ children }) => {
  return (
    <h1 className="text-[12px] text-blue-700 font-semibold tracking-widest">
      {children}
    </h1>
  );
};

SubjectItem.Time = ({ children }) => {
  return (
    <span className="my-1 block text-[9px] text-blue-700">{children}</span>
  );
};

SubjectItem.Lecturer = ({ children }) => {
  return (
    <h2 className="text-xs text-blue-700 bg-yellow-300 px-2 py-[1px] rounded">
      {children}
    </h2>
  );
};

ScheduleTable.DayItem = DayItem;
ScheduleTable.DayHeader = DayHeader;
ScheduleTable.DayBody = DayBody;
ScheduleTable.SubjectItem = SubjectItem;

export default ScheduleTable;
