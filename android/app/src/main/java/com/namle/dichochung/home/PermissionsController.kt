package com.namle.dichochung.home

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.PowerManager
import android.provider.Settings
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat
import androidx.lifecycle.compose.LifecycleResumeEffect

/** Trạng thái + hành động của thẻ "Quyền & pin"; đọc lại mỗi lần quay về app (người dùng vừa sửa trong Cài đặt). */
class PermissionsController(
    val state: PermissionsState,
    val requestNotifications: () -> Unit,
    val requestLocation: () -> Unit,
    val openBackgroundLocation: () -> Unit,
    val openBattery: () -> Unit,
)

/** [onChanged] chạy khi trạng thái vừa đọc lại (ví dụ vừa bật "Luôn cho phép" → đăng ký geofence ngay). */
@Composable
fun rememberPermissionsController(onChanged: (PermissionsState) -> Unit = {}): PermissionsController {
    val context = LocalContext.current
    var state by remember { mutableStateOf(readPermissions(context)) }
    val refresh = {
        val now = readPermissions(context)
        if (now != state) onChanged(now)
        state = now
    }
    LifecycleResumeEffect(Unit) {
        refresh()
        onPauseOrDispose {}
    }
    val notifications = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { refresh() }
    val location = rememberLauncherForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { refresh() }

    return PermissionsController(
        state = state,
        requestNotifications = {
            if (Build.VERSION.SDK_INT >= 33) notifications.launch(Manifest.permission.POST_NOTIFICATIONS) else openAppDetails(context)
        },
        requestLocation = {
            location.launch(arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION))
        },
        // Android 11+ không cho hỏi "Luôn cho phép" bằng hộp thoại: phải vào Cài đặt → Quyền → Vị trí.
        openBackgroundLocation = {
            if (!state.location) {
                location.launch(arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION))
            } else {
                openAppDetails(context)
            }
        },
        openBattery = {
            val intent = Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS)
            if (!startSafely(context, intent)) openAppDetails(context)
        },
    )
}

fun readPermissions(context: Context): PermissionsState {
    fun granted(p: String) = ContextCompat.checkSelfPermission(context, p) == PackageManager.PERMISSION_GRANTED
    val power = context.getSystemService(PowerManager::class.java)
    return PermissionsState(
        notifications = Build.VERSION.SDK_INT < 33 || granted(Manifest.permission.POST_NOTIFICATIONS),
        location = granted(Manifest.permission.ACCESS_FINE_LOCATION),
        backgroundLocation = granted(Manifest.permission.ACCESS_BACKGROUND_LOCATION),
        battery = power?.isIgnoringBatteryOptimizations(context.packageName) == true,
    )
}

private fun openAppDetails(context: Context) {
    startSafely(context, Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.fromParts("package", context.packageName, null)))
}

private fun startSafely(context: Context, intent: Intent): Boolean =
    runCatching { context.startActivity(intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)) }.isSuccess
