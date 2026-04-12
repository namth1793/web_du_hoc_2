import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CERTS = [
  {
    img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80',
    label: 'Danh hiệu tổ chức giáo dục uy tín',
  },
  {
    img: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80',
    label: 'TOP 100 thương hiệu tin dùng Thủ đô',
  },
  {
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80',
    label: 'Chứng nhận Hội đồng Nhà nước trao tặng',
  },
  {
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80',
    label: 'Bằng khen Nhà quản lý tiêu biểu Thủ đô',
  },
];

const PROGRAMS = [
  { icon: '🎓', title: 'Tuyển sinh du học Nhật Bản', sub: 'Chương trình vừa học vừa làm' },
  { icon: '⚙️', title: 'Tuyển sinh du học kỹ sư', sub: 'Kỹ sư CNTT, Cơ khí, Điện tử' },
  { icon: '🔄', title: 'Tuyển sinh chuyển visa Tokutei', sub: 'Hỗ trợ chuyển đổi visa lao động kỹ năng' },
  { icon: '🏥', title: 'Tuyển sinh du học Điều dưỡng', sub: 'Chương trình điều dưỡng tại Nhật Bản' },
];

const VISIBLE = 4;

function SchoolCarousel({ schools }) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(true);

  // Clone first VISIBLE items to end for seamless loop
  const items = [...schools, ...schools.slice(0, VISIBLE)];
  const N = items.length; // e.g. 16

  const advance = useCallback(() => {
    setTransitioning(true);
    setIndex(i => i + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 2500);
    return () => clearInterval(timer);
  }, [advance]);

  const handleTransitionEnd = () => {
    if (index >= schools.length) {
      setTransitioning(false);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitioning(true));
      });
    }
  };

  // track width = N/VISIBLE * 100% of container; translateX per card = 100%/N of track
  const translatePct = -(index * 100) / N;

  return (
    <div className="overflow-hidden">
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: 'flex',
          width: `${(N / VISIBLE) * 100}%`,
          transform: `translateX(${translatePct}%)`,
          transition: transitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {items.map((s, idx) => (
          <div
            key={`${s.id}-${idx}`}
            style={{ width: `${100 / N}%`, flexShrink: 0, padding: '0 8px' }}
          >
            <Link to={`/truong-lien-ket/${s.slug}`}
              className="bg-white border border-gray-200 group overflow-hidden hover:shadow-md hover:border-havico-blue transition-all block">
              <div className="overflow-hidden h-[130px] sm:h-[150px]">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-800 text-xs leading-snug mb-1 line-clamp-2 group-hover:text-havico-blue transition-colors">
                  {s.name}
                </h3>
                <p className="text-havico-blue text-[11px] font-medium">📍 {s.city}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Achievements() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get('/api/schools').then(r => setSchools(r.data)).catch(() => {});
  }, []);

  return (
    <>
      {/* Uy tín được khẳng định */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-label">Uy tín được khẳng định</div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-3xl">
            Với phương châm "Chất lượng giáo dục là mục tiêu hàng đầu", Việt Phát VTI đã nhận được nhiều bằng khen,
            giấy khen, danh hiệu từ các cấp lãnh đạo, các tổ chức, đơn vị có uy tín trong và ngoài nước.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CERTS.map((c, i) => (
              <div key={i} className="text-center group">
                <div className="overflow-hidden border border-gray-200 mb-2">
                  <img src={c.img} alt={c.label} className="w-full object-cover group-hover:scale-105 transition-transform duration-500 h-[110px] sm:h-[140px] md:h-[160px]"/>
                </div>
                <p className="text-xs text-gray-600 leading-snug">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trường liên kết */}
      <section id="truong-lien-ket" className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-label">Trường liên kết</div>
          {schools.length === 0 ? (
            <div className="flex gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex-1 bg-white border border-gray-200 animate-pulse">
                  <div className="h-[150px] bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SchoolCarousel schools={schools} />
          )}
        </div>
      </section>

      {/* Chương trình tuyển sinh */}
      <section id="thanh-tich" className="py-8 bg-havico-blue border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-block bg-white text-havico-blue text-xs font-bold px-4 py-2 uppercase tracking-wider mb-5">
            Chương trình tuyển sinh
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAMS.map((p, i) => (
              <div key={i} className="bg-white/10 p-5 text-center border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-3">{p.icon}</div>
                <div className="text-white font-bold text-sm mb-1">{p.title}</div>
                <div className="text-blue-200 text-xs">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
