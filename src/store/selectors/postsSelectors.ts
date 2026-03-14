import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '../index';

export const selectPostsList = (state: RootState) => state.posts.list;
export const selectPostsPage = (state: RootState) => state.posts.page;
export const selectPostsHasMore = (state: RootState) => state.posts.hasMore;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsLoadingMore = (state: RootState) =>
  state.posts.loadingMore;
export const selectPostsRefreshing = (state: RootState) =>
  state.posts.refreshing;
export const selectPostsError = (state: RootState) => state.posts.error;

export const selectCurrentPost = (state: RootState) => state.posts.currentPost;
export const selectCurrentPostAuthor = (state: RootState) =>
  state.posts.currentPostAuthor;
export const selectCurrentPostLoading = (state: RootState) =>
  state.posts.currentPostLoading;
export const selectCurrentPostError = (state: RootState) =>
  state.posts.currentPostError;

export const selectSearchPosts = (state: RootState) => state.posts.searchPosts;
export const selectSearchLoading = (state: RootState) =>
  state.posts.searchLoading;
export const selectSearchError = (state: RootState) => state.posts.searchError;

/** Memoized combined selector for posts list screen. Only recomputes when inputs change. */
export const selectPostsListState = createSelector(
  [
    selectPostsList,
    selectPostsPage,
    selectPostsHasMore,
    selectPostsLoading,
    selectPostsLoadingMore,
    selectPostsRefreshing,
    selectPostsError,
  ],
  (posts, page, hasMore, loading, loadingMore, refreshing, error) => ({
    posts,
    page,
    hasMore,
    loading,
    loadingMore,
    refreshing,
    error,
  }),
);

/** Memoized combined selector for post detail screen. */
export const selectPostDetailState = createSelector(
  [
    selectCurrentPost,
    selectCurrentPostAuthor,
    selectCurrentPostLoading,
    selectCurrentPostError,
  ],
  (post, author, loading, error) => ({post, author, loading, error}),
);
