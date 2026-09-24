# PowerPoint (`ppt`) – thiết kế chi tiết

Mở rộng §7.6 của `2026-09-19-office-neko-design.md`. Viết cùng kiểu với
`2026-09-21-excel-design.md`: spec này là nguồn duy nhất cho hai plan **5A** và **5B**.

Ngày: 2026-09-22. Nền: giai đoạn 4B đã xong (Excel 20 bài / 7 chương).

---

## 1. Phạm vi và cách chia hai giai đoạn

| | 5A – Lõi + soạn slide | 5B – Trang trí + trình chiếu + bài |
|---|---|---|
| shared | mô hình slide/đối tượng, reducer, grader (4 loại check) | theme, chuyển cảnh, 2 loại check còn lại |
| client | vỏ sim (cột thumbnail + khung 16:9), kéo–thả–đổi kích thước, ribbon Home + Insert | ribbon Design + Transitions + Slide Show, chế độ trình chiếu |
| bài học | 6 bài (chương 1–2) | 6 bài (chương 3–4) + dự án "Slide giới thiệu bản thân" |

Tổng lộ trình: **12 bài / 5 chương** (design gốc §5 nói ~12 bài).

**Cố ý KHÔNG làm** (cả 5A lẫn 5B): Slide Master, animation từng đối tượng, xoay đối
tượng, nhóm đối tượng, bảng/biểu đồ trong slide, ghi chú người trình bày (`notes`),
xuất PDF. Ghi ở đây để ai đọc sau không tưởng là bỏ sót.

---

## 2. Mô hình dữ liệu (`shared/src/sims/ppt/state.ts`)

Khung slide là **960 × 540 px** (16:9). Mọi toạ độ đối tượng tính bằng px trên khung
này; giao diện chỉ co giãn khi vẽ (`transform: scale`), state không bao giờ biết kích
thước màn hình thật — nhờ vậy reducer vẫn thuần và test không cần layout.

```ts
export const SLIDE_W = 960;
export const SLIDE_H = 540;

export type Layout = 'title' | 'titleContent' | 'twoContent' | 'blank';
export type ElKind = 'text' | 'shape' | 'image';
export type ShapeKind = 'rect' | 'ellipse' | 'arrow' | 'star';
/** Vai trò chỗ dành sẵn của bố cục. Đối tượng tự chèn có role = undefined. */
export type Role = 'title' | 'body' | 'body2';

export interface ElFormat {
  bold?: boolean;
  italic?: boolean;
  size?: number;              // pt, 12–54
  color?: string;             // '#RRGGBB'
  align?: 'left' | 'center' | 'right';
  fill?: string;              // chỉ cho shape
}

export interface El {
  id: string;                 // 'e1', 'e2'… đếm tăng dần trong state
  kind: ElKind;
  role?: Role;
  x: number; y: number; w: number; h: number;
  text?: string;              // text và shape
  shape?: ShapeKind;          // chỉ shape
  src?: string; alt?: string; // chỉ image
  fmt?: ElFormat;
}

export interface Slide {
  id: string;                 // 's1', 's2'…
  layout: Layout;
  els: El[];                  // thứ tự mảng = thứ tự vẽ (cuối = trên cùng)
  transition?: 'none' | 'fade' | 'push' | 'zoom';  // 5B
}

export interface PptState {
  slides: Slide[];
  active: number;             // chỉ số slide đang mở
  sel: string | null;         // id đối tượng đang chọn
  editing: string | null;     // id đối tượng đang sửa chữ, null khi không sửa
  editBackup: string | null;  // chữ trước khi bắt đầu sửa, để `cancelEdit` trả lại
  theme: ThemeId;             // 5B; 5A luôn 'mochi'
  show: { at: number } | null;// 5B: đang trình chiếu, slide thứ mấy
  saved: { name: string; at: number } | null;
  printed: boolean;
  dialog: 'save' | 'print' | 'image' | null;
  nextId: number;             // nguồn id; reducer KHÔNG dùng random/Date.now()
  past: Slide[][];            // hoàn tác, giống Excel: chỉ chụp phần nội dung
}
```

**Bất biến:**
1. Reducer thuần: id lấy từ `nextId`, thời gian đi kèm trong action (`save`), không
   `Math.random()`, không `Date.now()`.
2. Luôn có ít nhất **một** slide; xoá slide cuối cùng là phép không (no-op).
3. `sel` trỏ tới đối tượng **của slide đang mở**; đổi slide thì `sel = null`,
   `editing = null`.
4. Đối tượng luôn nằm trong khung: `0 ≤ x`, `x + w ≤ 960`, tương tự chiều dọc. Kéo
   quá mép thì **kẹp lại**, không cho lọt ra ngoài.
5. Kích thước tối thiểu: `w ≥ 60`, `h ≥ 32`.
6. Lưới hít: mọi `x/y/w/h` làm tròn về bội số **8**.

## 3. Bố cục (layout)

Đổi bố cục **giữ lại chữ** của các chỗ dành sẵn cùng vai trò, thêm chỗ còn thiếu, xoá
chỗ dư. Đối tượng tự chèn (`role` trống) không bao giờ bị đổi bố cục đụng tới.

| Layout | Chỗ dành sẵn (x, y, w, h) |
|---|---|
| `title` | title (80, 180, 800, 120) |
| `titleContent` | title (80, 56, 800, 96), body (80, 176, 800, 208) |
| `twoContent` | title (80, 56, 800, 96), body (80, 176, 384, 208), body2 (496, 176, 384, 208) |
| `blank` | — |

Chữ mặc định của chỗ dành sẵn là chuỗi rỗng; giao diện vẽ chữ mờ "Bấm để nhập tiêu
đề" / "Bấm để nhập nội dung" khi rỗng (chỉ là chữ mờ, **không** nằm trong state).

Cỡ chữ mặc định: title 40pt đậm, body 24pt, hộp chữ tự chèn 20pt.

## 4. Hành động (`PptAction`)

**Slide (5A):** `addSlide {layout?}` · `duplicateSlide` · `deleteSlide` ·
`moveSlide {from,to}` · `gotoSlide {index}` · `setLayout {layout}`

**Đối tượng (5A):** `addText {x,y,w,h,text?}` · `addShape {shape,x,y,w,h}` ·
`addImage {src,alt}` (đặt giữa khung, 320×240) · `selectEl {id|null}` ·
`deleteEl` · `moveEl {dx,dy}` · `resizeEl {handle,dx,dy}` (handle:
`'nw'|'n'|'ne'|'e'|'se'|'s'|'sw'|'w'`) · `bringToFront` · `sendToBack`

**Chữ (5A):** `startEditEl {id}` · `setText {text}` · `commitEdit` · `cancelEdit` ·
`setFmt {fmt: Partial<ElFormat>}` (áp cho đối tượng đang chọn)

**Khác (5A):** `undo` · `openDialog {dialog}` · `closeDialog` · `save {name,at}` ·
`print`

**5B:** `setTheme {theme}` · `setTransition {transition}` · `startShow` ·
`showNext` · `showPrev` · `endShow`

## 5. Chấm bài (`shared/src/sims/ppt/grade.ts`)

```ts
export type PptCheck =
  | { kind: 'slideCount'; count: number }                                  // 5A
  | { kind: 'slideLayout'; slide: number; layout: Layout }                 // 5A
  | { kind: 'slideTitle'; slide: number; text?: string; notEmpty?: true }  // 5A
  | { kind: 'hasElement'; slide: number; el: ElKind; min?: number; shape?: ShapeKind; textContains?: string } // 5A
  | { kind: 'theme'; theme: ThemeId }                                      // 5B
  | { kind: 'transition'; slide: number; transition: 'fade' | 'push' | 'zoom' }; // 5B
```

- `slide` đếm **từ 1** trong đề bài (người học nói "slide 2"), grader tự trừ 1.
- `slideTitle` so chữ đã `trim`, bỏ phân biệt hoa thường; `notEmpty` dùng cho bài bảo
  học viên gõ tên mình (bài học Excel 4A đã trả giá vì quên loại check "mở" này).
- `hasElement` mặc định `min: 1`.
- Thông báo lỗi bằng tiếng Việt, cùng giọng với `gradeExcel`.

## 6. Giao diện (client)

```
┌──────────────────────── Ribbon (File/Home/Insert/Design/Transitions/Slide Show) ──┐
├────────────┬──────────────────────────────────────────────────────────────────────┤
│ thumbnail  │  khung 16:9, nền theme, các đối tượng vẽ tuyệt đối theo px 960×540    │
│ 1 ▢        │  đối tượng đang chọn có viền + 8 tay nắm                              │
│ 2 ▢        │                                                                      │
└────────────┴──────────────────────────────────────────────────────────────────────┘
```

- Cột thumbnail: bấm để mở, kéo để đổi thứ tự, nút **+** thêm slide.
- Khung vẽ dùng `transform: scale(k)` với `k = bề rộng thật / 960`; mọi phép kéo–thả
  chia lại cho `k` trước khi phát action, nên state luôn tính theo px 960×540.
- Kéo chuột trên đối tượng → `moveEl`; kéo tay nắm → `resizeEl`; nháy đúp → sửa chữ.
- Bàn phím: mũi tên dời 8px, `Delete` xoá, `Esc` bỏ chọn, `Tab` chọn đối tượng kế.
- Dùng lại `Group` / `ToolButton` / `Picker` của `client/src/sims/excel/RibbonHome.tsx`
  — **không** phát minh kiểu nút mới.
- Toàn bộ chữ giao diện tiếng Việt; nhãn nút giữ tên tiếng Anh thật (New Slide,
  Layout, Text Box, Shapes, Pictures) kèm giải nghĩa ở `title` + `helpId`.

### 6.1 Theme (5B)
Sáu theme pastel, mỗi theme là `{ id, name, bg, fg, accent, font }`:
`mochi` (kem/cam), `bien` (xanh biển), `la` (xanh lá), `hoa` (hồng), `tro` (xám),
`dem` (nền tối). Theme áp cho **cả bài trình chiếu**, không theo từng slide.

### 6.2 Trình chiếu (5B)
Toàn màn hình, nền đen, khung 16:9 căn giữa; `→`/`Space`/click sang slide sau, `←`
lùi, `Esc` thoát. Chuyển cảnh chỉ là hiệu ứng CSS 300ms (`fade` mờ dần, `push` trượt
từ phải, `zoom` phóng to). Tôn trọng `prefers-reduced-motion`: bỏ hiệu ứng.

## 7. Lộ trình 12 bài / 5 chương

| Chương | Bài | Giai đoạn |
|---|---|---|
| `ppt.start` – Slide đầu tiên | `ppt.intro` (slide là gì, cột thumbnail), `ppt.title` (gõ tiêu đề + phụ đề), `ppt.slides` (thêm/xoá/đổi thứ tự slide) | 5A |
| `ppt.objects` – Chữ, hình, ảnh | `ppt.textbox` (chèn hộp chữ), `ppt.shape` (chèn hình khối, đổi màu nền), `ppt.image` (chèn ảnh, đổi kích thước) | 5A |
| `ppt.design` – Cho đẹp mắt | `ppt.layout` (bố cục hai cột), `ppt.format` (cỡ chữ, màu chữ, căn giữa), `ppt.theme` (chọn theme) | 5B |
| `ppt.show` – Trình bày | `ppt.transition` (chuyển cảnh), `ppt.present` (trình chiếu, mũi tên, Esc) | 5B |
| `ppt.final` – Dự án | `ppt.project` (Slide giới thiệu bản thân, 3 chặng: 3 slide → chèn hình/ảnh → theme + chuyển cảnh + trình chiếu) | 5B |

## 8. Từ điển và Hỏi Mèo

Mục từ điển mới (5A): `slide`, `bo-cuc`, `hop-chu`, `cho-danh-san`, `hinh-khoi`,
`tay-nam`. (5B): `theme`, `chuyen-canh`, `trinh-chieu`, `ty-le-16-9`.
Mỗi mục có `lessonIds` trỏ tới bài **có thật** (test bắt điều này), nên mục của chương
nào thì điền ở đúng task tạo bài của chương ấy.

## 9. Quyết định đã chốt

- **px trên khung 960×540**, không dùng phần trăm: số tròn, đề bài nói được "rộng 320",
  và không có lỗi làm tròn dây chuyền khi đổi kích thước.
- **Chỗ dành sẵn là đối tượng thật** (có `role`), không phải trường riêng của slide —
  nhờ vậy sửa chữ tiêu đề dùng đúng đường đi như sửa hộp chữ tự chèn.
- **Lưới hít 8px** để bài học chấm được vị trí mà không cần người học đặt chính xác
  từng pixel.
- **Không có `notes`**: thêm ô ghi chú sẽ kéo theo cả một vùng giao diện mà lộ trình
  12 bài không hề dùng tới.
