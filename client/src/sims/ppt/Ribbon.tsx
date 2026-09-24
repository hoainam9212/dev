import { useState, type Dispatch } from 'react';
import type { pptSim } from '@office-neko/shared';
import { Group, SoonTab, ToolButton } from '../../components/ribbon';
import { RibbonHome } from './RibbonHome';
import { RibbonInsert } from './RibbonInsert';

export { PptDialogs } from './dialogs';

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
      {tab === 'File' && (
        <div className="flex flex-wrap items-start gap-y-2 py-1">
          <Group title="Tệp">
            <ToolButton helpId="ppt.save" label="Save — Lưu tệp" onClick={() => dispatch({ type: 'openDialog', dialog: 'save' })}>💾 Lưu</ToolButton>
            <ToolButton helpId="ppt.print" label="Print — In" onClick={() => dispatch({ type: 'openDialog', dialog: 'print' })}>🖨 In</ToolButton>
          </Group>
          {state.saved ? (
            <p className="self-center px-3 text-sm text-muted">Đã lưu thành <b>{state.saved.name}</b></p>
          ) : null}
        </div>
      )}
      {tab === 'Insert' && <RibbonInsert state={state} dispatch={dispatch} />}
      {tab === 'Design' && <SoonTab what="Chủ đề trang trí" />}
      {tab === 'Transitions' && <SoonTab what="Hiệu ứng chuyển slide" />}
      {tab === 'Slide Show' && <SoonTab what="Trình chiếu toàn màn hình" />}
    </div>
  );
}
