import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { reducer as authReducer } from "./auth/reducer";
import { reducer as jobsReducer } from "./jobs/reducer";
import { reducer as adminReducer } from "./admin/reducer";

const rootReducer = combineReducers({
  authReducer,
  jobsReducer,
  adminReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
