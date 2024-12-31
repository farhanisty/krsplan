import { v4 as uuid } from "uuid";

export const insert = (name, datasourceId, choosedSubjects) => {
  const id = uuid();
  const date = new Date();

  const result = {
    id,
    createdAt: date.toLocaleString(),
    name,
    datasourceId,
    choosedSubjects,
    data: {
      choosed: [],
      available: [],
      unavailable: [],
    },
  };

  const plans = JSON.parse(localStorage.getItem("KRSPLAN_PLAN")) || [];

  plans.push(result);

  localStorage.setItem("KRSPLAN_PLAN", JSON.stringify(plans));
};

export const get = () => {
  return JSON.parse(localStorage.getItem("KRSPLAN_PLAN")) || [];
};
