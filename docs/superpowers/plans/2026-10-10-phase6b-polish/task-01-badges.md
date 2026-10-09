# Task 1: Huy hiệu

**Files:**
- Create: `shared/src/badges.ts`, `shared/src/badges.test.ts`, `client/src/progress/badges.ts`, `badges.test.ts`,
  `client/src/home/BadgeShelf.tsx`, `BadgeShelf.test.tsx`
- Modify: `shared/src/index.ts`, `client/src/player/FinishView.tsx` (+ test), nơi gọi `recordLessonResult` và
  `recordTypingRun` (grep), `client/src/pages/HomePage.tsx`

Trước khi làm: `git checkout -b feat/phase6b-polish` từ `master`; soát email gmail.

## Interfaces

```ts
// shared/src/badges.ts
export interface BadgeStats { completed: ReadonlySet<string>; bestWpm: number; streak: number; level: number }
export interface Badge { id: string; emoji: string; title: string; how: string; earned: (s: BadgeStats) => boolean }
export const BADGES: readonly Badge[];
export function badgesEarned(s: BadgeStats): string[];   // id theo thứ tự BADGES
```

| id | emoji | title | how (hiện ở huy hiệu chưa có) | điều kiện |
|---|---|---|---|---|
| `first-step` | 🐾 | Bước chân đầu tiên | Học xong bài đầu tiên | `completed.size ≥ 1` |
| `fast-fingers` | ⚡ | Ngón tay thần tốc | Gõ 40 từ/phút | `bestWpm ≥ 40` |
| `word-writer` | 📝 | Cây bút Word | Xong dự án Đơn xin việc | có `word.project` |
| `formula-wizard` | 🧙 | Phù thủy công thức | Xong chương Đếm, cộng có điều kiện và tra cứu | có đủ `excel.countif`, `excel.sumif`, `excel.vlookup`, `excel.text` |
| `storyteller` | 🎤 | Người kể chuyện | Xong dự án PowerPoint | có `ppt.project` |
| `ai-buddy` | 🤖 | Bạn đồng hành của AI | Xong dự án Báo cáo tuần | có `ai.project` |
| `streak-7` | 🔥 | Chăm chỉ 7 ngày | Học 7 ngày liền | `streak ≥ 7` |
| `level-5` | 🎓 | Mèo chăm học | Lên cấp 5 | `level ≥ 5` |

```ts
// client/src/progress/badges.ts
export async function awardBadges(profileId: string, now?: Date): Promise<string[]>; // trả id MỚI đạt lần này
export function useBadges(profileId: string | null): { earned: Set<string>; loaded: boolean };
```
`awardBadges` tự gom `BadgeStats` từ Dexie (lessonProgress, typingRuns, dailyActivity → `computeStreak`, profile.xp →
`levelFromXp`), ghi bản ghi mới vào `earnedBadges` trong **một transaction**, trả danh sách mới.

`FinishView` nhận thêm prop `newBadges: string[]`; có thì hiện khối "Huy hiệu mới!" với emoji + title. `BadgeShelf`
trên trang chủ: 8 ô, đã có thì màu, chưa có thì xám kèm `how` (title/aria-label), `aria-label="Huy hiệu: <title>, đã đạt"`.

## Bước

- [ ] **1. Test shared (FAIL)**: mỗi huy hiệu một test đạt/chưa đạt đúng ngưỡng (39 vs 40 WPM, streak 6 vs 7, thiếu một
  bài của chương VLOOKUP); `badgesEarned` giữ thứ tự `BADGES`; id duy nhất.
- [ ] **2. Viết `badges.ts`** shared, export; chạy xanh.
- [ ] **3. Test client (FAIL)** (fake-indexeddb có sẵn như test `record.test.ts`):
  - Hồ sơ xong 1 bài → `awardBadges` trả `['first-step']`; gọi lại trả `[]` và bảng vẫn 1 dòng.
  - Hồ sơ B không nhận huy hiệu của hồ sơ A.
  - `recordTypingRun` 41 WPM rồi `awardBadges` → có `fast-fingers`.
  - `FinishView` với `newBadges: ['storyteller']` hiện "Người kể chuyện".
  - `BadgeShelf`: đủ 8 ô; ô chưa đạt có chữ `how`.
- [ ] **4. Viết** `progress/badges.ts`, `BadgeShelf`; gọi `awardBadges` ngay sau `recordLessonResult` (truyền kết quả
  vào `FinishView`) và sau `recordTypingRun` (không cần hiện gì ở trang gõ, chỉ trao). Kệ huy hiệu đặt trên trang chủ
  dưới thẻ streak/mục tiêu.
- [ ] **5. `npm test && npm run typecheck`** xanh.
- [ ] **6. Kiểm trên trình duyệt**: hồ sơ mới học xong `basics.welcome` → FinishView có "Bước chân đầu tiên"; trang
  chủ kệ huy hiệu sáng 1 ô; học lại bài đó không hiện huy hiệu nữa; 390px kệ xuống dòng gọn.
- [ ] **7. Commit** `feat: huy hiệu (8 loại), trao khi học xong và khi gõ` + dòng STATUS.
