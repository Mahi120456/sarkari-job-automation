import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gradient-to-r from-orange-600 via-red-600 to-red-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium">भारत की ताज़ा सरकारी नौकरी, रिजल्ट और एडमिट कार्ड अपडेट</p>
        <p className="opacity-90">Trusted Sarkari News Portal</p>
      </div>
      <div className="bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="text-xl sm:text-2xl font-extrabold tracking-tight text-red-700">
            Sarkari Update
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
            <Link to="/" className="px-3 py-1.5 rounded-md hover:bg-slate-100">Home</Link>
            <Link to="/admin" className="px-3 py-1.5 rounded-md hover:bg-slate-100">Admin</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
