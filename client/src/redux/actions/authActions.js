import {
  LOGIN_USER,
  AUTH_ERROR,
  LOGOUT_USER,
  CLEAR_AUTH_ERROR,
  REGISTER_USER
} from "./types";
import axios from "axios";

export const registerUser = signupData => {
  return async dispatch => {
    await axios
      .post("/register", signupData)
      .then(response => {
        dispatch({ type: CLEAR_AUTH_ERROR });
        dispatch({ type: REGISTER_USER, payload: response.data });
      })
      .catch(error => dispatch({ type: AUTH_ERROR, payload: error }));
  };
};

export const loginUser = loginData => {
  return async dispatch => {
    await axios
      .post("/login", loginData)
      .then(response => {
        dispatch({ type: CLEAR_AUTH_ERROR });
        dispatch({ type: LOGIN_USER, payload: response.data });
      })
      .catch(error => dispatch({ type: AUTH_ERROR, payload: error }));
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
  let config = {};

  if (token) {
    config = {
      headers: {
        "x-auth-token": token
      }
    };
  }

  return config;
};
