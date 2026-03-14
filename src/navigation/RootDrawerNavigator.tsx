import React, {lazy, Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainTabNavigator} from './MainTabNavigator';
import type {RootDrawerParamList} from './types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerStackNavigator = lazy(() =>
  import('./DrawerStackNavigator').then(m => ({default: m.DrawerStackNavigator})),
);

function DrawerStackFallback() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
}

function LazyDrawerStack() {
  return (
    <Suspense fallback={<DrawerStackFallback />}>
      <DrawerStackNavigator />
    </Suspense>
  );
}

export function RootDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name="Main"
        component={MainTabNavigator}
        options={{title: 'Main', headerShown: false}}
      />
      <Drawer.Screen
        name="DrawerStack"
        component={LazyDrawerStack}
        options={{title: 'Drawer Stack'}}
      />
    </Drawer.Navigator>
  );
}
