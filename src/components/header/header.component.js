import React from 'react';
import {StyleSheet, Image, View, SafeAreaView} from 'react-native';

export const Header = props => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require('../../../assets/images/logo.png')}
        resizeMode="contain"
        style={{height: 45}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'white',
    // marginTop: 70, //todo: delete
  },
});
