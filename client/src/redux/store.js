import React from "react";
import { createStore } from "redux";
import rootReducer from "./reducers/";
import { Provider } from "react-redux";

const Store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function DataProvider({ children }) {
  return <Provider store={Store}>{children}</Provider>;
}

export default DataProvider;
