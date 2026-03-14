import type {AxiosRequestConfig, Method} from 'axios';
import {axiosInstance} from './axiosInstance';

type RequestConfig = Omit<
  AxiosRequestConfig,
  'url' | 'method' | 'data' | 'params'
> & {
  params?: Record<string, string | number | boolean | undefined>;
  data?: unknown;
};

/**
 * Generic GET request. Returns response data as T.
 */
export async function get<T>(url: string, config?: RequestConfig): Promise<T> {
  const res = await axiosInstance.request<T>({
    url,
    method: 'GET',
    ...config,
  });
  return res.data;
}

/**
 * Generic POST request. Returns response data as T.
 */
export async function post<T>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> {
  const res = await axiosInstance.request<T>({
    url,
    method: 'POST',
    data,
    ...config,
  });
  return res.data;
}

/**
 * Generic PUT request. Returns response data as T.
 */
export async function put<T>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> {
  const res = await axiosInstance.request<T>({
    url,
    method: 'PUT',
    data,
    ...config,
  });
  return res.data;
}

/**
 * Generic PATCH request. Returns response data as T.
 */
export async function patch<T>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<T> {
  const res = await axiosInstance.request<T>({
    url,
    method: 'PATCH',
    data,
    ...config,
  });
  return res.data;
}

/**
 * Generic DELETE request. Returns response data as T.
 */
export async function del<T>(url: string, config?: RequestConfig): Promise<T> {
  const res = await axiosInstance.request<T>({
    url,
    method: 'DELETE',
    ...config,
  });
  return res.data;
}

/**
 * Generic request by method. Use when you need a dynamic method.
 */
export async function request<T>(
  config: AxiosRequestConfig & {method: Method},
): Promise<T> {
  const res = await axiosInstance.request<T>(config);
  return res.data;
}

export const httpClient = {
  get,
  post,
  put,
  patch,
  delete: del,
  request,
};
