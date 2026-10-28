package com.namle.dichochung

import android.app.Application
import android.util.Log
import com.google.firebase.FirebaseApp
import com.namle.dichochung.geo.ArrivalPolicy
import com.namle.dichochung.notify.Channels
import com.namle.dichochung.notify.TokenSync
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.distinctUntilChangedBy
import kotlinx.coroutines.flow.drop
import kotlinx.coroutines.flow.filterNotNull
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch

class App : Application() {
    lateinit var container: AppContainer
        private set

    // Đồng bộ geofence / FCM token hỏng (Play services thiếu, Firestore lỗi…) thì ghi log, không làm sập app.
    private val scope = CoroutineScope(
        SupervisorJob() + Dispatchers.Main.immediate + CoroutineExceptionHandler { _, e -> Log.w(TAG, "background sync", e) },
    )

    override fun onCreate() {
        super.onCreate()
        container = AppContainer(this)
        Channels.create(this)
        // Không có Firebase (build thiếu google-services.json, test Robolectric) thì không có siêu thị để theo dõi.
        if (FirebaseApp.getApps(this).isEmpty()) return
        // Mỗi khi danh sách siêu thị của nhà đổi (máy này hay máy kia lưu / xoá), đăng ký lại geofence phần khác đi.
        scope.launch {
            container.storeRepository.loaded
                .filterNotNull()
                .distinctUntilChanged()
                .collect { container.geofenceManager.sync(it) }
        }
        // Danh sách còn món thì theo dõi siêu thị, hết món thì gỡ (lúc app mở; app đóng thì nhờ tin FCM "sent" /
        // "finished"). Bỏ giá trị rỗng ban đầu của StateFlow, chưa phải danh sách thật.
        scope.launch {
            container.listRepository.entries
                .drop(1)
                .map { entries -> ArrivalPolicy.hasNeed(entries.map { it.state }) }
                .distinctUntilChanged()
                .collect { container.geofenceManager.arm(it) }
        }
        // Có nhà (mới tạo, vừa vào, hay mở app) mà token máy này chưa lưu / đã cũ → ghi để người nhà gửi thông báo tới.
        scope.launch {
            val homes = container.homeRepository
            homes.home
                .filterNotNull()
                .distinctUntilChangedBy { home -> homes.uid?.let { home.id to home.me(it)?.fcmToken } }
                .collect { home -> homes.uid?.let { TokenSync.sync(home, it) } }
        }
    }

    private companion object {
        const val TAG = "App"
    }
}
