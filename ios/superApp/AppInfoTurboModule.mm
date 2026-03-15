/**
 * TurboModule implementation for NativeAppInfo.
 * Uses the codegen-generated SuperAppSpec (NativeAppInfoSpec protocol).
 * Run codegen and pod install so ReactCodegen is available.
 */
#ifdef __OBJC__
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#endif

#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <ReactCommon/RCTTurboModule.h>
#import <ReactCodegen/SuperAppSpec/SuperAppSpec.h>

@interface AppInfoTurboModule : NativeAppInfoSpecBase <NativeAppInfoSpec>
@end

@implementation AppInfoTurboModule

RCT_EXPORT_MODULE(NativeAppInfo)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSString *)getAppVersion
{
  NSDictionary *info = [NSBundle mainBundle].infoDictionary;
  return info[@"CFBundleShortVersionString"] ?: @"0.0.0";
}

- (NSString *)getBuildNumber
{
  NSDictionary *info = [NSBundle mainBundle].infoDictionary;
  return info[@"CFBundleVersion"] ?: @"0";
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeAppInfoSpecJSI>(params);
}

@end
