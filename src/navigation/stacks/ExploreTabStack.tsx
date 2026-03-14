import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import {CustomBackButton} from '../../components/CustomBackButton';
import {withBackHandler} from '../../components/ScreenWithBackHandler';
import type {ExploreTabStackParamList} from '../types';

const Stack = createNativeStackNavigator<ExploreTabStackParamList>();
const PlaceholderWithBack = withBackHandler(PlaceholderScreen);

export function ExploreTabStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        headerLeft: ({tintColor}) => <CustomBackButton tintColor={tintColor} />,
      }}
    >
      <Stack.Screen
        name="ExploreIndex"
        component={PlaceholderWithBack}
        options={{title: 'Explore', headerLeft: () => null}}
        initialParams={{title: 'Explore', nextScreen: 'ExploreDetail'}}
      />
      <Stack.Screen
        name="ExploreDetail"
        component={PlaceholderWithBack}
        options={{title: 'Explore Detail'}}
        initialParams={{title: 'Explore Detail', nextScreen: 'ExploreSettings'}}
      />
      <Stack.Screen
        name="ExploreSettings"
        component={PlaceholderWithBack}
        options={{title: 'Explore Settings'}}
        initialParams={{title: 'Explore Settings'}}
      />
    </Stack.Navigator>
  );
}
