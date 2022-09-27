import React, {useEffect} from 'react';
import {Navigation} from './src/infrastructure/navigation';
import Toast from 'react-native-toast-message';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

import {NativeBaseProvider} from 'native-base';

// cart redux
import {Provider} from 'react-redux';
import store from './src/redux/store';

// auth context
import {AuthProvider} from './src/context/store/auth';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const isDarkMode = true;
  useEffect(() => {
    setTimeout(() => {
      LottieSplashScreen.hide(); // here
    }, 5_000);
  }, []);

  return (
    <AuthProvider>
      <Provider store={store}>
        <NativeBaseProvider>
          <Navigation />
          <Toast />
        </NativeBaseProvider>
      </Provider>
    </AuthProvider>

    // </SafeAreaView>
  );
};

export default App;
