import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import baseURL from '../../../assets/common/baseURL';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginUser = (user, dispatch) => {
  console.log(user);
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
      console.log(data);
      if (data) {
        const token = data.token;
        const decoded = jwt_decode(token);
        AsyncStorage.setItem('jwt', token);
        dispatch(setCurrentUser(decoded, user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch(err => {
      console.log(err);
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please provide correct credentials',
        text2: err,
      });
      logoutUser(dispatch);
    });
};

export const getUserProfile = (id, user) => {
  fetch(`${baseURL}users/${id}`, {
    method: 'GET',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
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
