import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// screens
import CheckoutScreen from '../../features/checkout/screens/checkout.screen';
import ConfirmScreen from '../../features/checkout/screens/confirm.screen';
import {PaymentScreen} from '../../features/checkout/screens/payment.screen';

const CheckoutTab = createMaterialTopTabNavigator();

const CheckTabs = () => {
  return (
    <CheckoutTab.Navigator>
      <CheckoutTab.Screen name="Shipping" component={CheckoutScreen} />
      <CheckoutTab.Screen name="Payment" component={PaymentScreen} />
      <CheckoutTab.Screen name="Confirm" component={ConfirmScreen} />
    </CheckoutTab.Navigator>
  );
};

export const CheckoutNavigator = () => {
  return <CheckTabs />;
};
