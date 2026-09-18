export function Placeholder({ title }: { title: string }) {
  return (
    <section className="card p-8 text-center">
      <h1 className="text-2xl font-black text-rose">{title}</h1>
      <p className="mt-2 text-muted">Sakura đang chuẩn bị bài học này… 🌸</p>
    </section>
  );
}
