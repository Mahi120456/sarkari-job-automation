import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ArticleCard from '../components/ArticleCard';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadArticles() {
      try {
        setError('');
        const { data } = await axios.get(`${API_BASE}/api/articles`);
        setArticles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Article fetch failed:', err);
        setError('Unable to load updates right now. Please try again soon.');
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const categories = useMemo(
    () => [...new Set(articles.map((item) => item?.category).filter(Boolean))],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return articles;
    return articles.filter((item) => item?.category === selectedCategory);
  }, [articles, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 text-white p-5 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold">Sarkari Job News & Exam Alerts</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-200">
            Get latest government job notifications, admit cards, results and official updates in one place.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <main className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Latest Updates</h2>
            {selectedCategory && (
              <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                {selectedCategory}
              </span>
            )}
          </div>

          {loading && <p className="text-slate-700">Loading updates...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && filteredArticles.length === 0 && (
            <p className="text-slate-700">No articles found for this category.</p>
          )}

          {!loading && !error && filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </main>

        <div className="lg:col-span-1">
          <Sidebar categories={categories} onCategoryChange={setSelectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
