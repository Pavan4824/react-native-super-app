import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import type {SettingsTabStackParamList} from '../types';

const Stack = createNativeStackNavigator<SettingsTabStackParamList>();

export function SettingsTabStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="SettingsIndex"
        component={PlaceholderScreen}
        options={{title: 'Settings'}}
        initialParams={{title: 'Settings', nextScreen: 'SettingsDetail'}}
      />
      <Stack.Screen
        name="SettingsDetail"
        component={PlaceholderScreen}
        options={{title: 'Settings Detail'}}
        initialParams={{title: 'Settings Detail', nextScreen: 'SettingsSettings'}}
      />
      <Stack.Screen
        name="SettingsSettings"
        component={PlaceholderScreen}
        options={{title: 'Settings Settings'}}
        initialParams={{title: 'Settings Settings'}}
      />
    </Stack.Navigator>
  );
}
