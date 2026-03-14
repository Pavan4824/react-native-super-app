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

/** Param list for screens that accept optional nextScreen for demo navigation. */
export type PlaceholderScreenParams = {
  title?: string;
  nextScreen?: string;
};

/**
 * Each tab has its own stack with 3 screens.
 */
export type HomeTabStackParamList = {
  HomeIndex: undefined;
  Search: undefined;
  PostDetail: {postId: number};
  HomeSettings: PlaceholderScreenParams | undefined;
};

export type ExploreTabStackParamList = {
  ExploreIndex: undefined;
  UserDetail: {userId: number};
  ExploreSettings: PlaceholderScreenParams | undefined;
};

export type ProfileTabStackParamList = {
  ProfileIndex: PlaceholderScreenParams | undefined;
  ProfileDetail: PlaceholderScreenParams | undefined;
  ProfileSettings: PlaceholderScreenParams | undefined;
};

export type SettingsTabStackParamList = {
  SettingsIndex: PlaceholderScreenParams | undefined;
  SettingsDetail: PlaceholderScreenParams | undefined;
  SettingsSettings: PlaceholderScreenParams | undefined;
};

/**
 * Drawer stack: 6 screens (reachable from drawer menu).
 */
export type DrawerStackParamList = {
  DrawerScreen1: PlaceholderScreenParams | undefined;
  DrawerScreen2: PlaceholderScreenParams | undefined;
  DrawerScreen3: PlaceholderScreenParams | undefined;
  DrawerScreen4: PlaceholderScreenParams | undefined;
  DrawerScreen5: PlaceholderScreenParams | undefined;
  DrawerScreen6: PlaceholderScreenParams | undefined;
};
