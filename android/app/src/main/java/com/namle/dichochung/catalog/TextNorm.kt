package com.namle.dichochung.catalog

import java.text.Normalizer

object TextNorm {
    // Only Latin combining marks: stripping all of \p{M} would also drop the
    // Japanese dakuten (が → か) after NFD.
    private val latinMarks = Regex("[\u0300-\u036F]")
    private val spaces = Regex("\\s+")

    /** Search key: NFKC, lower case, no Vietnamese diacritics, katakana → hiragana, single spaces. */
    fun fold(s: String): String {
        val lower = Normalizer.normalize(s, Normalizer.Form.NFKC).lowercase()
        val noMarks = Normalizer.normalize(
            latinMarks.replace(Normalizer.normalize(lower, Normalizer.Form.NFD), ""),
            Normalizer.Form.NFC,
        ).replace('đ', 'd')
        val hira = buildString(noMarks.length) {
            for (c in noMarks) append(if (c in 'ァ'..'ヶ') c - 0x60 else c)
        }
        return spaces.replace(hira, " ").trim()
    }

    /** Display name: trimmed, single spaces, first letter upper case, diacritics kept. */
    fun normalizeName(s: String): String =
        spaces.replace(s, " ").trim().replaceFirstChar { it.uppercaseChar() }
}
