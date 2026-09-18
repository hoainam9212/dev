import { Link } from 'react-router-dom';
import { Mascot } from '../components/Mascot';
import { SpeechBubble } from '../components/SpeechBubble';
import { XpBar } from '../components/XpBar';
import { Petals } from '../components/Petals';
import { useProgress } from '../store/progress';
import { NAV } from '../app/nav';
import { useDueCounts } from '../db/srs';
import { useSettings } from '../store/settings';

const GREETINGS = [
  { ja: 'おはよう！今日もがんばろうね！', vi: 'Chào buổi sáng! Hôm nay cùng cố gắng nhé!' },
  { ja: 'こんにちは！勉強の時間だよ〜', vi: 'Xin chào! Đến giờ học rồi~' },
  { ja: 'こんばんは！今日はどこまで進む？', vi: 'Chào buổi tối! Hôm nay học đến đâu nào?' },
];

function pickGreeting(d = new Date()) {
  const h = d.getHours();
  return h < 11 ? GREETINGS[0]! : h < 18 ? GREETINGS[1]! : GREETINGS[2]!;
}

export function Home() {
  const streak = useProgress((s) => s.streak);
  const due = useDueCounts();
  const petals = useSettings((s) => s.petals);
  const dueTotal = due ? due.vocab + due.kanji + due.grammar : 0;
  const g = pickGreeting();
  const quick = NAV.filter((n) => !['/', '/settings', '/progress'].includes(n.to));

  return (
    <div className="space-y-6">
      <section className="card relative overflow-hidden p-6 md:p-8">
        {petals && <Petals />}
        <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-end">
          <Mascot mood="happy" size={180} />
          <div className="flex-1 space-y-3">
            <SpeechBubble>
              <p className="text-lg font-bold">{g.ja}</p>
              <p className="text-sm text-muted">{g.vi}</p>
            </SpeechBubble>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl bg-sakura/30 px-4 py-2 font-bold">🔥 Chuỗi: {streak} ngày</div>
              <div className="rounded-2xl bg-sky/40 px-4 py-2 font-bold" data-testid="due-chip">
                🔁 Đến hạn: {dueTotal} thẻ
              </div>
              {dueTotal > 0 && (
                <Link to="/review" className="btn-primary">
                  Ôn ngay
                </Link>
              )}
            </div>
            <XpBar />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-black text-rose">Bắt đầu học</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {quick.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-2xl">{n.icon}</span>
              <span className="font-bold">{n.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
