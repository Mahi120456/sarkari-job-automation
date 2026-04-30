import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    axios.get(`${API_BASE}/api/articles`).then(({ data }) => setArticles(data.data || []));
  }, []);

  const filtered = useMemo(() => {
    if (!category) return articles;
    return articles.filter((article) => article.category === category);
  }, [articles, category]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <div>
      <Header onCategoryChange={(cat) => { setCategory(cat); setPage(1); }} />
      <main className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3 grid md:grid-cols-2 gap-4">
          {paginated.map((article) => <ArticleCard key={article.id} article={article} />)}
        </section>
        <aside>
          <Sidebar latest={articles.slice(0, 5)} popular={articles.slice(5, 10)} />
        </aside>
      </main>
      <div className="flex justify-center gap-2 pb-8">
        <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

export default HomePage;
