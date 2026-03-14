import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {HomeTabStackParamList} from '../navigation/types';
import type {Post} from '../api/types';
import {fetchPosts} from '../api/posts';
import {ApiError} from '../api';
import {useThemeColors} from '../context/ThemeContext';

type Props = NativeStackScreenProps<HomeTabStackParamList, 'HomeIndex'>;

export function PostsListScreen({navigation}: Props) {
  const colors = useThemeColors();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (e) {
      setError(
        e instanceof ApiError ? e.message : 'Failed to load posts. Pull to retry.',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const onPressPost = useCallback(
    (postId: number) => {
      navigation.navigate('PostDetail', {postId});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: Post}) => (
      <TouchableOpacity
        style={[styles.card, {backgroundColor: colors.backgroundSecondary, borderColor: colors.border}]}
        onPress={() => onPressPost(item.id)}
        activeOpacity={0.7}>
        <Text style={[styles.cardTitle, {color: colors.text}]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.cardBody, {color: colors.textSecondary}]} numberOfLines={2}>
          {item.body}
        </Text>
      </TouchableOpacity>
    ),
    [colors, onPressPost],
  );

  const keyExtractor = useCallback((item: Post) => String(item.id), []);

  if (loading && !refreshing) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.message, {color: colors.textSecondary}]}>
          Loading posts…
        </Text>
      </View>
    );
  }

  if (error && posts.length === 0) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <Text style={[styles.error, {color: colors.text}]}>{error}</Text>
        <TouchableOpacity
          style={[styles.retryButton, {backgroundColor: colors.primary}]}
          onPress={() => loadPosts()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadPosts(true)}
            tintColor={colors.primary}
          />
        }
      />
    </View>
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
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 14,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
