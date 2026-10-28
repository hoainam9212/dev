package com.namle.dichochung.pick

import com.namle.dichochung.catalog.Item
import java.time.DayOfWeek

/** Lựa chọn trên máy (itemId → số lượng), giữ thứ tự chọn; chưa gửi thì không đồng bộ. */
object PickSelection {
    /** Chạm thẻ: chưa chọn → chọn với số mặc định; đã chọn → bỏ luôn (chọn nhầm khỏi bấm − nhiều lần). */
    fun tap(selection: Map<String, Int>, item: Item): Map<String, Int> =
        if (item.id in selection) selection - item.id else selection + (item.id to item.defaultQty)

    fun plus(selection: Map<String, Int>, item: Item): Map<String, Int> {
        val current = selection[item.id] ?: return selection + (item.id to item.defaultQty)
        return selection + (item.id to current + item.step)
    }

    fun minus(selection: Map<String, Int>, item: Item): Map<String, Int> {
        val next = (selection[item.id] ?: return selection) - item.step
        return if (next <= 0) selection - item.id else selection + (item.id to next)
    }
}

object PickLabels {
    fun qty(qty: Int, unit: String): String = "$qty $unit"

    /**
     * Nhãn nút gửi theo người nhận ([others] = tên hiển thị những người khác trong nhà): nhà 2 người ghi đích danh
     * "Gửi cho Chồng", từ 3 người trở lên "Gửi cho cả nhà", chưa mời ai thì "Gửi vào danh sách".
     */
    fun sendButton(others: List<String>): String = when (others.size) {
        0 -> "Gửi vào danh sách 🚀"
        1 -> "Gửi cho ${others.single()} 🚀"
        else -> "Gửi cho cả nhà 🚀"
    }

    fun sentMessage(count: Int, others: List<String>): String = when (others.size) {
        0 -> "Đã thêm $count món vào danh sách"
        1 -> "Đã gửi $count món cho ${others.single()}"
        else -> "Đã gửi $count món cho cả nhà"
    }

    fun weekday(day: DayOfWeek): String = when (day) {
        DayOfWeek.MONDAY -> "Thứ Hai"
        DayOfWeek.TUESDAY -> "Thứ Ba"
        DayOfWeek.WEDNESDAY -> "Thứ Tư"
        DayOfWeek.THURSDAY -> "Thứ Năm"
        DayOfWeek.FRIDAY -> "Thứ Sáu"
        DayOfWeek.SATURDAY -> "Thứ Bảy"
        DayOfWeek.SUNDAY -> "Chủ Nhật"
    }
}
