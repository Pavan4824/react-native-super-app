import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {PlaceholderScreenParams} from '../navigation/types';
import {useThemeColors} from '../context/ThemeContext';

type Props = NativeStackScreenProps<
  Record<string, PlaceholderScreenParams | undefined>,
  string
>;

export function PlaceholderScreen({route, navigation}: Props) {
  const colors = useThemeColors();
  const title = route.params?.title ?? route.name;
  const nextScreen = route.params?.nextScreen;

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
      {nextScreen ? (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.primary}]}
          onPress={() => navigation.navigate(nextScreen as never)}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={[styles.buttonSecondary, {backgroundColor: colors.border}]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonSecondary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
