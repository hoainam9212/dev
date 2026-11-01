import type { QuizStep } from '@office-neko/shared';

export type PlacementTrackId = 'basics' | 'word' | 'excel' | 'ppt';

const q = (question: string, choices: string[], answer: number, why: string): QuizStep => ({
  kind: 'quiz', question, choices, answer, why,
});

/** Kiểm tra đầu vào: mỗi lộ trình đúng 6 câu, bám nội dung bài thật của lộ trình đó. */
export const PLACEMENT_QUIZ: Record<PlacementTrackId, QuizStep[]> = {
  basics: [
    q('Muốn mở một thư mục trên màn hình, bạn làm gì?', ['Nhấp chuột phải một lần', 'Nhấp đúp chuột trái', 'Kéo thư mục ra góc màn hình'], 1, 'Nhấp đúp (hai lần thật nhanh) chuột trái để mở.'),
    q('Phím tắt nào dùng để **sao chép**?', ['{{mod+v}}', '{{mod+x}}', '{{mod+c}}'], 2, '{{mod+c}} là sao chép, {{mod+v}} là dán, {{mod+x}} là cắt.'),
    q('Lỡ tay xoá mất một đoạn chữ, phím tắt nào lấy lại?', ['{{mod+z}}', '{{mod+s}}', '{{mod+a}}'], 0, '{{mod+z}} là hoàn tác: quay lại thao tác vừa làm.'),
    q('Muốn đổi tên một file, cách nào đúng?', ['Nhấp chuột phải vào file, chọn đổi tên (Rename)', 'Kéo file vào Thùng rác', 'Nhấp đúp vào file'], 0, 'Menu chuột phải có mục đổi tên; nhấp đúp chỉ mở file.'),
    q('Xoá nhầm một file thì tìm lại ở đâu?', ['Không tìm lại được nữa', 'Trong Thùng rác, chọn file rồi khôi phục', 'Trong thư mục Tải về'], 1, 'File bị xoá nằm trong Thùng rác cho tới khi bạn dọn sạch nó.'),
    q('Muốn gõ chữ **M** hoa, bạn làm thế nào?', ['Bấm M hai lần', 'Bấm Enter rồi bấm M', 'Giữ Shift rồi bấm M'], 2, 'Giữ Shift rồi bấm chữ cái sẽ ra chữ hoa.'),
  ],
  word: [
    q('Phím tắt để in đậm chữ đang chọn là gì?', ['{{mod+b}}', '{{mod+i}}', '{{mod+u}}'], 0, '{{mod+b}} là Bold (đậm), {{mod+i}} nghiêng, {{mod+u}} gạch chân.'),
    q('Nút căn giữa (Center) nằm ở đâu trong Word?', ['Thẻ **Insert** › nhóm **Tables**', 'Thẻ **Home** › nhóm **Paragraph**', 'Thẻ **View** › nhóm **Zoom**'], 1, 'Căn lề trái/giữa/phải/đều ở thẻ Home › nhóm Paragraph.'),
    q('Dòng "Hà Nội, ngày 20 tháng 9" trong một lá đơn thường được căn thế nào?', ['Căn trái', 'Căn đều hai bên', 'Căn phải'], 2, 'Dòng địa danh, ngày tháng trong đơn thường căn phải.'),
    q('Liệt kê "các bước nộp hồ sơ" theo thứ tự thì nên dùng danh sách nào?', ['Danh sách đánh số (Numbering)', 'Danh sách dấu chấm (Bullets)', 'Không cần danh sách'], 0, 'Các bước có thứ tự thì đánh số 1, 2, 3.'),
    q('Muốn Word tự làm **mục lục**, các tiêu đề cần được đặt kiểu gì?', ['Tô đậm và chữ to hơn', 'Kiểu Heading 1, Heading 2…', 'Gạch chân'], 1, 'Mục lục (Table of Contents) lấy từ các đoạn đặt kiểu Heading.'),
    q('Muốn thay mọi chữ "Cty" thành "Công ty" trong cả văn bản, dùng gì?', ['Gõ lại từng chỗ', 'Thẻ **Insert** › nút **Table**', '**Replace** (Thay thế) › **Replace All**'], 2, 'Replace All thay tất cả trong một lần.'),
  ],
  excel: [
    q('Ô nằm ở cột C, hàng 5 có tên là gì?', ['5C', 'C5', 'C-5'], 1, 'Tên ô = chữ cột rồi số hàng: C5.'),
    q('Bạn gõ SUM(A1:A5) vào ô mà quên dấu =. Chuyện gì xảy ra?', ['Ô hiện đúng chữ SUM(A1:A5), không tính gì', 'Excel vẫn cộng bình thường', 'Excel báo lỗi #VALUE!'], 0, 'Không có dấu = thì Excel coi đó là chữ thường.'),
    q('Ô C2 chứa =A2*B2. Bạn chép ô C2 xuống ô C5. Công thức ở C5 sẽ là gì?', ['=A2*B2', '=A5*B5', '=C5*C5'], 1, 'Địa chỉ tương đối dịch theo: xuống 3 hàng thì A2 thành A5, B2 thành B5.'),
    q('Ô C2 chứa =B2*$E$1. Chép xuống C3 thì thành gì?', ['=B3*$E$2', '=B2*$E$1', '=B3*$E$1'], 2, 'Dấu $ giữ cố định ô E1; B2 vẫn dịch thành B3.'),
    q('Ô B2 chứa 4. Công thức =IF(B2>=5,"Đạt","Chưa đạt") cho kết quả gì?', ['Chưa đạt', 'Đạt', '4'], 0, '4 không lớn hơn hoặc bằng 5, nên IF trả về vế thứ hai.'),
    q('VLOOKUP tra một mã không có trong bảng tra thì trả về gì?', ['Số 0', '#N/A', 'Ô trống'], 1, '#N/A nghĩa là không tìm thấy giá trị cần tra.'),
  ],
  ppt: [
    q('Cột hẹp bên trái màn hình PowerPoint để làm gì?', ['Chọn phông chữ', 'Xem và chọn các slide', 'Chèn ảnh'], 1, 'Đó là danh sách slide thu nhỏ; bấm vào để chuyển slide.'),
    q('Bạn đang ở slide 2 và bấm **New Slide**. Slide mới nằm ở đâu?', ['Ngay sau slide 2', 'Ở cuối bài', 'Ở đầu bài'], 0, 'Slide mới chèn ngay sau slide đang chọn.'),
    q('Muốn đặt "Ưu điểm" và "Nhược điểm" cạnh nhau trên một slide, chọn bố cục (Layout) nào?', ['Title Slide', 'Title Only', 'Two Content'], 2, 'Two Content có hai khung nội dung đặt cạnh nhau.'),
    q('Muốn viết thêm một dòng chữ ở góc dưới slide thì làm gì?', ['Gõ thẳng lên nền slide', 'Thẻ **Insert** › nút **Text Box**, rồi vẽ khung', 'Đổi theme khác'], 1, 'Chữ trên slide phải nằm trong một khung; Text Box tạo khung mới.'),
    q('Phím nào bắt đầu trình chiếu từ slide đầu tiên?', ['F2', 'Enter', 'F5'], 2, 'F5 = From Beginning (chiếu từ đầu).'),
    q('Đang trình chiếu, bạn muốn thoát ngay về màn soạn slide. Nhấn phím nào?', ['Esc', 'Enter', 'Mũi tên →'], 0, 'Esc thoát trình chiếu ở bất kỳ slide nào.'),
  ],
};

/** Mọi lộ trình có kiểm tra đầu vào, theo thứ tự trên bản đồ (AI là lộ trình cuối, không có). */
export const PLACEMENT_TRACKS = ['basics', 'typing', 'word', 'excel', 'ppt'] as const;

/** Lộ trình gõ phím không thi trắc nghiệm: kiểm tra tốc độ 1 phút, đạt ngưỡng này thì mở khoá. */
export const TYPING_PLACEMENT = { minWpm: 25, minAccuracy: 95, minutes: 1 } as const;
