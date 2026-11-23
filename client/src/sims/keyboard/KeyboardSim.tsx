import { useEffect, useReducer, useRef, useState, type KeyboardEvent } from 'react';
import { compareText, fingersForChar, typingSim } from '@office-neko/shared';
import type { SimProps } from '../types';
import { Mochi } from '../../components/Mochi';
import { Hands } from './Hands';
import { OnScreenKeyboard } from './OnScreenKeyboard';

type S = typingSim.TypingState;

export function KeyboardSim({ initial, onState, os }: SimProps<S>) {
  const [state, dispatch] = useReducer(typingSim.reduceTyping, initial);
  const [imeWarning, setImeWarning] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    box.focus({ preventScroll: true });
    // Màn thấp (laptop, chữ to): bàn phím và bàn tay lọt xuống dưới mép. Cuộn khung gõ lên sát thanh trên để thấy cùng
    // lúc dòng chữ, cả bàn phím và hai bàn tay; chật quá thì bỏ dòng WPM, chỉ cuộn tới dòng chữ. Đã vừa màn hình, hoặc
    // cuộn cũng không vừa (bài kiểm tra tốc độ chữ dài), thì giữ nguyên để không mất đồng hồ và tiêu đề.
    const card = box.closest('.card')?.getBoundingClientRect();
    if (!card || card.bottom <= window.innerHeight) return;
    const top = (document.querySelector('header')?.getBoundingClientRect().bottom ?? 0) + 8;
    const room = window.innerHeight - top;
    const from = card.bottom - card.top <= room ? card.top : card.bottom - box.getBoundingClientRect().top <= room ? box.getBoundingClientRect().top : null;
    if (from !== null) window.scrollBy({ top: from - top });
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
  const nextFingers = next ? fingersForChar(next) : null;
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
      {!state.ime && (
        // Màn rộng: hai bàn tay đứng cạnh bàn phím (mắt thấy phím và ngón cùng lúc, không phải cuộn); màn hẹp: tay ở dưới.
        // `lg:pr-14` chừa chỗ cho nút "?" nổi ở góc phải dưới.
        <div data-testid="keyboard-and-hands" className="flex flex-col items-center gap-3 lg:flex-row lg:gap-6 lg:pr-14">
          <div className="w-full min-w-0 lg:flex-1">
            <OnScreenKeyboard os={os} next={next} />
          </div>
          <div className="w-full lg:w-1/4 lg:shrink-0">
            <Hands finger={nextFingers?.key.finger ?? null} shift={nextFingers?.shiftFinger ?? null} />
          </div>
        </div>
      )}
    </div>
  );
}
