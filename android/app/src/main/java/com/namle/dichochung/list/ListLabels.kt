package com.namle.dichochung.list

import com.namle.dichochung.data.ListEntry
import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter

/** Chữ hiển thị của tab Cần mua. */
object ListLabels {
    private val HHMM = DateTimeFormatter.ofPattern("HH:mm")

    /** "Vợ gửi lúc 17:46" theo dòng thêm gần nhất; [names] = uid → tên hiển thị trong nhà. */
    fun caption(entries: List<ListEntry>, names: Map<String, String>, zone: ZoneId): String {
        val latest = entries.maxByOrNull { it.addedAt } ?: return "Đi Chợ Chung"
        val who = names[latest.addedBy] ?: "Người nhà"
        return "$who gửi lúc ${HHMM.format(Instant.ofEpochMilli(latest.addedAt).atZone(zone))}"
    }

    /** Hai dòng cạnh vòng tiến độ. */
    fun progress(picked: Int, total: Int): Pair<String, String> = when {
        picked == 0 -> "Chưa nhặt món nào" to "cần mua $total món"
        picked >= total -> "Đã nhặt đủ $total món 🎉" to "bấm Hoàn thành khi xong"
        else -> "Đã nhặt $picked món" to "còn ${total - picked} món nữa"
    }

    fun outOfStock(storeName: String?): String = storeName?.takeIf { it.isNotBlank() }?.let { "Hết ở $it" } ?: "Hết hàng"

    fun finished(picked: Int, total: Int) = "Đã đi chợ xong · nhặt $picked/$total món"
}
