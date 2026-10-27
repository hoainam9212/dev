package com.namle.dichochung.pick

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import com.namle.dichochung.ui.theme.AppColors

/**
 * Hỏi lại trước khi xoá món (bảng sửa món mở bằng nhấn giữ thẻ, xem [ItemSheet]). Món kho gốc chỉ ẩn đi,
 * món nhà tự thêm thì xoá hẳn cùng ảnh; dòng đã có trong danh sách Cần mua vẫn giữ nguyên.
 */
@Composable
fun DeleteConfirmDialog(name: String, onConfirm: () -> Unit, onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        containerColor = AppColors.Surface,
        title = { Text("Xoá \"$name\"?", style = MaterialTheme.typography.titleMedium) },
        text = {
            Text(
                "Món sẽ không hiện trong lưới chọn đồ nữa, trên máy cả nhà.",
                style = MaterialTheme.typography.bodyMedium,
                color = AppColors.TextMuted,
            )
        },
        confirmButton = {
            TextButton(onClick = onConfirm, modifier = Modifier.testTag("delete_confirm")) {
                Text("Xoá", color = AppColors.Red, fontWeight = FontWeight.SemiBold)
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Huỷ", color = Color(0xFF56615B)) }
        },
    )
}
