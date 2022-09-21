import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {ProductScreen} from '../../features/products/screens/products.screen';
import {ProductDetailsScreen} from '../../features/products/screens/product-details.screen';

const ProductStack = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}>
      <ProductStack.Screen name="Products" component={ProductScreen} />
      <ProductStack.Screen
        name="Product Details"
        component={ProductDetailsScreen}
        options={{
          gestureEnabled: true,
        }}
      />
    </ProductStack.Navigator>
  );
};
