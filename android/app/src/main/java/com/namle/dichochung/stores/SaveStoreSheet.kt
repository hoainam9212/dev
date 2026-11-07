package com.namle.dichochung.stores

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.RadioButton
import androidx.compose.material3.RadioButtonDefaults
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
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.namle.dichochung.ui.theme.AppColors

/** Bảng "Lưu chỗ này là siêu thị": đang lấy vị trí ([candidates] null) hoặc chọn chỗ / tự nhập tên. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SaveStoreSheet(
    candidates: List<StoreCandidate>?,
    saving: Boolean,
    onSave: (StoreCandidate?, String) -> Unit,
    onDismiss: () -> Unit,
) {
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
        containerColor = AppColors.Surface,
    ) {
        if (candidates == null) Locating() else SaveStoreContent(candidates, saving, onSave)
    }
}

@Composable
private fun Locating() {
    Row(
        Modifier.fillMaxWidth().padding(start = 20.dp, end = 20.dp, top = 8.dp, bottom = 36.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        CircularProgressIndicator(Modifier.size(22.dp), color = AppColors.Green, strokeWidth = 2.5.dp)
        Text(
            "Đang tìm siêu thị quanh bạn…",
            style = MaterialTheme.typography.bodyLarge,
            modifier = Modifier.padding(start = 14.dp),
        )
    }
}

/**
 * Danh sách chỗ trên OpenStreetMap gần nhất trước (chọn sẵn chỗ đầu) + "✏️ Tự nhập tên khác". Không có chỗ nào
 * (mất mạng, chưa có trên bản đồ) thì chỉ còn ô tên để trống: không lấy địa chỉ làm tên siêu thị.
 */
@Composable
fun SaveStoreContent(
    candidates: List<StoreCandidate>,
    saving: Boolean,
    onSave: (StoreCandidate?, String) -> Unit,
    modifier: Modifier = Modifier,
) {
    // -1 = tự nhập tên.
    var selected by rememberSaveable(candidates) { mutableIntStateOf(if (candidates.isEmpty()) CUSTOM else 0) }
    var customName by rememberSaveable { mutableStateOf("") }
    val chosen = candidates.getOrNull(selected)
    val name = chosen?.label ?: customName.trim()

    Column(
        modifier
            .fillMaxWidth()
            .background(AppColors.Surface)
            .verticalScroll(rememberScrollState())
            .padding(start = 20.dp, end = 20.dp, bottom = 20.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text("Bạn đang ở đâu?", style = MaterialTheme.typography.titleMedium)
        Text(
            if (candidates.isEmpty()) {
                "Không tìm thấy siêu thị trên bản đồ quanh đây. Nhập tên siêu thị nhé."
            } else {
                "Chọn siêu thị bạn đang đứng; app sẽ nhắc khi bạn tới đây mà nhà còn món cần mua."
            },
            style = MaterialTheme.typography.bodySmall,
            color = AppColors.TextMuted,
        )

        candidates.forEachIndexed { index, c ->
            if (index > 0) HorizontalDivider(color = AppColors.Divider)
            ChoiceRow(selected == index, "candidate_$index", { selected = index }) {
                Text(c.label, style = MaterialTheme.typography.titleSmall, maxLines = 1, overflow = TextOverflow.Ellipsis)
                Text(Geo.distanceLabel(c.distanceM), style = MaterialTheme.typography.bodySmall, color = AppColors.TextMuted)
            }
        }
        if (candidates.isNotEmpty()) {
            HorizontalDivider(color = AppColors.Divider)
            ChoiceRow(selected == CUSTOM, "candidate_custom", { selected = CUSTOM }) {
                Text("✏️ Tự nhập tên khác", style = MaterialTheme.typography.titleSmall)
            }
        }
        if (selected == CUSTOM) {
            OutlinedTextField(
                value = customName,
                onValueChange = { customName = it.take(Store.MAX_NAME) },
                label = { Text("Tên siêu thị") },
                singleLine = true,
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                modifier = Modifier.fillMaxWidth().testTag("store_name_field"),
            )
        }

        Button(
            onClick = { onSave(chosen, name) },
            enabled = name.isNotEmpty() && !saving,
            shape = RoundedCornerShape(14.dp),
            colors = ButtonDefaults.buttonColors(containerColor = AppColors.Green),
            modifier = Modifier.padding(top = 8.dp).fillMaxWidth().height(48.dp).testTag("save_store_confirm"),
        ) {
            Text("Lưu siêu thị", style = MaterialTheme.typography.labelLarge)
        }
    }
}

@Composable
private fun ChoiceRow(selected: Boolean, tag: String, onClick: () -> Unit, content: @Composable () -> Unit) {
    Row(
        Modifier
            .fillMaxWidth()
            .heightIn(min = 52.dp)
            .clip(RoundedCornerShape(10.dp))
            .clickable(onClick = onClick)
            .testTag(tag),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        RadioButton(selected = selected, onClick = onClick, colors = RadioButtonDefaults.colors(selectedColor = AppColors.Green))
        Column(Modifier.weight(1f).padding(start = 4.dp)) { content() }
    }
}

private const val CUSTOM = -1
