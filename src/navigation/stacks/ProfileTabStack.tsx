import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import type {ProfileTabStackParamList} from '../types';

const Stack = createNativeStackNavigator<ProfileTabStackParamList>();

export function ProfileTabStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="ProfileIndex"
        component={PlaceholderScreen}
        options={{title: 'Profile'}}
        initialParams={{title: 'Profile', nextScreen: 'ProfileDetail'}}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={PlaceholderScreen}
        options={{title: 'Profile Detail'}}
        initialParams={{title: 'Profile Detail', nextScreen: 'ProfileSettings'}}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={PlaceholderScreen}
        options={{title: 'Profile Settings'}}
        initialParams={{title: 'Profile Settings'}}
      />
    </Stack.Navigator>
  );
}
