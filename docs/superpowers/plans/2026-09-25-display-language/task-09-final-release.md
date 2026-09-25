# Task 09 — Final pass and release

Branch `i18n/task-09`. Read `00-overview.md` first. All earlier tasks must be `done` in `STATUS.md`.

**Files**
- Modify: `client/src/i18n/pending-files.ts` (must end as `export const PENDING: string[] = []`),
  `client/src/i18n/no-hardcoded.test.ts` (add: "PENDING is empty")
- Modify: `client/android/app/build.gradle` (versionCode +1, versionName next patch — read current values first)
- Possibly: any file the guard still flags (should be none; fix in place if so)
- Modify (docs): project memory note `nihongo-sensei-project.md` — version + "display language shipped; next:
  translation phases" (outside the repo)

**Interfaces** — none new. Uses `scripts/ui-check.cjs` (task 01).

- [ ] **Step 1: Test first:** add "PENDING is empty" to `no-hardcoded.test.ts`; run → fails if any entry left.
- [ ] **Step 2:** Empty `PENDING`; run the guard → fix any flagged line (dictionary entry in both files).
- [ ] **Step 3:** Check command from the overview → all workspaces green; `npm run data:build` is **not**
  needed (no data change) unless `client/public/content` is missing.
- [ ] **Step 4: Full EN pass in Chrome:**
  `node scripts/ui-check.cjs --lang en --shots /,/kana,/vocab,/kanji,/grammar,/reading,/listening,/speaking,/writing,/business,/review,/progress,/settings,/login`
  → `NO OVERFLOW`; open **every** PNG and read it for leftover Vietnamese UI (content fallbacks in reading /
  listening / business / kana mnemonics are expected). Then `--lang vi` with the same shots → unchanged.
- [ ] **Step 5: Switch round-trip:** in the dev preview, flip EN → VI → EN from the mobile "More" sheet and the
  desktop sidebar; reload — the choice persists; `<html lang>` follows.
- [ ] **Step 6: Release** (per `nihongo-sensei-release-process` memory): `npm run build -w client`,
  `npx cap sync android` (from `client/`), bump `build.gradle`, `./gradlew.bat assembleRelease` from Git Bash in
  `client/android` with `JAVA_HOME`/`ANDROID_HOME` exported; verify `aapt dump badging` (new version),
  `apksigner verify --print-certs` (SHA-256 equals the previous release), and
  `unzip -p <apk> 'assets/public/assets/*.js' | grep -o 'Vocabulary'` (English dictionary shipped); copy to
  `release/NihongoSensei-<version>.apk`; deliver with SendUserFile.
- [ ] **Step 7: Commit** (`feat(i18n): display language complete` + `chore(android): bump to <version>`) with
  STATUS updated; ff `master`; update the project memory note.
