import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import {UsersListScreen} from '../../screens/UsersListScreen';
import {UserDetailScreen} from '../../screens/UserDetailScreen';
import {CustomBackButton} from '../../components/CustomBackButton';
import {withBackHandler} from '../../hoc/ScreenWithBackHandler';
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
      }}>
      <Stack.Screen
        name="ExploreIndex"
        component={UsersListScreen}
        options={{title: 'Users', headerLeft: () => null}}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{title: 'User'}}
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
