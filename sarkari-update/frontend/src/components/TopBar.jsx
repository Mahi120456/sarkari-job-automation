function TopBar({ dark, toggleDark }) {
  const date = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <div className="bg-secondary text-white text-xs md:text-sm py-2 px-4 flex justify-between">
      <span>{date}</span>
      <div className="flex items-center gap-3">
        <span>FB</span><span>TW</span><span>YT</span>
        <button onClick={toggleDark} className="px-2 py-1 rounded bg-white/20 min-h-12">{dark ? '☀️' : '🌙'}</button>
      </div>
    </div>
  );
}
export default TopBar;
