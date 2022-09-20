import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Header} from './src/components/header/header.component';

import {ProductContainer} from './src/features/products/screens/products.screen';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    // <SafeAreaView style={backgroundStyle}>
    <NativeBaseProvider>
      <View style={styles.container}>
        <Header />
        <ProductContainer />
      </View>
    </NativeBaseProvider>

    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lighter,
  },
});

export default App;
