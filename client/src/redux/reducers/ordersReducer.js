import { ADD_TO_CART, FETCH_ORDERS, RESET_CART } from "../actions/types";
import { formatCart, getItemsCount, getTotalPrice } from "./utils";

const initialState = {
  cart: [],
  itemsCount: 0,
  totalPrice: 0,
  ordersList: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const cart = formatCart(state.cart, action.payload);
      const itemsCount = getItemsCount(cart);
      const totalPrice = getTotalPrice(cart);

      return { ...state, cart, itemsCount, totalPrice };

    case FETCH_ORDERS:
      return { ...state, ordersList: action.payload };
    case RESET_CART:
      return { ...state, cart: [], itemsCount: 0, totalPrice: 0 };
    default:
      return state;
  }
};

export default ordersReducer;
