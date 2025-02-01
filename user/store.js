import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";  // Ensure you're using the right version of redux-thunk
import { composeWithDevTools } from "redux-devtools-extension";
import { getAllMessageReducers } from "./src/reducers/communityReducers";

const finalReducers = combineReducers({
  getAllMessageReducers,  // Use the correct reducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  finalReducers,
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
