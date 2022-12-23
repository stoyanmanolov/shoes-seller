import {
  CLEAR_FILTERS,
  FILTER_OPTIONS_NAMES,
  FETCH_SHOES_LIST,
  SET_CURRENT_SORT,
  ADD_FILTER,
  REMOVE_FILTER,
  SHOES_LIST_ERROR,
  CLEAR_SHOES_LIST_ERROR,
  FETCH_SHOE_DETAILS,
  SHOE_DETAILS_ERROR,
  CLEAR_SHOE_DETAILS_ERROR,
  CLEAR_SHOE_DETAILS,
  SET_CURRENT_PAGE,
} from "./types";
import { ShoesAPI } from "../../api";
import { SHOES_PER_PAGE } from "../../constants";

export const fetchFilterOptions = (gender, forKids, fields) => {
  const fieldsQueryParams = fields.map((f) => f.title).toString();

  return async (dispatch) => {
    await ShoesAPI.getShoeFields(gender, forKids, fieldsQueryParams).then(
      (response) => {
        dispatch({ type: FILTER_OPTIONS_NAMES, payload: response.data });
      }
    );
  };
};

export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS,
  };
};

export const fetchShoesList = (gender, forKids) => {
  return async (dispatch, getState) => {
    const { currentPage, currentSort } = getState().shoes.shoesList;
    const { selectedFilters } = getState().shoes.filterOptions;

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

export const addFilter = (title, filter) => {
  return {
    type: ADD_FILTER,
    payload: { title, filter },
  };
};

export const removeFilter = (title, filter) => {
  return {
    type: REMOVE_FILTER,
    payload: { title, filter },
  };
};

export const fetchShoeDetails = (id) => {
  return async (dispatch) => {
    ShoesAPI.getShoe(id)
      .then((response) => {
        dispatch({ type: CLEAR_SHOE_DETAILS_ERROR });
        dispatch({ type: FETCH_SHOE_DETAILS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SHOE_DETAILS_ERROR, payload: error.response });
      });
  };
};

export const clearShoeDetails = () => {
  return {
    type: CLEAR_SHOE_DETAILS,
  };
};
