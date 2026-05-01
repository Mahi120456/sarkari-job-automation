import { Link } from 'react-router-dom';

function Sidebar({ categories = [], onCategoryChange }) {
  return (
    <aside className="space-y-4">
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <h3 className="text-base font-bold text-slate-900 mb-3">Browse Categories</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCategoryChange('')}
            className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm"
          >
            All Updates
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-sm"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <h3 className="text-base font-bold text-slate-900 mb-2">Quick Access</h3>
        <ul className="space-y-2 text-sm">
          <li><Link to="/" className="text-blue-700 hover:underline">Latest Notifications</Link></li>
          <li><Link to="/admin" className="text-blue-700 hover:underline">Publish Article (Admin)</Link></li>
        </ul>
      </section>
    </aside>
  );
}

export default Sidebar;
