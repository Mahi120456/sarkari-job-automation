import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadArticle() {
      try {
        setError('');
        const { data } = await axios.get(`${API_BASE}/api/articles/${id}`);
        setArticle(data || null);
      } catch (err) {
        console.error('Article fetch failed:', err);
        setError('Unable to load this article at the moment.');
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Link to="/" className="text-blue-700 hover:underline text-sm">← Back to Home</Link>

        {loading && <p className="mt-4">Loading article...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {!loading && !error && !article && <p className="mt-4">Article not found.</p>}

        {!loading && !error && article && (
          <article className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                {article.category || 'General'}
              </span>
              {article.last_date && <span className="text-xs text-slate-500">Last Date: {article.last_date}</span>}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{article.title}</h1>
            <p className="text-slate-700 whitespace-pre-line leading-relaxed">{article.content || 'No content available.'}</p>

            {article.apply_link && (
              <a
                href={article.apply_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Apply Now
              </a>
            )}
          </article>
        )}
      </main>
    </div>
  );
}

export default ArticlePage;
