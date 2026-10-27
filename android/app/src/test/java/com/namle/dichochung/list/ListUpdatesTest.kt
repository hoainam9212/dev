package com.namle.dichochung.list

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Test

class ListUpdatesTest {

    @Test
    fun updates_tick_touchesOnlyStateFields() {
        assertEquals(mapOf("state" to "picked", "pickedBy" to "u1", "updatedAt" to 9L), ListUpdates.tick("u1", 9))
    }

    @Test
    fun updates_untick_clearsPicker() {
        assertEquals(mapOf("state" to "need", "pickedBy" to null, "updatedAt" to 9L), ListUpdates.untick(9))
    }

    @Test
    fun updates_edit_onlyNonNull() {
        val m = ListUpdates.edit(null, "bó non", 7)
        assertFalse("qty" in m)
        assertEquals(mapOf("note" to "bó non", "updatedAt" to 7L), m)
        // So từng khoá: trong mapOf("qty" to 3, "updatedAt" to 7L) Kotlin suy 3 thành Long, lệch kiểu với Int lưu thật.
        val q = ListUpdates.edit(3, null, 7)
        assertEquals(setOf("qty", "updatedAt"), q.keys)
        assertEquals(3, q["qty"])
    }

    @Test
    fun updates_edit_trimsAndCapsNote_qtyAtLeastOne() {
        val m = ListUpdates.edit(0, "  lấy " + "x".repeat(100) + "  ", 7)
        assertEquals(1, m["qty"])
        assertEquals(ListUpdates.MAX_NOTE, (m["note"] as String).length)
        assertEquals("lấy x", (m["note"] as String).take(5))
    }

    @Test
    fun updates_outOfStock_nullStore() {
        assertEquals(mapOf("state" to "outOfStock", "outOfStockAt" to null, "updatedAt" to 5L), ListUpdates.outOfStock(null, 5))
        assertEquals("AEON", ListUpdates.outOfStock("AEON", 5)["outOfStockAt"])
    }
}
