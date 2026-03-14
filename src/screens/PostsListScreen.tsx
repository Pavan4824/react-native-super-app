import React, {useCallback, useEffect} from 'react';
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
import {useThemeColors} from '../context/ThemeContext';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectPostsListState} from '../store/selectors';
import {fetchPostsPageThunk} from '../store/slices/postsSlice';

type Props = NativeStackScreenProps<HomeTabStackParamList, 'HomeIndex'>;

export function PostsListScreen({navigation}: Props) {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const {posts, page, hasMore, loading, loadingMore, refreshing, error} =
    useAppSelector(selectPostsListState);

  const loadFirstPage = useCallback(() => {
    dispatch(fetchPostsPageThunk({page: 1, append: false}));
  }, [dispatch]);

  const loadNextPage = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    dispatch(fetchPostsPageThunk({page: page + 1, append: true}));
  }, [dispatch, page, loading, loadingMore, hasMore]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchPostsPageThunk({page: 1, append: false, isRefresh: true}));
  }, [dispatch]);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

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

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={[styles.footerText, {color: colors.textSecondary}]}>
          Loading more…
        </Text>
      </View>
    );
  }, [loadingMore, colors]);

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
          onPress={loadFirstPage}>
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
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
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
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
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
