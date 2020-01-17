import { AUTH_ERROR, CLEAR_AUTH_ERROR } from "../actions/types";

const initialState = {
  auth: null
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return { ...state, auth: action.payload };
    case CLEAR_AUTH_ERROR:
      return { ...state, auth: null };
    default:
      return state;
  }
};

export default errorReducer;
