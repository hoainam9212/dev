import { useState, type Dispatch } from 'react';
import type { pptSim } from '@office-neko/shared';
import { SoonTab } from '../../components/ribbon';
import { RibbonHome } from './RibbonHome';

interface Props {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
}

const TABS = ['File', 'Home', 'Insert', 'Design', 'Transitions', 'Slide Show'] as const;
type Tab = (typeof TABS)[number];

/** Tab đang mở là trạng thái giao diện nên nằm ngoài reducer, giống ribbon Word và Excel. */
export function Ribbon({ state, dispatch }: Props) {
  const [tab, setTab] = useState<Tab>('Home');

  return (
    <div className="space-y-2">
      <div role="tablist" aria-label="Thanh công cụ" className="flex flex-wrap gap-1 border-b border-peach/40 pb-1">
        {TABS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setTab(name)}
            className={`rounded-t-lg px-3 py-1 text-sm font-bold transition ${tab === name ? 'bg-white text-ppt-ink shadow-sm' : 'text-muted hover:bg-white/60'}`}
          >
            {name}
          </button>
        ))}
      </div>

      {tab === 'Home' && <RibbonHome state={state} dispatch={dispatch} />}
      {tab === 'File' && <SoonTab what="Lưu và In" />}
      {tab === 'Insert' && <SoonTab what="Chèn hộp chữ, hình và ảnh" />}
      {tab === 'Design' && <SoonTab what="Chủ đề trang trí" />}
      {tab === 'Transitions' && <SoonTab what="Hiệu ứng chuyển slide" />}
      {tab === 'Slide Show' && <SoonTab what="Trình chiếu toàn màn hình" />}
    </div>
  );
}
