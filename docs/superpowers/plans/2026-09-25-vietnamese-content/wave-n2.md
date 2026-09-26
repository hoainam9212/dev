# Wave N2 — copy of wave-checklist

**N2 start (2026-09-26, branch vi/n2 from fa17cfb):** vocab 0/1748 · kanji 0/367 · grammar 0/191 · sentences 352/3737 (Tatoeba 75) · open Hán Việt 326. Sub-wave a → 1.4.0, b → 1.4.1.

# Wave checklist — N4, N3, N2, N1 (same procedure as tasks 05–08, different level)

Copy this file to `wave-<level>.md` when a wave starts, fill in the numbers from
`npm run tr -w data -- status --level <level>`, and track it in STATUS.md (add a line per sub-wave).

**Sizes (2026-09-25):**

| Level | Vocab | Kanji | Grammar | Sentences |
|---|---|---|---|---|
| N4 | 668 | 166 | 124 | 1,795 |
| N3 | 2,139 | 367 | 130 | 5,509 |
| N2 | 1,748 | 367 | 191 | 3,737 |
| N1 | 2,699 | 1,232 | 245 | 5,763 |

Sentences shared with an earlier level are already translated and do not show up in `next`.

**Sub-waves (big levels):** each sub-wave ships its own APK (patch version bump).
- N4: one wave (kanji + grammar → vocab → sentences → release).
- N3: a) kanji + grammar + vocab · b) sentences first half · c) sentences second half.
- N2: a) kanji + grammar + vocab · b) sentences.
- N1: a) kanji (1,232 in batches of 300) + grammar · b) vocab (2,699, ~11 batches) · c) sentences half 1 ·
  d) sentences half 2.
- Kanji batches for N1: pass `--size 300`.

**Per batch:** `tr next --level <l> --type <t>` → read `_work` file → write `translations/<writeTo>` → `tr check`
(0 errors, read warnings) → `tr sample --file <writeTo> --n 20` (fix) → `npm run data:build` (coverage up, no STALE)
→ `npm run typecheck && npm test` → commit `feat(vi): <L> <type> batch k/K (<n>)`.

**Per sub-wave release:** `tr sample --level <l> --n 40` to the user → apply corrections → `ui-check --lang vi`
(vocab, kanji, grammar) → build + sync + bump + `assembleRelease` → verify version, same signing SHA-256,
`meaningsVi` in the APK's `<l>` bundles → `release/NihongoSensei-<version>.apk` → SendUserFile → STATUS + memory.
A whole-branch review is needed only when tooling code changed during the wave.
