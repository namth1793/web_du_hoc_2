const REVIEWS = [
  {
    name: 'Đỗ Nhược Thảo',
    role: 'Du học sinh Anh',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    content: 'Các anh chị ở Việt Phát VTI hỗ trợ tôi rất nhiều trong quá trình làm thủ tục du học và sau khi đến Nhật du học. Cảm ơn công ty rất nhiều.',
    country: '🇬🇧',
  },
  {
    name: 'Nguyễn Thị Nga',
    role: 'Du học sinh Nhật',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    content: 'Các anh chị ở Trung tâm du học Người Việt hỗ trợ tôi rất nhiều trong quá trình làm thủ tục du học và sau khi đến Nhật du học. Cảm ơn trung tâm rất nhiều.',
    country: '🇯🇵',
  },
  {
    name: 'Trần Văn Minh',
    role: 'Du học sinh Hàn Quốc',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    content: 'Tôi rất hài lòng với dịch vụ tư vấn của VTI. Đội ngũ nhiệt tình, hỗ trợ từ A đến Z, giúp tôi hoàn thành toàn bộ thủ tục dễ dàng và nhanh chóng.',
    country: '🇰🇷',
  },
];

export default function Testimonials() {
  return (
    <section className="py-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-label">Ý kiến học viên</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 p-5">
              <div className="flex gap-1 mb-3">
                {Array.from({length: 5}).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{r.content}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover"/>
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
