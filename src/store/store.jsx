import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer"; // Import your rootReducer here

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
