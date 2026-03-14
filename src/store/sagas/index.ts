import {all, fork} from 'redux-saga/effects';
import {watchPostSagas} from './postsSaga';
import {watchUserSagas} from './usersSaga';

/**
 * Root saga: forks all watcher sagas so they run in parallel.
 * Add new watchers here.
 */
export function* rootSaga(): Generator {
  yield all([fork(watchPostSagas), fork(watchUserSagas)]);
}
