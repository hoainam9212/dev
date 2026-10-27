package com.namle.dichochung.data

import com.namle.dichochung.catalog.Item

/** Kết quả "Hoàn thành đi chợ": [deleteIds] = các dòng đã nhặt; [picked]/[total] cho thông báo "nhặt N/M món". */
data class FinishResult(val deleteIds: List<String>, val picked: Int, val total: Int)

object ListLogic {

    /**
     * Gộp món đã chọn vào danh sách (Review Focus #4): còn dòng NEED → cộng dồn; dòng OUT_OF_STOCK → cộng dồn,
     * giữ nhãn hết hàng; chỉ có dòng PICKED hoặc chưa có → tạo dòng NEED mới. Món không có trong [items] bị bỏ qua.
     */
    fun mergeSend(
        existing: List<ListEntry>,
        selection: Map<String, Int>,
        items: Map<String, Item>,
        by: String,
        now: Long,
        newId: () -> String,
    ): List<EntryWrite> = selection.mapNotNull { (itemId, qty) ->
        val item = items[itemId] ?: return@mapNotNull null
        val open = existing.filter { it.itemId == itemId }
        val target = open.firstOrNull { it.state == EntryState.NEED }
            ?: open.firstOrNull { it.state == EntryState.OUT_OF_STOCK }
        if (target != null) {
            EntryWrite.AddQty(target.id, added = qty, newQty = target.qty + qty, updatedAt = now)
        } else {
            EntryWrite.Create(ListEntry(newId(), itemId, qty, item.unit, addedBy = by, addedAt = now, updatedAt = now))
        }
    }

    /** Số món chưa mua: hết hàng vẫn tính là chưa mua (huy hiệu tab, "wasEmpty" của thông báo). */
    fun needCount(entries: List<ListEntry>): Int = entries.count { it.state != EntryState.PICKED }

    /** Xoá dòng đã nhặt; giữ dòng cần mua và hết hàng cho lần đi chợ sau. */
    fun finish(entries: List<ListEntry>): FinishResult {
        val picked = entries.filter { it.state == EntryState.PICKED }
        return FinishResult(picked.map { it.id }, picked.size, entries.size)
    }
}
