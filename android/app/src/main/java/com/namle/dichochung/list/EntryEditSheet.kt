package com.namle.dichochung.list

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.data.ListEntry
import com.namle.dichochung.pick.PickLabels
import com.namle.dichochung.ui.common.ItemImage
import com.namle.dichochung.ui.theme.AppColors

/** Chạm tên một dòng → bảng nhỏ sửa số lượng + ghi chú ngắn (ví dụ "lấy bó non"); ai trong nhà cũng sửa được. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EntryEditSheet(item: Item, entry: ListEntry, onSave: (qty: Int, note: String) -> Unit, onDismiss: () -> Unit) {
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
        containerColor = AppColors.Surface,
    ) {
        EntryEditContent(item, entry, onSave)
    }
}

@Composable
fun EntryEditContent(item: Item, entry: ListEntry, onSave: (qty: Int, note: String) -> Unit, modifier: Modifier = Modifier) {
    var qty by rememberSaveable(entry.id) { mutableIntStateOf(entry.qty) }
    var note by rememberSaveable(entry.id) { mutableStateOf(entry.note) }
    val step = item.step.coerceAtLeast(1)

    Column(
        modifier.fillMaxWidth().background(AppColors.Surface).padding(start = 20.dp, end = 20.dp, bottom = 20.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            ItemImage(item, 48.dp)
            Text(item.name, style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(start = 12.dp))
        }

        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Số lượng", style = MaterialTheme.typography.labelLarge, color = AppColors.TextMuted, modifier = Modifier.weight(1f))
            RoundButton("−", "edit_minus") { qty = (qty - step).coerceAtLeast(1) }
            Text(
                PickLabels.qty(qty, entry.unit),
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                color = AppColors.Green,
                textAlign = TextAlign.Center,
                maxLines = 1,
                modifier = Modifier.padding(horizontal = 12.dp).testTag("edit_qty"),
            )
            RoundButton("+", "edit_plus") { qty += step }
        }

        OutlinedTextField(
            value = note,
            onValueChange = { note = it.take(ListUpdates.MAX_NOTE) },
            label = { Text("Ghi chú (ví dụ: lấy bó non)") },
            singleLine = true,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            modifier = Modifier.fillMaxWidth().testTag("edit_note"),
        )

        Button(
            onClick = { onSave(qty, note) },
            shape = RoundedCornerShape(14.dp),
            colors = ButtonDefaults.buttonColors(containerColor = AppColors.Green),
            modifier = Modifier.fillMaxWidth().height(48.dp).testTag("edit_save"),
        ) {
            Text("Lưu", style = MaterialTheme.typography.labelLarge)
        }
    }
}

@Composable
private fun RoundButton(symbol: String, tag: String, onClick: () -> Unit) {
    Box(
        Modifier.size(38.dp).clip(CircleShape).background(AppColors.PastelGreen).clickable(onClick = onClick).testTag(tag),
        contentAlignment = Alignment.Center,
    ) {
        Text(symbol, fontSize = 20.sp, fontWeight = FontWeight.Bold, color = AppColors.Green)
    }
}
