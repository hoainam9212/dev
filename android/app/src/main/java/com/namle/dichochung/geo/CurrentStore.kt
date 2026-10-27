package com.namle.dichochung.geo

import android.content.Context

/**
 * Siêu thị đang đứng trong vòng (geofence ENTER → đặt, EXIT → xoá), cho nhãn "Hết ở <tên>" ở tab Cần mua.
 * Lưu trong SharedPreferences vì receiver và giao diện có thể chạy ở hai lần mở process khác nhau; quá
 * [MAX_AGE_MS] thì coi như đã ra (phòng khi máy bỏ lỡ sự kiện EXIT).
 */
object CurrentStore {
    const val MAX_AGE_MS = 3 * 60 * 60 * 1000L

    fun name(context: Context, now: Long = System.currentTimeMillis()): String? {
        val prefs = prefs(context)
        val at = prefs.getLong(KEY_AT, 0L)
        if (now - at > MAX_AGE_MS) return null
        return prefs.getString(KEY_NAME, null)
    }

    fun enter(context: Context, storeId: String, name: String, now: Long = System.currentTimeMillis()) {
        prefs(context).edit().putString(KEY_ID, storeId).putString(KEY_NAME, name).putLong(KEY_AT, now).apply()
    }

    /** Chỉ xoá khi ra đúng siêu thị đang đứng (hai vòng sát nhau: ra vòng A lúc đã vào vòng B thì giữ B). */
    fun exit(context: Context, storeIds: Collection<String>) {
        val prefs = prefs(context)
        if (prefs.getString(KEY_ID, null) in storeIds) prefs.edit().clear().apply()
    }

    private fun prefs(context: Context) = context.applicationContext.getSharedPreferences("current_store", Context.MODE_PRIVATE)

    private const val KEY_ID = "id"
    private const val KEY_NAME = "name"
    private const val KEY_AT = "at"
}
