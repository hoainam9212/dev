package com.namle.dichochung.home

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.ui.common.SectionCard
import com.namle.dichochung.ui.theme.AppColors

/** Trạng thái 4 quyền cần để báo khi tới siêu thị; [battery] = app được miễn tối ưu pin. */
data class PermissionsState(
    val notifications: Boolean,
    val location: Boolean,
    val backgroundLocation: Boolean,
    val battery: Boolean,
) {
    val allGood: Boolean get() = notifications && location && backgroundLocation && battery
}

/**
 * Thẻ "Quyền & pin" ở tab Nhà mình: mỗi dòng ✅ / ⚠️ + nút sửa khi thiếu. Máy Samsung hay "cho ngủ" app chạy nền
 * nên dòng pin có hướng dẫn cụ thể từng bước.
 */
@Composable
fun PermissionsCard(
    state: PermissionsState,
    onNotifications: () -> Unit,
    onLocation: () -> Unit,
    onBackgroundLocation: () -> Unit,
    onBattery: () -> Unit,
    modifier: Modifier = Modifier,
) {
    SectionCard(title = "Quyền & pin", modifier = modifier) {
        if (state.allGood) {
            Text(
                "Đã sẵn sàng báo khi tới siêu thị.",
                style = MaterialTheme.typography.bodySmall,
                color = AppColors.TextMuted,
                modifier = Modifier.padding(bottom = 8.dp),
            )
        }
        PermissionRow(
            ok = state.notifications,
            key = "notifications",
            title = "Thông báo",
            hint = "Để nhận \"Đang ở siêu thị\" và tin từ người nhà.",
            action = "Cho phép",
            onFix = onNotifications,
        )
        Divider()
        PermissionRow(
            ok = state.location,
            key = "location",
            title = "Vị trí khi dùng app",
            hint = "Để lưu siêu thị bạn đang đứng.",
            action = "Cho phép",
            onFix = onLocation,
        )
        Divider()
        PermissionRow(
            ok = state.backgroundLocation,
            key = "background",
            title = "Vị trí \"Luôn cho phép\"",
            hint = "Để biết bạn tới siêu thị cả khi không mở app. Mở Cài đặt → Quyền → Vị trí → Luôn cho phép.",
            action = "Mở cài đặt",
            onFix = onBackgroundLocation,
        )
        Divider()
        PermissionRow(
            ok = state.battery,
            key = "battery",
            title = "Pin (máy Samsung)",
            hint = "Pin → Không hạn chế. Rồi Cài đặt → Chăm sóc pin → Giới hạn sử dụng ở chế độ nền → " +
                "Ứng dụng không bao giờ ngủ → thêm Đi Chợ Chung.",
            action = "Mở cài đặt",
            onFix = onBattery,
        )
    }
}

@Composable
private fun Divider() {
    HorizontalDivider(color = AppColors.Divider, modifier = Modifier.padding(vertical = 8.dp))
}

@Composable
private fun PermissionRow(ok: Boolean, key: String, title: String, hint: String, action: String, onFix: () -> Unit) {
    Row(verticalAlignment = Alignment.Top) {
        Text(
            if (ok) "✅" else "⚠️",
            fontSize = 18.sp,
            modifier = Modifier.padding(top = 1.dp).testTag(if (ok) "perm_ok_$key" else "perm_warn_$key"),
        )
        Column(Modifier.weight(1f).padding(start = 10.dp)) {
            Text(title, style = MaterialTheme.typography.titleSmall)
            if (!ok) {
                Text(hint, style = MaterialTheme.typography.bodySmall, color = AppColors.TextMuted)
            }
        }
        if (!ok) {
            Text(
                action,
                style = MaterialTheme.typography.labelMedium,
                color = AppColors.Green,
                maxLines = 1,
                modifier = Modifier
                    .padding(start = 8.dp)
                    .clip(CircleShape)
                    .background(AppColors.PastelGreen)
                    .clickable(onClick = onFix)
                    .testTag("perm_fix_$key")
                    .padding(horizontal = 12.dp, vertical = 7.dp),
            )
        }
    }
}
