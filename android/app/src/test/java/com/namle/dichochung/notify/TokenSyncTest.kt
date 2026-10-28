package com.namle.dichochung.notify

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class TokenSyncTest {

    @Test
    fun needsPush_onlyWhenTokenDiffers() {
        assertTrue(TokenSync.needsPush(stored = null, current = "tok_a"))
        assertTrue(TokenSync.needsPush(stored = "tok_old", current = "tok_a"))
        assertFalse(TokenSync.needsPush(stored = "tok_a", current = "tok_a"))
        // Chưa lấy được token (không có Play services, mất mạng lần đầu) thì không ghi gì.
        assertFalse(TokenSync.needsPush(stored = "tok_a", current = null))
        assertFalse(TokenSync.needsPush(stored = null, current = ""))
    }

    @Test
    fun field_isMemberTokenPath() {
        assertEquals("members.uid_123.fcmToken", TokenSync.field("uid_123"))
    }
}
