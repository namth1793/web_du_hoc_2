import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

const AUTH = { headers: { Authorization: 'Bearer havico-admin-2025' } };

const NAV_SECTIONS = [
  { key: 'gioi-thieu', section: null, subcategory: null, label: 'Giới thiệu & Carousel', icon: '🏠' },
  { key: 'nhat-ban',   section: 'du-hoc', subcategory: 'nhat-ban',  label: 'Du học Nhật Bản',  icon: '🇯🇵' },
  { key: 'han-quoc',   section: 'du-hoc', subcategory: 'han-quoc',  label: 'Du học Hàn Quốc',  icon: '🇰🇷' },
  { key: 'nghe-duc',   section: 'du-hoc', subcategory: 'nghe-duc',  label: 'Du học Đức',        icon: '🇩🇪' },
  { key: 'singapore',  section: 'du-hoc', subcategory: 'singapore', label: 'Du học Singapore',  icon: '🇸🇬' },
  { key: 'dai-loan',   section: 'du-hoc', subcategory: 'dai-loan',  label: 'Du học Đài Loan',   icon: '🇹🇼' },
  { key: 'uc',         section: 'du-hoc', subcategory: 'uc',        label: 'Du học Úc',         icon: '🇦🇺' },
  { key: 'su-kien',    section: 'su-kien', subcategory: 'su-kien',  label: 'Sự kiện',           icon: '🎪' },
  { key: 'tin-tuc',    section: 'tin-tuc', subcategory: 'tin-tuc',  label: 'Tin tức',           icon: '📰' },
];

const EMPTY_FORM = { title: '', section: 'du-hoc', subcategory: 'nhat-ban', cover_image: '', excerpt: '', content: '', is_published: 1 };

function formatDate(s) {
  if (!s) return '';
  return new Date(s).toLocaleDateString('vi-VN');
}

// ─── RichEditor ──────────────────────────────────────────────────────────────
const ToolBtn = ({ onClick, active, title, children }) => (
  <button type="button" onMouseDown={e => { e.preventDefault(); onClick(); }}
    title={title}
    className={`px-2 py-1 text-sm rounded transition-colors ${active ? 'bg-havico-blue text-white' : 'text-gray-700 hover:bg-gray-200'}`}>
    {children}
  </button>
);

function RichEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Nhập nội dung bài viết tại đây...' }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sync khi form reset (edit→new)
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '', false);
    }
  }, [value, editor]);

  const addImage = () => {
    const url = window.prompt('Nhập URL ảnh:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('Nhập URL liên kết:', prev);
    if (url === null) return;
    if (url === '') { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
  };

  if (!editor) return null;

  return (
    <div className="tiptap-editor border border-gray-300 focus-within:border-havico-blue rounded overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-gray-50">
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Đậm"><strong>B</strong></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Nghiêng"><em>I</em></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Gạch chân"><u>U</u></ToolBtn>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Tiêu đề lớn">H2</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Tiêu đề nhỏ">H3</ToolBtn>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Danh sách chấm">• —</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Danh sách số">1.</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Trích dẫn">"</ToolBtn>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Căn trái">≡L</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Căn giữa">≡C</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Căn phải">≡R</ToolBtn>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolBtn onClick={setLink} active={editor.isActive('link')} title="Chèn liên kết">🔗</ToolBtn>
        <ToolBtn onClick={addImage} active={false} title="Chèn ảnh qua URL">🖼</ToolBtn>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} title="Hoàn tác">↩</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} title="Làm lại">↪</ToolBtn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

// ─── ImageUpload ─────────────────────────────────────────────────────────────
function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await axios.post('/api/admin/upload', fd, {
        headers: { ...AUTH.headers, 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.url);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload thất bại');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          <img src={value} alt="preview" className="h-32 w-auto object-cover border border-gray-200 rounded" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
          >✕</button>
        </div>
      )}

      {/* Upload button */}
      <label className={`flex items-center gap-2 cursor-pointer w-fit px-3 py-2 border text-sm rounded transition-colors ${
        uploading ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white border-gray-300 hover:border-havico-blue hover:text-havico-blue'
      }`}>
        {uploading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Đang upload...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            {value ? 'Đổi ảnh' : 'Tải ảnh lên'}
          </>
        )}
        <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleFile} />
      </label>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
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

        {/* Section info + date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Chuyên mục</label>
            <div className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
              {sectionInfo?.label || form.section}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Ngày đăng</label>
            <input
              type="datetime-local"
              value={form.published_at ? form.published_at.slice(0, 16).replace(' ', 'T') : ''}
              onChange={e => setF('published_at', e.target.value.replace('T', ' '))}
              className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Ảnh bìa</label>
          <ImageUpload value={form.cover_image} onChange={url => setF('cover_image', url)} />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Mô tả ngắn</label>
          <textarea value={form.excerpt} onChange={e => setF('excerpt', e.target.value)} rows={2}
            className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue resize-none"
            placeholder="Tóm tắt ngắn gọn về nội dung bài..." />
        </div>

        {/* Content - Rich Text Editor */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Nội dung bài viết</label>
          <RichEditor value={form.content} onChange={val => setF('content', val)} />
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
                      <button onClick={async () => {
                        const res = await axios.get(`/api/articles/${a.id}`);
                        setEditing(res.data);
                      }} className="text-xs text-havico-blue hover:underline font-semibold">Sửa</button>
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

// ─── Gioi Thieu Panel ────────────────────────────────────────────────────────
function GioiThieuPanel() {
  const [cfg, setCfg] = useState(null);
  const [slides, setSlides] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get('/api/settings').then(r => {
      setCfg(r.data);
      try { setSlides(JSON.parse(r.data.hero_slides || '[]')); } catch { setSlides([]); }
    });
  }, []);

  const save = async () => {
    setSaving(true); setMsg('');
    try {
      await axios.put('/api/admin/settings', {
        ...cfg,
        hero_slides: JSON.stringify(slides),
      }, AUTH);
      setMsg('✓ Đã lưu thành công!');
    } catch { setMsg('✗ Lưu thất bại'); }
    finally { setSaving(false); }
  };

  const updateSlide = (i, field, val) =>
    setSlides(s => s.map((sl, idx) => idx === i ? { ...sl, [field]: val } : sl));

  const removeSlide = (i) => setSlides(s => s.filter((_, idx) => idx !== i));

  const moveSlide = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= slides.length) return;
    setSlides(s => { const a = [...s]; [a[i], a[j]] = [a[j], a[i]]; return a; });
  };

  const addSlide = () => setSlides(s => [...s, { src: '', label: '', bg: '#1565C0' }]);

  if (!cfg) return <div className="p-8 text-gray-400">Đang tải...</div>;

  return (
    <div className="max-w-3xl space-y-8">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-3">🏠 Giới thiệu & Carousel</h2>

      {/* ── Hero Carousel ── */}
      <section>
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span className="bg-havico-blue text-white text-xs px-2 py-0.5">HERO</span>
          Ảnh carousel trang chủ
        </h3>
        <div className="space-y-3">
          {slides.map((sl, i) => (
            <div key={i} className="border border-gray-200 rounded p-3 bg-gray-50">
              <div className="flex items-start gap-3">
                {/* Thumbnail */}
                <div className="w-20 h-14 flex-shrink-0 bg-gray-200 rounded overflow-hidden" style={{ backgroundColor: sl.bg }}>
                  {sl.src && <img src={sl.src} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Label</label>
                      <input value={sl.label} onChange={e => updateSlide(i, 'label', e.target.value)}
                        className="w-full border border-gray-300 px-2 py-1 text-sm outline-none focus:border-havico-blue"
                        placeholder="🇯🇵 Du học Nhật Bản" />
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-gray-500">Màu nền</label>
                      <input type="color" value={sl.bg || '#1565C0'} onChange={e => updateSlide(i, 'bg', e.target.value)}
                        className="w-full h-8 border border-gray-300 cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Ảnh</label>
                    <ImageUpload value={sl.src} onChange={url => updateSlide(i, 'src', url)} />
                  </div>
                </div>
                {/* Controls */}
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveSlide(i, -1)} disabled={i === 0}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-30">▲</button>
                  <button onClick={() => moveSlide(i, 1)} disabled={i === slides.length - 1}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-30">▼</button>
                  <button onClick={() => removeSlide(i)}
                    className="px-2 py-1 text-xs bg-red-50 border border-red-200 text-red-600 hover:bg-red-100">✕</button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={addSlide}
            className="w-full border-2 border-dashed border-gray-300 py-2 text-sm text-gray-500 hover:border-havico-blue hover:text-havico-blue transition-colors rounded">
            + Thêm slide
          </button>
        </div>
      </section>

      {/* ── About Section ── */}
      <section>
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span className="bg-havico-blue text-white text-xs px-2 py-0.5">GIỚI THIỆU</span>
          Nội dung section giới thiệu
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">YouTube Video ID</label>
            <input value={cfg.about_youtube_id || ''} onChange={e => setCfg(c => ({ ...c, about_youtube_id: e.target.value }))}
              className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue"
              placeholder="dQw4w9WgXcQ" />
            <p className="text-xs text-gray-400 mt-1">Ví dụ: https://youtube.com/watch?v=<strong>ABC123xyz</strong> → điền <strong>ABC123xyz</strong></p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Ảnh thumbnail video</label>
            <ImageUpload value={cfg.about_thumbnail || ''} onChange={url => setCfg(c => ({ ...c, about_thumbnail: url }))} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Nội dung giới thiệu (hiển thị trên trang Giới Thiệu)</label>
            <RichEditor value={cfg.about_text1 || ''} onChange={val => setCfg(c => ({ ...c, about_text1: val }))} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Đoạn văn bổ sung</label>
            <RichEditor value={cfg.about_text2 || ''} onChange={val => setCfg(c => ({ ...c, about_text2: val }))} />
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4 pt-2 border-t">
        <button onClick={save} disabled={saving}
          className="bg-havico-blue text-white px-6 py-2 text-sm font-semibold hover:bg-blue-800 disabled:opacity-60 transition-colors">
          {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
        {msg && <span className={`text-sm ${msg.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>{msg}</span>}
      </div>
    </div>
  );
}

// ─── Testimonials Panel ──────────────────────────────────────────────────────
const EMPTY_T = { name: '', role: '', avatar: '', country: '', content: '', sort_order: 0, is_published: 1 };

function TestimonialsPanel() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null); // null=list, object=edit/new
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const load = () => axios.get('/api/admin/testimonials', AUTH).then(r => setList(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const save = async () => {
    if (!editing.name.trim() || !editing.content.trim()) return alert('Vui lòng nhập tên và nội dung!');
    setSaving(true);
    try {
      if (editing.id) await axios.put(`/api/admin/testimonials/${editing.id}`, editing, AUTH);
      else await axios.post('/api/admin/testimonials', editing, AUTH);
      setEditing(null); load(); showToast('Đã lưu ý kiến học viên!');
    } catch { alert('Lỗi khi lưu.'); }
    setSaving(false);
  };

  const del = async (id) => {
    if (!window.confirm('Xóa ý kiến này?')) return;
    await axios.delete(`/api/admin/testimonials/${id}`, AUTH);
    load(); showToast('Đã xóa.');
  };

  const toggle = async (t) => {
    await axios.put(`/api/admin/testimonials/${t.id}`, { ...t, is_published: t.is_published ? 0 : 1 }, AUTH);
    load();
  };

  const setF = (k, v) => setEditing(f => ({ ...f, [k]: v }));

  if (editing) {
    return (
      <div>
        {toast && <div className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4 border border-green-200">{toast}</div>}
        <div className="bg-white border border-gray-200">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm">
              {editing.id ? `✏️ Sửa ý kiến #${editing.id}` : '➕ Thêm ý kiến học viên'}
            </h3>
            <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
          </div>
          <div className="p-5 space-y-4 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Họ tên *</label>
                <input value={editing.name} onChange={e => setF('name', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue"
                  placeholder="Nguyễn Thị Lan" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Vai trò</label>
                <input value={editing.role} onChange={e => setF('role', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue"
                  placeholder="Du học sinh Nhật Bản" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Cờ quốc gia (emoji)</label>
                <input value={editing.country} onChange={e => setF('country', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue"
                  placeholder="🇯🇵" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Thứ tự hiển thị</label>
                <input type="number" value={editing.sort_order} onChange={e => setF('sort_order', Number(e.target.value))}
                  className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ảnh đại diện</label>
              <ImageUpload value={editing.avatar} onChange={url => setF('avatar', url)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Nội dung ý kiến *</label>
              <textarea value={editing.content} onChange={e => setF('content', e.target.value)} rows={4}
                className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue resize-none"
                placeholder="Nhập nội dung ý kiến của học viên..." />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-gray-600">Trạng thái:</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!editing.is_published} onChange={e => setF('is_published', e.target.checked ? 1 : 0)} />
                <span className={`text-xs font-bold ${editing.is_published ? 'text-green-600' : 'text-gray-400'}`}>
                  {editing.is_published ? '✓ Hiển thị' : '○ Ẩn'}
                </span>
              </label>
            </div>
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button onClick={save} disabled={saving}
                className="bg-havico-blue text-white px-6 py-2 text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-60">
                {saving ? 'Đang lưu...' : (editing.id ? '💾 Cập nhật' : '➕ Thêm mới')}
              </button>
              <button onClick={() => setEditing(null)}
                className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 text-gray-600">Hủy</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <div className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4 border border-green-200">{toast}</div>}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-gray-800 text-base">⭐ Ý kiến học viên</h2>
          <p className="text-xs text-gray-400 mt-0.5">{list.length} ý kiến</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY_T })}
          className="bg-havico-blue text-white px-4 py-2 text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5">
          <span className="text-base leading-none">+</span> Thêm ý kiến
        </button>
      </div>
      <div className="bg-white border border-gray-200 overflow-hidden">
        {list.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">Chưa có ý kiến nào</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500 uppercase">Học viên</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500 uppercase">Nội dung</th>
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-500 uppercase w-20">Trạng thái</th>
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-500 uppercase w-28">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {t.avatar
                        ? <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        : <div className="w-8 h-8 rounded-full bg-havico-blue flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{t.name.charAt(0)}</div>
                      }
                      <div>
                        <div className="text-xs font-semibold text-gray-800">{t.name} {t.country}</div>
                        <div className="text-xs text-gray-400">{t.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">
                    <span className="line-clamp-2">"{t.content}"</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggle(t)}
                      className={`text-[10px] font-bold px-2.5 py-1 transition-colors ${
                        t.is_published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}>
                      {t.is_published ? '● Hiện' : '○ Ẩn'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => setEditing({ ...t })} className="text-xs text-havico-blue hover:underline font-semibold">Sửa</button>
                      <button onClick={() => del(t.id)} className="text-xs text-red-500 hover:underline font-semibold">Xóa</button>
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

// ─── Schools Panel ───────────────────────────────────────────────────────────
function SchoolsPanel() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = () => axios.get('/api/admin/schools', AUTH).then(r => setList(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const save = async () => {
    if (!editing.name?.trim()) return alert('Vui lòng nhập tên trường!');
    setSaving(true);
    try {
      await axios.put(`/api/admin/schools/${editing.id}`, editing, AUTH);
      setEditing(null); load(); showToast('Đã lưu thông tin trường!');
    } catch { alert('Lỗi khi lưu.'); }
    setSaving(false);
  };

  const setF = (k, v) => setEditing(f => ({ ...f, [k]: v }));

  // Helpers for dynamic arrays
  const addIntro = () => setF('intro', [...(editing.intro || []), '']);
  const updateIntro = (i, v) => setF('intro', editing.intro.map((p, idx) => idx === i ? v : p));
  const removeIntro = (i) => setF('intro', editing.intro.filter((_, idx) => idx !== i));

  const addHighlight = () => setF('highlights', [...(editing.highlights || []), { title: '', content: '' }]);
  const updateHighlight = (i, field, v) => setF('highlights', editing.highlights.map((h, idx) => idx === i ? { ...h, [field]: v } : h));
  const removeHighlight = (i) => setF('highlights', editing.highlights.filter((_, idx) => idx !== i));

  const addTuitionRow = () => setF('tuition_rows', [...(editing.tuition_rows || []), { label: '', value: '', note: '', highlight: false }]);
  const updateTuitionRow = (i, field, v) => setF('tuition_rows', editing.tuition_rows.map((r, idx) => idx === i ? { ...r, [field]: v } : r));
  const removeTuitionRow = (i) => setF('tuition_rows', editing.tuition_rows.filter((_, idx) => idx !== i));

  const uploadCert = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await axios.post('/api/admin/upload', fd, {
        headers: { ...AUTH.headers, 'Content-Type': 'multipart/form-data' },
      });
      setF('cert_images', [...(editing.cert_images || []), res.data.url]);
    } catch { alert('Upload thất bại'); }
    setUploading(false);
    e.target.value = '';
  };

  const removeCert = (i) => setF('cert_images', editing.cert_images.filter((_, idx) => idx !== i));

  if (editing) {
    return (
      <div className="max-w-3xl">
        {toast && <div className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4 border border-green-200">{toast}</div>}
        <div className="bg-white border border-gray-200">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm">✏️ Sửa: {editing.name}</h3>
            <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
          </div>
          <div className="p-5 space-y-6">

            {/* Basic info */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-1">Thông tin cơ bản</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Ảnh bìa trường</label>
                  <ImageUpload value={editing.img || ''} onChange={url => setF('img', url)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Tên trường *</label>
                    <input value={editing.name || ''} onChange={e => setF('name', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Tên ngắn</label>
                    <input value={editing.short_name || ''} onChange={e => setF('short_name', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Thành phố</label>
                    <input value={editing.city || ''} onChange={e => setF('city', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Quốc gia</label>
                    <input value={editing.country || ''} onChange={e => setF('country', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Năm thành lập</label>
                    <input type="number" value={editing.founded || ''} onChange={e => setF('founded', e.target.value ? Number(e.target.value) : null)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue" />
                  </div>
                </div>
              </div>
            </div>

            {/* Intro */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-1">Giới thiệu</h4>
              <div className="space-y-2">
                {(editing.intro || []).map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea value={p} onChange={e => updateIntro(i, e.target.value)} rows={3}
                      className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue resize-none"
                      placeholder={`Đoạn ${i + 1}...`} />
                    <button onClick={() => removeIntro(i)}
                      className="text-red-400 hover:text-red-600 px-2 text-lg flex-shrink-0">✕</button>
                  </div>
                ))}
                <button onClick={addIntro}
                  className="text-xs text-havico-blue hover:underline font-semibold">+ Thêm đoạn</button>
              </div>
            </div>

            {/* Tuition */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-1">Học phí</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Ghi chú học phí</label>
                  <textarea value={editing.tuition_note || ''} onChange={e => setF('tuition_note', e.target.value)} rows={3}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-havico-blue resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Bảng học phí</label>
                  <div className="space-y-2">
                    {(editing.tuition_rows || []).map((r, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <input value={r.label} onChange={e => updateTuitionRow(i, 'label', e.target.value)}
                          className="flex-1 border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-havico-blue"
                          placeholder="Tên khoản phí" />
                        <input value={r.value} onChange={e => updateTuitionRow(i, 'value', e.target.value)}
                          className="w-36 border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-havico-blue"
                          placeholder="Số tiền" />
                        <input value={r.note} onChange={e => updateTuitionRow(i, 'note', e.target.value)}
                          className="w-28 border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-havico-blue"
                          placeholder="Ghi chú" />
                        <label className="flex items-center gap-1 text-xs text-gray-600 pt-1.5 whitespace-nowrap">
                          <input type="checkbox" checked={!!r.highlight} onChange={e => updateTuitionRow(i, 'highlight', e.target.checked)} />
                          Nổi bật
                        </label>
                        <button onClick={() => removeTuitionRow(i)} className="text-red-400 hover:text-red-600 pt-1 text-lg">✕</button>
                      </div>
                    ))}
                    <button onClick={addTuitionRow} className="text-xs text-havico-blue hover:underline font-semibold">+ Thêm dòng</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-1">Điểm nổi bật</h4>
              <div className="space-y-3">
                {(editing.highlights || []).map((h, i) => (
                  <div key={i} className="border border-gray-200 rounded p-3 space-y-2">
                    <div className="flex gap-2 items-center">
                      <input value={h.title} onChange={e => updateHighlight(i, 'title', e.target.value)}
                        className="flex-1 border border-gray-300 px-2 py-1.5 text-xs font-semibold outline-none focus:border-havico-blue"
                        placeholder="Tiêu đề điểm nổi bật" />
                      <button onClick={() => removeHighlight(i)} className="text-red-400 hover:text-red-600 text-lg">✕</button>
                    </div>
                    <textarea value={h.content} onChange={e => updateHighlight(i, 'content', e.target.value)} rows={3}
                      className="w-full border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-havico-blue resize-none"
                      placeholder="Nội dung..." />
                  </div>
                ))}
                <button onClick={addHighlight} className="text-xs text-havico-blue hover:underline font-semibold">+ Thêm điểm nổi bật</button>
              </div>
            </div>

            {/* Cert Images */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-1">Ảnh giấy chứng nhận</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                {(editing.cert_images || []).map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt="" className="w-full h-24 object-cover border border-gray-200 rounded" />
                    <button onClick={() => removeCert(i)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      ✕
                    </button>
                  </div>
                ))}
                <label className={`flex flex-col items-center justify-center h-24 border-2 border-dashed rounded cursor-pointer transition-colors ${uploading ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-400 hover:border-havico-blue hover:text-havico-blue'}`}>
                  {uploading ? (
                    <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : (
                    <>
                      <span className="text-2xl">+</span>
                      <span className="text-xs mt-1">Tải ảnh lên</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={uploadCert} />
                </label>
              </div>
              <p className="text-xs text-gray-400">Ảnh chứng nhận sẽ hiển thị cuối trang chi tiết trường.</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button onClick={save} disabled={saving}
                className="bg-havico-blue text-white px-6 py-2 text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-60">
                {saving ? 'Đang lưu...' : '💾 Lưu thay đổi'}
              </button>
              <button onClick={() => setEditing(null)}
                className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50 text-gray-600">Hủy</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <div className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4 border border-green-200">{toast}</div>}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-gray-800 text-base">🏫 Trường liên kết</h2>
          <p className="text-xs text-gray-400 mt-0.5">{list.length} trường</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 overflow-hidden">
        {list.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">Đang tải...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500 uppercase">Trường</th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-500 uppercase w-32">Thành phố</th>
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-500 uppercase w-24">Ảnh CK</th>
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-500 uppercase w-20">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {s.img && <img src={s.img} alt="" className="w-12 h-8 object-cover rounded flex-shrink-0 border border-gray-200" />}
                      <div>
                        <div className="text-xs font-semibold text-gray-800 line-clamp-1">{s.name}</div>
                        <div className="text-[10px] text-gray-400">{s.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{s.city}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 ${(s.cert_images || []).length > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      {(s.cert_images || []).length} ảnh
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => setEditing({ ...s })}
                      className="text-xs text-havico-blue hover:underline font-semibold">Sửa</button>
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
                <button onClick={() => setActiveKey('schools')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    activeKey === 'schools'
                      ? 'bg-havico-blue text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  <span className="flex items-center gap-2">
                    <span>🏫</span>
                    <span className="text-xs">Trường liên kết</span>
                  </span>
                </button>
                <button onClick={() => setActiveKey('testimonials')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    activeKey === 'testimonials'
                      ? 'bg-havico-blue text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  <span className="flex items-center gap-2">
                    <span>⭐</span>
                    <span className="text-xs">Ý kiến học viên</span>
                  </span>
                </button>
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
          ) : activeKey === 'testimonials' ? (
            <TestimonialsPanel />
          ) : activeKey === 'schools' ? (
            <SchoolsPanel />
          ) : activeKey === 'gioi-thieu' ? (
            <GioiThieuPanel />
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
