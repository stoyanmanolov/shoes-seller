import { LOGIN_USER, LOGOUT_USER } from "./types";

export const loginUser = (payload) => {
  return {
    type: LOGIN_USER,
    payload,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
