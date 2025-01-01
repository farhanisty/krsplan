import ScheduleTable from "@/components/ScheduleTable";

export default function ScheduleTableApp() {
  const days = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

  return (
    <ScheduleTable>
      {days.map((day) => {
        return (
          <ScheduleTable.DayItem key={day}>
            <ScheduleTable.DayHeader>{day}</ScheduleTable.DayHeader>
            <ScheduleTable.DayBody>
              <ScheduleTable.SubjectItem height={100} top={20}>
                Hello world
              </ScheduleTable.SubjectItem>

              <ScheduleTable.SubjectItem height={70} top={120}>
                <ScheduleTable.SubjectItem.Name>
                  Struktur Data
                </ScheduleTable.SubjectItem.Name>
                <ScheduleTable.SubjectItem.Time>
                  07.30-10.00 (3 SKS)
                </ScheduleTable.SubjectItem.Time>
                <ScheduleTable.SubjectItem.Lecturer>
                  Agus Sasmito
                </ScheduleTable.SubjectItem.Lecturer>
              </ScheduleTable.SubjectItem>
            </ScheduleTable.DayBody>
          </ScheduleTable.DayItem>
        );
      })}
    </ScheduleTable>
  );
}
