import { useEffect, useState } from 'react';
import { onTtsError, openVoiceInstall, type TtsError } from '../lib/tts';
import { Mascot } from '../components/Mascot';
import { useT } from '../i18n';

const TEXT_KEY: Record<TtsError, 'ttsNoJapaneseVoice' | 'ttsError'> = {
  'no-japanese-voice': 'ttsNoJapaneseVoice',
  error: 'ttsError',
};

/** Shows a dismissible banner when the speech engine fails (instead of failing silently). */
export function TtsNotice() {
  const t = useT();
  const [err, setErr] = useState<TtsError | null>(null);
  useEffect(() => onTtsError(setErr), []);
  if (!err) return null;
  return (
    <div className="fixed inset-x-0 top-4 z-[70] flex justify-center px-4" role="alert" data-testid="tts-notice">
      <div className="card flex max-w-md items-start gap-3 px-4 py-3 ring-2 ring-rose">
        <Mascot mood="sad" size={44} />
        <div className="flex-1 space-y-2">
          <p className="text-sm font-bold">{t.app[TEXT_KEY[err]]}</p>
          <div className="flex gap-2">
            {err === 'no-japanese-voice' && (
              <button type="button" className="btn-primary px-3 py-1 text-sm" onClick={() => void openVoiceInstall()}>
                {t.app.installVoice}
              </button>
            )}
            <button type="button" className="btn-soft px-3 py-1 text-sm" onClick={() => setErr(null)}>
              {t.common.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
