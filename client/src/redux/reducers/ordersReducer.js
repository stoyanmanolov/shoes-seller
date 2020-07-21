import { ADD_TO_CART } from "../actions/types";
import { formatCart, getItemsCount, getTotalPrice } from "./utils";

const initialState = {
  cart: [],
  itemsCount: 0,
  totalPrice: 0,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const cart = formatCart(state.cart, action.payload);
      const itemsCount = getItemsCount(cart);
      const totalPrice = getTotalPrice(cart);

      return { ...state, cart, itemsCount, totalPrice };
    default:
      return state;
  }
};

export default ordersReducer;
