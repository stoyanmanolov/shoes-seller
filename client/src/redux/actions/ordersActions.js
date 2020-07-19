import { ADD_TO_CART } from "./types";

export const addToCart = (shoe, size) => {
  return {
    type: ADD_TO_CART,
    payload: { shoe, sizes: [size] },
  };
};
