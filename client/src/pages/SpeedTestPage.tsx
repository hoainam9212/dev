import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { typingSim } from '@office-neko/shared';
import { useOs, useProfileId } from '../db/profile';
import { speedTestText, TYPING_TEXTS } from '../content/typing-texts';
import { TYPING_PLACEMENT } from '../content/placement';
import { markTestedOut } from '../progress/placement';
import { KeyboardSim } from '../sims/keyboard/KeyboardSim';
import { recordTypingRun } from '../progress/typing';
import { awardBadges } from '../progress/badges';
import { Mochi } from '../components/Mochi';

function makeInitial(minutes: number, attempt: number) {
  return typingSim.typingInitial({
    target: speedTestText(minutes, attempt % TYPING_TEXTS.length),
    mode: 'test',
    durationSec: minutes * 60,
  });
}

const typingPlacementPassed = (m: { wpm: number; accuracy: number }) =>
  m.wpm >= TYPING_PLACEMENT.minWpm && m.accuracy >= TYPING_PLACEMENT.minAccuracy;

export function SpeedTestPage() {
  const { min = '' } = useParams();
  const minutes = min === '1' ? 1 : min === '3' ? 3 : null;
  // Kiểm tra đầu vào của lộ trình gõ phím: dùng chính bài kiểm tra tốc độ, đạt ngưỡng thì mở khoá.
  const placement = useSearchParams()[0].get('placement') === '1' && minutes === TYPING_PLACEMENT.minutes;
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
      if (placement && typingPlacementPassed(m)) void markTestedOut(profileId, 'typing').catch(() => undefined);
      void recordTypingRun({ profileId, mode: `test-${minutes}`, wpm: m.wpm, accuracy: m.accuracy, elapsedMs: m.elapsedMs, keyStats: s.keyStats })
        .then(() => awardBadges(profileId))
        .catch(() => undefined);
    },
    [minutes, profileId, placement],
  );

  useEffect(() => {
    saved.current = false;
    setResult(null);
  }, [attempt, minutes]);

  if (minutes === null) return <Navigate to="/typing" replace />;

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 pb-24">
      <div className="flex items-center gap-3">
        {placement
          ? <Link to="/placement" className="btn">← Kiểm tra đầu vào</Link>
          : <Link to="/typing" className="btn">← Luyện gõ</Link>}
        <h1 className="text-2xl font-extrabold">Kiểm tra tốc độ {minutes} phút</h1>
      </div>
      <p className="text-muted">Đồng hồ bắt đầu chạy khi bạn gõ phím đầu tiên. Gõ sai có thể dùng Backspace để sửa.</p>
      {placement && (
        <p className="font-semibold">
          Kiểm tra đầu vào: đạt {TYPING_PLACEMENT.minWpm} WPM và {TYPING_PLACEMENT.minAccuracy}% chính xác là mở khoá lộ trình Gõ phím 10 ngón.
        </p>
      )}
      <KeyboardSim key={attempt} initial={initial} onState={onState} os={os} spotlight={null} />
      {result && (
        <section className="card flex flex-wrap items-center gap-4 p-5">
          <Mochi mood="happy" size={80} />
          <div className="flex-1 space-y-1">
            <h2 className="text-xl font-extrabold">Kết quả</h2>
            <p className="text-lg font-bold">{result.wpm} WPM · {result.accuracy}% chính xác</p>
            {placement && (typingPlacementPassed(result) ? (
              <p className="font-extrabold text-excel">Đã mở khoá lộ trình Gõ phím 10 ngón!</p>
            ) : (
              <p className="text-muted">
                Cần ít nhất {TYPING_PLACEMENT.minWpm} WPM và {TYPING_PLACEMENT.minAccuracy}% chính xác để mở khoá. Học từ đầu sẽ chắc
                hơn — hoặc thử lại lúc khác.
              </p>
            ))}
          </div>
          <button type="button" className="btn-primary" onClick={() => setAttempt((a) => a + 1)}>Làm lại</button>
        </section>
      )}
    </div>
  );
}
