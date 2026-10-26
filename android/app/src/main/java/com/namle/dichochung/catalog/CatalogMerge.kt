package com.namle.dichochung.catalog

/** Gộp kho món trong APK với `homes/{id}/items` (bản của nhà ghi đè từng trường cùng id). */
object CatalogMerge {

    fun merge(bundled: List<Item>, home: Map<String, Map<String, Any?>>): List<Item> {
        val byId = bundled.associateBy { it.id }
        val merged = bundled.map { item -> home[item.id]?.let { apply(item, it) } ?: item }
        val added = home.filterKeys { it !in byId }.mapNotNull { (id, fields) -> create(id, fields) }
        return merged + added
    }

    private fun apply(base: Item, f: Map<String, Any?>) = base.copy(
        name = f.string("name") ?: base.name,
        aliases = f.strings("aliases") ?: base.aliases,
        nameJa = if ("nameJa" in f) f.string("nameJa") else base.nameJa,
        category = f.category() ?: base.category,
        unit = f.string("unit") ?: base.unit,
        defaultQty = f.int("defaultQty") ?: base.defaultQty,
        step = f.int("step") ?: base.step,
        imageAsset = if ("imageAsset" in f) f.string("imageAsset") else base.imageAsset,
        imageUrl = if ("imageUrl" in f) f.string("imageUrl") else base.imageUrl,
        sendCount = f.int("sendCount") ?: base.sendCount,
        deleted = f["deleted"] as? Boolean ?: base.deleted,
    )

    /** Món nhà tự thêm: thiếu tên, nhóm hoặc đơn vị thì bỏ qua (ví dụ doc chỉ có sendCount của món đã bị gỡ khỏi kho). */
    private fun create(id: String, f: Map<String, Any?>): Item? {
        val base = Item(
            id = id,
            name = f.string("name") ?: return null,
            category = f.category() ?: return null,
            unit = f.string("unit") ?: return null,
        )
        return apply(base, f)
    }

    private fun Map<String, Any?>.string(key: String) = (this[key] as? String)?.takeIf { it.isNotBlank() }
    private fun Map<String, Any?>.int(key: String) = (this[key] as? Number)?.toInt()
    private fun Map<String, Any?>.strings(key: String) = (this[key] as? List<*>)?.filterIsInstance<String>()
    private fun Map<String, Any?>.category() = Category.entries.firstOrNull { it.key == this["category"] }
}
