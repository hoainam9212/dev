import { useEffect, useId, useRef, useState, type Dispatch, type ReactNode } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { wordSim, type pptSim } from '@office-neko/shared';

interface Props {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
  /** Thời điểm hiện tại, truyền từ component — reducer không được gọi Date.now(). */
  now: number;
}

const MAX_UPLOAD = 1_000_000;

function Shell({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const box = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useDialogFocus(box, true);

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/20 p-4">
      <div ref={box} role="dialog" aria-modal="true" aria-labelledby={titleId} className="card w-full max-w-lg space-y-3 p-5">
        <div className="flex items-center gap-3">
          <h2 id={titleId} className="text-lg font-extrabold">{title}</h2>
          <button type="button" aria-label="Đóng" data-dialog-close className="btn ml-auto !px-3 !py-1" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Lưu / In / Chèn ảnh. Bộ ảnh mẫu dùng chung với Word. */
export function PptDialogs({ state, dispatch, now }: Props) {
  const close = () => dispatch({ type: 'closeDialog' });
  const [name, setName] = useState('Bai trinh chieu.pptx');
  const [tooBig, setTooBig] = useState(false);

  if (!state.dialog) return null;

  if (state.dialog === 'image') {
    const insert = (src: string, alt: string) => {
      dispatch({ type: 'addImage', src, alt });
      close();
    };
    const upload = (file: File | undefined) => {
      setTooBig(false);
      if (!file) return;
      if (file.size > MAX_UPLOAD) {
        setTooBig(true);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => insert(String(reader.result ?? ''), file.name.replace(/\.[^.]+$/, ''));
      reader.readAsDataURL(file);
    };

    return (
      <Shell title="Chèn ảnh" onClose={close}>
        <div className="grid grid-cols-3 gap-3">
          {wordSim.IMAGE_LIBRARY.map((image) => (
            <button
              key={image.src}
              type="button"
              aria-label={image.alt}
              className="card p-2 transition hover:ring-2 hover:ring-peach"
              onClick={() => insert(image.src, image.alt)}
            >
              <img src={image.src} alt="" className="h-16 w-full object-contain" />
              <span className="text-xs font-bold">{image.alt}</span>
            </button>
          ))}
        </div>
        <label className="block space-y-1">
          <span className="font-semibold">Tải ảnh từ máy</span>
          <input
            type="file"
            accept="image/*"
            aria-label="Tải ảnh từ máy"
            onChange={(e) => {
              upload(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </label>
        {tooBig && <p role="alert" className="font-semibold text-rose-ink">Ảnh hơi nặng, bạn chọn ảnh nhỏ hơn nhé.</p>}
        <p className="text-sm text-muted">Ảnh chỉ nằm trong máy bạn, không gửi đi đâu cả.</p>
      </Shell>
    );
  }

  if (state.dialog === 'save') {
    return (
      <Shell title="Lưu bài trình chiếu" onClose={close}>
        <label className="block space-y-1">
          <span className="text-sm font-bold">Đặt tên tệp</span>
          <input
            aria-label="Tên tệp"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-2 border-peach/50 px-3 py-2"
          />
        </label>
        <p className="text-sm text-muted">
          Đuôi <b>.pptx</b> là đuôi tệp PowerPoint. Đây là bản mô phỏng nên không có tệp thật nào được tạo ra trên máy bạn.
        </p>
        <button type="button" className="btn-primary" onClick={() => dispatch({ type: 'save', name, at: now })}>
          Lưu
        </button>
      </Shell>
    );
  }

  return (
    <Shell title="In bài trình chiếu" onClose={close}>
      <p className="text-sm">
        Bài của bạn có <b>{state.slides.length}</b> slide. Khi in, người ta hay in nhiều slide trên một tờ giấy để làm tài liệu phát tay.
      </p>
      <p className="text-sm text-muted">Đây là bản mô phỏng nên không có gì được gửi tới máy in thật.</p>
      <button type="button" className="btn-primary" onClick={() => dispatch({ type: 'print' })}>
        In
      </button>
    </Shell>
  );
}
