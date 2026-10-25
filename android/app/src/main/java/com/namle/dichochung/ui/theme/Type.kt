package com.namle.dichochung.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.namle.dichochung.R

/** Font đóng gói trong app: không phụ thuộc font hệ thống để dấu tiếng Việt luôn đúng. */
val BeVietnamPro = FontFamily(
    Font(R.font.be_vietnam_pro_regular, FontWeight.Normal),
    Font(R.font.be_vietnam_pro_medium, FontWeight.Medium),
    Font(R.font.be_vietnam_pro_semibold, FontWeight.SemiBold),
    Font(R.font.be_vietnam_pro_bold, FontWeight.Bold),
    Font(R.font.be_vietnam_pro_extrabold, FontWeight.ExtraBold),
)

private fun style(size: Int, weight: FontWeight) =
    TextStyle(fontFamily = BeVietnamPro, fontWeight = weight, fontSize = size.sp, color = AppColors.Text)

val AppTypography = Typography(
    headlineSmall = style(21, FontWeight.ExtraBold),
    titleMedium = style(15, FontWeight.Bold),
    titleSmall = style(14, FontWeight.SemiBold),
    bodyLarge = style(15, FontWeight.Normal),
    bodyMedium = style(13, FontWeight.Normal),
    bodySmall = style(12, FontWeight.Medium),
    labelLarge = style(14, FontWeight.Bold),
    labelMedium = style(12, FontWeight.SemiBold),
    labelSmall = style(11, FontWeight.SemiBold),
)
