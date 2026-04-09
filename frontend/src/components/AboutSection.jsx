import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AboutSection() {
  const [playing, setPlaying] = useState(false);
  const [cfg, setCfg] = useState({
    about_youtube_id: 'dQw4w9WgXcQ',
    about_thumbnail: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    about_text1: 'Công ty Cổ phần Đầu tư và Phát triển Thương mại Việt Phát (VTI) là doanh nghiệp hoạt động trong lĩnh vực tư vấn du học, với thị trường chiến lược là Nhật Bản.',
    about_text2: 'VTI tặng miễn phí khóa học tiếng Nhật cấp tốc cho tất cả học viên đăng ký du học Nhật Bản. Đội ngũ tư vấn nhiệt tình, hỗ trợ toàn diện từ lúc chọn trường đến khi ổn định cuộc sống tại nước ngoài.',
  });

  useEffect(() => {
    axios.get('/api/settings').then(r => {
      setCfg(prev => ({ ...prev, ...r.data }));
    }).catch(() => {});
  }, []);

  return (
    <section id="ve-vti" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-label">Giới thiệu về Việt Phát VTI</div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Video */}
          <div className="relative rounded overflow-hidden shadow aspect-video bg-black">
            {playing ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${cfg.about_youtube_id}?autoplay=1`}
                title="Video Việt Phát VTI"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={cfg.about_thumbnail}
                  alt="Việt Phát VTI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(true)}
                    className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-2xl"
                  >
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div>
            <p className="text-gray-700 text-sm leading-relaxed mb-1">
              <strong>Kính chào Quý phụ huynh và các bạn thân mến!</strong>
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{cfg.about_text1}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">{cfg.about_text2}</p>
            <Link to="/tu-van"
              className="inline-block bg-havico-orange text-white text-sm font-bold px-6 py-2.5 hover:bg-orange-700 transition-colors uppercase tracking-wide">
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
