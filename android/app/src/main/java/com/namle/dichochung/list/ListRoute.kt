package com.namle.dichochung.list

import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import java.time.ZoneId

/** Nối [ListViewModel] với [ListScreen]; [names] = uid → tên hiển thị trong nhà cho dòng "Vợ gửi lúc …". */
@Composable
fun ListRoute(
    vm: ListViewModel,
    roleLabel: String,
    roleEmoji: String,
    names: Map<String, String>,
    modifier: Modifier = Modifier,
    onSaveStore: (() -> Unit)? = null,
) {
    val state by vm.state.collectAsStateWithLifecycle()
    val editing by vm.editing.collectAsStateWithLifecycle()
    val snackbar = remember { SnackbarHostState() }
    // Mốc mở màn: dòng thêm sau mốc này (từ máy khác) nhấp nháy viền một lần.
    val openedAt = remember { System.currentTimeMillis() }
    LaunchedEffect(vm) { vm.messages.collect { snackbar.showSnackbar(it) } }

    ListScreen(
        state = state,
        caption = ListLabels.caption(state.entries, names, ZoneId.systemDefault()),
        roleLabel = roleLabel,
        roleEmoji = roleEmoji,
        onTick = vm::toggleTick,
        onSwipe = vm::swipe,
        onEdit = vm::startEdit,
        onFinish = vm::finish,
        modifier = modifier,
        freshSince = openedAt,
        onSaveStore = onSaveStore,
        snackbar = snackbar,
    )

    val entry = editing?.let { id -> state.entries.firstOrNull { it.id == id } }
    val item = entry?.let { state.items[it.itemId] }
    if (entry != null && item != null) {
        EntryEditSheet(item = item, entry = entry, onSave = vm::saveEdit, onDismiss = vm::closeEdit)
    }
}
