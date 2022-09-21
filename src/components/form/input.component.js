import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
// import { TextInput } from 'react-native-paper';
import {theme} from '../../infrastructure/theme';

export const Input = props => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor={theme.colors.text_i.secondary}
      name={props.name}
      id={props.id}
      value={props.value}
      autoCorrect={props.autoCorrect}
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 60,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
    color: '#000',
  },
});
