import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import Sidebar from '../components/Sidebar';
import CategorySection from '../components/CategorySection';
import BottomTabBar from '../components/BottomTabBar';
import { categories } from '../data/categories';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Sarkari Naukri');
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => { axios.get(`${API_BASE}/api/articles`).then((res) => setArticles(res.data.data || [])); }, []);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);

  const filtered = useMemo(() => articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase())), [articles, query]);

  return (
    <div className="min-h-screen pb-16 md:pb-0 dark:bg-slate-900 dark:text-white">
      <div className="bg-red-700 text-white py-2 overflow-hidden"><p className="animate-ticker whitespace-nowrap">Breaking News: Latest सरकारी भर्ती, परीक्षा, रिजल्ट और एडमिट कार्ड अपडेट लाइव।</p></div>
      <TopBar dark={dark} toggleDark={() => setDark(!dark)} />
      <MainHeader query={query} setQuery={setQuery} />
      <NavBar active={activeCategory} setActive={setActiveCategory} />

      <div className="max-w-7xl mx-auto px-4">
        <HeroSection featured={filtered[0]} latest={filtered.slice(1, 4)} />
        <div className="grid lg:grid-cols-4 gap-6">
          <main className="lg:col-span-3">
            {categories.map((cat) => (
              <CategorySection
                key={cat.name}
                title={cat.name}
                color={cat.color}
                articles={filtered.filter((a) => a.category === cat.name)}
              />
            ))}
          </main>
          <aside><Sidebar posts={filtered} /></aside>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}

export default HomePage;
