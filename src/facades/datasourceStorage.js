import { v4 as uuid } from "uuid";
import { Schedule, IntervalTime, Time } from "krsplan-engine";
import LZString from "lz-string";

export const insert = (name, data) => {
  const id = uuid();
  const date = new Date();

  const result = {
    id,
    createdAt: date.toLocaleString(),
    name,
    datasource: data,
  };

  let datasourceTemp = get();

  datasourceTemp = [result, ...datasourceTemp];

  localStorage.setItem(
    "KRSPLAN_DATASOURCE",
    LZString.compress(JSON.stringify(datasourceTemp)),
  );
};

export const get = () => {
  let datasources = localStorage.getItem("KRSPLAN_DATASOURCE");

  if (datasources) {
    datasources = JSON.parse(LZString.decompress(datasources));
  } else {
    datasources = [];
  }

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

export const getById = (id) => {
  return get().find((datasource) => {
    return id === datasource.id;
  });
};
