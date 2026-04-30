import { Link } from 'react-router-dom';

const categories = ['Sarkari Naukri', 'Exam', 'Admit Card', 'Result', 'Yojana', 'Update'];

function Header({ onCategoryChange }) {
  return (
    <header className="bg-navy text-white">
      <div className="bg-red-700 text-sm px-4 py-2 whitespace-nowrap overflow-hidden">
        <p className="animate-pulse">Breaking: SSC, UPSC, RRB और IBPS की ताज़ा सरकारी भर्तियों की अपडेट देखें!</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-300">SarkariUpdate.in</Link>
        <input
          type="search"
          placeholder="Search notification..."
          className="w-full md:w-96 px-4 py-2 rounded text-slate-900"
        />
      </div>
      <nav className="bg-saffron">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className="px-4 py-1 bg-white/10 rounded hover:bg-white/20"
            >
              {cat}
            </button>
          ))}
          <button onClick={() => onCategoryChange('')} className="px-4 py-1 bg-white text-slate-900 rounded">All</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
