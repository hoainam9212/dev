import { scorePrompt, type PromptScore, type Tier } from './criteria';

/**
 * Trợ lý AI mô phỏng, chạy ngoại tuyến: mọi câu trả lời soạn sẵn trong state, reducer chỉ CHỌN câu theo chất lượng
 * prompt, không sinh chữ mới và không gửi gì đi đâu.
 *
 * - `chat`: gõ prompt, gửi, nhận câu trả lời theo mức prompt.
 * - `pickSentence`: `greeting` là câu người dùng đã hỏi, `sentences` ghép lại là câu trả lời AI; bấm chọn câu sai.
 * - `pickItems`: `items` là các mẩu thông tin; bấm chọn những thứ KHÔNG nên đưa cho AI.
 */
export type AiMode = 'chat' | 'pickSentence' | 'pickItems';

export interface AiMessage {
  from: 'user' | 'ai';
  text: string;
  /** Chỉ có ở tin 'user'. */
  score?: PromptScore;
}

export interface AiChatState {
  mode: AiMode;
  messages: AiMessage[];
  draft: string;
  /** Chế độ chat: câu trả lời soạn sẵn theo mức prompt. */
  replies: Record<Tier, string>;
  /** pickSentence: các câu của câu trả lời AI cần soi. */
  sentences: string[];
  /** pickItems: các mẩu thông tin. */
  items: string[];
  /** Chỉ số đang chọn (pickSentence: tối đa 1). */
  picked: number[];
}

export type AiChatAction =
  | { type: 'setDraft'; text: string }
  | { type: 'send' }
  | { type: 'pick'; index: number }
  | { type: 'clearChat' };

/** Thiếu mức nào thì lấy mức gần nhất có, ưu tiên câu tốt hơn. */
const FALLBACK: Record<Tier, Tier[]> = {
  weak: ['weak', 'ok', 'good'],
  ok: ['ok', 'good', 'weak'],
  good: ['good', 'ok', 'weak'],
};

export function aiChatInitial(o: {
  mode?: AiMode;
  greeting?: string;
  replies?: Partial<Record<Tier, string>>;
  sentences?: string[];
  items?: string[];
}): AiChatState {
  const given = o.replies ?? {};
  const pickReply = (t: Tier): string => FALLBACK[t].map((x) => given[x]).find((x) => x !== undefined) ?? '';
  return {
    mode: o.mode ?? 'chat',
    messages: o.greeting ? [{ from: 'ai', text: o.greeting }] : [],
    draft: '',
    replies: { weak: pickReply('weak'), ok: pickReply('ok'), good: pickReply('good') },
    sentences: o.sentences ?? [],
    items: o.items ?? [],
    picked: [],
  };
}

export function reduceAiChat(s: AiChatState, a: AiChatAction): AiChatState {
  switch (a.type) {
    case 'setDraft':
      return a.text === s.draft ? s : { ...s, draft: a.text };
    case 'send': {
      if (!s.draft.trim()) return s;
      const score = scorePrompt(s.draft);
      return {
        ...s,
        messages: [...s.messages, { from: 'user', text: s.draft, score }, { from: 'ai', text: s.replies[score.tier] }],
        draft: '',
      };
    }
    case 'pick': {
      const n = s.mode === 'pickSentence' ? s.sentences.length : s.mode === 'pickItems' ? s.items.length : 0;
      if (!Number.isInteger(a.index) || a.index < 0 || a.index >= n) return s;
      const on = s.picked.includes(a.index);
      if (s.mode === 'pickSentence') return { ...s, picked: on ? [] : [a.index] };
      return { ...s, picked: on ? s.picked.filter((i) => i !== a.index) : [...s.picked, a.index] };
    }
    case 'clearChat': {
      const first = s.messages[0];
      const keep = first && first.from === 'ai' ? [first] : [];
      return keep.length === s.messages.length ? s : { ...s, messages: keep };
    }
  }
}
