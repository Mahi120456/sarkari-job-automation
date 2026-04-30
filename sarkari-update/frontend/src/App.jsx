import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AdminPage from './pages/AdminPage';

function App() {
  return <Routes><Route path="/" element={<HomePage />} /><Route path="/article/:id/:slug" element={<ArticlePage />} /><Route path="/admin" element={<AdminPage />} /></Routes>;
}

export default App;
