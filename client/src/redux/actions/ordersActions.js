import { ADD_TO_CART } from "./types";

export const addToCart = (shoe) => {
  return { type: ADD_TO_CART, payload: shoe };
};
