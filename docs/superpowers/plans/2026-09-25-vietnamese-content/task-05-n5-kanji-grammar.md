# Task 05 — N5 kanji (79) and grammar (136 patterns + examples)

Branch `vi/task-05`. Read `00-overview.md` and `data/translations/STYLE.md` first. Two batches, one commit each.

**Files**
- Create: `data/translations/vi/n5/kanji-001.json`, `data/translations/vi/n5/grammar-001.json`

**Interfaces**
- Consumes: `npm run tr -w data -- next | check | sample` (task 03), STYLE.md (task 04).
- Produces: N5 kanji `meaningsVi` (+ manual `hanViet` where Unihan had none), N5 grammar `meaningVi` +
  `examples[].vi` after `data:build`.

**Batch procedure (repeat per batch)**
1. `npm run tr -w data -- next --level n5 --type <type>` → prints the `_work` file and the `writeTo` path.
2. Read the whole `_work` file: `context` gives readings/on-kun/formation/example English; `file.entries` is the
   skeleton.
3. Write the `file` object, with every `vi` filled (and every empty `hanViet` filled), to
   `data/translations/<writeTo>` with the Write tool. Keep keys, order and `en` exactly as in the skeleton.
4. `npm run tr -w data -- check` → Expected `0 errors`. Read every warning for this file; fix real problems, accept
   diacritic-free Vietnamese words ("hai", "ba") consciously.
5. `npm run tr -w data -- sample --file <writeTo> --n 20` → re-read the 20 against the Japanese; fix mistakes.
6. `npm run data:build` → the N5 `vi` line shows the new coverage; no `STALE`.
7. Check command (`npm run typecheck && npm test`) → green (it runs the translations test).
8. Commit `feat(vi): N5 <type> translations (<n> entries)` with a body noting any manual Hán Việt and style calls.

- [ ] **Step 1: Kanji batch** (`--type kanji`, all 79). Expected after step 6: `hanViet 79/79`, `kanji 79/79`.
  In the commit body list the characters whose `hanViet` was written by hand (the skeleton had `"hanViet": ""`).
- [ ] **Step 2: Grammar batch** (`--type grammar`, all 136). Expected after step 6: `grammar 136/136`,
  `examples 136/136`. Grammar `vi` follows STYLE.md (slot in brackets); examples are full sentences.
- [ ] **Step 3: STATUS** — line 05 `done … (kanji 79, grammar 136, manual hanViet: <n>)` in the second commit
  (fill 04's sha); ff `master`.
