import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {HomeTabStackParamList} from '../navigation/types';
import {useThemeColors} from '../context/ThemeContext';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectPostDetailState} from '../store/selectors';
import {fetchPostByIdThunk} from '../store/slices/postsSlice';

type Props = NativeStackScreenProps<HomeTabStackParamList, 'PostDetail'>;

export function PostDetailScreen({route}: Props) {
  const postId = Number(route.params.postId);
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const {post, author, loading, error} =
    useAppSelector(selectPostDetailState);

  useEffect(() => {
    dispatch(fetchPostByIdThunk(postId));
  }, [dispatch, postId]);

  if (loading) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.message, {color: colors.textSecondary}]}>
          Loading…
        </Text>
      </View>
    );
  }

  if (error || !post || post.id !== postId) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <Text style={[styles.error, {color: colors.text}]}>
          {error ?? 'Post not found'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      {author ? (
        <Text style={[styles.author, {color: colors.textSecondary}]}>
          by {author.name}
        </Text>
      ) : null}
      <Text style={[styles.title, {color: colors.text}]}>{post.title}</Text>
      <Text style={[styles.body, {color: colors.text}]}>{post.body}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  author: {
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
  },
});
