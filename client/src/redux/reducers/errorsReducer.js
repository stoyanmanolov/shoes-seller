import {
  SHOES_LIST_ERROR,
  CLEAR_SHOES_LIST_ERROR,
  SHOE_DETAILS_ERROR,
  CLEAR_SHOE_DETAILS_ERROR,
  ORDERS_ERROR,
  CLEAR_ORDERS_ERROR,
} from "../actions/types";

const initialState = {
  errorMessage: "",
  shoes: {
    shoesList: null,
    shoeDetails: null,
  },
  orders: {
    ordersList: null,
  },
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOES_LIST_ERROR:
      return {
        ...state,
        shoes: {
          ...state.shoes,
          shoesList: action.payload,
        },
      };
    case CLEAR_SHOES_LIST_ERROR:
      return {
        ...state,
        shoes: {
          ...state.shoes,
          shoesList: null,
        },
      };
    case SHOE_DETAILS_ERROR:
      return {
        ...state,
        shoes: {
          ...state.shoes,
          shoeDetails: action.payload,
        },
      };
    case CLEAR_SHOE_DETAILS_ERROR:
      return {
        ...state,
        shoes: {
          ...state.shoes,
          shoeDetails: null,
        },
      };
    case ORDERS_ERROR:
      return {
        ...state,
        orders: {
          ...state.orders,
          ordersList: action.payload,
        },
      };
    case CLEAR_ORDERS_ERROR:
      return {
        ...state,
        orders: {
          ...state.orders,
          ordersList: null,
        },
      };
    default:
      return state;
  }
};

export default errorsReducer;
