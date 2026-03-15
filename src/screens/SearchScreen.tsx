import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FocusableSearchInput,
  type FocusableSearchInputHandle,
} from '../components/FocusableSearchInput';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {HomeTabStackParamList} from '../navigation/types';
import type {Post} from '../api/types';
import {useThemeColors} from '../context/ThemeContext';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  selectSearchPosts,
  selectSearchLoading,
  selectSearchError,
} from '../store/selectors';
import {
  fetchPostsSearchThunk,
  clearSearchPosts,
} from '../store/slices/postsSlice';

const DEBOUNCE_MS = 400;

type Props = NativeStackScreenProps<HomeTabStackParamList, 'Search'>;

function filterPosts(posts: Post[], query: string): Post[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return posts.filter(
    p => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q),
  );
}

export function SearchScreen({navigation}: Props) {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const searchPosts = useAppSelector(selectSearchPosts);
  const loading = useAppSelector(selectSearchLoading);
  const searchError = useAppSelector(selectSearchError);

  // Ref exposes { focus, clear } via useImperativeHandle (not the raw TextInput).
  const searchInputRef = useRef<FocusableSearchInputHandle>(null);

  const debouncedQuery = useDebouncedValue(input.trim(), DEBOUNCE_MS);
  const results = filterPosts(searchPosts, debouncedQuery);

  // Focus the search input when the screen mounts (forwardRef makes this possible).
  useEffect(() => {
    const timer = setTimeout(() => searchInputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  // When debounced query changes: clear search state if empty, else fetch all posts once via thunk
  useEffect(() => {
    if (!debouncedQuery) {
      dispatch(clearSearchPosts());
      return;
    }
    if (searchPosts.length > 0) return;
    dispatch(fetchPostsSearchThunk());
  }, [debouncedQuery, dispatch, searchPosts.length]);

  const onPressPost = useCallback(
    (postId: number) => {
      navigation.navigate('PostDetail', {postId});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: Post}) => (
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: colors.border,
          },
        ]}
        onPress={() => onPressPost(item.id)}
        activeOpacity={0.7}>
        <Text
          style={[styles.cardTitle, {color: colors.text}]}
          numberOfLines={2}>
          {item.title}
        </Text>
        <Text
          style={[styles.cardBody, {color: colors.textSecondary}]}
          numberOfLines={2}>
          {item.body}
        </Text>
      </TouchableOpacity>
    ),
    [colors, onPressPost],
  );

  const keyExtractor = useCallback((item: Post) => String(item.id), []);

  function renderSearchContent() {
    if (!debouncedQuery) {
      return (
        <View
          style={[styles.placeholder, {backgroundColor: colors.background}]}>
          <Text style={[styles.placeholderText, {color: colors.textSecondary}]}>
            Type to search (debounced {DEBOUNCE_MS}ms)
          </Text>
        </View>
      );
    }
    if (loading) {
      return (
        <View style={[styles.center, {backgroundColor: colors.background}]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.message, {color: colors.textSecondary}]}>
            Searching…
          </Text>
        </View>
      );
    }
    if (searchError) {
      return (
        <View style={[styles.center, {backgroundColor: colors.background}]}>
          <Text style={[styles.error, {color: colors.text}]}>
            {searchError}
          </Text>
        </View>
      );
    }
    if (results.length === 0) {
      return (
        <View
          style={[styles.placeholder, {backgroundColor: colors.background}]}>
          <Text style={[styles.placeholderText, {color: colors.textSecondary}]}>
            No posts match "{debouncedQuery}"
          </Text>
        </View>
      );
    }
    return (
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={[styles.resultCount, {color: colors.textSecondary}]}>
            {results.length} result{results.length !== 1 ? 's' : ''}
          </Text>
        }
      />
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <FocusableSearchInput
        ref={searchInputRef}
        style={[
          styles.input,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="Search posts by title or body…"
        placeholderTextColor={colors.textSecondary}
        value={input}
        onChangeText={setInput}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      {renderSearchContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  resultCount: {
    fontSize: 14,
    marginBottom: 12,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
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
