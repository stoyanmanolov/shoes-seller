import { ADD_TO_CART } from "../actions/types";
import { formatCart, getItemsCount } from "./utils";

const initialState = {
  cart: [],
  itemsCount: 0,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const cart = formatCart(state.cart, action.payload);
      const itemsCount = getItemsCount(cart);
      return { ...state, cart, itemsCount };
    default:
      return state;
  }
};

export default ordersReducer;
