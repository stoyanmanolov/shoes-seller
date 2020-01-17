import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  token: null,
  user: null,
  isLoggedIn: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload.user
      };
    case LOGOUT_USER:
      return { ...state, isLoggedIn: false, token: null, user: null };
    default:
      return state;
  }
};

export default authReducer;
