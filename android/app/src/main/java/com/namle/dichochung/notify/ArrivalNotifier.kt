package com.namle.dichochung.notify

import android.Manifest
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import com.namle.dichochung.MainActivity
import com.namle.dichochung.R
import com.namle.dichochung.geo.ArrivalPolicy
import com.namle.dichochung.stores.Store

/** "🛒 Đang ở <tên> · còn N món cần mua"; chạm → mở thẳng tab Cần mua. */
object ArrivalNotifier {

    fun show(context: Context, store: Store, needCount: Int) {
        if (Build.VERSION.SDK_INT >= 33 &&
            ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) {
            return
        }
        val open = Intent(context, MainActivity::class.java)
            .putExtra(MainActivity.EXTRA_OPEN_TAB, "list")
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP)
        val pending = PendingIntent.getActivity(
            context,
            store.id.hashCode(),
            open,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        val notification = NotificationCompat.Builder(context, Channels.ARRIVAL)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(ArrivalPolicy.title(store.name))
            .setContentText(ArrivalPolicy.body(needCount))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_REMINDER)
            .setContentIntent(pending)
            .setAutoCancel(true)
            .build()
        @Suppress("MissingPermission")
        NotificationManagerCompat.from(context).notify(NOTIFICATION_TAG, store.id.hashCode(), notification)
    }

    private const val NOTIFICATION_TAG = "arrival"
}
