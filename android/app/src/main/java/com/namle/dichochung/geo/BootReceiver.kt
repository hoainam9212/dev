package com.namle.dichochung.geo

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

/** Android xoá geofence khi khởi động lại máy hoặc cập nhật app: đăng ký lại từ bản sao đã lưu (Review Focus #5). */
class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED || intent.action == Intent.ACTION_MY_PACKAGE_REPLACED) {
            GeofenceManager(context).reRegisterAll()
        }
    }
}
