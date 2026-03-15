/**
 * Certificate (public key) pinning for API requests.
 * Uses react-native-ssl-public-key-pinning; all fetch/axios requests then use the pinned client.
 *
 * Replace the placeholder hashes below with your server's public key hashes.
 * Get hashes: echo | openssl s_client -servername <host> -connect <host>:443 2>/dev/null | openssl x509 -pubkey -noout | openssl pkey -pubin -outform DER | openssl dgst -sha256 -binary | openssl enc -base64
 * Or use https://www.ssllabs.com/ssltest/ (Certificate #1 → Public Key Pin).
 */
import {
  initializeSslPinning,
  isSslPinningAvailable,
  addSslPinningErrorListener,
} from 'react-native-ssl-public-key-pinning';

const API_HOST = 'jsonplaceholder.typicode.com';

/**
 * Placeholder hashes for demo. Replace with your API server's base64 SHA-256 public key hashes.
 * iOS requires at least 2 pins per domain.
 */
const PLACEHOLDER_PINS = [
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', // replace with real pin 1
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=', // replace with real pin 2
];

let pinningInitialized = false;

/**
 * Call once at app startup (e.g. in App.tsx before rendering).
 * If pinning is not available (e.g. Expo Go), it no-ops.
 */
export async function initCertificatePinning(): Promise<void> {
  if (pinningInitialized) return;
  try {
    const available = isSslPinningAvailable();
    if (!available) {
      __DEV__ && console.warn('[SSL Pinning] Native module not available (e.g. Expo Go)');
      return;
    }
    await initializeSslPinning({
      [API_HOST]: {
        includeSubdomains: true,
        publicKeyHashes: PLACEHOLDER_PINS,
        // Optional: expirationDate: '2026-12-31',
      },
    });
    pinningInitialized = true;
  } catch (e) {
    if (__DEV__) {
      console.warn('[SSL Pinning] Init failed:', e);
    }
  }
}

/**
 * Subscribe to pin mismatch errors (e.g. for reporting or user message).
 */
export function onSslPinningError(callback: (hostname: string) => void): () => void {
  const sub = addSslPinningErrorListener((e: { serverHostname: string }) => {
    callback(e.serverHostname);
  });
  return () => sub.remove();
}
