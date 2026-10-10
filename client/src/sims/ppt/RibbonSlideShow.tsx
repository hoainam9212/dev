import type { Dispatch } from 'react';
import type { pptSim } from '@office-neko/shared';
import { Play20Regular, SlideMultiple20Regular } from '@fluentui/react-icons';
import { Group, ToolButton } from '../../components/ribbon';

/** Thẻ Slide Show: chỉ nhóm Start Slide Show — các nhóm Set Up / Monitors không có trong bài nào. */
export function RibbonSlideShow({ dispatch }: { dispatch: Dispatch<pptSim.PptAction> }) {
  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Start Slide Show" variant="office">
        <div className="flex items-stretch gap-1">
          <ToolButton
            variant="office"
            large
            helpId="ppt.showStart"
            label="From Beginning – trình chiếu từ đầu (F5)"
            onClick={() => dispatch({ type: 'startShow', from: 'start' })}
          >
            <Play20Regular />
            <span>From Beginning</span>
          </ToolButton>
          <ToolButton
            variant="office"
            large
            helpId="ppt.showCurrent"
            label="From Current Slide – trình chiếu từ slide này (Shift + F5)"
            onClick={() => dispatch({ type: 'startShow', from: 'current' })}
          >
            <SlideMultiple20Regular />
            <span>From Current Slide</span>
          </ToolButton>
        </div>
      </Group>
    </div>
  );
}
