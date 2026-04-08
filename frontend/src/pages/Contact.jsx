import { useState } from 'react';
import axios from 'axios';

const PROVINCES = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', province: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { setStatus({ ok: false, msg: 'Vui lòng nhập họ tên và số điện thoại.' }); return; }
    setLoading(true);
    try {
      const r = await axios.post('/api/contacts', form);
      setStatus({ ok: true, msg: r.data.message });
      setForm({ name: '', phone: '', email: '', province: '', message: '' });
    } catch {
      setStatus({ ok: false, msg: 'Gửi thất bại, vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-havico-blue text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-black mb-3">Đăng ký nhận tư vấn du học miễn phí</h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Để lại thông tin, chuyên gia tư vấn Việt Phát VTI sẽ liên hệ với bạn trong thời gian sớm nhất
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="section-title mb-6">Thông tin đăng ký</div>

              {status && (
                <div className={`rounded-lg p-4 mb-5 text-sm font-medium ${status.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {status.ok ? '✅ ' : '❌ '}{status.msg}
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Họ và tên *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-havico-blue transition-colors"
                      placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Số điện thoại *</label>
                    <input value={form.phone} onChange={e => set('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-havico-blue transition-colors"
                      placeholder="0912 345 678" type="tel" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Địa chỉ email</label>
                    <input value={form.email} onChange={e => set('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-havico-blue transition-colors"
                      placeholder="email@example.com" type="email" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Tỉnh/Thành phố</label>
                    <select value={form.province} onChange={e => set('province', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-havico-blue transition-colors bg-white">
                      <option value="">-- Chọn tỉnh/TP --</option>
                      {PROVINCES.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Thông tin tư vấn</label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-havico-blue transition-colors resize-none"
                    placeholder="Ví dụ: Tôi muốn tư vấn du học Nhật Bản, chương trình vừa học vừa làm, ngân sách khoảng 300 triệu..." />
                </div>

                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  ⚠️ Thông tin du học sẽ được gửi qua email (yêu cầu nhập email chính xác)
                </p>

                <button type="submit" disabled={loading}
                  className="w-full btn-gold py-3 text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? 'Đang gửi...' : '📩 Nhận thông tin du học Nhật Bản'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Thông tin của bạn được bảo mật tuyệt đối và chỉ dùng để tư vấn du học
                </p>
              </form>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-havico-blue text-white rounded-xl p-5">
              <h3 className="font-bold text-base mb-4 text-gold">Văn phòng Việt Phát VTI</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <p className="text-gold font-bold uppercase mb-1">Trụ sở chính</p>
                  <p className="text-gray-300">Số 48, ngách 2, ngõ Sim Co, đường Phạm Hùng, phường Mỹ Đình 1, quận Nam Từ Liêm, Hà Nội</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-gold font-bold uppercase mb-1">Văn phòng</p>
                  <p className="text-gray-300">Tầng 14, tòa nhà Intracom, 33 Cầu Diễn, phường Phúc Diễn, quận Bắc Từ Liêm, Hà Nội</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-gold font-bold uppercase mb-1">Điện thoại</p>
                  <p><a href="tel:0918738386" className="text-gray-300 hover:text-gold">📞 0918 73 83 86 (Mr Tài)</a></p>
                  <p><a href="tel:0971074966" className="text-gray-300 hover:text-gold">📞 0971 074 966 (Mr Đình)</a></p>
                  <p><a href="tel:02437878417" className="text-gray-300 hover:text-gold">☎ 0243 78 78 417 / 0243 7878 416</a></p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-gold font-bold uppercase mb-1">Email</p>
                  <p><a href="mailto:vietphatvti@gmail.com" className="text-gray-300 hover:text-gold">vietphatvti@gmail.com</a></p>
                  <p><a href="mailto:dinhcaovti@gmail.com" className="text-gray-300 hover:text-gold">dinhcaovti@gmail.com</a></p>
                </div>
              </div>
            </div>

            <div className="bg-blue-700 text-white rounded-xl p-5 text-xs">
              <h3 className="font-bold text-gold uppercase mb-3">🇯🇵 Chi nhánh Nhật Bản</h3>
              <p className="text-gray-300 mb-1">2 Chome-8-1 Motomachi, Naniwa Ward, Osaka</p>
              <p><a href="tel:+818038002506" className="text-gray-300 hover:text-gold">📞 081-80-3800-2506</a></p>
              <p><a href="mailto:vietphatnhatban@gmail.com" className="text-gray-300 hover:text-gold">📧 vietphatnhatban@gmail.com</a></p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-3">Giờ làm việc</h3>
              <div className="space-y-2 text-sm">
                {[['Thứ 2 – Thứ 6', '08:00 – 17:30'], ['Thứ 7', '08:00 – 12:00'], ['Chủ nhật', 'Nghỉ']].map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600 text-xs">{day}</span>
                    <span className="font-semibold text-navy-900 text-xs">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bản đồ */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title="Bản đồ Việt Phát VTI"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8!2d105.776!3d21.028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAxJzQwLjgiTiAxMDXCsDQ2JzMzLjYiRQ!5e0!3m2!1svi!2s!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🔖</div>
              <p className="text-xs font-semibold text-navy-900 mb-1">Tư vấn trực tiếp qua Zalo</p>
              <p className="text-xs text-gray-500">Nhắn tin ngay để được hỗ trợ nhanh nhất</p>
              <a href="https://zalo.me" target="_blank" rel="noreferrer"
                className="mt-3 inline-block bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
                Mở Zalo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
