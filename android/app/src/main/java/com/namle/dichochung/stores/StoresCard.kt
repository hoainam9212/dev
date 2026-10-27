package com.namle.dichochung.stores

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
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
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.ui.common.SectionCard
import com.namle.dichochung.ui.theme.AppColors

/**
 * Thẻ "Siêu thị đã lưu" ở tab Nhà mình: mỗi dòng tên + "cách N m" (khi biết [here]) + menu ⋮ Đổi tên (sửa ngay trên dòng) / Xoá,
 * cuối thẻ là nút "📍 Lưu chỗ này là siêu thị".
 */
@Composable
fun StoresCard(
    stores: List<Store>,
    here: Pair<Double, Double>?,
    onAdd: () -> Unit,
    onRename: (id: String, name: String) -> Unit,
    onDelete: (id: String) -> Unit,
    modifier: Modifier = Modifier,
) {
    var renaming by rememberSaveable { mutableStateOf<String?>(null) }
    var deleting by rememberSaveable { mutableStateOf<String?>(null) }

    SectionCard(title = "Siêu thị đã lưu", modifier = modifier) {
        if (stores.isEmpty()) {
            Text(
                "Chưa lưu siêu thị nào. Đứng trong siêu thị rồi bấm nút dưới để app nhắc khi bạn tới đó.",
                style = MaterialTheme.typography.bodySmall,
                color = AppColors.TextMuted,
            )
        }
        stores.forEachIndexed { index, store ->
            if (index > 0) HorizontalDivider(color = AppColors.Divider, modifier = Modifier.padding(vertical = 4.dp))
            if (renaming == store.id) {
                RenameRow(
                    current = store.name,
                    onCancel = { renaming = null },
                    onSave = {
                        onRename(store.id, it)
                        renaming = null
                    },
                )
            } else {
                StoreRow(
                    store = store,
                    distance = here?.let { Geo.distanceLabel(Geo.distanceM(it.first, it.second, store.lat, store.lng)) },
                    onRename = { renaming = store.id },
                    onDelete = { deleting = store.id },
                )
            }
        }
        SaveStoreButton(onAdd, Modifier.padding(top = 6.dp))
    }

    stores.firstOrNull { it.id == deleting }?.let { store ->
        AlertDialog(
            onDismissRequest = { deleting = null },
            containerColor = AppColors.Surface,
            title = { Text("Xoá \"${store.name}\"?", style = MaterialTheme.typography.titleMedium) },
            text = {
                Text(
                    "Cả nhà sẽ không được nhắc khi tới siêu thị này nữa.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = AppColors.TextMuted,
                )
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        onDelete(store.id)
                        deleting = null
                    },
                    modifier = Modifier.testTag("store_delete_confirm"),
                ) { Text("Xoá", color = AppColors.Red, fontWeight = FontWeight.SemiBold) }
            },
            dismissButton = {
                TextButton(onClick = { deleting = null }) { Text("Huỷ", color = Color(0xFF56615B)) }
            },
        )
    }
}

/** Nút nhỏ dùng chung ở tab Nhà mình và cuối tab Cần mua. */
@Composable
fun SaveStoreButton(onClick: () -> Unit, modifier: Modifier = Modifier) {
    Text(
        "📍 Lưu chỗ này là siêu thị",
        style = MaterialTheme.typography.labelLarge,
        color = AppColors.Green,
        modifier = modifier
            .clip(CircleShape)
            .clickable(onClick = onClick)
            .testTag("save_store_button")
            .padding(horizontal = 8.dp, vertical = 10.dp),
    )
}

@Composable
private fun StoreRow(store: Store, distance: String?, onRename: () -> Unit, onDelete: () -> Unit) {
    var menu by rememberSaveable { mutableStateOf(false) }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(Modifier.size(40.dp).clip(CircleShape).background(AppColors.PastelOrange), contentAlignment = Alignment.Center) {
            Text("🏪", fontSize = 20.sp)
        }
        Column(Modifier.weight(1f).padding(start = 12.dp)) {
            Text(store.name, style = MaterialTheme.typography.titleSmall, maxLines = 1, overflow = TextOverflow.Ellipsis)
            if (distance != null) {
                Text(distance, style = MaterialTheme.typography.bodySmall, color = AppColors.TextMuted)
            }
        }
        Box {
            Box(
                Modifier.size(40.dp).clip(CircleShape).clickable { menu = true }.testTag("store_menu_${store.id}"),
                contentAlignment = Alignment.Center,
            ) {
                Text("⋮", fontSize = 20.sp, color = AppColors.TextMuted)
            }
            DropdownMenu(expanded = menu, onDismissRequest = { menu = false }, containerColor = AppColors.Surface) {
                DropdownMenuItem(text = { Text("Đổi tên") }, onClick = { menu = false; onRename() })
                DropdownMenuItem(text = { Text("Xoá", color = AppColors.Red) }, onClick = { menu = false; onDelete() })
            }
        }
    }
}

/**
 * Đổi tên ngay trên dòng (không dùng hộp thoại): gọn trên điện thoại, và ô nhập trong AlertDialog làm test
 * Robolectric không bao giờ "idle" (CI run #21–#27, LEDGER Task 8).
 */
@Composable
private fun RenameRow(current: String, onCancel: () -> Unit, onSave: (String) -> Unit) {
    var name by rememberSaveable { mutableStateOf(current) }
    Column {
        OutlinedTextField(
            value = name,
            onValueChange = { name = it.take(Store.MAX_NAME) },
            label = { Text("Tên siêu thị") },
            singleLine = true,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            modifier = Modifier.fillMaxWidth().testTag("store_rename_field"),
        )
        Row(Modifier.align(Alignment.End)) {
            TextButton(onClick = onCancel) { Text("Huỷ", color = Color(0xFF56615B)) }
            TextButton(
                onClick = { onSave(name.trim()) },
                enabled = name.isNotBlank(),
                modifier = Modifier.testTag("store_rename_save"),
            ) { Text("Lưu", color = AppColors.Green, fontWeight = FontWeight.SemiBold) }
        }
    }
}
