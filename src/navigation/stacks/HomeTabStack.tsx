import React from 'react';
import {Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import {CustomBackButton} from '../../components/CustomBackButton';
import {withBackHandler} from '../../hoc/ScreenWithBackHandler';
import type {HomeTabStackParamList} from '../types';

const Stack = createNativeStackNavigator<HomeTabStackParamList>();
const PlaceholderWithBack = withBackHandler(PlaceholderScreen, {
  onBackRequest: ({completeBack}) => {
    Alert.alert('Leave?', 'Are you sure you want to leave?', [
      {text: "Don't leave", style: 'cancel'},
      {text: 'Leave', style: 'destructive', onPress: completeBack},
    ]);
  },
});

export function HomeTabStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
        headerLeft: ({tintColor}) => <CustomBackButton tintColor={tintColor} />,
      }}>
      <Stack.Screen
        name="HomeIndex"
        component={PlaceholderWithBack}
        options={{title: 'Home', headerLeft: () => null}}
        initialParams={{title: 'Home', nextScreen: 'HomeDetail'}}
      />
      <Stack.Screen
        name="HomeDetail"
        component={PlaceholderWithBack}
        options={{title: 'Home Detail'}}
        initialParams={{title: 'Home Detail', nextScreen: 'HomeSettings'}}
      />
      <Stack.Screen
        name="HomeSettings"
        component={PlaceholderWithBack}
        options={{title: 'Home Settings'}}
        initialParams={{title: 'Home Settings'}}
      />
    </Stack.Navigator>
  );
}
