import React, {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';

export type Theme = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
};

export const THEME_COLORS: Record<Theme, ThemeColors> = {
  light: {
    background: '#f5f5f5',
    backgroundSecondary: '#fff',
    text: '#111',
    textSecondary: '#666',
    primary: '#007AFF',
    border: '#e0e0e0',
  },
  dark: {
    background: '#121212',
    backgroundSecondary: '#1e1e1e',
    text: '#f5f5f5',
    textSecondary: '#b0b0b0',
    primary: '#0a84ff',
    border: '#2c2c2e',
  },
};

export const ThemeContext = createContext<Theme | null>(null);

export function useTheme(): Theme {
  const value = useContext(ThemeContext);
  if (value == null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return value;
}

export function useThemeColors(): ThemeColors {
  return THEME_COLORS[useTheme()];
}

type ThemeProviderProps = {children: React.ReactNode};

export function ThemeProvider({children}: ThemeProviderProps) {
  const colorScheme = useColorScheme();
  const theme: Theme = colorScheme === 'dark' ? 'dark' : 'light';
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
