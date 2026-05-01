import { categories } from '../data/categories';

function NavBar({ setActive, active }) {
  return (
    <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button key={cat.name} onClick={() => setActive(cat.name)} className={`px-4 py-2 rounded-full whitespace-nowrap ${active === cat.name ? 'bg-primary text-white' : 'bg-slate-100'}`}>
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
export default NavBar;
