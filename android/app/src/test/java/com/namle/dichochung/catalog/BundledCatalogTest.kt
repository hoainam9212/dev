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

    @Test
    fun bundledCatalog_parsesAllItems() {
        val items = BundledCatalog.load(ApplicationProvider.getApplicationContext())
        assertEquals(20, items.size)
        assertEquals(20, items.map { it.id }.toSet().size)
        assertTrue(items.all { it.unit.isNotBlank() && it.imageAsset == null })
    }
}
