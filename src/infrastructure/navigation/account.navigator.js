import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RegisterScreen} from '../../features/account/screens/register.screen';
import {LoginScreen} from '../../features/account/screens/login.screen';
import {AccountScreen} from '../../features/account/screens/account.screen';

const AccountStack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AccountStack.Screen name="Main" component={AccountScreen} />
      <AccountStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <AccountStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          gestureEnabled: true,
        }}
      />
    </AccountStack.Navigator>
  );
};
