import { useState } from 'react';
import type { BusinessTopic } from '@nihongo/shared';
import { useJson } from '../../content/loader';
import { Segmented } from '../../components/Segmented';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { KeigoTable } from './KeigoTable';
import { PhraseList } from './PhraseList';
import { EmailTemplates } from './EmailTemplates';
import { BusinessQuiz } from './BusinessQuiz';
import { BusinessRoleplay } from './BusinessRoleplay';

type Mode = 'learn' | 'quiz' | 'roleplay';

export function BusinessPage() {
  const { data, error, loading } = useJson<BusinessTopic[]>('business/index.json');
  const [mode, setMode] = useState<Mode>('learn');
  const [topicId, setTopicId] = useState<string>('keigo');
  const topic = data?.find((t) => t.id === topicId) ?? data?.[0];

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
          <div className="flex flex-wrap gap-2">
            {data.map((t) => (
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
              {topic.id === 'keigo' && <KeigoTable items={topic.items} />}
              {topic.id === 'email' && <EmailTemplates items={topic.items} />}
              {topic.id !== 'keigo' && topic.id !== 'email' && <PhraseList items={topic.items} />}
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
