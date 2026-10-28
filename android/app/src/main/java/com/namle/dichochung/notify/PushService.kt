package com.namle.dichochung.notify

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.namle.dichochung.App

/** Nhận tin FCM do Cloud Function `onHomeEvent` gửi; lúc app ở nền hệ thống tự hiện, lúc đang mở thì vẽ ở đây. */
class PushService : FirebaseMessagingService() {

    override fun onMessageReceived(message: RemoteMessage) {
        val n = message.notification ?: return
        PartnerNotifier.show(applicationContext, n.title.orEmpty(), n.body.orEmpty())
    }

    /** Token đổi (cài lại, xoá dữ liệu app…) → ghi ngay vào nhà nếu đã vào nhà. */
    override fun onNewToken(token: String) {
        val home = (application as App).container.homeRepository
        val homeId = home.homeId.value ?: return
        val uid = home.uid ?: return
        TokenSync.write(homeId, uid, token)
    }
}
