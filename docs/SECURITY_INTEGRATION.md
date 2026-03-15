# Security integration

Code blocks for **secure storage**, **no secrets in JS**, and **certificate pinning**.

---

## 1. Secure storage (Keychain / Keystore)

Secrets (e.g. auth token) are stored in the device Keychain (iOS) or Keystore (Android), not in AsyncStorage or in-memory.

### Install

```bash
npm install react-native-keychain
cd ios && pod install && cd ..
```

### Store / read / remove token

```typescript
// src/security/secureStorage.ts (already added)
import * as Keychain from 'react-native-keychain';

const AUTH_SERVICE = 'com.superApp.auth';

export async function setAuthToken(token: string) {
  const result = await Keychain.setGenericPassword('auth', token, {
    service: AUTH_SERVICE,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
  return !!result;
}

export async function getAuthToken(): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({ service: AUTH_SERVICE });
  return credentials?.password ?? null;
}

export async function removeAuthToken() {
  return Keychain.resetGenericPassword({ service: AUTH_SERVICE });
}
```

### Use in API client (axios)

Token is read from secure storage in the request interceptor; never store the token in Redux or AsyncStorage.

```typescript
// src/api/axiosInstance.ts
import { getAuthToken } from '../security/secureStorage';

instance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);
```

### After login / logout

```typescript
import { setAuthToken, removeAuthToken } from '../security/secureStorage';

// After login or token refresh
await setAuthToken(apiToken);

// On logout
await removeAuthToken();
```

---

## 2. No secrets in JS

- **Do not** hardcode API keys or secrets in source.
- **Do** keep non-secret config in env (e.g. `API_BASE_URL`); use secure storage for tokens and attach them in the client (as above).
- **Do** keep real secrets (e.g. API keys for server-to-server) on the backend; the app only receives short-lived tokens and stores them in Keychain.

Example config (non-secret only):

```typescript
// src/api/config.ts
export const apiConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
};
```

---

## 3. Certificate pinning

Pinning ensures the app only talks to your server’s certificate (or its public key), not to a MitM proxy.

### Install

```bash
npm install react-native-ssl-public-key-pinning
cd ios && pod install && cd ..
```

### Get public key hashes

Replace `your-api-host.com` with your API host:

```bash
echo | openssl s_client -servername your-api-host.com -connect your-api-host.com:443 2>/dev/null | openssl x509 -pubkey -noout | openssl pkey -pubin -outform DER | openssl dgst -sha256 -binary | openssl enc -base64
```

Use at least two pins (primary + backup). You can also use [SSL Labs](https://www.ssllabs.com/ssltest/) → Certificate #1 → Public Key Pin.

### Initialize at app entry

Call once as early as possible (e.g. in `App.tsx` before or next to your root component). Only enable when you have **real** hashes; placeholder hashes will make requests to that host fail.

```typescript
// App.tsx
import { initCertificatePinning } from './src/security/certificatePinning';

// Optional: call when you have real pins (see src/security/certificatePinning.ts)
useEffect(() => {
  initCertificatePinning();
}, []);
```

### Pinning config (replace placeholders)

In `src/security/certificatePinning.ts` replace `PLACEHOLDER_PINS` with your server’s base64 SHA-256 public key hashes and set `API_HOST` to your API host:

```typescript
const API_HOST = 'your-api-host.com';

const PLACEHOLDER_PINS = [
  'CLOmM1/OXvSPjw5UOYbAf9GKOxImEp9hhku9W90fHMk=',  // real pin 1
  'hxqRlPTu1bMS/0DITB1SSu0vd4u/8l8TjPgfaAp63Gc=',  // real pin 2 (backup)
];

await initializeSslPinning({
  [API_HOST]: {
    includeSubdomains: true,
    publicKeyHashes: PLACEHOLDER_PINS,
    // expirationDate: '2027-12-31', // optional
  },
});
```

After this, all standard `fetch` and axios requests go through the same networking stack and are pinned. No need to change existing API call code.

### Optional: listen for pin errors

```typescript
import { onSslPinningError } from './src/security/certificatePinning';

useEffect(() => {
  const unsubscribe = onSslPinningError((hostname) => {
    // Report or show a message
    console.warn('SSL pin mismatch for', hostname);
  });
  return unsubscribe;
}, []);
```

---

## Summary

| Item | Integration |
|------|-------------|
| **Secure storage** | `setAuthToken` / `getAuthToken` / `removeAuthToken` from `src/security/secureStorage.ts`; axios interceptor uses `getAuthToken()`. |
| **No secrets in JS** | No hardcoded secrets; tokens from Keychain; non-secret config from env. |
| **Certificate pinning** | Install `react-native-ssl-public-key-pinning`, set real hashes in `certificatePinning.ts`, call `initCertificatePinning()` at app entry. |
