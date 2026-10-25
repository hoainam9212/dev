package com.namle.dichochung.catalog

import android.content.Context
import kotlinx.serialization.json.Json

object BundledCatalog {
    private const val PATH = "catalog/items.json"
    private val json = Json { ignoreUnknownKeys = true }

    fun load(context: Context): List<Item> =
        context.assets.open(PATH).bufferedReader(Charsets.UTF_8).use { json.decodeFromString(it.readText()) }
}
