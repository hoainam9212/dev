import { Fragment, useEffect, useReducer, useRef } from 'react';
import { aichatSim } from '@office-neko/shared';
import { Bot24Regular, Send20Filled } from '@fluentui/react-icons';
import type { SimProps } from '../types';
import { CriteriaBar } from './CriteriaBar';

/** Chữ của AI: giữ xuống dòng, `**đậm**` thành chữ đậm. */
function AiText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/**
 * Trợ lý AI mô phỏng, chạy ngoại tuyến. Câu trả lời soạn sẵn trong state; reducer chọn câu theo chất lượng prompt.
 * Bố cục như mọi ứng dụng chat: tin mình bên phải, tin AI bên trái, ô gõ dưới cùng.
 */
export function AiChatSim({ initial, onState }: SimProps<aichatSim.AiChatState>) {
  const [state, dispatch] = useReducer(aichatSim.reduceAiChat, initial);
  useEffect(() => onState(state), [state, onState]);

  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.messages.length]);

  const canSend = state.draft.trim() !== '';

  return (
    <div className="card flex max-h-[28rem] min-h-[20rem] flex-col overflow-hidden">
      <div className="border-b border-black/5 px-4 py-2">
        <div className="flex items-center gap-2 font-bold">
          <Bot24Regular aria-hidden />
          <span>Trợ lý AI (mô phỏng)</span>
        </div>
        <p className="text-xs text-muted">Câu trả lời soạn sẵn để luyện tập — không gửi đi đâu cả.</p>
      </div>

      <div ref={listRef} aria-live="polite" className="ai-msgs min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3">
        {state.messages.map((m, i) => (
          <div key={i} data-from={m.from} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`ai-bubble ${m.from === 'user' ? 'ai-bubble-user' : 'ai-bubble-ai'}`}>
              {m.from === 'ai' ? <AiText text={m.text} /> : m.text}
            </div>
          </div>
        ))}
      </div>

      <form
        className="space-y-2 border-t border-black/5 px-3 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'send' });
        }}
      >
        <div className="flex items-end gap-2">
          <textarea
            data-help-id="ai.composer"
            aria-label="Nhập prompt"
            placeholder="Nhập prompt…"
            rows={2}
            value={state.draft}
            onChange={(e) => dispatch({ type: 'setDraft', text: e.target.value })}
            onKeyDown={(e) => {
              if (e.key !== 'Enter' || e.shiftKey) return;
              // Bộ gõ tiếng Việt đang ghép chữ: Enter là để chốt chữ, không phải để gửi.
              if (e.nativeEvent.isComposing || e.keyCode === 229) return;
              e.preventDefault();
              dispatch({ type: 'send' });
            }}
            className="min-w-0 flex-1 resize-none rounded-2xl border border-black/10 bg-white px-3 py-2 text-base"
          />
          <button type="submit" data-help-id="ai.send" className="btn-primary px-4" disabled={!canSend}>
            <Send20Filled aria-hidden />
            Gửi
          </button>
        </div>
        <CriteriaBar draft={state.draft} />
      </form>
    </div>
  );
}
