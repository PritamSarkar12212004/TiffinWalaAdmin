package com.tiffinwala.admin.location

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.location.LocationManager
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

class RNLocationStatusModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val EVENT_NAME = "LocationStatus"
    }

    override fun getName(): String = "RNLocationStatus"

    private val locationReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == LocationManager.PROVIDERS_CHANGED_ACTION) {
                val status = isLocationEnabled()
                sendEvent(status)
            }
        }
    }

    override fun initialize() {
        super.initialize()

        val filter = IntentFilter().apply {
            addAction(LocationManager.PROVIDERS_CHANGED_ACTION)
        }
        reactContext.registerReceiver(locationReceiver, filter)
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        reactContext.unregisterReceiver(locationReceiver)
    }

    private fun sendEvent(status: Boolean) {
        val params = Arguments.createMap().apply {
            putBoolean("enabled", status)
        }
        reactContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(EVENT_NAME, params)
    }

    private fun isLocationEnabled(): Boolean {
        val locationManager =
            reactContext.getSystemService(Context.LOCATION_SERVICE) as LocationManager

        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
                locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)
    }

    private fun hasFineLocationPermission(): Boolean {
        return ContextCompat.checkSelfPermission(
            reactContext,
            android.Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
    }

    @ReactMethod
    fun getLocationStatus(promise: Promise) {
        promise.resolve(isLocationEnabled())
    }

    @ReactMethod
    fun checkLocationPermission(promise: Promise) {
        promise.resolve(hasFineLocationPermission())
    }
}
