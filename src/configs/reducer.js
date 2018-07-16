import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import {
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import IndexNavigator from "../navigators";
import RootSaga from "../sagas";
import RootDuck from "../ducks";
import { RESET_STATE } from "../ducks/user-duck";

const navReducer = createNavigationReducer(IndexNavigator);

const reducer = combineReducers({
  nav: navReducer,
  ...RootDuck
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["nav"],
  whitelist: ["user"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

const rnNavigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);
const sagaMiddleware = createSagaMiddleware();
const middleware = [rnNavigationMiddleware, sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(RootSaga);

export default {
  store,
  persistor: persistStore(store, null, () =>
    store.dispatch({ type: RESET_STATE })
  )
};
