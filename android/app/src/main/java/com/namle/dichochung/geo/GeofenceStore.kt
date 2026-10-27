package com.namle.dichochung.geo

import android.content.Context
import com.namle.dichochung.stores.Store

/**
 * Bản sao siêu thị + geofence đã đăng ký + lần báo gần nhất, lưu trong SharedPreferences: receiver chạy lúc app
 * không mở (và lúc khởi động lại máy) vẫn đọc được mà không cần chờ Firestore.
 */
class GeofenceStore(context: Context) {
    private val prefs = context.applicationContext.getSharedPreferences("geofence", Context.MODE_PRIVATE)

    var stores: List<Store>
        get() = prefs.getStringSet(KEY_STORES, emptySet()).orEmpty().mapNotNull(::decodeStore)
        set(value) = prefs.edit().putStringSet(KEY_STORES, value.map(::encodeStore).toSet()).apply()

    /** id geofence → [GeofenceSync.fingerprint] lúc đăng ký. */
    var registered: Map<String, String>
        get() = pairs(KEY_REGISTERED)
        set(value) = putPairs(KEY_REGISTERED, value)

    var lastNotified: Map<String, Long>
        get() = pairs(KEY_LAST_NOTIFIED).mapNotNull { (k, v) -> v.toLongOrNull()?.let { k to it } }.toMap()
        set(value) = putPairs(KEY_LAST_NOTIFIED, value.mapValues { it.value.toString() })

    private fun pairs(key: String): Map<String, String> =
        prefs.getStringSet(key, emptySet()).orEmpty().mapNotNull { line ->
            line.split(SEP, limit = 2).takeIf { it.size == 2 }?.let { it[0] to it[1] }
        }.toMap()

    private fun putPairs(key: String, value: Map<String, String>) {
        prefs.edit().putStringSet(key, value.map { (k, v) -> "$k$SEP$v" }.toSet()).apply()
    }

    private fun encodeStore(s: Store) = listOf(s.id, s.lat, s.lng, s.radiusM, s.name).joinToString(SEP)

    private fun decodeStore(line: String): Store? {
        val p = line.split(SEP, limit = 5)
        if (p.size != 5) return null
        return Store(p[0], p[4], p[1].toDoubleOrNull() ?: return null, p[2].toDoubleOrNull() ?: return null, p[3].toIntOrNull() ?: return null)
    }

    private companion object {
        const val SEP = "\t"
        const val KEY_STORES = "stores"
        const val KEY_REGISTERED = "registered"
        const val KEY_LAST_NOTIFIED = "lastNotified"
    }
}
