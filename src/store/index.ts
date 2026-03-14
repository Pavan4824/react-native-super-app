import {configureStore} from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import usersReducer from './slices/usersSlice';
import {listenerMiddleware} from './listenerMiddleware';
import {addListeners} from './listeners';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

addListeners();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
