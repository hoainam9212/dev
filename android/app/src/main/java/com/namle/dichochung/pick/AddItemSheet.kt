package com.namle.dichochung.pick

import android.graphics.BitmapFactory
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.ui.common.ItemImage
import com.namle.dichochung.ui.theme.AppColors

/** Bảng nổi thêm / sửa món (spec 4.2) + hộp thoại "Đã có X rồi" khi món mới trùng món có sẵn. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ItemSheet(
    editor: ItemEditor,
    onDraft: (ItemDraft) -> Unit,
    onCamera: () -> Unit,
    onGallery: () -> Unit,
    onSave: () -> Unit,
    onDelete: () -> Unit,
    onUseExisting: () -> Unit,
    onAddAnyway: () -> Unit,
    onDismissDuplicate: () -> Unit,
    onDismiss: () -> Unit,
) {
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
        containerColor = AppColors.Surface,
    ) {
        ItemSheetContent(
            draft = editor.draft,
            photo = editor.photo,
            isNew = editor.draft.isNew,
            saving = editor.busy,
            onDraft = onDraft,
            onCamera = onCamera,
            onGallery = onGallery,
            onSave = onSave,
            onDelete = onDelete,
        )
    }
    editor.duplicate?.let { existing ->
        DuplicateDialog(existing, onUseExisting = onUseExisting, onAddAnyway = onAddAnyway, onDismiss = onDismissDuplicate)
    }
}

/** Nội dung bảng: ảnh (📷 Chụp / 🖼️ Thư viện), tên, nhóm, đơn vị, số lượng mặc định, bước +/−; món đang sửa có "Xoá món". */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ItemSheetContent(
    draft: ItemDraft,
    photo: ByteArray?,
    isNew: Boolean,
    saving: Boolean,
    onDraft: (ItemDraft) -> Unit,
    onCamera: () -> Unit,
    onGallery: () -> Unit,
    onSave: () -> Unit,
    onDelete: () -> Unit,
    modifier: Modifier = Modifier,
) {
    var confirmDelete by rememberSaveable { mutableStateOf(false) }
    Column(
        modifier
            .fillMaxWidth()
            .background(AppColors.Surface)
            .verticalScroll(rememberScrollState())
            .padding(start = 20.dp, end = 20.dp, bottom = 20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text(if (isNew) "Thêm món mới" else "Sửa món", style = MaterialTheme.typography.titleMedium)

        Row(verticalAlignment = Alignment.CenterVertically) {
            PhotoPreview(draft, photo)
            Column(Modifier.padding(start = 14.dp).weight(1f), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                PhotoButton("📷 Chụp ảnh", "photo_camera", onCamera)
                PhotoButton("🖼️ Thư viện", "photo_gallery", onGallery)
            }
        }

        OutlinedTextField(
            value = draft.name,
            onValueChange = { onDraft(draft.copy(name = it.take(ItemDraft.MAX_NAME))) },
            label = { Text("Tên món") },
            singleLine = true,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            modifier = Modifier.fillMaxWidth().testTag("item_name_field"),
        )

        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            FieldLabel("Nhóm")
            FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Category.entries.forEach { c ->
                    CategoryChip(c, c == draft.category) { onDraft(draft.withCategory(c)) }
                }
            }
        }

        Row(horizontalArrangement = Arrangement.spacedBy(10.dp), verticalAlignment = Alignment.Bottom) {
            OutlinedTextField(
                value = draft.unit,
                onValueChange = { onDraft(draft.copy(unit = it.take(ItemDraft.MAX_UNIT))) },
                label = { Text("Đơn vị") },
                singleLine = true,
                modifier = Modifier.weight(1f).testTag("item_unit_field"),
            )
            QtyField("Mặc định", draft.defaultQty, "default_qty", Modifier.weight(1f)) { onDraft(draft.withDefaultQty(it)) }
            QtyField("Mỗi lần +", draft.step, "step_qty", Modifier.weight(1f)) { onDraft(draft.withStep(it)) }
        }

        Row(Modifier.padding(top = 4.dp), verticalAlignment = Alignment.CenterVertically) {
            if (!isNew) {
                TextButton(onClick = { confirmDelete = true }, modifier = Modifier.testTag("delete_item")) {
                    Text("Xoá món", style = MaterialTheme.typography.labelLarge, color = AppColors.Red)
                }
            }
            Button(
                onClick = onSave,
                enabled = draft.isValid && !saving,
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(containerColor = AppColors.Green),
                modifier = Modifier.padding(start = if (isNew) 0.dp else 8.dp).weight(1f).height(48.dp).testTag("item_save"),
            ) {
                Text(if (isNew) "Thêm" else "Lưu", style = MaterialTheme.typography.labelLarge)
            }
        }
    }

    if (confirmDelete) {
        DeleteConfirmDialog(
            name = draft.base?.name ?: draft.name,
            onConfirm = {
                confirmDelete = false
                onDelete()
            },
            onDismiss = { confirmDelete = false },
        )
    }
}

/** "Đã có **X** rồi, dùng món này nhé?" — [Dùng món có sẵn] [Vẫn thêm mới]. */
@Composable
fun DuplicateDialog(existing: Item, onUseExisting: () -> Unit, onAddAnyway: () -> Unit, onDismiss: () -> Unit = {}) {
    AlertDialog(
        onDismissRequest = onDismiss,
        containerColor = AppColors.Surface,
        icon = { ItemImage(existing, 56.dp) },
        title = {
            Text(
                "Đã có ${existing.name} rồi, dùng món này nhé?",
                style = MaterialTheme.typography.titleMedium,
                textAlign = TextAlign.Center,
            )
        },
        confirmButton = {
            TextButton(onClick = onUseExisting, modifier = Modifier.testTag("use_existing")) {
                Text("Dùng món có sẵn", color = AppColors.Green, fontWeight = FontWeight.SemiBold)
            }
        },
        dismissButton = {
            TextButton(onClick = onAddAnyway, modifier = Modifier.testTag("add_anyway")) {
                Text("Vẫn thêm mới", color = Color(0xFF56615B))
            }
        },
    )
}

@Composable
private fun PhotoPreview(draft: ItemDraft, photo: ByteArray?) {
    val bitmap = remember(photo) { photo?.let { BitmapFactory.decodeByteArray(it, 0, it.size)?.asImageBitmap() } }
    if (bitmap != null) {
        Image(
            bitmap,
            contentDescription = draft.name,
            contentScale = ContentScale.Crop,
            modifier = Modifier.size(PhotoSize).clip(RoundedCornerShape(18.dp)).testTag("photo_preview"),
        )
    } else {
        // Chưa có ảnh: món đang sửa giữ ảnh / icon cũ, món mới hiện emoji của nhóm (đổi theo nhóm đang chọn).
        ItemImage(draft.toItem(PREVIEW_ID), PhotoSize)
    }
}

@Composable
private fun PhotoButton(label: String, tag: String, onClick: () -> Unit) {
    OutlinedButton(
        onClick = onClick,
        shape = RoundedCornerShape(12.dp),
        modifier = Modifier.fillMaxWidth().height(40.dp).testTag(tag),
    ) {
        Text(label, style = MaterialTheme.typography.labelLarge, color = AppColors.Text)
    }
}

@Composable
private fun FieldLabel(text: String) {
    Text(text, style = MaterialTheme.typography.labelMedium, color = AppColors.TextMuted)
}

@Composable
private fun CategoryChip(category: Category, on: Boolean, onClick: () -> Unit) {
    Text(
        "${category.emoji} ${category.vi}",
        style = MaterialTheme.typography.labelMedium.copy(fontSize = 12.5.sp),
        color = if (on) Color.White else Color(0xFF56615B),
        maxLines = 1,
        modifier = Modifier
            .clip(CircleShape)
            .background(if (on) AppColors.Green else AppColors.Background)
            .clickable(onClick = onClick)
            .testTag("form_cat_${category.key}")
            .padding(horizontal = 11.dp, vertical = 7.dp),
    )
}

/** Ô số nhỏ có [−] n [+], cùng chiều cao với ô nhập đơn vị bên cạnh. */
@Composable
private fun QtyField(label: String, value: Int, tag: String, modifier: Modifier, onChange: (Int) -> Unit) {
    Column(modifier, verticalArrangement = Arrangement.spacedBy(4.dp)) {
        FieldLabel(label)
        Row(
            Modifier
                .fillMaxWidth()
                .height(48.dp)
                .clip(RoundedCornerShape(12.dp))
                .border(1.dp, Color(0xFFCDD3CF), RoundedCornerShape(12.dp))
                .testTag(tag),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            QtyButton("−", "${tag}_minus") { onChange(value - 1) }
            Text(
                value.toString(),
                style = MaterialTheme.typography.titleSmall,
                textAlign = TextAlign.Center,
                modifier = Modifier.weight(1f),
            )
            QtyButton("+", "${tag}_plus") { onChange(value + 1) }
        }
    }
}

@Composable
private fun QtyButton(symbol: String, tag: String, onClick: () -> Unit) {
    Box(
        Modifier.size(32.dp).clip(CircleShape).clickable(onClick = onClick).testTag(tag),
        contentAlignment = Alignment.Center,
    ) {
        Text(symbol, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = AppColors.Green)
    }
}

private val PhotoSize = 88.dp
private const val PREVIEW_ID = "preview"
