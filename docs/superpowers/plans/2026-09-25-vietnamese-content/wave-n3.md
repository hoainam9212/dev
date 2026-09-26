# Wave checklist — N4, N3, N2, N1 (same procedure as tasks 05–08, different level)

**N3 start (2026-09-26, branch vi/n3 from 2b5d34b):** vocab 0/2139 · kanji 0/367 · grammar 0/130 · sentences 608/5509 (Tatoeba 159) · open Hán Việt 323. Sub-wave a → 1.3.0, b → 1.3.1, c → 1.3.2.

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
