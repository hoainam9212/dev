package com.namle.dichochung.stores

import org.junit.Assert.assertEquals
import org.junit.Test

class StoreRadiusTest {

    @Test
    fun effectiveRadius_shrinksStoresSavedWithTheOldWideCircle() {
        assertEquals(60, Store.DEFAULT_RADIUS_M)
        assertEquals(60, Store.effectiveRadius(90))
        assertEquals(60, Store.effectiveRadius(null))
        assertEquals(50, Store.effectiveRadius(50))
    }
}
