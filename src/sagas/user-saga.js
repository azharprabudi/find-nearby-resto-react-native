import { ToastAndroid } from "react-native";
import { takeLatest, call, put } from "redux-saga/effects";
import { NavigationActions } from "react-navigation";
import {
  SUBMIT_USER_SIGNIN,
  SUBMIT_USER_SIGNUP,
  SUCCESS_USER_SIGNUP,
  FAILED_USER_SIGNUP,
  SUCCESS_USER_SIGNIN,
  FAILED_USER_SIGNIN,
  DO_USER_LOGOUT,
  RESET_STATE,
  LOAD_USER_SIGNIN,
  LOAD_USER_SIGNUP
} from "../ducks/user-duck";
import fbase from "../configs/fbase";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const doLoginUser = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fbase.auth().signInWithEmailAndPassword(email, password);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const workerDoUserLogin = function* workerDoUserLogin({ payload }) {
  try {
    const { email, password } = payload;
    yield put({ type: LOAD_USER_SIGNIN });
    yield call(doLoginUser, { email, password });
    yield call(delay, 1000);
    yield put({ type: SUCCESS_USER_SIGNIN, payload: { data: { email } } });
  } catch (e) {
    ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    yield put({ type: FAILED_USER_SIGNIN });
  }
};

const watcherUserLogin = function* watcherUserLogin() {
  yield takeLatest(SUBMIT_USER_SIGNIN, workerDoUserLogin);
};

const doSignupUser = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fbase.auth().createUserWithEmailAndPassword(email, password);
      await doLoginUser({ email, password });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const workerDoSignupUser = function* workerDoSignupUser({ payload }) {
  try {
    const { email, password } = payload;
    yield put({ type: LOAD_USER_SIGNUP });
    yield call(doSignupUser, { email, password });
    yield call(delay, 1000);
    yield put({ type: SUCCESS_USER_SIGNUP, payload: { data: { email } } });
  } catch (e) {
    ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
    yield put({ type: FAILED_USER_SIGNUP });
  }
};

const watcherUserSignup = function* watcherUserSignup() {
  yield takeLatest(SUBMIT_USER_SIGNUP, workerDoSignupUser);
};

const doLogout = () =>
  new Promise((resolve, reject) =>
    fbase
      .auth()
      .signOut()
      .then(resolve)
      .catch(reject)
  );

const workerDoUserLogout = function* workerDoUserLogout() {
  try {
    yield put({ type: RESET_STATE });
    yield call(doLogout);
  } catch (e) {
    ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
  }
};

const watcherUserLogout = function* watcherUserLogout() {
  yield takeLatest(DO_USER_LOGOUT, workerDoUserLogout);
};

export default {
  watcherUserLogin,
  watcherUserSignup,
  watcherUserLogout
};
