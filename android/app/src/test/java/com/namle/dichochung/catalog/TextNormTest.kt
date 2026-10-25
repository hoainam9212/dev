package com.namle.dichochung.catalog

import org.junit.Assert.assertEquals
import org.junit.Test

class TextNormTest {

    @Test
    fun fold_removesVietnameseDiacritics() {
        assertEquals("trung ga", TextNorm.fold("Trứng Gà"))
        assertEquals("dau phu", TextNorm.fold("Đậu phụ"))
    }

    @Test
    fun fold_katakanaAndHalfWidthToHiragana() {
        assertEquals("とうふ", TextNorm.fold("トウフ"))
        assertEquals("とうふ", TextNorm.fold("ﾄｳﾌ"))
    }

    @Test
    fun fold_keepsJapaneseDakuten() {
        assertEquals("ぶたにく", TextNorm.fold("ブタニク"))
        assertEquals("じゃがいも", TextNorm.fold("ｼﾞｬｶﾞｲﾓ"))
    }

    @Test
    fun fold_collapsesSpaces() {
        assertEquals("khoai lang", TextNorm.fold("  khoai   lang "))
    }

    @Test
    fun normalizeName_trimsAndCapitalizes() {
        assertEquals("Khoai lang", TextNorm.normalizeName("  khoai   lang "))
    }
}
