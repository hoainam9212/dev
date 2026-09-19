import { useEffect } from 'react';
import { useHelp, type HelpTab } from './helpStore';
import { GlossaryPanel } from './GlossaryPanel';
import { AskMochiPanel } from './AskMochiPanel';

const TABS: { id: HelpTab; label: string }[] = [
  { id: 'glossary', label: '📖 Từ điển' },
  { id: 'ask', label: '🐱 Hỏi Mèo' },
];

export function HelpDrawer() {
  const { open, tab, close, setTab } = useHelp();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20" onClick={close}>
      <aside
        role="dialog"
        aria-label="Trợ giúp"
        className="flex h-full w-[440px] max-w-full flex-col bg-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center gap-2 border-b border-peach/40 p-3">
          <div role="tablist" className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-4 py-1.5 font-bold ${tab === t.id ? 'bg-white shadow' : 'text-muted hover:text-text'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Đóng trợ giúp" onClick={close} className="ml-auto rounded-full px-3 py-1 text-xl hover:bg-white">
            ✕
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">{tab === 'glossary' ? <GlossaryPanel /> : <AskMochiPanel />}</div>
      </aside>
    </div>
  );
}
