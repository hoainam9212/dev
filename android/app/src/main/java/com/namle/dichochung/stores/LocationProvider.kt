package com.namle.dichochung.stores

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageManager
import android.location.Geocoder
import android.location.Location
import androidx.core.content.ContextCompat
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.google.android.gms.tasks.CancellationTokenSource
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import kotlinx.coroutines.withTimeoutOrNull
import java.util.Locale

/** Vị trí hiện tại (Fused Location) + địa chỉ (Geocoder) cho việc lưu siêu thị. */
class LocationProvider(context: Context) {
    private val appContext = context.applicationContext
    private val fused = LocationServices.getFusedLocationProviderClient(appContext)

    fun hasPermission(): Boolean = PERMISSIONS.any {
        ContextCompat.checkSelfPermission(appContext, it) == PackageManager.PERMISSION_GRANTED
    }

    /** Vị trí mới (tối đa 15 s), không được thì vị trí gần nhất máy còn nhớ; chưa có quyền → null. */
    @SuppressLint("MissingPermission")
    suspend fun current(): Location? {
        if (!hasPermission()) return null
        val token = CancellationTokenSource()
        val fresh = runCatching {
            withTimeoutOrNull(TIMEOUT_MS) { fused.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY, token.token).await() }
        }.getOrNull()
        token.cancel()
        return fresh ?: runCatching { fused.lastLocation.await() }.getOrNull()
    }

    /** Dòng địa chỉ đã bỏ quốc gia / mã bưu điện, làm tên tạm khi bản đồ không có siêu thị nào; lỗi → "". */
    suspend fun address(lat: Double, lng: Double): String = withContext(Dispatchers.IO) {
        runCatching {
            @Suppress("DEPRECATION")
            Geocoder(appContext, Locale.JAPAN).getFromLocation(lat, lng, 1)?.firstOrNull()?.getAddressLine(0)
        }.getOrNull()?.let(Geo::cleanAddress).orEmpty()
    }

    companion object {
        val PERMISSIONS = arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION)
        private const val TIMEOUT_MS = 15_000L
    }
}
