import { useCallback, useState } from 'react';
import { aichatSim } from '@office-neko/shared';
import { AiChatSim } from '../sims/aichat/AiChatSim';

// TẠM: trang thử khung chat cho 6A. Task 9 xoá file này cùng route `/dev/aichat`.
const INITIAL = aichatSim.aiChatInitial({
  greeting: 'Chào bạn! Mình là trợ lý AI. Bạn cần giúp gì?',
  replies: {
    weak: 'Đây là một email xin nghỉ phép:\n\nKính gửi anh/chị,\nTôi xin nghỉ. Cảm ơn.',
    ok: 'Kính gửi chị Lan,\n\nEm xin phép nghỉ ngày thứ Sáu để giải quyết việc gia đình. Em sẽ bàn giao việc trước khi nghỉ.\n\nEm cảm ơn chị.',
    good:
      '**Tiêu đề:** Xin nghỉ phép thứ Sáu 18/10\n\nKính gửi chị Lan,\n\nEm xin phép nghỉ ngày thứ Sáu 18/10 để đưa con đi khám. ' +
      'Việc báo cáo tuần em đã gửi anh Minh xem trước.\n\nNếu có việc gấp, chị gọi em qua số điện thoại nhé.\n\nEm cảm ơn chị.',
  },
});

export function DevAiPage() {
  const [last, setLast] = useState<aichatSim.AiChatState>(INITIAL);
  const onState = useCallback((s: aichatSim.AiChatState) => setLast(s), []);
  const lastUser = [...last.messages].reverse().find((m) => m.from === 'user');
  return (
    <main className="mx-auto max-w-2xl space-y-3 p-4">
      <h1 className="text-xl font-bold">Thử khung chat AI (tạm)</h1>
      <AiChatSim initial={INITIAL} onState={onState} os="win" spotlight={null} />
      <p className="text-sm text-muted" data-testid="dev-ai-last">
        {lastUser?.score ? `Prompt vừa gửi: ${lastUser.score.score}/5, mức ${lastUser.score.tier}` : 'Chưa gửi prompt nào.'}
      </p>
    </main>
  );
}
