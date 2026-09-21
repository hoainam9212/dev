import type { ReactNode } from 'react';

/**
 * Trang giấy A4 (210×297mm). Bề rộng 794px là khổ A4 ở 96 dpi; lề trong 2,5cm
 * quy ra ~94px. Trên màn hình hẹp trang co lại theo `max-w-full` chứ không đẩy
 * ra ngoài màn hình.
 */
export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center rounded-3xl bg-muted/10 p-3 sm:p-6">
      <div
        data-help-id="word.page"
        className="w-full max-w-[794px] rounded-lg bg-white px-6 py-8 shadow-lg sm:px-[94px] sm:py-[94px] print:shadow-none"
        style={{ minHeight: '60vh' }}
      >
        {children}
      </div>
    </div>
  );
}
