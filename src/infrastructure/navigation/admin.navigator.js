import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {CategoriesScreen} from '../../features/admin/screens/categories.screen';
import {ProductsScreen} from '../../features/admin/screens/products.screen';
import {ProductFormScreen} from '../../features/admin/screens/product-form.screen';
import {OrdersScreen} from '../../features/admin/screens/orders.screen';

const AdminStack = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{
        // headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AdminStack.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <AdminStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <AdminStack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <AdminStack.Screen
        name="ProductForm"
        component={ProductFormScreen}
        options={{
          gestureEnabled: true,
        }}
      />
    </AdminStack.Navigator>
  );
};
