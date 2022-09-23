import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';

export const Error = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: 'red',
  },
});
