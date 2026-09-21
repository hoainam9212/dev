import { wordSim } from '@office-neko/shared';
import { useOs } from '../../db/profile';
import { WordSim } from './WordSim';

/** Trang tạm để xem trình soạn thảo Word khi chưa có bài học nào dùng nó. */
export function WordDevPage() {
  const os = useOs();
  return (
    <div className="mx-auto max-w-4xl space-y-3 p-4 pb-24">
      <h1 className="text-2xl font-extrabold">Word (thử)</h1>
      <WordSim initial={wordSim.wordInitial({ text: 'Kính gửi Quý công ty' })} onState={() => {}} os={os} spotlight={null} />
    </div>
  );
}
