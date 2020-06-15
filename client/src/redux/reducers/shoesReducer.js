import {
  FILTER_OPTIONS,
  FETCH_SHOES_LIST,
  CLEAR_FILTER_OPTIONS,
} from "../actions/types";

const initialState = {
  filterOptions: null,
  shoesList: { shoes: {}, numOfPages: null },
};

const shoesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_OPTIONS:
      return { ...state, filterOptions: { ...action.payload } };
    case CLEAR_FILTER_OPTIONS:
      return { ...state, filterOptions: null };
    case FETCH_SHOES_LIST:
      return {
        ...state,
        shoesList: {
          shoes: action.payload.shoes,
          numOfPages: action.payload.numOfPages,
        },
      };
    default:
      return state;
  }
};

export default shoesReducer;
