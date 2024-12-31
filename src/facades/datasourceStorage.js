import { v4 as uuid } from "uuid";
import { Schedule, IntervalTime, Time } from "krsplan-engine";

export const insert = (name, data) => {
  const id = uuid();
  const date = new Date();

  const result = {
    id,
    createdAt: date.toLocaleString(),
    name,
    datasource: data,
  };

  const datasourceTemp =
    JSON.parse(localStorage.getItem("KRSPLAN_DATASOURCE")) || [];

  datasourceTemp.push(result);

  localStorage.setItem("KRSPLAN_DATASOURCE", JSON.stringify(datasourceTemp));
};

export const get = () => {
  const datasources =
    JSON.parse(localStorage.getItem("KRSPLAN_DATASOURCE")) || [];

  const mappedDatasources = datasources.map((ds) => {
    return {
      ...ds,
      datasource: ds.datasource.map((d) => {
        return {
          ...d,
          schedule: new Schedule(
            d.schedule.day,
            new IntervalTime(
              Time.buildFromString(
                `${d.schedule.intervalTime.start.hour}:${d.schedule.intervalTime.start.minute}`,
              ),
              Time.buildFromString(
                `${d.schedule.intervalTime.end.hour}:${d.schedule.intervalTime.end.minute}`,
              ),
            ),
          ),
        };
      }),
    };
  });

  return mappedDatasources;
};
