import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  CHECK_TOKEN,
} from '../actions/type';

const initialState = {
  isLoggedIn: false,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case CHECK_TOKEN:
      return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
        user: payload.user,
      };
    default:
      return state;
  }
}
