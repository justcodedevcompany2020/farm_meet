import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  CHECK_TOKEN,
  SET_CATALOG_DATA,
  SET_CATALOG_ID,
  SET_CATALOG_PRODUCTS_DATA,
  SET_PRODUCT_ID,
  SET_SINGLE_PRODUCT_DATA,
  SET_BASKET_INFO,
  SET_PROFILE_INFO,
  SET_SEARCH_PRODUCT,

} from '../actions/type';

const initialState = {
  isLoggedIn: false,
  user: null,
  catalog_data: [],
  catalog_id: null,

  catalog_products_data: [],
  product_id: null,

  single_product_data: [],

  basket_info: [],
  profile_info: [],
  search_product: '',

};

export default function farmMeatReducer(state = initialState, action) {
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
    case SET_CATALOG_DATA:
      return {
        ...state,
        catalog_data: payload
      };
    case SET_CATALOG_ID:
      return {
        ...state,
        catalog_id: payload
      };
    case SET_CATALOG_PRODUCTS_DATA:
      return {
        ...state,
        catalog_products_data: payload
      };
    case SET_PRODUCT_ID:
      return {
        ...state,
        product_id: payload
      };
    case SET_SINGLE_PRODUCT_DATA:
      return {
        ...state,
        single_product_data: payload
      };

    case SET_BASKET_INFO:
      return {
        ...state,
        basket_info: payload
      };
    case SET_PROFILE_INFO:
      return {
        ...state,
        profile_info: payload
      };
    case SET_SEARCH_PRODUCT:
      return {
        ...state,
        search_product: payload
      };
    default:
      return state;
  }

}
