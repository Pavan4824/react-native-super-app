import {takeEvery} from 'redux-saga/effects';
import {fetchUserByIdThunk} from '../slices/usersSlice';
import type {PayloadAction} from '@reduxjs/toolkit';

type UserDetailFulfilled = ReturnType<typeof fetchUserByIdThunk.fulfilled>;

/**
 * Saga that runs when a user detail is successfully loaded.
 */
function* handleUserDetailFulfilled(action: UserDetailFulfilled): Generator {
  const {user, posts} = action.payload;
  if (__DEV__) {
    console.log('[saga] user detail fulfilled', user.id, user.name, 'posts:', posts.length);
  }
}

export function* watchUserSagas(): Generator {
  yield takeEvery(
    fetchUserByIdThunk.fulfilled.type,
    handleUserDetailFulfilled as (action: PayloadAction<unknown>) => Generator,
  );
}
