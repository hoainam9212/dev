import { useEffect, useState } from 'react';
import { wordSim } from '@office-neko/shared';

interface Props {
  state: wordSim.WordState;
  dispatch: (a: wordSim.WordAction) => void;
  /** Thời điểm hiện tại, truyền từ component — reducer không được gọi Date.now(). */
  now: number;
}

const MAX_UPLOAD = 1_000_000;

function Shell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/20 p-4">
      <div role="dialog" aria-modal="true" aria-label={title} className="card w-full max-w-lg space-y-3 p-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-extrabold">{title}</h2>
          <button type="button" aria-label="Đóng" className="btn ml-auto !px-3 !py-1" onClick={onClose}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function WordDialogs({ state, dispatch, now }: Props) {
  const close = () => dispatch({ type: 'openDialog', dialog: null });
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [name, setName] = useState('van-ban.docx');
  const [tooBig, setTooBig] = useState(false);

  if (!state.dialog) return null;

  if (state.dialog === 'find') {
    const count = wordSim.countMatches(state.doc, find);
    return (
      <Shell title="Tìm và thay thế" onClose={close}>
        <label className="block space-y-1">
          <span className="font-semibold">Tìm</span>
          <input value={find} onChange={(e) => setFind(e.target.value)} className="w-full rounded-full border-2 border-peach/60 px-4 py-2 outline-none focus:border-rose" />
        </label>
        <label className="block space-y-1">
          <span className="font-semibold">Thay bằng</span>
          <input value={replace} onChange={(e) => setReplace(e.target.value)} className="w-full rounded-full border-2 border-peach/60 px-4 py-2 outline-none focus:border-rose" />
        </label>
        <p className="text-muted">{find ? `Tìm thấy ${count} chỗ.` : 'Gõ chữ cần tìm ở ô trên.'}</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-primary" disabled={count === 0} onClick={() => dispatch({ type: 'replaceAll', find, replace })}>
            Thay tất cả
          </button>
          <button type="button" className="btn" disabled={count === 0} onClick={() => dispatch({ type: 'replaceOne', find, replace })}>
            Thay chỗ đầu tiên
          </button>
        </div>
      </Shell>
    );
  }

  if (state.dialog === 'image') {
    const upload = (file: File | undefined) => {
      setTooBig(false);
      if (!file) return;
      if (file.size > MAX_UPLOAD) {
        setTooBig(true);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        dispatch({ type: 'insertImage', src: String(reader.result ?? ''), alt: file.name.replace(/\.[^.]+$/, '') });
        close();
      };
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
              onClick={() => {
                dispatch({ type: 'insertImage', src: image.src, alt: image.alt });
                close();
              }}
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
        <p className="text-muted text-sm">Ảnh chỉ nằm trong máy bạn, không gửi đi đâu cả.</p>
      </Shell>
    );
  }

  if (state.dialog === 'save') {
    return (
      <Shell title="Lưu văn bản" onClose={close}>
        <label className="block space-y-1">
          <span className="font-semibold">Tên file</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-full border-2 border-peach/60 px-4 py-2 outline-none focus:border-rose" />
        </label>
        <div className="flex items-center gap-3">
          <button type="button" className="btn-primary" onClick={() => dispatch({ type: 'save', name, at: now })}>
            Lưu
          </button>
          {state.saved && <span className="font-semibold text-excel-ink">Đã lưu ✓ ({state.saved.name})</span>}
        </div>
        <p className="text-muted text-sm">Đây là bản lưu mô phỏng: file nằm trong bài học, không tạo file thật trên máy.</p>
      </Shell>
    );
  }

  return (
    <Shell title="In thử" onClose={close}>
      <div className="mx-auto max-h-64 w-full max-w-xs overflow-hidden rounded bg-white p-3 text-[0.6rem] shadow-inner">
        <div className="word-prose">{wordSim.plainText(state.doc).split('\n').map((line, i) => <p key={i}>{line || ' '}</p>)}</div>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className="btn-primary" onClick={() => dispatch({ type: 'print' })}>
          In
        </button>
        {state.printed && <span className="font-semibold text-excel-ink">Đã gửi lệnh in ✓</span>}
      </div>
      <p className="text-muted text-sm">Đây là bản in mô phỏng, máy in thật sẽ không chạy.</p>
    </Shell>
  );
}
