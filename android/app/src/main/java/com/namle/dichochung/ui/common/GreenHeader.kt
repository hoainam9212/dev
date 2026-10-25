package com.namle.dichochung.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.ui.theme.AppColors

/**
 * Dải đầu màn xanh chuyển màu + avatar vai; phần [extra] (ví dụ vòng tiến độ) nằm trong dải.
 * Nội dung bên dưới nên dùng [RaisedBody] để trồi lên bo góc như mẫu.
 */
@Composable
fun GreenHeader(
    caption: String,
    title: String,
    roleLabel: String,
    roleEmoji: String,
    extra: @Composable ColumnScope.() -> Unit = {},
) {
    Column(
        Modifier
            .fillMaxWidth()
            .background(AppColors.HeaderGradient)
            .padding(start = 20.dp, end = 20.dp, top = 16.dp, bottom = 36.dp),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text(caption, style = MaterialTheme.typography.bodySmall, color = Color.White.copy(alpha = 0.85f))
                Text(title, style = MaterialTheme.typography.headlineSmall, color = Color.White)
            }
            RolePill(roleLabel, roleEmoji)
        }
        extra()
    }
}

@Composable
private fun RolePill(label: String, emoji: String) {
    Row(
        Modifier
            .clip(CircleShape)
            .background(Color.White.copy(alpha = 0.18f))
            .padding(start = 3.dp, end = 10.dp, top = 3.dp, bottom = 3.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(6.dp),
    ) {
        Box(Modifier.size(26.dp).clip(CircleShape).background(Color.White), contentAlignment = Alignment.Center) {
            Text(emoji, fontSize = 15.sp)
        }
        Text(label, style = MaterialTheme.typography.labelMedium, color = Color.White)
    }
}

/** Phần nội dung nền ngà, bo góc trên 22 dp, trồi đè lên dải xanh 22 dp. */
@Composable
fun RaisedBody(modifier: Modifier = Modifier, content: @Composable ColumnScope.() -> Unit) {
    Column(
        modifier
            .offset(y = (-22).dp)
            .fillMaxWidth()
            .clip(RoundedCornerShape(topStart = 22.dp, topEnd = 22.dp))
            .background(AppColors.Background)
            .padding(top = 14.dp),
        content = content,
    )
}
