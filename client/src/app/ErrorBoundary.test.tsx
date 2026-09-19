import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

function Boom(): never {
  throw new Error('boom');
}

describe('ErrorBoundary', () => {
  it('renders the fallback (sad Mochi + message + actions) when a child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('img', { name: 'Mochi sad' })).toBeInTheDocument();
    expect(screen.getByText(/Đã có lỗi xảy ra/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tải lại' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Về bản đồ' })).toBeInTheDocument();
    spy.mockRestore();
  });

  it('renders children normally when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>Xin chào</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Xin chào')).toBeInTheDocument();
  });

  it('uses a custom message and hides actions when asked', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary message="Trình mô phỏng gặp lỗi… Hãy thử tải lại trang." showActions={false}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/Trình mô phỏng gặp lỗi/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Tải lại' })).not.toBeInTheDocument();
    spy.mockRestore();
  });

  it('reload button reloads the page', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const reload = vi.fn();
    const original = window.location;
    Object.defineProperty(window, 'location', { value: { ...original, reload }, writable: true });
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Tải lại' }));
    expect(reload).toHaveBeenCalled();
    Object.defineProperty(window, 'location', { value: original, writable: true });
    spy.mockRestore();
  });
});
