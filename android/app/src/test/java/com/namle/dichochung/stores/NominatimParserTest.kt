package com.namle.dichochung.stores

import org.junit.Assert.assertEquals
import org.junit.Test

class NominatimParserTest {

    private val here = 35.6646 to 139.8593

    private fun parse(json: String) = NominatimParser.parse(json, here.first, here.second)

    @Test
    fun parse_readsNameAndOsmId_nearestFirst() {
        val json = """[
          {"osm_type":"way","osm_id":659033689,"lat":"35.6665913","lon":"139.8590872","name":"オリンピック","display_name":"オリンピック, 葛西橋通り"},
          {"osm_type":"node","osm_id":5,"lat":"35.6650","lon":"139.8593","name":"サミット","display_name":"サミット, 西葛西"}
        ]"""
        val list = parse(json)
        assertEquals(listOf("node/5", "way/659033689"), list.map { it.osmId })
        assertEquals("サミット", list[0].label)
        assertEquals(44.0, list[0].distanceM.toDouble(), 2.0)
    }

    @Test
    fun parse_skipsUnnamed_neverFallsBackToAddress() {
        val json = """[{"osm_type":"node","osm_id":5,"lat":"35.6650","lon":"139.8593","name":"","display_name":"西葛西6丁目, 江戸川区"}]"""
        assertEquals(emptyList<StoreCandidate>(), parse(json))
    }

    @Test
    fun parse_badJson_isEmpty() {
        assertEquals(emptyList<StoreCandidate>(), parse("<html>busy</html>"))
    }

    @Test
    fun merge_keepsOverpassEntryAndDropsDuplicate() {
        val overpass = StoreCandidate("ローソン", "西葛西店", 35.0, 139.0, 50, "node/1")
        val sameInNominatim = StoreCandidate("ローソン", null, 35.0, 139.0, 50, "node/1")
        val other = StoreCandidate("オリンピック", null, 35.0, 139.0, 20, "way/2")
        assertEquals(listOf(other, overpass), StoreFinder.merge(listOf(overpass), listOf(sameInNominatim, other)))
    }
}
