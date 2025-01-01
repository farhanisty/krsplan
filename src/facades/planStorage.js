import { v4 as uuid } from "uuid";
import { getById as getDatasourceById } from "./datasourceStorage.js";
import { UnchoosedSubjectEliminator } from "krsplan-engine";

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

  const datasource = getDatasourceById(datasourceId);

  const eliminator = new UnchoosedSubjectEliminator();
  eliminator.chooseMany(choosedSubjects);

  const defaultAvailable = datasource.datasource.filter((ds) => {
    const reasons = [];
    eliminator.execute(ds, reasons);
    if (!reasons.length) {
      return true;
    }

    return false;
  });

  result.data.available = defaultAvailable.map((a) => {
    return a.id;
  });

  const plans = JSON.parse(localStorage.getItem("KRSPLAN_PLAN")) || [];

  plans.push(result);

  localStorage.setItem("KRSPLAN_PLAN", JSON.stringify(plans));
};

export const update = (id, plan) => {
  const plans = JSON.parse(localStorage.getItem("KRSPLAN_PLAN")) || [];

  const filteredPlans = plans.filter((p) => {
    return p.id != id;
  });

  filteredPlans.push(plan);

  localStorage.setItem("KRSPLAN_PLAN", JSON.stringify(filteredPlans));
};

export const get = () => {
  return JSON.parse(localStorage.getItem("KRSPLAN_PLAN")) || [];
};

export const getById = (id) => {
  let findPlan = get().find((plan) => {
    return id === plan.id;
  });

  findPlan = {
    ...findPlan,
    datasource: getDatasourceById(findPlan.datasourceId),
  };

  return findPlan;
};
