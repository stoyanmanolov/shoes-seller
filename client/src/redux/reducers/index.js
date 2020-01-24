import { combineReducers } from "redux";
import authReducer from "./authReducer";
import shoesReducer from "./shoesReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  shoes: shoesReducer,
  errors: errorReducer
});
