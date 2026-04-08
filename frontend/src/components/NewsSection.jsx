import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CATEGORIES = [
  { label: 'Du học Nhật Bản', slug: 'nhat-ban' },
  { label: 'Du học Hàn Quốc', slug: 'han-quoc' },
  { label: 'Du học Đức', slug: 'nghe-duc' },
  { label: 'Du học Singapore', slug: 'singapore' },
  { label: 'Du học Đài Loan', slug: 'dai-loan' },
];

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

export default function NewsSection() {
  const [activeSlug, setActiveSlug] = useState('nhat-ban');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/articles?section=du-hoc&subcategory=${activeSlug}&limit=6`)
      .then(r => setArticles(r.data.articles || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [activeSlug]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Tin tức du học</h2>
          <Link to={`/du-hoc/${activeSlug}`} className="text-havico-blue text-xs font-semibold hover:underline">
            Xem thêm →
          </Link>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map(c => (
            <button
              key={c.slug}
              onClick={() => setActiveSlug(c.slug)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                activeSlug === c.slug
                  ? 'bg-havico-blue text-white border-havico-blue'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-havico-blue hover:text-havico-blue'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
          {loading && Array.from({length: 4}).map((_, i) => (
            <div key={i} className="flex gap-4 p-4">
              <div className="w-24 bg-gray-100 rounded animate-pulse" style={{height:'72px'}} />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
              </div>
            </div>
          ))}

          {!loading && articles.map(n => (
            <Link key={n.id} to={`/bai-viet/${n.id}`}
              className="flex gap-4 p-4 hover:bg-blue-50 transition-colors group">
              <div className="w-24 flex-shrink-0 rounded overflow-hidden bg-gray-100" style={{height:'72px'}}>
                {n.cover_image
                  ? <img src={n.cover_image} alt={n.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl">📰</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-navy-900 line-clamp-2 group-hover:text-havico-blue transition-colors leading-snug mb-1">
                  {n.title}
                </h3>
                <p className="text-gray-400 text-xs mb-1">{formatDate(n.published_at)}</p>
                {n.excerpt && (
                  <p className="text-gray-500 text-xs line-clamp-1 leading-relaxed">{n.excerpt}</p>
                )}
              </div>
            </Link>
          ))}

          {!loading && articles.length === 0 && (
            <div className="p-8 text-center text-gray-400 text-sm">Chưa có bài viết nào.</div>
          )}
        </div>
      </div>
    </section>
  );
}
