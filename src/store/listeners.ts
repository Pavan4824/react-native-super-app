import {fetchPostsPageThunk, fetchPostByIdThunk} from './slices/postsSlice';
import {fetchUsersThunk, fetchUserByIdThunk} from './slices/usersSlice';
import {startAppListening} from './listenerMiddleware';

/**
 * Register all listener middleware entries.
 * Run this once after the store is created (listeners are registered on the middleware instance).
 */
export function addListeners(): void {
  // Log when posts list fetch completes (success or failure)
  startAppListening({
    matcher: fetchPostsPageThunk.settled,
    effect: (action, {getState}) => {
      const status = fetchPostsPageThunk.fulfilled.match(action)
        ? 'fulfilled'
        : 'rejected';
      if (__DEV__) {
        const arg =
          'meta' in action ? (action.meta as {arg: unknown}).arg : undefined;
        console.log(
          `[listener] posts/fetchPage ${status}`,
          arg,
          getState().posts.list.length,
        );
      }
    },
  });

  // Log when a single post is fetched (e.g. post detail screen)
  startAppListening({
    matcher: fetchPostByIdThunk.settled,
    effect: action => {
      if (!__DEV__) return;
      if (fetchPostByIdThunk.fulfilled.match(action)) {
        console.log(
          '[listener] post detail loaded',
          action.payload.post.id,
          action.payload.post.title?.slice(0, 30),
        );
      } else {
        console.log('[listener] post detail failed', action.meta.arg);
      }
    },
  });

  // Log when users list fetch completes
  startAppListening({
    matcher: fetchUsersThunk.settled,
    effect: (action, {getState}) => {
      if (!__DEV__) return;
      const status = fetchUsersThunk.fulfilled.match(action)
        ? 'fulfilled'
        : 'rejected';
      console.log(
        `[listener] users/fetchList ${status}`,
        getState().users.list.length,
      );
    },
  });

  // Log when a single user is fetched (e.g. user detail screen)
  startAppListening({
    matcher: fetchUserByIdThunk.settled,
    effect: action => {
      if (!__DEV__) return;
      if (fetchUserByIdThunk.fulfilled.match(action)) {
        console.log(
          '[listener] user detail loaded',
          action.payload.user.id,
          action.payload.user.name,
        );
      } else {
        console.log('[listener] user detail failed', action.meta.arg);
      }
    },
  });
}
