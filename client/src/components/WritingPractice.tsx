import { useEffect, useMemo, useState } from 'react';
import { pathToPoints, scoreStroke, type Point } from '@nihongo/shared';
import { DrawCanvas } from './DrawCanvas';
import { Mascot, type Mood } from './Mascot';

const PASS = 0.55;

interface Props {
  paths: string[];
  label: string;
  onComplete?: (r: { score: number }) => void;
}

/** Stroke-by-stroke handwriting practice with scoring against reference paths. */
export function WritingPractice({ paths, label, onComplete }: Props) {
  const refs = useMemo(() => paths.map((d) => pathToPoints(d)), [paths]);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState<Point[][]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [fails, setFails] = useState(0);
  const [shake, setShake] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    setIdx(0);
    setDone([]);
    setScores([]);
    setFails(0);
  }, [paths]);

  const finished = idx >= paths.length;
  const avg = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) : 0;

  const handle = (pts: Point[]) => {
    if (finished) return;
    const { score } = scoreStroke(pts, refs[idx]!);
    if (score >= PASS) {
      const ns = [...scores, score];
      setScores(ns);
      setDone([...done, pts]);
      setFails(0);
      const next = idx + 1;
      setIdx(next);
      if (next >= paths.length) {
        onComplete?.({ score: Math.round((ns.reduce((a, b) => a + b, 0) / ns.length) * 100) });
      }
    } else {
      setFails((f) => f + 1);
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  const reset = () => {
    setIdx(0);
    setDone([]);
    setScores([]);
    setFails(0);
  };

  const mood: Mood = finished ? (avg >= 80 ? 'happy' : 'neutral') : fails >= 2 ? 'sad' : 'neutral';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4">
        <span className="text-5xl font-black">{label}</span>
        <Mascot mood={mood} size={70} />
      </div>
      <p className="text-sm font-bold text-muted" aria-live="polite">
        {finished ? `Hoàn thành! Điểm: ${avg}` : `Nét ${idx + 1} / ${paths.length}`}
      </p>
      <DrawCanvas
        guide={showGuide ? paths : []}
        hint={fails >= 1 && !finished ? paths[idx] : undefined}
        onStroke={handle}
        strokes={done}
        shaking={shake}
      />
      <div className="flex gap-2">
        <button type="button" className="btn-soft text-sm" onClick={() => setShowGuide((g) => !g)}>
          {showGuide ? 'Ẩn mẫu' : 'Hiện mẫu'}
        </button>
        <button type="button" className="btn-soft text-sm" onClick={reset}>
          Vẽ lại
        </button>
      </div>
    </div>
  );
}
