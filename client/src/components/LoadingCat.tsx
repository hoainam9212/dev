import { Mascot } from './Mascot';
import { useT } from '../i18n';

export function LoadingCat({ text }: { text?: string }) {
  const t = useT();
  return (
    <div className="flex flex-col items-center gap-2 py-10 text-muted" role="status">
      <Mascot mood="sleepy" size={100} />
      <p className="font-bold">{text ?? t.common.loading}</p>
    </div>
  );
}

export function ErrorCat({ text }: { text: string }) {
  const t = useT();
  return (
    <div className="flex flex-col items-center gap-2 py-10" role="alert">
      <Mascot mood="sad" size={100} />
      <p className="font-bold text-rose">{text}</p>
      <p className="text-sm text-muted">{t.common.loadErrorHint}</p>
    </div>
  );
}
