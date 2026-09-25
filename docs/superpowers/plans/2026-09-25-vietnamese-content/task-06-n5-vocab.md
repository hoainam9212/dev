# Task 06 — N5 vocabulary (718 words, 3 batches of ≤ 250)

Branch `vi/task-06`. Read `00-overview.md` and `data/translations/STYLE.md` first. One commit per batch; a session
may stop after any batch (update the STATUS line with `vocab k/3 batches`).

**Files**
- Create: `data/translations/vi/n5/vocab-001.json`, `vocab-002.json`, `vocab-003.json`

**Interfaces**
- Consumes: `npm run tr -w data -- next | check | sample` (task 03), STYLE.md (task 04).
- Produces: N5 vocab `meaningsVi` after `data:build`.

**Batch procedure (repeat per batch)**
1. `npm run tr -w data -- next --level n5 --type vocab` → prints the `_work` file and the `writeTo` path.
2. Read the whole `_work` file: `context` gives the reading and one example sentence per word — use it to pick the
   right sense; `file.entries` is the skeleton (`vi: []`, `en` snapshot).
3. Write the `file` object with every `vi` filled (one array item per sense, STYLE.md) to
   `data/translations/<writeTo>` with the Write tool. Keep keys, order and `en` exactly.
4. `npm run tr -w data -- check` → Expected `0 errors`; read every warning for this file and fix or consciously accept.
5. `npm run tr -w data -- sample --file <writeTo> --n 20` → re-read against the Japanese; fix mistakes.
6. `npm run data:build` → N5 `vi` line: `vocab` grows by the batch size; no `STALE`.
7. Check command → green.
8. Commit `feat(vi): N5 vocabulary batch <k>/3 (<n> words)`.

- [ ] **Step 1: Batch 1** (vocab-001, 250 words).
- [ ] **Step 2: Batch 2** (vocab-002, 250 words).
- [ ] **Step 3: Batch 3** (vocab-003, the remaining 218). Expected after its build: `vocab 718/718`, and
  `npm run tr -w data -- next --level n5 --type vocab` → `nothing pending for N5 vocab`.
- [ ] **Step 4: STATUS** — line 06 `done … (718 words)` in the last batch's commit (fill 05's sha); ff `master`.
