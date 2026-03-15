import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RootDrawerNavigator} from './src/navigation/RootDrawerNavigator';
import {linking} from './src/navigation/linking';
import {
  ThemeProvider,
  useTheme,
  THEME_COLORS,
} from './src/context/ThemeContext';
import {store, persistor} from './src/store';

function AppContent(): React.JSX.Element {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const colors = THEME_COLORS[theme];

  const navigationTheme = {
    dark: isDark,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.backgroundSecondary,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
    fonts: {
      regular: {fontFamily: 'System', fontWeight: '400' as const},
      medium: {fontFamily: 'System', fontWeight: '500' as const},
      bold: {fontFamily: 'System', fontWeight: '700' as const},
      heavy: {fontFamily: 'System', fontWeight: '900' as const},
    },
  };

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <NavigationContainer linking={linking} theme={navigationTheme}>
        <RootDrawerNavigator />
      </NavigationContainer>
    </>
  );
}

function RehydrationFallback(): React.JSX.Element {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<RehydrationFallback />} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <ThemeProvider>
              <AppContent />
            </ThemeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
