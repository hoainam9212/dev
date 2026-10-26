package com.namle.dichochung.data

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class HomeModelTest {

    @Test
    fun role_fromKey_andDefaultName() {
        assertEquals(Role.CHONG, Role.fromKey("chong"))
        assertEquals(Role.CON, Role.fromKey("con"))
        assertNull(Role.fromKey("x"))
        assertEquals(listOf("vo", "chong", "con", "ong", "ba", "khac"), Role.entries.map { it.key })
        assertEquals("Con", Role.CON.defaultName)
        assertEquals("Người nhà", Role.KHAC.defaultName)
    }

    @Test
    fun home_others_excludesMe() {
        val vo = Member("a", Role.VO, "Vợ", null)
        val chong = Member("b", Role.CHONG, "Chồng", null)
        val con = Member("c", Role.CON, "Bé Na", null)
        val home = Home("h1", listOf(vo, chong, con))
        assertEquals(vo, home.me("a"))
        assertEquals(listOf(chong, con), home.others("a"))
        assertEquals(listOf(vo, chong), home.others("c"))
        assertEquals(emptyList<Member>(), Home("h1", listOf(vo)).others("a"))
        assertNull(home.me("z"))
    }

    @Test
    fun home_isFull_atSixMembers() {
        val members = List(6) { Member("u$it", Role.CON, "Con", null) }
        assertEquals(6, Home.MAX_MEMBERS)
        assertFalse(Home("h1", members.take(5)).isFull)
        assertTrue(Home("h1", members).isFull)
    }
}
