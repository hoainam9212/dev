package com.namle.dichochung.catalog

import androidx.test.core.app.ApplicationProvider
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
        assertEquals(33, items.size)
        assertEquals(items.size, items.map { it.id }.toSet().size)
        assertTrue("Task 02 ids are kept", items.map { it.id }.containsAll(firstTwenty))
        assertTrue(items.all { it.unit.isNotBlank() && it.imageAsset == null })
    }

    @Test
    fun bundledCatalog_everyItemHasItsOwnEmoji_andSpicesAreCovered() {
        val items = BundledCatalog.load(ApplicationProvider.getApplicationContext())
        assertTrue(items.all { !it.emoji.isNullOrBlank() })
        val spices = items.filter { it.category == Category.GIA_VI }.map { it.id }
        assertTrue(spices.containsAll(listOf("muoi", "duong", "hat_nem", "tieu", "xi_dau", "nuoc_mam")))
        assertTrue(spices.size >= 15)
    }
}
