import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const [playing, setPlaying] = useState(false);
  const YT_ID = 'dQw4w9WgXcQ';

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
                src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1`}
                title="Video Việt Phát VTI"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
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
                <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 font-bold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.77 1.52V6.73a4.85 4.85 0 01-1-.04z"/></svg>
                  Việt Phát du lịch Hạ Long 2018
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div>
            <p className="text-gray-700 text-sm leading-relaxed mb-1">
              <strong>Kính chào Quý phụ huynh và các bạn thân mến!</strong>
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              <strong>Công ty Cổ phần Đầu tư và Phát triển Thương mại Việt Phát (VTI)</strong> là doanh nghiệp hoạt động
              trong lĩnh vực tư vấn du học, với thị trường chiến lược là Nhật Bản. VTI làm việc trực tiếp với các trường
              mà không qua trung gian, giúp học viên có chi phí thấp nhất và dịch vụ tốt nhất.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Ngoài ra, VTI tặng miễn phí khóa học tiếng Nhật cấp tốc cho tất cả học viên đăng ký du học Nhật Bản.
              Đội ngũ tư vấn nhiệt tình, hỗ trợ toàn diện từ lúc chọn trường đến khi ổn định cuộc sống tại nước ngoài.
            </p>
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
