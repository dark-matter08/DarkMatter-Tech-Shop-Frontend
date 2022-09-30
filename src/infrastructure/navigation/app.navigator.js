import React, {useContext} from 'react';
import * as All from '@fortawesome/free-solid-svg-icons';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Icon} from 'native-base';
import {View} from 'react-native';

import {theme} from '../theme';
import CartIcon from '../../components/cartIcon/cart-icon.component';

import {ProductsNavigator} from './product.navigator';
import {CartNavigator} from './cart.navigator';
import {AccountNavigator} from './account.navigator';
import {AdminNavigator} from './admin.navigator';
import AuthContext from '../../context/store/auth.global';

const Tab = AnimatedTabBarNavigator();

const TAB_ICON = {
  Home: All.faHome,
  Cart: All.faShoppingCart,
  Admin: All.faDashboard,
  Profile: All.faUser,
};

const screenOptions = ({route}) => {
  let iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({color, size, focused}) => {
      return route.name === 'Cart' ? (
        <View>
          <CartIcon focused={focused} />
          <FontAwesomeIcon size={size} color={color} icon={iconName} />
        </View>
      ) : (
        <FontAwesomeIcon size={size} color={color} icon={iconName} />
      );
    },
    tabBarHideOnKeyboard: true,
    headerShown: false,
  };
};

export const AppNavigator = () => {
  const context = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      activeColor={theme.colors.brand.secondary}
      tabBarOptions={{
        activeTintColor: theme.colors.brand.tertiary,
        inactiveTintColor: theme.colors.brand.muted,
        // activeBackgroundColor: theme.colors.brand.tertiary,
        tabStyle: {
          backgroundColor: theme.colors.brand.primary,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
        },
      }}
      appearance={{floating: false}}>
      <Tab.Screen name="Home" component={ProductsNavigator} />
      <Tab.Screen name="Cart" component={CartNavigator} />
      {/* <Tab.Screen name="Admin" component={AdminNavigator} /> */}
      {context.stateUser.user.isAdmin === true && (
        <Tab.Screen name="Admin" component={AdminNavigator} />
      )}
      <Tab.Screen name="Profile" component={AccountNavigator} />
    </Tab.Navigator>
  );
};
