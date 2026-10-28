package com.namle.dichochung.catalog

import java.text.Normalizer

/** Đoán sẵn nhóm + đơn vị cho món mới; người dùng sửa lại nếu sai. */
object Guess {

    /**
     * Nhóm của món kho chung nhiều từ đầu nhất với [name] ("rau ngót" → nhóm của "rau muống").
     * So từ còn giữ dấu trước ("cà" ≠ "cá"), rồi mới đến từ đã bỏ dấu ("trung vit" → "trứng gà").
     * Không chung từ nào → [Category.KHAC].
     */
    fun category(name: String, catalog: List<Item>): Category {
        val exact = words(name, ::lower)
        val folded = words(name, TextNorm::fold)
        if (folded.isEmpty()) return Category.KHAC

        var best: Pair<Int, Int> = 0 to 0
        val votes = mutableMapOf<Category, Int>()
        for (item in catalog) {
            if (item.deleted) continue
            val score = (listOf(item.name) + item.aliases)
                .map { key -> commonPrefix(exact, words(key, ::lower)) to commonPrefix(folded, words(key, TextNorm::fold)) }
                .maxWith(SCORE)
            if (score.second == 0) continue
            val cmp = SCORE.compare(score, best)
            if (cmp > 0) {
                best = score
                votes.clear()
            }
            if (cmp >= 0) votes[item.category] = (votes[item.category] ?: 0) + 1
        }
        // Hoà điểm giữa nhiều nhóm: lấy nhóm có nhiều món khớp hơn, rồi theo thứ tự nhóm.
        return votes.entries.maxWithOrNull(compareBy<Map.Entry<Category, Int>> { it.value }.thenByDescending { it.key.ordinal })?.key
            ?: Category.KHAC
    }

    /** Đơn vị, số lượng mặc định, bước +/- theo nhóm (thịt cá bán theo khay ở siêu thị Nhật — LEDGER Task 5). */
    fun unit(category: Category): Triple<String, Int, Int> = when (category) {
        Category.THIT_CA -> Triple("khay", 1, 1)
        Category.RAU_CU -> Triple("bó", 1, 1)
        Category.HOA_QUA -> Triple("quả", 1, 1)
        Category.TRUNG_SUA -> Triple("hộp", 1, 1)
        Category.GIA_VI, Category.DO_KHO, Category.DO_UONG, Category.KHAC -> Triple("gói", 1, 1)
    }

    private val SCORE = compareBy<Pair<Int, Int>>({ it.first }, { it.second })
    private val spaces = Regex("\\s+")

    private fun lower(s: String) = Normalizer.normalize(s, Normalizer.Form.NFC).lowercase()

    private fun words(s: String, norm: (String) -> String) = norm(s).split(spaces).filter { it.isNotEmpty() }

    private fun commonPrefix(a: List<String>, b: List<String>): Int {
        var n = 0
        while (n < a.size && n < b.size && a[n] == b[n]) n++
        return n
    }
}
