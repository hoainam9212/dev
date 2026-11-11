import { describe, expect, it } from 'vitest';
import { aichatSim } from '@office-neko/shared';
import { LESSONS } from './index';

/** Mọi bước gõ prompt (chế độ chat) của bài AI. */
const chatSteps = Object.values(LESSONS).flatMap((l) =>
  l.steps.flatMap((s, i) =>
    s.kind === 'practice' && s.sim === 'aichat' && (s.initial as aichatSim.AiChatState).mode === 'chat'
      ? [{ id: `${l.id}#${i}`, initial: s.initial as aichatSim.AiChatState, solution: s.solution as aichatSim.AiChatAction[] }]
      : [],
  ),
);

describe('bài chat AI có chủ đề', () => {
  it('có bài chat để soi', () => {
    expect(chatSteps.length).toBeGreaterThanOrEqual(8);
  });

  it('mọi bài chat khai chủ đề, nên câu trả lời soạn sẵn không bị đưa cho câu hỏi lạc đề', () => {
    for (const s of chatSteps) expect(s.initial.topic, s.id).toBeDefined();
  });

  it('lời giải mẫu của mỗi bài đúng chủ đề; "Bạn là ai" thì lạc đề', () => {
    for (const s of chatSteps) {
      const done = s.solution.reduce(aichatSim.reduceAiChat, s.initial);
      expect(done.messages.filter((m) => m.from === 'user').every((m) => m.onTopic), s.id).toBe(true);
      expect(aichatSim.isOnTopic('Bạn là ai', s.initial.topic!), s.id).toBe(false);
    }
  });
});
