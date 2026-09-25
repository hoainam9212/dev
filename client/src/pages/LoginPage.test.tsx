import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { withLang } from '../test/lang';

it('shows the sign-in form in English', () => {
  withLang('en');
  render(<MemoryRouter><LoginPage /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
});

it('shows the register form in English', () => {
  withLang('en');
  render(<MemoryRouter><LoginPage mode="register" /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Sign up' })).toBeInTheDocument();
  expect(screen.getByLabelText('Display name')).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  expect(screen.getByText('(at least 8 characters)')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Create account' })).toBeInTheDocument();
});

it('keeps the Vietnamese form by default', () => {
  render(<MemoryRouter><LoginPage /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument();
  expect(screen.getByLabelText('Mật khẩu')).toBeInTheDocument();
});
