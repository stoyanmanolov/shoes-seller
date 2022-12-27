import {
  SET_FILTERS_DATA,
  FETCH_SHOES_LIST,
  SET_CURRENT_SORT,
  SELECT_FILTER,
  REMOVE_SELECTED_FILTER,
  SHOES_LIST_ERROR,
  CLEAR_SHOES_LIST_ERROR,
  SET_CURRENT_PAGE,
  CLEAR_SELECTED_FILTERS,
} from "./types";
import { ShoesAPI } from "../../api";
import { SHOES_PER_PAGE } from "../../constants";

export const fetchShoesList = (gender, forKids) => {
  return async (dispatch, getState) => {
    const { currentPage, currentSort } = getState().shoes.shoesList;
    const { selectedFilters } = getState().shoes;

    const filtersQueryParams = new URLSearchParams({
      ...selectedFilters,
      gender,
      forKids,
    }).toString();

    await ShoesAPI.getFilteredShoes({
      limit: SHOES_PER_PAGE,
      skip: (currentPage - 1) * SHOES_PER_PAGE,
      currentSort: currentSort,
      filtersQueryParams: filtersQueryParams,
    })
      .then((response) => {
        dispatch({ type: CLEAR_SHOES_LIST_ERROR });
        dispatch({
          type: FETCH_SHOES_LIST,
          payload: { ...response.data, currentPage },
        });
      })
      .catch((error) => {
        dispatch({ type: SHOES_LIST_ERROR, payload: error.response });
      });
  };
};

export const setCurrentSort = (currentSort) => {
  return {
    type: SET_CURRENT_SORT,
    payload: currentSort,
  };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage,
  };
};

export const setFiltersData = (data) => {
  return {
    type: SET_FILTERS_DATA,
    payload: data,
  };
};

export const selectFilter = (title, filter) => {
  return {
    type: SELECT_FILTER,
    payload: { title, filter },
  };
};

export const removeSelectedFilter = (title, filter) => {
  return {
    type: REMOVE_SELECTED_FILTER,
    payload: { title, filter },
  };
};

export const clearSelectedFilters = () => {
  return {
    type: CLEAR_SELECTED_FILTERS,
  };
};
