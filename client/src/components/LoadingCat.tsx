import { Mascot } from './Mascot';

export function LoadingCat({ text = 'Sakura đang tải dữ liệu…' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-10 text-muted" role="status">
      <Mascot mood="sleepy" size={100} />
      <p className="font-bold">{text}</p>
    </div>
  );
}

export function ErrorCat({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-10" role="alert">
      <Mascot mood="sad" size={100} />
      <p className="font-bold text-rose">{text}</p>
      <p className="text-sm text-muted">Hãy chạy `npm run data:fetch` và `npm run data:build` rồi tải lại trang.</p>
    </div>
  );
}
