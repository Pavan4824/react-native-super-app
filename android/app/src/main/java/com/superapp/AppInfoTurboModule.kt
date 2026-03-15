package com.superApp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.facebook.fbreact.specs.NativeAppInfoSpec

@ReactModule(name = AppInfoTurboModule.NAME)
class AppInfoTurboModule(private val reactContext: ReactApplicationContext) :
    NativeAppInfoSpec(reactContext), TurboModule {

    override fun initialize() {
        // No-op for this module
    }

    override fun invalidate() {
        // No-op for this module
    }

    override fun getAppVersion(): String {
        return try {
            val packageInfo = reactContext.packageManager
                .getPackageInfo(reactContext.packageName, 0)
            packageInfo.versionName ?: "0.0.0"
        } catch (e: Exception) {
            "0.0.0"
        }
    }

    override fun getBuildNumber(): String {
        return try {
            val packageInfo = reactContext.packageManager
                .getPackageInfo(reactContext.packageName, 0)
            @Suppress("DEPRECATION")
            packageInfo.versionCode.toString()
        } catch (e: Exception) {
            "0"
        }
    }

    companion object {
        const val NAME = "NativeAppInfo"
    }
}
