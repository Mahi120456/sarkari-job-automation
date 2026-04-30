function ArticleCard({ article }) {
  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-sm card-lift animate-fadeUp">
      <div className="relative">
        <img src={article.thumbnail || 'https://placehold.co/600x340'} alt={article.title} className="h-44 w-full object-cover" />
        <span className="absolute top-3 left-3 text-xs text-white px-2 py-1 rounded bg-gradient-to-r from-primary to-secondary">{article.category}</span>
        <button className="absolute top-3 right-3 bg-white/85 rounded-full p-2">🔖</button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-12">{article.title}</h3>
        <div className="text-sm text-subtext mt-2 flex justify-between"><span>{new Date(article.created_at).toLocaleDateString('en-IN')}</span><span>1.2k views • 3 min</span></div>
      </div>
    </article>
  );
}
export default ArticleCard;
