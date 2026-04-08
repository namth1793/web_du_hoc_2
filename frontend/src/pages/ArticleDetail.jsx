import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return `${String(d.getDate()).padStart(2,'0')} tháng ${d.getMonth()+1}, ${d.getFullYear()}`;
}

const SUBCATEGORY_LABELS = {
  'nhat-ban': 'Du học Nhật Bản',
  'han-quoc': 'Du học Hàn Quốc',
  'dai-loan': 'Du học Đài Loan',
  'nghe-duc': 'Du học Nghề Đức',
  'su-kien': 'Sự kiện',
  'tin-tuc': 'Tin tức',
};

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setLoading(true); setErr(false);
    axios.get(`/api/articles/${id}`)
      .then(r => setArticle(r.data))
      .catch(() => setErr(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
          {Array.from({length: 5}).map((_, i) => <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />)}
        </div>
        <div className="w-72 hidden lg:block"><div className="h-96 bg-gray-200 rounded animate-pulse" /></div>
      </div>
    );
  }

  if (err || !article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-navy-900 mb-2">Không tìm thấy bài viết</h2>
        <Link to="/" className="btn-primary">Về trang chủ</Link>
      </div>
    );
  }

  const catHref = article.section === 'du-hoc' ? `/du-hoc/${article.subcategory}` : `/${article.section}`;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-havico-blue">Trang chủ</Link>
          <span>›</span>
          <Link to={catHref} className="hover:text-havico-blue">{SUBCATEGORY_LABELS[article.subcategory] || article.section}</Link>
          <span>›</span>
          <span className="text-navy-900 font-medium line-clamp-1">{article.title}</span>
        </nav>

        <div className="flex gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">
            <article className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
              {/* Cover */}
              {article.cover_image && (
                <div className="h-64 md:h-80 overflow-hidden">
                  <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Category badge */}
                <div className="mb-4">
                  <Link to={catHref} className="inline-block bg-blue-100 text-havico-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {SUBCATEGORY_LABELS[article.subcategory] || article.section}
                  </Link>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-black text-navy-900 leading-tight mb-4">{article.title}</h1>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 pb-6 border-b border-gray-100">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    {formatDate(article.published_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    {article.author}
                  </span>
                </div>

                {/* Excerpt */}
                {article.excerpt && (
                  <div className="bg-blue-50 border-l-4 border-havico-blue p-4 rounded-r-lg mb-6 italic text-gray-600 text-sm leading-relaxed">
                    {article.excerpt}
                  </div>
                )}

                {/* Content */}
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Share */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-gray-600">Chia sẻ:</span>
                  {['Facebook', 'Twitter', 'Zalo'].map(s => (
                    <button key={s} className="text-xs px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50 transition-colors text-gray-600">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </article>

            {/* Related */}
            {article.related?.length > 0 && (
              <div className="mt-8">
                <div className="section-title">Bài viết liên quan</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.related.map(r => (
                    <Link key={r.id} to={`/bai-viet/${r.id}`}
                      className="bg-white rounded-lg border border-gray-100 p-3 flex gap-3 card-hover group">
                      <div className="w-20 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                        {r.cover_image && <img src={r.cover_image} alt={r.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy-900 line-clamp-2 group-hover:text-havico-blue transition-colors leading-snug">{r.title}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{formatDate(r.published_at)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
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
