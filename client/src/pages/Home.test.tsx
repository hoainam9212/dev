import { act, render, screen } from '@testing-library/react';
import { withLang } from '../test/lang';
import { useSettings } from '../store/settings';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';
import { useProgress } from '../store/progress';

it('shows greeting, streak and xp', () => {
  useProgress.setState({ xp: 150, streak: 4, lastStudyDay: '2026-09-19' });
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(screen.getByRole('img', { name: /Sakura/ })).toBeInTheDocument();
  expect(screen.getByText(/4 ngày/)).toBeInTheDocument();
  expect(screen.getByText(/Cấp 2/)).toBeInTheDocument();
});

it('puts Continue, today\'s review and the BJT books first', () => {
  localStorage.setItem('ns.resume', JSON.stringify({ kind: 'book', bookId: 'q8', testId: 's2', i: 11, title: 'Quyển 8', testTitle: 'セクション2' }));
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  const go = screen.getByRole('link', { name: /Tiếp tục học/ });
  expect(go).toHaveAttribute('href', '/continue');
  expect(go).toHaveTextContent('Quyển 8 · セクション2 · câu 12');
  expect(screen.getByRole('link', { name: /Ôn hôm nay|không còn thẻ/ })).toHaveAttribute('href', '/review');
  expect(screen.getByRole('link', { name: /Sách BJT của tôi/ })).toHaveAttribute('href', '/bjt/sach');
  expect(screen.getByRole('link', { name: /Tất cả bài học/ })).toHaveAttribute('href', '/learn');
  localStorage.removeItem('ns.resume');
});

it('Continue names the lesson page left last', () => {
  localStorage.setItem('ns.resume', JSON.stringify({ kind: 'page', path: '/kanji' }));
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(screen.getByRole('link', { name: /Tiếp tục học/ })).toHaveTextContent('Kanji');
  localStorage.removeItem('ns.resume');
});

it('shows the mascot line in English and re-translates it in place when the language flips', () => {
  useProgress.setState({ xp: 0, streak: 10, lastStudyDay: '2026-09-19' });
  withLang('en');
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(screen.getByText('10 days in a row. Well done!')).toBeInTheDocument();
  expect(screen.getByText(/Rookie/)).toBeInTheDocument();
  act(() => useSettings.getState().setLang('vi'));
  expect(screen.getByText('Đã 10 ngày liên tục. Giỏi lắm!')).toBeInTheDocument();
});
