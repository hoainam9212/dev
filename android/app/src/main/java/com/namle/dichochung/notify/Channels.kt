package com.namle.dichochung.notify

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context

/** Hai kênh thông báo, người dùng tắt / bật riêng được trong Cài đặt. */
object Channels {
    const val ARRIVAL = "arrival"
    const val PARTNER = "partner"

    fun create(context: Context) {
        val manager = context.getSystemService(NotificationManager::class.java) ?: return
        manager.createNotificationChannels(
            listOf(
                NotificationChannel(ARRIVAL, "Tới siêu thị", NotificationManager.IMPORTANCE_HIGH).apply {
                    description = "Nhắc khi bạn tới siêu thị đã lưu mà nhà còn món cần mua"
                },
                NotificationChannel(PARTNER, "Từ người nhà", NotificationManager.IMPORTANCE_HIGH).apply {
                    description = "Khi người nhà gửi món hoặc đi chợ xong"
                },
            ),
        )
    }
}
