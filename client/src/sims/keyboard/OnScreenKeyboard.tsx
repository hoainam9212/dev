import { FINGER_COLOR, FINGER_VI, fingersForChar, keyboardRows, type KeyCap, type OS } from '@office-neko/shared';

/**
 * Bàn phím ảo theo HĐH (`keyboardRows`). Phím co giãn theo đơn vị bề rộng (`flex-grow` = `width`, nền 0) nên cả bàn
 * phím vừa khít khung từ 390px đến màn rộng; phím bổ trợ chỉ in ký hiệu ở màn hẹp, thêm tên ở màn rộng.
 */
export function OnScreenKeyboard({ os, next }: { os: OS; next: string | null }) {
  const want = next ? fingersForChar(next) : null;
  const isNext = (k: KeyCap) => want !== null && (k.id === want.key.id || k.id === want.shiftKey);
  const keyCls =
    'relative flex min-w-0 h-9 sm:h-11 items-center justify-center gap-1 overflow-hidden rounded-md sm:rounded-lg border border-b-4 border-muted/30 font-bold';
  const nextCls = 'ring-4 ring-rose z-[1]';

  return (
    <div
      aria-label="Bàn phím ảo"
      data-help-id="keyboard.board"
      className="mx-auto w-full max-w-3xl space-y-0.5 rounded-2xl bg-cream p-1.5 select-none sm:space-y-1 sm:p-3"
    >
      {keyboardRows(os).map((row, r) => (
        <div key={r} className="flex gap-0.5 sm:gap-1">
          {row.map((k) => {
            const mod = k.name !== undefined && k.id !== 'space';
            const hit = isNext(k);
            return (
              <span
                key={k.id}
                data-key={k.id}
                data-next={hit || undefined}
                title={k.name}
                className={`${keyCls} ${mod ? 'bg-white text-[0.65rem] sm:text-xs' : 'text-xs sm:text-sm'} ${hit ? nextCls : ''}`}
                style={{
                  flexGrow: k.width,
                  flexShrink: 1,
                  flexBasis: 0,
                  background: mod || !k.finger ? undefined : FINGER_COLOR[k.finger],
                }}
              >
                {k.shiftLabel && (
                  <span className="absolute left-0.5 top-0 text-[0.5rem] text-muted sm:left-1 sm:text-[0.6rem]">{k.shiftLabel}</span>
                )}
                <span>{k.label}</span>
                {mod && k.name !== k.label && <span className="hidden truncate font-semibold md:inline">{k.name}</span>}
                {(k.id === 'f' || k.id === 'j') && <span className="absolute bottom-1 h-0.5 w-3 rounded bg-text/60" />}
              </span>
            );
          })}
        </div>
      ))}
      {want && (
        <p className="pt-1 text-center text-sm font-semibold">
          Dùng: {FINGER_VI[want.key.finger]}
          {want.shiftKey && ` + Shift bên ${want.shiftKey === 'shift-right' ? 'phải' : 'trái'}`}
        </p>
      )}
    </div>
  );
}
