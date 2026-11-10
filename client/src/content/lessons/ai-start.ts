import type { aichatSim, Lesson } from '@office-neko/shared';
import { aiPractice } from '../lessonKit';

const pickAll = (indexes: number[]) => (): aichatSim.AiChatAction[] => indexes.map((index) => ({ type: 'pick', index }));

/** Chương 1 — Làm quen AI: AI là gì, thông tin không nên đưa, bắt lỗi AI. */
export const AI_START: Lesson[] = [
  {
    id: 'ai.intro',
    trackId: 'ai',
    chapterId: 'ai.start',
    title: 'AI là gì?',
    minutes: 6,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Chào bạn! Lộ trình này nói về [[ai|AI]] — trí tuệ nhân tạo. Loại AI bạn hay gặp nhất là **AI trò chuyện**, ví dụ Claude: bạn gõ câu hỏi, nó trả lời bằng chữ, y như nhắn tin với một người.',
      },
      {
        kind: 'explain',
        body: 'AI đã đọc rất, rất nhiều văn bản nên viết trôi chảy và nhanh: soạn email, tóm tắt, giải thích một hàm Excel chỉ trong vài giây.',
      },
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'Nhưng nhớ hai điều: AI **có thể sai**, kể cả khi nói rất chắc chắn. Và AI **không biết việc riêng của bạn** — sếp tên gì, phòng bạn làm gì — trừ khi bạn kể cho nó.',
      },
      {
        kind: 'quiz',
        question: 'Câu nào đúng về AI trò chuyện?',
        choices: [
          'AI luôn đúng vì nó đã đọc rất nhiều',
          'AI viết nhanh nhưng có thể sai, nên cần kiểm lại',
          'AI tự biết tên sếp và công việc của bạn',
        ],
        answer: 1,
        why: 'AI viết trôi chảy nhưng vẫn có thể sai, và nó chỉ biết những gì bạn kể. Kết quả quan trọng thì luôn kiểm lại.',
      },
      {
        kind: 'explain',
        body: 'Mochi dựng sẵn một khung chat **mô phỏng** để bạn tập. Câu trả lời đã soạn sẵn, không gửi đi đâu cả, nên cứ gõ thoải mái.',
      },
      aiPractice({
        greeting: 'Chào bạn! Mình là trợ lý AI mô phỏng. Bạn muốn hỏi gì?',
        replies: {
          weak: 'Luộc trứng: cho trứng vào nồi nước, đun sôi khoảng 10 phút là chín.',
          ok:
            'Cách luộc trứng:\n1. Cho trứng vào nồi, đổ nước ngập trứng.\n2. Đun sôi rồi hạ lửa vừa.\n' +
            '3. Luộc 6–7 phút nếu thích lòng đào, 10 phút nếu thích chín kỹ.',
          good:
            '**Cách luộc trứng ngon:**\n1. Cho trứng vào nồi, đổ nước ngập trứng khoảng 2 cm, thêm chút muối.\n' +
            '2. Đun sôi rồi hạ lửa vừa.\n3. Lòng đào: 6–7 phút. Chín kỹ: 10 phút.\n' +
            '4. Vớt ra ngâm nước lạnh 2 phút cho dễ bóc vỏ.',
        },
        topic: { keywords: ['trung'], vi: 'cách luộc trứng' },
        task: 'Hãy gửi câu hỏi đầu tiên: hỏi AI **cách luộc trứng**.',
        checks: [{ kind: 'sent' }],
        spotlight: { helpId: 'ai.composer' },
        hint: 'Gõ câu hỏi vào ô dưới cùng của khung chat, rồi bấm Gửi (hoặc Enter).',
        steps: ['Bấm vào ô «Nhập prompt…» dưới cùng.', 'Gõ: Cách luộc trứng như thế nào?', 'Bấm nút Gửi.'],
        solve: () => [{ type: 'setDraft', text: 'Cách luộc trứng như thế nào?' }, { type: 'send' }],
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Bạn vừa trò chuyện với AI lần đầu! Các bài sau Mochi chỉ cách hỏi sao cho AI trả lời **đúng ý** hơn — và cách giữ an toàn khi dùng AI.',
      },
    ],
  },
  {
    id: 'ai.safety',
    trackId: 'ai',
    chapterId: 'ai.start',
    title: 'Thông tin không nên đưa cho AI',
    minutes: 7,
    steps: [
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'Những gì bạn gõ vào ô chat **rời khỏi máy bạn** và có thể được lưu ở máy chủ của công ty làm AI. Vì vậy có những thứ không bao giờ nên dán vào — gọi là [[du-lieu-nhay-cam|dữ liệu nhạy cảm]].',
      },
      {
        kind: 'explain',
        body: 'Ví dụ: mật khẩu, mã OTP, số căn cước, số tài khoản ngân hàng, bảng lương, thông tin khách hàng. Nhiều công ty còn có **quy định riêng** về việc dùng AI — hỏi phòng IT hoặc sếp trước khi dùng cho việc công ty.',
      },
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Mẹo hay: cần AI giúp mà văn bản có tên người thật? **Thay tên thật bằng «Nhân viên A», «Khách hàng B»** trước khi dán vào. AI vẫn giúp được y như cũ.',
      },
      {
        kind: 'quiz',
        question: 'Ngân hàng vừa nhắn mã OTP cho bạn. Có nên dán mã đó vào ô chat để hỏi AI không?',
        choices: [
          'Có, AI sẽ giữ bí mật',
          'Không bao giờ — OTP là chìa khoá vào tài khoản của bạn',
          'Được, nếu xoá tin nhắn ngay sau đó',
        ],
        answer: 1,
        why: 'Mã OTP dùng để xác nhận giao dịch. Ai có mã là có thể vào tài khoản của bạn, nên không đưa cho bất kỳ ai, kể cả AI.',
      },
      aiPractice({
        mode: 'pickItems',
        items: [
          'Mật khẩu email của bạn',
          'Câu hỏi: cách viết hàm cộng trong Excel',
          'Số căn cước công dân',
          'Bảng lương có tên và số tài khoản của đồng nghiệp',
          'Một đoạn văn bạn tự viết cần sửa chính tả',
          'Mã OTP ngân hàng vừa nhận',
          'Tên món ăn bạn muốn nấu',
        ],
        task: 'Chọn **tất cả** thông tin KHÔNG nên dán vào ô chat.',
        checks: [{ kind: 'pickItems', answer: [0, 2, 3, 5] }],
        spotlight: { helpId: 'ai.items' },
        hint: 'Hỏi mình: nếu người lạ đọc được dòng này thì có sao không? Có thì đừng đưa cho AI.',
        steps: [
          'Bấm vào mật khẩu, số căn cước, bảng lương và mã OTP.',
          'Câu hỏi về Excel, đoạn văn tự viết và món ăn thì để yên — đưa cho AI được.',
        ],
        solve: pickAll([0, 2, 3, 5]),
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Giỏi lắm! Quy tắc dễ nhớ: **cái gì không dán lên bảng tin công ty thì cũng đừng dán vào ô chat AI.**',
      },
    ],
  },
  {
    id: 'ai.verify',
    trackId: 'ai',
    chapterId: 'ai.start',
    title: 'Bắt lỗi AI',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'AI đôi khi bịa ra thông tin sai mà vẫn nói rất tự tin. Hiện tượng này gọi là [[ao-giac|ảo giác]] của AI. Câu sai thường lẫn giữa những câu đúng, nên rất dễ bỏ qua.',
      },
      {
        kind: 'explain',
        body: 'Ba cách kiểm chứng: **thử lại** (AI đưa công thức Excel thì gõ vào Excel xem đúng không), **đối chiếu tài liệu gốc** (AI tóm tắt thư thì đọc lại thư), và **hỏi người biết**.',
      },
      aiPractice({
        mode: 'pickSentence',
        greeting: 'Giải thích giúp tôi các hàm SUM, AVERAGE, COUNT, MAX.',
        sentences: [
          'Hàm SUM cộng tất cả các số trong vùng bạn chọn.',
          'Hàm AVERAGE tính giá trị trung bình.',
          'Hàm COUNT đếm các ô có chữ.',
          'Hàm MAX tìm số lớn nhất.',
        ],
        task: 'AI vừa giải thích bốn hàm Excel bạn đã học. Có **một câu sai** — bấm vào câu đó.',
        checks: [{ kind: 'pickSentence', answer: 2 }],
        spotlight: { helpId: 'ai.sentences' },
        hint: 'Nhớ lại bài thống kê trong lộ trình Excel: hàm nào đếm, và đếm loại ô gì?',
        steps: ['Đọc từng câu và so với điều bạn đã học.', 'COUNT đếm các ô có **số**, không phải ô có chữ. Bấm vào câu về COUNT.'],
        solve: pickAll([2]),
      }),
      aiPractice({
        mode: 'pickSentence',
        greeting: 'Tóm tắt giúp tôi thư mời họp này.',
        sentences: ['Cuộc họp của phòng diễn ra lúc 9 giờ sáng.', 'Họp vào thứ Hai.', 'Địa điểm là phòng 302.'],
        task: 'Thư gốc: «Họp phòng lúc **9 giờ sáng thứ Ba** ở phòng 302.» AI tóm tắt như bên dưới. Câu nào sai?',
        checks: [{ kind: 'pickSentence', answer: 1 }],
        spotlight: { helpId: 'ai.sentences' },
        hint: 'Đặt thư gốc cạnh bản tóm tắt, so từng chi tiết: giờ, ngày, phòng.',
        steps: ['Thư gốc ghi họp **thứ Ba**.', 'Bấm vào câu ghi sai ngày.'],
        solve: pickAll([1]),
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Bạn đã bắt được AI nói sai! Nhớ nhé: AI là trợ lý giỏi, nhưng **người chịu trách nhiệm cuối cùng là bạn** — luôn kiểm lại trước khi gửi đi.',
      },
    ],
  },
];
