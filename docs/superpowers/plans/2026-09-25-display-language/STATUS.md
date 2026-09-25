# STATUS — display language (VI/EN)

Update the line for your task inside the task's own commit (`todo` → `done <short-sha> <YYYY-MM-DD>` + one-line note).

- 01 infrastructure — done 969ff7d 2026-09-25 (lang setting, dictionary, VI|EN switch, pickers, guard with 70 pending files, ui-check)
- 02 shared components — done d9e35f0 2026-09-25 (components/*, app/* chrome, Placeholder; toasts/sync message store data, not text)
- 03 home, progress, settings, non-React messages — done 8af3c80 2026-09-25 (mascot lines carry vi+en, levelName(level, t), getT() for API/loader/STT/stats text; 43 files pending)
- 04 kana, vocab — done a100c46 2026-09-25 (vocabMeanings/kanaMnemonic/sentenceTranslation; quizzes seeded per session so a language flip re-translates in place; EN mode labels shortened to fit 360px; 33 files pending)
- 05 kanji, grammar — done 2b8da39 2026-09-25 (kanjiMeanings/grammarMeaning/exampleTranslation; Hán Việt row when hanViet is set; shared labels moved to common; 21 files pending)
- 06 reading, listening, speaking — done (sha in task 07 commit) 2026-09-25 (reading vocab/explain, listening + roleplay script via pickText; Shadowing via sentenceTranslation; Question.explainEn; 14 files pending)
- 07 writing, review, auth — todo
- 08 business — todo
- 09 final + release — todo
