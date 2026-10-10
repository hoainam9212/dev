import type { Dispatch, ReactNode } from 'react';
import { pptSim } from '@office-neko/shared';
import { Play20Regular } from '@fluentui/react-icons';
import { Group, ToolButton } from '../../components/ribbon';
import { TRANSITIONS } from './transitions';

interface Props {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
  /** Phát thử hiệu ứng của slide đang mở trên khung soạn. */
  onPreview: () => void;
}

/** Hình nhỏ gợi ý từng hiệu ứng, thay cho ảnh động trong bộ sưu tập của PowerPoint thật. */
const ICON: Record<pptSim.Transition, ReactNode> = {
  none: <span className="text-lg leading-none">⨯</span>,
  fade: <span className="text-lg leading-none opacity-50">▣</span>,
  push: <span className="text-lg leading-none">⇐</span>,
  zoom: <span className="text-lg leading-none">⤢</span>,
};

/** Thẻ Transitions theo PowerPoint: Preview | Transition to This Slide | Timing. */
export function RibbonTransitions({ state, dispatch, onPreview }: Props) {
  const current = pptSim.slideOf(state).transition ?? 'none';
  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Preview" variant="office">
        <ToolButton variant="office" large helpId="ppt.preview" label="Preview – xem thử chuyển cảnh" onClick={onPreview}>
          <Play20Regular />
          <span>Preview</span>
        </ToolButton>
      </Group>

      <Group title="Transition to This Slide" variant="office">
        <div className="flex items-stretch gap-1">
          {TRANSITIONS.map((t) => (
            <ToolButton
              key={t.id}
              variant="office"
              large
              helpId="ppt.transitions"
              label={`${t.label} – ${t.vi}`}
              pressed={current === t.id}
              onClick={() => {
                dispatch({ type: 'setTransition', transition: t.id });
                // PowerPoint thật phát thử ngay khi chọn một hiệu ứng.
                if (t.id !== 'none') onPreview();
              }}
            >
              <span aria-hidden="true" className="grid h-8 w-11 place-items-center rounded-sm border border-black/15 bg-white">
                {ICON[t.id]}
              </span>
              <span>{t.label}</span>
            </ToolButton>
          ))}
        </div>
      </Group>

      <Group title="Timing" variant="office">
        <ToolButton
          variant="office"
          large
          helpId="ppt.applyAll"
          label="Apply To All – dùng cho mọi slide"
          disabled={current === 'none'}
          onClick={() => dispatch({ type: 'setTransition', transition: current, all: true })}
        >
          <span aria-hidden="true" className="text-xl leading-none">⧉</span>
          <span>Apply To All</span>
        </ToolButton>
      </Group>
    </div>
  );
}
