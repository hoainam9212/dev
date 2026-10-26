package com.namle.dichochung.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
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

/** Ảnh món: ảnh đóng gói (Task 11) → ảnh nhà tự chụp (Task 06) → emoji của nhóm trên nền pastel. */
@Composable
fun ItemImage(item: Item, size: Dp, modifier: Modifier = Modifier) {
    val corner = if (size >= 50.dp) 16.dp else 12.dp
    val model = item.imageAsset?.let { "file:///android_asset/$it" } ?: item.imageUrl
    Box(
        modifier.size(size).clip(RoundedCornerShape(corner)).background(item.category.tint),
        contentAlignment = Alignment.Center,
    ) {
        if (model != null) {
            AsyncImage(model = model, contentDescription = item.name, contentScale = ContentScale.Crop, modifier = Modifier.size(size))
        } else {
            Text(item.category.emoji, fontSize = (size.value * 0.58f).sp)
        }
    }
}
