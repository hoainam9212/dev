package com.namle.dichochung.data

import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import org.junit.Assert.assertEquals
import org.junit.Test

class ListLogicTest {

    private val trung = Item("trung_ga", "Trứng gà", category = Category.TRUNG_SUA, unit = "quả", defaultQty = 10)
    private val bo = Item("thit_bo", "Thịt bò", category = Category.THIT_CA, unit = "g", defaultQty = 300, step = 100)
    private val items = listOf(trung, bo).associateBy { it.id }

    private fun entry(id: String, itemId: String, qty: Int, state: EntryState, store: String? = null) =
        ListEntry(id, itemId, qty, "quả", addedBy = "a", addedAt = 1, state = state, outOfStockStore = store, updatedAt = 1)

    private fun ids(): () -> String {
        var n = 0
        return { "new${++n}" }
    }

    @Test
    fun mergeSend_newItem_createsNeed() {
        val writes = ListLogic.mergeSend(emptyList(), mapOf("thit_bo" to 300), items, by = "a", now = 50, newId = ids())
        assertEquals(
            listOf(EntryWrite.Create(ListEntry("new1", "thit_bo", 300, "g", addedBy = "a", addedAt = 50, updatedAt = 50))),
            writes,
        )
    }

    @Test
    fun mergeSend_existingNeed_addsQty() {
        val existing = listOf(entry("e1", "trung_ga", 10, EntryState.NEED))
        val writes = ListLogic.mergeSend(existing, mapOf("trung_ga" to 6), items, by = "b", now = 50, newId = ids())
        assertEquals(listOf(EntryWrite.AddQty("e1", added = 6, newQty = 16, updatedAt = 50)), writes)
    }

    @Test
    fun mergeSend_outOfStock_addsQtyKeepsLabel() {
        val existing = listOf(entry("e1", "trung_ga", 10, EntryState.OUT_OF_STOCK, store = "s1"))
        val writes = ListLogic.mergeSend(existing, mapOf("trung_ga" to 10), items, by = "a", now = 50, newId = ids())
        // AddQty only touches qty/updatedAt, so state OUT_OF_STOCK and the store label stay as they are.
        assertEquals(listOf(EntryWrite.AddQty("e1", added = 10, newQty = 20, updatedAt = 50)), writes)
    }

    @Test
    fun mergeSend_onlyPicked_createsNewNeed() {
        val existing = listOf(entry("e1", "trung_ga", 10, EntryState.PICKED))
        val writes = ListLogic.mergeSend(existing, mapOf("trung_ga" to 10, "thit_bo" to 400), items, by = "a", now = 50, newId = ids())
        assertEquals(
            listOf(
                EntryWrite.Create(ListEntry("new1", "trung_ga", 10, "quả", addedBy = "a", addedAt = 50, updatedAt = 50)),
                EntryWrite.Create(ListEntry("new2", "thit_bo", 400, "g", addedBy = "a", addedAt = 50, updatedAt = 50)),
            ),
            writes,
        )
    }

    @Test
    fun mergeSend_unknownItem_isSkipped() {
        assertEquals(emptyList<EntryWrite>(), ListLogic.mergeSend(emptyList(), mapOf("x" to 1), items, "a", 50, ids()))
    }

    @Test
    fun needCount_countsNeedAndOutOfStock() {
        val entries = listOf(
            entry("1", "trung_ga", 1, EntryState.NEED),
            entry("2", "thit_bo", 1, EntryState.OUT_OF_STOCK),
            entry("3", "sua", 1, EntryState.PICKED),
        )
        assertEquals(2, ListLogic.needCount(entries))
        assertEquals(0, ListLogic.needCount(emptyList()))
    }

    @Test
    fun entryState_firestoreKeys() {
        assertEquals(listOf("need", "picked", "outOfStock"), EntryState.entries.map { it.key })
        assertEquals(EntryState.OUT_OF_STOCK, EntryState.fromKey("outOfStock"))
        assertEquals(EntryState.NEED, EntryState.fromKey(null))
    }

    @Test
    fun finish_deletesOnlyPicked() {
        val entries = listOf(
            entry("e1", "trung_ga", 10, EntryState.PICKED),
            entry("e2", "thit_bo", 1, EntryState.NEED),
            entry("e3", "trung_ga", 6, EntryState.PICKED),
        )
        assertEquals(FinishResult(deleteIds = listOf("e1", "e3"), picked = 2, total = 3), ListLogic.finish(entries))
    }

    @Test
    fun finish_keepsNeedAndOutOfStock() {
        val entries = listOf(entry("e1", "trung_ga", 10, EntryState.NEED), entry("e2", "thit_bo", 1, EntryState.OUT_OF_STOCK, store = "AEON"))
        assertEquals(FinishResult(emptyList(), picked = 0, total = 2), ListLogic.finish(entries))
    }
}
