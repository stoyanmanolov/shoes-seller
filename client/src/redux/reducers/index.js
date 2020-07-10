import { combineReducers } from "redux";
import authReducer from "./authReducer";
import shoesReducer from "./shoesReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  auth: authReducer,
  shoes: shoesReducer,
  errors: errorsReducer,
});
