package com.namle.dichochung.list

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.animate
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.draggable
import androidx.compose.foundation.gestures.rememberDraggableState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.data.EntryState
import com.namle.dichochung.data.ListEntry
import com.namle.dichochung.pick.PickLabels
import com.namle.dichochung.ui.common.ItemImage
import com.namle.dichochung.ui.theme.AppColors
import kotlin.math.roundToInt

/**
 * Một dòng Cần mua: ảnh 40 dp, tên (+ ghi chú, nhãn hết hàng), ô số lượng xanh, ô tick 28 dp.
 * Chạm tên = sửa ([onEdit]); vuốt trái quá [SwipeThreshold] = hết hàng / còn hàng ([onSwipe], dòng trượt về chỗ cũ).
 * [flash] = dòng người kia vừa thêm khi đang mở màn: viền xanh nhấp nháy một lần.
 */
@Composable
fun EntryRow(
    entry: ListEntry,
    item: Item?,
    flash: Boolean,
    onTick: () -> Unit,
    onSwipe: () -> Unit,
    onEdit: () -> Unit,
) {
    val picked = entry.state == EntryState.PICKED
    val outOfStock = entry.state == EntryState.OUT_OF_STOCK
    val shown = item ?: Item(entry.itemId, "Món đã xoá", category = Category.KHAC, unit = entry.unit)
    val threshold = with(LocalDensity.current) { SwipeThreshold.toPx() }
    var offset by remember { mutableFloatStateOf(0f) }
    val flashAlpha = remember(entry.id) { Animatable(if (flash) 1f else 0f) }
    LaunchedEffect(entry.id, flash) {
        if (flash) flashAlpha.animateTo(0f, tween(durationMillis = 1600))
    }

    Box(Modifier.fillMaxWidth().testTag("entry_${entry.id}")) {
        // Nền lộ ra khi vuốt: cam "Hết hàng" (hoặc xanh "Còn hàng" khi dòng đang hết hàng).
        Box(
            Modifier.matchParentSize().background(if (outOfStock) AppColors.PastelGreen else AppColors.PastelOrange),
            contentAlignment = Alignment.CenterEnd,
        ) {
            Text(
                if (outOfStock) "Còn hàng" else "Hết hàng",
                style = MaterialTheme.typography.labelLarge,
                color = if (outOfStock) AppColors.Green else AppColors.OrangeDeep,
                modifier = Modifier.padding(end = 18.dp),
            )
        }
        Row(
            Modifier
                .offset { IntOffset(offset.roundToInt(), 0) }
                .fillMaxWidth()
                .background(AppColors.Surface)
                .border(2.dp, AppColors.Green.copy(alpha = flashAlpha.value), RoundedCornerShape(12.dp))
                .draggable(
                    state = rememberDraggableState { delta -> offset = (offset + delta).coerceIn(-threshold * 1.5f, 0f) },
                    orientation = Orientation.Horizontal,
                    onDragStopped = {
                        if (offset <= -threshold) onSwipe()
                        animate(offset, 0f) { value, _ -> offset = value }
                    },
                )
                .padding(horizontal = 12.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Row(
                Modifier.weight(1f).alpha(if (picked) 0.5f else 1f),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                ItemImage(shown, 40.dp)
                Column(
                    Modifier
                        .weight(1f)
                        .padding(start = 12.dp, end = 8.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .clickable(onClick = onEdit)
                        .testTag("entry_name_${entry.id}"),
                ) {
                    Text(
                        shown.name,
                        style = MaterialTheme.typography.titleSmall.copy(
                            textDecoration = if (picked) TextDecoration.LineThrough else TextDecoration.None,
                        ),
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                    )
                    if (entry.note.isNotBlank()) {
                        Text(
                            entry.note,
                            style = MaterialTheme.typography.bodySmall,
                            color = AppColors.TextMuted,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis,
                        )
                    }
                    if (outOfStock) {
                        Text(
                            ListLabels.outOfStock(entry.outOfStockStore),
                            style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.SemiBold),
                            color = AppColors.OrangeDeep,
                            maxLines = 1,
                            modifier = Modifier
                                .padding(top = 3.dp)
                                .clip(RoundedCornerShape(6.dp))
                                .background(AppColors.PastelOrange)
                                .padding(horizontal = 6.dp, vertical = 2.dp),
                        )
                    }
                }
                Text(
                    PickLabels.qty(entry.qty, entry.unit),
                    style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
                    color = if (picked) AppColors.TextFaint else AppColors.Green,
                    maxLines = 1,
                    softWrap = false,
                    modifier = Modifier
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (picked) AppColors.Divider else AppColors.PastelGreen)
                        .padding(horizontal = 10.dp, vertical = 6.dp),
                )
            }
            TickBox(picked, Modifier.padding(start = 10.dp).testTag("tick_${entry.id}"), onTick)
        }
    }
}

@Composable
private fun TickBox(checked: Boolean, modifier: Modifier, onClick: () -> Unit) {
    val shape = RoundedCornerShape(8.dp)
    Box(
        modifier
            .size(28.dp)
            .clip(shape)
            .background(if (checked) AppColors.Green.copy(alpha = 0.55f) else AppColors.Surface)
            .border(2.dp, if (checked) Color.Transparent else Color(0xFFD5DAD7), shape)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center,
    ) {
        if (checked) Text("✓", color = Color.White, fontSize = 16.sp, fontWeight = FontWeight.Bold)
    }
}

private val SwipeThreshold = 72.dp
