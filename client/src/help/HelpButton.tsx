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
      // Màn hẹp: nhỏ hơn và sát góc để bớt che góc dưới phải của khung tập (vẫn ≥ 44 px để chạm).
      className="fixed bottom-3 right-3 z-40 grid h-11 w-11 place-items-center rounded-full bg-rose text-xl font-extrabold sm:bottom-5 sm:right-5 sm:h-14 sm:w-14 sm:text-2xl text-white shadow-lg transition hover:brightness-110 active:scale-95"
    >
      ?
    </button>
  );
}
