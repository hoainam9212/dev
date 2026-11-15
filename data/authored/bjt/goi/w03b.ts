import type { BjtVocab } from '@nihongo/shared';
import { vocab } from '../helpers';

// Week 3 — extra words from the learner's own vocabulary list (meanings and examples written for the app).
export const V03B: BjtVocab[] = [
  ...vocab(3, 'Nhờ vả và từ chối', 'more2', [
    ['固辞', 'こじ', 'kiên quyết từ chối', '昇進の話を固辞した。', 'Anh ấy kiên quyết từ chối lời đề nghị thăng chức.'],
    ['丁重', 'ていちょう', 'lễ độ, trân trọng, chu đáo', 'ご依頼を丁重にお断りした。', 'Chúng tôi đã lịch sự từ chối yêu cầu đó.'],
  ]),
  ...vocab(3, 'Từ ngữ email', 'more3', [
    ['やりとり', 'やりとり', 'sự trao đổi qua lại (thư từ, email, ý kiến)', '先方とのメールのやりとりを記録に残す。', 'Lưu lại nội dung trao đổi email với đối tác.'],
    ['アドレス', 'アドレス', 'địa chỉ (thường là địa chỉ email)', 'メールアドレスが変更になりましたのでお知らせします。', 'Xin thông báo rằng địa chỉ email đã được thay đổi.'],
    ['別添', 'べってん', 'đính kèm riêng, kèm theo (văn bản)', '詳細は別添の資料をご覧ください。', 'Xin xem tài liệu đính kèm để biết chi tiết.'],
    ['受信', 'じゅしん', 'nhận (thư, tín hiệu)', 'メールを受信したら、すぐに返信する。', 'Nhận được email thì trả lời ngay.'],
    ['後日', 'ごじつ', 'ngày sau, vài hôm sau', '詳細は後日ご連絡いたします。', 'Chi tiết chúng tôi sẽ liên lạc sau.'],
    ['気付', 'きづけ', '(gửi) qua, nhờ chuyển (c/o)', '手紙は本社総務部気付でお送りください。', 'Xin gửi thư qua phòng hành chính tổng hợp của trụ sở chính.'],
    ['照会', 'しょうかい', 'hỏi để xác nhận, tra cứu thông tin', '在庫状況を倉庫に照会する。', 'Hỏi kho để xác nhận tình trạng tồn hàng.'],
    ['返信', 'へんしん', 'trả lời (thư, email)', '受信したメールには速やかに返信する。', 'Email nhận được thì trả lời nhanh chóng.'],
    ['カバーレター', 'カバーレター', 'thư giới thiệu đính kèm hồ sơ (cover letter)', '履歴書にカバーレターを添えて送付した。', 'Tôi đã gửi hồ sơ xin việc kèm thư giới thiệu.'],
    ['ピリオド', 'ピリオド', 'dấu chấm; (nghĩa bóng) sự kết thúc (ピリオドを打つ)', '文末には必ずピリオドを付けてください。', 'Cuối câu hãy luôn đặt dấu chấm.'],
    ['定型', 'ていけい', 'mẫu cố định, khuôn mẫu', '問い合わせへの返信は定型の文面を使っている。', 'Chúng tôi dùng văn bản mẫu cố định để trả lời các yêu cầu hỏi đáp.'],
    ['改行', 'かいぎょう', 'xuống dòng', '長い文章は適切な位置で改行すると読みやすい。', 'Câu văn dài nếu xuống dòng đúng chỗ thì dễ đọc hơn.'],
    ['週明け', 'しゅうあけ', 'đầu tuần (sau cuối tuần)', '詳しい資料は週明けにお送りします。', 'Chúng tôi sẽ gửi tài liệu chi tiết vào đầu tuần sau.'],
    ['～次第', 'しだい', 'hễ ... là ngay, tùy thuộc vào (確認でき次第, 状況次第)', '確認でき次第、すぐにご連絡いたします。', 'Ngay khi xác nhận xong, chúng tôi sẽ liên lạc với quý khách.'],
    ['リンク', 'リンク', 'liên kết (đường dẫn)', '詳細は下記のリンクをご覧ください。', 'Chi tiết xin xem ở liên kết dưới đây.'],
    ['レスポンス', 'レスポンス', 'phản hồi, phản ứng (trả lời nhanh/chậm)', 'お客様へのレスポンスが早いと評価された。', 'Chúng tôi được đánh giá là phản hồi khách hàng nhanh chóng.'],
    ['上記', 'じょうき', 'nêu trên, đã nói ở trên (văn viết)', '上記の件について、ご確認をお願いいたします。', 'Về vấn đề nêu trên, xin quý vị vui lòng xác nhận.'],
    ['再度', 'さいど', 'một lần nữa (văn viết, lịch sự)', '再度ご確認いただけますと幸いです。', 'Mong quý vị xác nhận lại một lần nữa.'],
    ['文字化け', 'もじばけ', 'lỗi font, chữ hiển thị thành ký tự lạ', 'メールが文字化けして読めなかった。', 'Email bị lỗi font nên không đọc được.'],
    ['画像', 'がぞう', 'hình ảnh', '商品の画像をメールに添付する。', 'Đính kèm hình ảnh sản phẩm vào email.'],
    ['送信', 'そうしん', 'gửi (email, dữ liệu)', 'メールを送信する前に宛先を確認する。', 'Kiểm tra địa chỉ người nhận trước khi gửi email.'],
    ['速やか', 'すみやか', 'nhanh chóng, mau lẹ (văn viết)', '速やかにご対応いただけますと幸いです。', 'Mong quý vị xử lý nhanh chóng.'],
  ]),
];
