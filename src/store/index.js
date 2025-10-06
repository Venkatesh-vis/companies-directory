import { combineReducers, legacy_createStore } from "redux";
import companiesReducer from "./companiesReducer.js";

const rootReducer = combineReducers({
    companies: companiesReducer,
});

const store = legacy_createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
