import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {HomeTabStackParamList} from '../navigation/types';
import {fetchPost} from '../api/posts';
import {fetchUser} from '../api/users';
import type {Post} from '../api/types';
import type {User} from '../api/types';
import {ApiError} from '../api';
import {useThemeColors} from '../context/ThemeContext';

type Props = NativeStackScreenProps<HomeTabStackParamList, 'PostDetail'>;

export function PostDetailScreen({route}: Props) {
  const {postId} = route.params;
  const colors = useThemeColors();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const postData = await fetchPost(postId);
      setPost(postData);
      const u = await fetchUser(postData.userId).catch(() => null);
      setAuthor(u ?? null);
    } catch (e) {
      setError(
        e instanceof ApiError ? e.message : 'Failed to load post.',
      );
    } finally {
      setLoading(false);
    }
  }, [postId]);

  React.useEffect(() => {
    load();
  }, [load]);

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

  if (error || !post) {
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
