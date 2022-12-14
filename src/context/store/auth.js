import React, {useReducer, useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../reducers/auth.reducer';
import {setCurrentUser} from '../actions/auth.action';
import AuthContext from './auth.global';

export const AuthProvider = ({children}) => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setShowChild(true);
    AsyncStorage.getItem('jwt')
      .then(res => {
        setToken(res);
      })
      .catch(err => {
        console.log(err);
      });
    AsyncStorage.getItem('user')
      .then(res => {
        setUser(JSON.parse(res));
      })
      .catch(err => {
        console.log(err);
      });

    if (token) {
      const decoded = jwt_decode(token);
      var date_now = Math.round(new Date().getTime() / 1000);
      if (decoded.exp > date_now) {
        if (setShowChild) {
          dispatch(setCurrentUser(decoded));
        }
      }
    }

    return () => setShowChild(false);
  }, [showChild, token]);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          stateUser,
          dispatch,
        }}>
        {children}
      </AuthContext.Provider>
    );
  }
};
