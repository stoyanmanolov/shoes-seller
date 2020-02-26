import { FILTER_OPTIONS } from "./types";
import axios from "axios";

export const fetchFilterOptions = items => {
  return async dispatch => {
    let data = {};

    const fetchItems = async item => {
      if (item.title === "price") {
        await axios.get(`/shoes/${item.title}/boundries`).then(response => {
          data = { ...data, [item.title]: response.data };
        });
      } else
        await axios.get(`/shoes/${item.title}`).then(response => {
          data = { ...data, [item.title]: response.data };
        });
    };

    for (let item of items) {
      await fetchItems(item);
    }

    dispatch({ type: FILTER_OPTIONS, payload: data });
  };
};
