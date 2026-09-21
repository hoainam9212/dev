import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { typingSim } from '@office-neko/shared';
import { useOs, useProfileId } from '../db/profile';
import { speedTestText, TYPING_TEXTS } from '../content/typing-texts';
import { KeyboardSim } from '../sims/keyboard/KeyboardSim';
import { recordTypingRun } from '../progress/typing';
import { Mochi } from '../components/Mochi';

function makeInitial(minutes: number, attempt: number) {
  return typingSim.typingInitial({
    target: speedTestText(minutes, attempt % TYPING_TEXTS.length),
    mode: 'test',
    durationSec: minutes * 60,
  });
}

export function SpeedTestPage() {
  const { min = '' } = useParams();
  const minutes = min === '1' ? 1 : min === '3' ? 3 : null;
  const os = useOs();
  const profileId = useProfileId();
  const [attempt, setAttempt] = useState(0);
  const initial = useMemo(() => makeInitial(minutes ?? 1, attempt), [minutes, attempt]);
  const [result, setResult] = useState<ReturnType<typeof typingSim.typingMetrics> | null>(null);
  const saved = useRef(false);

  const onState = useCallback(
    (s: typingSim.TypingState) => {
      if (!s.finished || saved.current || minutes === null || !profileId) return;
      saved.current = true;
      const m = typingSim.typingMetrics(s);
      setResult(m);
      void recordTypingRun({ profileId, mode: `test-${minutes}`, wpm: m.wpm, accuracy: m.accuracy, elapsedMs: m.elapsedMs, keyStats: s.keyStats }).catch(() => undefined);
    },
    [minutes, profileId],
  );

  useEffect(() => {
    saved.current = false;
    setResult(null);
  }, [attempt, minutes]);

  if (minutes === null) return <Navigate to="/typing" replace />;

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 pb-24">
      <div className="flex items-center gap-3">
        <Link to="/typing" className="btn">← Luyện gõ</Link>
        <h1 className="text-2xl font-extrabold">Kiểm tra tốc độ {minutes} phút</h1>
      </div>
      <p className="text-muted">Đồng hồ bắt đầu chạy khi bạn gõ phím đầu tiên. Gõ sai có thể dùng Backspace để sửa.</p>
      <KeyboardSim key={attempt} initial={initial} onState={onState} os={os} spotlight={null} />
      {result && (
        <section className="card flex flex-wrap items-center gap-4 p-5">
          <Mochi mood="happy" size={80} />
          <div className="flex-1 space-y-1">
            <h2 className="text-xl font-extrabold">Kết quả</h2>
            <p className="text-lg font-bold">{result.wpm} WPM · {result.accuracy}% chính xác</p>
          </div>
          <button type="button" className="btn-primary" onClick={() => setAttempt((a) => a + 1)}>Làm lại</button>
        </section>
      )}
    </div>
  );
}
