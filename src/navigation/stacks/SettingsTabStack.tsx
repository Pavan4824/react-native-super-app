import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import {AboutScreen} from '../../screens/AboutScreen';
import {CustomBackButton} from '../../components/CustomBackButton';
import {withBackHandler} from '../../hoc/ScreenWithBackHandler';
import type {SettingsTabStackParamList} from '../types';

const Stack = createNativeStackNavigator<SettingsTabStackParamList>();
const PlaceholderWithBack = withBackHandler(PlaceholderScreen);

export function SettingsTabStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        headerLeft: ({tintColor}) => <CustomBackButton tintColor={tintColor} />,
      }}>
      <Stack.Screen
        name="SettingsIndex"
        component={PlaceholderWithBack}
        options={{title: 'Settings', headerLeft: () => null}}
        initialParams={{title: 'Settings', nextScreen: 'SettingsDetail'}}
      />
      <Stack.Screen
        name="SettingsDetail"
        component={PlaceholderWithBack}
        options={{title: 'Settings Detail'}}
        initialParams={{
          title: 'Settings Detail',
          nextScreen: 'SettingsSettings',
        }}
      />
      <Stack.Screen
        name="SettingsSettings"
        component={PlaceholderWithBack}
        options={{title: 'Settings Settings'}}
        initialParams={{title: 'Settings Settings', nextScreen: 'About'}}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{title: 'About'}}
      />
    </Stack.Navigator>
  );
}
