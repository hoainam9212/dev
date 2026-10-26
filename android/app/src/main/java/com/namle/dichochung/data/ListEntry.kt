package com.namle.dichochung.data

/** Trạng thái một dòng Cần mua; [key] là giá trị lưu ở Firestore (`state`). */
enum class EntryState(val key: String) {
    NEED("need"),
    PICKED("picked"),
    OUT_OF_STOCK("outOfStock");

    companion object {
        fun fromKey(key: String?): EntryState = entries.firstOrNull { it.key == key } ?: NEED
    }
}

/** Một dòng trong `homes/{id}/list`. [outOfStockStore] là siêu thị hết hàng (Firestore `outOfStockAt`). */
data class ListEntry(
    val id: String,
    val itemId: String,
    val qty: Int,
    val unit: String,
    val note: String = "",
    val addedBy: String,
    val addedAt: Long,
    val state: EntryState = EntryState.NEED,
    val outOfStockStore: String? = null,
    val pickedBy: String? = null,
    val updatedAt: Long,
)

/** Một thay đổi trên danh sách khi gửi; [AddQty] chỉ đụng `qty` + `updatedAt` để không ghi đè nhau (Review Focus #2). */
sealed interface EntryWrite {
    data class Create(val entry: ListEntry) : EntryWrite

    /** [added] ghi bằng FieldValue.increment để hai máy cùng gửi không mất số; [newQty] là kết quả dự kiến. */
    data class AddQty(val entryId: String, val added: Int, val newQty: Int, val updatedAt: Long) : EntryWrite
}
