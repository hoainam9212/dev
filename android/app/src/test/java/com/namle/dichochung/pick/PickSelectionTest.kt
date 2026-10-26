package com.namle.dichochung.pick

import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import org.junit.Assert.assertEquals
import org.junit.Test
import java.time.DayOfWeek

class PickSelectionTest {

    private val trung = Item("trung_ga", "Trứng gà", category = Category.TRUNG_SUA, unit = "quả", defaultQty = 10)
    private val bo = Item("thit_bo", "Thịt bò", category = Category.THIT_CA, unit = "g", defaultQty = 300, step = 100)

    @Test
    fun selection_tap_setsDefaultQty() {
        val s = PickSelection.tap(emptyMap(), trung)
        assertEquals(mapOf("trung_ga" to 10), s)
        // Tapping a card that is already picked keeps its quantity; − / + change it.
        assertEquals(mapOf("trung_ga" to 12), PickSelection.tap(mapOf("trung_ga" to 12), trung))
    }

    @Test
    fun selection_plusMinus_usesStep() {
        var s = PickSelection.tap(emptyMap(), bo)
        assertEquals(300, s["thit_bo"])
        s = PickSelection.plus(s, bo)
        assertEquals(400, s["thit_bo"])
        s = PickSelection.minus(s, bo)
        assertEquals(300, s["thit_bo"])
        // + on a card that is not picked yet starts from defaultQty.
        assertEquals(mapOf("trung_ga" to 10), PickSelection.plus(emptyMap(), trung))
    }

    @Test
    fun selection_minusToZero_removes() {
        var s = mapOf("thit_bo" to 100, "trung_ga" to 1)
        s = PickSelection.minus(s, bo)
        assertEquals(mapOf("trung_ga" to 1), s)
        s = PickSelection.minus(s, trung)
        assertEquals(emptyMap<String, Int>(), s)
    }

    @Test
    fun selection_keepsPickOrder() {
        val s = PickSelection.tap(PickSelection.tap(emptyMap(), bo), trung)
        assertEquals(listOf("thit_bo", "trung_ga"), s.keys.toList())
    }

    @Test
    fun labels_vietnamese() {
        assertEquals("theo gam", PickLabels.perUnit("g"))
        assertEquals("theo quả", PickLabels.perUnit("quả"))
        assertEquals("300 g", PickLabels.qty(300, "g"))
        assertEquals("Thứ Bảy", PickLabels.weekday(DayOfWeek.SATURDAY))
        assertEquals("Chủ Nhật", PickLabels.weekday(DayOfWeek.SUNDAY))
        assertEquals("Thứ Hai", PickLabels.weekday(DayOfWeek.MONDAY))
    }
}
