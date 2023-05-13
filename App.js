// import React, {useEffect} from 'react';
//
//
// import RootNavigator from './src/navigation/RootNavigator';
//
// const App = () => {
//   return (
//
//       <RootNavigator />
//
//   );
// };
//
// export default App;
//


import React from 'react';
import { StatusBar } from 'react-native';
// import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
      <Provider store={store}>
        <StatusBar hidden={true} />
        <RootNavigator />
      </Provider>
  );
};

export default App;
