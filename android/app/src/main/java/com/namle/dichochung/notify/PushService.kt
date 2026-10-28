package com.namle.dichochung.notify

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.namle.dichochung.App

/**
 * Nhận tin FCM do Cloud Function `onHomeEvent` gửi (chỉ data → luôn tới đây, kể cả lúc app ở nền): vẽ thông báo và
 * bật / tắt theo dõi siêu thị theo [PushPayload.arm].
 */
class PushService : FirebaseMessagingService() {

    override fun onMessageReceived(message: RemoteMessage) {
        val n = message.notification
        val payload = PushPayload.parse(message.data, n?.title, n?.body) ?: return
        PartnerNotifier.show(applicationContext, payload.title, payload.body)
        payload.arm?.let { (application as App).container.geofenceManager.arm(it) }
    }

    /** Token đổi (cài lại, xoá dữ liệu app…) → ghi ngay vào nhà nếu đã vào nhà. */
    override fun onNewToken(token: String) {
        val home = (application as App).container.homeRepository
        val homeId = home.homeId.value ?: return
        val uid = home.uid ?: return
        TokenSync.write(homeId, uid, token)
    }
}
