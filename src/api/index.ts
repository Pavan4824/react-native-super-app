export {
  api,
  axiosInstance,
  ApiError,
  apiConfig,
  get,
  post,
  put,
  patch,
  delete as deleteRequest,
} from './client';
export {fetchPosts, fetchPost, fetchPostsByUserId} from './posts';
export {fetchUsers, fetchUser} from './users';
export type {Post, User, Comment} from './types';
