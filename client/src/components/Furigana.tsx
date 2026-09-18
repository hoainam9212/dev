import { parseFurigana } from '@nihongo/shared';

interface Props {
  text: string;
  show?: boolean;
  className?: string;
  onWordTap?: (base: string) => void;
}

/** Renders `[漢字|かんじ]` markup as <ruby>; optional tap handler on ruby bases. */
export function Furigana({ text, show = true, className = '', onWordTap }: Props) {
  const segs = parseFurigana(text);
  return (
    <span className={className} lang="ja">
      {segs.map((s, i) =>
        s.ruby ? (
          <ruby
            key={i}
            data-testid="ruby"
            onClick={onWordTap ? () => onWordTap(s.text) : undefined}
            className={onWordTap ? 'cursor-pointer rounded px-0.5 hover:bg-sakura/40' : ''}
          >
            {s.text}
            <rp>(</rp>
            <rt className={show ? 'text-[0.55em] text-rose' : 'invisible text-[0.55em]'}>{s.ruby}</rt>
            <rp>)</rp>
          </ruby>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </span>
  );
}
