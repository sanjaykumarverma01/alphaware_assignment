import * as types from "./actionTypes";
import axios from "axios";

const baseUrl = "http://localhost:8080";

const userSignUp = (userData) => async (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_REQUEST });
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${baseUrl}/api/user/signup`,
      userData,
      config
    );
    dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.USER_SIGNUP_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const userLogin = (payload) => async (dispatch) => {
  dispatch({ type: types.USER_LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${baseUrl}/api/user/login`, payload);
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { userSignUp, userLogin };
