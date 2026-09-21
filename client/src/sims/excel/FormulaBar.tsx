import { excelSim, formula } from '@office-neko/shared';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function FormulaBar({ state, dispatch, inputRef }: Props) {
  const name = excelSim.refName(state.sel.from);
  const raw = excelSim.cellRaw(state, name);
  // Đang sửa thì hiện chữ đang gõ; không thì hiện đúng thứ ô đang chứa
  // (CÔNG THỨC, không phải kết quả — đó là chỗ người mới hay nhầm).
  const text = state.editing ?? raw;

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch({ type: 'commitEdit', move: 'down' });
    } else if (e.key === 'Tab') {
      e.preventDefault();
      dispatch({ type: 'commitEdit', move: 'right' });
    } else if (e.key === 'Escape') {
      e.preventDefault();
      dispatch({ type: 'cancelEdit' });
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div
        data-testid="name-box"
        className="kbd w-20 shrink-0 text-center"
        title="Name Box — địa chỉ ô đang chọn"
      >
        {name}
      </div>
      <span className="text-muted shrink-0" aria-hidden>ƒx</span>
      <input
        ref={inputRef}
        data-testid="formula-input"
        aria-label="Thanh công thức"
        value={text}
        onChange={(e) => dispatch({ type: 'setRaw', text: e.target.value })}
        onKeyDown={onKeyDown}
        placeholder="Gõ số, chữ, hoặc công thức bắt đầu bằng ="
        className="w-full rounded-lg border border-black/10 px-3 py-1.5 font-mono text-sm outline-none focus:ring-2 focus:ring-excel-ink/40"
      />
    </div>
  );
}

/** Câu nhắc dưới lưới: ô đang lỗi, hoặc ô trông như công thức mà quên dấu `=`. */
export function CellHint({ state }: { state: excelSim.WorkbookState }) {
  const name = excelSim.refName(state.sel.from);
  const raw = excelSim.cellRaw(state, name);
  const value = excelSim.cellValue(state, name);

  if (formula.isErr(value)) {
    const e = formula.explainError(value.err);
    return (
      <p className="text-sm text-rose-ink" role="status">
        <b>{value.err}</b> — {e.what} {e.fix}
      </p>
    );
  }
  if (formula.looksLikeForgottenEquals(raw)) {
    return (
      <p className="text-sm text-rose-ink" role="status">
        Bạn quên dấu = ở đầu công thức phải không? Ô {name} đang được coi là chữ.
      </p>
    );
  }
  return null;
}
