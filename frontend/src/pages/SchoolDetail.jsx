import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function SchoolDetail() {
  const { slug } = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/schools/${slug}`)
      .then(r => setSchool(r.data))
      .catch(() => setSchool(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-havico-blue border-t-transparent rounded-full mx-auto mb-3"></div>
        <p className="text-sm">Đang tải thông tin trường...</p>
      </div>
    </div>
  );

  if (!school) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🏫</div>
        <p className="text-gray-500 mb-4">Không tìm thấy thông tin trường này.</p>
        <Link to="/" className="text-havico-blue hover:underline text-sm">← Về trang chủ</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[200px] sm:h-[280px] md:h-[340px] overflow-hidden bg-gray-800">
        {school.img && (
          <img src={school.img} alt={school.name} className="w-full h-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-6">
          <div className="max-w-5xl mx-auto w-full">
            <Link to="/#truong-lien-ket" className="text-blue-200 text-xs hover:text-white mb-2 inline-flex items-center gap-1">
              ‹ Danh sách trường liên kết
            </Link>
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-black leading-tight">{school.name}</h1>
            <p className="text-blue-100 text-sm mt-1 flex items-center gap-2">
              <span>📍 {school.city}, {school.country}</span>
              {school.founded && <span className="text-blue-200">· Thành lập năm {school.founded}</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-2 text-xs text-gray-400 flex items-center gap-1.5">
          <Link to="/" className="hover:text-havico-blue">Trang chủ</Link>
          <span>›</span>
          <Link to="/#truong-lien-ket" className="hover:text-havico-blue">Trường liên kết</Link>
          <span>›</span>
          <span className="text-gray-600">{school.short_name || school.name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

        {/* Addresses */}
        {school.addresses?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {school.addresses.map((addr, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 px-3 py-2 rounded">
                <span className="text-havico-blue mt-0.5 flex-shrink-0">📍</span>
                <span>{addr}</span>
              </div>
            ))}
          </div>
        )}

        {/* Intro */}
        {school.intro?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-havico-blue pl-3">Giới thiệu</h2>
            <div className="space-y-3">
              {school.intro.map((p, i) => (
                <p key={i} className="text-gray-700 text-sm leading-relaxed">{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* Tuition */}
        {(school.tuition_note || school.tuition_rows?.length > 0) && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-havico-blue pl-3">Học phí</h2>
            {school.tuition_note && (
              <div className="text-sm text-gray-700 mb-4 bg-blue-50 border border-blue-100 px-4 py-3 leading-relaxed">
                {school.tuition_note}
              </div>
            )}
            {school.tuition_rows?.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200">
                  <tbody className="divide-y divide-gray-100">
                    {school.tuition_rows.map((r, i) => (
                      <tr key={i} className={r.highlight ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'}>
                        <td className="px-4 py-2.5 text-gray-700">{r.label}</td>
                        <td className="px-4 py-2.5 text-havico-blue font-semibold text-right whitespace-nowrap">{r.value}</td>
                        {r.note && <td className="px-4 py-2.5 text-gray-400 text-xs">{r.note}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Admission */}
        {school.admission?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-havico-blue pl-3">Kỳ tuyển sinh</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-havico-blue text-white">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-semibold">Kỳ nhập học</th>
                    <th className="px-4 py-2.5 text-left font-semibold">Thời gian học</th>
                    <th className="px-4 py-2.5 text-left font-semibold">Thời hạn nộp hồ sơ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {school.admission.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-semibold text-gray-800">{a.term}</td>
                      <td className="px-4 py-2.5 text-gray-600">{a.duration}</td>
                      <td className="px-4 py-2.5 text-gray-600">{a.applyPeriod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Courses */}
        {school.courses?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-havico-blue pl-3">Chương trình học</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {school.courses.map((c, i) => (
                <div key={i} className="border border-gray-200 rounded overflow-hidden">
                  <div className="bg-havico-blue/10 border-b border-gray-200 px-4 py-2.5 font-semibold text-sm text-havico-blue">
                    {c.level}
                  </div>
                  <ul className="px-4 py-3 space-y-1.5">
                    {c.items.map((item, j) => (
                      <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-havico-blue mt-0.5 flex-shrink-0">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Highlights */}
        {school.highlights?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-havico-blue pl-3">Điểm nổi bật</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {school.highlights.map((h, i) => (
                <div key={i} className="border border-blue-100 bg-blue-50 rounded px-5 py-4">
                  <h3 className="font-bold text-havico-blue text-sm mb-2">✦ {h.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{h.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificate Images */}
        {school.cert_images?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-havico-blue pl-3">Giấy chứng nhận</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {school.cert_images.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noreferrer"
                  className="border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow block">
                  <img src={url} alt={`Chứng nhận ${i + 1}`} className="w-full h-[140px] object-cover" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-havico-blue text-white rounded px-6 py-8 text-center">
          <p className="font-bold text-lg mb-2">
            Bạn muốn học tại {school.short_name || school.name}?
          </p>
          <p className="text-blue-100 text-sm mb-5">
            Liên hệ Việt Phát VTI để được tư vấn miễn phí và hỗ trợ toàn bộ hồ sơ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/tu-van"
              className="inline-block bg-white text-havico-blue font-bold px-6 py-2.5 text-sm hover:bg-blue-50 transition-colors rounded">
              Đăng ký tư vấn ngay
            </Link>
            <a href="tel:0918738386"
              className="inline-block border border-white/50 text-white font-semibold px-6 py-2.5 text-sm hover:bg-white/10 transition-colors rounded">
              📞 0918 73 83 86
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
