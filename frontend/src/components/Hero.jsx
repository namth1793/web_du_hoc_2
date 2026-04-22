import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80', label: '🇯🇵 Du học Nhật Bản', bg: '#1565C0' },
  { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=80',    label: '🇯🇵 Cuộc sống tại Nhật Bản', bg: '#0d47a1' },
  { src: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1920&q=80', label: '🇰🇷 Du học Hàn Quốc', bg: '#1a237e' },
  { src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80', label: '🇩🇪 Du học Đức', bg: '#1b5e20' },
  { src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=80', label: '🇸🇬 Du học Singapore', bg: '#b71c1c' },
];

const INTERVAL = 4000;

export default function Hero() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const timerRef = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    axios.get('/api/settings').then(r => {
      try {
        const parsed = JSON.parse(r.data.hero_slides);
        if (Array.isArray(parsed) && parsed.length > 0) setSlides(parsed);
      } catch {}
    }).catch(() => {});
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const goTo = useCallback((idx) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setTimeout(() => { isAnimating.current = false; }, 600);
    clearInterval(timerRef.current);
    setCurrent((idx + slides.length) % slides.length);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, INTERVAL);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden select-none aspect-[1024/560]">
      <div
        className="flex h-full"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / slides.length}%`, backgroundColor: s.bg || '#1565C0' }}
          >
            {!imgErrors[i] && s.src && (
              <img
                src={s.src}
                alt={s.label || ''}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
                onError={() => setImgErrors(e => ({ ...e, [i]: true }))}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {s.label && (
              <div className="absolute bottom-8 left-4 sm:bottom-10 sm:left-8 text-white z-10">
                <p className="text-base sm:text-xl md:text-2xl font-bold drop-shadow-lg">{s.label}</p>
                <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1">Việt Phát VTI – Tư vấn du học miễn phí</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => goTo(current - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full transition-colors z-10"
        aria-label="Ảnh trước">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <button onClick={() => goTo(current + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full transition-colors z-10"
        aria-label="Ảnh tiếp">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-6 h-2.5' : 'bg-white/50 hover:bg-white/80 w-2.5 h-2.5'
            }`}
            aria-label={`Ảnh ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
