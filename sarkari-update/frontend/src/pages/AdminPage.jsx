import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_KEY = import.meta.env.VITE_API_KEY || 'changeme';

const initialForm = {
  title: '',
  content: '',
  category: '',
  source: '',
  apply_link: '',
  last_date: ''
};

function AdminPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      await axios.post(`${API_BASE}/api/articles/add`, form, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      setMessage('Article published successfully.');
      setForm(initialForm);
    } catch (err) {
      console.error('Article publish failed:', err);
      setMessage('Publish failed. Please verify API key and backend URL.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Publishing Panel</h1>
          <p className="text-sm text-slate-600 mb-4">Post new government job updates quickly.</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {Object.keys(initialForm).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor={field}>
                  {field.replace('_', ' ').toUpperCase()}
                </label>
                <input
                  id={field}
                  name={field}
                  value={form[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.replace('_', ' ')}`}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
            >
              {submitting ? 'Publishing...' : 'Publish Update'}
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-slate-800">{message}</p>}
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
