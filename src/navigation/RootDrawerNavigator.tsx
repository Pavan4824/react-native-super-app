import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainTabNavigator} from './MainTabNavigator';
import {DrawerStackNavigator} from './DrawerStackNavigator';
import type {RootDrawerParamList} from './types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function RootDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name="Main"
        component={MainTabNavigator}
        options={{title: 'Main', headerShown: false}}
      />
      <Drawer.Screen
        name="DrawerStack"
        component={DrawerStackNavigator}
        options={{title: 'Drawer Stack'}}
      />
    </Drawer.Navigator>
  );
}
