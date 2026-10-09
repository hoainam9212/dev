# Task 4: Kiểm tra đầu vào (mở khoá sớm)

**Files:**
- Create: `client/src/content/placement.ts`, `client/src/pages/PlacementPage.tsx`, `PlacementPage.test.tsx`
- Modify: `shared/src/progress.ts` (+ `progress.test.ts`), `client/src/db/db.ts` (`Profile.testedOut?: string[]`),
  nơi gọi `unlockState` (grep), `client/src/pages/WelcomePage.tsx` (+ test), `client/src/home/TrackMap.tsx` (+ test),
  `client/src/pages/SpeedTestPage.tsx`, `client/src/App.tsx`

## Interfaces

```ts
// shared/src/progress.ts
export function unlockState(tracks, lessons, os, completed, unlockAll = false,
  testedOut: ReadonlySet<string> = new Set()): { trackUnlocked: Set<string>; lessonUnlocked: Set<string> };
//   track trong testedOut: mở mọi bài của nó VÀ tính là "đã xong" để mở track kế tiếp.
export const PLACEMENT_PASS = 5;                       // đúng ≥ 5/6 câu
export function placementPassed(answers: number[], quiz: readonly QuizStep[]): boolean;

// client/src/content/placement.ts
export const PLACEMENT_QUIZ: Record<'basics' | 'word' | 'excel' | 'ppt', QuizStep[]>;  // mỗi lộ trình đúng 6 câu
export const TYPING_PLACEMENT = { minWpm: 25, minAccuracy: 95, minutes: 1 } as const;
```

- Câu hỏi bám nội dung bài thật của lộ trình đó (phím tắt copy/paste, đổi tên thư mục; Bold/căn lề/mục lục; `=SUM`,
  `$A$1`, VLOOKUP; thêm slide, bố cục, F5…). Lời "thẻ", không "tab".
- **Gõ phím** không thi trắc nghiệm: dùng bài kiểm tra tốc độ có sẵn với `?placement=1` (1 phút); đạt
  `TYPING_PLACEMENT` thì thêm `'typing'` vào `testedOut`.
- Lộ trình AI không có kiểm tra (là lộ trình cuối).
- **`/placement`** "Kiểm tra đầu vào": thẻ cho từng lộ trình (đã mở khoá bằng kiểm tra thì ghi "Đã mở khoá ✓"); vào thì
  làm 6 câu liên tiếp bằng `QuizView` có sẵn (không hiện đáp án từng câu cho tới cuối), cuối cùng: đạt → ghi
  `testedOut` + "Đã mở khoá lộ trình Word!"; trượt → "Bạn đúng 3/6. Học từ đầu sẽ chắc hơn — hoặc thử lại lúc khác."
- **Màn chào** (`WelcomePage`), sau bước chọn mèo: "Bạn đã biết dùng máy tính chưa?" — **Học từ đầu** (vào trang chủ)
  hoặc **Kiểm tra đầu vào** (vào `/placement`). Trang chủ: lộ trình đang khoá có link nhỏ "Đã biết rồi? Làm bài kiểm
  tra" tới `/placement`.

## Bước

- [ ] **1. Test shared (FAIL)**: `testedOut {'basics'}` mở track `typing`; track tested-out mở **mọi** bài của nó;
  `testedOut` không thêm gì vào `completed`; `placementPassed` 5/6 đạt, 4/6 trượt, mảng thiếu câu → trượt.
- [ ] **2. Viết shared**, chạy xanh; truyền `new Set(profile.testedOut ?? [])` ở mọi chỗ gọi `unlockState`.
- [ ] **3. Viết `placement.ts`** (24 câu). Test: mỗi lộ trình đúng 6 câu, `answer` hợp lệ, không chữ "tab".
- [ ] **4. Test trang (FAIL)**: làm đủ 6 câu đúng ≥5 → hồ sơ có `testedOut` chứa track đó; trượt → không đổi; đạt rồi
  làm lại trượt → vẫn giữ; hồ sơ B không bị ảnh hưởng; WelcomePage có hai lựa chọn; SpeedTest `?placement=1` đạt
  ngưỡng → `testedOut` có `typing`.
- [ ] **5. Viết `PlacementPage`**, route, sửa Welcome/TrackMap/SpeedTest. `npm test && npm run typecheck` xanh.
- [ ] **6. Kiểm trên trình duyệt**: hồ sơ mới chọn "Kiểm tra đầu vào", qua Làm quen máy tính + gõ phím (dùng puppeteer
  gõ nhanh cho bài tốc độ) → trang chủ mở Word ngay; trượt Excel → Excel vẫn khoá; 390px.
- [ ] **7. Commit** `feat: kiểm tra đầu vào mở khoá sớm từng lộ trình` + dòng STATUS.
