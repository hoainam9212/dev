package com.namle.dichochung.stores

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class OverpassParserTest {

    private val here = 35.6646 to 139.8593

    private fun parse(json: String) = OverpassParser.parse(json, here.first, here.second)

    /** Kết quả Overpass thật quanh ga 西葛西 bán kính 100 m (lấy bằng workflow overpass-fixture, 2026-10-27). */
    private fun fixture() = javaClass.getResource("/overpass_nishikasai.json")!!.readText()

    @Test
    fun parse_fixture_returnsNamedSortedByDistance() {
        val list = parse(fixture())
        assertEquals(5, list.size)
        assertEquals(list.sortedBy { it.distanceM }, list)
        assertTrue(list.all { it.distanceM <= 120 })
        assertEquals("ファミリーマート", list.first().label)
        assertTrue(list.any { it.label == "ローソン 西葛西駅南口店" })
        // ワイズマート là way: toạ độ lấy từ center.
        assertTrue(list.any { it.osmId == "way/510390306" && it.label == "ワイズマート" })
    }

    @Test
    fun parse_usesCenterForWays() {
        val json = """{"elements":[
          {"type":"way","id":7,"center":{"lat":35.6650,"lon":139.8593},"tags":{"shop":"supermarket","name":"サミット"}}
        ]}"""
        val c = parse(json).single()
        assertEquals("way/7", c.osmId)
        assertEquals(35.6650, c.lat, 1e-9)
        assertEquals(44.0, c.distanceM.toDouble(), 2.0)
    }

    @Test
    fun parse_skipsUnnamed_sortsByDistance_dedupesOsmId() {
        val json = """{"elements":[
          {"type":"node","id":1,"lat":35.6656,"lon":139.8593,"tags":{"shop":"convenience","name":"ローソン","branch":"西葛西駅前店"}},
          {"type":"node","id":2,"lat":35.6647,"lon":139.8593,"tags":{"shop":"supermarket"}},
          {"type":"node","id":3,"lat":35.6648,"lon":139.8593,"tags":{"shop":"supermarket","name":"まいばすけっと"}},
          {"type":"node","id":1,"lat":35.6656,"lon":139.8593,"tags":{"shop":"convenience","name":"ローソン","branch":"西葛西駅前店"}},
          {"type":"node","id":4,"tags":{"shop":"supermarket","name":"Không toạ độ"}}
        ]}"""
        val list = parse(json)
        assertEquals(listOf("node/3", "node/1"), list.map { it.osmId })
        assertTrue(list[0].distanceM < list[1].distanceM)
    }

    @Test
    fun parse_badJson_isEmpty() {
        assertEquals(emptyList<StoreCandidate>(), parse("<html>rate limited</html>"))
        assertEquals(emptyList<StoreCandidate>(), parse("""{"remark":"timeout"}"""))
    }

    @Test
    fun candidate_label_withAndWithoutBranch() {
        assertEquals("まいばすけっと 西葛西駅前店", StoreCandidate("まいばすけっと", "西葛西駅前店", 0.0, 0.0, 10, "node/1").label)
        assertEquals("まいばすけっと", StoreCandidate("まいばすけっと", null, 0.0, 0.0, 10, "node/1").label)
        // OSM đôi khi đã ghi chi nhánh trong name: không lặp lại.
        assertEquals("ローソン 西葛西駅前店", StoreCandidate("ローソン 西葛西駅前店", "西葛西駅前店", 0.0, 0.0, 10, "node/1").label)
    }
}
