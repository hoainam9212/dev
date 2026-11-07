package com.namle.dichochung.stores

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder

/** Tìm siêu thị bằng Nominatim (cùng dữ liệu OpenStreetMap): nhanh và ổn định hơn Overpass nhưng chỉ có `[supermarket]`. */
class NominatimClient(private val endpoint: String = ENDPOINT) {

    suspend fun nearby(lat: Double, lng: Double, radiusM: Int): List<StoreCandidate> = withContext(Dispatchers.IO) {
        val conn = URL(url(lat, lng, radiusM)).openConnection() as HttpURLConnection
        try {
            conn.connectTimeout = TIMEOUT_MS
            conn.readTimeout = TIMEOUT_MS
            conn.setRequestProperty("User-Agent", USER_AGENT)
            conn.setRequestProperty("Accept-Language", "ja")
            if (conn.responseCode !in 200..299) error("Nominatim HTTP ${conn.responseCode}")
            NominatimParser.parse(conn.inputStream.bufferedReader().use { it.readText() }, lat, lng)
        } finally {
            conn.disconnect()
        }
    }

    private fun url(lat: Double, lng: Double, radiusM: Int): String {
        val box = Geo.viewbox(lat, lng, radiusM)
        return "$endpoint?q=" + URLEncoder.encode("[supermarket]", "UTF-8") +
            "&viewbox=${box.west},${box.north},${box.east},${box.south}&bounded=1&format=jsonv2&limit=15"
    }

    private companion object {
        const val ENDPOINT = "https://nominatim.openstreetmap.org/search"
        const val USER_AGENT = "DiChoChung/0.1"
        const val TIMEOUT_MS = 6_000
    }
}

object NominatimParser {

    /** Chỉ lấy `name`: `display_name` là địa chỉ, không dùng làm tên siêu thị. */
    fun parse(json: String, fromLat: Double, fromLng: Double): List<StoreCandidate> {
        val rows = runCatching { Json.parseToJsonElement(json).jsonArray }.getOrNull() ?: return emptyList()
        return rows
            .mapNotNull { row -> runCatching { candidate(row.jsonObject, fromLat, fromLng) }.getOrNull() }
            .sortedWith(compareBy({ it.distanceM }, { it.label }))
    }

    private fun candidate(row: JsonObject, fromLat: Double, fromLng: Double): StoreCandidate? {
        val name = row.text("name") ?: return null
        val lat = row.text("lat")?.toDoubleOrNull() ?: return null
        val lng = row.text("lon")?.toDoubleOrNull() ?: return null
        val osmId = "${row.text("osm_type") ?: return null}/${row.text("osm_id") ?: return null}"
        return StoreCandidate(name, null, lat, lng, Geo.distanceM(fromLat, fromLng, lat, lng), osmId)
    }

    private fun JsonObject.text(key: String) = this[key]?.jsonPrimitive?.contentOrNull?.trim()?.takeIf { it.isNotEmpty() }
}
