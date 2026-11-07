package com.namle.dichochung.catalog

data class SearchResult(val matches: List<Item>, val suggestions: List<Item>)

class ItemSearch(items: List<Item>) {

    private class Entry(val item: Item, val keys: List<String>)

    private val entries = items.filterNot { it.deleted }.map { item ->
        Entry(item, (listOf(item.name) + item.aliases + listOfNotNull(item.nameJa)).map(TextNorm::fold).distinct())
    }

    private val byPopularity = compareByDescending<Item> { it.sendCount }.thenBy { TextNorm.fold(it.name) }

    fun search(query: String, limit: Int = 20): SearchResult {
        val q = TextNorm.fold(query)
        if (q.isEmpty()) return SearchResult(entries.map { it.item }.sortedWith(byPopularity).take(limit), emptyList())

        val (matched, rest) = entries.partition { e -> e.keys.any { q in it } }
        val matches = matched
            .sortedWith(compareBy<Entry> { e -> if (e.keys.any { it.startsWith(q) || " $q" in it }) 0 else 1 }
                .thenComparator { a, b -> byPopularity.compare(a.item, b.item) })
            .map { it.item }
            .take(limit)

        // Đếm chữ cái, không đếm dấu cách: "la he" chỉ có 4 chữ, cho lệch 2 là ra cả "ca phe".
        val maxDist = if (q.count { it != ' ' } <= 5) 1 else 2
        val suggestions = if (q.length < 2) emptyList() else rest
            .mapNotNull { e -> e.keys.minOf { closestDistance(q, it) }.takeIf { it <= maxDist }?.let { e to it } }
            .sortedWith(compareBy<Pair<Entry, Int>> { it.second }.thenComparator { a, b -> byPopularity.compare(a.first.item, b.first.item) })
            .map { it.first.item }
            .take(limit)
        return SearchResult(matches, suggestions)
    }

    /** An existing item whose name or alias folds to [name] or is one edit away from it. */
    fun findDuplicate(name: String): Item? {
        val n = TextNorm.fold(name)
        if (n.isEmpty()) return null
        return entries.firstOrNull { e -> e.keys.any { it == n } }?.item
            ?: entries.firstOrNull { e -> e.keys.any { levenshtein(n, it) <= 1 } }?.item
    }

    /** Distance from [q] to the whole key or to any run of words in it with as many words as [q]. */
    private fun closestDistance(q: String, key: String): Int {
        val qWords = q.split(' ').size
        val words = key.split(' ')
        var best = levenshtein(q, key)
        if (words.size > qWords) {
            for (i in 0..words.size - qWords) {
                best = minOf(best, levenshtein(q, words.subList(i, i + qWords).joinToString(" ")))
            }
        }
        return best
    }

    private fun levenshtein(a: String, b: String): Int {
        var prev = IntArray(b.length + 1) { it }
        var cur = IntArray(b.length + 1)
        for (i in 1..a.length) {
            cur[0] = i
            for (j in 1..b.length) {
                val cost = if (a[i - 1] == b[j - 1]) 0 else 1
                cur[j] = minOf(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
            }
            val t = prev; prev = cur; cur = t
        }
        return prev[b.length]
    }
}
