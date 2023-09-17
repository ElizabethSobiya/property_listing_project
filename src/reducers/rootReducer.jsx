
import { combineReducers } from "redux";
import propertyReducer from "./propertyReducer"; // Import your propertyReducer here
import bookingReducer from "./bookingReducer";

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
  properties: propertyReducer,
  booking: bookingReducer,
  // Add other reducers as needed
});

export default rootReducer;
