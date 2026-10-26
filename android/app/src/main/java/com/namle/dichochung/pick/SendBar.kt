package com.namle.dichochung.pick

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.ui.theme.AppColors

/** Thanh nổi trắng "Đã chọn / N món" + nút cam gửi cho cả nhà. */
@Composable
fun SendBar(count: Int, enabled: Boolean, onSend: () -> Unit, modifier: Modifier = Modifier) {
    val shape = RoundedCornerShape(18.dp)
    Row(
        modifier
            .fillMaxWidth()
            .shadow(14.dp, shape, ambientColor = Color.Black, spotColor = Color.Black)
            .clip(shape)
            .background(AppColors.Surface)
            .padding(start = 16.dp, end = 10.dp, top = 10.dp, bottom = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(Modifier.weight(1f)) {
            Text("Đã chọn", style = MaterialTheme.typography.bodySmall, color = AppColors.TextMuted)
            Text("$count món", style = MaterialTheme.typography.titleMedium)
        }
        Box(
            Modifier
                .clip(RoundedCornerShape(13.dp))
                .background(AppColors.SendGradient)
                .clickable(enabled = enabled, onClick = onSend)
                .testTag("send_button")
                .padding(horizontal = 14.dp, vertical = 10.dp),
        ) {
            Text(
                "Gửi cho cả nhà 🚀",
                color = Color.White,
                style = MaterialTheme.typography.labelLarge.copy(fontSize = 13.5.sp, fontWeight = FontWeight.Bold),
                maxLines = 1,
            )
        }
    }
}
