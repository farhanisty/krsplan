import { getViewById } from "./viewStorage";

export default class ViewManager {
  view;
  planIds;

  constructor(viewId) {
    this.view = getViewById(viewId);

    this.planIds = this.view.planIds;
  }


}
