import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Du học VTI */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-4 border-b border-gray-700 pb-2">Du học Việt Phát VTI</h3>
            <ul className="space-y-2">
              {[
                { label: 'Du học Nhật Bản', href: '/du-hoc/nhat-ban' },
                { label: 'Du học Hàn Quốc', href: '/du-hoc/han-quoc' },
                { label: 'Du học Đức', href: '/du-hoc/nghe-duc' },
                { label: 'Du học Singapore', href: '/du-hoc/singapore' },
                { label: 'Du học Đài Loan', href: '/du-hoc/dai-loan' },
                { label: 'Du học Úc', href: '/du-hoc/uc' },
              ].map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-gray-400 hover:text-white text-xs transition-colors">
                    › {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Tin tức */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-4 border-b border-gray-700 pb-2">Tin tức</h3>
            <ul className="space-y-2">
              {[
                { label: 'Hoạt động Việt Phát VTI', href: '/su-kien' },
                { label: 'Thư viện ảnh', href: '/su-kien' },
                { label: 'Sự kiện du học', href: '/su-kien' },
                { label: 'Tư vấn du học', href: '/tu-van' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-gray-400 hover:text-white text-xs transition-colors">
                    › {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Thông tin liên hệ */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase mb-4 border-b border-gray-700 pb-2">Thông tin liên hệ</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-start gap-1.5">
                <span className="flex-shrink-0 mt-0.5">📍</span>
                <span>Số 48, ngách 2, ngõ Sim Co, đường Phạm Hùng, Mỹ Đình 1, Nam Từ Liêm, Hà Nội</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="flex-shrink-0">📍</span>
                <span>Tầng 14, tòa nhà Intracom, 33 Cầu Diễn, Phúc Diễn, Bắc Từ Liêm, Hà Nội</span>
              </li>
              <li>
                <a href="tel:02437878417" className="hover:text-white">☎ 0243 78 78 417 / 0243 7878 416</a>
              </li>
              <li>
                <a href="tel:0918738386" className="hover:text-white">📞 0918 73 83 86 (Mr Tài)</a>
              </li>
              <li>
                <a href="tel:0971074966" className="hover:text-white">📞 0971 074 966 (Mr Đình)</a>
              </li>
              <li>
                <a href="mailto:vietphatvti@gmail.com" className="hover:text-white">✉ vietphatvti@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600 text-center sm:text-left">
            © {new Date().getFullYear()} Việt Phát VTI – CÔNG TY CP ĐẦU TƯ VÀ PHÁT TRIỂN THƯƠNG MẠI VIỆT PHÁT. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="flex items-center gap-1.5 bg-gray-800 hover:bg-havico-blue text-gray-400 hover:text-white text-xs font-medium px-3 py-1.5 rounded transition-colors border border-gray-700 hover:border-havico-blue"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
