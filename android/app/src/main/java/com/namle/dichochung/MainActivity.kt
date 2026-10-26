package com.namle.dichochung

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.codescanner.GmsBarcodeScannerOptions
import com.google.mlkit.vision.codescanner.GmsBarcodeScanning
import com.namle.dichochung.data.Role
import com.namle.dichochung.home.HomeScreen
import com.namle.dichochung.home.HomeViewModel
import com.namle.dichochung.home.OnboardingScreen
import com.namle.dichochung.ui.MainScaffold
import com.namle.dichochung.ui.Tab
import com.namle.dichochung.ui.theme.AppColors
import com.namle.dichochung.ui.theme.DiChoTheme

class MainActivity : ComponentActivity() {

    private var requestedTab by mutableStateOf<Tab?>(null)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        requestedTab = tabFrom(intent)
        val container = (application as App).container
        setContent {
            DiChoTheme {
                val vm: HomeViewModel = viewModel(factory = HomeViewModel.factory(container.homeRepository))
                val homeId by vm.homeId.collectAsStateWithLifecycle()
                val home by vm.home.collectAsStateWithLifecycle()
                val ui by vm.ui.collectAsStateWithLifecycle()
                val now by vm.now.collectAsStateWithLifecycle()
                val myUid = vm.myUid
                val currentHome = home

                when {
                    // Máy chưa thuộc nhà nào (hoặc vừa bị gỡ khỏi nhà) → tạo nhà / nhập mã.
                    homeId == null -> OnboardingScreen(
                        busy = ui.busy,
                        error = ui.error,
                        onCreate = vm::create,
                        onJoin = vm::join,
                        onScan = { role -> scanInvite(vm, role) },
                    )
                    currentHome == null || myUid == null -> Waiting()
                    else -> {
                        var tab by rememberSaveable { mutableStateOf(requestedTab ?: Tab.PICK) }
                        requestedTab?.let { tab = it; requestedTab = null }
                        MainScaffold(selected = tab, onSelect = { tab = it }, listBadge = 0) { padding ->
                            val content = Modifier.fillMaxSize().padding(padding)
                            when (tab) {
                                Tab.HOME -> HomeScreen(
                                    home = currentHome,
                                    myUid = myUid,
                                    invite = ui.invite,
                                    now = now,
                                    onInvite = vm::invite,
                                    onCloseInvite = vm::closeInvite,
                                    onRename = vm::rename,
                                    modifier = content,
                                )
                                else -> Box(content, contentAlignment = Alignment.Center) { Text(tab.label) }
                            }
                        }
                    }
                }
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        requestedTab = tabFrom(intent)
    }

    /** Máy quét QR của Google Play services: tự mở camera, không cần xin quyền camera. */
    private fun scanInvite(vm: HomeViewModel, role: Role) {
        val options = GmsBarcodeScannerOptions.Builder().setBarcodeFormats(Barcode.FORMAT_QR_CODE).build()
        GmsBarcodeScanning.getClient(this, options).startScan()
            .addOnSuccessListener { barcode -> vm.join(barcode.rawValue.orEmpty(), role) }
            .addOnFailureListener { vm.showError("Không mở được máy quét, hãy nhập 6 số") }
    }

    companion object {
        const val EXTRA_OPEN_TAB = "open_tab"

        /** Thông báo (Task 09/10) mở thẳng tab Cần mua bằng extra `open_tab=list`. */
        fun tabFrom(intent: Intent?): Tab? = when (intent?.getStringExtra(EXTRA_OPEN_TAB)) {
            "list" -> Tab.LIST
            else -> null
        }
    }
}

/** Có homeId nhưng nhà chưa tải về (mở app lần đầu sau khi ghép, hoặc đang chờ mạng). */
@Composable
private fun Waiting() {
    Box(Modifier.fillMaxSize().background(AppColors.Background), contentAlignment = Alignment.Center) {
        Text("Đang mở nhà mình…", style = MaterialTheme.typography.bodyLarge, color = AppColors.TextMuted)
    }
}
