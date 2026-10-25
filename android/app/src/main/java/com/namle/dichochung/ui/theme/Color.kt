package com.namle.dichochung.ui.theme

import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color

/** Màu lấy từ docs/mockups/thiet-ke-v2.html. */
object AppColors {
    val Green = Color(0xFF2E9E62)
    val GreenLight = Color(0xFF6DBB5A)
    val GreenDark = Color(0xFF1F7A4C)
    val Background = Color(0xFFF6F5F0)
    val Surface = Color(0xFFFFFFFF)
    val Text = Color(0xFF1B2420)
    val TextMuted = Color(0xFF7A857F)
    val TextFaint = Color(0xFF9AA39E)
    val Divider = Color(0xFFECEEEA)
    val Orange = Color(0xFFFF8A3D)
    val OrangeDeep = Color(0xFFF2683A)
    val Red = Color(0xFFF2545B)

    val PastelGreen = Color(0xFFE7F4EA)
    val PastelPink = Color(0xFFFCE8EC)
    val PastelBlue = Color(0xFFE6F0FB)
    val PastelYellow = Color(0xFFFFF6D9)
    val PastelOrange = Color(0xFFFFF0E3)

    val HeaderGradient = Brush.linearGradient(listOf(Green, GreenLight))
    val SendGradient = Brush.linearGradient(listOf(Orange, OrangeDeep))
}
