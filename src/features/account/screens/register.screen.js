import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {Button} from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import {FormContainer} from '../../../components/form/form-container.component';
import {Input} from '../../../components/form/input.component';
import {Error} from '../../../components/error/error.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {theme} from '../../../infrastructure/theme';
import baseURL from '../../../../assets/common/baseURL';

export const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = () => {
    if (email === '' || name === '' || phone === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }

    setError('');

    let user = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      isAdmin: false,
    };

    console.log(user);

    axios
      .post(`${baseURL}users/register`, user)
      .then(res => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'registration succeeded',
            text2: 'please login to your account',
          });
          setTimeout(() => {
            navigation.navigate('Login');
          }, 500);
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'somethin went wrong, try again later',
          text2: err,
        });
      });
    return null;
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}>
      <FormContainer title={'Register'}>
        <Input
          placeholder="Email"
          name="email"
          id="email"
          onChangeText={text => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder="Name"
          name="name"
          id="name"
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder="Phone Number"
          name="phone"
          id="phone"
          keyboardType="numeric"
          onChangeText={text => setPhone(text)}
        />
        <Input
          placeholder="Password"
          name="password"
          id="password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <View>{error && <Error message={error} />}</View>
        <View style={styles.buttonGroup}>
          <Button
            style={styles.loginButton}
            icon={{
              uri: 'https://cdn-icons-png.flaticon.com/512/535/535194.png',
            }}
            mode="contained"
            onPress={register}>
            Register
          </Button>
        </View>
        <View style={styles.buttonGroup}>
          <Text style={styles.middleText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.touchableText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
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
