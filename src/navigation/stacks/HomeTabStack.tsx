import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import type {HomeTabStackParamList} from '../types';

const Stack = createNativeStackNavigator<HomeTabStackParamList>();

export function HomeTabStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="HomeIndex"
        component={PlaceholderScreen}
        options={{title: 'Home'}}
        initialParams={{title: 'Home', nextScreen: 'HomeDetail'}}
      />
      <Stack.Screen
        name="HomeDetail"
        component={PlaceholderScreen}
        options={{title: 'Home Detail'}}
        initialParams={{title: 'Home Detail', nextScreen: 'HomeSettings'}}
      />
      <Stack.Screen
        name="HomeSettings"
        component={PlaceholderScreen}
        options={{title: 'Home Settings'}}
        initialParams={{title: 'Home Settings'}}
      />
    </Stack.Navigator>
  );
}
