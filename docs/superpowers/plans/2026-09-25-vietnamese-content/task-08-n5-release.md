# Task 08 — N5 review sample and release 1.1.0

Branch `vi/task-08`. Read `00-overview.md` first. Release steps follow the project's release memory
(`nihongo-sensei-release-process`).

**Files**
- Modify: `client/android/app/build.gradle` (versionCode 12 → 13, versionName "1.0.11" → "1.1.0"; read the
  current values first)
- Modify: `docs/superpowers/plans/2026-09-25-vietnamese-content/STATUS.md`
- Modify (outside the repo): project memory `nihongo-sensei-project.md` (version, "N5 Vietnamese shipped; next N4")

**Interfaces**
- Consumes: N5 translation files (tasks 05–07), `tr sample`, `scripts/ui-check.cjs`.
- Produces: `release/NihongoSensei-1.1.0.apk`.

- [ ] **Step 1: Coverage** — `npm run data:build`. Expected N5 line:
  `vi { vocab: '718/718', kanji: '79/79', hanViet: '79/79', grammar: '136/136', examples: '136/136', sentences: '1833/1833' }`,
  no `STALE`. `npm run tr -w data -- check` → `0 errors`.
- [ ] **Step 2: User sample** — `npm run tr -w data -- sample --level n5 --n 40`; paste the 40 rows to the user in
  chat as a compact table (Japanese · English · Vietnamese) and ask for corrections. Apply every correction in the
  translation files (never the bundles), rebuild, re-run `check`, commit `fix(vi): N5 corrections from review`.
- [ ] **Step 3: See it in the app (VI)** — dev server on :5173 (`preview_start nihongo-client`), then
  `node scripts/ui-check.cjs --lang vi --shots vocab,kanji,grammar,speaking` → `NO OVERFLOW` (Vietnamese meanings
  are longer than English). Open a kanji detail and a vocab card in the pane at 390px and read the text: Vietnamese
  meaning, uppercase Hán Việt row, Vietnamese example translation. Also `--lang en` on the same shots → English
  meanings unchanged.
- [ ] **Step 3b: Final whole-branch review** — fresh reviewer on the most capable model over the plan's commit range
  (tooling tasks 01–04 are the code under review; translation files are sampled, not read in full), with the
  overview's Review Focus. Fix Critical/Important findings (each with a failing test first) before building.
- [ ] **Step 4: Release** — `npm run build -w client`; `npx cap sync android` (in `client/`); bump `build.gradle`;
  in Git Bash from `client/android`: export `JAVA_HOME` (the `%LOCALAPPDATA%\Programs\jdk-17*` folder, Windows path)
  and `ANDROID_HOME` (`%LOCALAPPDATA%\Android\Sdk`), `./gradlew.bat assembleRelease`. Verify:
  `aapt dump badging` → `versionCode='13' versionName='1.1.0'`; `apksigner verify --print-certs` SHA-256 equals
  `release/NihongoSensei-1.0.11.apk`'s; `unzip -p <apk> assets/public/content/vocab/n5.json | grep -c meaningsVi` → 1
  and `unzip -p <apk> assets/public/content/kanji/n5.json | grep -o '"hanViet":"[^"]*"' | head -3`.
  Copy to `release/NihongoSensei-1.1.0.apk`; deliver with SendUserFile.
- [ ] **Step 5: Commit** `chore(android): bump to 1.1.0` + STATUS (fill 07's sha; line 08 done); ff `master`;
  update the project memory note.
