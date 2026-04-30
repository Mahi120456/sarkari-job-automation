function BottomTabBar() {
  const items = ['Home', 'Search', 'Categories', 'Saved', 'Alerts'];
  return <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t grid grid-cols-5 z-40">{items.map((i) => <button key={i} className="min-h-12 text-xs">{i}</button>)}</div>;
}
export default BottomTabBar;
