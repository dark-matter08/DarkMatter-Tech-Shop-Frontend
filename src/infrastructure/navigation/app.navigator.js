import React from 'react';
import * as All from '@fortawesome/free-solid-svg-icons';

import {theme} from '../theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductsNavigator} from './product.navigator';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {VStack, Icon} from 'native-base';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

const Tab = AnimatedTabBarNavigator();

const TAB_ICON = {
  Home: All.faHome,
  Cart: All.faShoppingCart,
  Admin: All.faGear,
  Profile: All.faUser,
};

const screenOptions = ({route}) => {
  let iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({color, size}) => {
      return (
        <Icon size={size} as={FontAwesomeIcon} color={color} icon={iconName} />
      );
    },
    tabBarHideOnKeyboard: true,
    headerShown: false,
  };
};

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      activeColor={theme.colors.brand.secondary}
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#222222',
        // activeBackgroundColor: theme.colors.brand.tertiary,
        tabStyle: {
          backgroundColor: theme.colors.brand.primary,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
        },
      }}
      appearance={{floating: false}}>
      <Tab.Screen name="Home" component={ProductsNavigator} />
      <Tab.Screen name="Cart" component={ProductsNavigator} />
      <Tab.Screen name="Admin" component={ProductsNavigator} />
      <Tab.Screen name="Profile" component={ProductsNavigator} />
    </Tab.Navigator>
  );
};
