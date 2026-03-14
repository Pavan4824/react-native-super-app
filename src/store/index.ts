import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import postsReducer from './slices/postsSlice';
import usersReducer from './slices/usersSlice';
import {listenerMiddleware} from './listenerMiddleware';
import {addListeners} from './listeners';
import {rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
addListeners();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
