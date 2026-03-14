import type {NavigatorScreenParams} from '@react-navigation/native';

/**
 * Root drawer: Main (tabs) + DrawerStack (stack with 6 screens).
 */
export type RootDrawerParamList = {
  Main: undefined;
  DrawerStack: undefined;
};

/**
 * Bottom tabs: 4 tabs, each is a stack.
 */
export type MainTabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
};

/** Params for the Main drawer item (tabs). */
export type RootDrawerParams = {
  Main: NavigatorScreenParams<MainTabParamList>;
  DrawerStack: undefined;
};

/**
 * Each tab has its own stack with 3 screens.
 */
export type HomeTabStackParamList = {
  HomeIndex: undefined;
  HomeDetail: undefined;
  HomeSettings: undefined;
};

export type ExploreTabStackParamList = {
  ExploreIndex: undefined;
  ExploreDetail: undefined;
  ExploreSettings: undefined;
};

export type ProfileTabStackParamList = {
  ProfileIndex: undefined;
  ProfileDetail: undefined;
  ProfileSettings: undefined;
};

export type SettingsTabStackParamList = {
  SettingsIndex: undefined;
  SettingsDetail: undefined;
  SettingsSettings: undefined;
};

/**
 * Drawer stack: 6 screens (reachable from drawer menu).
 */
export type DrawerStackParamList = {
  DrawerScreen1: undefined;
  DrawerScreen2: undefined;
  DrawerScreen3: undefined;
  DrawerScreen4: undefined;
  DrawerScreen5: undefined;
  DrawerScreen6: undefined;
};

/** Param list for screens that accept optional nextScreen for demo navigation. */
export type PlaceholderScreenParams = {
  title?: string;
  nextScreen?: string;
};
