import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { OS } from '@office-neko/shared';
import { updateProfile, useProfile } from '../db/profile';
import type { Profile } from '../db/db';
import {
  backupFileName, downloadJson, exportBackup, importBackup, parseBackup, readFileText, type BackupFile,
} from '../progress/backup';
import { Segmented } from '../components/Segmented';
import { Toggle } from '../components/Toggle';

const LICENSES: [string, string][] = [
  ['React, React Router, Zustand', 'MIT'],
  ['Dexie.js', 'Apache-2.0'],
  ['Tailwind CSS', 'MIT'],
  ['vite-plugin-pwa / Workbox', 'MIT'],
  ['Phông chữ Nunito', 'SIL Open Font License 1.1'],
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card space-y-3 p-5">
      <h2 className="text-lg font-extrabold">{title}</h2>
      {children}
    </section>
  );
}

export function SettingsPage() {
  const profile = useProfile();
  const [name, setName] = useState('');
  const [pending, setPending] = useState<BackupFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) setName(profile.name);
  }, [profile?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!profile) return null;

  const onFile = async (file: File | undefined) => {
    setError(null);
    setMessage(null);
    if (!file) return;
    try {
      setPending(parseBackup(await readFileText(file)));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const confirmImport = async () => {
    if (!pending) return;
    try {
      await importBackup(pending);
      setPending(null);
      setMessage('Đã khôi phục dữ liệu từ file sao lưu. 🎉');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 pb-24">
      <div className="flex items-center gap-3">
        <Link to="/" className="btn">← Về bản đồ</Link>
        <h1 className="text-2xl font-extrabold">Cài đặt</h1>
      </div>

      <Section title="Hồ sơ">
        <label className="block space-y-1">
          <span className="font-semibold">Tên của bạn</span>
          <input
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              const trimmed = name.trim();
              if (!trimmed) {
                setName(profile.name);
                return;
              }
              if (trimmed !== profile.name) updateProfile({ name: trimmed });
            }}
            className="w-full rounded-full border-2 border-peach/60 bg-white px-4 py-2 outline-none focus:border-rose"
          />
        </label>
      </Section>

      <Section title="Hệ điều hành">
        <p className="text-muted">Phím tắt và bài "Làm quen máy tính" sẽ hiển thị theo máy bạn dùng.</p>
        <Segmented<OS> label="Hệ điều hành" value={profile.os} onChange={(os) => updateProfile({ os })}
          options={[{ value: 'win', label: 'Windows' }, { value: 'mac', label: 'Mac' }]} />
      </Section>

      <Section title="Mục tiêu mỗi ngày">
        <Segmented<'5' | '10' | '20'> label="Mục tiêu mỗi ngày" value={String(profile.dailyGoalMin) as '5' | '10' | '20'}
          onChange={(v) => updateProfile({ dailyGoalMin: Number(v) as Profile['dailyGoalMin'] })}
          options={[{ value: '5', label: '5 phút' }, { value: '10', label: '10 phút' }, { value: '20', label: '20 phút' }]} />
      </Section>

      <Section title="Hiển thị">
        <div className="space-y-1">
          <span className="font-semibold">Cỡ chữ</span>
          <div>
            <Segmented<Profile['fontScale']> label="Cỡ chữ" value={profile.fontScale} onChange={(fontScale) => updateProfile({ fontScale })}
              options={[{ value: 'md', label: 'Vừa' }, { value: 'lg', label: 'Lớn' }, { value: 'xl', label: 'Rất lớn' }]} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Âm thanh</span>
          <Toggle label="Âm thanh" checked={profile.sound} onChange={(sound) => updateProfile({ sound })} />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Giảm chuyển động</span>
          <Toggle label="Giảm chuyển động" checked={profile.reducedMotion} onChange={(reducedMotion) => updateProfile({ reducedMotion })} />
        </div>
      </Section>

      <Section title="Sao lưu tiến độ">
        <p className="text-muted">Tiến độ nằm trong trình duyệt của máy này. Hãy tải file sao lưu để giữ an toàn hoặc chuyển sang máy khác.</p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="btn-mint"
            onClick={async () => {
              setError(null);
              try {
                downloadJson(backupFileName(), await exportBackup());
              } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
              }
            }}
          >
            Tải file sao lưu
          </button>
          <label className="btn-soft cursor-pointer">
            Khôi phục từ file
            <input
              type="file"
              accept="application/json,.json"
              aria-label="Khôi phục từ file"
              className="sr-only"
              onChange={(e) => {
                void onFile(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </label>
        </div>
        {error && <p role="alert" className="font-semibold text-rose-ink">{error}</p>}
        {message && <p className="font-semibold text-excel-ink">{message}</p>}
        {pending && (
          <div role="alertdialog" aria-label="Xác nhận khôi phục" className="space-y-3 rounded-2xl bg-butter/40 p-4">
            <p>Dữ liệu hiện tại sẽ được <strong>thay thế</strong> bằng dữ liệu trong file (lưu ngày {pending.exportedAt.slice(0, 10)}). Tiếp tục?</p>
            <div className="flex gap-3">
              <button type="button" className="btn-primary" onClick={confirmImport}>Khôi phục</button>
              <button type="button" className="btn" onClick={() => setPending(null)}>Huỷ</button>
            </div>
          </div>
        )}
      </Section>

      <Section title="Giới thiệu & nguồn">
        <p>Nội dung bài học do dự án tự biên soạn. Ứng dụng dùng các thư viện mã nguồn mở:</p>
        <ul className="list-disc pl-6">
          {LICENSES.map(([lib, lic]) => (
            <li key={lib}>{lib} — {lic}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
