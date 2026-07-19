interface DummyPageProps {
  title: string;
}

export default function DummyPage({ title }: DummyPageProps) {
  return (
    <section className="dummy-page" aria-labelledby="dummy-page-title">
      <h1 id="dummy-page-title">{title}</h1>
      <p>This is a dummy page for navigation testing.</p>
    </section>
  );
}
