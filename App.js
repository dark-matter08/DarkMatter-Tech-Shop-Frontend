import React from 'react';
import {Navigation} from './src/infrastructure/navigation';
import Toast from 'react-native-toast-message';

import {NativeBaseProvider} from 'native-base';

// redux
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const isDarkMode = true;

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigation />
        <Toast />
      </NativeBaseProvider>
    </Provider>

    // </SafeAreaView>
  );
};

export default App;
