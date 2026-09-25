import { useRef, useState } from 'react';
import { useTheme, type Theme } from '../app/useTheme';
import { useSettings } from '../store/settings';
import { useProgress } from '../store/progress';
import { db } from '../db/db';
import { exportAll, importAll } from '../db/srs';
import { speak } from '../lib/tts';
import { AccountCard } from '../components/AccountCard';
import { LangSwitch } from '../components/LangSwitch';
import { useT } from '../i18n';

const THEMES: Theme[] = ['light', 'dark', 'system'];

/** Result of the last backup action; translated at render. */
type Msg = { kind: 'exported' | 'invalid' | 'reset' } | { kind: 'imported'; cards: number; writings: number };

const SOURCES = [
  { name: 'JLPT word list (elzup)', url: 'https://github.com/elzup/jlpt-word-list', license: 'MIT / CC BY' },
  { name: 'kanji-data (davidluzgouveia) · KANJIDIC2', url: 'https://github.com/davidluzgouveia/kanji-data', license: 'MIT / CC BY-SA' },
  { name: 'KanjiVG', url: 'https://kanjivg.tagaini.net', license: 'CC BY-SA 3.0' },
  { name: 'Hanabira grammar', url: 'https://hanabira.org', license: 'Creative Commons' },
  { name: 'Tatoeba', url: 'https://tatoeba.org', license: 'CC BY 2.0 FR' },
];

export function SettingsPage() {
  const t = useT();
  const { theme, setTheme } = useTheme();
  const { ttsRate, newLimit, petals, setTtsRate, setNewLimit, setPetals } = useSettings();
  const [msg, setMsg] = useState<Msg | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const doExport = async () => {
    const data = await exportAll();
    const local = useProgress.getState();
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), xp: local.xp, streak: local.streak, lastStudyDay: local.lastStudyDay, ...data }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nihongo-sensei-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg({ kind: 'exported' });
  };

  const doImport = async (file: File) => {
    try {
      const json = JSON.parse(await file.text()) as {
        progress?: never[];
        sessions?: never[];
        writings?: never[];
        xp?: number;
        streak?: number;
        lastStudyDay?: string | null;
      };
      await importAll({ progress: json.progress ?? [], sessions: json.sessions ?? [], writings: json.writings ?? [] });
      if (typeof json.xp === 'number') {
        const cur = useProgress.getState();
        useProgress.setState({ xp: Math.max(cur.xp, json.xp), streak: Math.max(cur.streak, json.streak ?? 0), lastStudyDay: json.lastStudyDay ?? cur.lastStudyDay });
      }
      setMsg({ kind: 'imported', cards: json.progress?.length ?? 0, writings: json.writings?.length ?? 0 });
    } catch {
      setMsg({ kind: 'invalid' });
    }
  };

  const doReset = async () => {
    await db.progress.clear();
    await db.sessions.clear();
    await db.writings.clear();
    useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
    setConfirmReset(false);
    setMsg({ kind: 'reset' });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-rose">{t.settings.title}</h1>
      {msg && (
        <p className="rounded-2xl bg-sky/40 px-4 py-2 text-sm font-bold" role="status">
          {msg.kind === 'imported' ? t.settings.imported(msg.cards, msg.writings) : msg.kind === 'exported' ? t.settings.exported : msg.kind === 'invalid' ? t.settings.invalidFile : t.settings.resetDone}
        </p>
      )}

      <AccountCard />

      <section className="card space-y-3 p-4 md:p-6">
        <h2 className="font-black">{t.settings.appearance}</h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold">{t.settings.language}</span>
          <LangSwitch />
        </div>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((th) => (
            <button key={th} type="button" onClick={() => setTheme(th)} className={theme === th ? 'btn-primary' : 'btn-soft'}>
              {t.settings.themes[th]}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={petals} onChange={(e) => setPetals(e.target.checked)} />
          {t.settings.petals}
        </label>
      </section>

      <section className="card space-y-3 p-4 md:p-6">
        <h2 className="font-black">{t.settings.voice}</h2>
        <label className="flex items-center gap-3 text-sm">
          {t.settings.defaultRate}
          <input type="range" min={0.6} max={1.2} step={0.1} value={ttsRate} onChange={(e) => setTtsRate(Number(e.target.value))} aria-label={t.settings.rateAria} />
          <span className="font-bold">{ttsRate.toFixed(1)}</span>
          <button type="button" className="btn-sky text-sm" onClick={() => speak('こんにちは。さくらです。')}>
            {t.settings.tryVoice}
          </button>
        </label>
        <label className="flex items-center gap-3 text-sm">
          {t.settings.newPerSession}
          <input
            type="number"
            min={5}
            max={50}
            value={newLimit}
            onChange={(e) => setNewLimit(Number(e.target.value))}
            aria-label={t.settings.newPerSession}
            className="w-20 rounded-full bg-cream px-3 py-1 text-center font-bold ring-2 ring-sakura/50 dark:bg-bg"
          />
        </label>
      </section>

      <section className="card space-y-3 p-4 md:p-6">
        <h2 className="font-black">{t.settings.backup}</h2>
        <p className="text-sm text-muted">
          {t.settings.backupHint}
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={() => void doExport()}>
            {t.settings.exportFile}
          </button>
          <button type="button" className="btn-soft" onClick={() => fileRef.current?.click()}>
            {t.settings.importFile}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            aria-label={t.settings.chooseFile}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void doImport(f);
              e.target.value = '';
            }}
          />
        </div>
        {!confirmReset ? (
          <button type="button" className="text-sm text-rose underline" onClick={() => setConfirmReset(true)}>
            {t.settings.resetAll}
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-rose">{t.settings.confirmReset}</span>
            <button type="button" className="btn-primary text-sm" onClick={() => void doReset()}>
              {t.settings.delete}
            </button>
            <button type="button" className="btn-soft text-sm" onClick={() => setConfirmReset(false)}>
              {t.settings.cancel}
            </button>
          </div>
        )}
      </section>

      <section className="card space-y-2 p-4 md:p-6">
        <h2 className="font-black">{t.settings.sources}</h2>
        <ul className="text-sm">
          {SOURCES.map((s) => (
            <li key={s.url} className="flex flex-wrap justify-between gap-2 py-1">
              <a href={s.url} target="_blank" rel="noreferrer" className="font-bold text-rose underline">
                {s.name}
              </a>
              <span className="text-muted">{s.license}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted">{t.settings.authored}</p>
      </section>
    </div>
  );
}
