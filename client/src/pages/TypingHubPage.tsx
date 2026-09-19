import { Link } from 'react-router-dom';
import { weakestKeys } from '@office-neko/shared';
import { useTypingHub } from '../progress/typing';
import { Mochi } from '../components/Mochi';
import { WpmChart } from '../typing/WpmChart';
import { KeyHeatmap } from '../typing/KeyHeatmap';

export function TypingHubPage() {
  const { runs, stats } = useTypingHub(20);
  const best = runs.reduce((m, r) => Math.max(m, r.wpm), 0);
  const weak = weakestKeys(stats, 5);
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 pb-24">
      <section className="card flex flex-wrap items-center gap-4 p-5">
        <Mochi mood="happy" size={90} />
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold">⌨️ Luyện gõ</h1>
          <p className="text-muted">Mỗi ngày vài phút, ngón tay sẽ nhớ đường đi của phím.</p>
        </div>
      </section>
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="card space-y-3 p-5">
          <h2 className="text-xl font-extrabold">⏱️ Kiểm tra tốc độ</h2>
          <p className="text-muted">Gõ một đoạn văn trong thời gian cố định, Mochi tính WPM và độ chính xác.</p>
          <div className="flex gap-3">
            <Link to="/typing/test/1" className="btn-primary">1 phút</Link>
            <Link to="/typing/test/3" className="btn-soft">3 phút</Link>
          </div>
        </section>
        <section className="card space-y-3 p-5">
          <h2 className="text-xl font-extrabold">🐟 Mèo bắt cá</h2>
          <p className="text-muted">Gõ đúng chữ trên con cá trước khi nó rơi xuống đáy.</p>
          <Link to="/typing/fish" className="btn-primary">Chơi ngay</Link>
        </section>
      </div>
      <section className="card space-y-4 p-5">
        <h2 className="text-xl font-extrabold">📈 Tiến bộ của bạn</h2>
        {runs.length > 0 && <p className="font-bold">Tốt nhất: {best} WPM</p>}
        <WpmChart runs={runs} />
        <h3 className="font-bold">Phím hay gõ sai</h3>
        {weak.length > 0 ? (
          <p>Hãy luyện thêm: {weak.map((k) => k.toUpperCase()).join(', ')}</p>
        ) : (
          <p className="text-muted">Chưa đủ dữ liệu — làm vài bài kiểm tra nhé.</p>
        )}
        <KeyHeatmap stats={stats} />
      </section>
    </div>
  );
}
