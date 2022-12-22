import { ADD_TO_CART, RESET_CART } from "../actions/types";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newCart = [...state.cart];
      const { shoe, size } = action.payload;

      const alreadyInCartIndex = newCart.findIndex(
        (cartItem) => cartItem.shoe._id === shoe._id
      );

      if (alreadyInCartIndex !== -1) {
        newCart[alreadyInCartIndex].sizes.push(size);
      } else {
        newCart.push({ shoe, sizes: [size] });
      }

      const newTotalPrice = newCart.reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.shoe.price * cartItem.sizes.length,
        0
      );

      return {
        ...state,
        cart: newCart,
        totalPrice: newTotalPrice,
      };
    case RESET_CART:
      return { ...state, cart: [], totalPrice: 0 };
    default:
      return state;
  }
};

export default ordersReducer;
