package com.namle.dichochung.data

/**
 * Vai trong nhà; [key] là giá trị lưu ở Firestore (`members.<uid>.role`). Nhóm gia đình nên vai được trùng (hai con).
 */
enum class Role(val key: String, val vi: String, val emoji: String) {
    VO("vo", "Vợ", "👩"),
    CHONG("chong", "Chồng", "👨"),
    CON("con", "Con", "🧒"),
    ONG("ong", "Ông", "👴"),
    BA("ba", "Bà", "👵"),
    KHAC("khac", "Khác", "🙂");

    /** Tên hiển thị lúc mới vào nhà; "Khác" không hợp làm tên nên dùng "Người nhà". */
    val defaultName: String get() = if (this == KHAC) "Người nhà" else vi

    companion object {
        fun fromKey(key: String?): Role? = entries.firstOrNull { it.key == key }
    }
}
