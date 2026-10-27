package com.namle.dichochung.list

import com.namle.dichochung.data.EntryState
import com.namle.dichochung.data.ListEntry
import org.junit.Assert.assertEquals
import org.junit.Test
import java.time.LocalDateTime
import java.time.ZoneId

class ListLabelsTest {

    private val tokyo = ZoneId.of("Asia/Tokyo")
    private fun at(h: Int, m: Int) = LocalDateTime.of(2026, 10, 24, h, m).atZone(tokyo).toInstant().toEpochMilli()
    private fun e(by: String, addedAt: Long, state: EntryState = EntryState.NEED) =
        ListEntry("id$addedAt", "x", 1, "x", addedBy = by, addedAt = addedAt, state = state, updatedAt = addedAt)

    @Test
    fun caption_namesLatestSenderAndTime() {
        val names = mapOf("vo" to "Vợ", "chong" to "Chồng")
        val entries = listOf(e("chong", at(9, 5)), e("vo", at(17, 46)), e("chong", at(12, 0)))
        assertEquals("Vợ gửi lúc 17:46", ListLabels.caption(entries, names, tokyo))
    }

    @Test
    fun caption_fallbacks() {
        assertEquals("Đi Chợ Chung", ListLabels.caption(emptyList(), emptyMap(), tokyo))
        assertEquals("Người nhà gửi lúc 08:03", ListLabels.caption(listOf(e("ai", at(8, 3))), emptyMap(), tokyo))
    }

    @Test
    fun progressLines() {
        assertEquals("Đã nhặt 2 món" to "còn 2 món nữa", ListLabels.progress(2, 4))
        assertEquals("Chưa nhặt món nào" to "cần mua 3 món", ListLabels.progress(0, 3))
        assertEquals("Đã nhặt đủ 4 món 🎉" to "bấm Hoàn thành khi xong", ListLabels.progress(4, 4))
    }

    @Test
    fun outOfStockLabel() {
        assertEquals("Hết ở AEON", ListLabels.outOfStock("AEON"))
        assertEquals("Hết hàng", ListLabels.outOfStock(null))
        assertEquals("Hết hàng", ListLabels.outOfStock(" "))
    }

    @Test
    fun finishedMessage() {
        assertEquals("Đã đi chợ xong · nhặt 3/5 món", ListLabels.finished(3, 5))
    }
}
