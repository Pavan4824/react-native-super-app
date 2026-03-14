import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '../index';

export const selectUsersList = (state: RootState) => state.users.list;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersRefreshing = (state: RootState) => state.users.refreshing;
export const selectUsersError = (state: RootState) => state.users.error;

export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectCurrentUserPosts = (state: RootState) =>
  state.users.currentUserPosts;
export const selectCurrentUserLoading = (state: RootState) =>
  state.users.currentUserLoading;
export const selectCurrentUserError = (state: RootState) =>
  state.users.currentUserError;

/** Memoized combined selector for users list screen. Only recomputes when inputs change. */
export const selectUsersListState = createSelector(
  [selectUsersList, selectUsersLoading, selectUsersRefreshing, selectUsersError],
  (users, loading, refreshing, error) => ({users, loading, refreshing, error}),
);

/** Memoized combined selector for user detail screen. */
export const selectUserDetailState = createSelector(
  [
    selectCurrentUser,
    selectCurrentUserPosts,
    selectCurrentUserLoading,
    selectCurrentUserError,
  ],
  (user, posts, loading, error) => ({user, posts, loading, error}),
);
