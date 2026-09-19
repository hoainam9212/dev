import { useEffect, useState } from 'react';
import { onTtsError, openVoiceInstall, type TtsError } from '../lib/tts';
import { Mascot } from '../components/Mascot';

const TEXT: Record<TtsError, string> = {
  'no-japanese-voice': 'Điện thoại chưa có giọng đọc tiếng Nhật. Hãy cài "Tiếng Nhật" trong Google Text-to-Speech.',
  error: 'Không phát được âm thanh. Hãy kiểm tra âm lượng và công cụ chuyển văn bản thành giọng nói của máy.',
};

/** Shows a dismissible banner when the speech engine fails (instead of failing silently). */
export function TtsNotice() {
  const [err, setErr] = useState<TtsError | null>(null);
  useEffect(() => onTtsError(setErr), []);
  if (!err) return null;
  return (
    <div className="fixed inset-x-0 top-4 z-[70] flex justify-center px-4" role="alert" data-testid="tts-notice">
      <div className="card flex max-w-md items-start gap-3 px-4 py-3 ring-2 ring-rose">
        <Mascot mood="sad" size={44} />
        <div className="flex-1 space-y-2">
          <p className="text-sm font-bold">{TEXT[err]}</p>
          <div className="flex gap-2">
            {err === 'no-japanese-voice' && (
              <button type="button" className="btn-primary px-3 py-1 text-sm" onClick={() => void openVoiceInstall()}>
                Cài giọng đọc
              </button>
            )}
            <button type="button" className="btn-soft px-3 py-1 text-sm" onClick={() => setErr(null)}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
