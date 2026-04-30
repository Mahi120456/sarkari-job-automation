import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/articles/${id}`).then(({ data }) => {
      setArticle(data.data);
      return axios.get(`${API_BASE}/api/articles`);
    }).then(({ data }) => {
      setRelated((data.data || []).filter((item) => item.id !== Number(id)).slice(0, 3));
    });
  }, [id]);

  if (!article) return <div className="p-6">Loading...</div>;

  return (
    <article className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-navy">{article.title}</h1>
      <p className="text-sm text-slate-500 mt-2">{new Date(article.created_at).toLocaleString('en-IN')} | {article.category}</p>
      <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: article.content }} />

      <a href={article.apply_link} className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded font-semibold">Apply Now</a>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border text-sm">
          <tbody>
            <tr><td className="border p-2 font-semibold">Last Date</td><td className="border p-2">{article.last_date || 'Refer Notification'}</td></tr>
            <tr><td className="border p-2 font-semibold">Source</td><td className="border p-2">{article.source}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 mt-6">
        <a className="px-3 py-2 bg-green-500 text-white rounded" href={`https://wa.me/?text=${encodeURIComponent(article.title)}`}>WhatsApp</a>
        <a className="px-3 py-2 bg-sky-500 text-white rounded" href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`}>Telegram</a>
        <a className="px-3 py-2 bg-blue-700 text-white rounded" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}>Facebook</a>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-navy mb-4">Related Articles</h2>
        <ul className="list-disc pl-6">
          {related.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul>
      </section>
    </article>
  );
}

export default ArticlePage;
