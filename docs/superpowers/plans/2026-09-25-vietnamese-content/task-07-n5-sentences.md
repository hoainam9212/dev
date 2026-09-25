# Task 07 — N5 example sentences (the ones Tatoeba has no Vietnamese for)

Branch `vi/task-07`. Read `00-overview.md` and `data/translations/STYLE.md` first. Batches of 300; one commit per
batch; a session may stop after any batch (STATUS line: `sentences k/K batches`). The number of batches K =
ceil(pending / 300), where pending = `1833 − Tatoeba-covered` as shown by `tr status` after task 04.

**Files**
- Create: `data/translations/vi/n5/sentences-001.json` … `sentences-00K.json`

**Interfaces**
- Consumes: `npm run tr -w data -- next | check | sample` (task 03), STYLE.md (task 04).
- Produces: N5 sentence `vi` after `data:build` (file translations override Tatoeba, spec › precedence).

**Batch procedure (repeat per batch)**
1. `npm run tr -w data -- next --level n5 --type sentences` → prints the `_work` file and the `writeTo` path.
2. Read the whole `_work` file: `context[key].ja` is the Japanese to translate; `file.entries[key].en` the English
   reference.
3. Write the `file` object with every `vi` filled to `data/translations/<writeTo>` with the Write tool. Translate from
   the Japanese (pronouns, register, punctuation per STYLE.md). Keep keys, order and `en` exactly.
4. `npm run tr -w data -- check` → Expected `0 errors`; read every warning for this file and fix or consciously accept.
5. `npm run tr -w data -- sample --file <writeTo> --n 20` → re-read against the Japanese; fix mistakes.
6. `npm run data:build` → N5 `vi` line: `sentences` grows by the batch size; no `STALE`.
7. Check command → green.
8. Commit `feat(vi): N5 sentences batch <k>/<K> (<n> sentences)`.

- [ ] **Step 1: Tatoeba spot check** (once, before batch 1): `npm run tr -w data -- status --level n5` to get K; then
  look at 20 Tatoeba-provided N5 translations (`node -e` over `client/public/content/sentences/n5.json`, entries with
  `vi` and no file entry). Any poor one: note its id; it is fixed by adding it to a later batch file by hand (a file
  entry overrides Tatoeba — copy `en` from the bundle). Record the verdict in the ledger.
- [ ] **Step 2 … K+1: Batches 1 … K** (procedure above). Expected after the last build: `sentences 1833/1833`, and
  `next --level n5 --type sentences` → `nothing pending for N5 sentences`.
- [ ] **Last step: STATUS** — line 07 `done … (<file> by hand, <tatoeba> from Tatoeba)` in the last commit (fill
  06's sha); ff `master`.
