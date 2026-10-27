package com.namle.dichochung.pick

import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Guess
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.catalog.TextNorm
import java.util.UUID

/** Nội dung form thêm / sửa món. [base] = món đang sửa (null = món mới). */
data class ItemDraft(
    val name: String,
    val category: Category,
    val unit: String,
    val defaultQty: Int,
    val step: Int,
    val base: Item? = null,
) {
    val isNew: Boolean get() = base == null

    val isValid: Boolean get() = name.isNotBlank() && unit.isNotBlank()

    /** Đổi nhóm; đơn vị / số lượng vẫn đúng như app đoán cho nhóm cũ thì đoán lại theo nhóm mới, đã sửa tay thì giữ. */
    fun withCategory(value: Category): ItemDraft {
        val old = Guess.unit(category)
        val new = Guess.unit(value)
        return copy(
            category = value,
            unit = if (unit.trim() == old.first) new.first else unit,
            defaultQty = if (defaultQty == old.second) new.second else defaultQty,
            step = if (step == old.third) new.third else step,
        )
    }

    fun withDefaultQty(value: Int) = copy(defaultQty = value.coerceIn(1, MAX_QTY))

    fun withStep(value: Int) = copy(step = value.coerceIn(1, MAX_QTY))

    /** Món để lưu: tên chuẩn hoá; món đang sửa giữ id, ảnh, sendCount. */
    fun toItem(newId: String): Item {
        val cleanName = TextNorm.normalizeName(name)
        val cleanUnit = unit.trim()
        return base?.copy(name = cleanName, category = category, unit = cleanUnit, defaultQty = defaultQty, step = step)
            ?: Item(id = newId, name = cleanName, category = category, unit = cleanUnit, defaultQty = defaultQty, step = step)
    }

    companion object {
        const val MAX_QTY = 99
        const val MAX_NAME = 30
        const val MAX_UNIT = 10
        private const val USER_PREFIX = "u_"

        /** Món mới từ chữ đã gõ ở ô tìm: tên chuẩn hoá, nhóm + đơn vị đoán sẵn. */
        fun forNew(query: String, catalog: List<Item>): ItemDraft {
            val category = Guess.category(query, catalog)
            val (unit, qty, step) = Guess.unit(category)
            return ItemDraft(TextNorm.normalizeName(query).take(MAX_NAME), category, unit, qty, step)
        }

        fun forEdit(item: Item) = ItemDraft(item.name, item.category, item.unit, item.defaultQty, item.step, base = item)

        fun newId(): String = USER_PREFIX + UUID.randomUUID().toString().replace("-", "").take(8)

        /** Món nhà tự thêm (xoá hẳn doc) khác món kho gốc (chỉ đánh dấu deleted). */
        fun isUserItem(id: String) = id.startsWith(USER_PREFIX)
    }
}

/** Bảng thêm / sửa món đang mở. [photo] = ảnh mới (WebP) chưa lưu; [duplicate] = món gần giống đang hỏi "dùng món này nhé?". */
class ItemEditor(
    val draft: ItemDraft,
    val photo: ByteArray? = null,
    val duplicate: Item? = null,
    val busy: Boolean = false,
)
