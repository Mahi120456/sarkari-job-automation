function MainHeader({ query, setQuery }) {
  return (
    <header className="bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 relative">
        <div className="flex items-center justify-between gap-3">
          <div className="font-headline text-2xl md:text-4xl text-primary shrink-0">SarkariUpdate.in</div>
          <button className="text-2xl shrink-0 min-h-12 min-w-12" aria-label="notifications">🔔</button>
        </div>

        <div className="mt-3 md:mt-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:w-[min(42rem,56vw)]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notifications..."
            className="w-full px-4 py-3 border rounded-full box-border"
            style={{ boxSizing: 'border-box' }}
          />
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
