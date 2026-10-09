# Task 1: Theme, chuyển cảnh, trình chiếu và sáu check mới (shared)

**Files:**
- Create: `shared/src/sims/ppt/theme.ts`, `theme.test.ts`, `show.ts`, `show.test.ts`
- Modify: `shared/src/sims/ppt/state.ts` (state, action, hoàn tác), `grade.ts`, `grade.test.ts`, `index.ts`

Trước khi làm: `git checkout -b feat/phase5b-ppt` từ `master`; `git config user.email` phải là gmail.

## Interfaces (Produces — các task sau dùng đúng tên này)

```ts
// theme.ts
export interface PptTheme { id: ThemeId; name: string; bg: string; fg: string; accent: string; font: string }
export const PPT_THEMES: readonly PptTheme[];          // đúng thứ tự: mochi, bien, la, hoa, tro, dem
export function themeOf(id: ThemeId): PptTheme;
export function contrastRatio(a: string, b: string): number;  // WCAG, nhận '#RRGGBB'
```

| id | name | bg | fg | accent | font |
|---|---|---|---|---|---|
| mochi | Mochi | `#FFF8EE` | `#3B2F2A` | `#C8571F` | `"Segoe UI", system-ui, sans-serif` |
| bien | Biển | `#EAF4FF` | `#1E3A5F` | `#1F6FC5` | `Georgia, "Times New Roman", serif` |
| la | Lá | `#EEF8EC` | `#24452A` | `#2E7D3E` | `"Trebuchet MS", "Segoe UI", sans-serif` |
| hoa | Hoa | `#FFF0F5` | `#4A2838` | `#C2386E` | `"Segoe UI", system-ui, sans-serif` |
| tro | Tro | `#F2F2F2` | `#2E2E2E` | `#4F5B6A` | `Calibri, "Segoe UI", sans-serif` |
| dem | Đêm | `#1F2430` | `#F3F4F8` | `#FFB86B` | `"Segoe UI", system-ui, sans-serif` |

Màu là gợi ý; được chỉnh nếu test tương phản đỏ, nhưng giữ tông (kem/cam, xanh biển, xanh lá, hồng, xám, tối).

```ts
// state.ts — thay đổi
export interface PptSnap { slides: Slide[]; theme: ThemeId }
// PptState: past: PptSnap[]   (trước là Slide[][])
//           show: { at: number; from: number } | null   (at === slides.length là màn "Hết bài")
//           presented: boolean   // đã chiếu từ slide 1 tới slide cuối ít nhất một lần
// PptAction thêm:
| { type: 'setTheme'; theme: ThemeId }
| { type: 'setTransition'; transition: Transition; all?: true }   // 'none' xoá chuyển cảnh
| { type: 'startShow'; from: 'start' | 'current' }
| { type: 'showNext' } | { type: 'showPrev' } | { type: 'endShow' }

// grade.ts — PptCheck thêm
| { kind: 'theme'; theme: ThemeId }
| { kind: 'notTheme'; theme: ThemeId }        // đề mở "chọn theme bất kỳ khác Mochi" (dự án, Task 8)
| { kind: 'transition'; slide: number; transition: Exclude<Transition, 'none'> | 'any' }
| { kind: 'placeholder'; slide: number; role: Role; textContains?: string; notEmpty?: true }
| { kind: 'elFormat'; slide: number; role: Role; fmt: Pick<ElFormat, 'size' | 'color' | 'align' | 'bold' | 'italic'> }
| { kind: 'presented' }
```

`show.ts` export `reduceShow(s: PptState, a: ShowAction): PptState` với `ShowAction` là 4 action trình chiếu;
`reducePpt` chuyển 4 action đó sang `reduceShow`. Đang chiếu (`s.show !== null`) thì `reducePpt` trả nguyên `s` cho mọi
action khác.

## Bước

- [ ] **1. Đổi `past` sang `PptSnap[]`** — `grep -n "past" shared/src/sims/ppt/*.ts client/src -r`. `withSlides` chụp
  `{ slides: s.slides, theme: s.theme }`; `undo` trả cả hai. `pptInitial` thêm `presented: false`. Chạy
  `npm test -w shared -- ppt` → vẫn xanh (đây là bước tái cấu trúc, test cũ phải giữ nguyên nghĩa).
- [ ] **2. Viết test (FAIL)** — `theme.test.ts`, `show.test.ts`, thêm vào `state.test.ts` / `grade.test.ts`:
  - `PPT_THEMES` có đúng 6 id theo thứ tự bảng; `themeOf` trả đúng theme, id lạ trả `mochi`.
  - Mọi theme: `contrastRatio(fg, bg) ≥ 7` và `contrastRatio(accent, bg) ≥ 4.5`.
  - `setTheme` đổi theme; đặt lại đúng theme đang dùng là no-op (không thêm bậc hoàn tác).
  - `setTheme` rồi `undo` → theme cũ; slide không đổi.
  - `setTransition fade` chỉ đặt cho slide đang mở; `all: true` đặt cho mọi slide; `none` xoá (`transition` là `undefined`).
  - `setTransition` rồi `undo` → mất chuyển cảnh.
  - `startShow start` → `show = {at:0, from:0}`, `sel`/`editing` về `null`; `startShow current` ở slide 3 → `at: 2, from: 2`.
  - `showNext` tới slide cuối khi `from: 0` → `presented = true`; chiếu từ slide 2 tới cuối → `presented` vẫn `false`.
  - Bài 1 slide: `startShow start` → `presented = true` ngay.
  - `showNext` ở slide cuối → `at === slides.length` (màn Hết bài); `showNext` thêm lần nữa → `show === null`.
  - `showPrev` ở `at: 0` giữ `at: 0`.
  - `endShow` ở slide 3 → `show null`, `active = 2`; `endShow` từ màn Hết bài → `active` = slide cuối.
  - Đang chiếu: `addSlide`, `setText`, `moveEl`, `setTheme` đều bị bỏ qua (state y nguyên, cùng tham chiếu).
  - Check `notTheme mochi`: trượt ở state mới ("Hãy chọn một theme khác Mochi ở thẻ Design."), đạt sau `setTheme bien`.
  - Check `transition 'any'`: trượt khi slide chưa có chuyển cảnh, đạt với `push`.
  - Check `theme`, `transition` (slide ngoài phạm vi → trượt, không văng), `placeholder` (role `body`, `textContains`
    không phân biệt hoa thường; `notEmpty`; slide không có role đó → trượt kèm lời khuyên đổi bố cục).
  - Check `elFormat`: so từng khoá trong `fmt`; thiếu khoá trên đối tượng → coi như mặc định (title 40 đậm, body 24,
    căn trái, màu theo theme = `undefined`); thông báo tiếng Việt nêu giá trị đang có.
  - Check `presented`: chưa chiếu → trượt "Hãy trình chiếu từ slide đầu tới slide cuối"; chiếu xong và đã thoát → đạt;
    đang chiếu dở (show khác null) → trượt "Nhấn Esc để thoát trình chiếu".
- [ ] **3. Chạy, xác nhận FAIL** — `npm test -w shared -- ppt`, đỏ vì thiếu `theme.ts`/`show.ts` và action mới.
- [ ] **4. Viết `theme.ts`, `show.ts`, nối vào `reducePpt`.** `contrastRatio` theo công thức WCAG 2.x (độ chói tương đối).
  `setTransition` và `setTheme` đi qua `withSlides` để có bậc hoàn tác. `THEME_VI` cho thông báo lấy `themeOf(id).name`.
- [ ] **5. Mở rộng `gradePpt`** cho 6 check mới, giọng như các check cũ (`ok()`/`no()`); `TRANSITION_VI`:
  `fade` "Mờ dần (Fade)", `push` "Đẩy (Push)", `zoom` "Phóng to (Zoom)".
- [ ] **6. Export** `theme.ts`, `show.ts` trong `index.ts`. `npm test && npm run typecheck` → xanh (client còn dùng
  `past` như `Slide[][]` thì sửa theo kiểu mới).
- [ ] **7. Commit** `feat(ppt): theme, chuyển cảnh, trình chiếu trong reducer + 5 check` kèm dòng Task 1 trong `STATUS.md`.
