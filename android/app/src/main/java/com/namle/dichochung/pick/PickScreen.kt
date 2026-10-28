package com.namle.dichochung.pick

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.ui.common.GreenHeader
import com.namle.dichochung.ui.common.RaisedBody
import com.namle.dichochung.ui.theme.AppColors

/** [category] null = chip "Hay mua" (mọi món, hay gửi nhất lên đầu). [items] là danh sách đã lọc để hiện. */
data class PickUiState(
    val query: String = "",
    val category: Category? = null,
    val items: List<Item> = emptyList(),
    /** Đang tìm: món gần giống ("Có phải bạn tìm"), hiện sau [items]. */
    val suggestions: List<Item> = emptyList(),
    val selection: Map<String, Int> = emptyMap(),
    val sending: Boolean = false,
)

/**
 * Tab Chọn đồ (mẫu màn trái): tìm, chip nhóm, lưới 3 cột, thanh gửi nổi khi đã chọn món.
 * Đang tìm thì cuối lưới có dòng "+ Thêm" ([onAdd] nhận chữ đã gõ); nhấn giữ thẻ = sửa món ([onEdit]).
 */
@Composable
fun PickScreen(
    state: PickUiState,
    caption: String,
    sendLabel: String,
    roleLabel: String,
    roleEmoji: String,
    onQuery: (String) -> Unit,
    onCategory: (Category?) -> Unit,
    onTap: (String) -> Unit,
    onPlus: (String) -> Unit,
    onMinus: (String) -> Unit,
    onSend: () -> Unit,
    modifier: Modifier = Modifier,
    onAdd: (String) -> Unit = {},
    onEdit: (String) -> Unit = {},
    snackbar: SnackbarHostState = remember { SnackbarHostState() },
) {
    Box(modifier.fillMaxSize().background(AppColors.Background)) {
        Column(Modifier.fillMaxSize()) {
            GreenHeader(caption = caption, title = "Hôm nay mua gì?", roleLabel = roleLabel, roleEmoji = roleEmoji)
            RaisedBody(Modifier.weight(1f)) {
                SearchField(state.query, onQuery)
                CategoryChips(state.category, onCategory)
                val searching = state.query.isNotBlank()
                if (!searching && state.items.isEmpty()) {
                    Text(
                        "Chưa có món nào trong nhóm này",
                        style = MaterialTheme.typography.bodyMedium,
                        color = AppColors.TextMuted,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth().padding(top = 32.dp),
                    )
                } else {
                    val card: @Composable (Item) -> Unit = { item ->
                        ItemCard(
                            item = item,
                            qty = state.selection[item.id],
                            onTap = { onTap(item.id) },
                            onPlus = { onPlus(item.id) },
                            onMinus = { onMinus(item.id) },
                            onLongPress = { onEdit(item.id) },
                        )
                    }
                    LazyVerticalGrid(
                        columns = GridCells.Fixed(3),
                        contentPadding = PaddingValues(
                            start = 16.dp,
                            end = 16.dp,
                            top = 2.dp,
                            // Chừa chỗ cho thanh gửi nổi + phần RaisedBody bị đẩy lên 22 dp.
                            bottom = if (state.selection.isEmpty()) 38.dp else 110.dp,
                        ),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp),
                        modifier = Modifier.fillMaxWidth().testTag("item_grid"),
                    ) {
                        if (searching) {
                            searchResults(state.query, state.items, state.suggestions, card, onAdd)
                        } else {
                            items(state.items, key = { it.id }) { card(it) }
                        }
                    }
                }
            }
        }
        if (state.selection.isNotEmpty()) {
            SendBar(
                count = state.selection.size,
                label = sendLabel,
                enabled = !state.sending,
                onSend = onSend,
                modifier = Modifier.align(Alignment.BottomCenter).padding(horizontal = 16.dp, vertical = 12.dp),
            )
        }
        SnackbarHost(snackbar, Modifier.align(Alignment.TopCenter).padding(top = 8.dp))
    }
}

@Composable
private fun SearchField(query: String, onQuery: (String) -> Unit) {
    val shape = RoundedCornerShape(14.dp)
    BasicTextField(
        value = query,
        onValueChange = onQuery,
        singleLine = true,
        textStyle = MaterialTheme.typography.bodyMedium.copy(color = AppColors.Text),
        cursorBrush = SolidColor(AppColors.Green),
        modifier = Modifier
            .padding(start = 16.dp, end = 16.dp, bottom = 8.dp)
            .fillMaxWidth()
            .shadow(3.dp, shape, ambientColor = SearchShadow, spotColor = SearchShadow)
            .clip(shape)
            .background(AppColors.Surface)
            .testTag("search_field"),
        decorationBox = { inner ->
            Row(Modifier.padding(horizontal = 14.dp, vertical = 11.dp), verticalAlignment = Alignment.CenterVertically) {
                Text("🔍", fontSize = 13.sp)
                Box(Modifier.weight(1f).padding(start = 8.dp)) {
                    if (query.isEmpty()) {
                        Text("Tìm thực phẩm…", style = MaterialTheme.typography.bodyMedium, color = Color(0xFFA0A8A3))
                    }
                    inner()
                }
                if (query.isNotEmpty()) {
                    Text(
                        "✕",
                        color = AppColors.TextFaint,
                        modifier = Modifier.clip(CircleShape).clickable { onQuery("") }.padding(horizontal = 4.dp),
                    )
                }
            }
        },
    )
}

/** Hai hàng chip để thấy đủ "Hay mua" + 8 nhóm (kể cả Gia vị) mà không phải vuốt ngang. */
@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun CategoryChips(selected: Category?, onCategory: (Category?) -> Unit) {
    FlowRow(
        Modifier
            .fillMaxWidth()
            .padding(start = 16.dp, end = 16.dp, top = 2.dp, bottom = 10.dp),
        horizontalArrangement = Arrangement.spacedBy(6.dp),
        verticalArrangement = Arrangement.spacedBy(6.dp),
    ) {
        Chip("Hay mua", selected == null, "chip_hay_mua") { onCategory(null) }
        Category.entries.forEach { c ->
            Chip(c.vi, selected == c, "chip_${c.key}") { onCategory(c) }
        }
    }
}

@Composable
private fun Chip(label: String, on: Boolean, tag: String, onClick: () -> Unit) {
    Text(
        label,
        style = MaterialTheme.typography.labelMedium.copy(fontSize = 12.5.sp),
        color = if (on) Color.White else Color(0xFF56615B),
        maxLines = 1,
        modifier = Modifier
            .clip(CircleShape)
            .background(if (on) AppColors.Text else AppColors.Surface)
            .clickable(onClick = onClick)
            .testTag(tag)
            // Lề ngang vừa đủ để "Hay mua" + 8 nhóm nằm gọn hai hàng trên máy rộng 411 dp.
            .padding(horizontal = 8.dp, vertical = 7.dp),
    )
}

private val SearchShadow = Color(0x1414281E)
