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
import type {ExploreTabStackParamList} from '../navigation/types';
import type {User} from '../api/types';
import {useThemeColors} from '../context/ThemeContext';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectUsersListState} from '../store/selectors';
import {fetchUsersThunk} from '../store/slices/usersSlice';

type Props = NativeStackScreenProps<ExploreTabStackParamList, 'ExploreIndex'>;

export function UsersListScreen({navigation}: Props) {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const {users, loading, refreshing, error} =
    useAppSelector(selectUsersListState);

  const loadUsers = useCallback(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const loadUsersRefresh = useCallback(() => {
    dispatch(fetchUsersThunk(true));
  }, [dispatch]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onPressUser = useCallback(
    (userId: number) => {
      navigation.navigate('UserDetail', {userId});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: User}) => (
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: colors.border,
          },
        ]}
        onPress={() => onPressUser(item.id)}
        activeOpacity={0.7}>
        <Text style={[styles.cardName, {color: colors.text}]}>{item.name}</Text>
        <Text
          style={[styles.cardEmail, {color: colors.textSecondary}]}
          numberOfLines={1}>
          {item.email}
        </Text>
        {item.company ? (
          <Text
            style={[styles.cardCompany, {color: colors.textSecondary}]}
            numberOfLines={1}>
            {item.company.name}
          </Text>
        ) : null}
      </TouchableOpacity>
    ),
    [colors, onPressUser],
  );

  const keyExtractor = useCallback((item: User) => String(item.id), []);

  if (loading && !refreshing) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.message, {color: colors.textSecondary}]}>
          Loading users…
        </Text>
      </View>
    );
  }

  if (error && users.length === 0) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <Text style={[styles.error, {color: colors.text}]}>{error}</Text>
        <TouchableOpacity
          style={[styles.retryButton, {backgroundColor: colors.primary}]}
          onPress={loadUsers}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadUsersRefresh}
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
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  cardCompany: {
    fontSize: 12,
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
