# STATUS — Vietnamese content

Update the line for your task inside the task's own commit (`todo` → `done <short-sha> <YYYY-MM-DD>` + one-line note).
A commit cannot contain its own sha: write "(sha in task NN commit)" and let the next task fill it in.
Translation tasks list batch progress on their line (e.g. `vocab 2/3 batches`).

- 01 open data — done 3deb28c 2026-09-25 · redone: Hán Việt where KANJIDIC2 + hanviet.csv agree, 1952/2211 (N5 72/79; N5 left for task 05: 本長時生山校読); Unihan only for kJapaneseOldVariant + kMandarin; Tatoeba jpn with vi 6115. First version 43a0d32 (Unihan kVietnamese, mixed Nôm) superseded
- 02 overlays — done a035981 2026-09-25 · translate.ts as briefed, 8 tests; applyKanji takes the agreed open value (`hanVietFor(ch, s).value`) as its callback
- 03 check + CLI — done 9fd9210 2026-09-25 · 13 tests; `tr next --type kanji` adds `hanVietOpen` / `hanVietCandidates` to the context; status shows 0 files, N5 0/718 · 0/79 · 0/136 · 0/1833
- 04 build, style, attribution — done d605624 2026-09-25 · build: hanViet open 1952 (N5 72/79), Tatoeba sentences 5742 in pool (N5 bundle 89/1833 → task 07 translates ~1744); missing-raw guard verified; Settings lists 4 new sources, 375px no overflow
- 05 N5 kanji + grammar — done (sha in task 06 commit) 2026-09-25 (kanji 79 in ca38a2e, grammar 136, manual hanViet: 7 disagreed, 0 corrected); N5 now kanji 79/79 · hanViet 79/79 · grammar 136/136 · examples 136/136
- 06 N5 vocab — todo
- 07 N5 sentences — todo
- 08 N5 release (1.1.0) — todo
