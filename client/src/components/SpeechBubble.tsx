import type { ReactNode } from 'react';

export function SpeechBubble({ children, tail = 'left' }: { children: ReactNode; tail?: 'left' | 'bottom' }) {
  return (
    <div className="relative rounded-3xl bg-surface px-5 py-4 shadow-md ring-2 ring-peach/60">
      {children}
      {tail === 'left' ? (
        <span aria-hidden className="absolute -left-2 top-6 h-4 w-4 rotate-45 bg-surface ring-2 ring-peach/60 [clip-path:polygon(0_0,0_100%,100%_100%)]" />
      ) : (
        <span aria-hidden className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-surface ring-2 ring-peach/60 [clip-path:polygon(0_100%,100%_100%,100%_0)]" />
      )}
    </div>
  );
}
