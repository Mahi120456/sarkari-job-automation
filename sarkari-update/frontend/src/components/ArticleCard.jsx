import { Link } from 'react-router-dom';

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function ArticleCard({ article }) {
  return (
    <article className="news-card">
      <img src={article.thumbnail || 'https://placehold.co/640x360'} alt={article.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <span className="inline-block text-xs px-2 py-1 rounded bg-navy text-white">{article.category}</span>
        <h2 className="mt-2 text-lg font-semibold">
          <Link to={`/article/${article.id}/${slugify(article.title)}`} className="hover:text-saffron">{article.title}</Link>
        </h2>
        <p className="text-sm text-slate-500 mt-1">{new Date(article.created_at).toLocaleDateString('en-IN')}</p>
      </div>
    </article>
  );
}

export default ArticleCard;
