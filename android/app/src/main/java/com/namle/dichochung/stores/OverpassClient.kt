package com.namle.dichochung.stores

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder

/**
 * Tìm siêu thị quanh một điểm trên OpenStreetMap (Overpass API). Dùng HttpURLConnection có sẵn của Android
 * thay vì thêm OkHttp chỉ cho một lần gọi. Lỗi mạng / máy chủ bận → ném lỗi; máy chủ công cộng này hay quá tải nên chờ ngắn, xem [StoreFinder].
 */
class OverpassClient(private val endpoint: String = ENDPOINT) {

    suspend fun nearby(lat: Double, lng: Double, radiusM: Int): List<StoreCandidate> = withContext(Dispatchers.IO) {
        val conn = URL(endpoint).openConnection() as HttpURLConnection
        try {
            conn.requestMethod = "POST"
            conn.connectTimeout = TIMEOUT_MS
            conn.readTimeout = TIMEOUT_MS
            conn.doOutput = true
            conn.setRequestProperty("User-Agent", USER_AGENT)
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
            val body = "data=" + URLEncoder.encode(query(lat, lng, radiusM), "UTF-8")
            conn.outputStream.use { it.write(body.toByteArray()) }
            if (conn.responseCode !in 200..299) error("Overpass HTTP ${conn.responseCode}")
            val json = conn.inputStream.bufferedReader().use { it.readText() }
            OverpassParser.parse(json, lat, lng)
        } finally {
            conn.disconnect()
        }
    }

    companion object {
        private const val ENDPOINT = "https://overpass-api.de/api/interpreter"
        private const val USER_AGENT = "DiChoChung/0.1"
        private const val TIMEOUT_MS = 6_000

        /** Giống hệt tools/overpass/nishikasai.query (fixture của test) trừ toạ độ và bán kính. */
        fun query(lat: Double, lng: Double, radiusM: Int) =
            "[out:json][timeout:15];nwr(around:$radiusM,$lat,$lng)" +
                "[\"shop\"~\"^(supermarket|greengrocer|wholesale|convenience|department_store|mall)$\"];out tags center;"
    }
}
