import { useState } from 'react';
import { Link } from 'react-router-dom';
import { placementPassed } from '@office-neko/shared';
import { TRACKS } from '../content';
import { PLACEMENT_QUIZ, PLACEMENT_TRACKS, TYPING_PLACEMENT, type PlacementTrackId } from '../content/placement';
import { useProfileId, useTestedOut } from '../db/profile';
import { markTestedOut } from '../progress/placement';
import { QuizView } from '../player/QuizView';
import { InlineText, RichText } from '../help/RichText';
import { Mochi } from '../components/Mochi';

/** Tên ngắn dùng trong lời báo "Đã mở khoá lộ trình …!". */
export const PLACEMENT_NAMES: Record<(typeof PLACEMENT_TRACKS)[number], string> = {
  basics: 'Làm quen máy tính',
  typing: 'Gõ phím 10 ngón',
  word: 'Word',
  excel: 'Excel',
  ppt: 'PowerPoint',
};

const noop = () => undefined;

function Exam({ trackId, onExit }: { trackId: PlacementTrackId; onExit: () => void }) {
  const profileId = useProfileId();
  const quiz = PLACEMENT_QUIZ[trackId];
  const [answers, setAnswers] = useState<number[]>([]);
  const [attempt, setAttempt] = useState(0);
  const finished = answers.length === quiz.length;
  const passed = finished && placementPassed(answers, quiz);
  const right = quiz.filter((q, i) => answers[i] === q.answer).length;

  const choose = (choice: number) => {
    const next = [...answers, choice];
    setAnswers(next);
    if (next.length === quiz.length && placementPassed(next, quiz) && profileId) {
      void markTestedOut(profileId, trackId).catch(() => undefined);
    }
  };

  if (!finished) {
    const i = answers.length;
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button type="button" className="btn" onClick={onExit}>← Các bài kiểm tra</button>
          <span className="font-bold text-muted">Câu {i + 1}/{quiz.length}</span>
        </div>
        <QuizView key={`${attempt}-${i}`} step={quiz[i]!} done={false} onPick={noop} onNext={noop} onChoose={choose} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="card flex flex-wrap items-center gap-4 p-5">
        <Mochi mood={passed ? 'happy' : 'neutral'} size={90} />
        <div className="min-w-48 flex-1 space-y-1">
          {passed ? (
            <>
              <h2 className="text-xl font-extrabold">Đã mở khoá lộ trình {PLACEMENT_NAMES[trackId]}!</h2>
              <p className="text-muted">Bạn đúng {right}/{quiz.length}. Mọi bài của lộ trình này đã mở, học bài nào cũng được.</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-extrabold">Chưa mở khoá lần này</h2>
              <p className="text-muted">Bạn đúng {right}/{quiz.length}. Học từ đầu sẽ chắc hơn — hoặc thử lại lúc khác.</p>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {!passed && (
            <button type="button" className="btn" onClick={() => { setAnswers([]); setAttempt((a) => a + 1); }}>Thử lại</button>
          )}
          <Link to="/" className="btn-primary">Về trang chủ</Link>
        </div>
      </section>
      <ol className="space-y-3">
        {quiz.map((q, i) => {
          const ok = answers[i] === q.answer;
          return (
            <li key={i} className="card space-y-2 p-4">
              <RichText text={`${ok ? '✅' : '❌'} ${q.question}`} className="font-bold" />
              {!ok && <p>Bạn chọn: <InlineText text={q.choices[answers[i]!] ?? ''} /></p>}
              <p>Đáp án: <strong><InlineText text={q.choices[q.answer]!} /></strong></p>
              <RichText text={q.why} className="text-muted" />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function PlacementPage() {
  const testedOut = useTestedOut();
  const [trackId, setTrackId] = useState<PlacementTrackId | null>(null);

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 pb-24">
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/" className="btn">← Trang chủ</Link>
        <h1 className="text-2xl font-extrabold">Kiểm tra đầu vào</h1>
      </div>
      {trackId ? (
        <Exam trackId={trackId} onExit={() => setTrackId(null)} />
      ) : (
        <>
          <p className="text-muted">
            Đã biết dùng phần nào rồi? Làm bài kiểm tra ngắn của phần đó: đạt thì mở khoá cả lộ trình, trượt cũng không mất gì.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PLACEMENT_TRACKS.map((id) => {
              const t = TRACKS.find((x) => x.id === id)!;
              const name = PLACEMENT_NAMES[id];
              return (
                <li key={id} className="card flex flex-col gap-2 p-4" style={{ borderTop: `6px solid ${t.color}` }}>
                  <h2 className="text-lg font-extrabold">{t.emoji} {t.title}</h2>
                  <p className="text-sm text-muted">
                    {id === 'typing'
                      ? `Gõ 1 phút, cần ít nhất ${TYPING_PLACEMENT.minWpm} WPM và ${TYPING_PLACEMENT.minAccuracy}% chính xác.`
                      : `6 câu hỏi, đúng từ 5 câu là đạt.`}
                  </p>
                  {testedOut.has(id) && <p className="font-bold text-excel">Đã mở khoá ✓</p>}
                  <div className="mt-auto">
                    {id === 'typing' ? (
                      <Link to="/typing/test/1?placement=1" className="btn-primary">⌨️ Kiểm tra tốc độ 1 phút</Link>
                    ) : (
                      <button type="button" className="btn-primary" aria-label={`Làm bài kiểm tra ${name}`} onClick={() => setTrackId(id)}>
                        {testedOut.has(id) ? 'Làm lại' : 'Làm bài kiểm tra'}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
