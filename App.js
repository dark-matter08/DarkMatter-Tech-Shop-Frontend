import React from 'react';
import {Navigation} from './src/infrastructure/navigation';

import {NativeBaseProvider} from 'native-base';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const isDarkMode = true;

  return (
    <NativeBaseProvider>
      <Navigation />
    </NativeBaseProvider>

    // </SafeAreaView>
  );
};

export default App;
