package com.namle.dichochung.list

import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.data.EntryState
import com.namle.dichochung.data.ListEntry
import org.junit.Assert.assertEquals
import org.junit.Test

class ListSectionsTest {

    private val items = listOf(
        Item("rau_muong", "Rau muống", category = Category.RAU_CU, unit = "bó"),
        Item("thit_bo", "Thịt bò", category = Category.THIT_CA, unit = "khay"),
        Item("sua_tuoi", "Sữa tươi", category = Category.TRUNG_SUA, unit = "hộp"),
        Item("trung_ga", "Trứng gà", category = Category.TRUNG_SUA, unit = "quả"),
        Item("muoi", "Muối", category = Category.GIA_VI, unit = "gói"),
    ).associateBy { it.id }

    private fun e(id: String, itemId: String, at: Long, state: EntryState = EntryState.NEED, store: String? = null) =
        ListEntry(id, itemId, 1, "x", addedBy = "a", addedAt = at, state = state, outOfStockStore = store, updatedAt = at)

    @Test
    fun sections_orderByCategory() {
        val entries = listOf(e("1", "muoi", 1), e("2", "sua_tuoi", 2), e("3", "rau_muong", 3), e("4", "thit_bo", 4))
        val sections = ListSections.build(entries, items)
        assertEquals(listOf(Category.RAU_CU, Category.THIT_CA, Category.TRUNG_SUA, Category.GIA_VI), sections.map { it.category })
        assertEquals(listOf("Rau củ", "Thịt cá", "Trứng sữa", "Gia vị"), sections.map { it.title })
    }

    @Test
    fun sections_pickedAfterNeedInGroup() {
        val entries = listOf(
            e("1", "trung_ga", 1, EntryState.PICKED),
            e("2", "sua_tuoi", 5),
            e("3", "trung_ga", 3),
        )
        val rows = ListSections.build(entries, items).single().rows
        assertEquals(listOf("3", "2", "1"), rows.map { it.id })
    }

    @Test
    fun sections_outOfStockInLastSection() {
        val entries = listOf(
            e("1", "rau_muong", 1, EntryState.OUT_OF_STOCK, store = "AEON"),
            e("2", "thit_bo", 2),
            e("3", "muoi", 3, EntryState.OUT_OF_STOCK),
        )
        val sections = ListSections.build(entries, items)
        assertEquals(listOf(Category.THIT_CA, null), sections.map { it.category })
        assertEquals("Hết hàng — tìm chỗ khác", sections.last().title)
        assertEquals(listOf("1", "3"), sections.last().rows.map { it.id })
    }

    @Test
    fun sections_empty_andUnknownItemGoesToKhac() {
        assertEquals(emptyList<Section>(), ListSections.build(emptyList(), items))
        val sections = ListSections.build(listOf(e("1", "u_gone", 1)), items)
        assertEquals(listOf(Category.KHAC), sections.map { it.category })
    }

    @Test
    fun progress_countsPickedOverTotal() {
        val entries = listOf(
            e("1", "rau_muong", 1, EntryState.PICKED),
            e("2", "thit_bo", 2),
            e("3", "muoi", 3, EntryState.OUT_OF_STOCK),
            e("4", "sua_tuoi", 4, EntryState.PICKED),
        )
        assertEquals(2 to 4, ListSections.progress(entries))
        assertEquals(0 to 0, ListSections.progress(emptyList()))
    }
}
