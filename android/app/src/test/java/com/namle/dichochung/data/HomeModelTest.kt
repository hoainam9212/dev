package com.namle.dichochung.data

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class HomeModelTest {

    @Test
    fun role_other_isOpposite() {
        assertEquals(Role.CHONG, Role.VO.other)
        assertEquals(Role.VO, Role.CHONG.other)
        assertEquals(Role.CHONG, Role.fromKey("chong"))
        assertNull(Role.fromKey("x"))
    }

    @Test
    fun home_partner_returnsOtherMember() {
        val vo = Member("a", Role.VO, "Vợ", null)
        val chong = Member("b", Role.CHONG, "Chồng", null)
        val home = Home("h1", listOf(vo, chong))
        assertEquals(vo, home.me("a"))
        assertEquals(chong, home.partner("a"))
        assertEquals(vo, home.partner("b"))
        assertNull(Home("h1", listOf(vo)).partner("a"))
        assertNull(home.me("z"))
    }
}
