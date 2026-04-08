const GALLERY = [
  {
    img: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80',
    title: 'Ảnh du lịch Hạ Long 2019',
  },
  {
    img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80',
    title: 'Ảnh sinh nhật VTI Edu',
  },
  {
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
    title: 'Ảnh công tác',
  },
  {
    img: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80',
    title: 'Ảnh sinh nhật công ty',
  },
];

export default function SocialSection() {
  return (
    <>
      {/* Thư viện ảnh */}
      <section className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-label">Thư viện ảnh</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GALLERY.map((item, i) => (
              <div key={i} className="group relative overflow-hidden cursor-pointer border border-gray-200">
                <img src={item.img} alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{height:'150px'}}/>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-white text-xs font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Góc liên hệ */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-label">Góc liên hệ Việt Phát VTI</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            <a href="https://youtube.com" target="_blank" rel="noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white py-8 text-center transition-colors flex flex-col items-center gap-3 group">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
              <span className="font-black text-xl">YouTube</span>
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white py-8 text-center transition-colors flex flex-col items-center gap-3 group">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-black text-xl">Facebook</span>
            </a>

            <a href="https://zalo.me" target="_blank" rel="noreferrer"
              className="text-white py-8 text-center transition-colors flex flex-col items-center gap-3 group"
              style={{backgroundColor:'#0068FF'}}>
              <span className="text-4xl font-black leading-none">Zalo</span>
              <span className="font-black text-xl">Zalo OA</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
