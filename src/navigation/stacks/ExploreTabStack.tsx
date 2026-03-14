import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import type {ExploreTabStackParamList} from '../types';

const Stack = createNativeStackNavigator<ExploreTabStackParamList>();

export function ExploreTabStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="ExploreIndex"
        component={PlaceholderScreen}
        options={{title: 'Explore'}}
        initialParams={{title: 'Explore', nextScreen: 'ExploreDetail'}}
      />
      <Stack.Screen
        name="ExploreDetail"
        component={PlaceholderScreen}
        options={{title: 'Explore Detail'}}
        initialParams={{title: 'Explore Detail', nextScreen: 'ExploreSettings'}}
      />
      <Stack.Screen
        name="ExploreSettings"
        component={PlaceholderScreen}
        options={{title: 'Explore Settings'}}
        initialParams={{title: 'Explore Settings'}}
      />
    </Stack.Navigator>
  );
}
