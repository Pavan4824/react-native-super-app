import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import {CustomBackButton} from '../../components/CustomBackButton';
import type {ProfileTabStackParamList} from '../types';

const Stack = createNativeStackNavigator<ProfileTabStackParamList>();

export function ProfileTabStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        headerLeft: ({tintColor}) => <CustomBackButton tintColor={tintColor} />,
      }}
    >
      <Stack.Screen
        name="ProfileIndex"
        component={PlaceholderScreen}
        options={{title: 'Profile', headerLeft: () => null}}
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
