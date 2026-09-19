import { useMemo } from 'react';
import { searchItems } from '@office-neko/shared';
import { FAQ, GLOSSARY } from '../content';
import { useOs } from '../db/profile';
import { Mochi } from '../components/Mochi';
import { SpeechBubble } from '../components/SpeechBubble';
import { useHelp } from './helpStore';
import { RichText } from './RichText';

export function AskMochiPanel() {
  const os = useOs();
  const { query, setQuery, openGlossary } = useHelp();
  const faqs = useMemo(() => FAQ.filter((f) => !f.os || f.os === os), [os]);
  const terms = useMemo(() => GLOSSARY.filter((e) => !e.os || e.os === os), [os]);
  const q = query.trim();
  const opts = { stopwords: true, minMatch: 0.5 };
  const faqHits = q ? searchItems(faqs, q, (f) => [f.q, f.keywords.join(' ')], { ...opts, limit: 5 }).map((h) => h.item) : [];
  const termHits = q ? searchItems(terms, q, (e) => [e.term, e.vi], { ...opts, limit: 3 }).map((h) => h.item) : [];
  const nothing = q && faqHits.length === 0 && termHits.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Mochi mood={nothing ? 'sad' : 'happy'} size={64} animated={false} />
        <SpeechBubble>
          {nothing
            ? 'Mochi chưa biết câu này 😿. Bạn thử hỏi bằng từ khác, ví dụ “copy”, “lưu file”, “phím tắt” nhé.'
            : 'Bạn muốn hỏi gì nào? Gõ câu hỏi bằng lời của bạn, có dấu hay không đều được.'}
        </SpeechBubble>
      </div>
      <input
        type="search"
        aria-label="Câu hỏi của bạn"
        placeholder="Ví dụ: làm sao lấy lại chữ vừa xoá?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
        className="w-full rounded-full border-2 border-peach/60 bg-white px-4 py-2 outline-none focus:border-rose"
      />
      {!q && (
        <div>
          <h3 className="mb-2 font-bold">Câu hỏi hay gặp</h3>
          <ul className="space-y-2">
            {faqs.slice(0, 5).map((f) => (
              <li key={f.id}>
                <button type="button" onClick={() => setQuery(f.q)} className="w-full rounded-2xl bg-white px-3 py-2 text-left hover:ring-2 hover:ring-peach">
                  {f.q}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {faqHits.map((f) => (
        <section key={f.id} className="card space-y-2 p-4">
          <h3 className="font-extrabold">{f.q}</h3>
          <RichText text={f.a} />
        </section>
      ))}
      {termHits.length > 0 && (
        <div>
          <h3 className="mb-2 font-bold">Từ liên quan</h3>
          <div className="flex flex-wrap gap-2">
            {termHits.map((e) => (
              <button key={e.id} type="button" onClick={() => openGlossary(e.id)} className="rounded-full bg-lavender/40 px-3 py-1 font-semibold">
                {e.term} — {e.vi}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
