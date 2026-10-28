package com.namle.dichochung.catalog

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
enum class Category(val key: String, val vi: String, val emoji: String) {
    @SerialName("rau_cu") RAU_CU("rau_cu", "Rau củ", "🥬"),
    @SerialName("hoa_qua") HOA_QUA("hoa_qua", "Hoa quả", "🍎"),
    @SerialName("thit_ca") THIT_CA("thit_ca", "Thịt cá", "🥩"),
    @SerialName("trung_sua") TRUNG_SUA("trung_sua", "Trứng sữa", "🥚"),
    @SerialName("gia_vi") GIA_VI("gia_vi", "Gia vị", "🧂"),
    @SerialName("do_kho") DO_KHO("do_kho", "Đồ khô", "🍚"),
    @SerialName("do_uong") DO_UONG("do_uong", "Đồ uống", "🧃"),
    @SerialName("khac") KHAC("khac", "Khác", "🛍️"),
}
