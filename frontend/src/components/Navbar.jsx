import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const NAV_ITEMS = [
  { label: 'Giới thiệu', href: '/#ve-vti' },
  { label: 'Du học Nhật Bản', href: '/du-hoc/nhat-ban' },
  { label: 'Du học Hàn Quốc', href: '/du-hoc/han-quoc' },
  { label: 'Du học Đức', href: '/du-hoc/nghe-duc' },
  { label: 'Du học Singapore', href: '/du-hoc/singapore' },
  { label: 'Du học Đài Loan', href: '/du-hoc/dai-loan' },
  { label: 'Du học Úc', href: '/du-hoc/uc' },
  { label: 'Sự kiện', href: '/su-kien' },
  { label: 'Tư vấn', href: '/tu-van' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) { navigate(`/tin-tuc?q=${encodeURIComponent(search)}`); setShowSearch(false); setSearch(''); }
  };

  return (
    <header className="sticky top-0 z-50">

      {/* Main Nav */}
      <nav className="bg-havico-blue shadow-md">
        <div className="max-w-7xl mx-auto px-2 flex items-center h-20 gap-10">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-4 flex-shrink-0">
            <img src={logo} alt="Việt Phát VTI" className="h-14 w-auto object-contain" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
          </Link>

          {/* Desktop Nav - flat links */}
          <div className="hidden lg:flex items-center flex-1 overflow-x-auto gap-1">
            {NAV_ITEMS.map((item, i) => (
              <Link key={i} to={item.href}
                className="px-2.5 py-2 text-xs font-semibold text-white hover:text-yellow-300 transition-colors whitespace-nowrap uppercase tracking-wide">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center ml-auto">
            {showSearch ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
                  className="bg-white/20 text-white placeholder-blue-200 px-3 py-1.5 text-sm outline-none border border-white/30 w-36"
                  placeholder="Tìm kiếm..." />
                <button type="submit" className="bg-white text-havico-blue px-3 py-1.5 hover:bg-blue-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </button>
              </form>
            ) : (
              <button onClick={() => setShowSearch(true)} className="text-white hover:text-yellow-300 transition-colors p-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden ml-auto text-white p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-blue-800 border-t border-blue-700 px-4 py-3 space-y-1">
            <div className="text-xs text-blue-200 py-2 border-b border-blue-700 mb-2">
              📞 0918 73 83 86 (Mr Tài) &nbsp;|&nbsp; 0971 074 966 (Mr Đình)
            </div>
            {NAV_ITEMS.map((item, i) => (
              <Link key={i} to={item.href} onClick={() => setMobileOpen(false)}
                className="block text-white py-2 px-3 hover:bg-blue-700 text-sm font-medium uppercase">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
