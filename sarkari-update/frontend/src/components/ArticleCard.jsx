import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
          {article.category || 'General'}
        </span>
        {article.last_date && (
          <span className="text-xs text-slate-500">Last Date: {article.last_date}</span>
        )}
      </div>

      <h2 className="text-lg sm:text-xl font-bold leading-snug text-slate-900">
        {article.title || 'Untitled Notification'}
      </h2>

      <p className="text-sm sm:text-base text-slate-700 line-clamp-3">
        {article.content || 'No details available right now.'}
      </p>

      <div className="flex items-center justify-between gap-3">
        <Link to={`/article/${article.id}`} className="text-blue-700 font-semibold hover:underline">
          Read Full Details
        </Link>
        {article.source && (
          <span className="text-xs text-slate-500 truncate">Source: {article.source}</span>
        )}
      </div>
    </article>
  );
}

export default ArticleCard;
