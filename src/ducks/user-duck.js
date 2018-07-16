// trigger to saga
export const SUBMIT_USER_SIGNIN = "SUBMIT_USER_SIGNIN";
export const SUBMIT_USER_SIGNUP = "SUBMIT_USER_SIGNUP";
export const DO_USER_LOGOUT = "DO_USER_LOGOUT";

// trigger to reducer
export const LOAD_USER_SIGNIN = "LOAD_USER_SIGNIN";
export const SUCCESS_USER_SIGNIN = "SUCCESS_USER_SIGNIN";
export const FAILED_USER_SIGNIN = "FAILED_USER_SIGNIN";
export const LOAD_USER_SIGNUP = "LOAD_USER_SIGNUP";
export const SUCCESS_USER_SIGNUP = "SUCCESS_USER_SIGNUP";
export const FAILED_USER_SIGNUP = "FAILED_USER_SIGNUP";
export const VISIT_INTRODUCTION = "VISIT_INTRODUCTION";
export const RESET_STATE = "RESET_STATE";

const initialState = {
  infoUser: {},
  histories: {
    introduction: false
  },
  loading: false,
  loadingSignin: false,
  loadingSignup: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_SIGNIN:
      return {
        ...state,
        loadingSignin: true
      };
    case SUCCESS_USER_SIGNIN:
      return {
        ...state,
        infoUser: {
          ...action.payload.data
        },
        loadingSignin: false
      };
    case FAILED_USER_SIGNIN:
      return {
        ...state,
        loadingSignin: false
      };
    case LOAD_USER_SIGNUP:
      return {
        ...state,
        loadingSignup: true
      };
    case SUCCESS_USER_SIGNUP:
      return {
        ...state,
        infoUser: {
          ...action.payload.data
        },
        loadingSignup: false
      };
    case FAILED_USER_SIGNUP:
      return {
        ...state,
        loadingSignup: false
      };
    case VISIT_INTRODUCTION:
      return {
        ...state,
        histories: {
          ...state.histories,
          introduction: true
        }
      };
    case RESET_STATE:
      return {
        ...state,
        infoUser: {},
        loading: false,
        loadingSignin: false,
        loadingSignup: false
      };
    default:
      return state;
  }
};

export const doUserLogin = ({ email, password }) => ({
  type: SUBMIT_USER_SIGNIN,
  payload: { email, password }
});

export const doUserSignup = ({ email, password }) => ({
  type: SUBMIT_USER_SIGNUP,
  payload: { email, password }
});

export const doUpdateUserVisitIntroduction = () => ({
  type: VISIT_INTRODUCTION
});
