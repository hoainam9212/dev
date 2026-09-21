import { useEffect, useReducer, useRef, useState } from 'react';
import { fishGame } from '@office-neko/shared';
import { Mochi } from '../../components/Mochi';
import type { SimProps } from '../types';

/**
 * Trò chơi "Mèo bắt cá" dùng được ở cả hai nơi: trong bài học (chấm sao qua
 * `onState`) và ở khu Luyện gõ. Trạng thái do `useReducer(reduceFish, initial)`
 * giữ — đồng hồ trò chơi nằm ở component, reducer vẫn thuần.
 */
export function FishSim({ initial, onState }: SimProps<fishGame.FishState>) {
  const [state, dispatch] = useReducer(fishGame.reduceFish, initial);
  const [paused, setPaused] = useState(true);
  const [started, setStarted] = useState(false);
  const last = useRef<number | null>(null);

  /**
   * Chỉ báo ra ngoài khi có thay đổi ĐÁNG KỂ. Trò chơi chạy 60 khung hình/giây;
   * nếu mỗi khung hình đều gọi `onState` thì bộ chấm tự động của trình chạy bài
   * (debounce 300 ms) bị dội lại liên tục và không bao giờ chấm — người học bắt
   * đủ cá mà bài vẫn đứng im.
   */
  const latest = useRef(state);
  latest.current = state;
  useEffect(() => {
    onState(latest.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.caught, state.lives, state.over, onState]);

  useEffect(() => {
    if (paused || state.over) return;
    let alive = true;
    let handle = 0;
    const raf = window.requestAnimationFrame?.bind(window) ?? ((cb: FrameRequestCallback) => window.setTimeout(() => cb(performance.now()), 16));
    const cancel = window.cancelAnimationFrame?.bind(window) ?? window.clearTimeout;
    const frame = (now: number) => {
      if (!alive) return;
      if (!document.hidden) {
        const dt = last.current === null ? 16 : Math.min(100, now - last.current);
        dispatch({ type: 'tick', dt });
      }
      last.current = now;
      handle = raf(frame);
    };
    handle = raf(frame);
    return () => {
      alive = false;
      last.current = null;
      cancel(handle);
    };
  }, [paused, state.over]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!started || state.over) return;
      if (e.key === ' ') {
        e.preventDefault();
        setPaused((p) => !p);
        return;
      }
      if (paused || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        dispatch({ type: 'key', key: e.key });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, paused, state.over]);

  const target = fishGame.targetFish(state);
  const catX = target ? target.x : 0.5;

  return (
    <div className="space-y-3" data-help-id="fish.pond">
      <div className="card flex flex-wrap items-center gap-4 p-3 font-bold">
        <span>Điểm: {state.score}</span>
        <span>Cấp: {state.level}</span>
        <span aria-label={`${state.lives} mạng`}>{'❤️'.repeat(Math.max(0, state.lives))}</span>
        <span aria-label="Số cá bắt được">🐟 {state.caught}</span>
        <span className="ml-auto rounded-full bg-cream px-3 py-1 font-mono" aria-label="Chữ đang gõ">{state.input}</span>
        {started && !state.over && (
          <button type="button" className="btn-soft !py-1" onClick={() => setPaused((p) => !p)}>
            {paused ? '▶️ Chơi tiếp' : '⏸️ Tạm dừng'}
          </button>
        )}
      </div>
      <div className="relative h-[28rem] overflow-hidden rounded-3xl bg-gradient-to-b from-sky/60 to-mint/50">
        {state.fish.map((f) => {
          const isTarget = target?.id === f.id;
          const typed = isTarget ? state.input.length : 0;
          return (
            <div key={f.id} className="absolute -translate-x-1/2 text-center" style={{ left: `${f.x * 100}%`, top: `${f.y * 88}%` }}>
              <div className="text-3xl">🐟</div>
              <div className={`rounded-full bg-white px-2 font-mono font-bold ${isTarget ? 'ring-2 ring-rose' : ''}`}>
                <span className="text-excel-ink">{f.word.slice(0, typed)}</span>
                {f.word.slice(typed)}
              </div>
            </div>
          );
        })}
        <div className="absolute bottom-1 -translate-x-1/2 transition-all" style={{ left: `${catX * 100}%` }}>
          <Mochi mood={state.over ? 'sad' : 'happy'} size={56} animated={false} />
        </div>
        {!started && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 p-6 text-center">
            <div className="space-y-3">
              <p className="text-lg font-bold">Gõ đúng chữ trên con cá để Mochi bắt nó trước khi cá rơi xuống đáy!</p>
              <p className="text-muted">Phím Space: tạm dừng. Esc: xoá chữ đang gõ.</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setStarted(true);
                  setPaused(false);
                }}
              >
                Bắt đầu
              </button>
            </div>
          </div>
        )}
        {state.over && (
          <div className="absolute inset-0 grid place-items-center bg-white/80 p-6 text-center">
            <div className="card space-y-3 p-6">
              <h2 className="text-2xl font-extrabold">Hết lượt!</h2>
              <p>Điểm: {state.score} · Bắt được {state.caught} con cá</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
