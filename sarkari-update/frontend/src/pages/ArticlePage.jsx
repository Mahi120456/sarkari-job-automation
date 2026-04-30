import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  useEffect(() => { axios.get(`${API_BASE}/api/articles/${id}`).then((res) => setArticle(res.data.data)); }, [id]);
  if (!article) return <div className="max-w-5xl mx-auto p-8"><div className="skeleton h-80" /></div>;

  return (
    <article className="max-w-5xl mx-auto p-4 md:p-8">
      <img src={article.thumbnail || 'https://placehold.co/1400x600'} className="w-full h-80 object-cover rounded-2xl" />
      <h1 className="font-headline text-4xl mt-6">{article.title}</h1>
      <p className="text-subtext mt-2">By Team SarkariUpdate • {new Date(article.created_at).toLocaleDateString('en-IN')} • 120 Shares</p>
      <div className="my-6 p-4 bg-amber-50 rounded-xl border-l-4 border-primary"><h3 className="font-bold">Table of Contents</h3><ul className="list-disc pl-6"><li>Overview</li><li>Important Dates</li><li>How to Apply</li></ul></div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
      <div className="my-6 bg-green-50 border border-green-200 rounded-xl p-4"><h3 className="font-bold">Important Dates</h3><table className="w-full mt-2"><tbody><tr><td className="py-2">Last Date</td><td>{article.last_date || 'Official notice देखें'}</td></tr></tbody></table></div>
      <a className="md:static fixed bottom-16 md:bottom-auto left-4 right-4 md:left-auto md:right-auto text-center bg-red-600 text-white py-4 rounded-xl min-h-12" href={article.apply_link}>Apply Now</a>
      <section className="mt-10"><h3 className="text-2xl font-bold">Comments</h3><textarea className="w-full border rounded-lg p-3 mt-3 min-h-28" placeholder="अपनी राय लिखें..." /></section>
    </article>
  );
}

export default ArticlePage;
