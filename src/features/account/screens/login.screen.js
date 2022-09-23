import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Center, Text} from 'native-base';
import {Button} from 'react-native-paper';
import {FormContainer} from '../../../components/form/form-container.component';
import {Input} from '../../../components/form/input.component';
import {theme} from '../../../infrastructure/theme';
import {Error} from '../../../components/error/error.component';

export const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === '' || password === '') {
      setError('Please fill in all fields');
    } else {
      setError();
      console.log('success');
    }
  };

  return (
    <FormContainer title={'Login'}>
      <Input
        placeholder={'Enter email'}
        name={'email'}
        id={'email'}
        value={email}
        onChangeText={text => setEmail(text.toLowercase)}
      />
      <Input
        placeholder={'Enter password'}
        name={'password'}
        id={'password'}
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)}
      />
      {error && <Error message={error} />}
      <View style={styles.buttonGroup}>
        <Button
          style={styles.loginButton}
          icon={{uri: 'https://cdn-icons-png.flaticon.com/512/535/535194.png'}}
          mode="contained"
          onPress={handleSubmit}>
          Login
        </Button>
      </View>
      <View style={styles.buttonGroup}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.touchableText}>Register</Text>
        </TouchableOpacity>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  loginButton: {
    width: '80%',
    backgroundColor: theme.colors.brand.primary,
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  touchableText: {
    color: theme.colors.brand.primary,
  },
});
