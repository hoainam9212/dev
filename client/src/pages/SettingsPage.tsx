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

const THEMES: { value: Theme; label: string }[] = [
  { value: 'light', label: '☀️ Sáng' },
  { value: 'dark', label: '🌙 Tối' },
  { value: 'system', label: '🖥️ Theo hệ thống' },
];

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
  const [msg, setMsg] = useState<string | null>(null);
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
    setMsg('Đã xuất file sao lưu.');
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
      setMsg(`Đã nhập ${json.progress?.length ?? 0} thẻ tiến độ và ${json.writings?.length ?? 0} câu đã đặt.`);
    } catch {
      setMsg('File không hợp lệ.');
    }
  };

  const doReset = async () => {
    await db.progress.clear();
    await db.sessions.clear();
    await db.writings.clear();
    useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
    setConfirmReset(false);
    setMsg('Đã xóa toàn bộ tiến độ.');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-rose">Cài đặt</h1>
      {msg && (
        <p className="rounded-2xl bg-sky/40 px-4 py-2 text-sm font-bold" role="status">
          {msg}
        </p>
      )}

      <AccountCard />

      <section className="card space-y-3 p-4 md:p-6">
        <h2 className="font-black">Giao diện</h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold">{t.settings.language}</span>
          <LangSwitch />
        </div>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <button key={t.value} type="button" onClick={() => setTheme(t.value)} className={theme === t.value ? 'btn-primary' : 'btn-soft'}>
              {t.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={petals} onChange={(e) => setPetals(e.target.checked)} />
          Hiệu ứng cánh hoa rơi ở trang chủ
        </label>
      </section>

      <section className="card space-y-3 p-4 md:p-6">
        <h2 className="font-black">Giọng đọc</h2>
        <label className="flex items-center gap-3 text-sm">
          Tốc độ mặc định
          <input type="range" min={0.6} max={1.2} step={0.1} value={ttsRate} onChange={(e) => setTtsRate(Number(e.target.value))} aria-label="Tốc độ đọc" />
          <span className="font-bold">{ttsRate.toFixed(1)}</span>
          <button type="button" className="btn-sky text-sm" onClick={() => speak('こんにちは。さくらです。')}>
            🔊 Thử
          </button>
        </label>
        <label className="flex items-center gap-3 text-sm">
          Thẻ mới mỗi phiên
          <input
            type="number"
            min={5}
            max={50}
            value={newLimit}
            onChange={(e) => setNewLimit(Number(e.target.value))}
            aria-label="Thẻ mới mỗi phiên"
            className="w-20 rounded-full bg-cream px-3 py-1 text-center font-bold ring-2 ring-sakura/50 dark:bg-bg"
          />
        </label>
      </section>

      <section className="card space-y-3 p-4 md:p-6">
        <h2 className="font-black">Sao lưu</h2>
        <p className="text-sm text-muted">
          Tiến độ và các câu bạn đã đặt được lưu trong trình duyệt này. Xuất file để chuyển sang máy khác hoặc phòng mất dữ liệu.
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={() => void doExport()}>
            ⬇️ Xuất file sao lưu
          </button>
          <button type="button" className="btn-soft" onClick={() => fileRef.current?.click()}>
            ⬆️ Nhập từ file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            aria-label="Chọn file sao lưu"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void doImport(f);
              e.target.value = '';
            }}
          />
        </div>
        {!confirmReset ? (
          <button type="button" className="text-sm text-rose underline" onClick={() => setConfirmReset(true)}>
            Xóa toàn bộ tiến độ…
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-rose">Chắc chắn xóa? Không thể hoàn tác.</span>
            <button type="button" className="btn-primary text-sm" onClick={() => void doReset()}>
              Xóa
            </button>
            <button type="button" className="btn-soft text-sm" onClick={() => setConfirmReset(false)}>
              Hủy
            </button>
          </div>
        )}
      </section>

      <section className="card space-y-2 p-4 md:p-6">
        <h2 className="font-black">Nguồn dữ liệu</h2>
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
        <p className="text-xs text-muted">Nội dung kana mnemonics, business, bài đọc và bài nghe do Nihongo Sensei biên soạn.</p>
      </section>
    </div>
  );
}
