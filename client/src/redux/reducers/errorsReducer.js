import {
  LOGIN_AUTH_ERROR,
  CLEAR_AUTH_ERRORS,
  REGISTER_AUTH_ERROR,
  SHOES_LIST_ERROR,
  CLEAR_SHOES_LIST_ERROR,
  SHOE_DETAILS_ERROR,
  CLEAR_SHOE_DETAILS_ERROR,
} from "../actions/types";

const initialState = {
  auth: {
    login: null,
    register: null,
  },
  shoes: {
    shoesList: null,
    shoeDetails: null,
  },
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_AUTH_ERROR:
      return { ...state, auth: { login: action.payload } };
    case REGISTER_AUTH_ERROR:
      return { ...state, auth: { register: action.payload } };
    case CLEAR_AUTH_ERRORS:
      return { ...state, auth: { login: null, register: null } };
    case SHOES_LIST_ERROR:
      return {
        ...state,
        shoes: {
          ...state.shoes,
          shoesList: action.payload,
        },
      };
    case CLEAR_SHOES_LIST_ERROR:
      return {
        ...state,
        shoes: {
          ...state.shoes,
          shoesList: null,
        },
      };
    case SHOE_DETAILS_ERROR:
      return {
        ...state,
        shoes: {
          ...state.shoes,
          shoeDetails: action.payload,
        },
      };
    case CLEAR_SHOE_DETAILS_ERROR:
      return {
        ...state,
        shoes: {
          ...state.shoes,
          shoeDetails: null,
        },
      };

    default:
      return state;
  }
};

export default errorsReducer;
