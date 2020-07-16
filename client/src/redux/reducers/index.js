import { combineReducers } from "redux";
import authReducer from "./authReducer";
import shoesReducer from "./shoesReducer";
import ordersReducer from "./ordersReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  auth: authReducer,
  shoes: shoesReducer,
  orders: ordersReducer,
  errors: errorsReducer,
});
