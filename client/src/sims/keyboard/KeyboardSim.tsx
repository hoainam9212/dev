import { useEffect, useReducer, useRef, useState, type KeyboardEvent } from 'react';
import { compareText, typingSim } from '@office-neko/shared';
import type { SimProps } from '../types';
import { Mochi } from '../../components/Mochi';
import { OnScreenKeyboard } from './OnScreenKeyboard';

type S = typingSim.TypingState;

export function KeyboardSim({ initial, onState, os }: SimProps<S>) {
  const [state, dispatch] = useReducer(typingSim.reduceTyping, initial);
  const [imeWarning, setImeWarning] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.focus();
  }, []);

  useEffect(() => {
    onState(state);
  }, [state, onState]);

  useEffect(() => {
    if (state.durationSec === null || state.startedAt === null || state.finished) return;
    const id = window.setInterval(() => {
      const at = Date.now();
      setNow(at);
      dispatch({ type: 'tick', at });
    }, 250);
    return () => window.clearInterval(id);
  }, [state.durationSec, state.startedAt, state.finished]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const composing = e.key === 'Process' || e.nativeEvent.isComposing || e.keyCode === 229;
    if (composing || (e.key.length === 1 && /[^\x20-\x7e]/.test(e.key))) {
      e.preventDefault();
      setImeWarning(true);
      return;
    }
    if (e.key === 'Backspace' || e.key.length === 1) {
      e.preventDefault();
      dispatch({ type: 'key', key: e.key, at: Date.now() });
    }
  };

  const text = typingSim.typedText(state);
  const states = compareText(state.target, text);
  const committed = state.ime ? [...state.imeState.done].length : Infinity;
  const textLen = [...text].length;
  const targetChars = [...state.target];
  const m = typingSim.typingMetrics(state);
  const next = state.ime || state.finished ? null : (targetChars[textLen] ?? null);
  const left =
    state.durationSec !== null
      ? Math.max(0, Math.ceil(state.durationSec - (state.startedAt !== null && state.lastAt !== null ? (now - state.startedAt) / 1000 : 0)))
      : null;

  return (
    <div className="card space-y-3 p-4">
      <div className="flex flex-wrap gap-4 text-sm font-bold">
        <span>⚡ WPM: {m.wpm}</span>
        <span>🎯 Chính xác: {m.accuracy}%</span>
        {left !== null && <span>⏱️ Còn lại {left}s</span>}
      </div>
      {imeWarning && (
        <p role="alert" className="rounded-2xl bg-butter/50 p-3 text-sm">
          Có vẻ bộ gõ tiếng Việt của máy {os === 'mac' ? '(Vietnamese Telex trên thanh menu)' : '(Unikey/EVKey hoặc bàn phím Vietnamese)'} đang bật. Hãy tắt nó đi — Mochi sẽ tự thêm dấu cho bạn.
        </p>
      )}
      <div
        role="textbox"
        aria-label="Vùng gõ phím"
        data-help-id="keyboard.area"
        ref={boxRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="rounded-2xl bg-white p-4 font-mono text-2xl leading-relaxed tracking-wide outline-none ring-2 ring-peach/50 focus:ring-4 focus:ring-sky"
      >
        {targetChars.map((ch, i) => {
          let st: string = states[i] ?? 'pending';
          if (state.ime && i >= committed && i < textLen) st = 'composing';
          const cls =
            st === 'correct' ? 'text-excel-ink' : st === 'wrong' ? 'bg-rose/30 text-rose-ink' : st === 'composing' ? 'underline decoration-dotted' : 'text-muted';
          const cursor = i === textLen && !state.finished;
          return (
            <span key={i} data-state={st} data-cursor={cursor || undefined} className={`${cls} ${cursor ? 'border-b-4 border-rose' : ''}`}>
              {ch}
            </span>
          );
        })}
      </div>
      {state.finished ? (
        <div className="flex items-center gap-3 rounded-2xl bg-mint/30 p-3 font-bold">
          <Mochi mood="happy" size={56} animated={false} />
          {state.durationSec !== null && !m.complete ? 'Hết giờ!' : 'Xong rồi! 🎉'} {m.wpm} WPM · {m.accuracy}% chính xác
        </div>
      ) : state.ime ? (
        <p className="rounded-2xl bg-lavender/30 p-3 text-sm">
          ✍️ Kiểu gõ {state.ime === 'telex' ? 'Telex: aa → â, dd → đ, w → ư/ơ/ă, s f r x j → sắc huyền hỏi ngã nặng' : 'VNI: 1–5 → dấu, 6 → mũ, 7 → móc, 8 → trăng, 9 → đ'}
        </p>
      ) : null}
      {!state.ime && <OnScreenKeyboard os={os} next={next} />}
    </div>
  );
}
