package com.namle.dichochung.geo

import android.Manifest
import android.annotation.SuppressLint
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingRequest
import com.google.android.gms.location.LocationServices
import com.namle.dichochung.stores.Store

/**
 * Đăng ký geofence bán kính [Store.radiusM] cho mỗi siêu thị đã lưu (id geofence = id siêu thị). Chỉ thêm / gỡ phần
 * khác đi ([GeofenceSync]); chưa có quyền "Luôn cho phép" thì chỉ nhớ danh sách, có quyền rồi gọi [resync].
 */
class GeofenceManager(context: Context) {
    private val appContext = context.applicationContext
    private val client = LocationServices.getGeofencingClient(appContext)
    private val store = GeofenceStore(appContext)

    private val pendingIntent: PendingIntent by lazy {
        PendingIntent.getBroadcast(
            appContext,
            0,
            Intent(appContext, GeofenceReceiver::class.java),
            // Play services điền sự kiện vào intent nên phải MUTABLE.
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE,
        )
    }

    fun sync(stores: List<Store>) {
        store.stores = stores
        resync()
    }

    /** Danh sách còn món → bật theo dõi; hết món → gỡ hết geofence. Gọi khi danh sách đổi hoặc người nhà gửi / xong. */
    fun arm(on: Boolean) {
        if (store.armed == on) return
        store.armed = on
        resync()
    }

    /** Đăng ký lại từ bản sao đã lưu (sau khi được cấp quyền, khởi động lại máy, cập nhật app). */
    fun resync() {
        if (!canRegister()) return
        val diff = GeofenceSync.diff(store.registered, GeofenceSync.wanted(store.stores, store.armed))
        if (diff.removeIds.isEmpty()) {
            add(diff.add)
            return
        }
        // Gỡ xong mới thêm, để siêu thị dời chỗ (gỡ + thêm cùng id) không bị ghi đè lẫn nhau trong sổ đăng ký.
        client.removeGeofences(diff.removeIds).addOnCompleteListener {
            store.registered = store.registered - diff.removeIds.toSet()
            add(diff.add)
        }
    }

    /** Máy khởi động lại / app được cập nhật thì Android xoá hết geofence (Review Focus #5). */
    fun reRegisterAll() {
        store.registered = emptyMap()
        resync()
    }

    @SuppressLint("MissingPermission")
    private fun add(stores: List<Store>) {
        val room = MAX_GEOFENCES - store.registered.size
        val batch = stores.take(room.coerceAtLeast(0))
        if (batch.isEmpty() || !canRegister()) return
        val request = GeofencingRequest.Builder()
            // Đang đứng sẵn trong siêu thị lúc bật theo dõi (người nhà vừa gửi danh sách) thì vẫn báo sau 3 phút.
            .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER or GeofencingRequest.INITIAL_TRIGGER_DWELL)
            .addGeofences(batch.map(::geofence))
            .build()
        client.addGeofences(request, pendingIntent).addOnSuccessListener {
            store.registered = store.registered + batch.associate { it.id to GeofenceSync.fingerprint(it) }
        }
    }

    private fun geofence(s: Store) = Geofence.Builder()
        .setRequestId(s.id)
        .setCircularRegion(s.lat, s.lng, s.radiusM.toFloat())
        .setExpirationDuration(Geofence.NEVER_EXPIRE)
        .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER or Geofence.GEOFENCE_TRANSITION_DWELL or Geofence.GEOFENCE_TRANSITION_EXIT)
        .setLoiteringDelay(ArrivalPolicy.LOITER_MS)
        .build()

    /** Android 10+ chỉ cho thêm geofence khi có vị trí chính xác + "Luôn cho phép". */
    private fun canRegister() =
        granted(Manifest.permission.ACCESS_FINE_LOCATION) && granted(Manifest.permission.ACCESS_BACKGROUND_LOCATION)

    private fun granted(permission: String) =
        ContextCompat.checkSelfPermission(appContext, permission) == PackageManager.PERMISSION_GRANTED

    private companion object {
        /** Giới hạn của Play services là 100 geofence mỗi app. */
        const val MAX_GEOFENCES = 100
    }
}
