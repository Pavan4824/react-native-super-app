import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import postsReducer from './slices/postsSlice';
import usersReducer from './slices/usersSlice';
import {listenerMiddleware} from './listenerMiddleware';
import {addListeners} from './listeners';
import {rootSaga} from './sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['posts', 'users'],
};

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(sagaMiddleware),
});

export const persistor = persistStore(store, null, () => {
  // onRehydrateComplete: runs once after persisted state has been restored
  // Use for: refetch, analytics, logging, syncing
  // eslint-disable-next-line no-console
  console.log('Store rehydrated');
  // Example: trigger a refresh of stale data
  // store.dispatch(fetchPostsPageThunk({ page: 1, append: false, isRefresh: true }));
});

sagaMiddleware.run(rootSaga);
addListeners();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
