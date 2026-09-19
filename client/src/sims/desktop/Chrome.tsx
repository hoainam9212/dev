import type { ReactNode } from 'react';
import type { OS } from '@office-neko/shared';

interface Props {
  os: OS;
  onTrash: () => void;
  onDropToTrash: () => void;
  children: ReactNode;
}

const trashButton = (onTrash: () => void, onDropToTrash: () => void, cls: string) => (
  <button
    type="button"
    aria-label="Thùng rác"
    data-help-id="desktop.trash"
    className={cls}
    onClick={onTrash}
    onDragOver={(e) => e.preventDefault()}
    onDrop={onDropToTrash}
  >
    🗑️
  </button>
);

export function Chrome({ os, onTrash, onDropToTrash, children }: Props) {
  if (os === 'mac') {
    return (
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-lavender/60 to-sky/60">
        <div className="flex items-center gap-4 bg-white/70 px-3 py-1 text-sm">
          <span aria-hidden>🐾</span>
          <span className="font-bold">Finder</span>
          <span>Tệp</span>
          <span>Sửa</span>
          <span>Xem</span>
        </div>
        <div className="p-4">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center gap-2 border-b border-muted/20 bg-cream px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            </div>
            {children}
          </div>
        </div>
        <div className="mx-auto mb-2 flex w-fit items-center gap-3 rounded-2xl bg-white/70 px-4 py-1 text-2xl">
          <span aria-hidden title="Finder">🗂️</span>
          {trashButton(onTrash, onDropToTrash, 'rounded-xl px-1 hover:bg-white')}
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky/70 to-mint/60">
      <div className="p-4">
        <div className="overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-muted/20 bg-cream px-3 py-1 text-sm">
            <span className="font-bold">📁 File Explorer</span>
            <span aria-hidden className="tracking-widest text-muted">─ ▢ ✕</span>
          </div>
          {children}
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white/80 px-3 py-1 text-2xl">
        <span aria-hidden className="rounded-md bg-sky/60 px-2 text-base font-bold">▦ Start</span>
        <span aria-hidden title="File Explorer">📁</span>
        {trashButton(onTrash, onDropToTrash, 'rounded-md px-1 hover:bg-sky/30')}
      </div>
    </div>
  );
}
