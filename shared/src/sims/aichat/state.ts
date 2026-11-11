import { foldVi, scorePrompt, type PromptScore, type Tier } from './criteria';

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
  /** Tin 'user' của bài có `topic`: prompt có hỏi đúng chủ đề không. Bài không có chủ đề thì không có trường này. */
  onTopic?: boolean;
}

/**
 * Chủ đề của bài chat: câu trả lời soạn sẵn chỉ hợp với câu hỏi về chủ đề này. Prompt khớp **một** từ khoá (so sau
 * `foldVi`, theo nguyên từ) là đúng chủ đề; không khớp thì AI không đưa câu soạn sẵn mà nói thật là bản mô phỏng.
 */
export interface AiTopic {
  /** Viết không dấu, chữ thường, ví dụ `'nghi phep'`. */
  keywords: string[];
  /** Tên chủ đề để nhắc người học, ví dụ `'email xin nghỉ phép'`. */
  vi: string;
}

export function isOnTopic(text: string, topic: AiTopic): boolean {
  const t = foldVi(text);
  return topic.keywords.some((k) => new RegExp(`(^|[^a-z0-9])${foldVi(k).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-z0-9])`).test(t));
}

/** Câu đáp khi prompt không đúng chủ đề: chào, hỏi danh tính, cảm ơn, hoặc nói thật là chưa hiểu. */
export function offTopicReply(text: string, topic: AiTopic): string {
  const t = foldVi(text);
  const ask = `Bài này bạn thử hỏi mình về **${topic.vi}** nhé.`;
  if (/(ban|may|em|cau) la (ai|gi)|ban ten (la )?gi|ten (cua )?ban/.test(t))
    return `Mình là trợ lý AI **mô phỏng** của Mochi: câu trả lời đã soạn sẵn để bạn tập, không phải AI thật. ${ask}`;
  if (/^(xin )?chao|^(hello|hi|alo)\b/.test(t)) return `Chào bạn! 👋 ${ask}`;
  if (/cam on|thank/.test(t)) return 'Không có gì! Bạn cứ hỏi tiếp nhé.';
  return `Mình chỉ là trợ lý **mô phỏng**, câu trả lời soạn sẵn cho bài này nên chưa hiểu câu đó 😺 ${ask}`;
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
  /** Chế độ chat: chủ đề bài hỏi; không có thì mọi prompt nhận câu soạn sẵn. */
  topic?: AiTopic;
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
  topic?: AiTopic;
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
    ...(o.topic ? { topic: o.topic } : {}),
  };
}

export function reduceAiChat(s: AiChatState, a: AiChatAction): AiChatState {
  switch (a.type) {
    case 'setDraft':
      return a.text === s.draft ? s : { ...s, draft: a.text };
    case 'send': {
      if (!s.draft.trim()) return s;
      const score = scorePrompt(s.draft);
      if (!s.topic) {
        return {
          ...s,
          messages: [...s.messages, { from: 'user', text: s.draft, score }, { from: 'ai', text: s.replies[score.tier] }],
          draft: '',
        };
      }
      const onTopic = isOnTopic(s.draft, s.topic);
      const reply = onTopic ? s.replies[score.tier] : offTopicReply(s.draft, s.topic);
      return {
        ...s,
        messages: [...s.messages, { from: 'user', text: s.draft, score, onTopic }, { from: 'ai', text: reply }],
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
