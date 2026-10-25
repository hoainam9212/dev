package com.namle.dichochung.home

import kotlin.random.Random

/** Mã mời 6 chữ số, hết hạn sau 15 phút, dùng một lần (luật Firestore kiểm lại phía server). */
object InviteCode {
    const val TTL_MS = 15 * 60 * 1000L
    const val LENGTH = 6

    fun generate(random: Random = Random.Default): String =
        random.nextInt(1_000_000).toString().padStart(LENGTH, '0')

    /** Luật cho dùng mã khi `expiresAt > now`, nên đúng lúc hết hạn đã tính là hết. */
    fun isExpired(expiresAt: Long, now: Long): Boolean = now >= expiresAt

    /** Đếm ngược "m:ss", làm tròn xuống theo giây, không âm. */
    fun remainingLabel(expiresAt: Long, now: Long): String {
        val seconds = ((expiresAt - now).coerceAtLeast(0)) / 1000
        return "${seconds / 60}:${(seconds % 60).toString().padStart(2, '0')}"
    }

    /** Lý do không vào được nhà bằng mã này, hoặc null nếu mã dùng được. */
    fun joinError(exists: Boolean, used: Boolean, expiresAt: Long, now: Long): String? = when {
        !exists -> "Mã không đúng"
        used -> "Mã đã được dùng"
        isExpired(expiresAt, now) -> "Mã đã hết hạn, nhờ người kia tạo mã mới"
        else -> null
    }

    /** Chỉ giữ chữ số, tối đa 6 — dùng cho ô nhập và cho nội dung QR quét được. */
    fun clean(raw: String): String = raw.filter(Char::isDigit).take(LENGTH)
}
