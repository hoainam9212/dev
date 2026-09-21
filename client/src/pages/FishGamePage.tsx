import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fishGame } from '@office-neko/shared';
import { FISH_WORDS } from '../content/fish-words';
import { FishSim } from '../sims/fish/FishSim';
import { useOs } from '../db/profile';

export function FishGamePage() {
  const os = useOs();
  const [round, setRound] = useState(0);
  const [caught, setCaught] = useState(0);
  const [over, setOver] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 pb-24">
      <div className="flex items-center gap-3">
        <Link to="/typing" className="btn">← Luyện gõ</Link>
        <h1 className="text-2xl font-extrabold">🐟 Mèo bắt cá</h1>
      </div>
      <FishSim
        key={round}
        initial={fishGame.fishInitial(FISH_WORDS, Date.now() >>> 0)}
        onState={(s) => {
          setCaught(s.caught);
          setOver(s.over);
        }}
        os={os}
        spotlight={null}
      />
      {over && (
        <div className="card flex flex-wrap items-center gap-3 p-4">
          <p className="font-bold">Lượt vừa rồi bắt được {caught} con cá.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setRound((r) => r + 1);
              setOver(false);
            }}
          >
            Chơi lại
          </button>
        </div>
      )}
    </div>
  );
}
