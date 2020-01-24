import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  CLEAR_REGISTERED_INFO
} from "../actions/types";

const initialState = {
  registeredInfo: null,
  token: null,
  user: null,
  isLoggedIn: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registeredInfo: action.payload
      };
    case CLEAR_REGISTERED_INFO:
      return {
        ...state,
        registeredInfo: null
      };
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
