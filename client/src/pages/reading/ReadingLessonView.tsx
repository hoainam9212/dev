import { useMemo, useState } from 'react';
import { pickText, stripFurigana, type ReadingLesson } from '@nihongo/shared';
import { Furigana } from '../../components/Furigana';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { speak, stopSpeaking, useStopSpeechOnUnmount } from '../../lib/tts';
import { useLang, useT } from '../../i18n';

interface Props {
  lesson: ReadingLesson;
  onBack: () => void;
}

export function ReadingLessonView({ lesson, onBack }: Props) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
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
        explain: q.explain || q.explainEn ? pickText(q.explain, q.explainEn, lang) : undefined,
      })),
    [lesson, lang],
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
          {t.common.backToList}
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn-soft text-sm" onClick={() => setShowFuri((f) => !f)}>
            {showFuri ? t.reading.hideFurigana : t.reading.showFurigana}
          </button>
          <button type="button" className="btn-sky text-sm" onClick={() => speak(plain, { rate })}>
            {t.reading.readAll}
          </button>
          <button type="button" className="btn-soft text-sm" onClick={stopSpeaking} aria-label={t.reading.stopReading}>
            ⏹
          </button>
          <label className="flex items-center gap-1 text-xs text-muted">
            {t.common.speed}
            <input type="range" min={0.6} max={1.2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} aria-label={t.common.speedAria} />
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
          <button type="button" className="text-rose" onClick={() => speak(popover.word)} aria-label={t.reading.listenWord}>
            🔊
          </button>
          <div className="flex-1">
            <p className="text-xl font-black">
              {popover.word} <span className="text-base text-muted">{popover.reading}</span>
            </p>
            <p>{pickText(popover.vi, popover.en, lang)}</p>
          </div>
          <button type="button" className="btn-soft text-xs" onClick={() => setPopover(null)} aria-label={t.common.close}>
            ✕
          </button>
        </div>
      )}

      <details className="card p-4">
        <summary className="cursor-pointer font-bold">{t.reading.vocabInText(lesson.vocab.length)}</summary>
        <ul className="mt-2 grid gap-1 sm:grid-cols-2">
          {lesson.vocab.map((v) => (
            <li key={v.word} className="flex items-baseline gap-2 text-sm">
              <button type="button" className="text-rose" onClick={() => speak(v.word)} aria-label={t.reading.listenTo(v.word)}>
                🔊
              </button>
              <span className="font-bold">{v.word}</span>
              <span className="text-muted">{v.reading}</span>
              <span>{pickText(v.vi, v.en, lang)}</span>
            </li>
          ))}
        </ul>
      </details>

      {!quiz ? (
        <div className="flex justify-center">
          <button type="button" className="btn-primary" onClick={() => setQuiz(true)}>
            {t.reading.answerQuestions(lesson.questions.length)}
          </button>
        </div>
      ) : (
        <div className="card p-4">
          <QuizRunner key={lesson.id} questions={questions} kind="reading" type="reading" xpPerCorrect={3} onFinish={setResult} />
          {result && (
            <div className="mt-3 flex justify-center gap-2">
              <button type="button" className="btn-soft" onClick={onBack}>
                {t.common.otherLesson}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
