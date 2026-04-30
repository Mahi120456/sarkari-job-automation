import ArticleCard from './ArticleCard';

function CategorySection({ title, color, articles }) {
  return (
    <section className="my-8">
      <div className={`${color} text-white px-4 py-3 rounded-t-xl flex justify-between`}>
        <h2 className="font-headline text-xl">{title}</h2>
        <button className="bg-white/25 px-3 py-1 rounded">View All</button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 bg-white p-4 rounded-b-xl">
        {articles.slice(0, 6).map((item) => <ArticleCard key={item.id} article={item} />)}
      </div>
    </section>
  );
}
export default CategorySection;
