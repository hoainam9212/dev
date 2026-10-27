package com.namle.dichochung.pick

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyGridScope
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.ui.theme.AppColors

/**
 * Kết quả tìm trong lưới 3 cột (spec 4.2): món khớp → "Có phải bạn tìm:" + món gần giống → dòng
 * **+ Thêm "<chữ đã gõ>"** luôn nằm cuối, kể cả khi không khớp gì.
 */
fun LazyGridScope.searchResults(
    query: String,
    matches: List<Item>,
    suggestions: List<Item>,
    card: @Composable (Item) -> Unit,
    onAdd: (String) -> Unit,
) {
    items(matches, key = { it.id }) { card(it) }
    if (suggestions.isNotEmpty()) {
        item(key = "suggest_header", span = { GridItemSpan(maxLineSpan) }) {
            Text(
                "Có phải bạn tìm:",
                style = MaterialTheme.typography.labelLarge,
                color = AppColors.TextMuted,
                modifier = Modifier.padding(top = if (matches.isEmpty()) 0.dp else 6.dp, start = 2.dp).testTag("suggest_header"),
            )
        }
        items(suggestions, key = { "s_${it.id}" }) { card(it) }
    }
    item(key = "add_item_row", span = { GridItemSpan(maxLineSpan) }) {
        AddItemRow(query.trim()) { onAdd(query.trim()) }
    }
}

@Composable
private fun AddItemRow(text: String, onClick: () -> Unit) {
    val shape = RoundedCornerShape(16.dp)
    Text(
        "+ Thêm \"$text\"",
        style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.SemiBold),
        color = AppColors.Green,
        maxLines = 1,
        overflow = TextOverflow.Ellipsis,
        modifier = Modifier
            .padding(top = 4.dp)
            .fillMaxWidth()
            .clip(shape)
            .background(AppColors.Surface)
            .border(1.5.dp, AppColors.Green, shape)
            .clickable(onClick = onClick)
            .testTag("add_item_row")
            .padding(horizontal = 16.dp, vertical = 14.dp),
    )
}
