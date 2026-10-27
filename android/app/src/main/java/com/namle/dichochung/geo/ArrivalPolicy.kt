package com.namle.dichochung.geo

import com.namle.dichochung.stores.Geo
import com.namle.dichochung.stores.Store

/** Khi nào báo "🛒 Đang ở <siêu thị>" (spec 4.5). */
object ArrivalPolicy {
    /** Không báo lại cùng một siêu thị trong 2 giờ. */
    const val COOLDOWN_MS = 2 * 60 * 60 * 1000L

    /** Hai vòng đè nhau (khu 西葛西 siêu thị sát nhau): lấy siêu thị gần vị trí kích nhất. */
    fun nearest(triggered: List<Store>, lat: Double, lng: Double): Store =
        triggered.minBy { Geo.distanceM(lat, lng, it.lat, it.lng) }

    /** Chỉ báo khi danh sách còn món chưa mua và siêu thị này chưa báo trong [COOLDOWN_MS]. */
    fun shouldNotify(storeId: String, now: Long, lastNotified: Map<String, Long>, needCount: Int): Boolean {
        if (needCount <= 0) return false
        val last = lastNotified[storeId] ?: return true
        return now - last >= COOLDOWN_MS
    }

    fun title(storeName: String) = "🛒 Đang ở $storeName"

    fun body(needCount: Int) = "còn $needCount món cần mua"
}
