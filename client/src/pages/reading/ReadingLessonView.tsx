import { useMemo, useState } from 'react';
import { stripFurigana, type ReadingLesson } from '@nihongo/shared';
import { Furigana } from '../../components/Furigana';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { speak, stopSpeaking } from '../../lib/tts';

interface Props {
  lesson: ReadingLesson;
  onBack: () => void;
}

export function ReadingLessonView({ lesson, onBack }: Props) {
  const [showFuri, setShowFuri] = useState(true);
  const [rate, setRate] = useState(0.9);
  const [popover, setPopover] = useState<ReadingLesson['vocab'][number] | null>(null);
  const [quiz, setQuiz] = useState(false);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);
  const plain = useMemo(() => stripFurigana(lesson.body), [lesson.body]);

  const questions = useMemo<QuizQuestion[]>(
    () =>
      lesson.questions.map((q) => ({
        prompt: <span className="text-xl">{q.prompt}</span>,
        promptClassName: 'text-xl',
        choices: q.choices,
        answer: q.answer,
        explain: q.explain,
      })),
    [lesson],
  );

  const onWordTap = (base: string) => {
    const v = lesson.vocab.find((x) => x.word.startsWith(base) || base.startsWith(x.word.replace(/[ぁ-ん]+$/, '')));
    if (v) {
      setPopover(v);
      speak(v.word);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button type="button" className="btn-soft text-sm" onClick={onBack}>
          ← Danh sách
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn-soft text-sm" onClick={() => setShowFuri((f) => !f)}>
            {showFuri ? 'Ẩn furigana' : 'Hiện furigana'}
          </button>
          <button type="button" className="btn-sky text-sm" onClick={() => speak(plain, { rate })}>
            🔊 Đọc cả bài
          </button>
          <button type="button" className="btn-soft text-sm" onClick={stopSpeaking} aria-label="Dừng đọc">
            ⏹
          </button>
          <label className="flex items-center gap-1 text-xs text-muted">
            Tốc độ
            <input type="range" min={0.6} max={1.2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} aria-label="Tốc độ đọc" />
            {rate.toFixed(1)}
          </label>
        </div>
      </div>

      <h2 className="text-2xl font-black">{lesson.title}</h2>
      <p className="whitespace-pre-line text-2xl leading-[2.4]">
        <Furigana text={lesson.body} show={showFuri} onWordTap={onWordTap} />
      </p>

      {popover && (
        <div className="card flex items-start gap-3 p-4" role="status">
          <button type="button" className="text-rose" onClick={() => speak(popover.word)} aria-label="Nghe từ">
            🔊
          </button>
          <div className="flex-1">
            <p className="text-xl font-black">
              {popover.word} <span className="text-base text-muted">{popover.reading}</span>
            </p>
            <p>{popover.vi}</p>
          </div>
          <button type="button" className="btn-soft text-xs" onClick={() => setPopover(null)} aria-label="Đóng">
            ✕
          </button>
        </div>
      )}

      <details className="card p-4">
        <summary className="cursor-pointer font-bold">Từ vựng trong bài ({lesson.vocab.length})</summary>
        <ul className="mt-2 grid gap-1 sm:grid-cols-2">
          {lesson.vocab.map((v) => (
            <li key={v.word} className="flex items-baseline gap-2 text-sm">
              <button type="button" className="text-rose" onClick={() => speak(v.word)} aria-label={`Nghe ${v.word}`}>
                🔊
              </button>
              <span className="font-bold">{v.word}</span>
              <span className="text-muted">{v.reading}</span>
              <span>{v.vi}</span>
            </li>
          ))}
        </ul>
      </details>

      {!quiz ? (
        <div className="flex justify-center">
          <button type="button" className="btn-primary" onClick={() => setQuiz(true)}>
            Trả lời câu hỏi ({lesson.questions.length})
          </button>
        </div>
      ) : (
        <div className="card p-4">
          <QuizRunner key={lesson.id} questions={questions} kind="reading" type="reading" xpPerCorrect={3} onFinish={setResult} />
          {result && (
            <div className="mt-3 flex justify-center gap-2">
              <button type="button" className="btn-soft" onClick={onBack}>
                Bài khác
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
