import { useEffect, useState, useRef, useCallback } from 'react';

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80',
    alt: 'Du học Nhật Bản cùng Việt Phát VTI',
    bg: '#1565C0',
    label: '🇯🇵 Du học Nhật Bản',
  },
  {
    src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=80',
    alt: 'Du học Nhật Bản',
    bg: '#0d47a1',
    label: '🇯🇵 Cuộc sống tại Nhật Bản',
  },
  {
    src: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1920&q=80',
    alt: 'Du học Hàn Quốc',
    bg: '#1a237e',
    label: '🇰🇷 Du học Hàn Quốc',
  },
  {
    src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80',
    alt: 'Du học Đức',
    bg: '#1b5e20',
    label: '🇩🇪 Du học Đức',
  },
  {
    src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=80',
    alt: 'Du học Singapore',
    bg: '#b71c1c',
    label: '🇸🇬 Du học Singapore',
  },
];

const INTERVAL = 4000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const timerRef = useRef(null);
  const isAnimating = useRef(false);

  // Auto-play only — no dependency on state, uses functional updater
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = useCallback((idx) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setTimeout(() => { isAnimating.current = false; }, 600);

    // Reset timer so it doesn't fire right after manual click
    clearInterval(timerRef.current);
    setCurrent((idx + SLIDES.length) % SLIDES.length);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, INTERVAL);
  }, []);

  return (
    <div className="relative w-full overflow-hidden select-none" style={{ height: '420px' }}>
      {/* Slide track */}
      <div
        className="flex h-full"
        style={{
          width: `${SLIDES.length * 100}%`,
          transform: `translateX(-${current * (100 / SLIDES.length)}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / SLIDES.length}%`, backgroundColor: s.bg }}
          >
            {!imgErrors[i] && (
              <img
                src={s.src}
                alt={s.alt}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
                onError={() => setImgErrors(e => ({ ...e, [i]: true }))}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-12 left-8 text-white z-10">
              <p className="text-2xl font-bold drop-shadow-lg">{s.label}</p>
              <p className="text-sm text-white/80 mt-1">Việt Phát VTI – Tư vấn du học miễn phí</p>
            </div>
          </div>
        ))}
      </div>

      {/* Prev */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full transition-colors z-10"
        aria-label="Ảnh trước"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full transition-colors z-10"
        aria-label="Ảnh tiếp"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
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
