import { useState } from 'react';
import { normalizeKana, diffChars } from '@nihongo/shared';

interface Props {
  expected: string;
  onResult: (ok: boolean, typed: string) => void;
  placeholder?: string;
}

/** Text answer compared after kana normalization (accepts romaji, katakana, spaces). */
export function TypingAnswer({ expected, onResult, placeholder = 'Gõ cách đọc (kana hoặc romaji)' }: Props) {
  const [typed, setTyped] = useState('');
  const [checked, setChecked] = useState<boolean | null>(null);
  const check = () => {
    if (!typed.trim()) return;
    setChecked(normalizeKana(typed) === normalizeKana(expected));
  };
  const diff = checked === null ? [] : diffChars(normalizeKana(expected), normalizeKana(typed));

  return (
    <form
      className="flex w-full max-w-md flex-col items-center gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (checked === null) check();
        else onResult(checked, typed);
      }}
    >
      <input
        autoFocus
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        disabled={checked !== null}
        placeholder={placeholder}
        aria-label="Câu trả lời"
        className="w-full rounded-full bg-cream px-5 py-3 text-center text-xl font-bold ring-2 ring-sakura/60 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      {checked === null ? (
        <button type="submit" className="btn-primary">
          Kiểm tra
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className={`font-bold ${checked ? 'text-emerald-500' : 'text-rose'}`}>
            {checked ? '正解！ Chính xác!' : 'Chưa đúng. Đáp án:'}
          </p>
          <p className="text-2xl font-black" data-testid="typing-diff">
            {diff.map((d, i) => (
              <span key={i} className={d.ok ? '' : 'rounded bg-rose/30 px-0.5 text-rose'}>
                {d.ch}
              </span>
            ))}
          </p>
          <button type="submit" className="btn-primary" autoFocus>
            Tiếp →
          </button>
        </div>
      )}
    </form>
  );
}
