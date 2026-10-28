package com.namle.dichochung.geo

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingEvent
import com.google.firebase.firestore.Source
import com.namle.dichochung.data.EntryState
import com.namle.dichochung.data.FirebaseModule
import com.namle.dichochung.notify.ArrivalNotifier
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withTimeoutOrNull

/**
 * Vào vòng siêu thị: đặt [CurrentStore]. Ở trong vòng [ArrivalPolicy.LOITER_MS] (DWELL): đếm món chưa mua và báo
 * nếu [ArrivalPolicy.shouldNotify]. Ra vòng: xoá [CurrentStore].
 */
class GeofenceReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val event = GeofencingEvent.fromIntent(intent) ?: return
        if (event.hasError()) return
        val ids = event.triggeringGeofences?.map { it.requestId }.orEmpty()
        if (ids.isEmpty()) return
        val app = context.applicationContext

        val transition = event.geofenceTransition
        if (transition == Geofence.GEOFENCE_TRANSITION_EXIT) {
            CurrentStore.exit(app, ids)
            return
        }
        val geo = GeofenceStore(app)
        val triggered = geo.stores.filter { it.id in ids }.ifEmpty { return }
        val loc = event.triggeringLocation
        val store = if (loc == null) triggered.first() else ArrivalPolicy.nearest(triggered, loc.latitude, loc.longitude)
        when (transition) {
            // Vào vòng: chỉ ghi nhớ siêu thị (nhãn "Hết ở <tên>"); có thể chỉ là đi ngang.
            Geofence.GEOFENCE_TRANSITION_ENTER -> CurrentStore.enter(app, store.id, store.name)
            // Ở trong vòng [ArrivalPolicy.LOITER_MS] → đang đi chợ thật: báo.
            Geofence.GEOFENCE_TRANSITION_DWELL -> {
                CurrentStore.enter(app, store.id, store.name)
                val pending = goAsync()
                scope.launch {
                    try {
                        val need = needCount(app)
                        val now = System.currentTimeMillis()
                        if (need != null && ArrivalPolicy.shouldNotify(store.id, now, geo.lastNotified, need)) {
                            ArrivalNotifier.show(app, store, need)
                            geo.lastNotified = geo.lastNotified + (store.id to now)
                        }
                        // Danh sách đã hết món mà máy chưa biết (lỡ tin "đi chợ xong") → gỡ theo dõi luôn.
                        if (need == 0) GeofenceManager(app).arm(false)
                    } finally {
                        pending.finish()
                    }
                }
            }
        }
    }

    /**
     * Số món chưa nhặt (hết hàng vẫn tính). Hỏi server trước (cache có thể cũ: người nhà đã mua xong lúc app đóng),
     * mất mạng mới dùng cache; không đọc được → null (không báo bừa).
     */
    private suspend fun needCount(context: Context): Int? {
        val homeId = context.getSharedPreferences("home", Context.MODE_PRIVATE).getString("homeId", null) ?: return null
        val list = FirebaseModule.db.collection("homes").document(homeId).collection("list")
        val snap = withTimeoutOrNull(SERVER_TIMEOUT_MS) { runCatching { list.get(Source.SERVER).await() }.getOrNull() }
            ?: runCatching { list.get(Source.CACHE).await() }.getOrNull()
            ?: return null
        return snap.documents.count { EntryState.fromKey(it.getString("state")) != EntryState.PICKED }
    }

    private companion object {
        val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

        /** goAsync cho khoảng 10 s; chừa thời gian để hiện thông báo. */
        const val SERVER_TIMEOUT_MS = 7_000L
    }
}
