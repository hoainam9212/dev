# Vietnamese content translation — design

Date: 2026-09-25 · Status: approved in chat, awaiting spec review · App version at start: 1.0.11
Revised 2026-09-25 (after task 01's audit): Hán Việt source changed from Unihan `kVietnamese` to the two-source rule.

## Goal

In Vietnamese mode, learners see Vietnamese meanings, Hán Việt readings, grammar explanations and example-sentence
translations instead of English. The display-language phase (1.0.11) already routes all content through pickers
(`vocabMeanings`, `kanjiMeanings`, `grammarMeaning`, `exampleTranslation`, `sentenceTranslation`) that prefer the
`…Vi` fields and fall back to English. **This project only adds data**: translation files, a build step that merges
them into the content bundles, tooling to produce and check them, and attribution. No component changes are
expected beyond a small test.

Success criteria:

1. After a level's wave ships, every vocab, kanji, grammar pattern, grammar example and example sentence of that
   level shows Vietnamese in VI mode (coverage 100% for that level, reported by the build).
2. Every kanji of a shipped level shows a Hán Việt reading (uppercase, e.g. 一 → NHẤT).
3. English mode is unchanged.
4. Translations survive `data:fetch` + `data:build` from a fresh clone (they live in git, not in built bundles).
5. A broken or stale translation fails `npm test` (or warns, for stale) instead of shipping silently.

## Scope (surveyed 2026-09-25)

| Level | Vocab | Kanji | Grammar patterns | Grammar examples | Sentences | Total |
|---|---|---|---|---|---|---|
| N5 | 718 | 79 | 136 | 136 | 1,833 | ~2,900 |
| N4 | 668 | 166 | 124 | 124 | 1,795 | ~2,900 |
| N3 | 2,139 | 367 | 130 | 132 | 5,509 | ~8,300 |
| N2 | 1,748 | 367 | 191 | 191 | 3,737 | ~6,200 |
| N1 | 2,699 | 1,232 | 245 | 245 | 5,763 | ~10,200 |

Out of scope: English versions of Vietnamese-authored content (reading, listening, business, kana mnemonics) —
the opposite direction, a separate project if wanted. No UI change to show both languages at once.

## Decisions (from the brainstorm)

- **Translator:** Claude translates in working sessions; translations are committed JSON files. No API script, no
  paid service. Open data is used where it exists (Hán Việt where two open sources agree, Vietnamese sentences
  from Tatoeba).
- **Waves by JLPT level:** N5 → N4 → N3 → N2 → N1, each shipped as its own APK. Large levels (N3, N2, N1) are
  split into sub-waves that each ship when done (e.g. N3a vocab + kanji, N3b grammar, N3c/N3d sentences in halves).
- **Display:** VI mode shows Vietnamese where a translation exists, English otherwise (already built).

## Design

### Storage — overlay files merged at build (approach A)

```
data/translations/
  STYLE.md                       # translation style guide (written before the first batch)
  vi/<level>/vocab-001.json      # one file per batch; the build reads every file in the folder
  vi/<level>/kanji-001.json
  vi/<level>/grammar-001.json
  vi/<level>/sentences-001.json
  _work/                         # git-ignored: batches exported for translation
```

Rejected: writing into the built bundles (git-ignored, overwritten by every build).

**Keys are stable natural keys, not generated ids** (`v-n5-0001` is assigned by CSV row order and shifts if the
source changes):

| Type | Key | Entry fields |
|---|---|---|
| vocab | `word|reading` | `vi: string[]`, `en: string[]` (English snapshot) |
| kanji | the character | `vi: string[]`, `hanViet?: string`, `en: string[]` |
| grammar | `level|title` | `vi: string`, `examples: { ja, vi }[]`, `en: string` |
| sentence | Tatoeba sentence id (number) | `vi: string`, `en: string` |

Each file: `{ "type": "vocab", "level": "N5", "entries": { "<key>": { … } } }`.

Keys were checked unique on 2026-09-25 (vocab `word|reading` and grammar titles per level, all levels). The build
asserts uniqueness of the source keys, so a future duplicate fails the build instead of mis-assigning a translation.

The `en` snapshot records what was translated. When the source English no longer matches, the build warns
"stale" and still applies the translation; `tr status` lists stale entries for re-translation.

### Sources and precedence

- **Hán Việt** must be the reading of the character *as Japanese uses it*, never a Nôm (native Vietnamese) reading
  and never the reading of an unrelated Chinese character that shares the shape. Two open sources, used together:
  - KANJIDIC2 `reading r_type="vietnam"` (EDRDG, CC BY-SA 4.0) — keyed by the Japanese character and covers every
    JLPT kanji, but lists readings unordered and mixes in Nôm (滝 "Sông") and a few Chinese-sense readings (芸 "Vân").
  - `hanviet.csv` from ph0ngp/hanviet-pinyin-wordlist (MIT; compiled from Thiều Chửu, Trần Văn Chánh and other
    Hán Việt dictionaries) — Hán Việt only, in a sensible order, but keyed by the **traditional** character. A
    shinjitai is looked up through its Unihan `kJapaneseOldVariant` form first (芸 → 藝 "nghệ", 気 → 氣 "khí"), then
    as itself. Chinese simplified↔traditional links (`kTraditionalVariant`) are not used: they map Japanese kanji
    to unrelated characters (叶 → 葉, 机 → 機).
  - `hanviet.csv` has one row per Mandarin reading (行: `hang2` → hàng, hạng; `xing2` → hành, hạnh). Rows are
    ordered with the row matching the character's Unihan `kMandarin` (its most common reading) first, the rest in
    file order — this puts 読/讀 `du2` "đọc, độc" before `dou4` "đậu".
  - **Rule:** when the first readings of both sources agree (compared independent of tone-mark placement, so
    "thuỷ" = "Thủy"), the kanji gets the `hanviet.csv` readings that KANJIDIC2 also lists, at most 3, spelled as
    KANJIDIC2 spells them (old-style tone placement: HÓA, THỦY). Otherwise it gets none from open data and the
    kanji batch shows both candidate lists for the translator to decide.
  - Measured 2026-09-25 (task 01 records the final numbers): the sources agree on ≈1,930 of 2,211 JLPT kanji; on
    95 hand-checked hard characters no agreed value was wrong. Agreement is still not proof, so kanji batches
    show the agreed value for review and a translation file `hanViet` overrides it.
  - Rejected: Unihan `kVietnamese` — it mixes Nôm readings into the field (渡 "đò", 低 "đây", 校 "chò giâu hiệu",
    about 15–20% of JLPT kanji wrong). Sources built on hvdic.thivien.net (KanjiDictVN) — not openly licensed.
  Stored uppercase; multiple readings joined with `, `.
- **Sentences:** Tatoeba Vietnamese translations linked to the Japanese sentence (`vie_sentences.tsv`,
  `jpn-vie_links.tsv`, CC BY 2.0 FR) are used first; the rest are translated from the Japanese with the English as
  a reference.
- **Everything else:** translation files.
- **Precedence when merging:** translation file → open data → nothing (English shown). A translation file entry
  therefore overrides a weak Tatoeba translation.

### Build (`data/scripts/build.ts`)

A pure `applyVietnamese(bundle, overlays, openData)` step per type after the existing build, writing
`meaningsVi` (vocab, kanji), `hanViet` (kanji), `meaningVi` + `examples[].vi` (grammar), `vi` (sentences). The build
logs per level, e.g. `n5 vocab vi 718/718 · kanji hanViet 79/79 (open 70, file 9) · stale 0`.
`fetch.ts`/`sources.ts` gain KANJIDIC2, `hanviet.csv` (pinned commit), Unihan.zip (`Unihan_Variants.txt` and
`Unihan_Readings.txt`, the latter for `kMandarin`) and the two Tatoeba files (into `raw/`, git-ignored, like today).

### Tooling (`npm run tr -w data -- <command>`)

- `status [--level n5]` — coverage per level × type, Tatoeba/open Hán Việt counts, stale entries.
- `next --level n5 --type vocab [--size 250]` — writes the next batch of untranslated items to `_work/` with the
  key, Japanese, reading, English and context (tags, component kanji, an example sentence) and the file name to
  write the translation to.
- `check` — validates every translation file (also run as a vitest test, so `npm test` fails on bad data).
  **Errors** (fail the test): unknown key for its type/level; file in the wrong level folder or with the wrong
  type prefix; duplicate key across files; empty strings; identical to the English; missing English snapshot;
  grammar examples not matching the source (count and Japanese); Hán Việt not uppercase.
  **Warnings** (printed, reviewed by eye after each batch): stale English snapshot; text with no Vietnamese letter
  that is not made of allow-listed loanwords ("tivi", "email", "OK"…) — a warning, not an error, because many
  Vietnamese words have no diacritics ("hai", "ba", "con"); translation much longer than the English.
- `sample` — prints N random entries (Japanese / English / Vietnamese) from a file or a level, spread across
  types, for the 20-item self review and the 40-item user sample.

### Batches and quality

- Batch size: ~250 vocab, ~300 sentences, or a level's whole kanji/grammar set. One batch = one file = one commit.
- `STYLE.md` rules: dictionary-style short glosses (食べる → "ăn", not "để ăn"); one array item per sense, roughly
  the English sense count; natural sentence translations with context-appropriate pronouns; names kept; keigo
  rendered with polite Vietnamese; grammar meanings written for learners (〜たい → "muốn (làm gì)"); Hán Việt
  uppercase.
- After each batch: re-read 20 random items against the Japanese and fix before committing.
- After each level (or sub-wave): send the user 40 sample items across types, plus the APK for a phone check.
- Cadence: 2–3 batches per session (short sessions).

### Testing

- `data`: unit tests for `applyVietnamese` (key match, stale detection, precedence, uppercase Hán Việt), for the
  Hán Việt rule (agreement, Japanese old-variant lookup, tone-placement-independent match, no value on
  disagreement), for `check`, and a test that runs `check` over all of `translations/vi`.
- `client`: one test rendering kanji detail and a vocab card from a fixture with `hanViet` + `meaningsVi` in VI mode.
- Release check: `unzip -p <apk> assets/public/content/vocab/n5.json | grep meaningsVi`.

### Attribution

Settings › Data sources gains KANJIDIC2 Vietnamese readings (CC BY-SA 4.0), hanviet-pinyin-wordlist (MIT),
Unihan variants (Unicode License) and "Tatoeba (Vietnamese translations)" plus a line
"Vietnamese translations: written by Nihongo Sensei (AI-assisted)" (dictionary text in both languages).

## Roadmap

| Wave | Content | Items | APK |
|---|---|---|---|
| 0 | Tooling: fetch Hán Việt sources + Tatoeba VI, overlay build, `tr status/next/check`, STYLE.md, attribution | — | no |
| 1 | N5 (all types) | ~2,900 | 1.1.0 |
| 2 | N4 (all types) | ~2,900 | 1.1.1 |
| 3 | N3, split into sub-waves | ~8,300 | one per sub-wave |
| 4 | N2, split into sub-waves | ~6,200 | one per sub-wave |
| 5 | N1, split into sub-waves | ~10,200 | one per sub-wave |

One spec for the project. A detailed implementation plan covers waves 0 and 1; each later wave gets a short
checklist file (same steps, different level) written when it starts.

## Risks

- **Translation quality at scale:** mitigated by STYLE.md, the automated check, the 20-item self review per batch
  and the user's 40-item sample per level.
- **Hán Việt correctness:** open data only where two sources agree; disagreements (~280 of 2,211) and a review
  of agreed values go through the kanji batches; the build reports how many came from open data and from files.
- **Tatoeba Vietnamese quality varies:** a translation-file entry overrides it; the sample review includes some.
- **Source drift:** natural keys + English snapshot → stale warnings, not silent mismatches.
