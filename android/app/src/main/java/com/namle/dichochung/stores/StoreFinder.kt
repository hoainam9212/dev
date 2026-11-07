package com.namle.dichochung.stores

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope

/**
 * Hỏi cùng lúc Overpass (đủ loại cửa hàng, có chi nhánh, nhưng hay quá tải) và Nominatim (chỉ siêu thị, nhanh),
 * rồi gộp lại. Một bên hỏng vẫn còn bên kia; cả hai hỏng → rỗng, người dùng tự nhập tên.
 */
class StoreFinder(
    private val overpass: OverpassClient,
    private val nominatim: NominatimClient,
) {
    suspend fun nearby(lat: Double, lng: Double, radiusM: Int = RADIUS_M): List<StoreCandidate> = coroutineScope {
        val full = async { orEmpty { overpass.nearby(lat, lng, radiusM) } }
        val quick = async { orEmpty { nominatim.nearby(lat, lng, radiusM) } }
        merge(full.await(), quick.await())
    }

    private inline fun orEmpty(block: () -> List<StoreCandidate>) = try {
        block()
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        emptyList()
    }

    companion object {
        /** GPS trong nhà lệch vài chục mét, và toạ độ siêu thị lớn là tâm toà nhà. */
        private const val RADIUS_M = 200

        /** Cùng một chỗ ở cả hai nguồn thì giữ bản Overpass (có chi nhánh). Gần nhất trước. */
        fun merge(overpass: List<StoreCandidate>, nominatim: List<StoreCandidate>): List<StoreCandidate> =
            (overpass + nominatim).distinctBy { it.osmId }.sortedWith(compareBy({ it.distanceM }, { it.label }))
    }
}
