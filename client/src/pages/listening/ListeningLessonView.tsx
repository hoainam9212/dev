import { useEffect, useMemo, useRef, useState } from 'react';
import type { ListeningLesson } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { TypingAnswer } from '../../components/TypingAnswer';
import { Segmented } from '../../components/Segmented';
import { Mascot } from '../../components/Mascot';
import { speak, speakSequence, stopSpeaking, canSpeak, type Sequence, useStopSpeechOnUnmount } from '../../lib/tts';
import { logSession } from '../../db';
import { useProgress } from '../../store/progress';
import { pickText } from '@nihongo/shared';
import { useLang, useT } from '../../i18n';

type Mode = 'listen' | 'questions' | 'dictation';
const XP_DICTATION = 2;

export function ListeningLessonView({ lesson, onBack }: { lesson: ListeningLesson; onBack: () => void }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [mode, setMode] = useState<Mode>('listen');
  const [rate, setRate] = useState(0.9);
  const [showScript, setShowScript] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const seq = useRef<Sequence | null>(null);

  useEffect(() => () => seq.current?.cancel(), []);

  const playAll = () => {
    seq.current?.cancel();
    const s = speakSequence(
      lesson.script.map((l) => l.ja),
      { rate, onLine: setPlaying },
    );
    seq.current = s;
    void s.done.then(() => setPlaying(null));
  };
  const stop = () => {
    seq.current?.cancel();
    stopSpeaking();
    setPlaying(null);
  };

  const questions = useMemo<QuizQuestion[]>(
    () => lesson.questions.map((q) => ({ prompt: <span className="text-xl">{q.prompt}</span>, promptClassName: 'text-xl', choices: q.choices, answer: q.answer })),
    [lesson],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button type="button" className="btn-soft text-sm" onClick={onBack}>
          {t.common.backToList}
        </button>
        <Segmented<Mode>
          ariaLabel={t.common.mode}
          value={mode}
          onChange={(m) => {
            stop();
            setMode(m);
          }}
          options={[
            { value: 'listen', label: t.listening.modes.listen },
            { value: 'questions', label: t.listening.modes.questions },
            { value: 'dictation', label: t.listening.modes.dictation },
          ]}
        />
      </div>
      <h2 className="text-2xl font-black">{lesson.title}</h2>
      {!canSpeak() && <p className="text-sm text-rose">{t.listening.noTts}</p>}

      {mode === 'listen' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="btn-primary" onClick={playAll}>
              {t.listening.playAll}
            </button>
            <button type="button" className="btn-soft" onClick={stop}>
              {t.listening.stop}
            </button>
            <label className="flex items-center gap-1 text-xs text-muted">
              {t.common.speed}
              <input type="range" min={0.6} max={1.2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} aria-label={t.common.speedAria} />
              {rate.toFixed(1)}
            </label>
            <button type="button" className="btn-sky text-sm" onClick={() => setShowScript((s) => !s)}>
              {showScript ? t.listening.hideScript : t.listening.showScript}
            </button>
          </div>
          <ol className="space-y-2">
            {lesson.script.map((line, i) => (
              <li key={i} className={`flex items-start gap-3 rounded-2xl p-3 ${playing === i ? 'bg-sakura/40' : 'bg-cream dark:bg-bg'}`}>
                <button type="button" className="text-rose" onClick={() => speak(line.ja, { rate })} aria-label={t.listening.listenLine(i + 1)}>
                  🔊
                </button>
                <div className="flex-1">
                  <p className="text-xs font-bold text-muted">{line.speaker}</p>
                  {showScript ? (
                    <>
                      <p className="text-lg font-bold">{line.ja}</p>
                      <p className="text-sm text-muted">{pickText(line.vi, line.en, lang)}</p>
                    </>
                  ) : (
                    <p className="text-lg tracking-widest text-muted">••••••</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {mode === 'questions' && (
        <div className="card p-4">
          <QuizRunner key={lesson.id} questions={questions} kind="listening" type="listening" xpPerCorrect={3} onFinish={() => {}} />
        </div>
      )}

      {mode === 'dictation' && <Dictation key={lesson.id} lesson={lesson} rate={rate} />}
    </div>
  );
}

function Dictation({ lesson, rate }: { lesson: ListeningLesson; rate: number }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const addXp = useProgress((s) => s.addXp);
  const startedAt = useRef(new Date().toISOString());
  const line = lesson.dictation[i];

  useEffect(() => {
    if (line) speak(line, { rate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  if (!line) {
    return (
      <div className="flex flex-col items-center gap-3 py-6" data-testid="dictation-result">
        <Mascot mood={correct === lesson.dictation.length ? 'happy' : 'neutral'} size={120} />
        <p className="text-xl font-black text-rose">
          {t.listening.dictationScore(correct, lesson.dictation.length)}
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setI(0);
            setCorrect(0);
          }}
        >
          {t.common.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-bold text-muted">
        {t.common.sentenceOf(i + 1, lesson.dictation.length)}
      </p>
      <button type="button" className="btn-sky" onClick={() => speak(line, { rate })}>
        {t.common.listenAgain}
      </button>
      <p className="text-xs text-muted">{t.listening.dictationHint}</p>
      <TypingAnswer
        key={i}
        expected={line}
        placeholder={t.listening.dictationPlaceholder}
        onResult={(ok) => {
          const c = ok ? correct + 1 : correct;
          if (ok) addXp(XP_DICTATION);
          setCorrect(c);
          const n = i + 1;
          setI(n);
          if (n >= lesson.dictation.length) {
            void logSession({ startedAt: startedAt.current, kind: 'dictation', type: 'listening', correct: c, total: lesson.dictation.length, xp: c * XP_DICTATION });
          }
        }}
      />
    </div>
  );
}
