package com.namle.dichochung.catalog

import org.junit.Assert.assertEquals
import org.junit.Test

class ItemArtTest {

    private val trung = Item("trung_ga", "Trứng gà", category = Category.TRUNG_SUA, unit = "quả", emoji = "🥚")

    @Test
    fun bundledIcon_isDrawnAsIcon() {
        assertEquals(ItemArt.Icon("catalog/icons/trung_ga.webp"), ItemArt.of(trung.copy(imageAsset = "catalog/icons/trung_ga.webp")))
    }

    @Test
    fun homePhoto_winsOverBundledIcon() {
        // Ảnh nhà tự chụp (Task 06) thay icon có sẵn.
        val item = trung.copy(imageAsset = "catalog/icons/trung_ga.webp", imageUrl = "https://x/y.jpg")
        assertEquals(ItemArt.Photo("https://x/y.jpg"), ItemArt.of(item))
    }

    @Test
    fun otherAsset_isPhoto() {
        assertEquals(ItemArt.Photo("file:///android_asset/catalog/photos/a.webp"), ItemArt.of(trung.copy(imageAsset = "catalog/photos/a.webp")))
    }

    @Test
    fun noImage_fallsBackToEmoji() {
        assertEquals(ItemArt.Emoji("🥚"), ItemArt.of(trung))
        assertEquals(ItemArt.Emoji(Category.TRUNG_SUA.emoji), ItemArt.of(trung.copy(emoji = null)))
    }
}
