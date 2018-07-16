import { ToastAndroid } from "react-native";
import { call, put, takeEvery } from "redux-saga/effects";
import axiosCustom from "../configs/config";
import {
  SET_FAVORITE_RESTAURANT,
  SUCCESS_SET_FAVORITE_RESTAURANT,
  SUCCESS_REMOVE_FAVORITE_RESTAURANT
} from "../ducks/restaurant-duck";
import fbase from "../configs/fbase";

export const fetchDetailRestaurant = restoId => {
  const URL = `restaurant?res_id=${restoId}`;
  return axiosCustom
    .get(URL)
    .then(({ data }) => data)
    .catch(e => e);
};

export const getNearbyRestaurant = ({ longitude, latitude }) => {
  const URL = `geocode?lat=${latitude}&lon=${longitude}`;
  return axiosCustom
    .get(URL)
    .then(({ data }) => data)
    .catch(e => e);
};

export const searchRestaurant = name => {
  const URL = `search?q=${name}&start=0&count=100&sort=rating&order=desc`;
  return axiosCustom
    .get(URL)
    .then(({ data }) => data)
    .catch(e => e);
};

export const getFavoriteResto = () =>
  new Promise(resolve => {
    const { uid } = fbase.auth().currentUser;
    fbase
      .database()
      .ref(`${uid}/favorites`)
      .on("value", snapshot => {
        resolve(snapshot.val());
      });
  });

const getExistingData = ({ uid, restoId }) =>
  new Promise(resolve => {
    fbase
      .database()
      .ref(`${uid}/favorites/${restoId}`)
      .once("value", snapshot => {
        const data = snapshot.val();
        resolve(data);
      });
  });

const addData = ({ uid, restoId, data }) =>
  new Promise((resolve, reject) => {
    fbase
      .database()
      .ref(`${uid}/favorites/${restoId}`)
      .set(data, err => {
        if (err) reject();
        else resolve();
      });
  });

const removeData = ({ uid, restoId }) =>
  new Promise((resolve, reject) =>
    fbase
      .database()
      .ref(`${uid}/favorites/${restoId}`)
      .set(null, err => {
        if (err) reject();
        else resolve();
      })
  );

const workerAddToFavorite = function* workerAddToFavorite({ payload }) {
  try {
    const { uid } = fbase.auth().currentUser;
    const existingData = yield call(getExistingData, {
      restoId: payload.restoId,
      uid
    });
    if (existingData) {
      yield call(removeData, {
        restoId: payload.restoId,
        uid
      });
      yield put({
        type: SUCCESS_REMOVE_FAVORITE_RESTAURANT,
        payload: { restoId: payload.restoId }
      });
      ToastAndroid.show(
        "Berhasil mengunfavoritkan restaurant ini",
        ToastAndroid.SHORT
      );
    } else {
      yield call(addData, {
        restoId: payload.restoId,
        uid,
        data: payload.data
      });
      yield put({
        type: SUCCESS_SET_FAVORITE_RESTAURANT,
        payload: { restoId: payload.restoId, data: payload.data }
      });
      ToastAndroid.show(
        "Berhasil mengfavoritkan restaurant ini",
        ToastAndroid.SHORT
      );
    }
  } catch (e) {
    ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
  }
};

const watcherAddToFavorite = function* watcherAddToFavorite() {
  yield takeEvery(SET_FAVORITE_RESTAURANT, workerAddToFavorite);
};

export default {
  watcherAddToFavorite
};
