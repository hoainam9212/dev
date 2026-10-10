import type { Dispatch } from 'react';
import { pptSim } from '@office-neko/shared';
import { Group, ToolButton } from '../../components/ribbon';

interface Props {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
}

/**
 * Thẻ Design. PowerPoint thật có Themes | Variants | Customize; bài học chỉ dùng Themes
 * nên chỉ dựng nhóm đó — ảnh chụp thật cuối bài cho thấy đủ cả thẻ.
 */
export function RibbonDesign({ state, dispatch }: Props) {
  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Themes" variant="office">
        {/* Màn hẹp: lưới 3 × 2, nếu không dải 6 theme rộng ~540px bị cắt mất Tro và Đêm. */}
        <div className="grid grid-cols-3 gap-1 sm:grid-cols-6" data-help-id="ppt.themes">
          {pptSim.PPT_THEMES.map((t) => (
            <ToolButton
              key={t.id}
              variant="office"
              large
              helpId="ppt.themes"
              label={`${t.name} – chủ đề trang trí`}
              pressed={state.theme === t.id}
              onClick={() => dispatch({ type: 'setTheme', theme: t.id })}
            >
              {/* Slide tí hon: nền theme, chữ "Aa" màu tiêu đề bằng đúng kiểu chữ của theme. */}
              <span
                aria-hidden="true"
                className="grid h-9 w-16 place-items-center rounded-sm border border-black/15 text-base font-bold"
                style={{ background: t.bg, color: t.accent, fontFamily: t.font }}
              >
                Aa
              </span>
              <span>{t.name}</span>
            </ToolButton>
          ))}
        </div>
      </Group>
    </div>
  );
}
