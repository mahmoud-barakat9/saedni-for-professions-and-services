import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const composeEnhancers = composeWithDevTools({});

const initialStore = {
  interestedReducer: {
    interestedItems: JSON.parse(localStorage.getItem("interestedItems")) ?? [],
  },
};

export const store = createStore(rootReducer, initialStore, composeEnhancers());
