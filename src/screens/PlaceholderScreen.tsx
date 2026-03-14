import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {PlaceholderScreenParams} from '../navigation/types';

type Props = NativeStackScreenProps<
  Record<string, PlaceholderScreenParams | undefined>,
  string
>;

export function PlaceholderScreen({route, navigation}: Props) {
  const title = route.params?.title ?? route.name;
  const nextScreen = route.params?.nextScreen;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {nextScreen ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(nextScreen as never)}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.goBack()}
      >
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
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
    color: '#111',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#ccc',
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
