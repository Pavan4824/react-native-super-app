import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PlaceholderScreen} from '../../screens/PlaceholderScreen';
import {PostsListScreen} from '../../screens/PostsListScreen';
import {PostDetailScreen} from '../../screens/PostDetailScreen';
import {SearchScreen} from '../../screens/SearchScreen';
import {CustomBackButton} from '../../components/CustomBackButton';
import {withBackHandler} from '../../hoc/ScreenWithBackHandler';
import {useThemeColors} from '../../context/ThemeContext';
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

function SearchHeaderButton({onPress}: {onPress: () => void}) {
  const colors = useThemeColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={{marginRight: 8}}>
      <Ionicons name="search" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}

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
        options={({navigation}) => ({
          title: 'Posts',
          headerLeft: () => null,
          headerRight: () => (
            <SearchHeaderButton onPress={() => navigation.navigate('Search')} />
          ),
        })}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{title: 'Search'}}
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
