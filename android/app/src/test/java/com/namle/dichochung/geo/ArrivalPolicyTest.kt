package com.namle.dichochung.geo

import com.namle.dichochung.stores.Store
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ArrivalPolicyTest {

    private val h2 = ArrivalPolicy.COOLDOWN_MS

    @Test
    fun policy_notifies_whenNeedAndNoCooldown() {
        assertTrue(ArrivalPolicy.shouldNotify("s1", now = 1_000, lastNotified = emptyMap(), needCount = 3))
    }

    @Test
    fun policy_silent_whenListEmpty() {
        assertFalse(ArrivalPolicy.shouldNotify("s1", now = 1_000, lastNotified = emptyMap(), needCount = 0))
    }

    @Test
    fun policy_silent_withinTwoHours() {
        val last = mapOf("s1" to 10_000L)
        assertFalse(ArrivalPolicy.shouldNotify("s1", now = 10_000 + h2 - 1, lastNotified = last, needCount = 2))
        assertTrue(ArrivalPolicy.shouldNotify("s1", now = 10_000 + h2 + 1, lastNotified = last, needCount = 2))
    }

    @Test
    fun policy_otherStoreNotAffectedByCooldown() {
        assertTrue(ArrivalPolicy.shouldNotify("s2", now = 10_001, lastNotified = mapOf("s1" to 10_000L), needCount = 1))
    }

    @Test
    fun nearest_picksClosest() {
        val a = Store("a", "ワイズマート", 35.6653367, 139.8587726)
        val b = Store("b", "ファミリーマート", 35.6646808, 139.8595158)
        assertEquals(b, ArrivalPolicy.nearest(listOf(a, b), 35.6646, 139.8593))
        assertEquals(a, ArrivalPolicy.nearest(listOf(a, b), 35.6654, 139.8587))
    }

    @Test
    fun message_textForNotification() {
        assertEquals("🛒 Đang ở ワイズマート", ArrivalPolicy.title("ワイズマート"))
        assertEquals("còn 3 món cần mua", ArrivalPolicy.body(3))
    }
}
