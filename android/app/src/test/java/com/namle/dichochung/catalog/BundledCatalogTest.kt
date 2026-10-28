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
