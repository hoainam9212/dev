package com.namle.dichochung.stores

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class GeoTest {

    @Test
    fun geo_distance_oneDegreeOfLatitude() {
        // Haversine với bán kính 6 371 km: 1° vĩ độ = 2πR/360 ≈ 111 195 m.
        assertEquals(111_195.0, Geo.distanceM(35.0, 139.0, 36.0, 139.0).toDouble(), 1.0)
        assertEquals(0, Geo.distanceM(35.6646, 139.8593, 35.6646, 139.8593))
    }

    @Test
    fun geo_distance_isSymmetric() {
        val a = Geo.distanceM(35.6646, 139.8593, 35.6700, 139.8700)
        val b = Geo.distanceM(35.6700, 139.8700, 35.6646, 139.8593)
        assertEquals(a, b)
        assertTrue(a in 1_000..1_200)
    }

    @Test
    fun distanceLabel_metresThenKilometres() {
        assertEquals("cách 40 m", Geo.distanceLabel(40))
        assertEquals("cách 950 m", Geo.distanceLabel(950))
        assertEquals("cách 1,2 km", Geo.distanceLabel(1_234))
        assertEquals("cách 12 km", Geo.distanceLabel(12_400))
    }

    @Test
    fun viewbox_isSquareAroundPoint() {
        val box = Geo.viewbox(35.6646, 139.8593, 200)
        assertEquals(200.0, Geo.distanceM(35.6646, 139.8593, box.north, 139.8593).toDouble(), 1.0)
        assertEquals(200.0, Geo.distanceM(35.6646, 139.8593, 35.6646, box.east).toDouble(), 1.0)
        assertEquals(35.6646 - (box.north - 35.6646), box.south, 1e-9)
        assertEquals(139.8593 - (box.east - 139.8593), box.west, 1e-9)
    }
}
