import { ADD_TO_CART, RESET_CART } from "./types";

export const addToCart = (shoe, size) => {
  return {
    type: ADD_TO_CART,
    payload: { shoe, size },
  };
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};
