import { render, screen, fireEvent } from '@testing-library/react';
import { Shadowing, pickShadowing, moodForScore } from './Shadowing';
import { xpForScore } from '../../components/SpeakButton';
import { clearContentCache } from '../../content/loader';
import { useProgress } from '../../store/progress';

const sentences = [
  { id: 's-1', level: 'N5', ja: '猫が好きです。', en: 'I like cats.' },
  { id: 's-2', level: 'N5', ja: '犬', en: 'dog' }, // too short
  { id: 's-3', level: 'N5', ja: '今日はいい天気ですね。', en: 'Nice weather today.' },
];

it('pickShadowing keeps only sentences of a sensible length', () => {
  expect(pickShadowing(sentences as never, 10).map((s) => s.id).sort()).toEqual(['s-1', 's-3']);
  expect(moodForScore(90)).toBe('happy');
  expect(xpForScore(75)).toBe(3);
  expect(xpForScore(50)).toBe(1);
  expect(xpForScore(10)).toBe(0);
});

it('falls back to self-assessment without speech recognition and scores the session', async () => {
  clearContentCache();
  useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(sentences)));
  render(<Shadowing level="N5" total={2} />);
  expect(await screen.findByText(/Câu 1 \/ 2/)).toBeInTheDocument();
  expect(screen.getByTestId('self-assess')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Nói được/ }));
  expect(screen.getByText(/100 điểm/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Câu tiếp/ }));
  fireEvent.click(screen.getByRole('button', { name: /Chưa được/ }));
  fireEvent.click(screen.getByRole('button', { name: /Câu tiếp/ }));
  expect(screen.getByTestId('shadowing-result')).toHaveTextContent('65');
  expect(useProgress.getState().xp).toBe(3);
  vi.restoreAllMocks();
});
