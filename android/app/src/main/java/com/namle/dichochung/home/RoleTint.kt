package com.namle.dichochung.home

import androidx.compose.ui.graphics.Color
import com.namle.dichochung.data.Role
import com.namle.dichochung.ui.theme.AppColors

/** Nền pastel của avatar / ô chọn vai, lấy từ bảng màu nhóm món trong mẫu. */
val Role.tint: Color
    get() = when (this) {
        Role.VO -> AppColors.PastelPink
        Role.CHONG -> AppColors.PastelBlue
        Role.CON -> AppColors.PastelYellow
        Role.ONG -> AppColors.PastelOrange
        Role.BA -> AppColors.PastelGreen
        Role.KHAC -> AppColors.Divider
    }
