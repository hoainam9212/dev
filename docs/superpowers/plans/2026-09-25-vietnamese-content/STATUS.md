# STATUS — Vietnamese content

Update the line for your task inside the task's own commit (`todo` → `done <short-sha> <YYYY-MM-DD>` + one-line note).
A commit cannot contain its own sha: write "(sha in task NN commit)" and let the next task fill it in.
Translation tasks list batch progress on their line (e.g. `vocab 2/3 batches`).

- 01 open data — done 3deb28c 2026-09-25 · redone: Hán Việt where KANJIDIC2 + hanviet.csv agree, 1952/2211 (N5 72/79; N5 left for task 05: 本長時生山校読); Unihan only for kJapaneseOldVariant + kMandarin; Tatoeba jpn with vi 6115. First version 43a0d32 (Unihan kVietnamese, mixed Nôm) superseded
- 02 overlays — done (sha in task 03 commit) 2026-09-25 · translate.ts as briefed, 8 tests; applyKanji takes the agreed open value (`hanVietFor(ch, s).value`) as its callback
- 03 check + CLI — todo
- 04 build, style, attribution — todo
- 05 N5 kanji + grammar — todo
- 06 N5 vocab — todo
- 07 N5 sentences — todo
- 08 N5 release (1.1.0) — todo
