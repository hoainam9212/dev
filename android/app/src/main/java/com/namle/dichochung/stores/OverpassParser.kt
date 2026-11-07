package com.namle.dichochung.stores

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/** Đọc kết quả Overpass `out tags center` thành danh sách chỗ có tên, gần nhất trước. */
object OverpassParser {

    fun parse(json: String, fromLat: Double, fromLng: Double): List<StoreCandidate> {
        val elements = runCatching { Json.parseToJsonElement(json).jsonObject["elements"]?.jsonArray }.getOrNull()
            ?: return emptyList()
        return elements
            .mapNotNull { runCatching { candidate(it.jsonObject, fromLat, fromLng) }.getOrNull() }
            .distinctBy { it.osmId }
            .sortedWith(compareBy({ it.distanceM }, { it.label }))
    }

    private fun candidate(e: JsonObject, fromLat: Double, fromLng: Double): StoreCandidate? {
        val tags = e["tags"]?.jsonObject ?: return null
        val name = tags.text("name") ?: tags.text("name:ja") ?: tags.text("brand") ?: tags.text("brand:ja") ?: return null
        // node có lat/lon; way / relation có center (nhờ "out center").
        val point = e["center"]?.jsonObject ?: e
        val lat = point["lat"]?.jsonPrimitive?.doubleOrNull ?: return null
        val lng = point["lon"]?.jsonPrimitive?.doubleOrNull ?: return null
        val osmId = "${e.text("type") ?: return null}/${e.text("id") ?: return null}"
        return StoreCandidate(name, tags.text("branch"), lat, lng, Geo.distanceM(fromLat, fromLng, lat, lng), osmId)
    }

    private fun JsonObject.text(key: String) = this[key]?.jsonPrimitive?.contentOrNull?.trim()?.takeIf { it.isNotEmpty() }
}
