import {get} from './httpClient';
import type {Post} from './types';

const DEFAULT_PAGE_SIZE = 10;

/** Fetch all posts (no pagination). */
export async function fetchPosts(): Promise<Post[]> {
  return get<Post[]>('/posts');
}

/** Fetch a single post by id. */
export async function fetchPost(id: number): Promise<Post> {
  return get<Post>(`/posts/${id}`);
}

/** Fetch posts for a user. */
export async function fetchPostsByUserId(userId: number): Promise<Post[]> {
  return get<Post[]>('/posts', {params: {userId}});
}

/**
 * Fetch a page of posts. JSONPlaceholder supports _page and _limit.
 * @see https://jsonplaceholder.typicode.com/ (e.g. /posts?_page=1&_limit=10)
 */
export async function fetchPostsPage(
  page: number,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<Post[]> {
  return get<Post[]>('/posts', {
    params: {_page: page, _limit: limit},
  });
}
