import { combineReducers } from "redux";
import { interestedReducer } from "./interestedReducer";

const rootReducer = combineReducers({
  interestedReducer: interestedReducer,
});

export default rootReducer;
