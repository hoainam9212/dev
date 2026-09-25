import { render, screen } from '@testing-library/react';
import { LoadingCat, ErrorCat } from './LoadingCat';
import { withLang } from '../test/lang';

it('uses English default texts', () => {
  withLang('en');
  render(
    <>
      <LoadingCat />
      <ErrorCat text="boom" />
    </>,
  );
  expect(screen.getByRole('status')).toHaveTextContent('Sakura is loading data…');
  expect(screen.getByRole('alert')).toHaveTextContent(/Run `npm run data:fetch`/);
});
