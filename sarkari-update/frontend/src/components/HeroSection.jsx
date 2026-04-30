function HeroSection({ featured, latest = [] }) {
  if (!featured) return <div className="skeleton h-80" />;
  return (
    <section className="grid lg:grid-cols-3 gap-4 my-4">
      <article className="lg:col-span-2 relative rounded-2xl overflow-hidden card-lift">
        <img src={featured.thumbnail || 'https://placehold.co/1200x700'} className="h-[360px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="bg-red-600 text-xs px-2 py-1 rounded">LIVE</span>
          <h1 className="font-headline text-3xl mt-2">{featured.title}</h1>
        </div>
      </article>
      <div className="space-y-3">
        {latest.slice(0, 3).map((item) => <article key={item.id} className="bg-card rounded-xl p-4 card-lift"><h3 className="font-semibold line-clamp-2">{item.title}</h3></article>)}
      </div>
    </section>
  );
}
export default HeroSection;
