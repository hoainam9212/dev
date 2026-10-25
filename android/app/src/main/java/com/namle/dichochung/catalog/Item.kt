package com.namle.dichochung.catalog

import kotlinx.serialization.Serializable

@Serializable
data class Item(
    val id: String,
    val name: String,
    val aliases: List<String> = emptyList(),
    val nameJa: String? = null,
    val category: Category,
    val unit: String,
    val defaultQty: Int = 1,
    val step: Int = 1,
    val imageAsset: String? = null,
    val imageUrl: String? = null,
    val sendCount: Int = 0,
    val deleted: Boolean = false,
)
