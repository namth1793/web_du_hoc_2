import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import intro1 from '../../assets/intro/intro1.jpg';
import intro2 from '../../assets/intro/intro2.jpg';
import intro3 from '../../assets/intro/intro3.jpg';

const BRANCHES = [
  { stt: 1,  type: 'cn',   name: 'Công Ty CP Đầu Tư và Phát Triển Thương Mại Việt Phát',                                          phone: '',              contact: 'Nguyễn Văn Tài',        fanpage: '' },
  { stt: 2,  type: 'vpdd', name: 'VPĐD tại Vĩnh Phúc',                                                                             phone: '',              contact: 'Phan Thị Thanh Vân',    fanpage: '' },
  { stt: 3,  type: 'vpdd', name: 'VPĐD tại Nam Định',                                                                               phone: '0984 740 540',  contact: '',                      fanpage: 'https://www.facebook.com/DuHocLaoDongKySuNhatBan' },
  { stt: 4,  type: 'vpdd', name: 'VPĐD tại Thanh Hóa',                                                                              phone: '',              contact: 'Nguyễn Văn Lâm',        fanpage: '' },
  { stt: 5,  type: 'vpdd', name: 'VPĐD tại Hải Phòng',                                                                              phone: '',              contact: 'Nguyễn Duy Giang',      fanpage: '' },
  { stt: 6,  type: 'vpdd', name: 'VPĐD tại Thái Bình',                                                                              phone: '',              contact: 'Nguyễn Đức Quang',      fanpage: '' },
  { stt: 7,  type: 'vpdd', name: 'VPĐD số 2 tại Phú Thọ',                                                                          phone: '',              contact: 'Nguyễn Đức Quang',      fanpage: '' },
  { stt: 8,  type: 'vpdd', name: 'VPĐD tại Đồng Nai',                                                                              phone: '',              contact: 'Dương Đình Cương',      fanpage: '' },
  { stt: 9,  type: 'vpdd', name: 'VPĐD tại Quảng Trị',                                                                             phone: '',              contact: 'Nguyễn Đăng Diệu',      fanpage: '' },
  { stt: 10, type: 'cn',   name: 'Chi nhánh tại Sơn La',                                                                           phone: '',              contact: 'Lê Anh Cương',          fanpage: '' },
  { stt: 11, type: 'cn',   name: 'Chi nhánh tại Hà Nam',                                                                           phone: '',              contact: 'Đỗ Hữu Thắng',          fanpage: '' },
  { stt: 12, type: 'cn',   name: 'Chi nhánh tại Lai Châu',                                                                         phone: '',              contact: 'Cung Văn Tân',          fanpage: '' },
  { stt: 13, type: 'cn',   name: 'Chi nhánh tại Lạng Sơn',                                                                         phone: '0966 344 299',  contact: '',                      fanpage: 'https://www.facebook.com/duhocvietphatlangson' },
  { stt: 14, type: 'vpdd', name: 'VPĐD tại Sơn Tây',                                                                               phone: '',              contact: 'Nguyễn Thị Thanh',      fanpage: '' },
  { stt: 15, type: 'cn',   name: 'Chi nhánh tại Quảng Bình',                                                                       phone: '',              contact: 'Lê Quang Hai',          fanpage: '' },
  { stt: 16, type: 'vpdd', name: 'VPĐD tại Thái Nguyên',                                                                           phone: '',              contact: 'Nguyễn Thị Điệp',       fanpage: '' },
  { stt: 17, type: 'vpdd', name: 'VPĐD tại Lạng Giang – Bắc Giang',                                                               phone: '',              contact: 'Nguyễn Văn Ánh',        fanpage: '' },
  { stt: 18, type: 'cn',   name: 'Chi nhánh tại Phú Thọ',                                                                          phone: '',              contact: 'Đinh Văn Quân',         fanpage: '' },
  { stt: 19, type: 'vpdd', name: 'VPĐD tại Bà Rịa – Vũng Tàu',                                                                    phone: '',              contact: 'Dương Đình Cương',      fanpage: '' },
  { stt: 20, type: 'vpdd', name: 'VPĐD tại Bình Phước',                                                                            phone: '',              contact: 'Bùi Văn Phương',        fanpage: '' },
  { stt: 21, type: 'vpdd', name: 'VPĐD tại Đắk Lắk',                                                                               phone: '',              contact: 'Nguyễn Thị Thu Hiền',   fanpage: '' },
  { stt: 22, type: 'vpdd', name: 'VPĐD tại Nghệ An',                                                                               phone: '',              contact: 'Cao Văn Công',          fanpage: '' },
  { stt: 23, type: 'vpdd', name: 'VPĐD tại TP. Hồ Chí Minh',                                                                      phone: '',              contact: 'Phan Xuân Nghị',        fanpage: '' },
  { stt: 24, type: 'vpdd', name: 'VPĐD tại Bến Tre',                                                                               phone: '',              contact: 'Nguyễn Văn Mững',       fanpage: '' },
  { stt: 25, type: 'vpdd', name: 'VPĐD tại Lâm Đồng',                                                                              phone: '',              contact: 'Nguyễn Văn Mững',       fanpage: '' },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('about');
  const [cfg, setCfg] = useState({ about_text1: '', about_text2: '' });

  useEffect(() => {
    axios.get('/api/settings').then(r => setCfg(r.data)).catch(() => {});
  }, []);

  return (
    <section id="ve-vti" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-label">Giới thiệu</div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-5 py-3 text-sm font-semibold uppercase tracking-wide border-b-2 transition-colors ${
              activeTab === 'about'
                ? 'border-havico-blue text-havico-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Về Việt Phát VTI
          </button>
          <button
            onClick={() => setActiveTab('branches')}
            className={`px-5 py-3 text-sm font-semibold uppercase tracking-wide border-b-2 transition-colors ${
              activeTab === 'branches'
                ? 'border-havico-blue text-havico-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Danh sách các chi nhánh
          </button>
        </div>

        {/* Tab: Về Việt Phát VTI */}
        {activeTab === 'about' && (
          <div className="max-w-4xl">
            {/* Nội dung do admin quản lý qua trang /admin */}
            {cfg.about_text1 ? (
              <div
                className="text-sm text-gray-700 leading-relaxed about-rich-content"
                dangerouslySetInnerHTML={{ __html: cfg.about_text1 }}
              />
            ) : (
              <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                <p><strong>Kính gửi: Quý khách hàng</strong></p>
                <p>Lời đầu tiên, Công ty cổ phần đầu tư và Phát triển Thương mại Việt Phát xin gửi lời chúc sức khỏe và lời chào trân trọng nhất đến quý khách hàng!</p>
                <p>Công ty Cổ phần đầu tư và phát triển thương mại Việt Phát thành lập từ ngày 11/11/2011 đến nay với 9 năm kinh nghiệm và phát triển, Việt Phát đã trở thành một nhịp cầu du học được nhiều học sinh và quý phụ huynh, đối tác tin tưởng.</p>
                <p>Tính đến nay Việt Phát đã có hàng ngàn du học sinh đã, đang và sắp sang Nhật Bản học tập tại các thành phố, tỉnh thành lớn như Tokyo, Osaka, Nagoya…, Seoul, Busan, Incheon,…</p>
                <p>Cùng 7 chi nhánh, 20 văn phòng đại diện trên khắp các tỉnh thành trong nước, Việt Phát chúng tôi tự tin mang đến cho học sinh những cơ hội du học tốt nhất với sự hỗ trợ tận tình chu đáo, chi phí hợp lý nhất.</p>
                <p className="italic text-gray-600 border-l-4 border-havico-blue pl-4 py-1">
                  Với phương châm hoạt động <strong>"Uy tín, tận tâm, trách nhiệm"</strong> — <em>"Niềm tin của khách hàng tạo nên uy tín của công ty"</em>.
                </p>
              </div>
            )}

            {cfg.about_text2 && (
              <div
                className="mt-4 text-sm text-gray-700 leading-relaxed about-rich-content"
                dangerouslySetInnerHTML={{ __html: cfg.about_text2 }}
              />
            )}

            <div className="mt-6">
              <Link
                to="/tu-van"
                className="inline-block bg-havico-orange text-white text-sm font-bold px-6 py-2.5 hover:bg-orange-700 transition-colors uppercase tracking-wide"
              >
                Liên hệ tư vấn
              </Link>
            </div>

            {/* Ảnh giấy chứng nhận */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[intro1, intro2, intro3].map((src, i) => (
                <div key={i} className="border border-gray-200 rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={src}
                    alt={`Giấy chứng nhận ${i + 1}`}
                    className="w-full h-auto object-contain bg-gray-50"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Danh sách chi nhánh */}
        {activeTab === 'branches' && (
          <div>
            {/* Header thông tin trụ sở */}
            <div className="bg-blue-50 border border-blue-100 rounded p-4 mb-6 text-sm text-gray-700">
              <p className="font-bold text-havico-blue mb-1">Công Ty Cổ Phần Đầu Tư và Phát Triển Thương Mại Việt Phát</p>
              <p className="flex items-start gap-1.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-havico-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Tầng 14, tòa nhà Intracom, 33 Cầu Diễn, phường Phúc Diễn, quận Bắc Từ Liêm, thành phố Hà Nội, Việt Nam.
              </p>
            </div>

            <p className="text-xs text-gray-500 mb-4 uppercase font-semibold tracking-wide">
              Danh sách các chi nhánh, văn phòng đại diện Công ty Việt Phát
            </p>

            {/* Bảng danh sách */}
            <div className="overflow-x-auto rounded border border-gray-200">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-havico-blue text-white text-left">
                    <th className="px-3 py-2.5 font-semibold w-10 text-center">STT</th>
                    <th className="px-3 py-2.5 font-semibold">Tên chi nhánh / VPĐD</th>
                    <th className="px-3 py-2.5 font-semibold w-32">Loại</th>
                    <th className="px-3 py-2.5 font-semibold w-36">Điện thoại / Liên hệ</th>
                    <th className="px-3 py-2.5 font-semibold w-32">Fanpage</th>
                  </tr>
                </thead>
                <tbody>
                  {BRANCHES.map((b, i) => (
                    <tr key={b.stt} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2.5 text-center text-gray-500 font-medium">{b.stt}</td>
                      <td className="px-3 py-2.5 text-gray-800 font-medium">{b.name}</td>
                      <td className="px-3 py-2.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          b.type === 'cn'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {b.type === 'cn' ? 'Chi nhánh' : 'VPĐD'}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-600 text-xs">
                        {b.phone
                          ? <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="text-havico-blue hover:underline font-medium">{b.phone}</a>
                          : b.contact
                            ? <span>{b.contact}</span>
                            : <span className="text-gray-400">—</span>
                        }
                      </td>
                      <td className="px-3 py-2.5 text-xs">
                        {b.fanpage
                          ? <a href={b.fanpage} target="_blank" rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                              Facebook
                            </a>
                          : <span className="text-gray-400">—</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              * Thông tin liên hệ chi tiết của từng chi nhánh/VPĐD vui lòng liên hệ trực tiếp với công ty.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
