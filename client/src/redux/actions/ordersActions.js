import {
  ADD_TO_CART,
  FETCH_ORDERS,
  ORDERS_ERROR,
  CLEAR_ORDERS_ERROR,
} from "./types";
import axios from "axios";

export const fetchOrders = (token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "X-Auth-Token": token,
      },
    };

    axios
      .get("/orders", config)
      .then((response) => {
        dispatch({ type: CLEAR_ORDERS_ERROR });
        dispatch({ type: FETCH_ORDERS, payload: response.data });
      })
      .catch((error) =>
        dispatch({ type: ORDERS_ERROR, payload: error.response })
      );
  };
};

export const addToCart = (shoe, size) => {
  return {
    type: ADD_TO_CART,
    payload: { shoe, sizes: [size] },
  };
};
