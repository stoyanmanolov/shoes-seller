import {
  CLEAR_FILTER_OPTIONS,
  FILTER_OPTIONS_NAMES,
  FETCH_SHOES_LIST,
  CLEAR_SHOES_LIST,
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
  currentSort
) => {
  return async (dispatch) => {
    await axios
      .get(
        `/shoes/${gender}/numOfPages/?limit=${numOfShoes}&skip=${
          (currentPage - 1) * numOfShoes
        }&forKids=${forKids}&sortOption=${currentSort}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: FETCH_SHOES_LIST,
          payload: { currentPage, ...response.data },
        });
      });
  };
};

export const clearShoesList = () => {
  return {
    type: CLEAR_SHOES_LIST,
  };
};
