package com.namle.dichochung.stores

/** Siêu thị nhà đã lưu (`homes/{id}/stores/{storeId}`); mỗi chỗ là một geofence bán kính [radiusM] (Task 09). */
data class Store(
    val id: String,
    val name: String,
    val lat: Double,
    val lng: Double,
    val radiusM: Int = DEFAULT_RADIUS_M,
    val osmId: String? = null,
) {
    companion object {
        /** Khu 西葛西 siêu thị rất dày nên vòng nhỏ (spec 4.5). */
        const val DEFAULT_RADIUS_M = 90
        const val MAX_NAME = 40
    }
}

/** Một chỗ OpenStreetMap quanh vị trí hiện tại, để chọn khi bấm "Lưu chỗ này là siêu thị". */
data class StoreCandidate(
    val name: String,
    val branch: String?,
    val lat: Double,
    val lng: Double,
    val distanceM: Int,
    val osmId: String,
) {
    /** "まいばすけっと 西葛西駅前店" hoặc "まいばすけっと"; không lặp chi nhánh khi name đã chứa sẵn. */
    val label: String
        get() = if (branch.isNullOrBlank() || name.endsWith(branch)) name else "$name $branch"
}
