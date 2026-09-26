# STATUS — Vietnamese content

Update the line for your task inside the task's own commit (`todo` → `done <short-sha> <YYYY-MM-DD>` + one-line note).
A commit cannot contain its own sha: write "(sha in task NN commit)" and let the next task fill it in.
Translation tasks list batch progress on their line (e.g. `vocab 2/3 batches`).

- 01 open data — done 3deb28c 2026-09-25 · redone: Hán Việt where KANJIDIC2 + hanviet.csv agree, 1952/2211 (N5 72/79; N5 left for task 05: 本長時生山校読); Unihan only for kJapaneseOldVariant + kMandarin; Tatoeba jpn with vi 6115. First version 43a0d32 (Unihan kVietnamese, mixed Nôm) superseded
- 02 overlays — done a035981 2026-09-25 · translate.ts as briefed, 8 tests; applyKanji takes the agreed open value (`hanVietFor(ch, s).value`) as its callback
- 03 check + CLI — done 9fd9210 2026-09-25 · 13 tests; `tr next --type kanji` adds `hanVietOpen` / `hanVietCandidates` to the context; status shows 0 files, N5 0/718 · 0/79 · 0/136 · 0/1833
- 04 build, style, attribution — done d605624 2026-09-25 · build: hanViet open 1952 (N5 72/79), Tatoeba sentences 5742 in pool (N5 bundle 89/1833 → task 07 translates ~1744); missing-raw guard verified; Settings lists 4 new sources, 375px no overflow
- 05 N5 kanji + grammar — done cf55e4c 2026-09-25 (kanji 79 in ca38a2e, grammar 136, manual hanViet: 7 disagreed, 0 corrected); N5 now kanji 79/79 · hanViet 79/79 · grammar 136/136 · examples 136/136
- 06 N5 vocab — done f9ffc08 2026-09-25 (718 words, 3/3 batches: 96cb9a6, c138c63, this); N5 vocab 718/718, tr next → nothing pending
- 07 N5 sentences — done e919f87 2026-09-25 (1744 by hand in 6 files: 914bd49, 5ca0f2d, 1207093, 55fb761, ce901ac, this; 89 from Tatoeba, spot check OK); N5 all types 100%, tr next → nothing pending
- 08 N5 release (1.1.0) — done 75e39da 2026-09-26 · final review: 3 Important fixed in 3845297 (file-shape errors name the file, build gate: translated level needs 100% Hán Việt, tr status lists stale + Tatoeba/open counts), 5 minors deferred; user delegated the sample review, 2 sentences reworded (c0fe2ad); ui-check vi+en NO OVERFLOW; APK versionCode 13, same signing cert
- N4 wave (1.2.0) — done 2b5d34b 2026-09-26 · kanji 166 + Hán Việt 166 (13 hand-picked) a66c51a, grammar 124 7a7b030, vocab 668 in 3 batches (b48c025, b8ab3b7, 59513e9), sentences 1627 by hand in 6 batches (59de28b..3d8d58b) + 168 already translated; review delegated by the user: 60-item sample, 2 past-tense fixes 3c7e3fb; ui-check vi NO OVERFLOW; APK versionCode 14, same signing cert
- N3a (1.3.0) — done ab63d4b 2026-09-26 on vi/n3 · kanji 367 + Hán Việt 367 (51 hand-picked, 6 open values overridden: 追 TRUY, 覚 GIÁC, 妻 THÊ, 夫 PHU, 種 CHỦNG, 未 VỊ; 込 kokuji → NHẬP) · grammar 130 (0f48117) · vocab 2139 in 9 batches (eea0036..b63b3f4); 40-item sample self-reviewed, no fixes; ui-check vi NO OVERFLOW; APK versionCode 15, same signing cert
- N3b (1.3.1) — done 0ba5ec1 2026-09-26 on vi/n3 · sentences 2400 by hand in 8 batches (4cd982e..42ebb41), N3 sentences 3008/5509; sample self-reviewed, no fixes; ui-check vi (vocab,kanji,grammar,speaking) NO OVERFLOW; APK versionCode 16, same signing cert
- N3c (1.3.2) — done (sha in next wave commit) 2026-09-26 on vi/n3 · sentences 2501 by hand in 9 batches (7b63cad..e7cc430); N3 100% in every type (vocab 2139, kanji 367 + Hán Việt, grammar 130, sentences 5509); ui-check vi NO OVERFLOW; APK versionCode 17, same signing cert
