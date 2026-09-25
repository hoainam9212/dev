# Ribbon giống Office thật cho Excel và PowerPoint

Nối tiếp `2026-09-24-real-ribbon-pilot-design.md` (Word đã xong trên nhánh `feat/real-ribbon-pilot`). Mục tiêu giữ
nguyên: người học mở Excel/PowerPoint 365 **tiếng Anh** thật vẫn nhận ra nút vừa học. Cách làm giữ nguyên: chỉ các
nút bài học dùng, nhưng đúng **thẻ › nhóm › thứ tự › icon**; cuối bài có bước `realShot` (ảnh thật + khung đỏ).
Ảnh chụp do người dùng làm sau; phần gắn ảnh là task riêng, chờ ảnh.

## 1. Thống nhất giữa ba ứng dụng (yêu cầu của người dùng)

- **Một vỏ ribbon chung** trong `client/src/components/ribbon.tsx`: `RibbonTabs` (thanh thẻ kiểu Office, gạch chân
  màu của từng app, hỗ trợ thẻ ngữ cảnh) và `RibbonPanel` (cao tối thiểu `min-h-24`, đổi thẻ không giật trang).
  Màu: Word `#185ABD`, Excel `#107C41`, PowerPoint `#C43E1C`. Word chuyển sang dùng vỏ này, giao diện không đổi.
- Mọi nhóm dùng `variant="office"`; tên nhóm và chữ trên nút **tiếng Anh đúng như Office 365**.
- `aria-label` = tên tiếng Việt (như Word: "In đậm"). Gợi ý màu tối (`HELP_IDS`) có `label` dạng
  **"Tên tiếng Anh (tên tiếng Việt)"** và `vi` có phím tắt nếu có. Không gắn `title` khi đã có gợi ý (`nativeTitle`).
- Lời trong bài, gợi ý, bước giải, Hỏi Mèo viết một mẫu: **thẻ X › nhóm Y › nút Z**. PowerPoint đang viết "tab" →
  đổi thành "thẻ".
- Menu thả xuống không nằm trong khung `overflow`; menu mở từ trong lưới Excel vẽ bằng portal ra `document.body`.

## 2. Chỗ app đang lệch Office thật và cách sửa

| # | App | Hiện tại | Office thật | Sửa thành |
|---|---|---|---|---|
| 1 | Excel | Undo nằm trong Clipboard | Home có nhóm **Undo** riêng ở đầu | Undo \| Clipboard \| Font \| Alignment \| Number \| Editing |
| 2 | Excel | Nhóm "Sửa" có Fill xuống / Fill phải / Xoá | **Editing › Fill ▾** (Down, Right), **Clear ▾** (Clear Contents) | Hai menu đúng tên |
| 3 | Excel | Kiểu số "Tiền ₫, Phần trăm, Ngày" | Number Format: General, Number, **Currency, Percentage, Short Date** | Tên tiếng Anh, giá trị bên trong giữ nguyên (`currencyVnd`…) |
| 4 | Excel | Formulas chia nhóm tự đặt (Tự động tính, Có điều kiện, Khác) | **Function Library**: AutoSum ▾, Logical ▾, Text ▾, Date & Time ▾, Lookup & Reference ▾, Math & Trig ▾, More Functions ▾ | Bảy menu; SUMIF ở Math & Trig, COUNTIF/AVERAGEIF ở More Functions › Statistical |
| 5 | Excel | Sắp xếp bằng ô "Cột cần sắp" + A→Z/Z→A | **Data › Sort & Filter**: A→Z, Z→A sắp theo **cột của ô đang chọn**; nút **Sort** mở hộp thoại Sort by / Order | Thêm hộp thoại Sort (`dialog: 'sort'`); bài học dùng hộp thoại |
| 6 | Excel | Nút lọc "B ▾" nằm trên ribbon | Mũi tên ▾ nằm **trong ô tiêu đề cột** | Mũi tên trong ô, menu lọc vẽ bằng portal ngay dưới ô |
| 7 | Excel | Insert: chọn loại + ô gõ tiêu đề + nút "Chèn biểu đồ" | **Charts**: Column or Bar ▾, Line ▾, Pie ▾ chèn ngay; tiêu đề "Chart Title" **bấm vào trên biểu đồ để sửa** | Ba nút chèn ngay; action mới `setChartTitle` |
| 8 | PowerPoint | Undo, Bring to Front, Send to Back trong nhóm tự đặt "Paragraph & Arrange"; có nút Delete Slide | Undo \| Slides \| Font \| Paragraph \| Drawing (**Arrange ▾**, Shape Fill); xoá/nhân đôi slide bằng **chuột phải** trên hình thu nhỏ; New Slide có ▾ | Sắp lại nhóm; menu chuột phải + phím Delete trên hình thu nhỏ; New Slide ▾ = các bố cục + Duplicate Selected Slides |
| 9 | PowerPoint | Insert: Text \| Illustrations (có Pictures) | **Slides \| Images (Pictures) \| Illustrations (Shapes) \| Text (Text Box)** | Đúng thứ tự và tên nhóm |

Tab File của cả hai: nút lớn **Save As** và **Print** như Word. Excel View và PowerPoint Design/Transitions/Slide Show
vẫn là `SoonTab`; **giai đoạn 5B dựng các thẻ PowerPoint mới thẳng theo kiểu `office`**.

Nội dung đi kèm #5: câu quiz "chỉ bôi đen cột Lương rồi bấm A→Z" sai với Excel thật (Excel hiện hộp **Sort Warning**).
Sửa lời câu hỏi thành "…rồi chọn **Continue with the current selection**", giữ nguyên bài học "phải chọn cả vùng".

## 3. Ảnh chụp thật

Danh sách: `docs/real-shots-excel.md` (11 ảnh), `docs/real-shots-ppt.md` (5 ảnh). Công cụ nhận tên app:
`node client/scripts/real-shots.mjs excel "<file>.xlsx"` (không ghi app = `word`, như cũ). Sau khi tách phải làm mờ
tên tài khoản (`blur-names.ps1` thêm khung cho ảnh mới). `content.test` đòi mọi bài có nút ribbon mang `realShot`.

## Ngoài phạm vi

Nút Office mà bài học không dùng; thẻ ngữ cảnh Shape Format/Picture Format của PowerPoint; hộp Sort Warning;
Function Arguments; ribbon thu gọn khi cửa sổ hẹp (vẫn xuống hàng như Word).
