import { Fragment } from 'react';
import { CheckboxUnchecked20Regular } from '@fluentui/react-icons';

/**
 * Bắt câu sai: câu hỏi của người dùng bên phải, câu trả lời AI bên trái mà mỗi câu là một nút nội dòng.
 * Câu vẫn đọc trôi như một đoạn văn; chỉ khi di chuột mới thấy gạch chân chấm.
 */
export function SentencePicker({
  question,
  sentences,
  picked,
  onPick,
}: {
  question: string;
  sentences: string[];
  picked: number[];
  onPick: (index: number) => void;
}) {
  return (
    <>
      {question && (
        <div data-from="user" className="flex justify-end">
          <div className="ai-bubble ai-bubble-user">{question}</div>
        </div>
      )}
      <p className="text-center text-sm font-bold text-muted">Bấm vào câu bạn thấy sai.</p>
      <div data-from="ai" className="flex justify-start">
        <div data-help-id="ai.sentences" className="ai-bubble ai-bubble-ai">
          {sentences.map((s, i) => {
            const on = picked.includes(i);
            return (
              <Fragment key={i}>
                {i > 0 && ' '}
                {/* `<span role="button">` chứ không phải `<button>`: Chrome coi `<button>` là khối nguyên
                    (inline-block), câu dài không gãy dòng được và đoạn văn vỡ thành danh sách. */}
                <span
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  className={`ai-sentence${on ? ' ai-sentence-picked' : ''}`}
                  onClick={() => onPick(i)}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter' && e.key !== ' ') return;
                    e.preventDefault();
                    onPick(i);
                  }}
                >
                  {s}
                </span>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

/** Chọn thông tin nhạy cảm: mỗi mẩu thông tin là một ô bật/tắt; mục đã chọn ghi "Không đưa". */
export function ItemPicker({
  items,
  picked,
  onPick,
}: {
  items: string[];
  picked: number[];
  onPick: (index: number) => void;
}) {
  return (
    <div data-help-id="ai.items" className="space-y-2">
      <p className="font-bold">Bạn định dán những thông tin này vào ô chat:</p>
      <ul className="space-y-2">
        {items.map((it, i) => {
          const on = picked.includes(i);
          return (
            <li key={i}>
              <button type="button" role="checkbox" aria-checked={on} className="ai-item" onClick={() => onPick(i)}>
                <span aria-hidden className="w-5 shrink-0 text-center">
                  {on ? '🚫' : <CheckboxUnchecked20Regular />}
                </span>
                <span className="min-w-0 flex-1">{it}</span>
                {on && <span className="shrink-0 text-sm font-bold text-[#C92A2A]">Không đưa</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
