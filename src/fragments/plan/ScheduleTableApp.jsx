import ScheduleTable from "@/components/ScheduleTable";
import { Time } from "krsplan-engine";

const convertHeight = (subject) => {
  const intervalTime = subject.schedule.intervalTime;
  // const baseTime = new Time(7, 0);
  return (
    ((intervalTime.end.inMinute() - intervalTime.start.inMinute()) / 60) * 40
  );
};

const convertTop = (subject) => {
  const intervalTime = subject.schedule.intervalTime;
  const baseTime = new Time(7, 30);
  return ((intervalTime.start.inMinute() - baseTime.inMinute()) / 60) * 40 + 40;
};

const stringifySchedule = (schedule) => {
  const start = schedule.intervalTime.start;
  const end = schedule.intervalTime.end;
  return `${start.hour}:${start.minute}-${end.hour}:${end.minute}`;
};

export default function ScheduleTableApp({ choosed, subjects }) {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const subjectGroupedByDay = days.map((day) => {
    return {
      name: day,
      data: [],
    };
  });

  for (const a of choosed) {
    const subject = subjects[a - 1];
    subjectGroupedByDay[days.indexOf(subject.schedule.day)].data.push(subject);
  }

  return (
    <ScheduleTable>
      {days.map((day, index) => {
        if (index === 5 && subjectGroupedByDay[5].data.length === 0) {
          return;
        }

        return (
          <ScheduleTable.DayItem key={day}>
            <ScheduleTable.DayHeader>{day}</ScheduleTable.DayHeader>
            {subjectGroupedByDay.length > index && (
              <ScheduleTable.DayBody>
                {subjectGroupedByDay[index].data.map((subject) => {
                  return (
                    <ScheduleTable.SubjectItem
                      key={subject.id}
                      height={convertHeight(subject)}
                      top={convertTop(subject)}
                    >
                      <ScheduleTable.SubjectItem.Name>
                        {subject.name}
                      </ScheduleTable.SubjectItem.Name>
                      <ScheduleTable.SubjectItem.Time>
                        {stringifySchedule(subject.schedule)} ({subject.credits}{" "}
                        SKS)
                      </ScheduleTable.SubjectItem.Time>
                      <ScheduleTable.SubjectItem.Lecturer>
                        {subject.lecturers[0]}
                      </ScheduleTable.SubjectItem.Lecturer>
                    </ScheduleTable.SubjectItem>
                  );
                })}
              </ScheduleTable.DayBody>
            )}
          </ScheduleTable.DayItem>
        );
      })}
    </ScheduleTable>
  );
}
