import React from 'react';
import {Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import {PostsListScreen} from '../../screens/PostsListScreen';
import {PostDetailScreen} from '../../screens/PostDetailScreen';
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
        component={PostsListScreen}
        options={{title: 'Posts', headerLeft: () => null}}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{title: 'Post'}}
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
