import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Mochi } from '../components/Mochi';

interface Props {
  children: ReactNode;
  /** Dòng thông báo hiển thị dưới Mochi. Mặc định là thông báo lỗi chung của toàn ứng dụng. */
  message?: string;
  /** Ẩn các nút "Tải lại" / "Về bản đồ" khi boundary chỉ bọc một phần nhỏ của trang (ví dụ trình mô phỏng). */
  showActions?: boolean;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary bắt được lỗi:', error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    const { message = 'Đã có lỗi xảy ra. Rất tiếc vì sự bất tiện này 😿', showActions = true } = this.props;
    return (
      <div className="grid min-h-[200px] place-items-center p-6 text-center">
        <div className="card max-w-md space-y-4 p-6">
          <Mochi mood="sad" size={100} animated={false} />
          <p className="font-semibold">{message}</p>
          {showActions && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
                Tải lại
              </button>
              <button type="button" className="btn" onClick={() => window.location.assign('/')}>
                Về bản đồ
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
