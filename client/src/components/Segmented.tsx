interface Props<T extends string> {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  ariaLabel?: string;
}

export function Segmented<T extends string>({ value, onChange, options, ariaLabel }: Props<T>) {
  return (
    <div className="inline-flex rounded-full bg-sakura/30 p-1" role="tablist" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            o.value === value ? 'bg-rose text-white shadow' : 'text-text hover:bg-sakura/50'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
