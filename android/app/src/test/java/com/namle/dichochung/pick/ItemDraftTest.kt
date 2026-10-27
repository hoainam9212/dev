package com.namle.dichochung.pick

import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ItemDraftTest {

    private val catalog = listOf(
        Item("rau_muong", "Rau muống", category = Category.RAU_CU, unit = "bó"),
        Item("thit_bo", "Thịt bò", category = Category.THIT_CA, unit = "khay", imageAsset = "catalog/icons/thit_bo.webp"),
    )

    @Test
    fun forNew_normalizesNameAndGuesses() {
        val d = ItemDraft.forNew("  rau   ngót ", catalog)
        assertEquals("Rau ngót", d.name)
        assertEquals(Category.RAU_CU, d.category)
        assertEquals("bó", d.unit)
        assertEquals(1, d.defaultQty)
        assertEquals(1, d.step)
        assertTrue(d.isValid)
    }

    @Test
    fun withCategory_swapsGuessedUnit_keepsTypedUnit() {
        val guessed = ItemDraft.forNew("khoai mỡ", catalog)
        assertEquals(Category.KHAC, guessed.category)
        assertEquals("gói", guessed.unit)
        assertEquals("bó", guessed.withCategory(Category.RAU_CU).unit)

        val typed = guessed.copy(unit = "củ").withCategory(Category.RAU_CU)
        assertEquals("củ", typed.unit)
        assertEquals(Category.RAU_CU, typed.category)
    }

    @Test
    fun quantities_stayInRange() {
        val d = ItemDraft.forNew("Trứng vịt", catalog)
        assertEquals(1, d.withDefaultQty(0).defaultQty)
        assertEquals(ItemDraft.MAX_QTY, d.withDefaultQty(500).defaultQty)
        assertEquals(1, d.withStep(-3).step)
    }

    @Test
    fun invalid_whenNameOrUnitBlank() {
        val d = ItemDraft.forNew("Khoai mỡ", catalog)
        assertFalse(d.copy(name = "  ").isValid)
        assertFalse(d.copy(unit = "").isValid)
    }

    @Test
    fun toItem_new_usesIdAndNormalizedName() {
        val item = ItemDraft.forNew("khoai mỡ", catalog).copy(name = " khoai  mỡ tím ", unit = " củ ").toItem("u_12345678")
        assertEquals("u_12345678", item.id)
        assertEquals("Khoai mỡ tím", item.name)
        assertEquals("củ", item.unit)
        assertEquals(Category.KHAC, item.category)
    }

    @Test
    fun toItem_edit_keepsIdAndArt() {
        val base = catalog[1]
        val item = ItemDraft.forEdit(base).copy(name = "Thịt bò Úc").withDefaultQty(2).toItem("ignored")
        assertEquals("thit_bo", item.id)
        assertEquals("Thịt bò Úc", item.name)
        assertEquals(2, item.defaultQty)
        assertEquals("catalog/icons/thit_bo.webp", item.imageAsset)
    }

    @Test
    fun newId_hasPrefixAndEightChars() {
        val id = ItemDraft.newId()
        assertTrue(id, Regex("u_[0-9a-f]{8}").matches(id))
    }

    @Test
    fun isUserItem_onlyForAddedIds() {
        assertTrue(ItemDraft.isUserItem("u_0a1b2c3d"))
        assertFalse(ItemDraft.isUserItem("thit_bo"))
    }
}
