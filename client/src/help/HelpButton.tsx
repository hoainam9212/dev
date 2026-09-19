import { useEffect } from 'react';
import { useHelp } from './helpStore';

export function HelpButton() {
  const openGlossary = useHelp((s) => s.openGlossary);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        openGlossary();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openGlossary]);
  return (
    <button
      type="button"
      data-help-id="app.help"
      aria-label="Trợ giúp"
      onClick={() => openGlossary()}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-rose text-2xl font-extrabold text-white shadow-lg transition hover:brightness-110 active:scale-95"
    >
      ?
    </button>
  );
}
