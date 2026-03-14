import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchUsers, fetchUser} from '../../api/users';
import {fetchPostsByUserId} from '../../api/posts';
import {ApiError} from '../../api';
import type {User, Post} from '../../api/types';

/**
 * createAsyncThunk<FulfilledPayload, ThunkArg, { rejectValue: RejectedPayload }>
 * - FulfilledPayload: what the async function returns → action.payload in .fulfilled.
 * - ThunkArg: what you pass to dispatch(thunk(arg)) → action.meta.arg in reducers.
 * - rejectValue: what you pass to rejectWithValue(x) → action.payload in .rejected.
 */

/** Fetch all users. Dispatch: fetchUsersThunk() or fetchUsersThunk(true) for refresh. */
export const fetchUsersThunk = createAsyncThunk<
  User[],
  boolean | void,
  {rejectValue: string}
>('users/fetchList', async (_isRefresh, {rejectWithValue}) => {
  try {
    return await fetchUsers();
  } catch (e) {
    const message =
      e instanceof ApiError
        ? e.message
        : 'Failed to load users. Pull to retry.';
    return rejectWithValue(message);
  }
});

/** Fetch one user and their posts. Dispatch: fetchUserByIdThunk(userId). Fulfilled: { user, posts }. */
export const fetchUserByIdThunk = createAsyncThunk<
  {user: User; posts: Post[]},
  number,
  {rejectValue: string}
>('users/fetchById', async (userId, {rejectWithValue}) => {
  try {
    const [user, posts] = await Promise.all([
      fetchUser(userId),
      fetchPostsByUserId(userId),
    ]);
    return {user, posts};
  } catch (e) {
    const message = e instanceof ApiError ? e.message : 'Failed to load user.';
    return rejectWithValue(message);
  }
});

export interface UsersState {
  list: User[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  currentUser: User | null;
  currentUserPosts: Post[];
  currentUserLoading: boolean;
  currentUserError: string | null;
}

const initialState: UsersState = {
  list: [],
  loading: true,
  refreshing: false,
  error: null,
  currentUser: null,
  currentUserPosts: [],
  currentUserLoading: false,
  currentUserError: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsersListError(state) {
      state.error = null;
    },
    clearUserDetail(state) {
      state.currentUser = null;
      state.currentUserPosts = [];
      state.currentUserError = null;
    },
  },
  extraReducers: builder => {
    // fetchUsersThunk
    builder
      .addCase(fetchUsersThunk.pending, (state, {meta}) => {
        const isRefresh = meta.arg === true;
        if (isRefresh) state.refreshing = true;
        else state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.refreshing = false;
        state.error = null;
        state.list = payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, {payload}) => {
        state.loading = false;
        state.refreshing = false;
        state.error = payload ?? 'Failed to load users.';
      });

    // fetchUserByIdThunk
    builder
      .addCase(fetchUserByIdThunk.pending, state => {
        state.currentUserLoading = true;
        state.currentUserError = null;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, {payload}) => {
        state.currentUserLoading = false;
        state.currentUserError = null;
        state.currentUser = payload.user;
        state.currentUserPosts = payload.posts;
      })
      .addCase(fetchUserByIdThunk.rejected, (state, {payload}) => {
        state.currentUserLoading = false;
        state.currentUserError = payload ?? 'Failed to load user.';
      });
  },
});

export const {clearUsersListError, clearUserDetail} = usersSlice.actions;
export default usersSlice.reducer;
