import type {AxiosError} from 'axios';

/**
 * Standard API error for consistent handling (toasts, error boundaries, etc.).
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly response?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static fromAxiosError(err: AxiosError<unknown>): ApiError {
    const status = err.response?.status ?? 0;
    const message =
      (err.response?.data as {message?: string})?.message ??
      err.message ??
      'Request failed';
    const code = err.code;
    return new ApiError(message, status, code, err.response?.data);
  }

  get isNetworkError(): boolean {
    return this.status === 0 || this.code === 'ERR_NETWORK';
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }
}
