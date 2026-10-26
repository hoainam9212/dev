package com.namle.dichochung.catalog

import org.junit.Assert.assertEquals
import org.junit.Test

class CatalogMergeTest {

    private val bundled = listOf(
        Item("trung_ga", "Trứng gà", category = Category.TRUNG_SUA, unit = "quả", defaultQty = 10),
        Item("thit_bo", "Thịt bò", category = Category.THIT_CA, unit = "g", defaultQty = 300, step = 100),
    )

    @Test
    fun merge_homeFieldsOverrideBundled() {
        val merged = CatalogMerge.merge(
            bundled,
            mapOf(
                // Firestore gives whole numbers as Long.
                "trung_ga" to mapOf("sendCount" to 4L),
                "thit_bo" to mapOf("name" to "Thịt bò Úc", "deleted" to true),
            ),
        ).associateBy { it.id }
        assertEquals(4, merged.getValue("trung_ga").sendCount)
        assertEquals("Trứng gà", merged.getValue("trung_ga").name)
        assertEquals("Thịt bò Úc", merged.getValue("thit_bo").name)
        assertEquals(true, merged.getValue("thit_bo").deleted)
        assertEquals(300, merged.getValue("thit_bo").defaultQty)
    }

    @Test
    fun merge_homeOnlyItem_needsNameCategoryUnit() {
        val merged = CatalogMerge.merge(
            bundled,
            mapOf(
                "tu_them" to mapOf("name" to "Bánh đa", "category" to "do_kho", "unit" to "gói", "defaultQty" to 2L),
                "thieu" to mapOf("sendCount" to 1L),
            ),
        ).associateBy { it.id }
        assertEquals(Item("tu_them", "Bánh đa", category = Category.DO_KHO, unit = "gói", defaultQty = 2), merged["tu_them"])
        assertEquals(null, merged["thieu"])
        assertEquals(3, merged.size)
    }
}
