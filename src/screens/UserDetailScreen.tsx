import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {ExploreTabStackParamList} from '../navigation/types';
import type {User} from '../api/types';
import type {Post} from '../api/types';
import {fetchUser} from '../api/users';
import {fetchPostsByUserId} from '../api/posts';
import {ApiError} from '../api';
import {useThemeColors} from '../context/ThemeContext';

type Props = NativeStackScreenProps<ExploreTabStackParamList, 'UserDetail'>;

export function UserDetailScreen({route}: Props) {
  const {userId} = route.params;
  const colors = useThemeColors();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [userData, postsData] = await Promise.all([
        fetchUser(userId),
        fetchPostsByUserId(userId),
      ]);
      setUser(userData);
      setPosts(postsData);
    } catch (e) {
      setError(
        e instanceof ApiError ? e.message : 'Failed to load user.',
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

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

  if (error || !user) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <Text style={[styles.error, {color: colors.text}]}>
          {error ?? 'User not found'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      <Text style={[styles.name, {color: colors.text}]}>{user.name}</Text>
      <Text style={[styles.meta, {color: colors.textSecondary}]}>
        @{user.username}
      </Text>
      <Text style={[styles.meta, {color: colors.textSecondary}]}>
        {user.email}
      </Text>
      {user.company ? (
        <Text style={[styles.company, {color: colors.textSecondary}]}>
          {user.company.name}
        </Text>
      ) : null}
      <Text style={[styles.sectionTitle, {color: colors.text}]}>
        Posts ({posts.length})
      </Text>
      {posts.map(p => (
        <View
          key={p.id}
          style={[styles.postCard, {backgroundColor: colors.backgroundSecondary, borderColor: colors.border}]}>
          <Text style={[styles.postTitle, {color: colors.text}]} numberOfLines={2}>
            {p.title}
          </Text>
          <Text style={[styles.postBody, {color: colors.textSecondary}]} numberOfLines={2}>
            {p.body}
          </Text>
        </View>
      ))}
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
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  postCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  postBody: {
    fontSize: 13,
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
