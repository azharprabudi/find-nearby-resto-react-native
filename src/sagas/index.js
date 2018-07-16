import { all, fork } from "redux-saga/effects";
import UserSaga from "./user-saga";
import RestaurantSaga from "./restaurant-saga";

const RootSaga = function* RootSaga() {
  yield all([
    fork(UserSaga.watcherUserLogin),
    fork(UserSaga.watcherUserSignup),
    fork(UserSaga.watcherUserLogout),
    fork(RestaurantSaga.watcherAddToFavorite)
  ]);
};

export default RootSaga;
