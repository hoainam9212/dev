import { useT } from '../i18n';

export function Placeholder({ title }: { title?: string }) {
  const t = useT();
  return (
    <section className="card p-8 text-center">
      <h1 className="text-2xl font-black text-rose">{title ?? t.common.notFound}</h1>
      <p className="mt-2 text-muted">{t.common.preparing}</p>
    </section>
  );
}
