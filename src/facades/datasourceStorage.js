import { v4 as uuid } from "uuid";

export const insert = (name, data) => {
  const id = uuid();
  const date = new Date();

  const result = {
    id,
    createdAt: date.toLocaleString(),
    name,
    datasource: data,
  };

  const datasourceTemp = localStorage.getItem("KRSPLAN_DATASOURCE") || [];

  datasourceTemp.push(result);

  localStorage.setItem("KRSPLAN_DATASOURCE", JSON.stringify(datasourceTemp));
};
