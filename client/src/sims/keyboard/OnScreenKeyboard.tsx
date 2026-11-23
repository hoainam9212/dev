import { FINGER_COLOR, FINGER_VI, fingersForChar, keyboardRows, type KeyCap, type OS } from '@office-neko/shared';

/**
 * Bàn phím ảo theo HĐH (`keyboardRows`). Phím co giãn theo đơn vị bề rộng (`flex-grow` = `width`, nền 0) nên cả bàn
 * phím vừa khít khung từ 390px đến màn rộng; phím bổ trợ chỉ in ký hiệu ở màn hẹp, thêm tên ở màn rộng.
 */
export function OnScreenKeyboard({ os, next }: { os: OS; next: string | null }) {
  const want = next ? fingersForChar(next) : null;
  const isNext = (k: KeyCap) => want !== null && (k.id === want.key.id || k.id === want.shiftKey);
  const keyCls =
    'relative flex min-w-0 h-9 sm:h-[min(2.75rem,7.5vh)] items-center justify-center gap-1 rounded-md sm:rounded-lg border border-b-4 border-muted/30 font-bold';
  const nextCls = 'ring-4 ring-rose z-[1]';
  /** Chữ hoa/ký hiệu: giữ Shift trước (1) rồi mới bấm phím (2). */
  const stepOf = (k: KeyCap): 1 | 2 | null =>
    want?.shiftKey ? (k.id === want.shiftKey ? 1 : k.id === want.key.id ? 2 : null) : null;
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
  const stepBadge = (n: 1 | 2, cls = '') => (
    <span
      data-step={n}
      className={`flex shrink-0 items-center justify-center rounded-full bg-rose-ink font-extrabold leading-none text-white ${cls}`}
    >
      {n}
    </span>
  );

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
            const step = stepOf(k);
            return (
              <span
                key={k.id}
                data-key={k.id}
                data-next={hit || undefined}
                title={k.name}
                className={`${keyCls} ${step ? 'overflow-visible' : 'overflow-hidden'} ${mod ? 'bg-white text-[0.65rem] sm:text-xs' : 'text-xs sm:text-sm'} ${hit ? nextCls : ''}`}
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
                {/* Số nằm ở góc ngoài của phím (phím có số thì không cắt tràn) để không che chữ trên phím. */}
                {step && stepBadge(step, 'absolute -right-2 -top-2.5 z-[2] h-4 w-4 text-[0.6rem] shadow sm:h-5 sm:w-5 sm:text-xs')}
              </span>
            );
          })}
        </div>
      ))}
      {want && (
        <p data-testid="finger-caption" className="flex flex-wrap items-center justify-center gap-x-1.5 pt-1 text-center text-sm font-semibold">
          {want.shiftKey ? (
            <>
              {stepBadge(1, 'h-5 w-5 text-xs')}{' '}
              <span>
                Giữ <b>Shift</b> bên {want.shiftKey === 'shift-right' ? 'phải' : 'trái'} bằng{' '}
                {lower(FINGER_VI[want.shiftKey === 'shift-right' ? 'rp' : 'lp'])}
              </span>{' '}
              <span>→</span>{' '}
              {stepBadge(2, 'h-5 w-5 text-xs')}{' '}
              <span>
                bấm <b>{want.key.label}</b> bằng {lower(FINGER_VI[want.key.finger])}
              </span>
            </>
          ) : (
            <>Dùng: {FINGER_VI[want.key.finger]}</>
          )}
        </p>
      )}
    </div>
  );
}
