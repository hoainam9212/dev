import { useState } from 'react';
import type { KanaChar } from '@nihongo/shared';
import { useKana } from '../../content/loader';
import { Segmented } from '../../components/Segmented';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { KanaChart } from './KanaChart';
import { KanaQuiz, type KanaQuizMode } from './KanaQuiz';
import { KanaWrite } from './KanaWrite';
import { useT } from '../../i18n';

type Script = 'hiragana' | 'katakana';
type Group = 'basic' | 'dakuten' | 'yoon' | 'all';
type Tab = 'chart' | 'quiz' | 'write';

export function KanaPage() {
  const t = useT();
  const { data, error, loading } = useKana();
  const [script, setScript] = useState<Script>('hiragana');
  const [group, setGroup] = useState<Group>('basic');
  const [tab, setTab] = useState<Tab>('chart');
  const [mode, setMode] = useState<KanaQuizMode>('kana→romaji');
  const [quizKey, setQuizKey] = useState(0);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);

  if (loading) return <LoadingCat />;
  if (error || !data) return <ErrorCat text={error ?? t.kana.noData} />;

  const all: KanaChar[] = data[script];
  const chars = group === 'all' ? all : all.filter((c) => c.group === group);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">Kana</h1>
        <Segmented
          ariaLabel={t.kana.script}
          value={script}
          onChange={setScript}
          options={[
            { value: 'hiragana', label: 'Hiragana' },
            { value: 'katakana', label: 'Katakana' },
          ]}
        />
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <Segmented
          ariaLabel={t.common.mode}
          value={tab}
          onChange={(t) => {
            setTab(t);
            setResult(null);
            setQuizKey((k) => k + 1);
          }}
          options={[
            { value: 'chart', label: t.kana.tabs.chart },
            { value: 'quiz', label: t.kana.tabs.quiz },
            { value: 'write', label: t.kana.tabs.write },
          ]}
        />
        <Segmented
          ariaLabel={t.kana.group}
          value={group}
          onChange={(g) => {
            setGroup(g);
            setResult(null);
            setQuizKey((k) => k + 1);
          }}
          options={[
            { value: 'basic', label: t.kana.groups.basic },
            { value: 'dakuten', label: t.kana.groups.dakuten },
            { value: 'yoon', label: t.kana.groups.yoon },
            { value: 'all', label: t.kana.groups.all },
          ]}
        />
      </div>

      <section className="card p-4 md:p-6">
        {tab === 'chart' && <KanaChart chars={chars} />}
        {tab === 'write' && <KanaWrite chars={chars} />}
        {tab === 'quiz' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Segmented
                ariaLabel={t.common.questionType}
                value={mode}
                onChange={(m) => {
                  setMode(m);
                  setResult(null);
                  setQuizKey((k) => k + 1);
                }}
                options={[
                  { value: 'kana→romaji', label: 'Kana → Romaji' },
                  { value: 'romaji→kana', label: 'Romaji → Kana' },
                ]}
              />
            </div>
            <KanaQuiz key={quizKey} chars={chars} mode={mode} onFinish={setResult} />
            {result && (
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setResult(null);
                    setQuizKey((k) => k + 1);
                  }}
                >
                  {t.common.retry}
                </button>
                <button type="button" className="btn-soft" onClick={() => setTab('chart')}>
                  {t.kana.backToChart}
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
