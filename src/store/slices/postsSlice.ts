import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchPost, fetchPosts, fetchPostsPage} from '../../api/posts';
import {fetchUser} from '../../api/users';
import {ApiError} from '../../api';
import type {Post, User} from '../../api/types';

const PAGE_SIZE = 10;

/**
 * createAsyncThunk<FulfilledPayload, ThunkArg, { rejectValue: RejectedPayload }>
 *
 * - 1st type (FulfilledPayload): what your async function RETURNS on success.
 *   Same value appears in extraReducers as action.payload in .fulfilled.
 *
 * - 2nd type (ThunkArg): what you PASS when dispatching, e.g. dispatch(thunk(thisArg)).
 *   Same value appears in extraReducers as action.meta.arg in .pending/.fulfilled/.rejected.
 *
 * - 3rd type { rejectValue: T }: on failure, call rejectWithValue(x); x is type T.
 *   In .rejected, that value is action.payload (so you can use it in the reducer).
 *
 * The payload creator receives (arg: ThunkArg, { rejectWithValue }) and must return
 * a Promise that resolves to FulfilledPayload or rejects (or rejectWithValue).
 */

/** Fetch a page. Dispatch: fetchPostsPageThunk({ page, append, isRefresh?). Fulfilled: { posts, page, append }. */
export const fetchPostsPageThunk = createAsyncThunk<
  {posts: Post[]; page: number; append: boolean},
  {page: number; append: boolean; isRefresh?: boolean},
  {rejectValue: string}
>('posts/fetchPage', async ({page, append}, {rejectWithValue}) => {
  try {
    const posts = await fetchPostsPage(page, PAGE_SIZE);
    return {posts, page, append};
  } catch (e) {
    const message =
      e instanceof ApiError
        ? e.message
        : 'Failed to load posts. Pull to retry.';
    return rejectWithValue(message);
  }
});

/** Fetch all posts for search. Dispatch: fetchPostsSearchThunk(). Fulfilled: Post[]. */
export const fetchPostsSearchThunk = createAsyncThunk<
  Post[],
  void,
  {rejectValue: string}
>('posts/fetchSearch', async (_, {rejectWithValue}) => {
  try {
    return await fetchPosts();
  } catch (e) {
    const message =
      e instanceof ApiError ? e.message : 'Search failed. Try again.';
    return rejectWithValue(message);
  }
});

/** Fetch one post and its author. Dispatch: fetchPostByIdThunk(postId). Fulfilled: { post, author }. */
export const fetchPostByIdThunk = createAsyncThunk<
  {post: Post; author: User | null},
  number,
  {rejectValue: string}
>('posts/fetchById', async (postId, {rejectWithValue}) => {
  try {
    const post = await fetchPost(postId);
    const author = await fetchUser(post.userId).catch(() => null);
    return {post, author: author ?? null};
  } catch (e) {
    const message = e instanceof ApiError ? e.message : 'Failed to load post.';
    return rejectWithValue(message);
  }
});

export interface PostsState {
  list: Post[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  error: string | null;
  /** Current post detail (single) and its author. */
  currentPost: Post | null;
  currentPostAuthor: User | null;
  currentPostLoading: boolean;
  currentPostError: string | null;
  /** All posts for search (fetched once, filtered client-side). */
  searchPosts: Post[];
  searchLoading: boolean;
  searchError: string | null;
}

const initialState: PostsState = {
  list: [],
  page: 0,
  hasMore: true,
  loading: true,
  loadingMore: false,
  refreshing: false,
  error: null,
  currentPost: null,
  currentPostAuthor: null,
  currentPostLoading: false,
  currentPostError: null,
  searchPosts: [],
  searchLoading: false,
  searchError: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPostsListError(state) {
      state.error = null;
    },
    clearPostDetail(state) {
      state.currentPost = null;
      state.currentPostAuthor = null;
      state.currentPostError = null;
    },
    clearSearchPosts(state) {
      state.searchPosts = [];
      state.searchError = null;
    },
  },
  extraReducers: builder => {
    // fetchPostsPageThunk
    builder
      .addCase(fetchPostsPageThunk.pending, (state, {meta}) => {
        const {page, append, isRefresh} = meta.arg;
        if (page === 1 && !append) {
          state.refreshing = isRefresh === true;
          state.loading = !isRefresh;
          state.loadingMore = false;
        } else {
          state.loadingMore = true;
          state.loading = false;
          state.refreshing = false;
        }
        state.error = null;
      })
      .addCase(fetchPostsPageThunk.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.loadingMore = false;
        state.refreshing = false;
        state.error = null;
        state.page = payload.page;
        state.hasMore = payload.posts.length >= PAGE_SIZE;
        state.list = payload.append
          ? [...state.list, ...payload.posts]
          : payload.posts;
      })
      .addCase(fetchPostsPageThunk.rejected, (state, {payload}) => {
        state.loading = false;
        state.loadingMore = false;
        state.refreshing = false;
        state.error = payload ?? 'Failed to load posts.';
      });

    // fetchPostByIdThunk
    builder
      .addCase(fetchPostByIdThunk.pending, state => {
        state.currentPostLoading = true;
        state.currentPostError = null;
      })
      .addCase(fetchPostByIdThunk.fulfilled, (state, {payload}) => {
        state.currentPostLoading = false;
        state.currentPostError = null;
        state.currentPost = payload.post;
        state.currentPostAuthor = payload.author;
      })
      .addCase(fetchPostByIdThunk.rejected, (state, {payload}) => {
        state.currentPostLoading = false;
        state.currentPostError = payload ?? 'Failed to load post.';
      });

    // fetchPostsSearchThunk
    builder
      .addCase(fetchPostsSearchThunk.pending, state => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(fetchPostsSearchThunk.fulfilled, (state, {payload}) => {
        state.searchLoading = false;
        state.searchError = null;
        state.searchPosts = payload;
      })
      .addCase(fetchPostsSearchThunk.rejected, (state, {payload}) => {
        state.searchLoading = false;
        state.searchError = payload ?? 'Search failed.';
      });
  },
});

export const {clearPostsListError, clearPostDetail, clearSearchPosts} =
  postsSlice.actions;
export default postsSlice.reducer;
