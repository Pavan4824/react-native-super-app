import {get} from './httpClient';
import type {User} from './types';

export async function fetchUsers(): Promise<User[]> {
  return get<User[]>('/users');
}

export async function fetchUser(id: number): Promise<User> {
  return get<User>(`/users/${id}`);
}
