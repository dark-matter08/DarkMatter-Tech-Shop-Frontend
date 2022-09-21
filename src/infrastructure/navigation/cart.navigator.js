import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import CartScreen from '../../features/cart/screen/cart.screen';
import {CheckoutScreen} from '../../features/checkout/screens/checkout.screen';

const ProductStack = createStackNavigator();

export const CartNavigator = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}>
      <ProductStack.Screen name="CartScreen" component={CartScreen} />
      <ProductStack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          gestureEnabled: true,
        }}
      />
    </ProductStack.Navigator>
  );
};
