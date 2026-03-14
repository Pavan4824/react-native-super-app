import React from 'react';
import {Platform, Pressable, StyleSheet, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SIZE = 24;
const HIT_SLOP = {top: 12, bottom: 12, left: 12, right: 12};

type Props = {
  tintColor?: string;
  style?: ViewStyle;
};

export function CustomBackButton({tintColor = '#007AFF', style}: Props) {
  const navigation = useNavigation();

  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      hitSlop={HIT_SLOP}
      style={({pressed}) => [styles.container, style, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <Ionicons
        name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
        size={Platform.OS === 'ios' ? 28 : 24}
        color={tintColor}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: Platform.OS === 'ios' ? 8 : 16,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
