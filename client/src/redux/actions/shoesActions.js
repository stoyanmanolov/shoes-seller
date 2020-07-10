import {
  CLEAR_FILTERS,
  FILTER_OPTIONS_NAMES,
  FETCH_SHOES_LIST,
  CLEAR_SHOES_LIST,
  SET_CURRENT_SORT,
  ADD_FILTER,
  REMOVE_FILTER,
  SHOES_LIST_ERROR,
  CLEAR_SHOES_LIST_ERROR,
  FETCH_SHOE_DETAILS,
  SHOE_DETAILS_ERROR,
  CLEAR_SHOE_DETAILS_ERROR,
} from "./types";
import axios from "axios";

export const fetchFilterOptions = (gender, forKids, items) => {
  return async (dispatch) => {
    let data = {};

    const fetchItems = async (item) => {
      if (item.title === "price") {
        await axios
          .get(
            `/shoes/fields/${gender}/${item.title}/boundries?forKids=${forKids}`
          )
          .then((response) => {
            data = { ...data, [item.title]: response.data };
          });
      } else
        await axios
          .get(`/shoes/fields/${gender}/${item.title}?forKids=${forKids}`)
          .then((response) => {
            data = { ...data, [item.title]: response.data };
          });
    };

    for (let item of items) {
      await fetchItems(item);
    }
    dispatch({ type: FILTER_OPTIONS_NAMES, payload: data });
  };
};

export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS,
  };
};

export const fetchShoesList = (
  numOfShoes,
  currentPage,
  gender,
  forKids,
  currentSort,
  selectedFilters
) => {
  return async (dispatch) => {
    const filtersToURLWithJSON = () => {
      let filtersUrl = "&filters={ ";
      Object.keys(selectedFilters).forEach((filterKey, index) => {
        if (index === 0) filtersUrl += `"${filterKey}":[`;
        else filtersUrl += `, "${filterKey}":[`;
        selectedFilters[filterKey].forEach((filterValue, index) => {
          if (index === selectedFilters[filterKey].length - 1)
            filterKey === "sizes" || filterKey === "price"
              ? (filtersUrl += `${filterValue}`)
              : (filtersUrl += `"${filterValue}"`);
          else
            filterKey === "sizes" || filterKey === "price"
              ? (filtersUrl += `${filterValue}, `)
              : (filtersUrl += `"${filterValue}", `);
        });
        filtersUrl += "]";
      });
      filtersUrl += " }";
      return filtersUrl;
    };
    const filtersUrl = filtersToURLWithJSON();

    await axios
      .get(
        `/shoes/all/${gender}/numOfPages/?limit=${numOfShoes}&skip=${
          (currentPage - 1) * numOfShoes
        }&forKids=${forKids}&sortOption=${currentSort}${filtersUrl}`
      )
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

export const clearShoesList = () => {
  return {
    type: CLEAR_SHOES_LIST,
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
    axios
      .get("/shoes/shoe/" + id)
      .then((response) => {
        dispatch({ type: CLEAR_SHOE_DETAILS_ERROR });
        dispatch({ type: FETCH_SHOE_DETAILS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SHOE_DETAILS_ERROR, payload: error.response });
      });
  };
};
