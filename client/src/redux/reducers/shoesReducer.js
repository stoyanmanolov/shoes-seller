import {
  FILTER_OPTIONS_NAMES,
  FETCH_SHOES_LIST,
  CLEAR_FILTER_OPTIONS,
  CLEAR_SHOES_LIST,
} from "../actions/types";

const initialState = {
  filterOptions: { optionNames: null, selectedOptions: null },
  shoesList: { shoes: [], numOfPages: null, currentPage: null },
};

const shoesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_OPTIONS_NAMES:
      return {
        ...state,
        filterOptions: {
          optionNames: { ...action.payload },
          selectedOptions: {},
        },
      };
    case CLEAR_FILTER_OPTIONS:
      return {
        ...state,
        filterOptions: { optionNames: null, selectedOptions: null },
      };
    case FETCH_SHOES_LIST:
      return {
        ...state,
        shoesList: {
          shoes: action.payload.shoes,
          numOfPages: action.payload.numOfPages,
          currentPage: action.payload.currentPage,
        },
      };
    case CLEAR_SHOES_LIST:
      return {
        ...state,
        shoesList: {
          shoes: [],
          numOfPages: null,
          currentPage: null,
        },
      };
    default:
      return state;
  }
};

export default shoesReducer;
