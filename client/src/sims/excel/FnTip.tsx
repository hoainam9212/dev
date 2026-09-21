import { activeFn } from '../../content/fnHelp';

/**
 * Thẻ cú pháp hiện khi đang gõ `=TÊNHÀM(`: tên hàm, danh sách đối số với đối số
 * đang gõ IN ĐẬM, giải nghĩa tiếng Việt và một ví dụ. Đây là chỗ dạy học chính
 * của bảng tính — người mới không phải nhớ thứ tự đối số.
 */
export function FnTip({ text }: { text: string }) {
  const found = activeFn(text);
  if (!found) return null;
  const { help, argIndex } = found;
  const current = help.args[argIndex];

  return (
    <div className="rounded-xl border border-black/10 bg-white p-2 text-xs shadow-sm" role="status">
      <p className="font-mono">
        {help.name}(
        {help.args.map((arg, i) => (
          <span key={arg.name}>
            <span data-testid={`fn-arg-${i}`} className={i === argIndex ? 'font-bold text-excel-ink' : 'text-muted'}>
              {arg.name}
            </span>
            {i < help.args.length - 1 ? ', ' : ''}
          </span>
        ))}
        )
      </p>
      <p className="mt-1">{help.desc}</p>
      {current ? <p className="mt-1"><b>{current.name}</b>: {current.desc}</p> : null}
      <p className="mt-1 font-mono text-muted">Ví dụ: {help.example}</p>
    </div>
  );
}
