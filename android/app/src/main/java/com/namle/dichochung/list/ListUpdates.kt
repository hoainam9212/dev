package com.namle.dichochung.list

import com.namle.dichochung.data.EntryState

/**
 * Trường cần `update` cho một dòng Cần mua — chỉ trường đổi, để hai máy sửa cùng dòng không ghi đè nhau
 * (Review Focus #2). Nhãn hết hàng nằm ở trường `outOfStockAt` (LEDGER Task 5).
 */
object ListUpdates {
    const val MAX_NOTE = 40

    fun tick(by: String, now: Long): Map<String, Any?> =
        mapOf("state" to EntryState.PICKED.key, "pickedBy" to by, "updatedAt" to now)

    /** Bỏ tick, và cũng dùng để đưa dòng hết hàng về "cần mua" (vuốt lần nữa). */
    fun untick(now: Long): Map<String, Any?> =
        mapOf("state" to EntryState.NEED.key, "pickedBy" to null, "updatedAt" to now)

    fun outOfStock(storeName: String?, now: Long): Map<String, Any?> =
        mapOf("state" to EntryState.OUT_OF_STOCK.key, "outOfStockAt" to storeName, "updatedAt" to now)

    /** Chỉ trường khác null; số lượng ≥ 1, ghi chú cắt gọn ≤ [MAX_NOTE] ký tự. */
    fun edit(qty: Int?, note: String?, now: Long): Map<String, Any?> = buildMap {
        qty?.let { put("qty", it.coerceAtLeast(1)) }
        note?.let { put("note", it.trim().take(MAX_NOTE).trim()) }
        put("updatedAt", now)
    }
}
