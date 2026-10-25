package com.namle.dichochung.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.namle.dichochung.ui.theme.AppColors

/** Thẻ trắng bo 18 dp, bóng nhẹ như `.list` trong mẫu; [title] in đậm ở đầu thẻ. */
@Composable
fun SectionCard(
    title: String?,
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit,
) {
    val shape = RoundedCornerShape(18.dp)
    Column(
        modifier
            .fillMaxWidth()
            .shadow(2.dp, shape, ambientColor = CardShadow, spotColor = CardShadow)
            .clip(shape)
            .background(AppColors.Surface)
            .padding(16.dp),
    ) {
        if (title != null) {
            Text(title, style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(bottom = 10.dp))
        }
        content()
    }
}

private val CardShadow = Color(0x1A14281E)
