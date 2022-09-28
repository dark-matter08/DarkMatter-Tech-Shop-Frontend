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

  useEffect(() => {
    setShowChild(true);
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : '';
      if (showChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)));
      }
    }

    return () => setShowChild(false);
  }, [showChild]);

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
