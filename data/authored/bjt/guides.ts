import type { BjtGuide } from '@nihongo/shared';

export const BJT_GUIDES: BjtGuide[] = [
  {
    section: 'bamen',
    what: 'Nhìn một bức ảnh nơi làm việc, nghe câu hỏi và bốn câu mô tả. Chọn câu mô tả đúng cảnh trong ảnh. Lựa chọn chỉ được đọc, không in ra.',
    how: ['Trước khi băng chạy, tự gọi tên trong đầu: ai, ở đâu, đang làm gì.', 'Nghe hết cả bốn câu rồi mới chọn; đánh dấu ○ △ × cho từng câu khi nghe.', 'Chú ý động từ và trợ từ: ai làm cho ai.'],
    traps: ['Câu dùng đúng từ chỉ đồ vật trong ảnh nhưng sai hành động.', 'Nhầm chủ thể: 渡す và 受け取る, 貸す và 借りる.'],
  },
  {
    section: 'hatsugen',
    what: 'Nghe mô tả một tình huống, rồi nghe bốn câu nói. Chọn câu phù hợp nhất để nói trong tình huống đó. Lựa chọn chỉ được đọc.',
    how: ['Xác định quan hệ trước: nói với khách, cấp trên hay đồng nghiệp.', 'Loại câu sai hướng kính ngữ trước (dùng tôn kính ngữ cho chính mình).', 'Ưu tiên câu có lời đệm: 恐れ入りますが, あいにく, 申し訳ございませんが.'],
    traps: ['Câu rất lịch sự nhưng sai nội dung tình huống.', 'Kính ngữ kép hoặc ご苦労様 nói với cấp trên.', 'Từ chối thẳng できません thay vì いたしかねます.'],
  },
  {
    section: 'sogo-chokai',
    what: 'Nghe một đoạn hội thoại hoặc độc thoại dài hơn, rồi trả lời câu hỏi về nội dung, ý định hoặc việc sẽ làm tiếp theo.',
    how: ['Đọc câu hỏi và bốn lựa chọn trước khi băng chạy.', 'Kết luận thường nằm ở cuối: nghe kỹ sau では, じゃあ, ということで.', 'Ghi nhanh con số, ngày giờ, tên người.'],
    traps: ['Phương án được nêu ra giữa chừng rồi bị bác.', 'Từ chối nói vòng: ちょっと難しいですね, 検討させていただきます.'],
  },
  {
    section: 'jokyo',
    what: 'Nhìn tranh, sơ đồ hoặc ảnh chụp màn hình và nghe hội thoại. Chọn phương án khớp với cả hình lẫn lời nói.',
    how: ['Xem bốn lựa chọn trên hình trước, tìm điểm khác nhau giữa chúng.', 'Nghe để loại dần theo từng điểm khác nhau đó.'],
    traps: ['Thông tin đúng với hình nhưng trái với lời nói ở cuối đoạn.', 'Chỉ dẫn vị trí: 手前, 奥, 向かって右.'],
  },
  {
    section: 'shiryo',
    what: 'Vừa đọc tài liệu (bảng, biểu đồ, email, lịch) vừa nghe người ta nói về nó. Câu hỏi cần cả hai nguồn mới trả lời được.',
    how: ['Dùng thời gian trước khi nghe để đọc tiêu đề, đơn vị, tên cột.', 'Khi nghe, dò ngón tay theo dòng đang được nhắc tới.', 'Số liệu trong lời nói thường sửa hoặc bổ sung số liệu trên giấy.'],
    traps: ['Đơn vị: 千円, 万円, 前年比, 前月比.', 'Lời nói thay đổi nội dung tài liệu (đổi ngày, đổi phòng).'],
  },
  {
    section: 'sogo-chodokkai',
    what: 'Tài liệu dài hơn kèm hội thoại dài hơn. Thường hỏi việc cần làm tiếp theo hoặc kết luận chung.',
    how: ['Đọc câu hỏi trước để biết cần tìm gì trong tài liệu.', 'Tách bạch: điều tài liệu nói và điều người nói muốn đổi.'],
    traps: ['Chọn theo tài liệu mà bỏ qua điều kiện mới nêu trong lời nói.'],
  },
  {
    section: 'goi',
    what: 'Chọn từ, cụm từ hoặc mẫu ngữ pháp điền vào chỗ trống trong câu văn công việc.',
    how: ['Đọc cả câu, xác định văn phong: email trang trọng hay nói trong công ty.', 'Với kính ngữ, hỏi: hành động này của ai?', 'Mỗi câu không quá 30 giây; đánh dấu và quay lại sau.'],
    traps: ['Từ gần nghĩa khác sắc thái: 検討 và 検証, 了承 và 了解.', 'Cặp tự động từ – tha động từ.', 'Cụm cố định: ご査収ください, ご容赦ください.'],
  },
  {
    section: 'hyogen',
    what: 'Đọc đoạn văn ngắn (email, thông báo) và chọn cách diễn đạt phù hợp hoặc ý nghĩa của một câu trong đó.',
    how: ['Xác định người viết, người nhận và mục đích trước.', 'Đọc câu ngay trước và ngay sau chỗ được hỏi.'],
    traps: ['Diễn đạt đúng ngữ pháp nhưng sai mức lịch sự với người nhận.', 'Câu phủ định kép và ～ないわけではない.'],
  },
  {
    section: 'sogo-dokkai',
    what: 'Đọc văn bản dài hơn (báo cáo, bài báo kinh tế, hợp đồng) và trả lời câu hỏi về nội dung hoặc ý người viết.',
    how: ['Đọc câu hỏi trước, rồi đọc lướt tìm đoạn liên quan.', 'Chú ý từ nối đổi hướng: しかし, ただし, 一方, もっとも.', 'Dành 12–13 phút cuối cho phần này.'],
    traps: ['Lựa chọn đúng một nửa: phần đầu khớp, phần sau sai.', 'Điều kiện ngoại lệ sau ただし và なお.'],
  },
];
