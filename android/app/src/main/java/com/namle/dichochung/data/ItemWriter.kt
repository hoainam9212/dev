package com.namle.dichochung.data

import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.SetOptions
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.StorageMetadata
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.pick.ItemDraft
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

/**
 * Ghi kho món của nhà `homes/{id}/items/{itemId}`: món tự thêm, món kho gốc đã sửa, món đã xoá.
 * Doc ghi không chờ server (offline vẫn hiện ngay); ảnh tải lên Storage chạy nền rồi mới gắn `imageUrl`.
 */
class ItemWriter(
    private val db: FirebaseFirestore,
    private val storage: FirebaseStorage,
    private val homeRepository: HomeRepository,
    private val scope: CoroutineScope,
    private val clock: () -> Long = System::currentTimeMillis,
) {
    /** Lưu [item]; [photo] (WebP từ [PhotoProcessor]) khác null thì tải lên và thay ảnh cũ. */
    suspend fun upsert(item: Item, photo: ByteArray?): Item {
        val homeId = homeRepository.homeId.value ?: throw HomeException("Chưa có nhà")
        val doc = itemDoc(homeId, item.id)
        val data = mutableMapOf<String, Any>(
            "name" to item.name,
            "category" to item.category.key,
            "unit" to item.unit,
            "defaultQty" to item.defaultQty,
            "step" to item.step,
            "updatedAt" to clock(),
        )
        if (ItemDraft.isUserItem(item.id)) {
            data["createdBy"] = homeRepository.uid.orEmpty()
        }
        doc.set(data, SetOptions.merge())

        if (photo != null) {
            scope.launch {
                runCatching {
                    // Tên file mới mỗi lần đổi ảnh: URL đổi theo nên Coil trên cả hai máy không giữ ảnh cũ trong cache.
                    val ref = storage.reference.child("homes/$homeId/items/${item.id}-${clock()}.webp")
                    ref.putBytes(photo, StorageMetadata.Builder().setContentType("image/webp").build()).await()
                    val url = ref.downloadUrl.await().toString()
                    doc.update("imageUrl", url).await()
                    item.imageUrl?.let(::deleteOwnPhoto)
                }
            }
        }
        return item
    }

    /** Món tự thêm: xoá hẳn doc + ảnh. Món kho gốc: đánh dấu `deleted` (kho trong APK vẫn còn nên không xoá được). */
    fun delete(item: Item) {
        val homeId = homeRepository.homeId.value ?: throw HomeException("Chưa có nhà")
        val doc = itemDoc(homeId, item.id)
        if (ItemDraft.isUserItem(item.id)) {
            doc.delete()
            item.imageUrl?.let(::deleteOwnPhoto)
        } else {
            doc.set(mapOf("deleted" to true, "updatedAt" to clock()), SetOptions.merge())
        }
    }

    private fun itemDoc(homeId: String, itemId: String) =
        db.collection("homes").document(homeId).collection("items").document(itemId)

    /** Chỉ xoá ảnh nằm trong Storage của app; URL lạ (ví dụ ảnh mẫu) thì bỏ qua. */
    private fun deleteOwnPhoto(url: String) {
        if ("firebasestorage" !in url) return
        runCatching { storage.getReferenceFromUrl(url).delete() }
    }
}
