# Brief đợt cuối — tuần 13, 14, 16 + đề thi thử 3 (2026-11-14)

Đợt 1–3 đã soát và gộp vào `nihongo-sensei/master` (492 câu, 400 từ; `mock1`, `mock2` đủ 80 câu). Đợt này chia 4
phiên cloud chạy song song; mỗi phiên tạo file riêng và một nhánh riêng. Dòng import trong các file gộp
(`chokai.ts`, `chodokkai.ts`, `dokkai.ts`, `goi.ts`) có thể xung đột giữa các phiên — phiên local tự giải khi gộp.

Cách dùng: New session → Cloud → repo `hoainam9212/dev`, gõ: *"Đọc
docs/superpowers/plans/2026-11-13-bjt/2026-11-14-brief-last-wave.md trên nhánh nihongo-sensei/master và làm A2"*
(hoặc A3, B4, B5).

| Phiên | Nhánh | Phần việc | Được tạo / sửa |
|---|---|---|---|
| A2 — nghe tuần | `nihongo-sensei/feat/bjt-content-listening-2` | w13, w14, w16: 聴解 10 + 聴読解 9 mỗi tuần = 57 câu | `chokai/w13,w14,w16.ts`, `chodokkai/w13,w14,w16.ts` + dòng của mình trong `chokai.ts`, `chodokkai.ts` |
| A3 — nghe đề 3 | `nihongo-sensei/feat/bjt-content-mock3-listening` | phần nghe của `mock3` = 50 câu | `chokai/mock3.ts`, `chodokkai/mock3.ts` + dòng của mình |
| B4 — đọc tuần + từ | `nihongo-sensei/feat/bjt-content-reading-4` | w13, w14, w16: 13 câu đọc + 40 từ mỗi tuần = 39 câu, 120 từ | `dokkai/w13,w14,w16.ts`, `goi/w13,w14,w16.ts` + dòng của mình trong `dokkai.ts`, `goi.ts` |
| B5 — đọc đề 3 | `nihongo-sensei/feat/bjt-content-mock3-reading` | phần đọc của `mock3` = 30 câu | `dokkai/mock3.ts` + dòng của mình |
| local | `nihongo-sensei/master` | soát, gộp, APK | mọi thứ còn lại |

---

## Phần chung (cả 4 phiên)

```
Repo hoainam9212/dev holds several projects and is PUBLIC. Run `git fetch origin && git checkout
nihongo-sensei/master` first (`main` has only a README). The repo root is then Nihongo Sensei, a
Japanese-learning app for Vietnamese speakers. The learner sits the BJT in March 2027 (target J1 / J1+).
Four cloud sessions work in parallel on this last wave; the table of who owns which file is at the top of
docs/superpowers/plans/2026-11-13-bjt/2026-11-14-brief-last-wave.md. Touch only your own files.

Task: author original BJT practice content for the sets named in your part below. Weeks 1-7, 9-11 and the
tests mock1, mock2 are already on master, written by earlier sessions and reviewed; match their format and
quality, never copy their situations.

Read first, in this order: CLAUDE.md; docs/superpowers/specs/2026-11-13-bjt-design.md (exam structure, volume
per week, authoring rules); data/authored/bjt/plan.ts (theme and goal of each week; week 15 is mock3);
data/authored/bjt/demo.ts (reference item for each section); data/authored/bjt/helpers.ts (item(), vocab());
data/src/bjt.test.ts (what every item and word must satisfy); one existing set of your kind as house style
(listening: chokai/w11.ts + chodokkai/w11.ts and chokai/mock2.ts; reading: dokkai/w11.ts, goi/w11.ts and
dokkai/mock2.ts).

Files: only the ones listed for your part in the table, plus the import lines and spread entries for your own
files in the matching aggregate file(s) (keep the lists in set order). Do not edit index.ts, helpers.ts,
demo.ts, plan.ts, guides.ts, other sets, shared/**, client/**, data/src/** or data/scripts/**. If a type,
helper or test needs a change, do not make it: describe it in your final report.

Level: these are the last weeks before the exam. About 30% of questions at J1+ (implied meaning, a speaker
who disagrees without saying so, two conditions to combine, numbers to compute, keigo nuance, longer
business-news texts); the rest at J1. Reviewers of earlier waves found too few J1+ items in weekly sets: aim
for at least 4 J1+ questions per weekly set and 9-10 per mock half.

Lessons from reviewing 480 earlier questions — avoid these defects:
- A distractor must be WRONG in the context, not just less natural or less polite. Rejected examples:
  検討させてもらいます next to 検討させていただきます; 減少に待ったをかける (a real set phrase) as a
  "wrong" choice; 弊社の不都合 next to 弊社の不手際. Before committing, read each wrong choice and ask
  "could a Japanese office worker say this here?" — if yes, replace it.
- Dates: write the year in the text or compute the weekday for the year you mean; a "（火）" on a date that is a
  Wednesday was found in mock1. Recompute every sum, total, deadline and day count yourself.
- Explanations name choices as "lựa chọn N" (not "câu N"), say why the answer is right and why the most
  tempting wrong choice is wrong; do not give people a gender the text does not state.
- Vietnamese titles: 課長 = "trưởng phòng", 部長 = "trưởng bộ phận" — do not use "tổ trưởng".
- Do not reuse situations already used several times: early train / trip the previous day, booking the
  training room, a manager reviewing a plan, the 「ご苦労様でございました」 distractor, a new hire called Ogawa.
  The right answer must not tend to be the longest choice; spread answers over the four positions.
- Hyogen (reading) items: vary the trick — not every item may hinge on ただし / なお.
- Names and companies are fictional; general Japanese company setting (sales, manufacturing, HR, accounting,
  logistics, IT), not IT only. Everything is your own writing, never copied from real BJT papers or prep books.
  Translate from the Japanese, not via English.

Checks before each commit: `npm install`, then `npm test -w data` and `npm run typecheck -w data` must pass
(data:fetch and data:build are not needed). Then re-read each item as a test-taker: pick your answer before
looking at `answer`; exactly one choice is defensible.

Commits: make sure `git config user.email` is lehoainam.htd@gmail.com before the first commit; English
messages with a body; one commit per set. Push to origin on your branch. Do not merge into master, do not bump
any version, do not build an APK.

Done: branch pushed, tests and typecheck green, final message in Vietnamese: per set the number of items and
questions (and words), how many are J1+, anything you were unsure about, any change you want in shared files.
```

## A2 — nghe, tuần 13, 14, 16

```
Your part: listening for weeks 13, 14 and 16. Per week, following that week's theme in plan.ts:
聴解 2 bamen + 4 hatsugen + 2 sogo-chokai items with 2 questions each (10 questions) and
聴読解 2 jokyo + 3 shiryo + 2 sogo-chodokkai items with 2 questions each (9 questions) = 19 questions per week,
57 in all. Week 14 is about presentations and debate: make the speaker's real position implicit. Week 16 is
the final review: mixed themes across the whole course, exam-like, no new grammar.
Scripts read like real speech (あのう, ～んですが, saying things indirectly), each line with its Vietnamese
translation. bamen and jokyo describe the photo/scene in `material` so the question is answerable from it.
Files: data/authored/bjt/chokai/w13.ts, w14.ts, w16.ts (export W13, W14, W16) and chodokkai/w13.ts, w14.ts,
w16.ts, plus your lines in chokai.ts and chodokkai.ts.
Branch: create nihongo-sensei/feat/bjt-content-listening-2 from nihongo-sensei/master.
```

## A3 — nghe, đề thi thử 3

```
Your part: the listening half of mock3 (week 15, "do it like the real test"), exactly as in the real exam:
聴解 bamen 5 + hatsugen 10 + sogo-chokai 10 questions, 聴読解 jokyo 5 + shiryo 10 + sogo-chodokkai 10
questions = 50 questions. sogo items: several conversations or talks with 2-3 questions each. Mix every theme of
the 16 weeks; difficulty a little above mock2, about a third J1+.
Files: data/authored/bjt/chokai/mock3.ts (export MOCK3) and chodokkai/mock3.ts (export MOCK3), plus your lines
in chokai.ts and chodokkai.ts. Look at chokai/mock2.ts and chodokkai/mock2.ts for how a mock half is laid out.
Branch: create nihongo-sensei/feat/bjt-content-mock3-listening from nihongo-sensei/master.
```

## B4 — đọc + từ vựng, tuần 13, 14, 16

```
Your part: reading and vocabulary for weeks 13, 14 and 16. Per week, following plan.ts: 6 goi items (one blank
each, marked ＿＿＿), 3 hyogen items (one question each, on a short email or notice), 2 sogo-dokkai items with
2 questions each = 13 questions; 39 in all. Week 13 is economic and company news: sogo-dokkai texts in the
style of a business newspaper, cause and effect, figures to read. Week 16 is the final review: mixed themes.
Vocabulary: 40 words or set phrases per week in 2-3 themes (tag in Vietnamese), kana-only reading, Vietnamese
meaning, at least half with an example sentence and its translation. Week 13: economy and management;
week 14: presentations, meetings, debate; week 16: high-value keigo and set phrases still missing from
weeks 1-11. Verbs in dictionary form (参る, 承る) — the test now matches the kanji stem, so a conjugated
example sentence is fine. Before you start, list every word already in data/authored/bjt/goi/*.ts on master
and never repeat one (the test fails on duplicates).
Files: data/authored/bjt/dokkai/w13.ts, w14.ts, w16.ts (export W13…) and goi/w13.ts, w14.ts, w16.ts (export
V13…), plus your lines in dokkai.ts and goi.ts.
Branch: create nihongo-sensei/feat/bjt-content-reading-4 from nihongo-sensei/master.
```

## B5 — đọc, đề thi thử 3

```
Your part: the reading half of mock3, exactly as in the real exam: 10 goi + 10 hyogen + 10 sogo-dokkai
questions = 30; sogo-dokkai as 4-6 texts with 1-3 questions each, at least one long business-news article and
one table or chart to combine with a text. Mix every theme of the 16 weeks; difficulty a little above
dokkai/mock2.ts, about a third J1+. No vocabulary.
Files: data/authored/bjt/dokkai/mock3.ts (export MOCK3), plus your line in dokkai.ts.
Branch: create nihongo-sensei/feat/bjt-content-mock3-reading from nihongo-sensei/master.
```

Sau đợt này: phiên local soát mù cả 4 nhánh, gộp, rồi build APK.
