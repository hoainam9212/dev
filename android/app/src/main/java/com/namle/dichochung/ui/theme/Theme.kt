package com.namle.dichochung.ui.theme

import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider

private val AppColorScheme = lightColorScheme(
    primary = AppColors.Green,
    onPrimary = AppColors.Surface,
    secondary = AppColors.OrangeDeep,
    background = AppColors.Background,
    onBackground = AppColors.Text,
    surface = AppColors.Surface,
    onSurface = AppColors.Text,
    error = AppColors.Red,
)

@Composable
fun DiChoTheme(content: @Composable () -> Unit) {
    MaterialTheme(colorScheme = AppColorScheme, typography = AppTypography) {
        // Màu chữ mặc định ngoài Surface; nút / thẻ Material tự đặt lại (onPrimary, onSurface).
        CompositionLocalProvider(LocalContentColor provides AppColors.Text, content = content)
    }
}
