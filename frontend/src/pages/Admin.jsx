import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AUTH = { headers: { Authorization: 'Bearer havico-admin-2025' } };

const NAV_SECTIONS = [
  { key: 'nhat-ban',  section: 'du-hoc', subcategory: 'nhat-ban',  label: 'Du học Nhật Bản',  icon: '🇯🇵' },
  { key: 'han-quoc',  section: 'du-hoc', subcategory: 'han-quoc',  label: 'Du học Hàn Quốc',  icon: '🇰🇷' },
  { key: 'nghe-duc',  section: 'du-hoc', subcategory: 'nghe-duc',  label: 'Du học Đức',        icon: '🇩🇪' },
  { key: 'singapore', section: 'du-hoc', subcategory: 'singapore', label: 'Du học Singapore',  icon: '🇸🇬' },
  { key: 'dai-loan',  section: 'du-hoc', subcategory: 'dai-loan',  label: 'Du học Đài Loan',   icon: '🇹🇼' },
  { key: 'uc',        section: 'du-hoc', subcategory: 'uc',        label: 'Du học Úc',         icon: '🇦🇺' },
  { key: 'su-kien',   section: 'su-kien', subcategory: 'su-kien',  label: 'Sự kiện',           icon: '🎪' },
  { key: 'tin-tuc',   section: 'tin-tuc', subcategory: 'tin-tuc',  label: 'Tin tức',           icon: '📰' },
];

const EMPTY_FORM = { title: '', section: 'du-hoc', subcategory: 'nhat-ban', cover_image: '', excerpt: '', content: '', is_published: 1 };

function formatDate(s) {
  if (!s) return '';
  return new Date(s).toLocaleDateString('vi-VN');
}

// ─── Login ──────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/login', { password: pw });
      onLogin();
    } catch { setErr('Sai mật khẩu!'); }
  };
  return (
    <div className="min-h-screen bg-havico-blue flex items-center justify-center">
      <div className="bg-white shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-havico-blue rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h1 className="text-xl font-black text-gray-800">VTI EDU Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Đăng nhập để quản trị nội dung</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} autoFocus
            className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-havico-blue"
            placeholder="Nhập mật khẩu admin..." />
          {err && <p className="text-red-500 text-xs font-medium">{err}</p>}
          <button type="submit" className="w-full bg-havico-blue text-white py-3 font-bold text-sm hover:bg-blue-700 transition-colors uppercase tracking-wide">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Article Form ────────────────────────────────────────────────────────────
function ArticleForm({ initial, sectionInfo, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    ...EMPTY_FORM,
    section: sectionInfo?.section || 'du-hoc',
    subcategory: sectionInfo?.subcategory || 'nhat-ban',
  });
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.title.trim()) return alert('Vui lòng nhập tiêu đề!');
    setSaving(true);
    try {
      if (form.id) await axios.put(`/api/admin/articles/${form.id}`, form, AUTH);
      else await axios.post('/api/admin/articles', form, AUTH);
      onSave();
    } catch { alert('Lỗi khi lưu bài viết.'); }
    setSaving(false);
  };

  return (
    <div className="bg-white border border-gray-200">
      {/* Form header */}
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-sm">
          {form.id ? `✏️ Sửa bài #${form.id}` : '➕ Thêm bài viết mới'}
        </h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
      </div>

      <div className="p-5 space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu đề *</label>
          <input value={form.title} onChange={e => setF('title', e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue"
            placeholder="Nhập tiêu đề bài viết..." />
        </div>

        {/* Section info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Chuyên mục</label>
            <div className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
              {sectionInfo?.label || form.section}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Ảnh bìa (URL)</label>
            <input value={form.cover_image} onChange={e => setF('cover_image', e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue"
              placeholder="https://images.unsplash.com/..." />
          </div>
        </div>

        {/* Preview image */}
        {form.cover_image && (
          <img src={form.cover_image} alt="preview" className="h-32 object-cover border border-gray-200" onError={e => e.target.style.display='none'} />
        )}

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Mô tả ngắn</label>
          <textarea value={form.excerpt} onChange={e => setF('excerpt', e.target.value)} rows={2}
            className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue resize-none"
            placeholder="Tóm tắt ngắn gọn về nội dung bài..." />
        </div>

        {/* Content with preview toggle */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-600">Nội dung (HTML)</label>
            <button onClick={() => setPreview(p => !p)}
              className="text-xs text-havico-blue hover:underline font-medium">
              {preview ? '⌨️ Chỉnh sửa' : '👁 Xem trước'}
            </button>
          </div>
          {preview ? (
            <div className="border border-gray-200 p-4 min-h-[200px] article-content text-sm overflow-auto bg-gray-50"
              dangerouslySetInnerHTML={{ __html: form.content }} />
          ) : (
            <textarea value={form.content} onChange={e => setF('content', e.target.value)} rows={12}
              className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue resize-y font-mono"
              placeholder="<h2>Tiêu đề phần</h2>&#10;<p>Nội dung...</p>&#10;<ul><li>Mục 1</li></ul>" />
          )}
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-gray-600">Trạng thái:</label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={!!form.is_published} onChange={e => setF('is_published', e.target.checked ? 1 : 0)} />
            <span className={`text-xs font-bold ${form.is_published ? 'text-green-600' : 'text-gray-400'}`}>
              {form.is_published ? '✓ Hiển thị công khai' : '○ Ẩn'}
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button onClick={submit} disabled={saving}
            className="bg-havico-blue text-white px-6 py-2 text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-60">
            {saving ? 'Đang lưu...' : (form.id ? '💾 Cập nhật' : '➕ Thêm bài')}
          </button>
          <button onClick={onCancel}
            className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 text-gray-600">
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section Articles ────────────────────────────────────────────────────────
function SectionPanel({ sectionInfo, allArticles, onReload }) {
  const [editing, setEditing] = useState(null); // null=list, 'new'=new, article=edit
  const [toast, setToast] = useState('');

  const articles = allArticles.filter(a =>
    a.section === sectionInfo.section && a.subcategory === sectionInfo.subcategory
  );

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const del = async (id) => {
    if (!window.confirm('Xóa bài viết này?')) return;
    await axios.delete(`/api/admin/articles/${id}`, AUTH);
    onReload(); showToast('Đã xóa bài viết.');
  };

  const toggle = async (a) => {
    await axios.put(`/api/admin/articles/${a.id}`, { ...a, is_published: a.is_published ? 0 : 1 }, AUTH);
    onReload();
  };

  const handleSaved = () => {
    setEditing(null); onReload(); showToast('Đã lưu bài viết thành công!');
  };

  if (editing) {
    return (
      <div>
        {toast && <div className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4 border border-green-200">{toast}</div>}
        <ArticleForm
          initial={editing === 'new' ? null : { ...editing }}
          sectionInfo={sectionInfo}
          onSave={handleSaved}
          onCancel={() => setEditing(null)}
        />
      </div>
    );
  }

  return (
    <div>
      {toast && <div className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4 border border-green-200">{toast}</div>}

      {/* Panel header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-gray-800 text-base flex items-center gap-2">
            <span>{sectionInfo.icon}</span> {sectionInfo.label}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">{articles.length} bài viết</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="bg-havico-blue text-white px-4 py-2 text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5">
          <span className="text-base leading-none">+</span> Thêm bài viết
        </button>
      </div>

      {/* Articles table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        {articles.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <div className="text-3xl mb-2">📭</div>
            <p className="text-sm">Chưa có bài viết nào trong mục này</p>
            <button onClick={() => setEditing('new')} className="mt-3 text-havico-blue text-xs hover:underline font-semibold">
              + Thêm bài viết đầu tiên
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500 uppercase">Tiêu đề</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500 uppercase w-28">Ngày đăng</th>
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-500 uppercase w-20">Trạng thái</th>
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-500 uppercase w-28">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="text-xs font-semibold text-gray-800 line-clamp-1">{a.title}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{formatDate(a.published_at)}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggle(a)}
                      className={`text-[10px] font-bold px-2.5 py-1 transition-colors ${
                        a.is_published
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}>
                      {a.is_published ? '● Hiện' : '○ Ẩn'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => setEditing(a)} className="text-xs text-havico-blue hover:underline font-semibold">Sửa</button>
                      <button onClick={() => del(a.id)} className="text-xs text-red-500 hover:underline font-semibold">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Contacts Panel ──────────────────────────────────────────────────────────
function ContactsPanel({ contacts }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-gray-800 text-base">📋 Đơn tư vấn</h2>
          <p className="text-xs text-gray-400 mt-0.5">{contacts.length} đơn đăng ký</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 overflow-hidden">
        {contacts.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">Chưa có đơn đăng ký nào</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {contacts.map(c => (
              <div key={c.id} className="px-5 py-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="font-bold text-gray-800 text-sm">{c.name}</span>
                      <a href={`tel:${c.phone}`} className="text-havico-blue text-sm font-semibold hover:underline">{c.phone}</a>
                      {c.email && <a href={`mailto:${c.email}`} className="text-gray-500 text-xs hover:underline">{c.email}</a>}
                      {c.province && <span className="text-xs bg-blue-50 text-havico-blue px-2 py-0.5 font-medium">{c.province}</span>}
                    </div>
                    {c.message && <p className="text-xs text-gray-600 leading-relaxed">{c.message}</p>}
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(c.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Admin ──────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [activeKey, setActiveKey] = useState('nhat-ban');
  const [articles, setArticles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const load = useCallback(() => {
    axios.get('/api/admin/articles', AUTH).then(r => setArticles(r.data)).catch(() => {});
    axios.get('/api/admin/contacts', AUTH).then(r => setContacts(r.data)).catch(() => {});
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;

  const activeSectionInfo = NAV_SECTIONS.find(s => s.key === activeKey);

  // Count articles per section
  const countFor = (s) => articles.filter(a => a.section === s.section && a.subcategory === s.subcategory).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top bar */}
      <div className="bg-havico-blue text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(o => !o)} className="text-white/70 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="font-black text-base">VTI EDU</span>
            <span className="bg-white/20 text-xs font-bold px-2 py-0.5">Admin</span>
          </div>
        </div>
        <a href="/" className="text-white/70 hover:text-white text-xs flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Về trang chủ
        </a>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-56 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
            <div className="py-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase px-4 mb-2 tracking-wider">Nội dung Website</p>

              {NAV_SECTIONS.map(s => (
                <button key={s.key} onClick={() => setActiveKey(s.key)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    activeKey === s.key
                      ? 'bg-havico-blue text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  <span className="flex items-center gap-2">
                    <span>{s.icon}</span>
                    <span className="text-xs">{s.label}</span>
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 min-w-[20px] text-center ${
                    activeKey === s.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {countFor(s)}
                  </span>
                </button>
              ))}

              <div className="border-t border-gray-100 mt-2 pt-2">
                <button onClick={() => setActiveKey('contacts')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    activeKey === 'contacts'
                      ? 'bg-havico-blue text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  <span className="flex items-center gap-2">
                    <span>📋</span>
                    <span className="text-xs">Đơn tư vấn</span>
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 min-w-[20px] text-center ${
                    activeKey === 'contacts' ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {contacts.length}
                  </span>
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeKey === 'contacts' ? (
            <ContactsPanel contacts={contacts} />
          ) : activeSectionInfo ? (
            <SectionPanel
              key={activeKey}
              sectionInfo={activeSectionInfo}
              allArticles={articles}
              onReload={load}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}
