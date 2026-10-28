package com.namle.dichochung.geo

import com.namle.dichochung.stores.Store
import org.junit.Assert.assertEquals
import org.junit.Test

class GeofenceSyncTest {

    private val a = Store("a", "ワイズマート", 35.6653, 139.8587)
    private val b = Store("b", "ローソン", 35.6642, 139.8586)
    private fun registered(vararg s: Store) = s.associate { it.id to GeofenceSync.fingerprint(it) }

    @Test
    fun sync_addsNewStores() {
        assertEquals(GeofenceDiff(add = listOf(b), removeIds = emptyList()), GeofenceSync.diff(registered(a), listOf(a, b)))
    }

    @Test
    fun sync_removesDeletedStores() {
        assertEquals(GeofenceDiff(add = emptyList(), removeIds = listOf("b")), GeofenceSync.diff(registered(a, b), listOf(a)))
    }

    @Test
    fun sync_movedStore_removeAndAdd() {
        val moved = a.copy(lat = 35.6700)
        assertEquals(GeofenceDiff(add = listOf(moved), removeIds = listOf("a")), GeofenceSync.diff(registered(a, b), listOf(moved, b)))
        val bigger = b.copy(radiusM = 150)
        assertEquals(GeofenceDiff(add = listOf(bigger), removeIds = listOf("b")), GeofenceSync.diff(registered(a, b), listOf(a, bigger)))
    }

    @Test
    fun watch_listEmpty_removesAllFences_thenAddsBack() {
        assertEquals(emptyList<Store>(), GeofenceSync.wanted(listOf(a, b), armed = false))
        assertEquals(listOf(a, b), GeofenceSync.wanted(listOf(a, b), armed = true))
        assertEquals(
            GeofenceDiff(add = emptyList(), removeIds = listOf("a", "b")),
            GeofenceSync.diff(registered(a, b), GeofenceSync.wanted(listOf(a, b), armed = false)),
        )
    }

    @Test
    fun sync_renameOnly_noChange() {
        assertEquals(GeofenceDiff(emptyList(), emptyList()), GeofenceSync.diff(registered(a), listOf(a.copy(name = "Y's mart"))))
    }
}
