import React from 'react';
import {Header} from './src/components/header/header.component';
import {Navigation} from './src/infrastructure/navigation';

import {ProductScreen} from './src/features/products/screens/products.screen';
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
