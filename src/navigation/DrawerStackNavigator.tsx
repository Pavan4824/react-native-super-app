import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../screens/PlaceholderScreen';
import type {DrawerStackParamList} from './types';

const Stack = createNativeStackNavigator<DrawerStackParamList>();

export function DrawerStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="DrawerScreen1"
        component={PlaceholderScreen}
        options={{title: 'Drawer 1'}}
        initialParams={{title: 'Drawer Screen 1', nextScreen: 'DrawerScreen2'}}
      />
      <Stack.Screen
        name="DrawerScreen2"
        component={PlaceholderScreen}
        options={{title: 'Drawer 2'}}
        initialParams={{title: 'Drawer Screen 2', nextScreen: 'DrawerScreen3'}}
      />
      <Stack.Screen
        name="DrawerScreen3"
        component={PlaceholderScreen}
        options={{title: 'Drawer 3'}}
        initialParams={{title: 'Drawer Screen 3', nextScreen: 'DrawerScreen4'}}
      />
      <Stack.Screen
        name="DrawerScreen4"
        component={PlaceholderScreen}
        options={{title: 'Drawer 4'}}
        initialParams={{title: 'Drawer Screen 4', nextScreen: 'DrawerScreen5'}}
      />
      <Stack.Screen
        name="DrawerScreen5"
        component={PlaceholderScreen}
        options={{title: 'Drawer 5'}}
        initialParams={{title: 'Drawer Screen 5', nextScreen: 'DrawerScreen6'}}
      />
      <Stack.Screen
        name="DrawerScreen6"
        component={PlaceholderScreen}
        options={{title: 'Drawer 6'}}
        initialParams={{title: 'Drawer Screen 6'}}
      />
    </Stack.Navigator>
  );
}
