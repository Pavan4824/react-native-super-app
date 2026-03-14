/**
 * API configuration. In production, baseURL can come from env (e.g. process.env.EXPO_PUBLIC_API_URL).
 */
export const apiConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
} as const;
