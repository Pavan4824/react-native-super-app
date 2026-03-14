import {takeEvery, delay} from 'redux-saga/effects';
import {fetchPostByIdThunk} from '../slices/postsSlice';
import type {PayloadAction} from '@reduxjs/toolkit';

type PostDetailFulfilled = ReturnType<typeof fetchPostByIdThunk.fulfilled>;

/**
 * Saga that runs when a post detail is successfully loaded.
 * Example: analytics, tracking, or follow-up side effects.
 */
function* handlePostDetailFulfilled(action: PostDetailFulfilled): Generator {
  const {post} = action.payload;
  if (__DEV__) {
    console.log('[saga] post detail fulfilled', post.id, post.title?.slice(0, 30));
  }
  // Example: fake async side effect (e.g. send to analytics)
  yield delay(100);
}

export function* watchPostSagas(): Generator {
  yield takeEvery(
    fetchPostByIdThunk.fulfilled.type,
    handlePostDetailFulfilled as (action: PayloadAction<unknown>) => Generator,
  );
}
