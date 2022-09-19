import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {RestaurantsScreen} from '../../features/restaurants/screens/restaurant.screen';
import {RestaurantDetailScreen} from '../../features/restaurants/screens/restaurant-detail.screen';

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}>
      <RestaurantStack.Screen name="Restau" component={RestaurantsScreen} />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{
          gestureEnabled: true,
        }}
      />
    </RestaurantStack.Navigator>
  );
};
