package com.namle.dichochung.data

/** Vai trong nhà; [key] là giá trị lưu ở Firestore (`members.<uid>.role`, `invites/<code>.role`). */
enum class Role(val key: String, val vi: String, val emoji: String) {
    VO("vo", "Vợ", "👩"),
    CHONG("chong", "Chồng", "👨");

    val other: Role get() = if (this == VO) CHONG else VO

    companion object {
        fun fromKey(key: String?): Role? = entries.firstOrNull { it.key == key }
    }
}
