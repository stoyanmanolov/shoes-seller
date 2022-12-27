import {
  SET_FILTERS_DATA,
  FETCH_SHOES_LIST,
  SELECT_FILTER,
  REMOVE_SELECTED_FILTER,
  SET_CURRENT_SORT,
  SET_CURRENT_PAGE,
  CLEAR_SELECTED_FILTERS,
} from "../actions/types";

const initialState = {
  filtersData: null,
  selectedFilters: {
    brand: [],
    category: [],
    color: [],
    model: [],
    price: [],
    sizes: [],
  },
  shoesList: {
    shoes: [],
    numOfPages: 1,
    currentPage: 1,
    currentSort: '{ "createdAt": 1 }',
  },
  shoeDetails: null,
};

const shoesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SHOES_LIST:
      return {
        ...state,
        shoesList: {
          ...state.shoesList,
          shoes: payload.shoes,
          numOfPages: payload.numOfPages,
          currentPage: payload.currentPage,
        },
      };
    case SET_CURRENT_SORT:
      return {
        ...state,
        shoesList: {
          ...state.shoesList,
          currentSort: payload,
        },
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        shoesList: {
          ...state.shoesList,
          currentPage: payload,
        },
      };
    case SET_FILTERS_DATA:
      return {
        ...state,
        filtersData: payload,
      };
    case SELECT_FILTER: {
      if (payload.title === "price") {
        return {
          ...state,
          selectedFilters: {
            ...state.selectedFilters,
            [payload.title]: payload.filter,
          },
        };
      } else
        return {
          ...state,
          selectedFilters: {
            ...state.selectedFilters,
            [payload.title]: [
              payload.filter,
              ...state.selectedFilters[payload.title],
            ],
          },
        };
    }
    case REMOVE_SELECTED_FILTER: {
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          [payload.title]: [
            ...state.selectedFilters[payload.title].filter((value) => {
              return value !== payload.filter;
            }),
          ],
        },
      };
    }
    case CLEAR_SELECTED_FILTERS: {
      return {
        ...state,
        selectedFilters: initialState.selectedFilters,
      };
    }
    default:
      return state;
  }
};

export default shoesReducer;
