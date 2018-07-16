import omit from "lodash/omit";
import { RESET_STATE } from "./user-duck";

// trigger to duck
export const SET_FAVORITE_RESTAURANT = "SET_FAVORITE_RESTAURANT";
export const SUCCESS_SET_FAVORITE_RESTAURANT =
  "SUCCESS_SET_FAVORITE_RESTAURANT";
export const SUCCESS_REMOVE_FAVORITE_RESTAURANT =
  "SUCCESS_REMOVE_FAVORITE_RESTAURANT";
export const SUCCESS_GET_FAVORITE_RESTAURANT =
  "SUCCESS_GET_FAVORITE_RESTAURANT";

const initialState = {
  favorite: {
    data: {},
    loading: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_GET_FAVORITE_RESTAURANT:
      return {
        ...state,
        favorite: {
          ...state.favorite,
          data: {
            ...action.payload.data
          }
        }
      };
    case SUCCESS_SET_FAVORITE_RESTAURANT:
      return {
        ...state,
        favorite: {
          ...state.favorite,
          data: {
            [action.payload.restoId]: action.payload.data
          }
        }
      };
    case SUCCESS_REMOVE_FAVORITE_RESTAURANT:
      return {
        ...state,
        favorite: {
          ...state.favorite,
          data: omit(state.favorite.data, action.payload.restoId)
        }
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export const getFavoriteRestaurant = data => ({
  type: SUCCESS_GET_FAVORITE_RESTAURANT,
  payload: { data }
});

export const addToFavoriteRestaurant = (restoId, data) => ({
  type: SET_FAVORITE_RESTAURANT,
  payload: { restoId, data }
});
