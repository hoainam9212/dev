# Brief B (làm lại, chia 3 phần) — đề đọc 読解 + từ vựng BJT

Brief B cũ (tuần 1–4) chưa từng được đẩy lên. Phần nghe (cloud A) đã có tuần 1–7, 9–11 và phần nghe của
`mock1`, `mock2`, nên phần đọc làm theo đúng các bộ đó. Ba phiên B1, B2, B3 chạy song song được: mỗi phiên tạo
file tuần của mình và một nhánh riêng. Cả ba cùng thêm dòng vào `dokkai.ts` / `goi.ts` — chuyện xung đột ở hai
file gộp đó phiên local tự giải khi gộp.

Cách dùng: New session → Cloud → repo `hoainam9212/dev`, gõ: *"Đọc
docs/superpowers/plans/2026-11-13-bjt/2026-11-14-brief-b-reading.md trên nhánh nihongo-sensei/master và làm B2"*
(hoặc dán nguyên khối chung + khối B2).

---

## Phần chung (cả B1, B2, B3)

```
Repo hoainam9212/dev holds several projects and is PUBLIC. Run `git fetch origin && git checkout
nihongo-sensei/master` first (`main` has only a README). The repo root is then Nihongo Sensei, a
Japanese-learning app for Vietnamese speakers. The user sits the BJT in March 2027 (target J1 / J1+).
Several sessions work in parallel and must not touch each other's files (table in
docs/superpowers/plans/2026-11-13-bjt/2026-11-14-cloud-briefs.md).

Task: author original BJT reading practice content (読解: 語彙・文法 goi, 表現読解 hyogen, 総合読解 sogo-dokkai)
and business vocabulary, for the sets named in your part below.

Read first, in this order: CLAUDE.md, docs/superpowers/specs/2026-11-13-bjt-design.md (exam structure, volume
per week, authoring rules), data/authored/bjt/demo.ts (reference item for each section),
data/authored/bjt/helpers.ts (item() and vocab() builders), data/authored/bjt/plan.ts (theme of each week),
data/src/bjt.test.ts (what every item and word must satisfy). Look at one listening week on branch
origin/nihongo-sensei/feat/bjt-content-listening (e.g. data/authored/bjt/chokai/w03.ts) for the house style of
explanations; do not copy its situations.

Files you may change — nothing else:
- new files data/authored/bjt/dokkai/<set>.ts (export W01… or MOCK1…: BjtItem[]) for your sets only
- new files data/authored/bjt/goi/<set>.ts (export V01…: BjtVocab[]) for your weeks only
- data/authored/bjt/dokkai.ts and goi.ts: only add the import lines and spread entries for your own files
  (other sessions add theirs; keep the lists in set order)
Do not edit index.ts, helpers.ts, demo.ts, plan.ts, guides.ts, chokai*, chodokkai*, shared/**, client/**,
data/src/** or data/scripts/**. If the types, helper or test need a change, do not make it: describe it in your
final report.

Per weekly set (follow that week's theme in plan.ts):
- 読解: 6 goi items (one blank each, marked ＿＿＿), 3 hyogen items (1 question each, on a short email or notice),
  2 sogo-dokkai items with 2 questions each on a longer text = 13 questions.
- Vocabulary: 40 words or set phrases in 2–3 themes (tag in Vietnamese), each with a kana-only reading and a
  Vietnamese meaning; at least half with an example sentence and its Vietnamese translation. Skip plain N4–N5
  words: business vocabulary, keigo set phrases, email formulas a J1 candidate needs. Before you start, list the
  words already on master and on the other reading branches (git fetch, then grep) and never repeat a word.
Per mock set (the reading part of a full timed test): 10 goi + 10 hyogen + 10 sogo-dokkai questions, exactly as
in the real test; sogo-dokkai as 4–6 texts with 1–3 questions each; about a third of the questions at J1+ level
(implied meaning, two conditions to combine, keigo nuance). No vocabulary for mock sets.

Quality rules (full list in the spec): everything is your own writing, never copied from real BJT papers or prep
books; goi distractors are near-synonyms with a different nuance, wrong keigo direction, or the wrong member of a
transitive/intransitive pair; hyogen and sogo-dokkai texts read like real Japanese business documents (emails,
internal notices, minutes, short business-news pieces) with wrong choices that are half right or miss an
exception after ただし / なお; explain is Vietnamese, names the choice by its number 1–4 (answer in the data is
0-based), says why the answer is right and why the most tempting wrong choice is wrong; names and companies are
fictional; spread the correct answers over the four positions; 2–4 points per item with kana-only readings.
Translate from the Japanese, not via English. General Japanese company setting (sales, manufacturing, HR,
accounting, IT), not IT only.

Checks before each commit: npm install, then `npm test -w data` and `npm run typecheck -w data` must pass
(data:fetch and data:build are not needed). Re-read each item as a test-taker: pick your answer before looking
at `answer`; exactly one choice is defensible.

Commits: make sure `git config user.email` is lehoainam.htd@gmail.com before the first commit; English messages
with a body; one commit per set. Push to origin on your branch below. Do not merge into master, do not bump any
version, do not build an APK.

Done: branch pushed with all your sets, tests and typecheck green, and a final message in Vietnamese listing
items, questions and words per set, anything you were unsure about, and any change you want in shared files.
```

## B1

```
Your part: sets w01, w02, w03, w04 (52 questions, 160 words).
Branch: create nihongo-sensei/feat/bjt-content-reading-1 from nihongo-sensei/master.
```

## B2

```
Your part: sets w05, w06, w07 (39 questions, 120 words) and the reading part of mock1 (30 questions).
Branch: create nihongo-sensei/feat/bjt-content-reading-2 from nihongo-sensei/master.
```

## B3

```
Your part: sets w09, w10, w11 (39 questions, 120 words) and the reading part of mock2 (30 questions).
Branch: create nihongo-sensei/feat/bjt-content-reading-3 from nihongo-sensei/master.
```

Sau ba phần này còn: tuần 13, 14, 16 + `mock3` cho cả nghe (A) và đọc (B) — đợt cuối.
