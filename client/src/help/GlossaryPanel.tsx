import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchItems, unlockState, type GlossaryEntry, type Lesson } from '@office-neko/shared';
import { GLOSSARY, LESSONS, TRACKS } from '../content';
import { useOs, useProfileId, useTestedOut, useUnlockAll } from '../db/profile';
import { useCompleted } from '../progress/useStats';
import { useHelp } from './helpStore';
import { RichText } from './RichText';

function GlossaryDetail({ entry, onBack }: { entry: GlossaryEntry; onBack: () => void }) {
  const close = useHelp((s) => s.close);
  const os = useOs();
  const { completed } = useCompleted(useProfileId());
  const unlockAll = useUnlockAll();
  const testedOut = useTestedOut();
  const unlocked = unlockState(TRACKS, LESSONS, os, completed, unlockAll, testedOut).lessonUnlocked;
  const lessons = entry.lessonIds
    .map((id) => LESSONS[id])
    .filter((l): l is Lesson => !!l && (!l.os || l.os === os));
  return (
    <article className="space-y-3">
      <button type="button" className="btn !px-3 !py-1 text-sm" onClick={onBack}>← Quay lại</button>
      <h2 className="text-2xl font-extrabold">{entry.term}</h2>
      <p className="text-muted">Cách đọc: /{entry.say}/</p>
      <p className="text-lg font-bold text-rose-ink">{entry.vi}</p>
      <RichText text={entry.explain} />
      {entry.image && <img src={`/img/glossary/${entry.image}`} alt={entry.term} className="max-h-48 rounded-2xl" />}
      {lessons.length > 0 && (
        <div>
          <h3 className="font-bold">Có trong bài:</h3>
          <ul className="list-disc pl-6">
            {lessons.map((l) => (
              <li key={l.id}>
                {unlocked.has(l.id) ? (
                  <Link to={`/lesson/${l.id}`} onClick={close} className="text-rose-ink underline">{l.title}</Link>
                ) : (
                  <span className="text-muted">🔒 {l.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export function GlossaryPanel() {
  const os = useOs();
  const { entryId, setEntry, openAsk } = useHelp();
  const [q, setQ] = useState('');
  const entries = useMemo(() => GLOSSARY.filter((e) => !e.os || e.os === os), [os]);
  const detail = entryId ? GLOSSARY.find((e) => e.id === entryId) : undefined;
  if (detail) return <GlossaryDetail entry={detail} onBack={() => setEntry(null)} />;
  const list = q.trim()
    ? searchItems(entries, q, (e) => [e.term, e.vi, e.explain]).map((h) => h.item)
    : [...entries].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <div className="space-y-3">
      <input
        type="search"
        aria-label="Tìm thuật ngữ"
        placeholder="Gõ từ cần tra, có dấu hay không đều được…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
        className="w-full rounded-full border-2 border-peach/60 bg-white px-4 py-2 outline-none focus:border-rose"
      />
      {list.length === 0 ? (
        <p className="text-muted">
          Chưa có từ này trong Từ điển. Thử{' '}
          <button type="button" className="font-bold text-rose-ink underline" onClick={() => openAsk(q)}>Hỏi Mèo</button> nhé!
        </p>
      ) : (
        <ul className="space-y-2">
          {list.map((e) => (
            <li key={e.id}>
              <button type="button" onClick={() => setEntry(e.id)} className="card w-full p-3 text-left hover:ring-2 hover:ring-peach">
                <span className="font-extrabold">{e.term}</span> <span className="text-muted">— {e.vi}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
