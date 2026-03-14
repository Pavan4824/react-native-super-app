import type {LinkingOptions} from '@react-navigation/native';
import type {RootDrawerParamList} from './types';

/**
 * Deep link prefixes. Custom scheme for app-only links.
 * Example: superapp://post/123
 */
const prefixes = ['superapp://'];

/**
 * Parses path and returns navigation state for post/:id and user/:id.
 * Ensures we land on the correct tab and stack with numeric params.
 */
function getStateFromPath(path: string) {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  const segments = trimmed.split('/');

  // post/123 -> Main (HomeTab) -> PostDetail
  if (segments[0] === 'post' && segments[1]) {
    const postId = Number(segments[1]);
    if (!Number.isNaN(postId)) {
      return {
        routes: [
          {
            name: 'Main',
            state: {
              routes: [
                {
                  name: 'HomeTab',
                  state: {
                    routes: [
                      {name: 'HomeIndex'},
                      {name: 'PostDetail', params: {postId}},
                    ],
                    index: 1,
                  },
                },
                {name: 'ExploreTab'},
                {name: 'ProfileTab'},
                {name: 'SettingsTab'},
              ],
              index: 0,
            },
          },
          {name: 'DrawerStack'},
        ],
        index: 0,
      };
    }
  }

  // user/456 -> Main (ExploreTab) -> UserDetail
  if (segments[0] === 'user' && segments[1]) {
    const userId = Number(segments[1]);
    if (!Number.isNaN(userId)) {
      return {
        routes: [
          {
            name: 'Main',
            state: {
              routes: [
                {name: 'HomeTab'},
                {
                  name: 'ExploreTab',
                  state: {
                    routes: [
                      {name: 'ExploreIndex'},
                      {name: 'UserDetail', params: {userId}},
                    ],
                    index: 1,
                  },
                },
                {name: 'ProfileTab'},
                {name: 'SettingsTab'},
              ],
              index: 1,
            },
          },
          {name: 'DrawerStack'},
        ],
        index: 0,
      };
    }
  }

  return undefined;
}

export const linking: LinkingOptions<RootDrawerParamList> = {
  prefixes,
  getStateFromPath: getStateFromPath as LinkingOptions<RootDrawerParamList>['getStateFromPath'],
};
