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
  SET_SEARCH_PRODUCT, SET_MY_ORDERS_INFO,

} from './type';
import AuthService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCatalogData = () => dispatch => {
  return new Promise( async (resolve, reject) => {
    let userInfo = await AsyncStorage.getItem('user');
    userInfo = JSON.parse(userInfo)
    let token =  userInfo.token;
    let session =  userInfo.session;
    console.log(token, 'token');
    console.log(session, 'session');

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

export const setSearchProduct = (search_result) => dispatch => {
  dispatch({
    type: SET_SEARCH_PRODUCT,
    payload: search_result,
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


export const getBasketInfo = () => dispatch => {
  return new Promise( async (resolve, reject) => {
    let userInfo = await AsyncStorage.getItem('user');
    userInfo = JSON.parse(userInfo)
    let token =  userInfo.token;
    let session =  userInfo.session;
    console.log(token, 'token');
    console.log(session, 'session');

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

      let response = await fetch("https://farm-meat.site/shop/basket/", requestOptions);
      let data = await response.json();

      console.log(data, 'basket info');
      if (response.status == 200) {
        dispatch({
          type: SET_BASKET_INFO,
          payload: data,
        });
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};


export const addToBasket = (id, amount) => dispatch => {
  return new Promise( async (resolve, reject) => {
    let userInfo = await AsyncStorage.getItem('user');
    userInfo = JSON.parse(userInfo)
    let token =  userInfo.token;
    let session =  userInfo.session;
    // console.log(token, 'token');
    // console.log(session, 'session');

    try {

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let formdata = new FormData();
      formdata.append("session", session);
      formdata.append("product", id);
      formdata.append("amount", amount);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      let response = await fetch("https://farm-meat.site/shop/basket/update/", requestOptions);
      let data = await response.json();

      console.log(data, 'basket info');
      if (response.status == 200) {
        console.log(amount, 'basketabsx asnxassssss');

        dispatch(getBasketInfo())
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};


export const getProfileData = () => dispatch => {
  return new Promise( async (resolve, reject) => {
    let userInfo = await AsyncStorage.getItem('user');
    userInfo = JSON.parse(userInfo)
    let token =  userInfo.token;
    let session =  userInfo.session;
    console.log(token, 'token');
    console.log(session, 'session');

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

      let response = await fetch("https://farm-meat.site/shop/user/info/", requestOptions);
      let data = await response.json();

      console.log(data, 'profileInfo');
      if (response.status == 200) {
        dispatch({
          type: SET_PROFILE_INFO,
          payload: data,
        });
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
export const getMyOrdersData = () => dispatch => {
  return new Promise( async (resolve, reject) => {
    let userInfo = await AsyncStorage.getItem('user');
    userInfo = JSON.parse(userInfo)
    let token =  userInfo.token;
    let session =  userInfo.session;
    console.log(token, 'token');
    console.log(session, 'session');

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

      let response = await fetch("https://farm-meat.site/shop/orders/", requestOptions);
      let data = await response.json();

      console.log(data, 'my orders');
      if (response.status == 200) {
        dispatch({
          type: SET_MY_ORDERS_INFO,
          payload: data,
        });
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
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
