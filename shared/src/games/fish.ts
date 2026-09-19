export interface Fish {
  id: number;
  word: string;
  x: number;
  y: number;
}

export interface FishState {
  words: string[];
  level: number;
  lives: number;
  score: number;
  caught: number;
  fish: Fish[];
  input: string;
  nextId: number;
  spawnIn: number;
  seed: number;
  over: boolean;
}

export type FishAction = { type: 'tick'; dt: number } | { type: 'key'; key: string };

export const fallSpeed = (level: number) => 0.00006 + 0.00002 * (level - 1);
export const spawnInterval = (level: number) => Math.max(900, 2600 - 250 * (level - 1));

function rand(seed: number): [number, number] {
  const next = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return [next / 2 ** 32, next];
}

export function fishInitial(words: string[], seed = 1): FishState {
  return { words, level: 1, lives: 3, score: 0, caught: 0, fish: [], input: '', nextId: 1, spawnIn: 0, seed, over: false };
}

export function targetFish(s: FishState): Fish | undefined {
  if (!s.input) return undefined;
  return s.fish.filter((f) => f.word.startsWith(s.input)).sort((a, b) => b.y - a.y)[0];
}

function spawn(s: FishState): FishState {
  const [r1, s1] = rand(s.seed);
  const [r2, s2] = rand(s1);
  const word = s.words[Math.floor(r1 * s.words.length)] ?? 'meo';
  const fish: Fish = { id: s.nextId, word, x: 0.08 + r2 * 0.84, y: 0 };
  return { ...s, fish: [...s.fish, fish], nextId: s.nextId + 1, seed: s2, spawnIn: spawnInterval(s.level) };
}

export function reduceFish(s: FishState, a: FishAction): FishState {
  if (s.over) return s;
  if (a.type === 'tick') {
    const target = targetFish(s);
    const moved = s.fish.map((f) => ({ ...f, y: f.y + fallSpeed(s.level) * a.dt }));
    const landed = moved.filter((f) => f.y >= 1);
    const lives = s.lives - landed.length;
    let next: FishState = {
      ...s,
      fish: moved.filter((f) => f.y < 1),
      lives,
      input: target && landed.some((f) => f.id === target.id) ? '' : s.input,
      spawnIn: s.spawnIn - a.dt,
      over: lives <= 0,
    };
    if (!next.over && next.spawnIn <= 0) next = spawn(next);
    return next;
  }
  if (a.key === 'Backspace') return { ...s, input: s.input.slice(0, -1) };
  if (a.key === 'Enter' || a.key === 'Escape') return { ...s, input: '' };
  if (a.key.length !== 1 || !/[a-z0-9]/i.test(a.key)) return s;
  const input = s.input + a.key.toLowerCase();
  const hit = s.fish.find((f) => f.word === input);
  if (!hit) return { ...s, input };
  const caught = s.caught + 1;
  return {
    ...s,
    input: '',
    fish: s.fish.filter((f) => f.id !== hit.id),
    caught,
    score: s.score + hit.word.length * 10 * s.level,
    level: 1 + Math.floor(caught / 8),
  };
}
