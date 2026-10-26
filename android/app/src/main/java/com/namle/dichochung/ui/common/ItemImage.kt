package com.namle.dichochung.ui.common

import android.content.Context
import android.graphics.BitmapFactory
import android.util.LruCache
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.catalog.ItemArt
import com.namle.dichochung.catalog.displayEmoji
import com.namle.dichochung.ui.theme.AppColors

/** Nền pastel theo nhóm món (mẫu: rau xanh lá, thịt cá hồng, trứng sữa vàng / xanh dương, củ quả cam). */
val Category.tint: Color
    get() = when (this) {
        Category.RAU_CU -> AppColors.PastelGreen
        Category.THIT_CA -> AppColors.PastelPink
        Category.TRUNG_SUA -> AppColors.PastelYellow
        Category.GIA_VI -> AppColors.PastelOrange
        Category.DO_KHO -> AppColors.PastelYellow
        Category.DO_UONG -> AppColors.PastelBlue
        Category.KHAC -> AppColors.Divider
    }

/** Ảnh món trên nền pastel: ảnh nhà tự chụp → icon 3D đóng gói (Fluent Emoji) → emoji của món / nhóm. */
@Composable
fun ItemImage(item: Item, size: Dp, modifier: Modifier = Modifier) {
    val corner = if (size >= 50.dp) 16.dp else 12.dp
    Box(
        modifier.size(size).clip(RoundedCornerShape(corner)).background(item.category.tint),
        contentAlignment = Alignment.Center,
    ) {
        when (val art = ItemArt.of(item)) {
            is ItemArt.Photo ->
                AsyncImage(model = art.model, contentDescription = item.name, contentScale = ContentScale.Crop, modifier = Modifier.size(size))
            is ItemArt.Icon -> {
                val context = LocalContext.current
                val bitmap = remember(art.assetPath) { AssetIcons.load(context, art.assetPath) }
                if (bitmap != null) {
                    Image(bitmap, contentDescription = item.name, modifier = Modifier.size(size * 0.74f))
                } else {
                    EmojiArt(item.displayEmoji, size)
                }
            }
            is ItemArt.Emoji -> EmojiArt(art.emoji, size)
        }
    }
}

@Composable
private fun EmojiArt(emoji: String, size: Dp) {
    Text(emoji, fontSize = (size.value * 0.58f).sp)
}

/** Icon WebP nhỏ (≈ 6 KB) nên đọc thẳng từ assets lúc vẽ; giữ trong bộ nhớ để cuộn lưới không phải đọc lại. */
private object AssetIcons {
    private val cache = LruCache<String, ImageBitmap>(64)

    fun load(context: Context, path: String): ImageBitmap? = cache.get(path) ?: runCatching {
        context.assets.open(path).use { BitmapFactory.decodeStream(it) }?.asImageBitmap()
    }.getOrNull()?.also { cache.put(path, it) }
}
