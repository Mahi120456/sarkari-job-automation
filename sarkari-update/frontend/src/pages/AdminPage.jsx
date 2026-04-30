import { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function AdminPage() {
  const [token, setToken] = useState('');
  const [form, setForm] = useState({ title: '', content: '', category: '', source: '', apply_link: '', last_date: '' });

  async function login() {
    const { data } = await axios.post(`${API_BASE}/api/admin/login`, { username: 'admin', password: 'admin123' });
    setToken(data.token);
  }

  async function addArticle() {
    await axios.post(`${API_BASE}/api/articles/add`, form, { headers: { 'x-api-key': import.meta.env.VITE_API_KEY || 'changeme' } });
    alert('Article added');
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <button onClick={login} className="bg-navy text-white px-4 py-2 rounded">Login (Demo)</button>
      <p className="text-xs break-all">JWT: {token}</p>
      <div className="grid gap-2">
        {Object.keys(form).map((field) => (
          <input key={field} placeholder={field} className="border p-2 rounded" onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
        ))}
      </div>
      <button onClick={addArticle} className="bg-saffron text-white px-4 py-2 rounded">Add Article</button>
    </div>
  );
}

export default AdminPage;
