import { useState } from 'react';
import { BJT_PARTS, BJT_SECTIONS, bjtEstimate, type BjtBundle, type BjtItem, type BjtSection } from '@nihongo/shared';
import { useJson } from '../../content/loader';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { speak } from '../../lib/tts';
import { useBjt } from '../../store/bjt';
import { useT } from '../../i18n';
import { BjtRunner } from './BjtRunner';
import { currentWeek, examOrder, examSeconds, pickPractice, questionCount, weekSet } from './bjt';

type Tab = 'plan' | 'sections' | 'vocab' | 'mock';
interface Run {
  title: string;
  items: BjtItem[];
  exam?: boolean;
  setId?: string;
}

const PRACTICE_SIZE = 10;
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function tally(items: BjtItem[], answers: Record<string, boolean>) {
  const ids = items.flatMap((x) => x.questions.map((q) => q.id));
  const answered = ids.filter((id) => id in answers);
  return { total: ids.length, answered: answered.length, correct: answered.filter((id) => answers[id]).length };
}

export function BjtPage() {
  const t = useT();
  const { data, error, loading } = useJson<BjtBundle>('bjt/index.json');
  const [tab, setTab] = useState<Tab>('plan');
  const [run, setRun] = useState<Run | null>(null);
  const [vocabWeek, setVocabWeek] = useState(1);
  const [openGuide, setOpenGuide] = useState<BjtSection | null>(null);
  const answers = useBjt((s) => s.answers);
  const runs = useBjt((s) => s.runs);
  const startDate = useBjt((s) => s.startDate);
  const setStartDate = useBjt((s) => s.setStartDate);

  if (run) {
    return (
      <section className="card p-4 md:p-6">
        <BjtRunner key={`${run.title}-${run.exam}`} {...run} onExit={() => setRun(null)} />
      </section>
    );
  }

  const bySet = (set: string) => examOrder(data?.items.filter((x) => x.set === set) ?? []);
  const now = currentWeek(startDate);
  const demo = bySet('demo');

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-rose">{t.bjt.title}</h1>
          <p className="text-sm text-muted">{t.bjt.subtitle}</p>
        </div>
        {/* four tabs do not fit the shared Segmented on a phone: equal columns, tighter padding */}
        <div className="grid w-full grid-cols-4 rounded-full bg-sakura/30 p-1 sm:w-auto" role="tablist" aria-label={t.common.mode}>
          {(['plan', 'sections', 'vocab', 'mock'] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={tab === v}
              onClick={() => setTab(v)}
              className={`rounded-full px-1 py-1.5 text-sm font-bold whitespace-nowrap transition sm:px-4 ${
                tab === v ? 'bg-rose text-white shadow' : 'text-text hover:bg-sakura/50'
              }`}
            >
              {t.bjt.tabs[v]}
            </button>
          ))}
        </div>
      </header>

      {loading && <LoadingCat />}
      {error && <ErrorCat text={error} />}

      {data && tab === 'plan' && (
        <div className="space-y-3">
          <section className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-black">{t.bjt.demoTitle}</p>
              <p className="text-sm text-muted">{t.bjt.demoDesc}</p>
            </div>
            <button type="button" className="btn-primary" onClick={() => setRun({ title: t.bjt.demoTitle, items: demo })}>
              {t.bjt.tryDemo}
            </button>
          </section>
          <section className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <p className="text-sm text-muted">{startDate ? t.bjt.planStarted(startDate) : t.bjt.planIntro}</p>
            <button type="button" className="btn-soft text-sm" onClick={() => setStartDate(today())}>
              {startDate ? t.bjt.resetPlan : t.bjt.startPlan}
            </button>
          </section>
          {data.weeks.map((w) => {
            const items = bySet(weekSet(w.week));
            const done = tally(items, answers);
            const words = data.vocab.filter((v) => v.week === w.week).length;
            return (
              <section key={w.week} className={`card space-y-2 p-4 ${now === w.week ? 'ring-2 ring-rose' : ''}`} data-testid={`bjt-week-${w.week}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-sakura/40 px-3 py-0.5 text-xs font-black">{t.bjt.week(w.week)}</span>
                  {now === w.week && <span className="rounded-full bg-rose px-3 py-0.5 text-xs font-black text-white">{t.bjt.thisWeek}</span>}
                  {w.focus.map((f) => (
                    <span key={f} className="text-xs font-bold text-muted">
                      {BJT_SECTIONS.find((s) => s.id === f)!.ja}
                    </span>
                  ))}
                </div>
                <p className="text-lg font-black">{w.title}</p>
                <p className="text-sm text-muted">{w.goal}</p>
                <ul className="list-disc space-y-0.5 pl-5 text-sm">
                  {w.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {items.length > 0 ? (
                    <>
                      <button type="button" className="btn-primary text-sm" onClick={() => setRun({ title: t.bjt.week(w.week), items })}>
                        {t.bjt.practiceWeek(done.total)}
                      </button>
                      <span className="text-xs text-muted">{t.bjt.done(done.correct, done.answered, done.total)}</span>
                    </>
                  ) : (
                    !w.mock && <span className="text-xs text-muted">{t.bjt.noContent}</span>
                  )}
                  {words > 0 && (
                    <button
                      type="button"
                      className="btn-soft text-sm"
                      onClick={() => {
                        setVocabWeek(w.week);
                        setTab('vocab');
                      }}
                    >
                      {t.bjt.weekVocab(words)}
                    </button>
                  )}
                  {w.mock && (
                    <button type="button" className="btn-sky text-sm" onClick={() => setTab('mock')}>
                      {t.bjt.takeMock}
                    </button>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {data && tab === 'sections' && (
        <div className="space-y-3">
          {BJT_PARTS.map((part) => (
            <section key={part.id} className="card space-y-3 p-4">
              <p className="font-black text-rose">
                {part.ja} <span className="text-sm font-normal text-muted">· {t.bjt.parts[part.id]}</span>
              </p>
              {BJT_SECTIONS.filter((s) => s.part === part.id).map((s) => {
                const items = data.items.filter((x) => x.section === s.id && !x.set.startsWith('mock'));
                const done = tally(items, answers);
                const guide = data.guides.find((g) => g.section === s.id);
                const round = pickPractice(items, answers, PRACTICE_SIZE);
                const open = openGuide === s.id;
                return (
                  <div key={s.id} className="space-y-2 rounded-2xl bg-cream p-3 dark:bg-bg" data-testid={`bjt-section-${s.id}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-lg font-black">{s.ja}</p>
                        <p className="text-xs text-muted">
                          {t.bjt.realCount(s.count)} · {t.bjt.pool(done.total)} ·{' '}
                          {done.answered ? t.bjt.accuracy(Math.round((done.correct / done.answered) * 100)) : t.bjt.notTried}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" className="btn-soft text-sm" aria-expanded={open} onClick={() => setOpenGuide(open ? null : s.id)}>
                          {open ? t.bjt.hideGuide : t.bjt.showGuide}
                        </button>
                        <button type="button" className="btn-primary text-sm" disabled={!round.length} onClick={() => setRun({ title: s.ja, items: round })}>
                          {t.bjt.practiceN(questionCount(round))}
                        </button>
                      </div>
                    </div>
                    {open && guide && (
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-xs font-bold text-muted">{t.bjt.guideWhat}</p>
                          <p>{guide.what}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted">{t.bjt.guideHow}</p>
                          <ul className="list-disc pl-5">
                            {guide.how.map((h) => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted">{t.bjt.guideTraps}</p>
                          <ul className="list-disc pl-5">
                            {guide.traps.map((h) => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      )}

      {data && tab === 'vocab' && (
        <section className="card space-y-3 p-4">
          <select
            className="w-full min-w-0 rounded-xl bg-bg px-3 py-2 text-sm font-bold"
            aria-label={t.bjt.tabs.plan}
            value={vocabWeek}
            onChange={(e) => setVocabWeek(Number(e.target.value))}
          >
            {data.weeks.map((w) => (
              <option key={w.week} value={w.week}>
                {t.bjt.week(w.week)} · {w.title}
              </option>
            ))}
          </select>
          {data.vocab.filter((v) => v.week === vocabWeek).length === 0 && <p className="text-sm text-muted">{t.bjt.vocabEmpty}</p>}
          <ul className="space-y-2">
            {data.vocab
              .filter((v) => v.week === vocabWeek)
              .map((v) => (
                <li key={v.id} className="flex items-start gap-3 rounded-2xl bg-cream p-3 dark:bg-bg">
                  <button type="button" className="text-rose" onClick={() => speak(v.ja)} aria-label={t.common.listenTo(v.ja)}>
                    🔊
                  </button>
                  <div className="min-w-0 flex-1">
                    <p>
                      <span className="text-lg font-black">{v.ja}</span>
                      <span className="ml-2 text-sm text-muted">{v.reading}</span>
                      <span className="ml-2 rounded-full bg-sakura/40 px-2 text-xs">{v.tag}</span>
                    </p>
                    <p>{v.vi}</p>
                    {v.example && (
                      <p className="mt-1 text-sm text-muted">
                        {v.example.ja}
                        <br />
                        {v.example.vi}
                      </p>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </section>
      )}

      {data && tab === 'mock' && (
        <div className="space-y-3">
          <p className="text-sm text-muted">{t.bjt.mockRules}</p>
          {[
            { set: 'demo', title: t.bjt.timedDemo },
            ...[1, 2, 3].map((n) => ({ set: `mock${n}`, title: t.bjt.mockTitle(n) })),
          ].map(({ set, title }) => {
            const items = bySet(set);
            const last = runs[set]?.at(-1);
            const est = last && bjtEstimate(last.correct, last.total);
            return (
              <section key={set} className="card flex flex-wrap items-center justify-between gap-3 p-4" data-testid={`bjt-mock-${set}`}>
                <div>
                  <p className="font-black">{title}</p>
                  <p className="text-sm text-muted">
                    {items.length ? t.bjt.mockDesc(questionCount(items), Math.round(examSeconds(items) / 60)) : t.bjt.mockSoon}
                  </p>
                  {est && <p className="text-sm font-bold text-emerald-600">{t.bjt.lastScore(est.score, est.level)}</p>}
                </div>
                <button type="button" className="btn-primary" disabled={!items.length} onClick={() => setRun({ title, items, exam: true, setId: set })}>
                  {t.bjt.startMock}
                </button>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
