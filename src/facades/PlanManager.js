import { getById, update, get } from "./planStorage.js";
import { getEligibleSubjects } from "./../facades/planUtil.js";
import {
  ChoosedSubjectEliminator,
  OverlapTimeEliminator,
} from "krsplan-engine";

export default class PlanManger {
  plan;
  choosedSubjects;
  subjects;
  choosed;
  available;
  unavailable;
  similiarPlans = null;

  constructor(planId) {
    this.plan = getById(planId);
    this.choosedSubjects = getEligibleSubjects(this.plan);
    this.subjects = this.plan.datasource.datasource;
    this.choosed = this.plan.data.choosed;
    this.available = this.plan.data.available;
    this.unavailable = this.plan.data.unavailable;
  }

  choose(id) {
    const subject = this.subjects[id - 1];
    const newAvailable = [];
    const newUnavailable = [...this.unavailable];

    const eliminator = this.getEliminator(subject);

    this.available = this.available.filter((aId) => {
      return aId !== id;
    });

    for (const aId of this.available) {
      const reason = [];

      eliminator.execute(this.subjects[aId - 1], reason);

      if (aId === id) {
        continue;
      }

      if (reason.length === 0) {
        newAvailable.push(aId);
      } else {
        newUnavailable.push({
          id: aId,
          reason: reason,
        });
      }
    }

    this.setChoosed([...this.choosed, id]);
    this.setAvailable(newAvailable);
    this.setUnavailable(newUnavailable);

    this.commit();
  }

  unchoose(id) {
    const newChoosed = this.choosed.filter((i) => {
      return i != id;
    });

    const eligibleSubjects = [...this.unavailable];

    const newAvailable = [id, ...this.available];
    const newUnavailable = [];

    const eliminators = newChoosed.map((id) => {
      return this.getEliminator(this.subjects[id - 1]);
    });

    for (const eId of eligibleSubjects) {
      const subject = this.subjects[eId.id - 1];
      let result = true;
      const reason = [];

      for (const eliminator of eliminators) {
        eliminator.execute(subject, reason);

        if (reason.length > 0) {
          result = false;
          break;
        }
      }

      if (result) {
        newAvailable.push(eId.id);
      } else {
        newUnavailable.push({
          id: eId.id,
          reason: reason,
        });
      }
    }

    this.setChoosed(newChoosed);
    this.setAvailable(newAvailable);
    this.setUnavailable(newUnavailable);

    this.commit();
  }

  setAvailable(newAvailable) {
    newAvailable.sort((a, b) => a - b);
    this.plan.data.available = newAvailable;
    this.available = newAvailable;
  }

  setUnavailable(newUnavailable) {
    this.plan.data.unavailable = newUnavailable;
    this.unavailable = newUnavailable;
  }

  setChoosed(newChoosed) {
    this.plan.data.choosed = newChoosed;
    this.choosed = newChoosed;
  }

  getEliminator(subject) {
    const choosedSubjectEliminator = new ChoosedSubjectEliminator(subject.name);
    choosedSubjectEliminator.setMessage(
      `Mata kuliah ${subject.name} telah diambil`,
    );

    const overlapTimeEliminator = new OverlapTimeEliminator(subject);
    overlapTimeEliminator.setMessage(
      `Jadwal bertabarakan dengan mata kuliah ${subject.name}`,
    );

    choosedSubjectEliminator.setNext(overlapTimeEliminator);

    return choosedSubjectEliminator;
  }

  getSimiliarPlans() {
    if (this.similiarPlans === null) {
      this.similiarPlans = get().filter((p) => {
        return (
          p.datasourceId === this.plan.datasourceId && p.id != this.plan.id
        );
      });
    }

    return this.similiarPlans;
  }

  commit() {
    update(this.plan.id, this.plan);
  }
}
