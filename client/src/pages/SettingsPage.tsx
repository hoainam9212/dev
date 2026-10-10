import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ACCESSORIES, levelFromXp, type OS } from '@office-neko/shared';
import { updateProfile, useProfile } from '../db/profile';
import type { Profile } from '../db/db';
import {
  backupFileName, downloadJson, exportBackup, importBackup, parseBackup, profilesInBackup, readFileText, type BackupFile,
} from '../progress/backup';
import { Segmented } from '../components/Segmented';
import { Toggle } from '../components/Toggle';
import { Mochi } from '../components/Mochi';
import { AVATARS, avatarSkin, wearable } from '../profiles/avatars';
import { ProfileList } from '../profiles/ProfileList';

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
  const level = levelFromXp(profile.xp).level;
  const worn = wearable(profile);

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
              if (trimmed !== profile.name) updateProfile(profile.id, { name: trimmed });
            }}
            className="w-full rounded-full border-2 border-peach/60 bg-white px-4 py-2 outline-none focus:border-rose"
          />
        </label>
        <div className="space-y-1">
          <span className="font-semibold">Ảnh đại diện</span>
          <div role="radiogroup" aria-label="Ảnh đại diện" className="flex flex-wrap gap-2">
            {AVATARS.map((a) => (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={profile.avatar === a.id}
                aria-label={a.label}
                onClick={() => updateProfile(profile.id, { avatar: a.id })}
                className={`rounded-2xl bg-white p-1 transition ${profile.avatar === a.id ? 'ring-4 ring-rose' : 'hover:ring-2 hover:ring-peach'}`}
              >
                <Mochi skin={avatarSkin(a.id)} accessory={worn} size={48} mood="happy" animated={false} label={a.label} />
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Phụ kiện cho Mochi">
        <p className="text-muted">Lên cấp để mở thêm phụ kiện. Bạn đang ở cấp {level}.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Mochi skin={avatarSkin(profile.avatar)} accessory={worn} size={64} mood="happy" animated={false} label="Xem trước Mochi" />
          <div className="flex flex-1 flex-wrap gap-2">
            <button type="button" aria-pressed={worn === null} onClick={() => updateProfile(profile.id, { accessory: null })}
              className={`rounded-full px-3 py-1.5 font-bold ${worn === null ? 'bg-rose text-white' : 'bg-white shadow'}`}>
              Không đeo
            </button>
            {ACCESSORIES.map((a) => {
              const open = a.level <= level;
              return (
                <button key={a.id} type="button" disabled={!open} aria-pressed={worn === a.id}
                  onClick={() => updateProfile(profile.id, { accessory: a.id })}
                  className={`rounded-full px-3 py-1.5 font-bold ${worn === a.id ? 'bg-rose text-white' : 'bg-white shadow'} disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none`}>
                  {a.name}{!open && <span className="ml-1 text-xs font-semibold">🔒 Cấp {a.level}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <Section title="Người học trên máy này">
        <p className="text-muted">Mỗi người có tiến độ riêng. Chọn tên mình ở màn hình “Ai đang học?” trước khi bắt đầu.</p>
        <ProfileList currentId={profile.id} />
      </Section>

      <Section title="Hệ điều hành">
        <p className="text-muted">Phím tắt và bài "Làm quen máy tính" sẽ hiển thị theo máy bạn dùng.</p>
        <Segmented<OS> label="Hệ điều hành" value={profile.os} onChange={(os) => updateProfile(profile.id, { os })}
          options={[{ value: 'win', label: 'Windows' }, { value: 'mac', label: 'Mac' }]} />
      </Section>

      <Section title="Mục tiêu mỗi ngày">
        <Segmented<'5' | '10' | '20'> label="Mục tiêu mỗi ngày" value={String(profile.dailyGoalMin) as '5' | '10' | '20'}
          onChange={(v) => updateProfile(profile.id, { dailyGoalMin: Number(v) as Profile['dailyGoalMin'] })}
          options={[{ value: '5', label: '5 phút' }, { value: '10', label: '10 phút' }, { value: '20', label: '20 phút' }]} />
      </Section>

      <Section title="Hiển thị">
        <div className="space-y-1">
          <span className="font-semibold">Cỡ chữ</span>
          <div>
            <Segmented<Profile['fontScale']> label="Cỡ chữ" value={profile.fontScale} onChange={(fontScale) => updateProfile(profile.id, { fontScale })}
              options={[{ value: 'md', label: 'Vừa' }, { value: 'lg', label: 'Lớn' }, { value: 'xl', label: 'Rất lớn' }]} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Âm thanh</span>
          <Toggle label="Âm thanh" checked={profile.sound} onChange={(sound) => updateProfile(profile.id, { sound })} />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Giảm chuyển động</span>
          <Toggle label="Giảm chuyển động" checked={profile.reducedMotion} onChange={(reducedMotion) => updateProfile(profile.id, { reducedMotion })} />
        </div>
      </Section>

      <Section title="Dành cho người hướng dẫn">
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold">Mở khoá toàn bộ bài học</span>
          <Toggle label="Mở khoá toàn bộ bài học" checked={profile.unlockAll ?? false}
            onChange={(unlockAll) => updateProfile(profile.id, { unlockAll })} />
        </div>
        <p className="text-muted">
          Bật lên để vào thẳng bất kỳ bài nào mà không cần học theo thứ tự — tiện khi bạn muốn xem trước nội dung hoặc
          kiểm tra một bài cụ thể. Sao và tiến độ vẫn được lưu như bình thường. Học viên nên tắt mục này để học đúng lộ trình.
        </p>
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
            <p>
              File này có <strong>{profilesInBackup(pending)} người học</strong> (lưu ngày {pending.exportedAt.slice(0, 10)}).
              Toàn bộ dữ liệu hiện tại trên máy sẽ được <strong>thay thế</strong>. Tiếp tục?
            </p>
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
