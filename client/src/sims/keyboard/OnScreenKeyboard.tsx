import { FINGER_COLOR, FINGER_VI, KEY_ROWS, SPACE_KEY, keyDef, keyForChar, type OS } from '@office-neko/shared';

const LEFT_FINGERS = new Set(['lp', 'lr', 'lm', 'li']);

export function OnScreenKeyboard({ os, next }: { os: OS; next: string | null }) {
  const want = next ? keyForChar(next) : null;
  const wantDef = want ? keyDef(want.id) : undefined;
  const shiftId = want?.shift && wantDef ? (LEFT_FINGERS.has(wantDef.finger) ? 'shift-right' : 'shift-left') : null;
  const keyCls = 'relative grid h-11 place-items-center rounded-lg border border-b-4 border-muted/30 text-sm font-bold';
  const nextCls = 'ring-4 ring-rose scale-105';
  const bottom =
    os === 'mac'
      ? ['control', 'option', 'command', 'SPACE', 'command', 'option']
      : ['Ctrl', 'Win', 'Alt', 'SPACE', 'Alt', 'Ctrl'];

  return (
    <div aria-label="Bàn phím ảo" data-help-id="keyboard.board" className="space-y-1 rounded-2xl bg-cream p-3 select-none">
      {KEY_ROWS.map((row, r) => (
        <div key={r} className="flex gap-1" style={{ paddingLeft: `${r * 0.9}rem` }}>
          {r === 3 && (
            <span data-key="shift-left" data-next={shiftId === 'shift-left' || undefined} className={`${keyCls} w-20 bg-white ${shiftId === 'shift-left' ? nextCls : ''}`}>
              {os === 'mac' ? '⇧ shift' : 'Shift'}
            </span>
          )}
          {row.map((k) => {
            const isNext = want?.id === k.id;
            return (
              <span
                key={k.id}
                data-key={k.id}
                data-next={isNext || undefined}
                className={`${keyCls} w-11 ${isNext ? nextCls : ''}`}
                style={{ background: FINGER_COLOR[k.finger] }}
              >
                {k.shiftLabel && <span className="absolute left-1 top-0 text-[0.6rem] text-muted">{k.shiftLabel}</span>}
                {k.label}
                {k.home && (k.id === 'f' || k.id === 'j') && <span className="absolute bottom-1 h-0.5 w-3 rounded bg-text/60" />}
              </span>
            );
          })}
          {r === 0 && <span className={`${keyCls} w-20 bg-white`}>{os === 'mac' ? 'delete' : 'Backspace'}</span>}
          {r === 2 && <span className={`${keyCls} w-20 bg-white`}>{os === 'mac' ? 'return' : 'Enter'}</span>}
          {r === 3 && (
            <span data-key="shift-right" data-next={shiftId === 'shift-right' || undefined} className={`${keyCls} w-24 bg-white ${shiftId === 'shift-right' ? nextCls : ''}`}>
              {os === 'mac' ? '⇧ shift' : 'Shift'}
            </span>
          )}
        </div>
      ))}
      <div className="flex gap-1">
        {bottom.map((label, i) =>
          label === 'SPACE' ? (
            <span
              key={i}
              data-key="space"
              data-next={want?.id === 'space' || undefined}
              className={`${keyCls} flex-1 ${want?.id === 'space' ? nextCls : ''}`}
              style={{ background: FINGER_COLOR[SPACE_KEY.finger] }}
            >
              Space
            </span>
          ) : (
            <span key={i} className={`${keyCls} w-16 bg-white text-xs`}>{label}</span>
          ),
        )}
      </div>
      {wantDef && (
        <p className="pt-1 text-center text-sm font-semibold">
          Dùng: {FINGER_VI[wantDef.finger]}
          {shiftId && ` + Shift bên ${shiftId === 'shift-right' ? 'phải' : 'trái'}`}
        </p>
      )}
    </div>
  );
}
