import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
  CHECK_TOKEN,
} from './type';
import AuthService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const selectHoroscope = selectedHoroscopeId => dispatch => {
//   return new Promise((resolve, reject) => {
//     try {
//       dispatch({
//         type: SELECT_HOROSCOPE,
//         payload: selectedHoroscopeId,
//       });
//       resolve(true);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };



// export const getHoroscopeById = selectedHoroscopeId => dispatch => {
//   return new Promise((resolve, reject) => {
//     try {
//       let horoscopes = HoroscopsFullList;
//       let horoscop = horoscopes.find(item => item.id === selectedHoroscopeId);
//
//       // Получаем индекс текста гороскопа - start:
//       const currentDate = new Date();
//       const startOfDay = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         currentDate.getDate(),
//       );
//       const daysSinceEpoch = Math.floor((startOfDay - new Date(1970, 0, 1)) / (1000 * 60 * 60 * 24));
//       const horoscopse_index = daysSinceEpoch % horoscop.horoscopse.length;
//       // Получаем индекс текста гороскопа - end;
//
//       // console.log(horoscop.horoscopse, 'horoscop');
//       console.log(daysSinceEpoch, horoscop.horoscopse.length, 'result');
//       console.log(horoscopse_index, 'result');
//
//       horoscop.text = horoscop.horoscopse[horoscopse_index];
//
//
//
//
//       dispatch({
//         type: GET_HOROSCOPE_BY_ID,
//         payload: horoscop,
//       });
//       resolve(true);
//
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

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
