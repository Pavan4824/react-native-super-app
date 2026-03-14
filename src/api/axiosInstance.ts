import axios, {type InternalAxiosRequestConfig} from 'axios';
import {apiConfig} from './config';
import {ApiError} from './errors';

const instance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token, tenant id, etc. when available:
    // const token = getToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,
  error => {
    const apiError = ApiError.fromAxiosError(error);
    return Promise.reject(apiError);
  },
);

export {instance as axiosInstance};
