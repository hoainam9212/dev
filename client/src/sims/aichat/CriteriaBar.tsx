import { aichatSim } from '@office-neko/shared';

/**
 * Mochi chấm prompt ngay trên nháp đang gõ: 5 chip theo `CRITERIA`. Chip là chữ để đọc, không phải nút;
 * di chuột vào chip hiện mẹo viết phần đó.
 */
export function CriteriaBar({ draft }: { draft: string }) {
  const s = aichatSim.scorePrompt(draft);
  return (
    <div data-help-id="ai.criteria" className="space-y-1">
      <ul aria-label="Mochi chấm prompt" className="flex flex-wrap items-center gap-1.5">
        {aichatSim.CRITERIA.map((c) => {
          const hit = s.hits[c.id];
          return (
            <li
              key={c.id}
              className={`ai-chip${hit ? ' is-hit' : ''}`}
              aria-label={`${c.vi}: ${hit ? 'đã có' : 'chưa có'}`}
              title={c.tip}
            >
              <span aria-hidden>{hit ? '✓' : '○'}</span> {c.vi}
            </li>
          );
        })}
      </ul>
      {draft.trim() !== '' && s.tooShort && (
        <p className="text-xs text-muted">Prompt hơi ngắn, hãy nói rõ hơn.</p>
      )}
    </div>
  );
}
