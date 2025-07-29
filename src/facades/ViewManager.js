import { getViewById } from "./viewStorage";

export default class ViewManager {
  view;
  planIds;

  constructor(viewId) {
    this.view = getViewById(viewId);
    console.log(this.view);

    this.planIds = this.view.planIds;
  }


}
