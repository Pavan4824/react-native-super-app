import {isAnyOf} from '@reduxjs/toolkit';
import {fetchPostsPageThunk, fetchPostByIdThunk} from './slices/postsSlice';
import {fetchUsersThunk, fetchUserByIdThunk} from './slices/usersSlice';
import {startAppListening} from './listenerMiddleware';

/**
 * Register all listener middleware entries.
 * You can add as many listeners as you want. In a single listener you can also
 * combine multiple matchers with isAnyOf(...) or isAllOf(...) so one effect
 * runs for several actions.
 */
export function addListeners(): void {
  // Example: one listener for any "detail" fetch (post or user) using multiple matchers
  startAppListening({
    matcher: isAnyOf(fetchPostByIdThunk.settled, fetchUserByIdThunk.settled),
    effect: action => {
      if (!__DEV__) return;
      if (fetchPostByIdThunk.fulfilled.match(action)) {
        console.log('[listener] detail loaded (post)', action.payload.post.id);
      } else if (fetchUserByIdThunk.fulfilled.match(action)) {
        console.log('[listener] detail loaded (user)', action.payload.user.id);
      } else {
        console.log('[listener] detail fetch failed', action.type);
      }
    },
  });

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
}
