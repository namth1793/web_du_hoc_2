import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VI_MONTHS = ['', 'Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'];

function formatArchive(ym) {
  const [year, month] = ym.split('-');
  return `${VI_MONTHS[parseInt(month)]} ${year}`;
}

const CATEGORIES = [
  { label: 'Du học Nhật Bản', href: '/du-hoc/nhat-ban', icon: '🇯🇵' },
  { label: 'Du học Hàn Quốc', href: '/du-hoc/han-quoc', icon: '🇰🇷' },
  { label: 'Du học Đài Loan', href: '/du-hoc/dai-loan', icon: '🇹🇼' },
  { label: 'Du học Nghề Đức', href: '/du-hoc/nghe-duc', icon: '🇩🇪' },
  { label: 'Sự kiện Việt Phát VTI', href: '/su-kien', icon: '🎪' },
  { label: 'Tin tức du học', href: '/tin-tuc', icon: '📰' },
];

export default function Sidebar() {
  const [archive, setArchive] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/articles/archive').then(r => setArchive(r.data || [])).catch(() => {});
  }, []);

  return (
    <aside className="space-y-5">
      {/* Search */}
      <div className="bg-white border border-gray-200 p-4">
        <h3 className="font-bold text-gray-800 text-xs uppercase mb-3 border-l-4 border-havico-blue pl-2">Tìm kiếm</h3>
        <form onSubmit={e => { e.preventDefault(); if (search.trim()) navigate(`/tin-tuc?q=${encodeURIComponent(search)}`); }}>
          <div className="flex">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue"
              placeholder="Nhập từ khóa..." />
            <button type="submit" className="bg-havico-blue text-white px-3 py-2 hover:bg-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Danh mục */}
      <div className="bg-white border border-gray-200 p-4">
        <h3 className="font-bold text-gray-800 text-xs uppercase mb-3 border-l-4 border-havico-blue pl-2">Danh mục</h3>
        <ul className="space-y-0">
          {CATEGORIES.map(c => (
            <li key={c.href}>
              <Link to={c.href} className="flex items-center gap-2 text-sm text-gray-600 hover:text-havico-blue py-2 border-b border-gray-100 last:border-0 transition-colors">
                <span>{c.icon}</span>
                <span>{c.label}</span>
                <svg className="w-3 h-3 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tư vấn miễn phí CTA */}
      <div className="bg-havico-blue text-white p-5 text-center">
        <div className="text-3xl mb-2">🎓</div>
        <h3 className="font-bold mb-2 text-sm">Tư vấn miễn phí</h3>
        <p className="text-xs text-blue-100 mb-4 leading-relaxed">Gặp trực tiếp chuyên gia Việt Phát VTI để được tư vấn chương trình du học phù hợp</p>
        <Link to="/tu-van" className="block bg-white text-havico-blue text-sm font-bold py-2 hover:bg-blue-50 transition-colors">
          Đăng ký ngay
        </Link>
        <div className="mt-3 text-xs text-blue-200">Hotline: 0918 73 83 86</div>
      </div>

      {/* Archive */}
      <div className="bg-white border border-gray-200 p-4">
        <h3 className="font-bold text-gray-800 text-xs uppercase mb-3 border-l-4 border-havico-blue pl-2">Lưu trữ</h3>
        <ul className="space-y-0 max-h-96 overflow-y-auto pr-1">
          {archive.map(a => (
            <li key={a.ym}>
              <Link to={`/tin-tuc?month=${a.ym}`}
                className="flex items-center justify-between text-sm text-gray-600 hover:text-havico-blue py-2 border-b border-gray-100 last:border-0 transition-colors group">
                <span className="group-hover:translate-x-1 transition-transform">› {formatArchive(a.ym)}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5">{a.c}</span>
              </Link>
            </li>
          ))}
          {archive.length === 0 && (
            <li className="text-gray-400 text-sm py-2 text-center">Đang tải...</li>
          )}
        </ul>
      </div>
    </aside>
  );
}
