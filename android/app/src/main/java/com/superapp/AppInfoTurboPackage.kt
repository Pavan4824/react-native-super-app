package com.superApp

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap

class AppInfoTurboPackage : TurboReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == AppInfoTurboModule.NAME) {
            AppInfoTurboModule(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleMap: MutableMap<String, ReactModuleInfo> = HashMap()
            moduleMap[AppInfoTurboModule.NAME] = ReactModuleInfo(
                AppInfoTurboModule.NAME,
                AppInfoTurboModule::class.java.name,
                false,
                true,
                true,
                false,
                true
            )
            moduleMap
        }
    }
}
