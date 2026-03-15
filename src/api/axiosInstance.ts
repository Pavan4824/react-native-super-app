import axios, {type InternalAxiosRequestConfig} from 'axios';
import {apiConfig} from './config';
import {ApiError} from './errors';
import {getAuthToken} from '../security/secureStorage';

const instance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Attach token from secure storage only; never store secrets in JS/AsyncStorage.
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
