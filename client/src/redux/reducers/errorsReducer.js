import { SHOES_LIST_ERROR, CLEAR_SHOES_LIST_ERROR } from "../actions/types";

const initialState = {
  errorMessage: "",
  shoes: {
    shoesList: null,
    shoeDetails: null,
  },
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default errorsReducer;
