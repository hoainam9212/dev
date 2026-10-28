package com.namle.dichochung.notify

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class PushPayloadTest {

    @Test
    fun data_sentArms_finishedDisarms() {
        val sent = PushPayload.parse(mapOf("type" to "sent", "title" to "🧺 Lan vừa gửi 2 món", "body" to "Bia, Đá"), null, null)
        assertEquals(PushPayload("🧺 Lan vừa gửi 2 món", "Bia, Đá", arm = true), sent)
        assertEquals(false, PushPayload.parse(mapOf("type" to "finished", "title" to "T", "body" to "B"), null, null)?.arm)
    }

    @Test
    fun oldNotificationPayload_stillShown_noArmChange() {
        // Function cũ (trước khi deploy bản data-only) gửi notification + data {open_tab}.
        assertEquals(PushPayload("T", "B", arm = null), PushPayload.parse(mapOf("open_tab" to "list"), "T", "B"))
    }

    @Test
    fun nothingToShow_isNull() {
        assertNull(PushPayload.parse(emptyMap(), null, null))
    }
}
