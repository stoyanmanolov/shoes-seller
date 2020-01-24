import { FILTER_OPTIONS } from "../actions/types";

const initialState = {
  filterOptions: null
};

const shoesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_OPTIONS:
      return { ...state, filterOptions: { ...action.payload } };
    default:
      return state;
  }
};

export default shoesReducer;
