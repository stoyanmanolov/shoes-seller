import {
  LOGIN_USER,
  LOGIN_AUTH_ERROR,
  REGISTER_AUTH_ERROR,
  LOGOUT_USER,
  CLEAR_AUTH_ERRORS,
  REGISTER_USER,
  CLEAR_REGISTERED_INFO,
} from "./types";
import axios from "axios";

export const registerUser = (signupData) => {
  return async (dispatch) => {
    await axios
      .post("/register", signupData)
      .then((response) => {
        dispatch({ type: CLEAR_AUTH_ERRORS });
        dispatch({ type: REGISTER_USER, payload: response.data });
      })
      .catch((error) =>
        dispatch({ type: REGISTER_AUTH_ERROR, payload: error.response })
      );
  };
};

export const clearRegisteredInfo = () => {
  return {
    type: CLEAR_REGISTERED_INFO,
  };
};

export const loginUser = (loginData) => {
  return async (dispatch) => {
    await axios
      .post("/login", loginData)
      .then((response) => {
        dispatch({ type: CLEAR_AUTH_ERRORS });
        dispatch({ type: LOGIN_USER, payload: response.data });
      })
      .catch((error) =>
        dispatch({ type: LOGIN_AUTH_ERROR, payload: error.response })
      );
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const clearAuthErrors = () => {
  return {
    type: CLEAR_AUTH_ERRORS,
  };
};
