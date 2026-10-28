package com.namle.dichochung.catalog

import org.junit.Assert.assertEquals
import org.junit.Test

class GuessTest {

    private val catalog = listOf(
        Item("rau_muong", "Rau muống", category = Category.RAU_CU, unit = "bó"),
        Item("thit_bo", "Thịt bò", category = Category.THIT_CA, unit = "khay"),
        Item("thit_heo", "Thịt heo", aliases = listOf("thịt lợn"), category = Category.THIT_CA, unit = "khay"),
        Item("ca_chua", "Cà chua", category = Category.RAU_CU, unit = "quả"),
        Item("ca_hoi", "Cá hồi", category = Category.THIT_CA, unit = "khay"),
        Item("trung_ga", "Trứng gà", category = Category.TRUNG_SUA, unit = "quả"),
        Item("nuoc_mam", "Nước mắm", category = Category.GIA_VI, unit = "chai"),
    )

    @Test
    fun guess_category_fromPrefix() {
        assertEquals(Category.RAU_CU, Guess.category("rau ngót", catalog))
        assertEquals(Category.THIT_CA, Guess.category("thịt gà ta", catalog))
        assertEquals(Category.KHAC, Guess.category("pin AA", catalog))
    }

    @Test
    fun guess_category_prefersSameDiacritics() {
        // "cà" (cà chua) và "cá" (cá hồi) cùng bỏ dấu thành "ca": giữ dấu thì phân biệt được.
        assertEquals(Category.RAU_CU, Guess.category("Cà rốt", catalog))
        assertEquals(Category.THIT_CA, Guess.category("cá thu", catalog))
    }

    @Test
    fun guess_category_withoutDiacritics_andAliases() {
        assertEquals(Category.TRUNG_SUA, Guess.category("trung vit", catalog))
        assertEquals(Category.THIT_CA, Guess.category("thịt lợn xay", catalog))
    }

    @Test
    fun guess_category_longestPrefixWins() {
        val more = catalog + Item("nuoc_loc", "Nước lọc", category = Category.DO_UONG, unit = "chai")
        assertEquals(Category.GIA_VI, Guess.category("nước mắm chay", more))
    }

    @Test
    fun guess_category_blank_isKhac() {
        assertEquals(Category.KHAC, Guess.category("   ", catalog))
    }

    @Test
    fun guess_unit_byCategory() {
        assertEquals(Triple("khay", 1, 1), Guess.unit(Category.THIT_CA))
        assertEquals(Triple("bó", 1, 1), Guess.unit(Category.RAU_CU))
        assertEquals(Triple("quả", 1, 1), Guess.unit(Category.HOA_QUA))
        assertEquals(Triple("hộp", 1, 1), Guess.unit(Category.TRUNG_SUA))
        listOf(Category.GIA_VI, Category.DO_KHO, Category.DO_UONG, Category.KHAC).forEach {
            assertEquals(Triple("gói", 1, 1), Guess.unit(it))
        }
    }
}
