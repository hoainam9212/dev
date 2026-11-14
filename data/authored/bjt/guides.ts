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
    what: 'Nghe một cuộc họp hoặc trao đổi dài (khoảng 1,5–2,5 phút, 2–3 người, có khi là độc thoại), rồi trả lời MỘT câu hỏi: sẽ làm gì trước, ai coi trọng điều gì, cuối cùng chốt thế nào. Câu hỏi và lựa chọn được đọc thành tiếng.',
    how: ['Nghe kỹ câu hỏi đọc trước băng: nó cho biết cần bắt ý của ai, ở thời điểm nào.', 'Theo dõi các phương án được đưa ra rồi bị bác; kết luận thường nằm sau では, じゃあ, ということで.', 'Đáp án hiếm khi lặp nguyên văn: tìm câu diễn đạt lại ý đã chốt.'],
    traps: ['Lựa chọn là điều CÓ nói trong băng nhưng của người khác, của lần trước, hoặc đã bị bác.', 'Việc sẽ làm SAU, trong khi câu hỏi hỏi việc làm TRƯỚC.', 'Từ chối nói vòng: ちょっと難しいですね, 検討させていただきます.'],
  },
  {
    section: 'jokyo',
    what: 'Nhìn một bức ảnh cảnh làm việc và nghe một đoạn trao đổi ngắn. Bốn lựa chọn in sẵn, chung phần đầu và chỉ khác một danh từ (chủ đề của cuộc trao đổi). Chọn điều họ đang nói tới.',
    how: ['Đọc bốn lựa chọn trước, gạch chân phần khác nhau.', 'Đáp án thường không được nói thẳng: suy ra từ các chi tiết trong lời thoại và trong ảnh.'],
    traps: ['Lựa chọn có từ trùng với từ nghe được trong băng nhưng không phải chủ đề chính.', 'Chi tiết đúng với ảnh nhưng không phải điều đang được bàn.'],
  },
  {
    section: 'shiryo',
    what: 'Vừa đọc tài liệu (bảng, biểu đồ, email, lịch) vừa nghe người ta nói về nó. Câu hỏi cần cả hai nguồn mới trả lời được.',
    how: ['Dùng thời gian trước khi nghe để đọc tiêu đề, đơn vị, tên cột.', 'Khi nghe, dò ngón tay theo dòng đang được nhắc tới.', 'Số liệu trong lời nói thường sửa hoặc bổ sung số liệu trên giấy.'],
    traps: ['Đơn vị: 千円, 万円, 前年比, 前月比.', 'Lời nói thay đổi nội dung tài liệu (đổi ngày, đổi phòng).'],
  },
  {
    section: 'sogo-chodokkai',
    what: 'Tài liệu (sơ đồ đường đi, mặt bằng, lịch, danh mục, bản thảo) được đánh số 1–4 ngay trên giấy: chính các vị trí đó là lựa chọn. Nghe hội thoại hoặc độc thoại dài (khoảng 1,5 phút) rồi chọn vị trí đúng. Mỗi bài một câu hỏi.',
    how: ['Trước khi nghe, xem 1–4 nằm ở đâu và khác nhau thế nào.', 'Dò theo lời nói trên tài liệu: rẽ ở đâu, mục nào bị đổi, ô nào còn trống.', 'Tách bạch điều tài liệu ghi và điều người nói muốn đổi.'],
    traps: ['Vị trí đúng theo tài liệu gốc nhưng đã bị đổi trong lời nói.', 'Câu tổ hợp (②③…) chỉ đúng một nửa.', 'Hỏi mục CHƯA làm xong trong khi phần lớn lời nói kể những mục đã xong.'],
  },
  {
    section: 'goi',
    what: 'Chọn từ, cụm từ hoặc mẫu ngữ pháp điền vào chỗ trống trong câu văn công việc.',
    how: ['Đọc cả câu, xác định văn phong: email trang trọng hay nói trong công ty.', 'Với kính ngữ, hỏi: hành động này của ai?', 'Mỗi câu không quá 30 giây; đánh dấu và quay lại sau.'],
    traps: ['Từ gần nghĩa khác sắc thái: 検討 và 検証, 了承 và 了解.', 'Cặp tự động từ – tha động từ.', 'Cụm cố định: ご査収ください, ご容赦ください.'],
  },
  {
    section: 'hyogen',
    what: 'Đọc một câu hoặc một đoạn hội thoại A/B ngắn (khoảng 25–50 chữ) có chỗ trống ＿＿＿, chọn cách nói phù hợp nhất: kính ngữ, câu đệm, cách nhờ vả hoặc từ chối.',
    how: ['Xác định ai nói với ai (khách, cấp trên, người ngoài công ty) trước khi đọc lựa chọn.', 'Hỏi: hành động trong chỗ trống là của ai? Từ đó chọn tôn kính ngữ hay khiêm nhường ngữ.'],
    traps: ['Kính ngữ kép (おっしゃられる, お伺いさせていただく).', 'Câu đệm gần nghĩa nhưng sai hoàn cảnh (恐れ入りますが và 申し訳ございませんが).', 'Thêm 様 thừa, hoặc câu chủ nhà nói lại dùng cho khách.'],
  },
  {
    section: 'sogo-dokkai',
    what: 'Đọc một văn bản công việc ngắn (email, thư, thông báo, biên bản; khoảng 150–300 chữ) và trả lời MỘT câu hỏi: mục đích của văn bản, người nhận phải làm gì, hạn chót, hoặc con số trong phần 記.',
    how: ['Đọc câu hỏi trước, rồi tìm câu then chốt trong thân văn bản.', 'Thư trang trọng (拝啓, 前略): bỏ qua câu chào hỏi theo mùa, ý chính nằm sau さて.', 'Chú ý ただし, なお và phần 記 ở cuối.'],
    traps: ['Lựa chọn đúng một nửa: phần đầu khớp, phần sau sai.', 'Việc của người gửi bị đưa thành việc của người nhận.', 'Thư từ chối khéo: không có chữ 断る nhưng ý là từ chối.'],
  },
];
