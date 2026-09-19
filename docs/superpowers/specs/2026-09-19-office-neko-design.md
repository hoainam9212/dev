# Tin Học Cùng Mochi (office-neko) – Thiết kế phần mềm học Tin học văn phòng

Ngày: 2026-09-19
Trạng thái: đã duyệt thiết kế (4 phần) – chờ duyệt spec trước khi lập kế hoạch

## 1. Mục tiêu

Ứng dụng web (PWA, chạy offline) dạy Tin học văn phòng cho **người mới hoàn toàn với máy tính**:
làm quen máy tính (Windows và macOS), gõ bàn phím 10 ngón (kể cả gõ tiếng Việt Telex/VNI),
Word, Excel, PowerPoint ở mức cơ bản đến trung cấp, và cách dùng trợ lý AI (như Claude) cho
công việc văn phòng.

Người học **thực hành trực tiếp trong các trình mô phỏng** dựng sẵn trong app (không cần cài
Office), được chấm tự động và nhận phản hồi tiếng Việt. Giao diện phong cách anime pastel
dễ thương với mascot là **mèo Mochi**. Toàn bộ chữ giao diện là tiếng Việt; riêng ribbon của
trình mô phỏng Office dùng nhãn tiếng Anh giống Microsoft 365 (kèm chú thích tiếng Việt).

Tiêu chí thành công:
- Người chưa từng dùng máy tính có thể tự học từ lộ trình 0 đến hết lộ trình 5 mà không cần người kèm.
- Không bài tập nào "không thể qua": mọi bài đều có lời giải mẫu được test tự động là đạt.
- Mọi thuật ngữ lạ đều tra được nghĩa ngay tại chỗ.

## 2. Ngoài phạm vi (YAGNI)

- Tài khoản, server, đồng bộ đám mây, lớp học/giáo viên.
- Gọi Claude API hay bất kỳ LLM thật nào.
- Mở/lưu file `.xlsx/.docx/.pptx` thật.
- Pivot Table, INDEX/MATCH, định dạng có điều kiện, Mail Merge, macro, Slide Master, animation từng đối tượng.
- Tối ưu giao diện điện thoại (trên điện thoại chỉ đảm bảo đọc bài giảng, Từ điển, câu hỏi).
- Đa ngôn ngữ giao diện.

## 3. Người học và hệ điều hành

- Đối tượng: người mới hoàn toàn → câu chữ ngắn, ví dụ đời thường, hình minh hoạ nhiều, chữ to (có cài đặt cỡ chữ).
- **Chế độ hệ điều hành** `os: 'win' | 'mac'`:
  - Chọn ở màn hình chào; mặc định đoán từ `navigator.userAgentData.platform` / `navigator.platform`; đổi được trong Cài đặt.
  - Lộ trình 0 có hai phiên bản giao diện: **Windows 11** (Start, Taskbar, File Explorer, Recycle Bin, phím Windows, chuột phải) và **macOS** (Dock, thanh menu, Finder, Launchpad/Spotlight, Trash, ⌘/⌥, Control-click hoặc chạm 2 ngón).
  - Phím tắt hiển thị qua component `<Kbd combo="mod+B" />`: `mod` = Ctrl (win) / ⌘ (mac); `alt` = Alt / ⌥. Trình mô phỏng nhận đúng phím bổ trợ theo `os` (`ctrlKey` hoặc `metaKey`).
  - Bàn phím ảo trong lộ trình gõ phím vẽ theo bố cục Windows hoặc Mac.
  - Bài bật bộ gõ tiếng Việt: Windows (Unikey/EVKey hoặc bàn phím Vietnamese của Windows), Mac (System Settings → Keyboard → Input Sources → Vietnamese Telex).
  - Bài học có thể khai báo `osNote: { win?: string; mac?: string }` để ghi chú khác biệt ở lộ trình Office.

## 4. Chương trình học

Cấu trúc: **Lộ trình → Chương → Bài**. Bài gồm các bước thuộc 3 loại: `explain` (thẻ giải
thích có mascot + hình), `practice` (làm trên trình mô phỏng, chấm tự động), `quiz` (câu hỏi
nhanh). Cuối mỗi lộ trình có một **dự án**. Lộ trình mở theo thứ tự; bài kiểm tra đầu vào
cho phép mở khoá sớm.

| # | Lộ trình | Nội dung | Dự án cuối | Số bài |
|---|---|---|---|---|
| 0 | Làm quen máy tính | Chuột (click, double-click, chuột phải, kéo-thả, cuộn), phím đặc biệt (Enter, Shift, Backspace/Delete, Ctrl/⌘, Alt/⌥, Tab, Esc, phím mũi tên), desktop, Explorer/Finder, phím tắt copy/paste/undo/save | Sắp xếp thư mục "Ảnh du lịch" | ~10 × 2 HĐH |
| 1 | Gõ phím 10 ngón | Tư thế; hàng cơ sở → hàng trên → hàng dưới → số → ký hiệu; từ → câu → đoạn dài; Telex; VNI; trò chơi Mèo bắt cá; kiểm tra tốc độ | Gõ đoạn văn ≥ 25 WPM, chính xác ≥ 95% | ~20 |
| 2 | Word | Giao diện; gõ và sửa; định dạng chữ; đoạn và căn lề; danh sách; bảng; ảnh; Heading và mục lục; Tìm & Thay thế; Lưu/In mô phỏng | Đơn xin việc | ~15 |
| 3 | Excel | Ô/hàng/cột/sheet; nhập liệu, định dạng số; công thức; hàm tính toán; địa chỉ tương đối/tuyệt đối; IF; COUNTIF/SUMIF; VLOOKUP; hàm chữ; sắp xếp và lọc; biểu đồ | Bảng lương 10 nhân viên | ~20 |
| 4 | PowerPoint | Slide, bố cục; chữ, hình, ảnh; theme; chuyển cảnh; trình chiếu | Slide giới thiệu bản thân | ~12 |
| 5 | Dùng AI (Claude) | AI là gì; bảo mật dữ liệu; cấu trúc prompt (vai trò, ngữ cảnh, nhiệm vụ, định dạng, giới hạn); viết email, tóm tắt, tạo công thức Excel, dàn ý slide; kiểm chứng câu trả lời AI | Prompt tạo báo cáo tuần | ~10 |

Tổng khoảng 90 bài, 200 mục từ điển, 150 câu hỏi thường gặp.

## 5. Hệ thống Trợ giúp

1. **Từ điển thuật ngữ** (`content/glossary.json`): mỗi mục gồm `term` (tiếng Anh), `say`
   (cách đọc), `vi` (nghĩa), `explain` (giải thích đơn giản), `image?`, `os?` (thuật ngữ riêng
   một HĐH), `lessonIds` (bài có dùng). Mở ở mọi màn hình bằng nút "?" nổi hoặc phím **F1**;
   tìm kiếm không dấu và gần đúng.
2. **Chú thích tại chỗ**:
   - Mỗi nút ribbon/điều khiển trình mô phỏng có `helpId`; hover hoặc chạm → tooltip tên + công dụng tiếng Việt.
   - Thuật ngữ trong bài học viết dạng `[[Cell]]` trong nội dung → hiển thị gạch chân chấm, bấm → popup nghĩa + "Xem thêm" mở Từ điển.
   - Excel: khi đang gõ tên hàm (`=VLOOKUP(`) hiện thẻ cú pháp + giải thích từng đối số bằng tiếng Việt, tô đậm đối số đang gõ.
3. **Gợi ý 3 bậc** trong bước `practice`: bậc 1 gợi ý lời; bậc 2 Mochi chỉ vào nút/ô cần thao tác (spotlight theo `helpId` hoặc địa chỉ ô); bậc 3 lời giải từng bước. Dùng gợi ý giảm sao, không chặn tiến độ.
4. **Hỏi Mèo**: khung hỏi đáp offline, tìm không dấu trong `content/faq.json` (~150 câu, ví dụ "Làm sao bỏ in đậm?", "Vì sao ô hiện ####?") và Từ điển; kết quả lọc theo `os` hiện tại.

## 6. Kiến trúc

```
office-neko/
  package.json            # npm workspaces: shared, client
  tsconfig.base.json
  shared/                 # TypeScript thuần, không phụ thuộc React, có test (Vitest)
    src/formula/          # bộ tính công thức Excel
    src/ime/              # bộ gõ Telex + VNI
    src/typing/           # WPM, độ chính xác, thống kê phím
    src/vfs/              # mô hình file/thư mục dùng chung Windows + Mac
    src/grading/          # hàm chấm thuần cho từng trình mô phỏng
    src/search/           # tìm kiếm không dấu, gần đúng
    src/types.ts          # Lesson, Step, Check, GlossaryEntry, FaqEntry, Progress...
  client/                 # React 18 + Vite + TypeScript + Tailwind 4 + vite-plugin-pwa
    src/app/              # router, layout, theme pastel, mascot Mochi (SVG nhiều biểu cảm)
    src/player/           # trình chạy bài học, chấm sao
    src/sims/             # mouse, desktop (win/mac), keyboard, word, excel, ppt, aichat
    src/help/             # Từ điển, tooltip, gợi ý, Hỏi Mèo
    src/progress/         # Dexie (IndexedDB), XP, streak, huy hiệu, sao lưu
    src/content/          # bài học theo lộ trình (TS có kiểu), glossary.json, faq.json, ảnh
  docs/superpowers/       # specs, plans
  Start Tin Hoc.bat       # build sẵn + mở server tĩnh cục bộ
```

Thư viện: `react`, `react-router-dom`, `zustand`, `dexie`, `dexie-react-hooks`, `@tiptap/*`
(MIT, cho Word), `vite-plugin-pwa`; dev: `vitest`, `@testing-library/react`, `jsdom`,
`fake-indexeddb`. Biểu đồ Excel và khung PowerPoint tự vẽ bằng SVG/DOM, không thêm thư viện.

### 6.1 Mô hình bài học (`shared/src/types.ts`)

```ts
type OS = 'win' | 'mac';
type SimKind = 'mouse' | 'desktop' | 'keyboard' | 'word' | 'excel' | 'ppt' | 'aichat';

interface Lesson {
  id: string;               // 'excel.vlookup.1'
  trackId: string; chapterId: string;
  title: string; minutes: number;
  os?: OS;                  // chỉ hiện với HĐH này (lộ trình 0)
  osNote?: { win?: string; mac?: string };
  steps: Step[];
}
type Step = ExplainStep | PracticeStep | QuizStep;
interface ExplainStep { kind: 'explain'; body: string; image?: string; mood?: MochiMood }
interface QuizStep { kind: 'quiz'; question: string; choices: string[]; answer: number; why: string }
interface PracticeStep {
  kind: 'practice';
  sim: SimKind;
  task: string;             // đề bài, có thể chứa [[thuật ngữ]]
  initial: unknown;         // trạng thái ban đầu, kiểu cụ thể theo sim
  checks: Check[];          // điều kiện đạt (union theo sim, xem mục 7)
  hints: [string, Spotlight, string[]];  // bậc 1 lời, bậc 2 chỉ chỗ, bậc 3 các bước
  solution: SolutionAction[];            // chuỗi thao tác mẫu, dùng cho test "bài nào cũng qua được"
}
// Spotlight: vùng Mochi chỉ vào ở gợi ý bậc 2
type Spotlight = { helpId: string } | { cell: string } | { path: string } | { key: string };
// SolutionAction: action của reducer trình mô phỏng tương ứng (mỗi sim định nghĩa union riêng)
```

### 6.2 Luồng một bước thực hành

1. Player dựng trình mô phỏng `sim` với `initial`.
2. Mỗi thay đổi, trình mô phỏng phát `onState(state)`.
3. Player gọi `grade(sim, state, checks)` (từ `shared/src/grading`) → `{ pass: boolean; results: { check, ok, messageVi }[] }`. Chấm tự động khi trạng thái thay đổi (debounce 300 ms) và khi bấm "Kiểm tra".
4. Chấm theo **kết quả**, không theo chuỗi thao tác: `=SUM(B2:B10)` và `=B2+…+B10` cùng đạt trừ khi check yêu cầu hàm cụ thể.
5. Đạt → Mochi ăn mừng, tính sao, sang bước tiếp.

### 6.3 Lưu trữ (Dexie)

Bảng: `profile` (tên, os, mục tiêu phút/ngày, cỡ chữ, âm thanh, giảm chuyển động),
`progress` (lessonId, stars, hintsUsed, bestTimeMs, completedAt), `typingRuns` (thời điểm,
chế độ, wpm, accuracy), `keyStats` (phím → số lần đúng/sai), `activity` (ngày → phút học,
XP), `badges`, `sandboxDocs` (id, sim, tên, state, updatedAt).
**Sao lưu**: xuất toàn bộ DB ra file `tinhoc-mochi-backup-YYYYMMDD.json` (có `schemaVersion`),
nhập lại thay thế dữ liệu sau khi xác nhận.

### 6.4 Chạy và triển khai

`npm run dev` (Vite), `npm run build` → thư mục tĩnh `client/dist`, service worker precache
toàn bộ để chạy offline, cài được như app. `Start Tin Hoc.bat` phục vụ `client/dist` cục bộ
và mở trình duyệt.

## 7. Trình mô phỏng

### 7.1 Phòng tập chuột (`mouse`)
5 trò: Bấm bong bóng (click), Mở hộp quà (double-click), Menu chuột phải (right-click /
Control-click trên Mac), Kéo cá vào giỏ (drag), Cuộn tìm mèo (scroll). Đo số lần trúng/trượt
và thời gian. Check: `{ kind: 'mouseGame', game, minHits, maxMisses? }`.

### 7.2 Desktop + Explorer/Finder (`desktop`)
- `shared/src/vfs`: cây thư mục với thao tác `mkdir, create, rename, move, copy, remove (vào thùng rác), restore, emptyTrash`, đường dẫn, kiểm tra trùng tên; có undo.
- Hai vỏ giao diện: Windows 11 (desktop, taskbar, Start, File Explorer có thanh địa chỉ + ribbon rút gọn, Recycle Bin) và macOS (menu bar, Dock, Finder có sidebar, Trash). Hỗ trợ chọn nhiều (Ctrl/⌘-click, Shift-click), kéo-thả, menu chuột phải, phím tắt copy/cut/paste/undo/rename (F2 / Enter trên Mac)/delete.
- Checks: `pathExists`, `fileInFolder`, `inTrash`, `notExists`, `nameIs`.

### 7.3 Gõ phím (`keyboard`)
- Bàn phím ảo tô màu theo ngón, sáng phím kế tiếp, hình bàn tay chỉ ngón; bố cục theo `os`.
- Chế độ: `drill` (cụm phím), `words`, `sentences`, `passage` (đoạn dài: chữ chưa gõ xám, đúng xanh, sai đỏ, con trỏ gạch chân; tuỳ chọn cho phép Backspace), `test` (1 hoặc 3 phút).
- Chế độ tiếng Việt: `shared/src/ime` chuyển chuỗi phím Telex/VNI thành chữ có dấu (đặt dấu theo quy tắc kiểu mới, hỗ trợ gõ dấu sau cả từ, `w`/`aa`/`dd`, huỷ dấu khi gõ lặp). Nếu phát hiện `compositionstart` hoặc chữ có dấu tới trực tiếp từ bàn phím → cảnh báo tắt bộ gõ của máy.
- Trò chơi **Mèo bắt cá**: cá mang từ rơi xuống, gõ đúng để bắt, tốc độ tăng theo màn, 3 mạng.
- `shared/src/typing`: WPM = (ký tự đúng / 5) / phút; độ chính xác = đúng / tổng phím gõ; thống kê theo phím.
- Thống kê: biểu đồ WPM theo thời gian, bản đồ nhiệt phím hay sai.
- Checks: `{ kind: 'typing', minWpm?, minAccuracy?, completeText?: true }`.

### 7.4 Word (`word`)
- TipTap với: Bold/Italic/Underline, font family (5 font), size, màu chữ, highlight, căn lề 4 kiểu, giãn dòng, bullet/numbered list, Heading 1–3, bảng (chèn, thêm/xoá hàng cột), ảnh (thư viện ảnh có sẵn + tải lên), mục lục sinh từ Heading, Tìm & Thay thế, hộp thoại Lưu/In mô phỏng, trang khổ A4.
- Ribbon tab: File, Home, Insert, Layout, References, View (chỉ nút cần dùng, mỗi nút có `helpId`).
- State: ProseMirror JSON. Checks: `textContains`, `markOnText` (text + mark + giá trị), `paragraphAlign`, `listType`, `headingLevel`, `tableSize`, `imageCount`, `hasToc`, `textNotContains`.

### 7.5 Excel (`excel`)
- **Bộ tính công thức** (`shared/src/formula`): tokenizer → parser (AST, ưu tiên toán tử `^ * / + - & = <> < > <= >=`, `%`) → evaluator với đồ thị phụ thuộc, tính lại tăng dần, phát hiện tham chiếu vòng. Địa chỉ `A1`, `$A$1`, `A$1`, vùng `B2:B10`, `Sheet2!A1`. Dịch địa chỉ tương đối khi copy/fill.
- Hàm (25): SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, ROUND, IF, AND, OR, SUMIF, COUNTIF, AVERAGEIF, VLOOKUP, LEFT, RIGHT, MID, LEN, UPPER, LOWER, PROPER, TRIM, CONCAT, TODAY, ABS; toán tử `&`.
- Lỗi `#DIV/0! #N/A #REF! #NAME? #VALUE!` và tham chiếu vòng, mỗi lỗi kèm giải thích tiếng Việt và gợi ý sửa (ví dụ "Bạn quên dấu = ở đầu công thức").
- Giao diện: nhiều sheet, 50 hàng × 26 cột, Name Box, thanh công thức, chọn ô (click, kéo, Shift), fill handle, copy/paste, định dạng số (General, Number, Currency VND, Percent, Date), bold/italic, màu chữ/nền, viền, gộp ô, căn lề, độ rộng cột, sắp xếp, AutoFilter, biểu đồ cột/thanh/đường/tròn (SVG), thẻ cú pháp hàm tiếng Việt.
- Checks: `cellValue`, `cellFormula` (`fn?`, `range?`, `absolute?`), `cellFormat`, `rangeSorted`, `filterActive`, `chart` (`type`, `range`).

### 7.6 PowerPoint (`ppt`)
- Cột thumbnail, khung 16:9, bố cục Title / Title + Content / Two Content / Blank, đối tượng hộp chữ / hình khối / ảnh (kéo di chuyển, 8 tay nắm đổi kích thước), định dạng chữ cơ bản, 6 theme pastel, chuyển cảnh Fade/Push/Zoom, trình chiếu toàn màn hình (mũi tên, Esc).
- Checks: `slideCount`, `slideLayout`, `slideTitle`, `hasElement` (loại, số lượng), `theme`, `transition`.

### 7.7 Trò chuyện AI (`aichat`)
- Giao diện chat trung tính, nhãn rõ "Mô phỏng trợ lý AI"; không dùng logo/thương hiệu Anthropic.
- Bài viết prompt: chấm 5 tiêu chí (vai trò, ngữ cảnh, nhiệm vụ, định dạng đầu ra, giới hạn) bằng từ khoá/mẫu câu tiếng Việt + độ dài tối thiểu; đây là góp ý, không chấm khắt khe. Hiện điểm từng tiêu chí và câu trả lời mẫu soạn sẵn theo mức chất lượng prompt (yếu / khá / tốt).
- Bài "Bắt lỗi AI": chọn câu sai trong câu trả lời mẫu.
- Bài an toàn: chọn thông tin không nên đưa cho AI (mật khẩu, số CCCD, dữ liệu khách hàng...).
- Bài liên kết: chép công thức AI gợi ý sang Excel mô phỏng để kiểm chứng.
- Checks: `promptCriteria` (danh sách tiêu chí bắt buộc, `minScore`), `pickSentence`, `pickItems`.

## 8. Trò chơi hoá và tiến độ

- Màn hình chào: tên, HĐH, mục tiêu 5/10/20 phút mỗi ngày, "Học từ đầu" hoặc "Kiểm tra đầu vào".
- Trang chủ: bản đồ lộ trình dạng con đường, mỗi bài là chấm 0–3 sao, Mochi đứng ở bài kế tiếp; thẻ streak 🔥, vòng mục tiêu hôm nay, XP/cấp, nút Phòng tự do.
- Sao ("lần sai" = số lần bấm "Kiểm tra" khi chưa đạt; chấm tự động ngầm không tính): 3 sao = không gợi ý và sai tối đa 1 lần; 2 sao = dùng gợi ý bậc 1 hoặc sai 2–3 lần; 1 sao = dùng gợi ý bậc 2–3 hoặc xem lời giải. XP = 10 × sao (+ thưởng dự án).
- Huy hiệu ví dụ: "Ngón tay thần tốc" (40 WPM), "Phù thủy công thức" (xong chương VLOOKUP), "Người kể chuyện" (xong dự án PowerPoint), "Chăm chỉ 7 ngày".
- Phụ kiện cho Mochi mở khoá theo cấp (mũ, nơ, kính), chỉ để trang trí.
- Giọng điệu khi sai: động viên, luôn có đường "Xem lời giải và làm lại".
- Cài đặt: cỡ chữ (3 mức), âm thanh, giảm chuyển động, HĐH, sao lưu xuất/nhập, nguồn và giấy phép.
- Phòng tự do: mở Word/Excel/PowerPoint mô phỏng không đề bài, tự lưu vào `sandboxDocs`.

## 9. Kiểm thử

- Vitest cho `shared/`: formula (parser, từng hàm, lỗi, dịch địa chỉ, tham chiếu vòng), ime (bảng quy tắc Telex/VNI, vị trí dấu), typing, vfs, grading từng loại check, search.
- Testing Library cho thao tác chính của từng trình mô phỏng (nhập công thức, định dạng Word, kéo đối tượng PPT, thao tác file).
- **Test nội dung**: với mọi `PracticeStep`, áp `solution` lên `initial` qua reducer của sim rồi `grade` → phải `pass`; kiểm tra mọi `[[thuật ngữ]]` trong bài đều có trong glossary; mọi `helpId` trong hint/spotlight tồn tại.
- Kiểm tra thủ công qua preview trình duyệt sau mỗi giai đoạn.

## 10. Thứ tự triển khai

Mỗi giai đoạn có kế hoạch riêng, xong là chạy và dùng thử được.

1. **Nền tảng**: monorepo, `shared` (types, search, vfs, typing, ime, khung grading), khung app + theme + mascot Mochi, player bài học, Dexie + tiến độ + sao lưu, hệ thống Trợ giúp, màn hình chào + chọn HĐH.
2. **Lộ trình 0 + 1**: phòng tập chuột, desktop Windows/Mac, gõ phím đủ chế độ, Telex/VNI, Mèo bắt cá, kiểm tra tốc độ, nội dung bài.
3. **Word**: trình mô phỏng + 15 bài + mục từ điển/FAQ liên quan.
4. **Excel**: bộ tính công thức + trình mô phỏng + 20 bài.
5. **PowerPoint**: trình mô phỏng + 12 bài.
6. **AI + hoàn thiện**: trò chuyện AI + 10 bài, Phòng tự do, dự án cuối các lộ trình, kiểm tra đầu vào, huy hiệu/phụ kiện, `Start Tin Hoc.bat`, hoàn thiện PWA.
