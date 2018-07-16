import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reducer from "../configs/reducer";
import AppWithNavigationState from "./app-navigation-with-state";

const { store, persistor } = reducer;

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppWithNavigationState />
    </PersistGate>
  </Provider>
);

export default Root;
