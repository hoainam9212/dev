import { render, screen } from '@testing-library/react';
import { Mascot } from './Mascot';
import { SpeechBubble } from './SpeechBubble';

it('renders mascot with mood in the accessible label', () => {
  render(<Mascot mood="happy" />);
  expect(screen.getByRole('img', { name: /Sakura happy/ })).toBeInTheDocument();
});

it('renders bubble content', () => {
  render(<SpeechBubble>おはよう！</SpeechBubble>);
  expect(screen.getByText('おはよう！')).toBeInTheDocument();
});
