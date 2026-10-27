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
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.ui.unit.dp
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.codescanner.GmsBarcodeScannerOptions
import com.google.mlkit.vision.codescanner.GmsBarcodeScanning
import com.namle.dichochung.data.ListLogic
import com.namle.dichochung.data.Role
import com.namle.dichochung.geo.CurrentStore
import com.namle.dichochung.home.HomeScreen
import com.namle.dichochung.home.HomeViewModel
import com.namle.dichochung.home.OnboardingScreen
import com.namle.dichochung.home.rememberPermissionsController
import com.namle.dichochung.list.ListRoute
import com.namle.dichochung.list.ListViewModel
import com.namle.dichochung.pick.PickRoute
import com.namle.dichochung.pick.PickViewModel
import com.namle.dichochung.stores.StoresViewModel
import com.namle.dichochung.stores.rememberStoreSaver
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
                        val pickVm: PickViewModel = viewModel(
                            factory = PickViewModel.factory(container.catalogRepository, container.listRepository, container.itemWriter),
                        )
                        val listVm: ListViewModel = viewModel(
                            factory = ListViewModel.factory(container.listRepository, container.catalogRepository) {
                                CurrentStore.name(applicationContext)
                            },
                        )
                        val storesVm: StoresViewModel = viewModel(
                            factory = StoresViewModel.factory(container.storeRepository, container.locationProvider, container.overpassClient),
                        )
                        val stores by storesVm.stores.collectAsStateWithLifecycle()
                        val here by storesVm.here.collectAsStateWithLifecycle()
                        // "📍 Lưu chỗ này là siêu thị" ở cả tab Nhà mình và tab Cần mua; thông báo hiện trên cùng màn.
                        val saveStore = rememberStoreSaver(storesVm)
                        // Vừa bật "Luôn cho phép" trong Cài đặt rồi quay lại → đăng ký geofence ngay.
                        val permissions = rememberPermissionsController { if (it.backgroundLocation) container.geofenceManager.resync() }
                        val storeSnackbar = remember { SnackbarHostState() }
                        LaunchedEffect(storesVm) { storesVm.messages.collect { storeSnackbar.showSnackbar(it) } }
                        val entries by container.listRepository.entries.collectAsStateWithLifecycle()
                        val me = currentHome.me(myUid)
                        Box(Modifier.fillMaxSize()) {
                            MainScaffold(selected = tab, onSelect = { tab = it }, listBadge = ListLogic.needCount(entries)) { padding ->
                                val content = Modifier.fillMaxSize().padding(padding)
                                when (tab) {
                                    Tab.PICK -> PickRoute(
                                        vm = pickVm,
                                        roleLabel = me?.name.orEmpty(),
                                        roleEmoji = me?.role?.emoji ?: "🏠",
                                        recipients = currentHome.others(myUid).map { it.name },
                                        modifier = content,
                                    )
                                    Tab.LIST -> ListRoute(
                                        vm = listVm,
                                        roleLabel = me?.name.orEmpty(),
                                        roleEmoji = me?.role?.emoji ?: "🏠",
                                        names = currentHome.members.associate { it.uid to it.name },
                                        modifier = content,
                                        onSaveStore = saveStore,
                                    )
                                    Tab.HOME -> HomeScreen(
                                        home = currentHome,
                                        myUid = myUid,
                                        invite = ui.invite,
                                        now = now,
                                        onInvite = vm::invite,
                                        onCloseInvite = vm::closeInvite,
                                        onRename = vm::rename,
                                        modifier = content,
                                        stores = stores,
                                        here = here,
                                        onAddStore = saveStore,
                                        onRenameStore = storesVm::rename,
                                        onDeleteStore = storesVm::delete,
                                        permissions = permissions.state,
                                        onNotifications = permissions.requestNotifications,
                                        onLocation = permissions.requestLocation,
                                        onBackgroundLocation = permissions.openBackgroundLocation,
                                        onBattery = permissions.openBattery,
                                    )
                                }
                            }
                            SnackbarHost(storeSnackbar, Modifier.align(Alignment.TopCenter).statusBarsPadding().padding(top = 8.dp))
                        }
                        // Khoảng cách tới siêu thị đã lưu: chỉ lấy vị trí khi đang ở tab Nhà mình (và đã có quyền).
                        LaunchedEffect(tab) { if (tab == Tab.HOME) storesVm.refreshHere() }
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
