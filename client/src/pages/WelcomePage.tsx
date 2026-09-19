import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { OS } from '@office-neko/shared';
import { createProfile, guessOs, useProfile } from '../db/profile';
import { Mochi } from '../components/Mochi';
import { SpeechBubble } from '../components/SpeechBubble';

type Goal = 5 | 10 | 20;

const OS_CHOICES: { value: OS; title: string; desc: string }[] = [
  { value: 'win', title: '🪟 Windows', desc: 'Có nút Start hình ô cửa sổ ở góc dưới màn hình.' },
  { value: 'mac', title: '🍎 Mac (macOS)', desc: 'Máy của Apple, có thanh Dock chứa biểu tượng ở cạnh dưới.' },
];
const GOALS: { value: Goal; title: string; desc: string }[] = [
  { value: 5, title: '5 phút', desc: 'Nhẹ nhàng' },
  { value: 10, title: '10 phút', desc: 'Vừa phải' },
  { value: 20, title: '20 phút', desc: 'Chăm chỉ' },
];

export function WelcomePage() {
  const profile = useProfile();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [guessed] = useState<OS>(guessOs);
  const [os, setOs] = useState<OS>(guessed);
  const [goal, setGoal] = useState<Goal>(10);

  if (profile) return <Navigate to="/" replace />;

  // Không tự navigate() sau khi tạo hồ sơ: useProfile() phản ứng lại thay đổi của
  // Dexie liveQuery, nên lần render tiếp theo sẽ tự nhảy sang "/" qua nhánh trên.
  // Gọi navigate() thủ công ở đây tạo ra tình huống đua (điều hướng trước khi
  // profile cập nhật) khiến app nảy lại "/welcome" rồi mới quay lại "/".
  const finish = async () => {
    await createProfile({ name, os, dailyGoalMin: goal });
  };

  const card = (selected: boolean) =>
    `card w-full p-4 text-left transition ${selected ? 'ring-4 ring-rose' : 'hover:ring-2 hover:ring-peach'}`;

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-6">
      <Mochi mood={step === 0 ? 'happy' : 'neutral'} size={step === 0 ? 180 : 120} />
      {step === 0 && (
        <>
          <SpeechBubble tail="bottom">
            <p className="text-lg">
              Xin chào! Mình là <strong>Mochi</strong> 🐱. Mình sẽ giúp bạn làm quen với máy tính, từ cầm chuột, gõ phím đến dùng
              Word, Excel, PowerPoint và nhờ AI giúp việc.
            </p>
          </SpeechBubble>
          <button type="button" className="btn-primary text-lg" onClick={() => setStep(1)}>Bắt đầu nào!</button>
        </>
      )}
      {step === 1 && (
        <div className="w-full space-y-4">
          <h1 className="text-2xl font-extrabold">Bạn tên là gì?</h1>
          <input
            aria-label="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            maxLength={40}
            className="w-full rounded-full border-2 border-peach/60 bg-white px-5 py-3 text-lg outline-none focus:border-rose"
          />
          <div className="flex gap-3">
            <button type="button" className="btn" onClick={() => setStep(0)}>← Quay lại</button>
            <button type="button" className="btn-primary" disabled={!name.trim()} onClick={() => setStep(2)}>Tiếp tục</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="w-full space-y-4">
          <h1 className="text-2xl font-extrabold">Máy tính của bạn là loại nào?</h1>
          <div role="radiogroup" aria-label="Hệ điều hành" className="grid gap-3 sm:grid-cols-2">
            {OS_CHOICES.map((o) => (
              <button key={o.value} type="button" role="radio" aria-checked={os === o.value} onClick={() => setOs(o.value)} className={card(os === o.value)}>
                <span className="block text-xl font-extrabold">{o.title}</span>
                <span className="block text-muted">{o.desc}</span>
                {guessed === o.value && <span className="mt-1 block text-sm text-rose">Mochi đoán máy bạn là loại này</span>}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted">Không chắc? Cứ chọn theo Mochi đoán, sau này đổi lại được trong Cài đặt.</p>
          <div className="flex gap-3">
            <button type="button" className="btn" onClick={() => setStep(1)}>← Quay lại</button>
            <button type="button" className="btn-primary" onClick={() => setStep(3)}>Tiếp tục</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="w-full space-y-4">
          <h1 className="text-2xl font-extrabold">Mỗi ngày bạn muốn học bao lâu?</h1>
          <div role="radiogroup" aria-label="Mục tiêu mỗi ngày" className="grid gap-3 sm:grid-cols-3">
            {GOALS.map((g) => (
              <button key={g.value} type="button" role="radio" aria-checked={goal === g.value} onClick={() => setGoal(g.value)} className={card(goal === g.value)}>
                <span className="block text-xl font-extrabold">{g.title}</span>
                <span className="block text-muted">{g.desc}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" className="btn" onClick={() => setStep(2)}>← Quay lại</button>
            <button type="button" className="btn-primary" onClick={finish}>Vào học thôi! 🎉</button>
          </div>
        </div>
      )}
    </div>
  );
}
