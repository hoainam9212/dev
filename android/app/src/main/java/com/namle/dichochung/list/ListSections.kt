package com.namle.dichochung.list

import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.data.EntryState
import com.namle.dichochung.data.ListEntry

/** Một nhóm trong tab Cần mua (= một khu trong siêu thị); [category] null = nhóm "Hết hàng" ở cuối. */
data class Section(val category: Category?, val title: String, val rows: List<ListEntry>)

object ListSections {
    const val OUT_OF_STOCK_TITLE = "Hết hàng — tìm chỗ khác"

    /**
     * Nhóm theo thứ tự [Category] (món không còn trong kho → Khác); trong nhóm: cần mua (theo lúc thêm) rồi đã nhặt.
     * Mọi dòng hết hàng gom vào nhóm cuối. Nhóm rỗng không hiện.
     */
    fun build(entries: List<ListEntry>, items: Map<String, Item>): List<Section> {
        val (outOfStock, rest) = entries.partition { it.state == EntryState.OUT_OF_STOCK }
        val byCategory = rest.groupBy { items[it.itemId]?.category ?: Category.KHAC }
        val sections = Category.entries.mapNotNull { c ->
            val rows = byCategory[c] ?: return@mapNotNull null
            Section(c, c.vi, rows.sortedWith(compareBy<ListEntry>({ it.state == EntryState.PICKED }, { it.addedAt }, { it.id })))
        }
        val tail = if (outOfStock.isEmpty()) emptyList() else listOf(Section(null, OUT_OF_STOCK_TITLE, outOfStock.sortedBy { it.addedAt }))
        return sections + tail
    }

    /** (đã nhặt, tổng) — tổng gồm mọi dòng, kể cả hết hàng. */
    fun progress(entries: List<ListEntry>): Pair<Int, Int> = entries.count { it.state == EntryState.PICKED } to entries.size
}
