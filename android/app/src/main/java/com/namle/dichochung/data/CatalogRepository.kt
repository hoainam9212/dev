package com.namle.dichochung.data

import android.content.Context
import com.google.firebase.firestore.FirebaseFirestore
import com.namle.dichochung.catalog.BundledCatalog
import com.namle.dichochung.catalog.CatalogMerge
import com.namle.dichochung.catalog.Item
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.flow.stateIn

/** Kho món = kho mẫu trong APK + `homes/{id}/items` (món tự thêm, món kho đã sửa, sendCount cho "Hay mua"). */
@OptIn(ExperimentalCoroutinesApi::class)
class CatalogRepository(
    context: Context,
    private val db: FirebaseFirestore,
    homeRepository: HomeRepository,
    scope: CoroutineScope,
) {
    private val appContext = context.applicationContext

    private val bundled: Flow<List<Item>> = flow { emit(BundledCatalog.load(appContext)) }.flowOn(Dispatchers.IO)

    private val home: Flow<Map<String, Map<String, Any?>>> = homeRepository.homeId.flatMapLatest { id ->
        if (id == null) flowOf(emptyMap()) else watchItems(id)
    }

    val items: StateFlow<List<Item>> = combine(bundled, home) { b, h -> CatalogMerge.merge(b, h) }
        .stateIn(scope, SharingStarted.Eagerly, emptyList())

    private fun watchItems(homeId: String) = callbackFlow<Map<String, Map<String, Any?>>> {
        trySend(emptyMap())
        val registration = db.collection("homes").document(homeId).collection("items")
            .addSnapshotListener { snap, _ ->
                if (snap != null) trySend(snap.documents.associate { it.id to (it.data ?: emptyMap()) })
            }
        awaitClose { registration.remove() }
    }
}
