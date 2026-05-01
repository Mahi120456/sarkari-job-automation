import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AdminPage from './pages/AdminPage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage apiUrl={API_URL} />} />
        <Route path="/article/:id/:slug" element={<ArticlePage apiUrl={API_URL} />} />
        <Route path="/admin" element={<AdminPage apiUrl={API_URL} />} />
      </Routes>
    </>
  );
}

export default App;
