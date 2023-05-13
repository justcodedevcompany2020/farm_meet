import {LOGIN_SUCCESS,REGISTER_SUCCESS, LOGOUT, CHECK_TOKEN} from './type';
import AuthService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
