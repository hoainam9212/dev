package com.namle.dichochung.stores

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.lifecycle.compose.collectAsStateWithLifecycle

/**
 * Luồng "📍 Lưu chỗ này là siêu thị" dùng chung cho tab Nhà mình và tab Cần mua: trả về hàm bắt đầu
 * (xin quyền vị trí lúc dùng nếu chưa có → lấy vị trí → bảng chọn) và tự vẽ [SaveStoreSheet] khi đang lưu.
 */
@Composable
fun rememberStoreSaver(vm: StoresViewModel): () -> Unit {
    val permission = rememberLauncherForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { result ->
        if (result.values.any { it }) vm.locate() else vm.permissionDenied()
    }
    val state by vm.save.collectAsStateWithLifecycle()
    // Một bảng duy nhất từ lúc tìm vị trí tới lúc chọn, để không đóng / mở lại giữa chừng.
    if (state != SaveStoreState.Idle) {
        val choosing = state as? SaveStoreState.Choosing
        SaveStoreSheet(
            candidates = choosing?.candidates,
            saving = false,
            onSave = vm::save,
            onDismiss = vm::dismiss,
        )
    }
    return remember(vm) {
        { if (vm.hasPermission()) vm.locate() else permission.launch(LocationProvider.PERMISSIONS) }
    }
}
