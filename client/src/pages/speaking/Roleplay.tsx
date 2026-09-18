import { useEffect, useMemo, useState } from 'react';
import type { Level, ListeningLesson } from '@nihongo/shared';
import { useJson } from '../../content/loader';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { Mascot } from '../../components/Mascot';
import { SpeechBubble } from '../../components/SpeechBubble';
import { SpeakButton, type SpeakResult } from '../../components/SpeakButton';
import { speak } from '../../lib/tts';
import { moodForScore } from './Shadowing';

export function Roleplay({ level }: { level: Level }) {
  const { data, error, loading } = useJson<ListeningLesson[]>(`listening/${level.toLowerCase()}.json`);
  const [lesson, setLesson] = useState<ListeningLesson | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [i, setI] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [result, setResult] = useState<SpeakResult | null>(null);

  useEffect(() => {
    setLesson(null);
    setRole(null);
  }, [level]);

  const speakers = useMemo(() => (lesson ? [...new Set(lesson.script.map((l) => l.speaker))] : []), [lesson]);
  const line = lesson?.script[i];

  useEffect(() => {
    if (line && role && line.speaker !== role) speak(line.ja);
  }, [line, role]);

  if (loading) return <LoadingCat />;
  if (error) return <ErrorCat text={error} />;
  if (!data) return null;

  if (!lesson) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((l) => (
          <button key={l.id} type="button" className="card p-4 text-left transition hover:-translate-y-0.5" onClick={() => setLesson(l)}>
            <p className="text-lg font-black">🎭 {l.title}</p>
            <p className="text-sm text-muted">{l.script.length} câu thoại</p>
          </button>
        ))}
      </div>
    );
  }

  if (!role) {
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="font-bold">Bạn muốn đóng vai ai?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {speakers.map((s) => (
            <button
              key={s}
              type="button"
              className="btn-primary"
              onClick={() => {
                setRole(s);
                setI(0);
                setScores([]);
                setResult(null);
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <button type="button" className="btn-soft text-sm" onClick={() => setLesson(null)}>
          ← Chọn bài khác
        </button>
      </div>
    );
  }

  if (!line) {
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return (
      <div className="flex flex-col items-center gap-3 py-6" data-testid="roleplay-result">
        <Mascot mood={moodForScore(avg)} size={120} />
        <p className="text-xl font-black text-rose">Điểm trung bình: {avg}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setI(0);
              setScores([]);
              setResult(null);
            }}
          >
            Diễn lại
          </button>
          <button
            type="button"
            className="btn-soft"
            onClick={() => {
              setLesson(null);
              setRole(null);
            }}
          >
            Bài khác
          </button>
        </div>
      </div>
    );
  }

  const mine = line.speaker === role;
  const next = () => {
    setResult(null);
    setI((k) => k + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-bold text-muted">
        {lesson.title} · Lượt {i + 1} / {lesson.script.length} · Bạn là <span className="text-rose">{role}</span>
      </p>
      <div className="flex w-full max-w-lg items-start gap-3">
        {!mine && <Mascot mood="happy" size={70} />}
        <div className="flex-1">
          <SpeechBubble tail={mine ? 'bottom' : 'left'}>
            <p className="text-xs font-bold text-muted">{line.speaker}</p>
            <p className="text-xl font-bold" lang="ja">
              {line.ja}
            </p>
            <p className="text-sm text-muted">{line.vi}</p>
          </SpeechBubble>
        </div>
      </div>
      {!mine ? (
        <div className="flex gap-2">
          <button type="button" className="btn-sky" onClick={() => speak(line.ja)}>
            🔊 Nghe lại
          </button>
          <button type="button" className="btn-primary" onClick={next}>
            Tiếp →
          </button>
        </div>
      ) : !result ? (
        <div className="flex flex-col items-center gap-2">
          <button type="button" className="btn-soft text-sm" onClick={() => speak(line.ja)}>
            🔊 Nghe mẫu
          </button>
          <SpeakButton expected={line.ja} onResult={setResult} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2" data-testid="speak-result">
          <p className="text-3xl font-black text-rose">{result.score} điểm</p>
          {result.heard && <p className="text-sm text-muted">Máy nghe được: {result.heard}</p>}
          <div className="flex gap-2">
            <button type="button" className="btn-soft" onClick={() => setResult(null)}>
              Nói lại
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setScores((s) => [...s, result.score]);
                next();
              }}
            >
              Tiếp →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
