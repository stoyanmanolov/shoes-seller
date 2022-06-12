import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  CLEAR_REGISTERED_INFO,
  GET_USERS,
  MAKE_USER_ADMIN,
} from "../actions/types";

const initialState = {
  registeredInfo: null,
  token: null,
  user: null,
  isLoggedIn: null,
  users: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registeredInfo: action.payload,
      };
    case CLEAR_REGISTERED_INFO:
      return {
        ...state,
        registeredInfo: null,
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT_USER:
      return { ...state, isLoggedIn: false, token: null, user: null };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case MAKE_USER_ADMIN:
      return {
        ...state,
        users: state.users.map((u) =>
          u._id === action.payload.user._id ? { ...u, role: "admin" } : u
        ),
      };
    default:
      return state;
  }
};

export default authReducer;
