import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useThemeColors} from '../context/ThemeContext';
import {getAppVersionString} from '../native/AppInfo';

export function AboutScreen() {
  const colors = useThemeColors();
  const versionString = getAppVersionString();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text}]}>About superApp</Text>
      <Text style={[styles.version, {color: colors.textSecondary}]}>
        Version {versionString}
      </Text>
      <Text style={[styles.caption, {color: colors.textSecondary}]}>
        (via TurboModule — synchronous JSI)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  version: {
    fontSize: 16,
    marginBottom: 8,
  },
  caption: {
    fontSize: 12,
    opacity: 0.8,
  },
});
