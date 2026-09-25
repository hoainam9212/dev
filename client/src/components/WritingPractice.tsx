import { useEffect, useMemo, useState } from 'react';
import { pathToPoints, scoreStroke, type Point } from '@nihongo/shared';
import { DrawCanvas } from './DrawCanvas';
import { Mascot, type Mood } from './Mascot';
import { useT } from '../i18n';

const PASS = 0.55;

interface Props {
  paths: string[];
  /** Strokes per character when `paths` spans several characters (yōon); each character gets its own cell. */
  split?: number[];
  label: string;
  onComplete?: (r: { score: number }) => void;
}

/** Stroke-by-stroke handwriting practice with scoring against reference paths. */
export function WritingPractice({ paths, split, label, onComplete }: Props) {
  const t = useT();
  // [start, end) stroke index range of each cell
  const cells = useMemo(() => {
    const counts = split && split.reduce((a, b) => a + b, 0) === paths.length ? split : [paths.length];
    let start = 0;
    return counts.map((n) => {
      const range = [start, start + n] as const;
      start += n;
      return range;
    });
  }, [split, paths.length]);
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
        {finished ? t.quiz.writingDone(avg) : t.quiz.strokeOf(idx + 1, paths.length)}
      </p>
      <div className="flex gap-2">
        {cells.map(([start, end]) => {
          const active = !finished && idx >= start && idx < end;
          return (
            <DrawCanvas
              key={start}
              size={cells.length > 1 ? 160 : 218}
              guide={showGuide ? paths.slice(start, end) : []}
              hint={active && fails >= 1 ? paths[idx] : undefined}
              active={cells.length === 1 || active}
              onStroke={handle}
              strokes={done.slice(start, end)}
              shaking={active && shake}
            />
          );
        })}
      </div>
      <div className="flex gap-2">
        <button type="button" className="btn-soft text-sm" onClick={() => setShowGuide((g) => !g)}>
          {showGuide ? t.quiz.hideGuide : t.quiz.showGuide}
        </button>
        <button type="button" className="btn-soft text-sm" onClick={reset}>
          {t.quiz.redraw}
        </button>
      </div>
    </div>
  );
}
