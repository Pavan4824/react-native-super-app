import type {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import type {PostsState} from './slices/postsSlice';
import type {UsersState} from './slices/usersSlice';

/** Root state shape (used for listener middleware typing without circular deps). */
export interface RootState {
  posts: PostsState;
  users: UsersState;
}

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
