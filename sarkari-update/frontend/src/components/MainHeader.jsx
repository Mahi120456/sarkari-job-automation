function MainHeader({ query, setQuery }) {
  return (
    <div className="bg-card px-4 py-4 shadow-sm flex items-center gap-4 md:gap-8">
      <div className="font-headline text-2xl md:text-4xl text-primary">SarkariUpdate.in</div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notifications..." className="flex-1 border rounded-full px-5 py-3" />
      <button className="text-2xl">🔔</button>
    </div>
  );
}
export default MainHeader;
