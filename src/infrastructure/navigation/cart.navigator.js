import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
  ModalSlideFromBottomIOS,
  ModalPresentationIOS,
} from '@react-navigation/stack';
import CartScreen from '../../features/cart/screen/cart.screen';
import {CheckoutNavigator} from './checkout.navigator';

const CartStack = createStackNavigator();

export const CartNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
        CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <CartStack.Screen name="CartScreen" component={CartScreen} />
      <CartStack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{gestureEnabled: false}}
      />
    </CartStack.Navigator>
  );
};
