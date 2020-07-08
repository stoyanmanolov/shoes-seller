import {
  CLEAR_FILTER_OPTIONS,
  FILTER_OPTIONS_NAMES,
  FETCH_SHOES_LIST,
  CLEAR_SHOES_LIST,
  SET_CURRENT_SORT,
  ADD_FILTER,
  REMOVE_FILTER,
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

export const clearFilterOptions = () => {
  return {
    type: CLEAR_FILTER_OPTIONS,
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
        `/shoes/${gender}/numOfPages/?limit=${numOfShoes}&skip=${
          (currentPage - 1) * numOfShoes
        }&forKids=${forKids}&sortOption=${currentSort}${filtersUrl}`
      )
      .then((response) => {
        dispatch({
          type: FETCH_SHOES_LIST,
          payload: { currentPage, ...response.data },
        });
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
