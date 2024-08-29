import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { reducer as authReducer } from "./auth/reducer";
import { reducer as appReducer } from "./jobs/reducer";

const rootReducer = combineReducers({
  authReducer,
  appReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
