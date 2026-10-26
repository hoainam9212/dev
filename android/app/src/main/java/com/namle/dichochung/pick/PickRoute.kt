package com.namle.dichochung.pick

import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import java.time.LocalDate

/** Nối [PickViewModel] với [PickScreen]: trạng thái, snackbar "Đã gửi…", dòng "Đi Chợ Chung · <thứ>", nhãn nút gửi theo [recipients]. */
@Composable
fun PickRoute(vm: PickViewModel, roleLabel: String, roleEmoji: String, recipients: List<String>, modifier: Modifier = Modifier) {
    val state by vm.state.collectAsStateWithLifecycle()
    val snackbar = remember { SnackbarHostState() }
    LaunchedEffect(vm) { vm.messages.collect { snackbar.showSnackbar(it) } }
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
        snackbar = snackbar,
    )
}
