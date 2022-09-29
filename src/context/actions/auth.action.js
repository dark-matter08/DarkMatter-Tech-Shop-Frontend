import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import baseURL from '../../../assets/common/baseURL';
import axios from 'axios';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginUser = (user, dispatch, setLoading) => {
  fetch(`${baseURL}users/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data) {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Successfull!!!',
          text2: 'Loging in',
        });
        const token = data.token;
        const decoded = jwt_decode(token);
        AsyncStorage.setItem('jwt', token);
        dispatch(setCurrentUser(decoded, user));
        setLoading(false);
      } else {
        logoutUser(dispatch);
        setLoading(false);
      }
    })
    .catch(err => {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please provide correct credentials',
        text2: err,
      });
      logoutUser(dispatch);
      setLoading(false);
    });
};

export const getUserProfile = (id, setUserProfile, setLoading) => {
  AsyncStorage.getItem('jwt')
    .then(token => {
      axios
        .get(`${baseURL}users/${id}`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(user => {
          AsyncStorage.setItem('user', user);
          setUserProfile(user);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    })
    .catch(error => {
      console.log(error);
    });
};

export const logoutUser = dispatch => {
  AsyncStorage.removeItem('jwt');
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
