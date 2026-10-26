package com.namle.dichochung.catalog

/** Hình hiển thị của một món, theo thứ tự ưu tiên: ảnh nhà tự chụp → icon / ảnh đóng gói → emoji. */
sealed interface ItemArt {
    /** Icon 3D đóng gói (`catalog/icons/…`), vẽ thu nhỏ giữa ô pastel. */
    data class Icon(val assetPath: String) : ItemArt

    /** Ảnh chụp (URL Storage hoặc ảnh đóng gói khác), phủ kín ô. */
    data class Photo(val model: String) : ItemArt

    data class Emoji(val emoji: String) : ItemArt

    companion object {
        private const val ICON_DIR = "catalog/icons/"

        fun of(item: Item): ItemArt {
            item.imageUrl?.takeIf { it.isNotBlank() }?.let { return Photo(it) }
            val asset = item.imageAsset?.takeIf { it.isNotBlank() } ?: return Emoji(item.displayEmoji)
            return if (asset.startsWith(ICON_DIR)) Icon(asset) else Photo("file:///android_asset/$asset")
        }
    }
}
