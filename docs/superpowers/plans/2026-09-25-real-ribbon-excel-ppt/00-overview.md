# Ribbon giống Office thật cho Excel và PowerPoint (tổng quan)

> **Cách thực thi (người dùng đã chốt): CHẠY THẲNG TRONG PHIÊN, KHÔNG dùng subagent.** Ba task một phiên rồi mở
> phiên mới: `1–3`, `4–6`, `7–8`, rồi **chờ ảnh chụp** của người dùng, rồi `9–11`. Đừng gọi
> `superpowers:subagent-driven-development`. Các task nối nhau (vỏ ribbon Task 1 được mọi task sau dùng), và kiểm
> tra trên trình duyệt là việc của phiên chính.
> **Cách đọc:** đọc `STATUS.md`, rồi **đúng file này + đúng một file `task-NN-*.md`**. Không đọc task khác.

**Goal:** Dựng lại ribbon Excel và PowerPoint theo Office 365 tiếng Anh thật như Word đã làm, sửa 9 chỗ app lệch bản
thật, đưa danh sách ảnh cần chụp, và (khi có ảnh) gắn bước `realShot` cuối mọi bài có nút ribbon.

**Architecture:** Vỏ ribbon chung (`RibbonTabs`, `RibbonPanel`, `Swatched`, `Labeled`, `SplitButton`) trong
`client/src/components/ribbon.tsx`, ba app dùng chung, chỉ khác màu nhấn. Reducer thuần trong `shared/` chỉ đổi ở
hai chỗ: Excel thêm `dialog: 'sort'` và action `setChartTitle`. Mọi thứ khác là giao diện + lời bài học.

**Tech Stack:** TypeScript 5.6, React 18.3, Tailwind 4, Vitest 2, Testing Library, `@fluentui/react-icons` (đã cài).
Không thêm thư viện.

**Spec:** `docs/superpowers/specs/2026-09-25-real-ribbon-excel-ppt-design.md` (đọc bảng mục 2 trước mỗi task) và
`2026-09-24-real-ribbon-pilot-design.md`.

## Trước khi bắt đầu Task 1

Người dùng duyệt phần Word → gộp `feat/real-ribbon-pilot` vào `master` (`git merge --ff-only`), xoá nhánh, rồi tạo
`feat/real-ribbon-excel-ppt` **tại chỗ** (không worktree, kẻo preview cổng 5174 hỏng). Nếu người dùng muốn làm tiếp
trên nhánh cũ thì bỏ bước này.

## Global Constraints

- Thư mục: `C:\Users\vnext\Desktop\Project Manager\97. Tools\Dev\office-neko`. Đường dẫn cho Node trên Windows viết
  `C:/...`, KHÔNG `/c/...` (Node hiểu thành `C:\c\...`).
- Tên nhóm, chữ trên nút, tên thẻ: **tiếng Anh đúng như Office 365**. `aria-label` = tên tiếng Việt. Gợi ý
  `HELP_IDS[id].label` = `"English (Tiếng Việt)"`, `vi` ghi phím tắt nếu có. Không `title` khi đã có gợi ý.
- Mọi nhóm `variant="office"`; nút lớn `large`; icon Fluent `*20Regular` (danh sách đã kiểm ở từng task).
- Không bọc menu thả xuống trong khung `overflow-*` (lỗi 4B). `RibbonPanel` giữ ribbon cao tối thiểu 96px.
- Lời bài/gợi ý/bước giải/Hỏi Mèo: **thẻ X › nhóm Y › nút Z**; "tab" → "thẻ".
- Không đổi **giá trị** mà `solution`/`checks` bài học dùng (ví dụ `numFmt: 'currencyVnd'`), chỉ đổi nhãn.
- `tsconfig` strict + `noUncheckedIndexedAccess`. Chữ UTF-8 NFC.
- Mỗi task một commit, trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`, cập nhật một dòng
  `STATUS.md` trong cùng commit.

## Quy ước chung cho mọi task

**Lệnh:** `npm test -w shared -- <tên>`, `npm test -w client -- <tên>`, cuối task `npm test && npm run typecheck`.
Preview `office-neko` cổng 5174; hồ sơ thử bật Cài đặt › "Mở khoá toàn bộ bài học".

**Nhịp TDD:** test FAIL → xác nhận FAIL đúng lý do → code tối thiểu → PASS → **kiểm trên trình duyệt trong chính
task đó** → commit.

**Kiểm trên trình duyệt (bắt buộc với task giao diện)** — bài học của Word: ba lỗi người dùng tìm ra đều do mình
kiểm bằng cách gán giá trị bằng JS.
1. Thao tác bằng **chuột thật**: bấm ô chọn thì `document.activeElement` phải là `<select>`, rồi phím mũi tên +
   Enter; không dùng `form_input`/setter JS. Bấm vào nội dung rồi bấm nút ribbon: **chờ 1 s** giữa hai lần bấm.
2. Làm hết đúng bài học liên quan tới khi thấy "Giỏi quá!", rồi bỏ chọn/bấm ra chỗ khác xem ribbon còn hiện đúng
   trạng thái (ô chọn, nút sáng) theo ô/đối tượng đang đứng.
3. Mở mọi menu thả xuống của task, chụp ảnh xem không bị cắt; đo chiều cao ribbon mọi thẻ bằng nhau.
4. Khung 375px: `document.documentElement.scrollWidth === innerWidth`.
5. So ảnh chụp với Office thật (hoặc ảnh `client/public/images/real/` nếu đã có): đúng nhóm, đúng thứ tự.

**Không placeholder:** không "TODO", không "tương tự Task N".

## Có sẵn, cứ dùng

| Có sẵn | Ở đâu |
|---|---|
| `Group`, `Row`, `ToolButton` (`large`), `Picker`, `MenuButton` (`variant`), `SoonTab`, `RibbonVariant` | `client/src/components/ribbon.tsx` |
| Ribbon Word kiểu office (mẫu để chép khuôn): thanh thẻ, thẻ ngữ cảnh, `min-h-24`, `TableGrid`, `Labeled` | `client/src/sims/word/Ribbon.tsx` |
| `Swatched` (icon + vạch màu), dải Styles | `client/src/sims/word/RibbonHome.tsx` |
| `nativeTitle(helpId, text)` | `client/src/help/nativeTitle.ts` |
| Test "một nút một chú thích" quét Word/Excel/PPT | `client/src/help/doubleTooltip.test.tsx` |
| Bước `realShot`, `RealShot.tsx`, kiểm ảnh trong `content.test.ts` | `shared/src/types.ts`, `client/src/player/` |
| Tách ảnh từ Excel, làm mờ tên tài khoản | `client/scripts/real-shots.mjs`, `client/scripts/blur-names.ps1` |

## Danh sách task

| # | File | Nội dung |
|---|---|---|
| 1 | `task-01-ribbon-shell.md` | Vỏ ribbon chung + Word chuyển sang dùng |
| 2 | `task-02-excel-home.md` | Excel: thanh thẻ + Home (Undo \| Clipboard \| Font \| Alignment \| Number \| Editing) |
| 3 | `task-03-excel-formulas-file.md` | Excel: Formulas › Function Library, File, View |
| 4 | `task-04-excel-sort-filter.md` | Excel: Data › Sort & Filter, hộp thoại Sort, mũi tên lọc trong ô |
| 5 | `task-05-excel-charts.md` | Excel: Insert › Charts, sửa tiêu đề trên biểu đồ |
| 6 | `task-06-ppt-home.md` | PowerPoint: thanh thẻ + Home + File |
| 7 | `task-07-ppt-insert-thumbs.md` | PowerPoint: Insert, menu chuột phải trên hình thu nhỏ, lời "thẻ" |
| 8 | `task-08-shot-lists.md` | Danh sách chụp Excel/PPT + công cụ tách ảnh nhiều app |
| 9 | `task-09-excel-realshots.md` | **[chờ ảnh]** Gắn ảnh Excel thật |
| 10 | `task-10-ppt-realshots.md` | **[chờ ảnh]** Gắn ảnh PowerPoint thật |
| 11 | `task-11-wrapup.md` | Kiểm tổng thể ba app, memory, gộp nhánh |

## Review Focus

- Menu mở từ trong lưới Excel (lọc) bị khung `overflow-auto` của lưới cắt → Task 4 test menu nằm ngoài lưới.
- Kéo chọn từ C5 lên A2 rồi bấm Z→A: phải sắp theo cột **C** (ô đang chọn), không phải cột đầu vùng → Task 4.
- Sửa tiêu đề biểu đồ rồi để trống hoặc bấm Esc: giữ tiêu đề cũ, không thành chuỗi rỗng → Task 5.
- Xoá slide cuối cùng bằng chuột phải/phím Delete: phải bị chặn (luôn còn ≥ 1 slide) → Task 7.
- Phím Delete khi đang sửa chữ trong hộp chữ PowerPoint không được xoá slide → Task 7.
