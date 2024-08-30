import * as types from "./actionTypes";

const initialState = {
  isAuthenticated: false,
  loading: false,
  userInfo: null,
  error: null,
};

const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_SIGNUP_REQUEST:
      return { ...oldState, loading: true, error: null };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...oldState,
        isAuthenticated: true,
        loading: false,
        userInfo: payload,
        error: null,
      };
    case types.USER_SIGNUP_FAILURE:
      return {
        ...oldState,
        loading: false,
        error: payload,
      };
    case types.USER_LOGIN_REQUEST:
      return {
        ...oldState,
        loading: true,
        error: null,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...oldState,
        loading: false,
        userInfo: payload,
        isAuthenticated: true,
        error: null,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...oldState,
        loading: false,
        error: action.payload,
      };

    case types.USER_LOGOUT_REQUEST:
      return {
        ...oldState,
        loading: true,
        error: null,
      };
    case types.USER_LOGOUT_SUCCESS:
      return {
        ...oldState,
        loading: false,
        userInfo: null,
        isAuthenticated: false,
        error: null,
      };
    case types.USER_LOGOUT_FAILURE:
      return {
        ...oldState,
        loading: false,
        error: payload,
      };

    default:
      return oldState;
  }
};

export { reducer };
