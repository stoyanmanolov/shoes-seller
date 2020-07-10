import {
  FILTER_OPTIONS_NAMES,
  FETCH_SHOES_LIST,
  CLEAR_FILTERS,
  CLEAR_SHOES_LIST,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_CURRENT_SORT,
  FETCH_SHOE_DETAILS,
} from "../actions/types";

const initialState = {
  filterOptions: {
    optionNames: null,
    selectedFilters: {
      brand: [],
      category: [],
      color: [],
      model: [],
      price: [],
      sizes: [],
    },
  },
  shoesList: {
    shoes: [],
    numOfPages: null,
    currentPage: null,
    shoesPerPage: 3,
    currentSort: null,
  },
  shoeDetails: null,
};

const shoesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_OPTIONS_NAMES:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          optionNames: payload,
        },
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          optionNames: null,
          selectedFilters: {
            brand: [],
            category: [],
            color: [],
            model: [],
            price: [],
            sizes: [],
          },
        },
      };
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
    case CLEAR_SHOES_LIST:
      return {
        ...state,
        shoesList: {
          ...state.shoesList,
          shoes: [],
          numOfPages: null,
          currentPage: null,
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
    case ADD_FILTER: {
      if (payload.title === "price") {
        return {
          ...state,
          filterOptions: {
            ...state.filterOptions,
            selectedFilters: {
              ...state.filterOptions.selectedFilters,
              [payload.title]: payload.filter,
            },
          },
        };
      } else
        return {
          ...state,
          filterOptions: {
            ...state.filterOptions,
            selectedFilters: {
              ...state.filterOptions.selectedFilters,
              [payload.title]: [
                payload.filter,
                ...state.filterOptions.selectedFilters[payload.title],
              ],
            },
          },
        };
    }
    case REMOVE_FILTER: {
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          selectedFilters: {
            ...state.filterOptions.selectedFilters,
            [payload.title]: [
              ...state.filterOptions.selectedFilters[payload.title].filter(
                (value) => {
                  return value !== payload.filter;
                }
              ),
            ],
          },
        },
      };
    }

    case FETCH_SHOE_DETAILS: {
      return {
        ...state,
        shoeDetails: payload,
      };
    }
    default:
      return state;
  }
};

export default shoesReducer;
