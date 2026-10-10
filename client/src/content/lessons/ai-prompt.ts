import type { aichatSim, Lesson } from '@office-neko/shared';
import { aiPractice } from '../lessonKit';

const typeAndSend = (text: string) => (): aichatSim.AiChatAction[] => [{ type: 'setDraft', text }, { type: 'send' }];

/** Chương 2 — Viết prompt tốt: năm phần của prompt, thêm bối cảnh và giới hạn. */
export const AI_PROMPT: Lesson[] = [
  {
    id: 'ai.structure',
    trackId: 'ai',
    chapterId: 'ai.prompt',
    title: 'Năm phần của một prompt',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Câu bạn gõ để nhờ AI làm việc gọi là [[prompt]]. Cùng một việc, prompt khác nhau cho kết quả rất khác nhau.',
      },
      {
        kind: 'explain',
        body: 'Gõ «Viết lời mời sinh nhật» thì AI chỉ đưa một lời mời chung chung: không tên, không giờ, không địa chỉ. Còn khi bạn kể rõ con mấy tuổi, mời ai, tổ chức ở đâu, muốn dài bao nhiêu — AI viết ra lời mời **dùng được ngay**.',
      },
      {
        kind: 'explain',
        mood: 'surprised',
        body:
          'Một prompt tốt thường có năm phần:\n\n' +
          '- **Vai trò** — bảo AI đóng vai ai, ví dụ: «Bạn là nhân viên hành chính giỏi viết thư.»\n' +
          '- **Bối cảnh** — bạn là ai, viết cho ai, chuyện gì đang xảy ra.\n' +
          '- **Nhiệm vụ** — việc cần làm, bắt đầu bằng một động từ: viết, tóm tắt, liệt kê…\n' +
          '- **Định dạng** — kết quả trông ra sao: gạch đầu dòng, bảng, 3 đoạn…\n' +
          '- **Giới hạn** — độ dài, giọng văn, điều không được làm.',
      },
      {
        kind: 'quiz',
        question: '«Không quá 100 chữ» thuộc phần nào của prompt?',
        choices: ['Vai trò', 'Nhiệm vụ', 'Giới hạn'],
        answer: 2,
        why: 'Độ dài là một giới hạn. Giới hạn còn gồm giọng văn (lịch sự, thân thiện) và những điều AI không được làm.',
      },
      {
        kind: 'explain',
        body: 'Dưới ô gõ có năm ô nhỏ — Mochi chấm prompt **ngay khi bạn gõ**. Phần nào đã có thì ô đó chuyển sang ✓. Rê chuột vào một ô để xem mẹo viết phần ấy.',
      },
      aiPractice({
        greeting: 'Chào bạn! Mình là trợ lý AI mô phỏng. Bạn muốn mình viết gì?',
        replies: {
          weak: 'Thân mời bạn đến dự tiệc sinh nhật. Rất mong bạn đến chung vui!',
          ok:
            'Thân mời bạn [tên khách] đến dự sinh nhật của bé [tên bé]!\n\n' +
            'Thời gian: [giờ], ngày [ngày]\nĐịa điểm: [địa chỉ]\n\nCả nhà rất mong bạn đến chung vui.',
          good:
            '**Mời bạn đến dự sinh nhật bé Na tròn 5 tuổi! 🎈**\n\n' +
            'Bé Na rất mong được cùng các bạn lớp Chồi 2 thổi nến, ăn bánh và chơi trò chơi.\n\n' +
            'Thời gian: 16 giờ, Chủ nhật 20/10\nĐịa điểm: nhà bé Na, số 12 ngõ Hoa Sữa\n\n' +
            'Bố mẹ bé Na cảm ơn và rất mong các bạn đến chung vui!',
        },
        task: 'Viết prompt nhờ AI soạn **lời mời sinh nhật** cho bé, có **Vai trò** và **Nhiệm vụ**.',
        checks: [{ kind: 'promptCriteria', required: ['role', 'task'] }],
        spotlight: { helpId: 'ai.criteria' },
        hint: 'Mở đầu bằng «Bạn là…» để giao vai trò, rồi nói việc cần làm bằng một động từ như «viết» hay «soạn».',
        steps: [
          'Gõ vai trò: «Bạn là một người mẹ khéo viết.»',
          'Gõ tiếp nhiệm vụ: «Hãy viết lời mời sinh nhật 5 tuổi cho bé Na.»',
          'Thêm ai nhận, ở đâu, khi nào nếu muốn lời mời hay hơn — rồi bấm Gửi.',
        ],
        solve: typeAndSend(
          'Bạn là một người mẹ khéo viết. Hãy viết lời mời sinh nhật 5 tuổi cho bé Na, gửi cho các bạn cùng lớp mẫu giáo.',
        ),
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Thử gửi thêm một prompt có đủ cả năm phần xem — câu trả lời sẽ khác hẳn. Bài sau Mochi chỉ kỹ hai phần hay bị quên nhất: **Bối cảnh** và **Giới hạn**.',
      },
    ],
  },
  {
    id: 'ai.context',
    trackId: 'ai',
    chapterId: 'ai.prompt',
    title: 'Thêm bối cảnh và giới hạn',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'AI **không biết bạn là ai**. Nó không biết bạn bán hàng hay làm kế toán, viết cho sếp hay cho khách. Thiếu **bối cảnh**, AI đành đoán — và thường đoán sai.',
      },
      {
        kind: 'explain',
        body: 'Bối cảnh trả lời ba câu: **ai viết**, **gửi cho ai**, **vì sao**. Giới hạn nói **dài bao nhiêu** và **giọng ra sao**: «ngắn gọn», «không quá 50 chữ», «giọng thân thiện», «lịch sự».',
      },
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Mẹo hay: câu trả lời chưa vừa ý thì **gửi tiếp** để sửa — «ngắn hơn», «trang trọng hơn», «thêm số điện thoại». AI nhớ cả cuộc trò chuyện nên không cần gõ lại từ đầu.',
      },
      {
        kind: 'quiz',
        question: 'AI viết thư hơi dài. Cách nhanh nhất để sửa là gì?',
        choices: [
          'Xoá hết, gõ lại toàn bộ prompt từ đầu',
          'Gửi tiếp một câu: «Viết ngắn hơn, khoảng 3 câu»',
          'Tự cắt bớt rồi không dùng AI nữa',
        ],
        answer: 1,
        why: 'AI nhớ cuộc trò chuyện, nên chỉ cần nói phần muốn đổi. Nhớ nói rõ: ngắn hơn bao nhiêu, giọng thế nào.',
      },
      aiPractice({
        greeting: 'Chào bạn! Mình là trợ lý AI mô phỏng. Bạn cần viết gì?',
        replies: {
          weak: 'THÔNG BÁO\n\nCửa hàng nghỉ Tết. Xin cảm ơn.',
          ok:
            'THÔNG BÁO NGHỈ TẾT\n\nCửa hàng nghỉ Tết từ ngày [ngày] đến ngày [ngày]. ' +
            'Kính chúc quý khách năm mới an khang thịnh vượng.',
          good:
            '**🌸 THÔNG BÁO NGHỈ TẾT 🌸**\n\n' +
            'Cửa hàng nghỉ từ 28 tháng Chạp đến hết mùng 5 Tết, mở cửa lại sáng mùng 6.\n' +
            'Cảm ơn quý khách đã ủng hộ suốt một năm qua — chúc cả nhà năm mới thật nhiều sức khoẻ và may mắn!',
        },
        task: 'Nhờ AI viết **thông báo nghỉ Tết** dán ở cửa hàng. Prompt cần ít nhất **4 trên 5 phần**, trong đó phải có **Bối cảnh** và **Giới hạn**.',
        checks: [{ kind: 'promptCriteria', required: ['context', 'limits'], minScore: 4 }],
        spotlight: { helpId: 'ai.composer' },
        hint: 'Kể bạn là ai và thông báo dành cho ai (Bối cảnh), rồi nói dài bao nhiêu, giọng thế nào (Giới hạn). Nhìn năm ô dưới ô gõ để biết còn thiếu phần nào.',
        steps: [
          'Vai trò: «Bạn là nhân viên bán hàng giỏi viết.»',
          'Bối cảnh: «Tôi là chủ một cửa hàng tạp hoá, cần thông báo cho khách hàng.»',
          'Nhiệm vụ: «Viết thông báo nghỉ Tết từ 28 tháng Chạp đến hết mùng 5.»',
          'Định dạng và giới hạn: «Viết 3 dòng, ngắn gọn, giọng thân thiện.» Rồi bấm Gửi.',
        ],
        solve: typeAndSend(
          'Bạn là nhân viên bán hàng giỏi viết. Tôi là chủ một cửa hàng tạp hoá nhỏ, cần thông báo cho khách hàng. ' +
            'Viết thông báo nghỉ Tết từ 28 tháng Chạp đến hết mùng 5 để dán ở cửa. Viết 3 dòng, ngắn gọn, giọng thân thiện.',
        ),
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Tuyệt! Giờ bạn đã biết công thức năm phần. Chương sau mình dùng nó cho việc thật ở văn phòng: email, tóm tắt, công thức Excel và dàn ý slide.',
      },
    ],
  },
];
