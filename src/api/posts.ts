import {get} from './httpClient';
import type {Post} from './types';

export async function fetchPosts(): Promise<Post[]> {
  return get<Post[]>('/posts');
}

export async function fetchPost(id: number): Promise<Post> {
  return get<Post>(`/posts/${id}`);
}

export async function fetchPostsByUserId(userId: number): Promise<Post[]> {
  return get<Post[]>('/posts', {params: {userId}});
}
