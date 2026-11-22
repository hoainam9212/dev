import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { createProfile, setPreviewLook, useProfile } from '../db/profile';
import { setCurrentProfileId } from '../profiles/current';
import { Mochi } from '../components/Mochi';
import { SpeechBubble } from '../components/SpeechBubble';

/**
 * Cửa vào riêng cho người lớn tuổi (link `/de-dung`): chỉ hỏi tên, rồi tạo hồ sơ dễ dùng
 * (Windows, chữ Cực lớn, mở mọi bài). Các lựa chọn khác đổi sau trong Cài đặt.
 */
export function EasyWelcomePage() {
  const profile = useProfile();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Chưa có hồ sơ mà đã cần chữ to ngay từ màn đầu.
  useEffect(() => {
    setPreviewLook({ fontScale: 'xxl', easy: true });
    return () => setPreviewLook(null);
  }, []);

  // Như WelcomePage: không navigate() thủ công; hồ sơ mới thành hồ sơ đang chọn thì nhánh này tự đưa về "/".
  if (profile?.easyMode) return <Navigate to="/" replace />;

  const finish = async () => {
    setSaving(true);
    setError(null);
    try {
      const created = await createProfile({
        name, os: 'win', dailyGoalMin: 10, avatar: 'cam', easyMode: true, fontScale: 'xxl', unlockAll: true,
      });
      setCurrentProfileId(created.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-6">
      <Mochi mood="happy" size={step === 0 ? 180 : 130} />
      {step === 0 && (
        <>
          <SpeechBubble tail="bottom">
            <p className="text-lg">
              Xin chào! Mình là <strong>Mochi</strong> 🐱. Mình sẽ cùng bạn học dùng máy tính, từng chút một.
            </p>
          </SpeechBubble>
          <button type="button" className="btn-primary text-lg" onClick={() => setStep(1)}>Bắt đầu</button>
        </>
      )}
      {step === 1 && (
        <form
          className="w-full space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim() && !saving) void finish();
          }}
        >
          <h1 className="text-2xl font-extrabold">Bạn tên là gì?</h1>
          <input
            aria-label="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            maxLength={40}
            className="w-full rounded-full border-2 border-peach/60 bg-white px-5 py-3 text-lg outline-none focus:border-rose"
          />
          <div className="flex gap-3">
            <button type="button" className="btn" onClick={() => setStep(0)} disabled={saving}>← Quay lại</button>
            <button type="submit" className="btn-primary" disabled={!name.trim() || saving}>Xong</button>
          </div>
          {saving && <p className="text-muted">Đang lưu…</p>}
          {error && <p role="alert" className="font-semibold text-rose-ink">{error}</p>}
        </form>
      )}
    </div>
  );
}
