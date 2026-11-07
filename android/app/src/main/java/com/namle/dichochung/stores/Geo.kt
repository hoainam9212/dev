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

    /** Khung vuông cạnh 2 × [radiusM] quanh một điểm. */
    fun viewbox(lat: Double, lng: Double, radiusM: Int): Viewbox {
        val dLat = Math.toDegrees(radiusM / EARTH_RADIUS_M)
        val dLng = dLat / cos(Math.toRadians(lat))
        return Viewbox(west = lng - dLng, north = lat + dLat, east = lng + dLng, south = lat - dLat)
    }
}

data class Viewbox(val west: Double, val north: Double, val east: Double, val south: Double)
