import { Link } from 'react-router-dom';

const COUNTRIES = [
  {
    name: 'Du học Nhật Bản',
    slug: 'nhat-ban',
    img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
  },
  {
    name: 'Du học Hàn Quốc',
    slug: 'han-quoc',
    img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80',
  },
  {
    name: 'Du học Đức',
    slug: 'nghe-duc',
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
  },
  {
    name: 'Du học Singapore',
    slug: 'singapore',
    img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
  },
  {
    name: 'Du học Đài Loan',
    slug: 'dai-loan',
    img: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80',
  },
  {
    name: 'Du học Úc',
    slug: 'uc',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
];

export default function CountryCards() {
  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-label">Du học các nước</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {COUNTRIES.map(c => (
            <div key={c.slug} className="group text-center">
              <div className="overflow-hidden mb-3">
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500 h-[120px] sm:h-[150px] md:h-[180px]"
                />
              </div>
              <Link to={`/du-hoc/${c.slug}`}
                className="inline-block bg-havico-blue text-white text-xs font-bold px-8 py-2 uppercase tracking-wide hover:bg-blue-700 transition-colors">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
