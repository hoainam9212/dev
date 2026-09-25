# Task 04 — Build integration, style guide, attribution

Branch `vi/task-04`. Read `00-overview.md` first.

**Files**
- Modify: `data/scripts/build.ts` (overlay + open data step, coverage log, key-uniqueness assert, raw-file guard)
- Create: `data/translations/STYLE.md`, `data/translations/vi/.gitkeep`
- Modify: `.gitignore` (add `data/translations/_work/`)
- Modify: `client/src/pages/SettingsPage.tsx` (four sources, list key by name, new line), `client/src/i18n/vi.ts`,
  `client/src/i18n/en.ts` (`settings.viTranslations`)
- Test: `client/src/pages/SettingsPage.test.tsx` (one new test)

**Interfaces**
- Consumes: task 01 (`HANVIET_RAW`, `loadHanVietSources`, `hanVietFor`, `tatoebaVietnamese`), task 02
  (`readTrFiles`, `toOverlays`, `applyVocab`, `applyKanji`, `applyGrammar`, `applySentences`, `vocabKey`,
  `grammarKey`), `TRANSLATIONS_DIR`, existing `parseLinks`, `parseTsvSentences`.
- Produces: bundles carrying `meaningsVi`, `hanViet`, `meaningVi`, `examples[].vi`, `vi`; `STYLE.md` read by tasks 05–07.

Client display is already covered by existing tests (`KanjiDetail.test.tsx` renders `hanViet` and `meaningsVi`,
`KanjiQuiz.test.tsx` and `ReviewPage.test.tsx` use `meaningsVi`), so the spec's client test is satisfied by them.

- [ ] **Step 1: Failing client test** — append to `client/src/pages/SettingsPage.test.tsx`:

```tsx
it('credits the Hán Việt sources, Tatoeba Vietnamese and the Vietnamese translations', () => {
  render(<MemoryRouter><SettingsPage /></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'KANJIDIC2 (vietnam readings)' })).toHaveAttribute('href', 'https://www.edrdg.org/wiki/index.php/KANJIDIC_Project');
  expect(screen.getByRole('link', { name: 'hanviet-pinyin-wordlist' })).toHaveAttribute('href', 'https://github.com/ph0ngp/hanviet-pinyin-wordlist');
  expect(screen.getByRole('link', { name: 'Unihan (variants)' })).toHaveAttribute('href', 'https://www.unicode.org/charts/unihan.html');
  expect(screen.getByRole('link', { name: 'Tatoeba (vie)' })).toHaveAttribute('href', 'https://tatoeba.org/vie');
  expect(screen.getByText(/Bản dịch tiếng Việt/)).toBeInTheDocument();
});
```

  Run `npx vitest run src/pages/SettingsPage.test.tsx` (in `client/`). Expected: FAIL, no link
  "KANJIDIC2 (vietnam readings)". (If KANJIDIC is already listed under another name, keep that row and add only the
  Vietnamese-readings row; the test names this row.)

- [ ] **Step 2: Attribution.** In `SettingsPage.tsx` append to `SOURCES` (names stay language-neutral: the page is
  covered by the no-Vietnamese-literals guard):

```ts
  { name: 'KANJIDIC2 (vietnam readings)', url: 'https://www.edrdg.org/wiki/index.php/KANJIDIC_Project', license: 'CC BY-SA 4.0' },
  { name: 'hanviet-pinyin-wordlist', url: 'https://github.com/ph0ngp/hanviet-pinyin-wordlist', license: 'MIT' },
  { name: 'Unihan (variants)', url: 'https://www.unicode.org/charts/unihan.html', license: 'Unicode License' },
  { name: 'Tatoeba (vie)', url: 'https://tatoeba.org/vie', license: 'CC BY 2.0 FR' },
```

  Change the list item key from `key={s.url}` to `key={s.name}` (two Tatoeba rows would otherwise share a domain-based
  key if a URL is ever reused). Under the existing `<p>{t.settings.authored}</p>` add
  `<p className="text-xs text-muted">{t.settings.viTranslations}</p>`. Dictionary entries (next to `authored`):

```ts
// vi.ts
    viTranslations: 'Bản dịch tiếng Việt (nghĩa từ, kanji, ngữ pháp, câu ví dụ) do Nihongo Sensei biên soạn, có hỗ trợ AI; âm Hán Việt lấy nơi KANJIDIC2 và hanviet-pinyin-wordlist khớp nhau, phần còn lại do Nihongo Sensei soát.',
// en.ts
    viTranslations: 'Vietnamese translations (meanings, kanji, grammar, example sentences) are written by Nihongo Sensei with AI assistance; Hán Việt taken where KANJIDIC2 and hanviet-pinyin-wordlist agree, the rest reviewed by Nihongo Sensei.',
```

  Run the test → PASS; run `npx vitest run src/i18n` → PASS (guard: no Vietnamese literal added to the page).

- [ ] **Step 3: Build integration** — in `data/scripts/build.ts`:

  Imports:

```ts
import { RAW_DIR, OUT_DIR, TRANSLATIONS_DIR } from './sources';
import { HANVIET_RAW, loadHanVietSources, hanVietFor, tatoebaVietnamese } from '../src/opendata';
import { readTrFiles, toOverlays, applyVocab, applyKanji, applyGrammar, applySentences, vocabKey, grammarKey } from '../src/translate';
```

  Right after `const byId = new Map(pool.map((s) => [s.id, s]));` insert:

```ts
  for (const f of [...HANVIET_RAW, 'tatoeba/vie_sentences.tsv', 'tatoeba/jpn-vie_links.tsv']) {
    assert(fs.existsSync(path.join(RAW_DIR, f)), `missing raw/${f} — run npm run data:fetch`);
  }
  const dupes = (keys: string[]) => keys.filter((k, i, all) => all.indexOf(k) !== i);
  const seenV = new Set<string>();
  const dupV = vocab.map(vocabKey).filter((k) => (seenV.has(k) ? true : (seenV.add(k), false)));
  assert(dupV.length === 0, `duplicate vocab keys: ${dupV.slice(0, 5).join(', ')}`);
  const dupG = dupes(grammar.map(grammarKey));
  assert(dupG.length === 0, `duplicate grammar keys: ${dupG.slice(0, 5).join(', ')}`);

  const overlays = toOverlays(readTrFiles(TRANSLATIONS_DIR));
  const hanVietSources = loadHanVietSources(RAW_DIR);
  const vieByJpn = tatoebaVietnamese(parseLinks(read('tatoeba/jpn-vie_links.tsv')), parseTsvSentences(read('tatoeba/vie_sentences.tsv')));
  const reports = {
    vocab: applyVocab(vocab, overlays.vocab),
    kanji: applyKanji(kanji, overlays.kanji, (ch) => hanVietFor(ch, hanVietSources).value),
    grammar: applyGrammar(grammar, overlays.grammar),
    sentences: applySentences(pool, overlays.sentences, vieByJpn),
  };
  console.log('vi: hanViet open', reports.kanji.hanVietOpen, '· file', reports.kanji.hanVietFile, '· missing', reports.kanji.hanVietMissing.length,
    '· sentences tatoeba', reports.sentences.fromOpen, '· file', reports.sentences.fromFile);
  for (const [type, r] of Object.entries(reports)) {
    if (r.stale.length) console.warn(`STALE ${type} (${r.stale.length}): ${r.stale.slice(0, 10).join(', ')} — re-translate; see npm run tr -w data -- check`);
  }
```

  (Grammar keys are few, so the simple `dupes` is fine there; vocab uses the Set to stay linear.)

  Inside the per-level loop, after the existing `console.log(l, { vocab: … })`, add:

```ts
    const n = <T>(xs: T[], has: (x: T) => unknown) => `${xs.filter(has).length}/${xs.length}`;
    console.log(l, 'vi', {
      vocab: n(v, (x) => x.meaningsVi),
      kanji: n(k, (x) => x.meaningsVi),
      hanViet: n(k, (x) => x.hanViet),
      grammar: n(g, (x) => x.meaningVi),
      examples: n(g.flatMap((x) => x.examples), (x) => x.vi),
      sentences: n(s, (x) => x.vi),
    });
```

- [ ] **Step 4: Build** — `npm run data:build`. Expected: the `vi:` line with `hanViet open =` the task 01 number,
  `file 0`, Tatoeba sentence count > 0; per-level `vi` lines with `vocab 0/718` etc. and non-zero `hanViet` and
  `sentences`; no `STALE`, no `BUILD FAILED`. Then `npm run tr -w data -- status` now shows the Tatoeba-covered
  sentences as done. Record the numbers in the ledger.

  Review Focus 1 check: temporarily rename `data/raw/kanjidic2.xml` to `kanjidic2.xml.bak`, run `npm run data:build`
  → `BUILD FAILED: missing raw/kanjidic2.xml — run npm run data:fetch`; rename it back.

- [ ] **Step 5: Style guide + folders.** Add `data/translations/_work/` to `.gitignore`; create
  `data/translations/vi/.gitkeep` (empty) and `data/translations/STYLE.md`:

```markdown
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
```

- [ ] **Step 6: Check command** → green (the data test `translations.test.ts` runs against the fresh build with
  0 files). **Commit** `feat(data): merge Vietnamese translations and open data into the bundles` + STATUS (fill
  03's sha, line 04); ff `master`.
