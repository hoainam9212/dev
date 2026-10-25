package com.namle.dichochung.home

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.google.zxing.BarcodeFormat
import com.google.zxing.EncodeHintType
import com.google.zxing.qrcode.QRCodeWriter

/** Mã QR vẽ thẳng bằng Canvas từng ô (không qua Bitmap), nền trắng chừa lề yên tĩnh. */
@Composable
fun QrImage(content: String, modifier: Modifier = Modifier, size: Dp = 220.dp) {
    val matrix = remember(content) {
        QRCodeWriter().encode(content, BarcodeFormat.QR_CODE, 0, 0, mapOf(EncodeHintType.MARGIN to 0))
    }
    Box(
        modifier
            .testTag("invite_qr")
            .size(size)
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White)
            .padding(14.dp),
    ) {
        Canvas(Modifier.size(size - 28.dp)) {
            val cell = this.size.width / matrix.width
            // Ô hơi tràn nửa pixel để không lộ đường kẻ mảnh giữa các ô liền nhau.
            val cellSize = Size(cell + 0.5f, cell + 0.5f)
            for (y in 0 until matrix.height) {
                for (x in 0 until matrix.width) {
                    if (matrix.get(x, y)) drawRect(Color.Black, topLeft = Offset(x * cell, y * cell), size = cellSize)
                }
            }
        }
    }
}
