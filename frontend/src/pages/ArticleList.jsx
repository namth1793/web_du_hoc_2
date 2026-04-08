import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const SUBCATEGORY_LABELS = {
  'nhat-ban': 'Du học Nhật Bản',
  'han-quoc': 'Du học Hàn Quốc',
  'dai-loan': 'Du học Đài Loan',
  'nghe-duc': 'Du học Nghề Đức',
  'su-kien': 'Sự kiện Việt Phát VTI',
  'tin-tuc': 'Tin tức du học',
};

const VI_MONTHS = ['', 'Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'];

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

export default function ArticleList({ section }) {
  const { subcategory } = useParams();
  const [searchParams] = useSearchParams();
  const monthFilter = searchParams.get('month');

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 10;

  const effectiveSubcategory = subcategory || (section === 'su-kien' ? 'su-kien' : 'tin-tuc');

  useEffect(() => {
    setLoading(true);
    setPage(1);
  }, [subcategory, section, monthFilter]);

  useEffect(() => {
    const params = { page, limit: LIMIT };
    if (section === 'du-hoc') {
      params.section = 'du-hoc';
      if (subcategory) params.subcategory = subcategory;
    } else {
      params.section = section;
    }

    axios.get('/api/articles', { params })
      .then(r => { setArticles(r.data.articles || []); setTotal(r.data.total || 0); })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [section, subcategory, page, monthFilter]);

  const label = SUBCATEGORY_LABELS[subcategory] || SUBCATEGORY_LABELS[section] || 'Bài viết';
  const totalPages = Math.ceil(total / LIMIT);

  const monthLabel = () => {
    if (!monthFilter) return null;
    const [year, month] = monthFilter.split('-');
    return `${VI_MONTHS[parseInt(month)]} ${year}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1">
          <Link to="/" className="hover:text-havico-blue">Trang chủ</Link>
          <span>›</span>
          <span className="text-navy-900 font-medium">{label}</span>
          {monthLabel() && <><span>›</span><span className="text-navy-900 font-medium">{monthLabel()}</span></>}
        </nav>

        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Page title */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-gold rounded" />
              <div>
                <h1 className="text-lg font-bold text-navy-900">{label}</h1>
                {monthLabel() && <p className="text-xs text-gray-500">Lưu trữ: {monthLabel()}</p>}
                <p className="text-xs text-gray-400">{total} bài viết</p>
              </div>
            </div>

            {/* Article list */}
            {loading ? (
              <div className="space-y-4">
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 flex gap-4 animate-pulse">
                    <div className="w-32 h-24 bg-gray-200 rounded flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center text-gray-400">
                <div className="text-4xl mb-3">📭</div>
                <p className="font-medium">Chưa có bài viết nào</p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map(a => (
                  <Link key={a.id} to={`/bai-viet/${a.id}`}
                    className="bg-white rounded-lg border border-gray-100 p-4 flex gap-4 card-hover block group">
                    <div className="w-36 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      {a.cover_image
                        ? <img src={a.cover_image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <div className="w-full h-full flex items-center justify-center text-3xl">📄</div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-navy-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-havico-blue transition-colors">
                        {a.title}
                      </h2>
                      <p className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                        <span>📅 {formatDate(a.published_at)}</span>
                        <span>✍️ {a.author}</span>
                      </p>
                      {a.excerpt && (
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{a.excerpt}</p>
                      )}
                      <span className="inline-block mt-2 text-havico-blue text-xs font-semibold">Xem chi tiết →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  className="px-3 py-2 text-sm rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition-colors">
                  ‹ Trước
                </button>
                {Array.from({length: totalPages}).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 text-sm border transition-colors ${page === i + 1 ? 'bg-havico-blue text-white border-havico-blue' : 'border-gray-300 hover:bg-gray-100 text-gray-600'}`}>
                    {i + 1}
                  </button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                  className="px-3 py-2 text-sm rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition-colors">
                  Sau ›
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-72 flex-shrink-0 hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
