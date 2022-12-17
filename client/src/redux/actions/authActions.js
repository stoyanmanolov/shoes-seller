import {
  LOGIN_USER,
  LOGIN_AUTH_ERROR,
  REGISTER_AUTH_ERROR,
  LOGOUT_USER,
  CLEAR_AUTH_ERRORS,
  REGISTER_USER,
  CLEAR_REGISTERED_INFO,
  GET_USERS,
  MAKE_USER_ADMIN,
  USERS_ERROR,
} from "./types";
import { UsersAPI } from "../../api";

export const registerUser = (signupData) => {
  return async (dispatch) => {
    UsersAPI.register(signupData)
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
    UsersAPI.login(loginData)
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

export const getUsers = () => {
  return async (dispatch, getState) => {
    UsersAPI.getUsers(getState().auth.token)
      .then((response) => {
        dispatch({ type: CLEAR_AUTH_ERRORS });
        dispatch({ type: GET_USERS, payload: response.data });
      })
      .catch((error) =>
        dispatch({ type: USERS_ERROR, payload: error.response })
      );
  };
};

export const makeUserAnAdmin = (userId) => {
  return async (dispatch, getState) => {
    UsersAPI.addAdmin(userId, getState().auth.token)
      .then((response) => {
        dispatch({ type: CLEAR_AUTH_ERRORS });
        dispatch({ type: MAKE_USER_ADMIN, payload: response.data });
      })
      .catch((error) =>
        dispatch({ type: USERS_ERROR, payload: error.response })
      );
  };
};

export const clearAuthErrors = () => {
  return {
    type: CLEAR_AUTH_ERRORS,
  };
};
