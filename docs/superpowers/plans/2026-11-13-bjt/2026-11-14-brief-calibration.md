# Brief soạn lại theo đề chính thức — F, R1–R6 (2026-11-14)

Nội dung BJT tự soạn (w01–w16, mock1–mock3, 668 câu) đúng đáp án nhưng lệch khung đề thật ở vài dạng. Quy tắc
mới nằm ở `docs/superpowers/specs/2026-11-13-bjt-design.md`, mục **"Hiệu chỉnh theo đề chính thức"** (12 quy
tắc). Test chặt đã có sẵn trong `data/src/bjt.test.ts` (`calibrationErrors`). Test chỉ áp cho các bộ được ghi
trong danh sách `CHOKAI_CALIBRATED` / `CHODOKKAI_CALIBRATED` / `DOKKAI_CALIBRATED` ở đầu các file gom
`chokai.ts`, `chodokkai.ts`, `dokkai.ts`.

Cách dùng: New session → Cloud → repo `hoainam9212/dev`, gõ: *"Đọc
docs/superpowers/plans/2026-11-13-bjt/2026-11-14-brief-calibration.md trên nhánh nihongo-sensei/master và làm R1"*
(hoặc F, R2…R6).

**Mức "Sửa thiết yếu"** = F + R1 + R2 + R3: ba đề thi thử đúng khung đề thật. **Mức "Làm lại toàn bộ"** = thêm
R4a, R4b, R5, R6: các tuần luyện. Mọi phiên chạy song song được, vì không phiên nào sửa file của phiên khác.

| Phiên | Nhánh | Phần việc | Được sửa |
|---|---|---|---|
| F — giao diện | `nihongo-sensei/feat/bjt-position-marks` | hiển thị vị trí 【1】–【4】 và bảng dạng lưới | `client/src/pages/bjt/**`, `client/src/i18n/*` (nếu cần) |
| R1 — nghe, đề | `nihongo-sensei/feat/bjt-cal-chokai-mocks` | 聴解 của mock1–3: `hatsugen`, `sogo-chokai` (soát `bamen`) | `chokai/mock1,mock2,mock3.ts` + mảng `CHOKAI_CALIBRATED` |
| R2 — nghe đọc, đề | `nihongo-sensei/feat/bjt-cal-chodokkai-mocks` | 聴読解 của mock1–3: `jokyo`, `sogo-chodokkai`, quy tắc 9 cho `shiryo` | `chodokkai/mock1,mock2,mock3.ts` + mảng `CHODOKKAI_CALIBRATED` |
| R3 — đọc, đề | `nihongo-sensei/feat/bjt-cal-dokkai-mocks` | 読解 của mock1–3: `hyogen`, `sogo-dokkai` | `dokkai/mock1,mock2,mock3.ts` + mảng `DOKKAI_CALIBRATED` |
| R4a — nghe, tuần | `nihongo-sensei/feat/bjt-cal-chokai-weeks-1` | 聴解 w01–w07: `hatsugen`, `sogo-chokai` | `chokai/w01…w07.ts` + mảng `CHOKAI_CALIBRATED` |
| R4b — nghe, tuần | `nihongo-sensei/feat/bjt-cal-chokai-weeks-2` | 聴解 w09–w11, w13, w14, w16: như R4a | `chokai/w09…w16.ts` + mảng `CHOKAI_CALIBRATED` |
| R5 — nghe đọc, tuần | `nihongo-sensei/feat/bjt-cal-chodokkai-weeks` | 聴読解 cả 13 tuần: `jokyo`, `sogo-chodokkai` | `chodokkai/w*.ts` + mảng `CHODOKKAI_CALIBRATED` |
| R6 — đọc, tuần | `nihongo-sensei/feat/bjt-cal-dokkai-weeks` | 読解 cả 13 tuần: `hyogen`, `sogo-dokkai` | `dokkai/w*.ts` + mảng `DOKKAI_CALIBRATED` |
| local | `nihongo-sensei/master` | soát mù, gộp, APK khi người dùng bảo | mọi thứ còn lại |

R4a và R4b cùng thêm vào `CHOKAI_CALIBRATED`; khi gộp, phiên local tự giải xung đột của dòng đó.

---

## Phần chung cho R1–R6

```
Repo hoainam9212/dev holds several projects and is PUBLIC. Run `git fetch origin && git checkout
nihongo-sensei/master` first (`main` has only a README). The repo root is then Nihongo Sensei, a
Japanese-learning app for Vietnamese speakers. The learner sits the BJT in March 2027 (target J1 / J1+).

Task: REWRITE existing BJT practice items so they match the real exam's frame. The current items have
correct answers but several sections were built in the wrong frame or too short and too easy. You rewrite
only the sections named for your part; leave the other sections of your files as they are.

Read first, in this order: CLAUDE.md; docs/superpowers/specs/2026-11-13-bjt-design.md, ESPECIALLY the section
"Hiệu chỉnh theo đề chính thức (2026-11-14)" — its 12 rules override older rules above it;
data/authored/bjt/guides.ts (what the learner is told about each section; already updated to the new frame);
data/src/bjt.test.ts (calibrationErrors = exactly what the test checks); data/authored/bjt/helpers.ts;
the files you rewrite.

Keep: item ids for items you keep, the set, the week theme from plan.ts, the total number of QUESTIONS per
section per set (mock: the real count, 5/10/10; week: same count as now). For 総合 sections the frame changes
from 2 questions per item to ONE question per item, so you write more items: ids continue the numbering
(bjt-mock1-sogo-chokai-01 … -10). Drop the old 2-question items you replace; do not keep both.

Write NEW situations; do not copy anything from a real BJT test or prep book. Japanese is natural business
Japanese; listening scripts sound spoken (あのう, ～んですが, self-correction, talking around a refusal).
Each script line has a Vietnamese translation made from the Japanese. Explanations in Vietnamese: why the
answer is right and why the most tempting wrong choice is wrong, naming choices as "lựa chọn N".
課長 = "trưởng phòng", 部長 = "trưởng bộ phận". Names and companies are fictional. Recompute every number,
date and weekday (write the year). Spread the answers over the four positions.

Distractors must be WRONG in context, not merely less polite or less natural ("could a Japanese office worker
say this here?" — if yes, replace it). Do not make the right answer the longest choice; keep the four choices
close in length (rule 5) — the test checks this.

When a section of a set is done, add an entry to your part's array at the top of the aggregate file:
`'mock1'` when every section of that part in the set follows the rules, otherwise `'w03/jokyo'` style entries
for each rewritten section. Then `npx vitest run data/src/bjt.test.ts` must be green, then `npm test` and
`npm run typecheck`. Do not edit test files, types, helpers, guides, plan, other sets or client code; if
something there blocks you, describe it in your final report instead.

Before finishing, answer every question you wrote yourself blind (cover the key), and check each keigo
choice: whose action is it, who hears it. Commit with user.email lehoainam.htd@gmail.com (check `git config
user.email` first), English commit messages, push your branch, do NOT merge, do NOT bump versions or build
an APK. Final report: what you rewrote (set/section/count), any rule you could not meet and why, and items
you are unsure about.
```

## R1 — 聴解, đề thi thử 1–3

```
Your part: R1. Branch nihongo-sensei/feat/bjt-cal-chokai-mocks. Files: data/authored/bjt/chokai/mock1.ts,
mock2.ts, mock3.ts, and the CHOKAI_CALIBRATED array in data/authored/bjt/chokai.ts.
Rewrite in each mock: 発言聴解 hatsugen (10 questions: rule 4 — four choices in one frame, ±20% length, one
keigo point differs, at least one "right meaning, wrong keigo subject", no rude choices; situation 40-70 chars,
choices 12-25 chars) and 総合聴解 sogo-chokai (10 items x 1 question: rules 3, 6, 7 — script 450-750 chars,
2-3 speakers with a change of mind or a rejected proposal, about 3 of 10 can be a monologue such as a briefing
or voicemail; question types per rule 7; the right answer paraphrases the decision). Check 場面把握 bamen
against rule 5 and fix only what breaks it. Mock1, mock2 and mock3 should not repeat each other's situations.
At the end CHOKAI_CALIBRATED = ['mock1', 'mock2', 'mock3'].
```

## R2 — 聴読解, đề thi thử 1–3

```
Your part: R2. Branch nihongo-sensei/feat/bjt-cal-chodokkai-mocks. Files: data/authored/bjt/chodokkai/
mock1.ts, mock2.ts, mock3.ts, and the CHODOKKAI_CALIBRATED array in data/authored/bjt/chodokkai.ts.
Rewrite in each mock:
- 状況把握 jokyo (5): material { kind: 'scene', vi } describing a workplace photo in Vietnamese; script 150-250
  chars; four PRINTED choices sharing the same opening and differing in one noun, i.e. what the people are
  talking about (e.g. 「〜の件」); the answer is inferred, not said word for word; a trap shares words with the
  script (rules 1, 8). spokenChoices stays unset.
- 総合聴読解 sogo-chodokkai (10 items x 1 question): the material itself carries four positions written
  【1】【2】【3】【4】 and the choices name them (「【2】」, or 「【2】と【3】」 for a combination). Use
  kind 'table' (a grid with head: [] works as a floor plan or a simple route map: cells are rooms, roads,
  landmarks) or kind 'text' (a draft with 【n】 where a sentence could go, a checklist, a timetable). Script
  400-750 chars, about 3 of 10 monologues (announcement, directions, briefing). Per mock at least one route on a
  map, one schedule that gets rearranged, one combination question, one "which item is NOT done yet";
  about 4 of 10 at J1+ (rules 1, 2, 3, 10).
- 資料聴読解 shiryo: check rule 9 (at most 4 of 10 need arithmetic; at least 4 ask what kind of document it is
  or what it is for); rewrite items only as needed to meet it.
The app shows 【n】 as plain text today; a parallel session (F) makes them badges, so do not wait for it.
At the end CHODOKKAI_CALIBRATED = ['mock1', 'mock2', 'mock3'].
```

## R3 — 読解, đề thi thử 1–3

```
Your part: R3. Branch nihongo-sensei/feat/bjt-cal-dokkai-mocks. Files: data/authored/bjt/dokkai/mock1.ts,
mock2.ts, mock3.ts, and the DOKKAI_CALIBRATED array in data/authored/bjt/dokkai.ts.
Rewrite in each mock:
- 表現読解 hyogen (10): ONE sentence or a short A/B exchange (25-50 chars, up to 80 for A/B) with a ＿＿＿ blank,
  in the prompt or in a short material text; choices 4-14 chars: keigo forms, cushion phrases, ways to ask or
  decline. Traps per rule 11: double keigo, wrong tense or form, a cushion phrase close in meaning but wrong for
  the situation, an extra 様, the host's phrase used by the guest.
- 総合読解 sogo-dokkai (10 items x 1 question): business documents only (email, letter, notice, minutes),
  150-300 chars; ask the purpose, what the reader must do, the deadline, or a figure in the 記 part; never
  "内容と合うもの". Per mock at least one formal letter (拝啓…敬具 or 前略…草々) and one polite refusal
  (rule 12). Choices close in length (rule 5).
Leave 語彙・文法 goi as it is. At the end DOKKAI_CALIBRATED = ['mock1', 'mock2', 'mock3'].
```

## R4a / R4b — 聴解, tuần luyện

```
Your part: R4a (weeks w01-w07; files data/authored/bjt/chokai/w01.ts … w07.ts) or R4b (weeks w09, w10, w11,
w13, w14, w16; files chokai/w09.ts … w16.ts). Branch nihongo-sensei/feat/bjt-cal-chokai-weeks-1 (R4a) or
-weeks-2 (R4b). Also the CHOKAI_CALIBRATED array in data/authored/bjt/chokai.ts.
In each week rewrite hatsugen (4 questions) and sogo-chokai (4 items x 1 question, replacing 2 items x 2) to
the same rules as R1 (rules 3, 4, 5, 6, 7), keeping the week's theme from plan.ts. Weeks 1-4 may sit nearer
J2-J1 in vocabulary, but the frame and length rules still apply. Leave bamen alone unless it breaks rule 5.
Add 'wNN' for each finished week to CHOKAI_CALIBRATED.
```

## R5 — 聴読解, tuần luyện

```
Your part: R5. Branch nihongo-sensei/feat/bjt-cal-chodokkai-weeks. Files: data/authored/bjt/chodokkai/w01.ts …
w16.ts (13 weeks), and the CHODOKKAI_CALIBRATED array in data/authored/bjt/chodokkai.ts.
In each week rewrite jokyo (2) and sogo-chodokkai (4 items x 1 question, replacing 2 items x 2) to the same
rules as R2. Leave shiryo alone. Add 'wNN/jokyo' and 'wNN/sogo-chodokkai' entries for each finished week
(the week's shiryo is not rewritten, so do not add the bare 'wNN'). If the 13 weeks do not fit in one session,
finish whole weeks in order, push, and report where you stopped.
```

## R6 — 読解, tuần luyện

```
Your part: R6. Branch nihongo-sensei/feat/bjt-cal-dokkai-weeks. Files: data/authored/bjt/dokkai/w01.ts …
w16.ts (13 weeks), and the DOKKAI_CALIBRATED array in data/authored/bjt/dokkai.ts.
In each week rewrite hyogen (3) and sogo-dokkai (4 items x 1 question, replacing 2 items x 2) to the same rules
as R3. Leave goi alone. Add 'wNN/hyogen' and 'wNN/sogo-dokkai' entries for each finished week. If the 13 weeks
do not fit in one session, finish whole weeks in order, push, and report where you stopped.
```

## F — hiển thị vị trí 【1】–【4】

```
Repo hoainam9212/dev is PUBLIC. Run `git fetch origin && git checkout nihongo-sensei/master` first. Read
CLAUDE.md, then client/src/pages/bjt/BjtMaterialView.tsx and the runner that shows choices
(client/src/pages/bjt/BjtRunner.tsx and what it renders).

Your part: F. Branch nihongo-sensei/feat/bjt-position-marks. Files: client/src/pages/bjt/** and, if a label
is needed, client/src/i18n/* (vi and en). Do not touch data/**, shared/** or other pages.

Context: in 総合聴読解 the material carries four positions written 【1】【2】【3】【4】 inside table cells or
text, and the choices are 「【2】」 or 「【2】と【3】」. Other sessions are rewriting the data in parallel; today
the marks show as plain text.

Do:
1. Render every 【n】 (n = 1-4) inside text bodies, table cells and choices as a round numbered badge (same
   style in material and choices, readable in light and dark theme, aria-label "vị trí n" / "position n"). A
   choice that is only marks shows just the badge(s).
2. A table with head: [] is a plain grid (floor plan, simple map): no header row, fixed equal columns, cells
   centred, empty cells drawn as light blocks (corridor/road), and it must fit 390 px wide without horizontal
   scroll for up to 6 columns.
3. Tests (vitest + testing-library, as other client tests do): badges for marks in text, table and choices; a
   headless grid renders no <thead>.
Check in the browser at 390 x 844 with a temporary item if no data uses the marks yet (do not commit the
temporary item). `npm test`, `npm run typecheck`, then `node scripts/ui-check.cjs --lang vi` and `--lang en`
with the dev server on :5173. Commit with user.email lehoainam.htd@gmail.com, English messages, push the
branch, do NOT merge, do NOT bump versions or build an APK. Report what you changed and a screenshot path or
description of the check.
```
