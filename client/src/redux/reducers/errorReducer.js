import {
  LOGIN_AUTH_ERROR,
  CLEAR_AUTH_ERRORS,
  REGISTER_AUTH_ERROR
} from "../actions/types";

const initialState = {
  auth: {
    login: null,
    register: null
  }
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_AUTH_ERROR:
      return { ...state, auth: { login: action.payload } };
    case REGISTER_AUTH_ERROR:
      return { ...state, auth: { register: action.payload } };
    case CLEAR_AUTH_ERRORS:
      return { ...state, auth: { login: null, register: null } };
    default:
      return state;
  }
};

export default errorReducer;
