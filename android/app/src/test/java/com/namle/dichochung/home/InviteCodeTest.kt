package com.namle.dichochung.home

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import kotlin.random.Random

class InviteCodeTest {

    @Test
    fun inviteCode_isSixDigits() {
        val random = Random(42)
        val codes = List(1000) { InviteCode.generate(random) }
        assertTrue(codes.all { Regex("^\\d{6}$").matches(it) })
        assertTrue("leading zeros allowed", codes.any { it.startsWith("0") })
    }

    @Test
    fun inviteCode_expiredAfter15Minutes() {
        val t0 = 1_000_000L
        val expiresAt = t0 + InviteCode.TTL_MS
        assertEquals(15 * 60 * 1000L, InviteCode.TTL_MS)
        assertTrue(InviteCode.isExpired(expiresAt, expiresAt + 1))
        assertFalse(InviteCode.isExpired(expiresAt, expiresAt - 1))
    }

    @Test
    fun countdown_formatsMinutesSeconds() {
        assertEquals("15:00", InviteCode.remainingLabel(expiresAt = 900_000, now = 0))
        assertEquals("14:59", InviteCode.remainingLabel(expiresAt = 900_000, now = 1))
        assertEquals("0:05", InviteCode.remainingLabel(expiresAt = 5_000, now = 0))
        assertEquals("0:00", InviteCode.remainingLabel(expiresAt = 0, now = 10))
    }

    @Test
    fun joinError_messages() {
        assertEquals("Mã không đúng", InviteCode.joinError(exists = false, used = false, expiresAt = 0, now = 0))
        assertEquals("Mã đã được dùng", InviteCode.joinError(exists = true, used = true, expiresAt = 10, now = 0))
        assertEquals(
            "Mã đã hết hạn, nhờ người kia tạo mã mới",
            InviteCode.joinError(exists = true, used = false, expiresAt = 10, now = 11),
        )
        assertNull(InviteCode.joinError(exists = true, used = false, expiresAt = 10, now = 5))
    }
}
