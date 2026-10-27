package com.namle.dichochung.list

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.HorizontalDivider
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
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.data.ListEntry
import com.namle.dichochung.ui.common.GreenHeader
import com.namle.dichochung.ui.common.RaisedBody
import com.namle.dichochung.ui.theme.AppColors

/** Tab Cần mua: [sections] đã nhóm sẵn, [items] để lấy tên / ảnh, [entries] thô cho dòng "Vợ gửi lúc …". */
data class ListUiState(
    val sections: List<Section> = emptyList(),
    val items: Map<String, Item> = emptyMap(),
    val picked: Int = 0,
    val total: Int = 0,
    val entries: List<ListEntry> = emptyList(),
)

/**
 * Tab Cần mua (mẫu màn phải): dải xanh "<ai> gửi lúc HH:MM" + vòng tiến độ, danh sách chia theo khu,
 * nút nổi "Hoàn thành đi chợ 🛒" khi đã nhặt ít nhất một món. Dòng có [ListEntry.addedAt] > [freshSince]
 * (người kia vừa thêm khi đang mở màn) nhấp nháy viền một lần.
 */
@Composable
fun ListScreen(
    state: ListUiState,
    caption: String,
    roleLabel: String,
    roleEmoji: String,
    onTick: (String) -> Unit,
    onSwipe: (String) -> Unit,
    onEdit: (String) -> Unit,
    onFinish: () -> Unit,
    modifier: Modifier = Modifier,
    freshSince: Long = Long.MAX_VALUE,
    snackbar: SnackbarHostState = remember { SnackbarHostState() },
) {
    Box(modifier.fillMaxSize().background(AppColors.Background)) {
        Column(Modifier.fillMaxSize()) {
            GreenHeader(caption = caption, title = "Cần mua", roleLabel = roleLabel, roleEmoji = roleEmoji) {
                if (state.total > 0) ProgressHeader(state.picked, state.total)
            }
            RaisedBody(Modifier.weight(1f)) {
                if (state.sections.isEmpty()) {
                    EmptyList()
                } else {
                    LazyColumn(
                        contentPadding = PaddingValues(
                            start = 16.dp,
                            end = 16.dp,
                            top = 2.dp,
                            // Nút Hoàn thành nổi không được che dòng cuối (+ 22 dp RaisedBody trồi lên).
                            bottom = if (state.picked > 0) 112.dp else 38.dp,
                        ),
                        verticalArrangement = Arrangement.spacedBy(8.dp),
                        modifier = Modifier.fillMaxWidth().testTag("entry_list"),
                    ) {
                        items(state.sections, key = { it.category?.key ?: "out_of_stock" }) { section ->
                            SectionBlock(section, state, freshSince, onTick, onSwipe, onEdit)
                        }
                    }
                }
            }
        }
        if (state.picked > 0) {
            FinishButton(onFinish, Modifier.align(Alignment.BottomCenter).padding(horizontal = 16.dp, vertical = 12.dp))
        }
        SnackbarHost(snackbar, Modifier.align(Alignment.TopCenter).padding(top = 8.dp))
    }
}

@Composable
private fun ProgressHeader(picked: Int, total: Int) {
    val (line1, line2) = ListLabels.progress(picked, total)
    Row(Modifier.padding(top = 14.dp), verticalAlignment = Alignment.CenterVertically) {
        ProgressRing(picked, total)
        Column(Modifier.padding(start = 14.dp)) {
            Text(line1, style = MaterialTheme.typography.titleSmall, color = Color.White)
            Text(line2, style = MaterialTheme.typography.bodySmall, color = Color.White.copy(alpha = 0.85f))
        }
    }
}

@Composable
private fun SectionBlock(
    section: Section,
    state: ListUiState,
    freshSince: Long,
    onTick: (String) -> Unit,
    onSwipe: (String) -> Unit,
    onEdit: (String) -> Unit,
) {
    val shape = RoundedCornerShape(18.dp)
    Column {
        Text(
            section.title.uppercase(),
            style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold, letterSpacing = 0.6.sp),
            color = if (section.category == null) AppColors.OrangeDeep else AppColors.TextMuted,
            modifier = Modifier.padding(start = 4.dp, top = 6.dp, bottom = 6.dp),
        )
        Column(
            Modifier
                .fillMaxWidth()
                .shadow(1.dp, shape, ambientColor = CardShadow, spotColor = CardShadow)
                .clip(shape)
                .background(AppColors.Surface),
        ) {
            section.rows.forEachIndexed { index, entry ->
                if (index > 0) HorizontalDivider(color = AppColors.Divider, modifier = Modifier.padding(horizontal = 12.dp))
                EntryRow(
                    entry = entry,
                    item = state.items[entry.itemId],
                    flash = entry.addedAt > freshSince,
                    onTick = { onTick(entry.id) },
                    onSwipe = { onSwipe(entry.id) },
                    onEdit = { onEdit(entry.id) },
                )
            }
        }
    }
}

@Composable
private fun EmptyList() {
    Column(
        Modifier.fillMaxWidth().padding(top = 72.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("🧺", fontSize = 64.sp)
        Text(
            "Chưa có gì cần mua",
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(top = 12.dp),
        )
        Text(
            "Chọn món ở tab Chọn đồ rồi bấm Gửi.",
            style = MaterialTheme.typography.bodyMedium,
            color = AppColors.TextMuted,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(top = 4.dp),
        )
    }
}

@Composable
private fun FinishButton(onClick: () -> Unit, modifier: Modifier) {
    val shape = RoundedCornerShape(18.dp)
    Box(
        modifier
            .fillMaxWidth()
            .height(54.dp)
            .shadow(8.dp, shape, ambientColor = AppColors.GreenDark, spotColor = AppColors.GreenDark)
            .clip(shape)
            .background(AppColors.GreenDark)
            .clickable(onClick = onClick)
            .testTag("finish_button"),
        contentAlignment = Alignment.Center,
    ) {
        Text("Hoàn thành đi chợ 🛒", style = MaterialTheme.typography.titleSmall, color = Color.White)
    }
}

private val CardShadow = Color(0x1414281E)
