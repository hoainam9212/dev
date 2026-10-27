package com.namle.dichochung.data

import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.SetOptions
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.list.ListUpdates
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.stateIn

/** Danh sách Cần mua chung `homes/{id}/list`; cache offline của Firestore giữ thay đổi khi mất sóng. */
@OptIn(ExperimentalCoroutinesApi::class)
class ListRepository(
    private val db: FirebaseFirestore,
    private val homeRepository: HomeRepository,
    scope: CoroutineScope,
    private val clock: () -> Long = System::currentTimeMillis,
) {
    val entries: StateFlow<List<ListEntry>> = homeRepository.homeId
        .flatMapLatest { id -> if (id == null) flowOf(emptyList()) else watch(id) }
        .stateIn(scope, SharingStarted.Eagerly, emptyList())

    /**
     * Gửi món đã chọn: gộp vào danh sách theo [ListLogic.mergeSend], tăng `items/{id}.sendCount` ("Hay mua") và ghi
     * event `sent` cho Cloud Function (Task 10) — tất cả trong một batch. Không chờ server: offline vẫn vào cache rồi
     * tự đẩy lên khi có mạng. Trả về số món đã gửi.
     */
    fun send(selection: Map<String, Int>, catalog: List<Item>): Int {
        val homeId = homeRepository.homeId.value ?: throw HomeException("Chưa có nhà")
        val uid = homeRepository.uid ?: throw HomeException("Chưa đăng nhập")
        val items = catalog.associateBy { it.id }
        val home = db.collection("homes").document(homeId)
        val list = home.collection("list")
        val existing = entries.value
        val now = clock()
        val writes = ListLogic.mergeSend(existing, selection, items, by = uid, now = now, newId = { list.document().id })
        if (writes.isEmpty()) return 0

        val batch = db.batch()
        writes.forEach { w ->
            when (w) {
                is EntryWrite.Create -> batch.set(list.document(w.entry.id), toData(w.entry))
                // Chỉ đụng qty + updatedAt: người kia đang tick / sửa ghi chú cùng dòng không bị ghi đè.
                is EntryWrite.AddQty -> batch.update(
                    list.document(w.entryId),
                    "qty", FieldValue.increment(w.added.toLong()),
                    "updatedAt", w.updatedAt,
                )
            }
        }
        selection.keys.filter { it in items }.forEach { itemId ->
            batch.set(home.collection("items").document(itemId), mapOf("sendCount" to FieldValue.increment(1L)), SetOptions.merge())
        }
        batch.set(
            home.collection("events").document(),
            mapOf(
                "type" to "sent",
                "by" to uid,
                "itemNames" to selection.keys.mapNotNull { items[it]?.name },
                "wasEmpty" to (ListLogic.needCount(existing) == 0),
                "createdAt" to FieldValue.serverTimestamp(),
            ),
        )
        batch.commit()
        return writes.size
    }

    /** Đánh dấu đã nhặt. Các thao tác dòng dưới đây chỉ `update` trường đổi và không chờ server (offline trong siêu thị). */
    fun tick(entryId: String) = updateEntry(entryId, ListUpdates.tick(uid(), clock()))

    /** Bỏ tick, hoặc đưa dòng hết hàng về "cần mua". */
    fun untick(entryId: String) = updateEntry(entryId, ListUpdates.untick(clock()))

    /** [storeName] = siêu thị đang đứng (Task 09); null → nhãn "Hết hàng". */
    fun markOutOfStock(entryId: String, storeName: String?) = updateEntry(entryId, ListUpdates.outOfStock(storeName, clock()))

    /** Sửa số lượng / ghi chú; tham số null = giữ nguyên. */
    fun edit(entryId: String, qty: Int?, note: String?) = updateEntry(entryId, ListUpdates.edit(qty, note, clock()))

    /** "Hoàn thành đi chợ": một batch xoá dòng đã nhặt + event `finished` cho thông báo (Task 10). */
    fun finish(): FinishResult {
        val result = ListLogic.finish(entries.value)
        if (result.picked == 0) return result
        val home = db.collection("homes").document(homeId())
        val batch = db.batch()
        result.deleteIds.forEach { batch.delete(home.collection("list").document(it)) }
        batch.set(
            home.collection("events").document(),
            mapOf(
                "type" to "finished",
                "by" to uid(),
                "picked" to result.picked,
                "total" to result.total,
                "createdAt" to FieldValue.serverTimestamp(),
            ),
        )
        batch.commit()
        return result
    }

    private fun updateEntry(entryId: String, fields: Map<String, Any?>) {
        db.collection("homes").document(homeId()).collection("list").document(entryId).update(fields)
    }

    private fun homeId() = homeRepository.homeId.value ?: throw HomeException("Chưa có nhà")

    private fun uid() = homeRepository.uid ?: throw HomeException("Chưa đăng nhập")

    private fun watch(homeId: String) = callbackFlow<List<ListEntry>> {
        val registration = db.collection("homes").document(homeId).collection("list")
            .addSnapshotListener { snap, _ ->
                if (snap != null) trySend(snap.documents.mapNotNull(::parse).sortedBy { it.addedAt })
            }
        awaitClose { registration.remove() }
    }

    companion object {
        fun toData(e: ListEntry): Map<String, Any?> = mapOf(
            "itemId" to e.itemId,
            "qty" to e.qty,
            "unit" to e.unit,
            "note" to e.note,
            "addedBy" to e.addedBy,
            "addedAt" to e.addedAt,
            "state" to e.state.key,
            "outOfStockAt" to e.outOfStockStore,
            "pickedBy" to e.pickedBy,
            "updatedAt" to e.updatedAt,
        )

        fun parse(doc: DocumentSnapshot): ListEntry? {
            val itemId = doc.getString("itemId") ?: return null
            return ListEntry(
                id = doc.id,
                itemId = itemId,
                qty = doc.getLong("qty")?.toInt() ?: return null,
                unit = doc.getString("unit").orEmpty(),
                note = doc.getString("note").orEmpty(),
                addedBy = doc.getString("addedBy").orEmpty(),
                addedAt = doc.getLong("addedAt") ?: 0L,
                state = EntryState.fromKey(doc.getString("state")),
                outOfStockStore = doc.getString("outOfStockAt"),
                pickedBy = doc.getString("pickedBy"),
                updatedAt = doc.getLong("updatedAt") ?: 0L,
            )
        }
    }
}
