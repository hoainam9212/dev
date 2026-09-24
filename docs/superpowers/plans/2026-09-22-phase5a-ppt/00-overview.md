# Giai đoạn 5A – PowerPoint: lõi và soạn slide (tổng quan)

> **Cách thực thi (người dùng đã chốt 2026-09-22): CHẠY THẲNG TRONG PHIÊN, KHÔNG dùng subagent.**
> Ba task một phiên rồi mở phiên mới (`1–3`, `4–6`, `7–8`, `9–11`). Lý do: các task nối nhau chặt — ở giai đoạn 4B,
> một lỗi sinh ở task 1 mãi task 8 mới lộ và phải quay lại sửa cả code lẫn test của task 1, việc mà một subagent
> không có ngữ cảnh để làm. Plan này lại **không chứa mã test nguyên văn** (cố ý, để tiết kiệm token), nên subagent
> sẽ phải tự thiết kế test — mất luôn phần rẻ. Kiểm tra trên trình duyệt cũng là việc của phiên chính.
> Đừng gọi `superpowers:subagent-driven-development`.
> **Cách đọc plan này:** đọc **đúng file này + đúng một file `task-NN-*.md`**. Không đọc các task khác. Đọc `STATUS.md` trước để biết đã làm tới đâu.

**Goal:** Dựng trình mô phỏng PowerPoint tới mức **soạn được một bài trình chiếu**: nhiều slide, bốn bố cục, ba loại đối tượng (hộp chữ / hình khối / ảnh) kéo–thả–đổi kích thước được, định dạng chữ cơ bản, chấm bài bằng 4 loại check, và 6 bài học đầu (chương 1–2). Trang trí (theme), chuyển cảnh, trình chiếu toàn màn hình và 6 bài còn lại + dự án để dành cho **5B**.

**Architecture:** Đúng khuôn đã dùng cho Word và Excel — reducer thuần trong `shared/src/sims/ppt/`, React chỉ vẽ và phát action trong `client/src/sims/ppt/`. Cái mới duy nhất so với hai sim trước là **toạ độ**: slide là khung cố định 960×540 px, giao diện co giãn bằng `transform: scale(k)` còn state luôn nói bằng px của khung gốc, nên reducer không bao giờ cần biết kích thước màn hình.

**Tech Stack:** giữ nguyên TypeScript 5.6, React 18.3, Tailwind 4, Vitest 2, Testing Library. **Không thêm thư viện** — hình khối tự vẽ bằng SVG/DOM.

**Spec:** `docs/superpowers/specs/2026-09-22-ppt-design.md` (mục 2–6, và mục 7 chương 1–2) và `2026-09-19-office-neko-design.md` §7.6.

---

## Global Constraints

- Thư mục dự án: `C:\Users\vnext\Desktop\Project Manager\97. Tools\Dev\office-neko`. Branch: `feat/phase5a-ppt`, tạo tại chỗ (không dùng git worktree, kẻo preview cổng 5174 hỏng).
- Toàn bộ chữ giao diện là **tiếng Việt**, UTF-8 dạng NFC. Nhãn nút giữ tên tiếng Anh thật (New Slide, Layout, Text Box, Shapes, Pictures) kèm giải nghĩa tiếng Việt ở `title` + `helpId`.
- Không server, không gọi mạng. Không dùng logo/thương hiệu Microsoft.
- `tsconfig` bật `strict` và `noUncheckedIndexedAccess`.
- **Quy tắc trình mô phỏng:** Component giữ state bằng `useReducer(def.reduce, initial)` và gọi `onState(state)` mỗi khi state đổi. Không có logic trạng thái nằm ngoài reducer.
- Mỗi task kết thúc bằng **một commit**: `git commit -m "<subject>" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"`, kèm cập nhật `STATUS.md` một dòng trong cùng commit.

## Quy ước chung cho mọi task

**Lệnh kiểm tra** (từ gốc repo, Git Bash): `npm test -w shared -- <tên>`, `npm test -w client -- <tên>`, toàn bộ `npm test && npm run typecheck`. Chạy thử: preview `office-neko`, cổng 5174.

**Nhịp TDD:** viết test FAIL → chạy xác nhận FAIL vì đúng lý do → code tối thiểu → chạy xác nhận PASS → (task giao diện: **kiểm tra trên trình duyệt ngay trong task này**) → commit.

**Ba điều phải tự soi trước khi nói xong một task giao diện** (bài học đắt của 4A/4B — người dùng bắt được cả ba):
1. **Nhìn ảnh chụp thật**, đừng chỉ hỏi DOM. Có giống PowerPoint thật không? Có giống ribbon Word/Excel đã làm trong app không? Dùng lại `Group`, `ToolButton`, `Picker` trong `client/src/sims/excel/RibbonHome.tsx`.
2. **Kiểm CSS có hiệu lực** bằng `getComputedStyle`. Lớp thành phần mới phải nằm ở **cấp đầu** của `@layer components` trong `theme.css` — `theme.test.ts` canh chuyện này, và hãy thêm tên lớp mới vào danh sách nó kiểm.
3. **Đọc lại đề bài:** người học làm đúng ý đề mà vẫn trượt được không? Đề mở thì check phải mở (`slideTitle` với `notEmpty`), đừng lấy `solution` mẫu làm đáp án duy nhất.

**Thêm cho 5A — đối tượng có toạ độ, nên phải tự soi thêm:** jsdom không có layout, mọi test vẫn xanh khi đối tượng nằm chồng lên nhau hoặc lọt ra ngoài khung. Bài học của 4B (nhãn SVG tràn khung, không test nào kêu) lặp lại y hệt ở đây. Cách kiểm: đọc `style` thật của từng đối tượng trên canvas, so `x+w ≤ 960`, `y+h ≤ 540`, và **nhìn ảnh chụp**.

**Không placeholder:** không "TODO", không "xử lý lỗi phù hợp", không "tương tự Task N".

## Những gì đã có, cứ dùng, đừng làm lại

| Có sẵn | Ở đâu |
|---|---|
| `SimKind` đã khai báo `'ppt'` (chưa có sim nào đăng ký) | `shared/src/types.ts:2` |
| `TRACKS` đã có track `ppt` với `chapters: []` | `client/src/content/tracks.ts` |
| Khung chấm bài `Grader`, `CheckResult`, `gradeWith`, bảng `GRADERS` | `shared/src/grading/` |
| Mẫu grader viết bằng tiếng Việt, kèm `ok()`/`no()` | `shared/src/sims/excel/grade.ts` |
| `Group`, `ToolButton`, `Picker`, kiểu ribbon có tab | `client/src/sims/excel/Ribbon.tsx`, `RibbonHome.tsx` |
| Hộp thoại Lưu / In mô phỏng | `client/src/sims/excel/dialogs.tsx`, `client/src/sims/word/dialogs.tsx` |
| Hộp thoại chèn ảnh (chọn ảnh mẫu hoặc tải lên) | `client/src/sims/word/dialogs.tsx` |
| `SimProps`, `SimDefinition`, bảng `SIMS` | `client/src/sims/types.ts`, `registry.ts` |
| `HELP_IDS`, `glossary.json`, `faq.json` | `client/src/content/` |
| Mẫu `PracticeStep` cho từng sim | `client/src/content/lessonKit.ts` |

## Danh sách task

Thứ tự bắt buộc: Task N chỉ bắt đầu khi Task N−1 đã commit.

| # | File | Nội dung | Ước lượng |
|---|---|---|---|
| 1 | `task-01-state-slides.md` | Mô hình slide + bố cục + hành động slide (shared) | 1 phiên |
| 2 | `task-02-elements.md` | Đối tượng: chèn, chọn, dời, đổi kích thước, thứ tự vẽ (shared) | 1 phiên |
| 3 | `task-03-text-format.md` | Sửa chữ, định dạng, hoàn tác, Lưu/In (shared) | 1 phiên |
| 4 | `task-04-grader.md` | `gradePpt` + 4 loại check, đăng ký `GRADERS` (shared) | 1 phiên nhỏ |
| 5 | `task-05-shell.md` | `PptSim` + cột thumbnail + canvas tĩnh + đăng ký sim (client) | 1 phiên |
| 6 | `task-06-canvas-drag.md` | Kéo dời, 8 tay nắm, bàn phím, nháy đúp sửa chữ (client) | 1 phiên |
| 7 | `task-07-ribbon-home.md` | Tab **Home**: New Slide, Layout, định dạng chữ (client) | 1 phiên |
| 8 | `task-08-ribbon-insert.md` | Tab **Insert**: Text Box, Shapes, Pictures (client) | 1 phiên |
| 9 | `task-09-lessons-ch1.md` | Chương 1 "Slide đầu tiên": 3 bài | 1 phiên |
| 10 | `task-10-lessons-ch2.md` | Chương 2 "Chữ, hình, ảnh": 3 bài | 1 phiên |
| 11 | `task-11-wrapup.md` | Từ điển, Hỏi Mèo, README, kiểm tra tổng thể, gộp nhánh | 1 phiên nhỏ |

## Cấu trúc file sẽ tạo

```
shared/src/sims/ppt/
  state.ts        # PptState, PptAction, reducePpt, pptInitial, LAYOUTS  (Task 1)
  layout.ts       # applyLayout, chỗ dành sẵn                            (Task 1)
  elements.ts     # addEl, moveEl, resizeEl, clamp, snap, z-order        (Task 2)
  text.ts         # sửa chữ + setFmt                                     (Task 3)
  grade.ts        # gradePpt, PptCheck                                   (Task 4)
  index.ts        # export lại                                           (Task 1)
  (sửa) ../../grading/index.ts   # đăng ký grader                        (Task 4)
  (sửa) ../../index.ts           # export * as pptSim                    (Task 1)
client/src/sims/ppt/
  PptSim.tsx      # vỏ: ribbon + thumbnail + canvas                      (Task 5)
  SlideList.tsx   # cột thumbnail                                        (Task 5)
  Canvas.tsx      # khung 16:9, vẽ đối tượng                             (Task 5)
  ElementView.tsx # vẽ một đối tượng + tay nắm                           (Task 6)
  Ribbon.tsx      # thanh tab                                            (Task 7)
  RibbonHome.tsx  # tab Home                                             (Task 7)
  RibbonInsert.tsx# tab Insert                                           (Task 8)
  dialogs.tsx     # Lưu / In / chèn ảnh                                  (Task 8)
client/src/content/lessons/ppt-basics.ts                                  (Task 9)
client/src/content/lessons/ppt-objects.ts                                 (Task 10)
```

## Bất biến phải luôn đúng

1. `client/src/content/content.test.ts` phát lại `solution` của **mọi** `PracticeStep` rồi chấm — phải `pass`. Đừng sửa test này để "cho qua".
2. Mọi `[[id|chữ]]` trong bài phải có trong `glossary.json`; mọi mục FAQ bắt buộc có `keywords` (hai file bị **ép kiểu**, typecheck không bắt thiếu trường).
3. Mọi `helpId` trong `hints[1]` phải có trong `HELP_IDS`.
4. `reducePpt` **thuần**: id lấy từ `state.nextId`, không `Date.now()`, không random. Thời gian đi kèm trong action (`save`).
5. Luôn còn ít nhất một slide. Đổi slide thì `sel = null` và `editing = null`.
6. Đối tượng luôn nằm trong khung 960×540 và không nhỏ hơn 60×32; mọi toạ độ là bội số của 8.
7. Thêm thứ mới vào `shared` mà giao diện báo `undefined` → **`rm -rf client/node_modules/.vite`** rồi khởi động lại dev server (bộ nhớ đệm giữ bản `shared` cũ).
