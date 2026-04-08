import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

export default function EventsGrid() {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('/api/articles/featured').then(r => {
      setEvents(r.data.events || []);
      setNews(r.data.news || []);
    }).catch(() => {});
  }, []);

  const featured = events.slice(0, 3);
  const small = [...events.slice(3), ...news].slice(0, 9);

  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-1">
          <div className="section-label-orange mb-0">Sự kiện nổi bật</div>
          <Link to="/su-kien" className="text-havico-blue text-xs font-semibold hover:underline">Xem tất cả →</Link>
        </div>
        <div className="mb-5" />

        {/* 3 large featured cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {(featured.length > 0 ? featured : Array.from({length:3})).map((e, i) => (
            e ? (
              <Link key={e.id} to={`/bai-viet/${e.id}`}
                className="group block overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden" style={{height:'160px'}}>
                  {e.cover_image
                    ? <img src={e.cover_image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    : <div className="w-full h-full bg-blue-100 flex items-center justify-center text-4xl">🎪</div>
                  }
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                    <span className="text-white text-[10px]">{formatDate(e.published_at)}</span>
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-havico-blue transition-colors">
                    {e.title}
                  </h3>
                </div>
              </Link>
            ) : (
              <div key={i} className="bg-gray-100 animate-pulse" style={{height:'220px'}} />
            )
          ))}
        </div>

        {/* 3x3 small items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-0 border-t border-gray-200 pt-4">
          {(small.length > 0 ? small : Array.from({length:9})).map((item, i) => (
            item ? (
              <Link key={item.id ?? i} to={`/bai-viet/${item.id}`}
                className="flex gap-3 py-3 border-b border-gray-100 group hover:bg-gray-50 px-1 transition-colors">
                <div className="flex-shrink-0 overflow-hidden" style={{width:'72px', height:'54px'}}>
                  {item.cover_image
                    ? <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover"/>
                    : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl">📰</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-havico-blue transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">{formatDate(item.published_at)}</p>
                </div>
              </Link>
            ) : (
              <div key={i} className="flex gap-3 py-3 border-b border-gray-100">
                <div className="flex-shrink-0 bg-gray-100 animate-pulse" style={{width:'72px', height:'54px'}} />
                <div className="flex-1 space-y-1.5 pt-1">
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-full" />
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-3/4" />
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
