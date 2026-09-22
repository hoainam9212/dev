import { pptSim } from '@office-neko/shared';
import { PptSim } from '../sims/ppt/PptSim';

/**
 * Trang thử tạm cho giai đoạn 5A. **Task 11 phải xoá file này và route `/dev/ppt`.**
 */
/** Sẵn một hình khối để thử kéo–thả khi chưa có tab Insert (Task 8). */
const initial = pptSim.reducePpt(pptSim.pptInitial({ slides: ['title', 'titleContent', 'twoContent'] }), {
  type: 'addShape',
  shape: 'star',
  x: 320,
  y: 320,
  w: 160,
  h: 160,
});

export function DevPptPage() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <h1 className="mb-3 text-xl font-bold">Thử trình chiếu (trang tạm)</h1>
      <PptSim
        initial={initial}
        onState={() => {}}
        os="win"
        spotlight={null}
      />
    </div>
  );
}
