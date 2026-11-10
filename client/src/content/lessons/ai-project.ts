import type { aichatSim, Lesson } from '@office-neko/shared';
import { aiPractice } from '../lessonKit';

const typeAndSend = (text: string) => (): aichatSim.AiChatAction[] => [{ type: 'setDraft', text }, { type: 'send' }];
const pickAll = (indexes: number[]) => (): aichatSim.AiChatAction[] => indexes.map((index) => ({ type: 'pick', index }));

const NOTES =
  '- **Đã làm:** gửi báo giá cho 3 khách; cập nhật bảng tồn kho; họp phòng thiết kế về bao bì mới; ' +
  'trả lời 20 email khách hàng; hướng dẫn bạn Hà mới vào.\n' +
  '- **Bị trễ:** báo cáo chi phí tháng 9 (còn thiếu hoá đơn).\n' +
  '- **Tuần sau:** nộp báo cáo chi phí; chuẩn bị hội chợ ngày 25/10.';

/** Chương 4 — Dự án: Prompt tạo báo cáo tuần. */
export const AI_PROJECT: Lesson[] = [
  {
    id: 'ai.project',
    trackId: 'ai',
    chapterId: 'ai.final',
    title: 'Dự án: Prompt tạo báo cáo tuần',
    minutes: 12,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body:
          'Dự án cuối! Chiều thứ Sáu, bạn cần gửi **báo cáo tuần** cho trưởng phòng. Mình làm ba chặng:\n\n' +
          '- **Viết prompt** đủ năm phần để AI soạn báo cáo từ ghi chú của bạn.\n' +
          '- **Soi lỗi** — đọc lại báo cáo AI viết, tìm câu sai.\n' +
          '- **An toàn** — trước khi dán ghi chú thật, chọn những gì phải xoá.',
      },
      aiPractice({
        greeting: 'Chào bạn! Mình là trợ lý AI mô phỏng. Hôm nay mình giúp gì được bạn?',
        replies: {
          weak: 'Tuần này em đã làm nhiều việc và mọi việc đều ổn. Tuần sau em sẽ tiếp tục cố gắng.',
          ok:
            'Báo cáo tuần:\n\nTuần này em đã gửi báo giá cho 3 khách, cập nhật bảng tồn kho, họp với phòng thiết kế, ' +
            'trả lời email khách hàng và hướng dẫn bạn Hà. Báo cáo chi phí tháng 9 còn chậm. ' +
            'Tuần sau em nộp báo cáo chi phí và chuẩn bị hội chợ.',
          good:
            '**BÁO CÁO TUẦN**\n\n' +
            '**1. Đã làm**\n- Gửi báo giá cho 3 khách hàng.\n- Cập nhật bảng tồn kho.\n' +
            '- Họp phòng thiết kế về mẫu bao bì mới.\n- Trả lời 20 email khách hàng.\n- Hướng dẫn bạn Hà mới vào.\n\n' +
            '**2. Vướng mắc**\n- Báo cáo chi phí tháng 9 bị trễ vì còn thiếu hoá đơn.\n\n' +
            '**3. Tuần sau**\n- Nộp báo cáo chi phí tháng 9.\n- Chuẩn bị hội chợ ngày 25/10.',
        },
        topic: { keywords: ['bao cao', 'ghi chu'], vi: 'báo cáo tuần' },
        task:
          `Ghi chú tuần của bạn:\n\n${NOTES}\n\n` +
          'Nhờ AI viết **báo cáo tuần** gửi trưởng phòng từ ghi chú này. Prompt cần đủ **cả năm phần**.',
        checks: [{ kind: 'promptCriteria', required: ['role', 'context', 'task', 'format', 'limits'] }],
        spotlight: { helpId: 'ai.criteria' },
        hint: 'Đi lần lượt năm ô dưới ô gõ: vai trò, bối cảnh, nhiệm vụ, định dạng, giới hạn. Ô nào chưa ✓ thì thêm phần đó.',
        steps: [
          'Vai trò và bối cảnh: «Bạn là trợ lý văn phòng. Tôi là nhân viên kinh doanh, cần gửi cho trưởng phòng.»',
          'Nhiệm vụ: «Viết báo cáo tuần từ ghi chú của tôi.»',
          'Định dạng và giới hạn: «Chia 3 mục Đã làm, Vướng mắc, Tuần sau, dùng gạch đầu dòng, ngắn gọn.» Rồi bấm Gửi.',
        ],
        solve: typeAndSend(
          'Bạn là trợ lý văn phòng giỏi viết báo cáo. Tôi là nhân viên kinh doanh, cần gửi cho trưởng phòng. ' +
            'Viết báo cáo tuần từ ghi chú của tôi. Chia 3 mục Đã làm, Vướng mắc, Tuần sau, dùng gạch đầu dòng, ngắn gọn.',
        ),
      }),
      aiPractice({
        mode: 'pickSentence',
        greeting: 'Viết báo cáo tuần gửi trưởng phòng từ ghi chú của tôi.',
        sentences: [
          'Tuần này em đã gửi báo giá cho 3 khách hàng và cập nhật bảng tồn kho.',
          'Em đã họp với phòng thiết kế về mẫu bao bì mới.',
          'Báo cáo chi phí tháng 9 em đã hoàn thành và gửi anh.',
          'Tuần sau em sẽ chuẩn bị cho hội chợ ngày 25/10.',
        ],
        task:
          'Chặng 2 — soi lỗi. Ghi chú của bạn: báo cáo chi phí tháng 9 **bị trễ** vì thiếu hoá đơn; hội chợ ngày **25/10**. ' +
          'Bản AI viết có một câu **sai so với ghi chú** — bấm vào câu đó.',
        checks: [{ kind: 'pickSentence', answer: 2 }],
        spotlight: { helpId: 'ai.sentences' },
        hint: 'Đặt ghi chú cạnh báo cáo. Việc nào trong ghi chú chưa xong?',
        steps: ['Ghi chú ghi báo cáo chi phí tháng 9 **bị trễ**.', 'Bấm vào câu nói báo cáo chi phí đã hoàn thành.'],
        solve: pickAll([2]),
      }),
      aiPractice({
        mode: 'pickItems',
        items: [
          'Tên khách kèm số điện thoại: chị Mai – 0912 345 678',
          'Tên công việc: gửi báo giá',
          'Số hợp đồng HĐ-2026-0147',
          'Ngày họp: thứ Tư 15/10',
          'Doanh thu từng khách: chị Mai 120 triệu, anh Tùng 85 triệu',
          'Tên phòng: phòng thiết kế',
        ],
        task: 'Chặng 3 — an toàn. Ghi chú **thật** của công ty còn những dòng dưới đây. Chọn những thông tin **phải xoá hoặc che** trước khi dán vào AI.',
        checks: [{ kind: 'pickItems', answer: [0, 2, 4] }],
        spotlight: { helpId: 'ai.items' },
        hint: 'Thông tin nào giúp người ngoài nhận ra một khách hàng cụ thể, hay lộ chuyện làm ăn của công ty?',
        steps: [
          'Số điện thoại của khách, số hợp đồng và doanh thu từng khách là thông tin nhạy cảm.',
          'Tên công việc, ngày họp, tên phòng thì đưa cho AI được.',
        ],
        solve: pickAll([0, 2, 4]),
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body:
          'Chúc mừng bạn đã hoàn thành **lộ trình Dùng AI**! 🎉 Giờ bạn biết:\n\n' +
          '- Viết prompt đủ năm phần để AI trả lời trúng ý.\n' +
          '- Đọc lại và **bắt lỗi** trước khi gửi đi.\n' +
          '- Giữ kín thông tin nhạy cảm.\n\n' +
          'Với Claude hay bất kỳ trợ lý AI nào, nhớ câu này: **AI viết nháp, bạn chịu trách nhiệm.**',
      },
    ],
  },
];
