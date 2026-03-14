import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import {CustomBackButton} from '../../components/CustomBackButton';
import type {SettingsTabStackParamList} from '../types';

const Stack = createNativeStackNavigator<SettingsTabStackParamList>();

export function SettingsTabStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        headerLeft: ({tintColor}) => <CustomBackButton tintColor={tintColor} />,
      }}
    >
      <Stack.Screen
        name="SettingsIndex"
        component={PlaceholderScreen}
        options={{title: 'Settings', headerLeft: () => null}}
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
