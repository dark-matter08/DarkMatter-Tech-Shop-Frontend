import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as All from '@fortawesome/free-solid-svg-icons';

import {theme} from '../theme';
import {Icon} from '../../components';
import {RestaurantsNavigator} from './restaurants.navigator';
import {SettingsNavigatior} from './settings.navigator';

import {MapScreen} from '../../features/map/screens/map.screen';
import {CheckoutScreen} from '../../features/checkout/screens/checkout.screen';

import {RestaurantContextProvider} from '../../services/restaurants/restaurants.context';
import {LocationContextProvider} from '../../services/location/location.context';
import {FavouritesContextProvider} from '../../services/favourites/favourites.context';
import {CartContextProvider} from '../../services/cart/cart.context';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: All.faUtensils,
  Map: All.faLocationCrosshairs,
  SettingsScreens: All.faGear,
  Checkout: All.faShoppingCart,
};

const screenOptions = ({route}) => {
  let iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({color, size}) => {
      return <Icon icon={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: theme.colors.brand.primary,
    tabBarInactiveTintColor: theme.colors.text_i.disabled,
    tabBarHideOnKeyboard: true,
    headerShown: false,
  };
};

export const AppNavigator = () => {
  return (
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantContextProvider>
          <CartContextProvider>
            <Tab.Navigator
              screenOptions={screenOptions}
              activeColor={theme.colors.brand.secondary}
              barStyle={{backgroundColor: theme.colors.brand.primary}}>
              <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
              <Tab.Screen name="Checkout" component={CheckoutScreen} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen
                name="SettingsScreens"
                component={SettingsNavigatior}
              />
            </Tab.Navigator>
          </CartContextProvider>
        </RestaurantContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};
