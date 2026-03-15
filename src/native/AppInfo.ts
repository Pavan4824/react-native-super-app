/**
 * TurboModule: App version and build number (synchronous via JSI).
 */
import NativeAppInfo from '../../specs/NativeAppInfo';

export function getAppVersion(): string {
  return NativeAppInfo.getAppVersion();
}

export function getBuildNumber(): string {
  return NativeAppInfo.getBuildNumber();
}

export function getAppVersionString(): string {
  return `${getAppVersion()} (${getBuildNumber()})`;
}
