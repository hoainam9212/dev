package com.namle.dichochung.geo

import com.namle.dichochung.stores.Store

/** Geofence cần thêm / gỡ để khớp danh sách siêu thị đã lưu. */
data class GeofenceDiff(val add: List<Store>, val removeIds: List<String>)

object GeofenceSync {

    /** Toạ độ + bán kính của vòng; đổi tên không cần đăng ký lại, đổi chỗ / bán kính thì cần. */
    fun fingerprint(store: Store) = "${store.lat},${store.lng},${store.radiusM}"

    /** [registered] = id geofence đang đăng ký → [fingerprint] lúc đăng ký. Siêu thị dời chỗ → gỡ rồi thêm lại. */
    fun diff(registered: Map<String, String>, stores: List<Store>): GeofenceDiff {
        val wanted = stores.associateBy { it.id }
        val removeIds = registered.filter { (id, fp) -> wanted[id]?.let(::fingerprint) != fp }.keys.sorted()
        val add = stores.filter { registered[it.id] != fingerprint(it) }
        return GeofenceDiff(add, removeIds)
    }
}
