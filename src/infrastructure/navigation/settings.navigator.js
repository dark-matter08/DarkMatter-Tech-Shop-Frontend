import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {SettingsScreen} from '../../features/settings/screens/settings.screen';
import {FavouritesScreen} from '../../features/settings/screens/favourites.screen';
import {CameraScreen} from '../../features/settings/screens/camera.screen';

const SettingsStack = createStackNavigator();

export const SettingsNavigatior = ({route, navigation}) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favourites" component={FavouritesScreen} />
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};
