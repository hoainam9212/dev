# Vietnamese translation style (Nihongo Sensei)

Audience: Vietnamese learners of Japanese, N5 → N1. Translate **from the Japanese**; the English is a reference,
not the source. When the English is wrong or too narrow, follow the Japanese.

## Vocabulary meanings (`vi: string[]`)
- Dictionary style, short: 食べる → "ăn" (not "để ăn", not "việc ăn"). Nouns without articles: 猫 → "con mèo" is
  fine where Vietnamese needs the classifier, else "mèo".
- One array item per sense; keep roughly the English sense count and order (most common first). Merge English
  senses that are the same word in Vietnamese.
- Adjectives: 赤い → "đỏ"; な-adjectives likewise. Counters/suffixes: explain briefly, e.g. 〜枚 → "(đếm vật mỏng: tờ, tấm)".
- Keep loanwords as Vietnamese spells them (tivi, email, cà phê). Katakana names of things → the Vietnamese word.
- No trailing punctuation.

## Kanji meanings (`vi`) and Hán Việt (`hanViet`)
- `vi`: 1–3 short core meanings, e.g. 学 → ["học", "học vấn"].
- `hanViet` is the Hán Việt of the kanji **as Japanese uses it** — never a Nôm/native reading (滝 is LANG/LUNG,
  not "sông"; 猫 is MIÊU, not "mèo") and never the reading of a same-shape Chinese character (芸 is NGHỆ as in
  芸術, not VÂN; 叶 is HIỆP). UPPERCASE; old-style tone placement (HÓA, THỦY); the main reading first, others only
  when Japanese words use them (行 → HÀNH, HÀNG; 楽 → LẠC, NHẠC); at most 3.
- Skeleton has `"hanViet": ""` → the open sources disagreed: pick from `context.hanVietCandidates` (or write the
  right reading if neither list has it).
- Context has `hanVietOpen` → the sources agreed; check it anyway and add a `hanViet` field only to correct it.

## Grammar (`vi`, `examples[].vi`)
- `vi`: the meaning for a learner, with the slot in brackets: 〜たい → "muốn (làm gì)"; 〜ながら → "vừa … vừa …".
- Examples: natural Vietnamese sentences that show the pattern's meaning.

## Sentences (`vi`)
- Natural, spoken-register Vietnamese. Pronouns from context: 私 → "tôi" (or "mình" in casual speech), あなた →
  "bạn", 彼 → "anh ấy", 彼女 → "cô ấy"; unknown gender/age → "người đó" or restructure.
- Keigo → polite Vietnamese (ạ, xin, kính); casual → casual.
- Keep names (Tom → Tom, 田中さん → anh/chị Tanaka), numbers and units.
- End with the same sentence punctuation as the Japanese (。→ ".", ？ → "?").

## Never
- Leave English words that have a normal Vietnamese equivalent.
- Copy the English. Edit `en` snapshots. Add or remove keys from a skeleton.
