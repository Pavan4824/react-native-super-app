/**
 * Secure storage for secrets (auth token, etc.) using Keychain (iOS) / Keystore (Android).
 * Do not store secrets in AsyncStorage or in JS variables; use this module instead.
 */
import * as Keychain from 'react-native-keychain';

const AUTH_SERVICE = 'com.superApp.auth';

export type SecureStorageResult = { success: true } | { success: false; error?: string };

/**
 * Store auth token in secure storage. Use after login/token refresh.
 */
export async function setAuthToken(token: string): Promise<SecureStorageResult> {
  try {
    const result = await Keychain.setGenericPassword('auth', token, {
      service: AUTH_SERVICE,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    return result ? { success: true } : { success: false };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Retrieve auth token from secure storage. Use in API client (e.g. axios interceptor).
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const credentials = await Keychain.getGenericPassword({ service: AUTH_SERVICE });
    if (credentials && credentials.password) {
      return credentials.password;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Remove auth token (e.g. on logout).
 */
export async function removeAuthToken(): Promise<SecureStorageResult> {
  try {
    const result = await Keychain.resetGenericPassword({ service: AUTH_SERVICE });
    return result ? { success: true } : { success: false };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}
