import { pptSim } from '@office-neko/shared';
import { PptSim } from '../sims/ppt/PptSim';

/**
 * Trang thử tạm cho giai đoạn 5A. **Task 11 phải xoá file này và route `/dev/ppt`.**
 */
export function DevPptPage() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <h1 className="mb-3 text-xl font-bold">Thử trình chiếu (trang tạm)</h1>
      <PptSim
        initial={pptSim.pptInitial({ slides: ['title', 'titleContent', 'twoContent'] })}
        onState={() => {}}
        os="win"
        spotlight={null}
      />
    </div>
  );
}
