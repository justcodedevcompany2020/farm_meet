import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  CHECK_TOKEN,
  SET_CATALOG_DATA,
  SET_CATALOG_ID,
  SET_CATALOG_PRODUCTS_DATA,
  SET_PRODUCT_ID,
  SET_SINGLE_PRODUCT_DATA


} from './type';
import AuthService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCatalogData = () => dispatch => {
  return new Promise( async (resolve, reject) => {
    let userInfo = await AsyncStorage.getItem('user');
    userInfo = JSON.parse(userInfo)
    let token =  userInfo.token;
    let session =  userInfo.session;
    console.log(token, 'hhhhhhh');

    try {

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let formdata = new FormData();
      formdata.append("session", session);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      let response = await fetch("https://farm-meat.site/shop/categories/", requestOptions);
      let data = await response.json();

      console.log(data, 'cataloginfo');
      if (response.status == 200) {
        dispatch({
          type: SET_CATALOG_DATA,
          payload: data,
        });
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProductsByCatalogCategoryId = catalogId => dispatch => {
  return new Promise( async (resolve, reject) => {
    let userInfo = await AsyncStorage.getItem('user');
    userInfo = JSON.parse(userInfo)
    let token =  userInfo.token;
    let session =  userInfo.session;
    console.log(token, 'hhhhhhh');
    console.log(catalogId, 'catalog id');

    try {

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let formdata = new FormData();
      formdata.append("session", session);
      formdata.append("category", catalogId);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      let response = await fetch("https://farm-meat.site/shop/products/", requestOptions);
      let data = await response.json();

      console.log(data, 'product info by id');
      if (response.status == 200) {
        dispatch({
          type: SET_CATALOG_PRODUCTS_DATA,
          payload: data,
        });
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSingleProductByProductId = productId => dispatch => {
  return new Promise( async (resolve, reject) => {
    let userInfo = await AsyncStorage.getItem('user');
    userInfo = JSON.parse(userInfo)
    let token =  userInfo.token;
    let session =  userInfo.session;
    console.log(token, 'hhhhhhh');
    console.log(productId, 'product id');

    try {

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let formdata = new FormData();
      formdata.append("session", session);


      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      let response = await fetch(`https://farm-meat.site/shop/products/${productId}/`, requestOptions);
      let data = await response.json();

      console.log(data, 'product single info');
      if (response.status == 200) {
        dispatch({
          type: SET_SINGLE_PRODUCT_DATA,
          payload: data,
        });
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};


export const setCatalogId = (catalogId, callback) => dispatch => {
  return new Promise( async (resolve, reject) => {
    console.log(catalogId, 'id');
    dispatch({
      type: SET_CATALOG_ID,
      payload: catalogId,
    });
    callback()
  });
};

export const setProductId = (productId, callback) => dispatch => {
  return new Promise( async (resolve, reject) => {
    console.log(productId, 'id');
    dispatch({
      type: SET_PRODUCT_ID,
      payload: productId,
    });
    callback()
  });
};







export const login = user => dispatch => {
  return AuthService.logIn(user).then(
    response => {
      if (response.success === true) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {user: response.user},
        });
      }
      Promise.resolve();
      return response;
    },
    error => {
      const message = error.toString();
      Promise.reject();
      return message;
    },
  );
};

export const register = user => dispatch => {
  return AuthService.register(user).then(
    response => {
      if (response.success === true) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {user: response.user},
        });
      }
      Promise.resolve();
      return response;
    },
    error => {
      const message = error.toString();
      Promise.reject();
      return message;
    },
  );
};
export const logout = () => dispatch => {
  return AuthService.logOut().then(response => {
    if (response.status === true) {
      dispatch({
        type: LOGOUT,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const checkToken = () => {
  try {
    return async dispatch => {
      const user = await AsyncStorage.getItem('user');
      dispatch({
        type: CHECK_TOKEN,
        payload: {
          user: user ? user : null,
          isLoggedIn: user ? true : false,
        },
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {}
};
