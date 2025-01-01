import { UnchoosedSubjectEliminator } from "krsplan-engine";

export function getEligibleSubjects(plan) {
  const eliminator = new UnchoosedSubjectEliminator();
  eliminator.chooseMany(plan.choosedSubjects);

  return plan.datasource.datasource.filter((ds) => {
    const reasons = [];
    eliminator.execute(ds, reasons);
    if (!reasons.length) {
      return true;
    }

    return false;
  });
}
