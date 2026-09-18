# Phase 4 – Business Japanese, Progress Dashboard, Settings, Gamification

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Business Japanese module (keigo tables, email templates, phone/meeting/meishi/interview phrases with roleplay and quizzes), the progress dashboard, the settings page (theme, TTS rate, backup export/import, attribution) and mascot gamification (levels, level-up celebration, contextual speech).

**Architecture:** Business content is authored in `data/authored/business.ts` and emitted as `business/index.json` (array of `BusinessTopic`). Dashboard numbers come from Dexie (`progress`, `sessions`) and `content/index.json` counts. Settings persist in a Zustand store `ns.settings`; backup uses `exportAll/importAll`.

**Spec:** sections 5.3 Business, Gamification; 5.2 `/progress`, `/settings`; 5.5.

## Global Constraints

- Business content: ≥ 40 keigo verbs, ≥ 6 email templates, ≥ 10 phrases each for phone, meeting, meishi, interview, daily. Every item has `ja`, `reading` (kana) and `vi`.
- XP: business quiz correct +2; roleplay via `SpeakButton` scoring.
- Branch `feat/phase4-business-progress`; commit per task.

---

### Task 1: Authored business content + build
Files: `data/authored/business.ts`, `data/src/business.test.ts` (minimum counts, unique ids, readings are kana), modify `data/scripts/build.ts` (write `business/index.json`, add to counts as `business.all`).
Commit: `feat(data): business Japanese content`.

### Task 2: Business module
Files: `client/src/pages/business/BusinessPage.tsx`, `KeigoTable.tsx`, `PhraseList.tsx`, `EmailTemplates.tsx`, `BusinessQuiz.tsx`, `BusinessRoleplay.tsx`, test `BusinessQuiz.test.tsx`; route `/business`.
Behaviour: topic tabs (Keigo / Email / Điện thoại / Họp / Meishi / Phỏng vấn / Hàng ngày); keigo table 3 columns with 🔊 per cell and search; email templates with subject/body, 🔊 and "Sao chép"; phrase lists with 🔊, reading toggle, Vietnamese; quiz: given plain verb → choose 尊敬語 (or 謙譲語) among 4 (`buildKeigoQuestions`), and situation (vi) → phrase; roleplay: situation card (vi) → user speaks the phrase → score.
Commit: `feat(client): business Japanese module`.

### Task 3: Progress dashboard + settings
Files: `client/src/pages/ProgressPage.tsx`, `client/src/pages/SettingsPage.tsx`, `client/src/store/settings.ts`, `client/src/components/BarChart.tsx` (SVG), `client/src/db/stats.ts` (+test: `xpByDay(sessions, days)`, `statusCounts(progress, now)`, `dueForecast(progress, days)`), routes.
Behaviour: dashboard cards (XP/level, streak, học hôm nay), 7-day XP bar chart, per-type status (mới/đang học/đã thuộc) using content counts, due forecast next 7 days, last 10 sessions. Settings: theme, TTS rate slider (used by `speak` default via store), new-cards-per-session, export JSON (download), import JSON (file input, merge), "Xóa toàn bộ tiến độ" with confirm, attribution list.
Commit: `feat(client): progress dashboard and settings`.

### Task 4: Gamification polish
Files: `client/src/components/Confetti.tsx`, `client/src/store/progress.ts` (level-up detection), `client/src/components/MascotSpeech.ts` (lines by context), modify `Home.tsx`, `AppShell.tsx` (toast on level-up).
Behaviour: level names (Cấp 1 "Tân binh 🌱" … ), confetti + toast when level increases, streak milestone toast (7/30 days), mascot home line depends on due count/streak/time.
Commit: `feat(client): level-up celebration and mascot speech`.
