package com.namle.dichochung

import android.app.Application
import com.namle.dichochung.geo.GeofenceManager
import com.namle.dichochung.notify.Channels
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.filterNotNull
import kotlinx.coroutines.launch

class App : Application() {
    lateinit var container: AppContainer
        private set

    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)

    override fun onCreate() {
        super.onCreate()
        container = AppContainer(this)
        Channels.create(this)
        // Mỗi khi danh sách siêu thị của nhà đổi (máy này hay máy kia lưu / xoá), đăng ký lại geofence phần khác đi.
        scope.launch {
            container.storeRepository.loaded
                .filterNotNull()
                .distinctUntilChanged()
                .collect { container.geofenceManager.sync(it) }
        }
    }
}
