import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeTabStack} from './stacks/HomeTabStack';
import {ExploreTabStack} from './stacks/ExploreTabStack';
import {ProfileTabStack} from './stacks/ProfileTabStack';
import {SettingsTabStack} from './stacks/SettingsTabStack';
import type {MainTabParamList} from './types';
import {useThemeColors} from '../context/ThemeContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<
  keyof MainTabParamList,
  {focused: string; unfocused: string}
> = {
  HomeTab: {focused: 'home', unfocused: 'home-outline'},
  ExploreTab: {focused: 'compass', unfocused: 'compass-outline'},
  ProfileTab: {focused: 'person', unfocused: 'person-outline'},
  SettingsTab: {focused: 'settings', unfocused: 'settings-outline'},
};

export function MainTabNavigator() {
  const colors = useThemeColors();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: colors.backgroundSecondary},
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {fontSize: 12},
        tabBarIcon: ({focused, color, size}) => {
          const icons = TAB_ICONS[route.name as keyof MainTabParamList];
          const iconName = focused ? icons.focused : icons.unfocused;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeTabStack}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreTabStack}
        options={{title: 'Explore'}}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTabStack}
        options={{title: 'Profile'}}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsTabStack}
        options={{title: 'Settings'}}
      />
    </Tab.Navigator>
  );
}
