
import { combineReducers } from "redux";
import propertyReducer from "./propertyReducer"; 
import bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
  properties: propertyReducer,
  // booking: bookingReducer,
});

export default rootReducer;
