import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {RegisterScreen} from '../../features/account/screens/register.screen';
import {LoginScreen} from '../../features/account/screens/login.screen';
import {UserProfileScreen} from '../../features/account/screens/user-profile.screen';

const AccountStack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AccountStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <AccountStack.Screen
        name="User Profile"
        component={UserProfileScreen}
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
