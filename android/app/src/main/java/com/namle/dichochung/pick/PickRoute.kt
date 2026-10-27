package com.namle.dichochung.pick

import android.content.Context
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.FileProvider
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.namle.dichochung.data.PhotoProcessor
import java.io.File
import java.time.LocalDate

/**
 * Nối [PickViewModel] với [PickScreen]: trạng thái, snackbar "Đã gửi…", dòng "Đi Chợ Chung · <thứ>", nhãn nút gửi theo
 * [recipients]; bảng thêm / sửa món với ảnh chụp bằng camera (qua FileProvider, không cần quyền camera) hoặc thư viện.
 */
@Composable
fun PickRoute(vm: PickViewModel, roleLabel: String, roleEmoji: String, recipients: List<String>, modifier: Modifier = Modifier) {
    val state by vm.state.collectAsStateWithLifecycle()
    val editor by vm.editor.collectAsStateWithLifecycle()
    val snackbar = remember { SnackbarHostState() }
    val context = LocalContext.current
    LaunchedEffect(vm) { vm.messages.collect { snackbar.showSnackbar(it) } }

    val captureUri = remember { cameraUri(context) }
    val camera = rememberLauncherForActivityResult(ActivityResultContracts.TakePicture()) { ok ->
        if (ok) vm.loadPhoto { PhotoProcessor.fromUri(context.contentResolver, captureUri) }
    }
    val gallery = rememberLauncherForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
        if (uri != null) vm.loadPhoto { PhotoProcessor.fromUri(context.contentResolver, uri) }
    }

    PickScreen(
        state = state,
        caption = "Đi Chợ Chung · ${PickLabels.weekday(LocalDate.now().dayOfWeek)}",
        sendLabel = PickLabels.sendButton(recipients),
        roleLabel = roleLabel,
        roleEmoji = roleEmoji,
        onQuery = vm::setQuery,
        onCategory = vm::setCategory,
        onTap = vm::tap,
        onPlus = vm::plus,
        onMinus = vm::minus,
        onSend = { vm.send(recipients) },
        modifier = modifier,
        onAdd = vm::startAdd,
        onEdit = vm::startEdit,
        snackbar = snackbar,
    )

    editor?.let { current ->
        ItemSheet(
            editor = current,
            onDraft = vm::updateDraft,
            onCamera = { camera.launch(captureUri) },
            onGallery = { gallery.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)) },
            onSave = { vm.save() },
            onDelete = vm::deleteEdited,
            onUseExisting = vm::useExisting,
            onAddAnyway = { vm.save(force = true) },
            onDismissDuplicate = vm::dismissDuplicate,
            onDismiss = vm::closeEditor,
        )
    }
}

/** Một file tạm cố định trong cache cho ảnh camera; ảnh đã cắt vuông mới là thứ được tải lên. */
private fun cameraUri(context: Context): Uri {
    val file = File(context.cacheDir, "photos/capture.jpg").apply { parentFile?.mkdirs() }
    return FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)
}
