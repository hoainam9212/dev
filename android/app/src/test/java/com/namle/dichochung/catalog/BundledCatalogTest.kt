package com.namle.dichochung.catalog

import androidx.test.core.app.ApplicationProvider
import android.content.Context
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [34])
class BundledCatalogTest {

    private val firstTwenty = listOf(
        "trung_ga", "sua_tuoi", "ca_hoi", "thit_bo", "thit_heo", "ca_chua", "rau_muong", "rau_cai", "hanh_la", "toi",
        "khoai_lang", "khoai_tay", "ca_rot", "dau_phu", "nuoc_mam", "dau_an", "gao", "mi_goi", "banh_mi", "chuoi",
    )

    @Test
    fun bundledCatalog_parsesAllItems() {
        val items = BundledCatalog.load(ApplicationProvider.getApplicationContext())
        assertTrue("full catalog (Task 11) has ≥ 120 items, got ${items.size}", items.size >= 120)
        assertEquals(items.size, items.map { it.id }.toSet().size)
        Category.entries.forEach { c -> assertTrue("$c has items", items.any { it.category == c }) }
        assertTrue("Task 02 ids are kept", items.map { it.id }.containsAll(firstTwenty))
        assertTrue(items.all { it.unit.isNotBlank() })
    }

    @Test
    fun bundledCatalog_everyItemHasItsOwnEmoji_andSpicesAreCovered() {
        val items = BundledCatalog.load(ApplicationProvider.getApplicationContext())
        assertTrue(items.all { !it.emoji.isNullOrBlank() })
        val spices = items.filter { it.category == Category.GIA_VI }.map { it.id }
        assertTrue(spices.containsAll(listOf("muoi", "duong", "hat_nem", "tieu", "xi_dau", "nuoc_mam")))
        assertTrue(spices.size >= 15)
    }

    @Test
    fun bundledCatalog_fruitsHaveTheirOwnGroup() {
        val items = BundledCatalog.load(ApplicationProvider.getApplicationContext()).associateBy { it.id }
        listOf("chuoi", "tao", "quyt", "chanh", "qua_bo").forEach { id ->
            assertEquals(id, Category.HOA_QUA, items.getValue(id).category)
        }
        assertEquals(Category.RAU_CU, items.getValue("ca_chua").category)
    }

    @Test
    fun bundledCatalog_searchFindsGarlicChivesAndSkewers_notCoffee() {
        val search = ItemSearch(BundledCatalog.load(ApplicationProvider.getApplicationContext()))
        val chives = search.search("lá hẹ")
        assertEquals(listOf("la_he"), chives.matches.map { it.id })
        assertEquals(emptyList<Item>(), chives.suggestions)
        assertEquals("la_he", search.search("ニラ").matches.first().id)
        assertEquals("que_xien", search.search("竹串").matches.first().id)
    }

    @Test
    fun bundledCatalog_searchFindsOffalAndLuonGa() {
        val search = ItemSearch(BundledCatalog.load(ApplicationProvider.getApplicationContext()))
        val first = { q: String -> search.search(q).matches.first().id }
        assertEquals("chan_ga", first("chân gà"))
        assertEquals("tim_ga", first("tim gà"))
        assertEquals("gan_ga", first("gan gà"))
        assertEquals("me_ga", first("mề gà"))
        assertEquals("uc_ga", first("lườn gà"))
        assertEquals("tim_heo", first("tim lợn"))
        assertEquals("gan_heo", first("gan lợn"))
        assertEquals("gan_ga", first("鶏レバー"))
    }

    @Test
    fun bundledCatalog_everyItemHasA3dIconThatExists() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        val items = BundledCatalog.load(context)
        items.forEach { item ->
            assertEquals("catalog/icons/${item.id}.webp", item.imageAsset)
            context.assets.open(item.imageAsset!!).use { assertTrue("${item.id} icon is empty", it.read() >= 0) }
        }
    }

    @Test
    fun bundledCatalog_noStrayIcons() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        val ids = BundledCatalog.load(context).map { "${it.id}.webp" }.toSet()
        val files = context.assets.list("catalog/icons").orEmpty().toSet()
        assertEquals("icons without an item", emptySet<String>(), files - ids)
    }
}
