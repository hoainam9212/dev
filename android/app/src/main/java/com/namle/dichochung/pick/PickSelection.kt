package com.namle.dichochung.pick

import com.namle.dichochung.catalog.Item
import java.time.DayOfWeek

/** Lựa chọn trên máy (itemId → số lượng), giữ thứ tự chọn; chưa gửi thì không đồng bộ. */
object PickSelection {
    fun tap(selection: Map<String, Int>, item: Item): Map<String, Int> =
        if (item.id in selection) selection else selection + (item.id to item.defaultQty)

    fun plus(selection: Map<String, Int>, item: Item): Map<String, Int> {
        val current = selection[item.id] ?: return tap(selection, item)
        return selection + (item.id to current + item.step)
    }

    fun minus(selection: Map<String, Int>, item: Item): Map<String, Int> {
        val next = (selection[item.id] ?: return selection) - item.step
        return if (next <= 0) selection - item.id else selection + (item.id to next)
    }
}

object PickLabels {
    /** "theo gam" cho đơn vị g như mẫu; còn lại "theo <đơn vị>". */
    fun perUnit(unit: String): String = "theo ${if (unit == "g") "gam" else unit}"

    fun qty(qty: Int, unit: String): String = "$qty $unit"

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
