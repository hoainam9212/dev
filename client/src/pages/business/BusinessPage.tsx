import { useEffect, useState } from 'react';
import { topicKind, type BusinessGroup, type BusinessScenario, type BusinessTopic } from '@nihongo/shared';
import { useJson } from '../../content/loader';
import { Segmented } from '../../components/Segmented';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { KeigoTable } from './KeigoTable';
import { PhraseList } from './PhraseList';
import { EmailTemplates } from './EmailTemplates';
import { GlossaryList } from './GlossaryList';
import { RephraseList } from './RephraseList';
import { ScenarioList, ScenarioView } from './ScenarioView';
import { BusinessQuiz } from './BusinessQuiz';
import { BusinessRoleplay } from './BusinessRoleplay';

type Mode = 'learn' | 'quiz' | 'roleplay';

const GROUPS: { value: BusinessGroup; label: string }[] = [
  { value: 'it', label: '💻 IT & BrSE' },
  { value: 'basic', label: '🏢 Cơ bản' },
];

export const groupOf = (t: BusinessTopic): BusinessGroup => t.group ?? 'basic';

function TopicBody({ topic }: { topic: BusinessTopic }) {
  const [scenario, setScenario] = useState<BusinessScenario | null>(null);
  useEffect(() => setScenario(null), [topic.id]);
  switch (topicKind(topic)) {
    case 'keigo':
      return <KeigoTable items={topic.items} />;
    case 'email':
      return <EmailTemplates items={topic.items} />;
    case 'glossary':
      return <GlossaryList items={topic.items} />;
    case 'rephrase':
      return <RephraseList items={topic.items} />;
    case 'scenarios':
      return scenario ? (
        <ScenarioView scenario={scenario} onBack={() => setScenario(null)} />
      ) : (
        <ScenarioList scenarios={topic.scenarios ?? []} onPick={setScenario} />
      );
    default:
      return <PhraseList items={topic.items} />;
  }
}

export function BusinessPage() {
  const { data, error, loading } = useJson<BusinessTopic[]>('business/index.json');
  const [mode, setMode] = useState<Mode>('learn');
  const [group, setGroup] = useState<BusinessGroup>('it');
  const [topicId, setTopicId] = useState<string | null>(null);

  const hasIt = !!data?.some((t) => groupOf(t) === 'it');
  const activeGroup: BusinessGroup = hasIt ? group : 'basic';
  const topics = data?.filter((t) => groupOf(t) === activeGroup) ?? [];
  const topic = topics.find((t) => t.id === topicId) ?? topics[0];

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">Tiếng Nhật business</h1>
        <Segmented<Mode>
          ariaLabel="Chế độ"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'learn', label: 'Học' },
            { value: 'quiz', label: 'Trắc nghiệm' },
            { value: 'roleplay', label: 'Đóng vai' },
          ]}
        />
      </header>
      {loading && <LoadingCat />}
      {error && <ErrorCat text={error} />}
      {data && mode === 'learn' && (
        <>
          {hasIt && (
            <Segmented<BusinessGroup>
              ariaLabel="Nhóm chủ đề"
              value={activeGroup}
              onChange={(g) => {
                setGroup(g);
                setTopicId(null);
              }}
              options={GROUPS}
            />
          )}
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTopicId(t.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${topic?.id === t.id ? 'bg-rose text-white shadow' : 'bg-sakura/30 hover:bg-sakura/50'}`}
              >
                {t.title}
              </button>
            ))}
          </div>
          {topic && (
            <section className="card space-y-4 p-4 md:p-6">
              <h2 className="text-xl font-black">{topic.title}</h2>
              <p className="text-sm text-muted">{topic.intro}</p>
              <TopicBody topic={topic} />
            </section>
          )}
        </>
      )}
      {data && mode === 'quiz' && (
        <section className="card p-4 md:p-6">
          <BusinessQuiz topics={data} />
        </section>
      )}
      {data && mode === 'roleplay' && (
        <section className="card p-4 md:p-6">
          <BusinessRoleplay topics={data} />
        </section>
      )}
    </div>
  );
}
