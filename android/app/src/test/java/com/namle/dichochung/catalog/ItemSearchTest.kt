package com.namle.dichochung.catalog

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class ItemSearchTest {

    private fun item(id: String, name: String, vararg aliases: String, nameJa: String? = null, sendCount: Int = 0, deleted: Boolean = false) =
        Item(id = id, name = name, aliases = aliases.toList(), nameJa = nameJa, category = Category.KHAC, unit = "cái",
            sendCount = sendCount, deleted = deleted)

    private val items = listOf(
        item("khoai_lang", "Khoai lang", nameJa = "さつまいも"),
        item("trung_ga", "Trứng gà", "trứng", "卵", "たまご", nameJa = "卵", sendCount = 5),
        item("ca_chua", "Cà chua", nameJa = "トマト", sendCount = 2),
        item("thit_heo", "Thịt heo", "thịt lợn", nameJa = "豚肉"),
        item("dau_phu", "Đậu phụ", "đậu hũ", "tofu", "豆腐", "とうふ", nameJa = "豆腐", sendCount = 9),
        item("bia", "Bia", deleted = true, sendCount = 99),
    )
    private val search = ItemSearch(items)

    private fun found(query: String): List<String> =
        search.search(query).let { r -> (r.matches + r.suggestions).map { it.id } }

    @Test
    fun search_withoutAccents_findsItem() {
        assertTrue("khoai_lang" in found("khoai lang"))
        assertTrue("khoai_lang" in found("khoai lag"))
    }

    @Test
    fun search_typo_givesSuggestion() {
        assertTrue("trung_ga" in found("trưng ga"))
        assertTrue("ca_chua" in found("ca chuaa"))
    }

    @Test
    fun search_alias_findsItem() {
        assertTrue("thit_heo" in found("thịt lợn"))
        for (q in listOf("tofu", "豆腐", "とうふ")) assertTrue(q, "dau_phu" in found(q))
    }

    @Test
    fun search_shortQuery_doesNotSuggestLookalikes() {
        // "la he" và "ca phe" chỉ lệch 2 ký tự nhưng hoàn toàn khác món.
        val r = ItemSearch(listOf(item("ca_phe", "Cà phê"))).search("lá hẹ")
        assertTrue(r.suggestions.isEmpty())
    }

    @Test
    fun search_unrelated_returnsEmpty() {
        val r = search.search("xe máy")
        assertTrue(r.matches.isEmpty())
        assertTrue(r.suggestions.isEmpty())
    }

    @Test
    fun search_emptyQuery_sortsBySendCount() {
        val r = search.search("")
        assertEquals(listOf("dau_phu", "trung_ga", "ca_chua", "khoai_lang", "thit_heo"), r.matches.map { it.id })
    }

    @Test
    fun search_excludesDeleted() {
        assertTrue("bia" !in found("bia"))
        assertTrue("bia" !in found(""))
    }

    @Test
    fun findDuplicate_detectsNearName() {
        assertEquals("khoai_lang", search.findDuplicate("khoai lang")?.id)
        assertNull(search.findDuplicate("bơ"))
    }
}
