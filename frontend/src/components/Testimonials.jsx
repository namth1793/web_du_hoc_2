import { useState, useEffect } from 'react';
import axios from 'axios';

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('/api/testimonials').then(r => setReviews(r.data)).catch(() => {});
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="py-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-label">Ý kiến học viên</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 p-5">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => <StarIcon key={j} />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{r.content}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                {r.avatar
                  ? <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                  : <div className="w-10 h-10 rounded-full bg-havico-blue flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {r.name.charAt(0)}
                    </div>
                }
                <div>
                  <p className="font-bold text-gray-800 text-sm">{r.name} {r.country}</p>
                  <p className="text-gray-400 text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
