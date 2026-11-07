package com.namle.dichochung.stores

import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.namle.dichochung.data.HomeException
import com.namle.dichochung.data.HomeRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

/**
 * Siêu thị cả nhà dùng chung `homes/{id}/stores`. Ghi không chờ server (lưu được cả khi sóng yếu trong siêu thị).
 * Xoá chỉ xoá doc; geofence tương ứng do Task 09 gỡ khi nghe [stores] đổi.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class StoreRepository(
    private val db: FirebaseFirestore,
    private val homeRepository: HomeRepository,
    scope: CoroutineScope,
) {
    /**
     * null = chưa tải xong lần đầu. Geofence (Task 09) chỉ đồng bộ từ đây, để danh sách rỗng lúc mới mở app
     * không gỡ mất mọi vòng đã đăng ký. Rời nhà → danh sách rỗng thật (gỡ hết).
     */
    val loaded: StateFlow<List<Store>?> = homeRepository.homeId
        .flatMapLatest { id -> if (id == null) flowOf(emptyList()) else watch(id) }
        .stateIn(scope, SharingStarted.Eagerly, null)

    val stores: StateFlow<List<Store>> = loaded
        .map { it.orEmpty() }
        .stateIn(scope, SharingStarted.Eagerly, emptyList())

    /** [candidate] = chỗ chọn từ OpenStreetMap (toạ độ + osmId của chỗ đó); null = tự nhập tên tại vị trí [lat], [lng]. */
    fun add(candidate: StoreCandidate?, name: String, lat: Double, lng: Double) {
        val data = buildMap<String, Any> {
            put("name", name.trim().take(Store.MAX_NAME))
            put("lat", candidate?.lat ?: lat)
            put("lng", candidate?.lng ?: lng)
            put("radius", Store.DEFAULT_RADIUS_M)
            candidate?.osmId?.let { put("osmId", it) }
            put("createdBy", homeRepository.uid.orEmpty())
            put("createdAt", FieldValue.serverTimestamp())
        }
        collection().document().set(data)
    }

    fun rename(id: String, name: String) {
        val clean = name.trim().take(Store.MAX_NAME).ifEmpty { return }
        collection().document(id).update("name", clean)
    }

    fun delete(id: String) {
        collection().document(id).delete()
    }

    private fun collection() = db.collection("homes")
        .document(homeRepository.homeId.value ?: throw HomeException("Chưa có nhà"))
        .collection("stores")

    private fun watch(homeId: String) = callbackFlow<List<Store>?> {
        val registration = db.collection("homes").document(homeId).collection("stores")
            .addSnapshotListener { snap, _ ->
                if (snap != null) trySend(snap.documents.mapNotNull(::parse).sortedBy { it.name })
            }
        awaitClose { registration.remove() }
    }

    companion object {
        fun parse(doc: DocumentSnapshot): Store? {
            return Store(
                id = doc.id,
                name = doc.getString("name") ?: return null,
                lat = doc.getDouble("lat") ?: return null,
                lng = doc.getDouble("lng") ?: return null,
                radiusM = Store.effectiveRadius(doc.getLong("radius")?.toInt()),
                osmId = doc.getString("osmId"),
            )
        }
    }
}
