import AsyncStorage from '@react-native-async-storage/async-storage';
const logIn = async user => {

  await AsyncStorage.setItem('user', JSON.stringify(user));
  return {
    success: true,
    user: user,
    message: 'Login success',
  };

  // const {email, password} = user;
  //
  // if (email.value === 'admin123@gmail.com' && password.value === 'admin123') {
  //   await AsyncStorage.setItem('user', JSON.stringify(user));
  //   return {
  //     success: true,
  //     user: {
  //       email: email,
  //       token: '6308bf1f368cc901007011b763bad9d994ddfb01003872d7',
  //     },
  //     message: 'Login success',
  //   };
  // } else {
  //   return {
  //     success: false,
  //     user: {},
  //     message: 'Incorect email or password',
  //   };
  // }
};
const register = async user => {
  const {email, password} = user;

  if (email.value !== 'admin123@gmail.com') {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return {
      success: true,
      user: {
        email: email,
        token: '6308bf1f368cc901007011b763bad9d994ddfb01003872d7',
      },
      message: 'Register success',
    };
  } else {
    return {
      success: false,
      user: {},
      message: 'Email already exist',
    };
  }
};
const logOut = async () => {
  await AsyncStorage.clear();
  return {
    status: true,
    message: 'You are logged out',
  };
};

export default {
  logIn,
  register,
  logOut,
};
