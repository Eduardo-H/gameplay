import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from  '../screens/Home';
import { AppointmentCreate } from  '../screens/AppointmentCreate';
import { AppointmentDetails } from  '../screens/AppointmentDetails';

import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >
      <Screen
        name="Home"
        component={Home}
      />

      <Screen
        name="AppointmentCreate"
        component={AppointmentCreate}
      />

      <Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
      />
    </Navigator>
  );
}