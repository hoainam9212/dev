package com.namle.dichochung.notify

/**
 * Tin FCM từ `onHomeEvent`: bản mới chỉ có data {type, title, body} để app nhận được cả lúc ở nền; bản cũ có phần
 * notification. [arm]: "sent" → bật theo dõi siêu thị, "finished" → tắt, không rõ → giữ nguyên.
 */
data class PushPayload(val title: String, val body: String, val arm: Boolean?) {
    companion object {
        fun parse(data: Map<String, String>, notificationTitle: String?, notificationBody: String?): PushPayload? {
            val title = data["title"] ?: notificationTitle ?: return null
            val body = data["body"] ?: notificationBody.orEmpty()
            val arm = when (data["type"]) {
                "sent" -> true
                "finished" -> false
                else -> null
            }
            return PushPayload(title, body, arm)
        }
    }
}
