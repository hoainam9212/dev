package com.namle.dichochung.notify

import android.util.Log
import com.google.firebase.messaging.FirebaseMessaging
import com.namle.dichochung.data.FirebaseModule
import com.namle.dichochung.data.Home
import kotlinx.coroutines.tasks.await

/** Ghi FCM token của máy này vào `homes/{homeId}.members.{uid}.fcmToken` để Cloud Function gửi thông báo tới. */
object TokenSync {

    /** Chỉ ghi khi token máy này khác token đang lưu trong nhà (không ghi mỗi lần mở app). */
    fun needsPush(stored: String?, current: String?): Boolean = !current.isNullOrBlank() && current != stored

    fun field(uid: String) = "members.$uid.fcmToken"

    /** Lấy token hiện tại rồi ghi (không chờ server: offline vẫn vào cache, có mạng tự đẩy). */
    suspend fun push(homeId: String, uid: String) {
        write(homeId, uid, FirebaseMessaging.getInstance().token.await())
    }

    /** Gọi khi nhà vừa về / đổi: ghi nếu token đang lưu đã cũ hoặc chưa có. */
    suspend fun sync(home: Home, uid: String) {
        val current = runCatching { FirebaseMessaging.getInstance().token.await() }
            .onFailure { Log.w(TAG, "token", it) }
            .getOrNull()
        if (needsPush(home.me(uid)?.fcmToken, current)) write(home.id, uid, current!!)
    }

    fun write(homeId: String, uid: String, token: String) {
        FirebaseModule.db.collection("homes").document(homeId).update(field(uid), token)
            .addOnFailureListener { Log.w(TAG, "write token", it) }
    }

    private const val TAG = "TokenSync"
}
