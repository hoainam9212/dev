import { useState, type Dispatch } from 'react';
import type { pptSim } from '@office-neko/shared';
import { Print20Regular, Save20Regular } from '@fluentui/react-icons';
import { Group, RibbonPanel, RibbonTabs, Row, ToolButton } from '../../components/ribbon';
import { RibbonHome } from './RibbonHome';
import { RibbonInsert } from './RibbonInsert';
import { RibbonDesign } from './RibbonDesign';
import { RibbonTransitions } from './RibbonTransitions';
import { RibbonSlideShow } from './RibbonSlideShow';

export { PptDialogs } from './dialogs';

interface Props {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
  /** Nút Preview của thẻ Transitions: phát thử hiệu ứng trên khung soạn. */
  onPreview?: () => void;
}

const TABS = ['File', 'Home', 'Insert', 'Design', 'Transitions', 'Slide Show'] as const;
type Tab = (typeof TABS)[number];

/** Tab đang mở là trạng thái giao diện nên nằm ngoài reducer, giống ribbon Word và Excel. */
export function Ribbon({ state, dispatch, onPreview }: Props) {
  const [tab, setTab] = useState<Tab>('Home');

  return (
    <div className="space-y-1">
      <RibbonTabs app="ppt" tabs={TABS} active={tab} onPick={setTab} />

      <RibbonPanel>
      {tab === 'Home' && <RibbonHome state={state} dispatch={dispatch} />}
      {tab === 'File' && (
        <div className="flex flex-wrap items-stretch gap-y-2 py-1">
          <Group title="File" variant="office">
            <Row>
              <ToolButton variant="office" large helpId="ppt.save" label="Lưu tệp" onClick={() => dispatch({ type: 'openDialog', dialog: 'save' })}>
                <Save20Regular />
                <span>Save As</span>
              </ToolButton>
              <ToolButton variant="office" large helpId="ppt.print" label="In" onClick={() => dispatch({ type: 'openDialog', dialog: 'print' })}>
                <Print20Regular />
                <span>Print</span>
              </ToolButton>
            </Row>
          </Group>
          {state.saved ? (
            <p className="self-center px-3 text-sm text-muted">Đã lưu thành <b>{state.saved.name}</b></p>
          ) : null}
        </div>
      )}
      {tab === 'Insert' && <RibbonInsert state={state} dispatch={dispatch} />}
      {tab === 'Design' && <RibbonDesign state={state} dispatch={dispatch} />}
      {tab === 'Transitions' && <RibbonTransitions state={state} dispatch={dispatch} onPreview={onPreview ?? (() => {})} />}
      {tab === 'Slide Show' && <RibbonSlideShow dispatch={dispatch} />}
      </RibbonPanel>
    </div>
  );
}
