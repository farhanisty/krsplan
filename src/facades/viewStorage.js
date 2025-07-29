import { v4 as uuid } from "uuid";
import LZString from "lz-string";

const STORAGE_KEY = "KRSPLAN_VIEWS";

const commitViews = (views) => {
  localStorage.setItem(STORAGE_KEY, LZString.compress(JSON.stringify(views)));
};

export const get = () => {
  let localStorageData = localStorage.getItem(STORAGE_KEY);
  if (localStorageData) {
    try {
      localStorageData = JSON.parse(LZString.decompress(localStorageData));
    } catch (e) {
      localStorageData = []; 
    }
  } else {
    localStorageData = []; 
  }
  return localStorageData;
};

export const insert = (name, planIds) => {
  const id = uuid();
  const date = new Date();

  const newView = {
    id,
    createdAt: date.toLocaleString(), 
    name, 
    planIds,
  };

  let views = get(); 
  views = [newView, ...views]; 

  commitViews(views); 
};

export const getViewById = (id) => {
  return get().find((view) => view.id === id);
};


export const updateView = (id, updatedViewData) => {
  let views = get();
  const viewIndex = views.findIndex((view) => view.id === id);

  if (viewIndex > -1) {
    views[viewIndex] = { ...views[viewIndex], ...updatedViewData };
    commitViews(views);
  } else {
  }
};


export const removeView = (id) => {
  const views = get().filter((view) => view.id !== id);
  commitViews(views);
};
