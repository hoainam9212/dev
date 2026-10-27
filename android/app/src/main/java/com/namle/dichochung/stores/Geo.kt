package com.namle.dichochung.stores

import java.util.Locale
import kotlin.math.asin
import kotlin.math.cos
import kotlin.math.roundToInt
import kotlin.math.sin
import kotlin.math.sqrt

object Geo {
    private const val EARTH_RADIUS_M = 6_371_000.0

    /** Khoảng cách mặt đất (haversine), làm tròn mét. */
    fun distanceM(lat1: Double, lng1: Double, lat2: Double, lng2: Double): Int {
        val dLat = Math.toRadians(lat2 - lat1)
        val dLng = Math.toRadians(lng2 - lng1)
        val a = sin(dLat / 2) * sin(dLat / 2) +
            cos(Math.toRadians(lat1)) * cos(Math.toRadians(lat2)) * sin(dLng / 2) * sin(dLng / 2)
        return (2 * EARTH_RADIUS_M * asin(sqrt(a.coerceIn(0.0, 1.0)))).roundToInt()
    }

    /** "cách 120 m" / "cách 1,2 km" (dấu phẩy thập phân kiểu Việt) / "cách 12 km". */
    fun distanceLabel(meters: Int): String = when {
        meters < 1_000 -> "cách $meters m"
        meters < 10_000 -> "cách ${String.format(Locale.ROOT, "%.1f", meters / 1000.0).replace('.', ',')} km"
        else -> "cách ${(meters / 1000.0).roundToInt()} km"
    }

    private val postalJa = Regex("〒?\\d{3}-\\d{4}\\s*")
    private val countryPrefix = Regex("^(日本、|日本\\s+)")
    private val countrySuffix = Regex(",?\\s*Japan$", RegexOption.IGNORE_CASE)

    /** Dòng địa chỉ Geocoder làm tên tạm: bỏ "日本、", "〒134-0088", ", Japan" và mã bưu điện. */
    fun cleanAddress(line: String): String =
        line.trim()
            .replace(countryPrefix, "")
            .replace(countrySuffix, "")
            .replace(postalJa, "")
            .trim()
            .trimEnd(',')
            .trim()
}
