import React from 'react';
import {ScrollView, Dimensions, StyleSheet} from 'react-native';
import {Text} from 'native-base';

var {width} = Dimensions.get('window');

export const FormContainer = ({title, children}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 400,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    height: 50,
    paddingTop: 15,
  },
});
