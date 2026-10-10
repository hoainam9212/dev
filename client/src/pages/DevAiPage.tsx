import { useCallback, useState } from 'react';
import { aichatSim } from '@office-neko/shared';
import { AiChatSim } from '../sims/aichat/AiChatSim';

// TẠM: trang thử khung chat cho 6A. Task 9 xoá file này cùng route `/dev/aichat`.
const SAMPLES: Record<aichatSim.AiMode, aichatSim.AiChatState> = {
  chat: aichatSim.aiChatInitial({
    greeting: 'Chào bạn! Mình là trợ lý AI. Bạn cần giúp gì?',
    replies: {
      weak: 'Đây là một email xin nghỉ phép:\n\nKính gửi anh/chị,\nTôi xin nghỉ. Cảm ơn.',
      ok: 'Kính gửi chị Lan,\n\nEm xin phép nghỉ ngày thứ Sáu để giải quyết việc gia đình. Em sẽ bàn giao việc trước khi nghỉ.\n\nEm cảm ơn chị.',
      good:
        '**Tiêu đề:** Xin nghỉ phép thứ Sáu 18/10\n\nKính gửi chị Lan,\n\nEm xin phép nghỉ ngày thứ Sáu 18/10 để đưa con đi khám. ' +
        'Việc báo cáo tuần em đã gửi anh Minh xem trước.\n\nNếu có việc gấp, chị gọi em qua số điện thoại nhé.\n\nEm cảm ơn chị.',
    },
  }),
  pickSentence: aichatSim.aiChatInitial({
    mode: 'pickSentence',
    greeting: 'Giới thiệu ngắn về Hà Nội giúp tôi.',
    sentences: [
      'Hà Nội là thủ đô của Việt Nam.',
      'Thành phố có Hồ Gươm nằm ở quận Hoàn Kiếm.',
      'Năm 2010, Hà Nội kỷ niệm 500 năm Thăng Long.',
      'Phở và bún chả là hai món ăn nổi tiếng ở đây.',
    ],
  }),
  pickItems: aichatSim.aiChatInitial({
    mode: 'pickItems',
    items: [
      'Mật khẩu email công ty',
      'Câu hỏi: cách viết email xin nghỉ phép lịch sự',
      'Số căn cước của khách hàng Nguyễn Văn A',
      'Mẫu báo cáo tuần đã xoá tên người',
      'Bảng lương có tên và số tài khoản nhân viên',
    ],
  }),
};

const MODE_LABEL: Record<aichatSim.AiMode, string> = {
  chat: 'Chat',
  pickSentence: 'Bắt câu sai',
  pickItems: 'Chọn thông tin',
};

export function DevAiPage() {
  const [mode, setMode] = useState<aichatSim.AiMode>('chat');
  const [last, setLast] = useState<aichatSim.AiChatState>(SAMPLES.chat);
  const onState = useCallback((s: aichatSim.AiChatState) => setLast(s), []);
  const lastUser = [...last.messages].reverse().find((m) => m.from === 'user');
  return (
    <main className="mx-auto max-w-2xl space-y-3 p-4">
      <h1 className="text-xl font-bold">Thử khung chat AI (tạm)</h1>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(SAMPLES) as aichatSim.AiMode[]).map((m) => (
          <button key={m} type="button" className={m === mode ? 'btn-primary' : 'btn'} onClick={() => setMode(m)}>
            {MODE_LABEL[m]}
          </button>
        ))}
      </div>
      <AiChatSim key={mode} initial={SAMPLES[mode]} onState={onState} os="win" spotlight={null} />
      <p className="text-sm text-muted" data-testid="dev-ai-last">
        {last.mode !== 'chat'
          ? `Đang chọn: ${last.picked.join(', ') || '(chưa)'}`
          : lastUser?.score
            ? `Prompt vừa gửi: ${lastUser.score.score}/5, mức ${lastUser.score.tier}`
            : 'Chưa gửi prompt nào.'}
      </p>
    </main>
  );
}
