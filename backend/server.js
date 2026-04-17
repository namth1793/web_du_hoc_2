import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Chỉ chấp nhận file ảnh'));
  },
});

const app = express();
const PORT = process.env.PORT || 5020;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'havico.db'));

// ─── SCHEMA ──────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    section TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    cover_image TEXT DEFAULT '',
    excerpt TEXT DEFAULT '',
    content TEXT DEFAULT '',
    author TEXT DEFAULT 'Ban biên tập Việt Phát VTI',
    published_at TEXT DEFAULT (datetime('now','localtime')),
    is_published INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, phone TEXT, email TEXT, province TEXT, message TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT DEFAULT '',
    avatar TEXT DEFAULT '',
    country TEXT DEFAULT '',
    content TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS schools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    short_name TEXT DEFAULT '',
    country TEXT DEFAULT 'Nhật Bản',
    city TEXT DEFAULT '',
    img TEXT DEFAULT '',
    founded INTEGER,
    addresses TEXT DEFAULT '[]',
    intro TEXT DEFAULT '[]',
    tuition_note TEXT DEFAULT '',
    tuition_rows TEXT DEFAULT '[]',
    admission TEXT DEFAULT '[]',
    courses TEXT DEFAULT '[]',
    highlights TEXT DEFAULT '[]',
    cert_images TEXT DEFAULT '[]',
    sort_order INTEGER DEFAULT 0
  );
`);

// ─── SEED SETTINGS ───────────────────────────────────────────────────────────
const DEFAULT_SLIDES = JSON.stringify([
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80', label: '🇯🇵 Du học Nhật Bản', bg: '#1565C0' },
  { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=80',    label: '🇯🇵 Cuộc sống tại Nhật Bản', bg: '#0d47a1' },
  { src: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1920&q=80', label: '🇰🇷 Du học Hàn Quốc', bg: '#1a237e' },
  { src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80', label: '🇩🇪 Du học Đức', bg: '#1b5e20' },
  { src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=80', label: '🇸🇬 Du học Singapore', bg: '#b71c1c' },
]);
const DEFAULT_SETTINGS = {
  hero_slides:     DEFAULT_SLIDES,
  about_youtube_id: 'dQw4w9WgXcQ',
  about_thumbnail:  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
  about_text1: 'Công ty Cổ phần Đầu tư và Phát triển Thương mại Việt Phát (VTI) là doanh nghiệp hoạt động trong lĩnh vực tư vấn du học, với thị trường chiến lược là Nhật Bản. VTI làm việc trực tiếp với các trường mà không qua trung gian, giúp học viên có chi phí thấp nhất và dịch vụ tốt nhất.',
  about_text2: 'Ngoài ra, VTI tặng miễn phí khóa học tiếng Nhật cấp tốc cho tất cả học viên đăng ký du học Nhật Bản. Đội ngũ tư vấn nhiệt tình, hỗ trợ toàn diện từ lúc chọn trường đến khi ổn định cuộc sống tại nước ngoài.',
};
// ─── SEED TESTIMONIALS ────────────────────────────────────────────────────────
const tCount = db.prepare('SELECT COUNT(*) as c FROM testimonials').get().c;
if (tCount === 0) {
  const seedTestimonials = [
    { name: 'Đỗ Nhược Thảo', role: 'Du học sinh Nhật Bản', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', country: '🇯🇵', content: 'Các anh chị ở Việt Phát VTI hỗ trợ tôi rất nhiều trong quá trình làm thủ tục du học và sau khi đến Nhật du học. Cảm ơn công ty rất nhiều.', sort_order: 1 },
    { name: 'Nguyễn Thị Nga', role: 'Du học sinh Nhật Bản', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80', country: '🇯🇵', content: 'Các anh chị ở Việt Phát VTI hỗ trợ tôi rất nhiều trong quá trình làm thủ tục du học và sau khi đến Nhật du học. Cảm ơn trung tâm rất nhiều.', sort_order: 2 },
    { name: 'Trần Văn Minh', role: 'Du học sinh Hàn Quốc', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', country: '🇰🇷', content: 'Tôi rất hài lòng với dịch vụ tư vấn của VTI. Đội ngũ nhiệt tình, hỗ trợ từ A đến Z, giúp tôi hoàn thành toàn bộ thủ tục dễ dàng và nhanh chóng.', sort_order: 3 },
  ];
  const insT = db.prepare('INSERT INTO testimonials (name,role,avatar,country,content,sort_order,is_published) VALUES (?,?,?,?,?,?,1)');
  seedTestimonials.forEach(t => insT.run(t.name, t.role, t.avatar, t.country, t.content, t.sort_order));
}

const insertSetting = db.prepare('INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)');
Object.entries(DEFAULT_SETTINGS).forEach(([k, v]) => insertSetting.run(k, v));

// ─── SEED SCHOOLS ─────────────────────────────────────────────────────────────
const sCount = db.prepare('SELECT COUNT(*) as c FROM schools').get().c;
if (sCount === 0) {
  const J = JSON.stringify;
  const seedSchools = [
    {
      slug: 'yiea-tokyo', sort_order: 1,
      name: 'YIEA Tokyo Academy – Học Viện Tokyo YIEA', short_name: 'YIEA Tokyo',
      country: 'Nhật Bản', city: 'Tokyo',
      img: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80',
      founded: 2000,
      addresses: J(['Địa chỉ cũ: 6-32-7 Kameido Koto-ku, Tokyo 136-0071', 'Địa chỉ mới: Yubinbango111-0053 Taito-ku, Tokyo Asakusabashi 2-20-5']),
      intro: J(['Được thành lập năm 1988, Học viện YIEA Tokyo tọa lạc tại thành phố Tokyo. Đây là trường đào tạo Nhật ngữ hàng đầu Nhật Bản với hơn 400 học viên đến từ những quốc gia khác nhau theo học.', 'Ngay từ khi thành lập, trường đã thu hút được nhiều du học sinh với chất lượng đào tạo tốt và toàn diện. Đến năm 2008 nhà trường đã mở thêm chi nhánh học viện YIEA tại trung tâm thành phố Tokyo với quy mô lớn.']),
      tuition_note: 'Học phí đã bao gồm phí sách giáo khoa (từ lúc nhập học đến lúc tốt nghiệp) và phí bảo hiểm sức khỏe.',
      tuition_rows: J([{label:'Phí xét tuyển',value:'20,000 JPY',note:'Thanh toán khi nộp đơn'},{label:'Phí nhập học',value:'70,000 JPY',note:''},{label:'Học phí (1 năm)',value:'620,000 JPY',note:''},{label:'Tổng phí (năm đầu tiên)',value:'710,000 JPY',note:'',highlight:true}]),
      admission: J([{term:'Tháng 4',duration:'1 năm / 2 năm',applyPeriod:'Tháng 10 ~ Tháng 11'},{term:'Tháng 7',duration:'1 năm 9 tháng',applyPeriod:'Tháng 2 ~ Tháng 3'},{term:'Tháng 10',duration:'1 năm 6 tháng',applyPeriod:'Tháng 4 ~ Tháng 5'},{term:'Tháng 1',duration:'1 năm 3 tháng',applyPeriod:'Tháng 8 ~ Tháng 9'}]),
      courses: J([{level:'Sơ cấp',items:['Luyện tập phát âm tiếng Nhật chính xác.','Giao tiếp tiếng Nhật thông thường.','Đọc hiểu những đoạn văn ngắn đơn giản, viết nhật ký, thư, tiểu luận.','Luyện tập cho kỳ thi năng lực Nhật ngữ 3kyu.']},{level:'Trung cấp',items:['Đọc hiểu những bài báo và luận văn đơn giản.','Luyện nghe tin tức mới định kỳ.','Tổng hợp suy nghĩ, phát biểu.','Luyện tập cho kỳ thi du học Nhật Bản và kỳ thi năng lực Nhật ngữ 2kyu.']},{level:'Trung thượng cấp',items:['Đọc hiểu tiếng Nhật một cách tự nhiên như người bản xứ.','Đọc hiểu những bài báo chuyên đề và tiểu thuyết đơn giản.','Luyện tập cho kỳ thi năng lực Nhật ngữ 1kyu.']},{level:'Thượng cấp',items:['Có thể diễn tả tiếng Nhật một cách tự nhiên nhất.','Có thể nghe hiểu tốt những bài giảng chuyên đề.','Đạt được trình độ tiếng Nhật cho những nghiên cứu chuyên đề.']}]),
      highlights: J([{title:'Giao thông rất thuận tiện',content:'Với vị trí nằm tại trung tâm thành phố, từ trường có thể di chuyển đến thành phố Yokohama chỉ với 20 phút đi tàu điện. Bạn cũng có nhiều cơ hội tham quan phòng hội nghị quốc tế, phòng mỹ thuật YOKOHAMA, và Minato Mirai 21.'},{title:'Chương trình tiêu chuẩn quốc tế',content:'Các giáo viên được trang bị kiến thức tiếng Nhật chuẩn với giáo trình dạy học đa dạng, hướng đến thực tế, đem đến chương trình đào tạo đạt tiêu chuẩn quốc tế.'},{title:'Chú trọng rèn luyện nhân cách',content:'Học viện YIEA thực hiện phương châm không chỉ luyện tập các em giỏi tiếng Nhật mà còn giáo dục các em trở thành người có nhân cách tốt, mang tính quốc tế.'}]),
      cert_images: J([]),
    },
    {
      slug: 'arc-academy', sort_order: 2,
      name: 'Học viện ARC (ARC Academy)', short_name: 'ARC Academy',
      country: 'Nhật Bản', city: 'Tokyo · Osaka · Kyoto',
      img: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80',
      founded: 1986,
      addresses: J(['Cơ sở Iidabashi: cách ga Iidabashi 900m (Tokyo)','Cơ sở Itabashi & Shinjuku (Tokyo)','Cơ sở Namba (Osaka)','Cơ sở Kyoto']),
      intro: J(['Học viện ARC được thành lập vào năm 1986, dành cho những doanh nhân người nước ngoài có nhu cầu học tiếng Nhật. ARC có ý nghĩa là "cánh cổng dẫn đến thế giới".','Từ khi thành lập đến nay, quy mô của trường ngày càng mở rộng, phục vụ các đối tượng từ doanh nhân đến học sinh, nhà nghiên cứu, nhân viên đại sứ quán, thực tập sinh và cả những người có kế hoạch định cư dài hạn.','Học viện cung cấp các khóa học được giảng dạy bởi giáo viên dày dặn kinh nghiệm và nhiệt huyết, đồng thời đem đến môi trường quốc tế phong phú.']),
      tuition_note: 'Học viện Arc Academy có nhiều chương trình học bổng cho sinh viên có thành tích xuất sắc và chế độ hỗ trợ chi phí y tế dành riêng cho học viên. Vui lòng liên hệ Việt Phát VTI để được tư vấn học phí chi tiết.',
      tuition_rows: J([]),
      admission: J([]),
      courses: J([{level:'Khóa học du học',items:['Dành cho học viên có nhu cầu học tiếng Nhật hệ thống, mục tiêu thi vào đại học hoặc chương trình sau đại học.','Chú trọng kỹ năng giao tiếp và tiếng Nhật học thuật.']},{level:'Khóa học cấp tốc',items:['Dành cho học viên đang trải nghiệm hoặc cư trú tại Nhật, cần tiếng Nhật để giao tiếp và làm việc.','Tập trung vào kỹ năng nghe và nói tự nhiên, lưu loát.']},{level:'Khóa học cá nhân',items:['Thiết kế riêng cho từng cá nhân, từ người mới bắt đầu đến trình độ cao.','Thời gian học linh hoạt theo nhu cầu học viên.']}]),
      highlights: J([{title:'Đội ngũ giảng viên ưu tú',content:'Đội ngũ giáo viên có trình độ chuyên môn tốt và nhiệt tình, đem đến những giờ học chất lượng. Giáo viên cũng hỗ trợ học viên tận tình trong những vấn đề sinh hoạt và cuộc sống hàng ngày.'},{title:'Quy mô lớn và môi trường đa quốc gia',content:'Trường gồm 2 cơ sở tại Tokyo, cơ sở ở Namba – Osaka và Kyoto. Các du học sinh quốc tế đến từ hơn 40 quốc gia.'},{title:'Hỗ trợ toàn diện cho du học sinh',content:'Nhà trường bố trí ký túc xá gần trường với giá cả phải chăng và an toàn. Trường có phòng hỗ trợ việc làm chuyên biệt, cung cấp thông tin và giới thiệu việc làm sau ít nhất 3 tháng đầu học tập.'}]),
      cert_images: J([]),
    },
    {
      slug: 'kobe-sumiyoshi', sort_order: 3,
      name: 'Trường Nhật ngữ Quốc tế Kobe Sumiyoshi', short_name: 'Kobe Sumiyoshi',
      country: 'Nhật Bản', city: 'Kobe',
      img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
      founded: 2001,
      addresses: J(['2-21-8 Sumiyoshimiya-cho, Higashi-Nada-ku, Kobe-shi']),
      intro: J(['Trường Nhật ngữ Quốc tế Kobe Sumiyoshi là cơ sở giảng dạy và đào tạo tiếng Nhật uy tín tại tỉnh Kobe, được thành lập vào tháng 7/2001.','Thành phố Kobe nằm tại miền Nam Hyogo, là một trong những thành phố cảng quan trọng của xứ hoa anh đào. Xung quanh trường có nhiều địa điểm nổi tiếng như núi Rokko, suối nước nóng Arima và các lễ hội văn hóa độc đáo quanh năm.']),
      tuition_note: 'Học phí đã bao gồm chi phí đăng ký.',
      tuition_rows: J([{label:'Khóa dự bị đại học A (2 năm)',value:'1,404,200 JPY',note:''},{label:'Khóa dự bị đại học B (1 năm 6 tháng)',value:'1,070,400 JPY',note:''}]),
      admission: J([{term:'Tháng 4',duration:'2 năm (Khóa A)',applyPeriod:'—'},{term:'Tháng 10',duration:'1 năm 6 tháng (Khóa B)',applyPeriod:'—'}]),
      courses: J([{level:'Khóa dự bị đại học A',items:['Thời gian đào tạo 2 năm, nhập học Tháng 4.','Đào tạo tiếng Nhật chuyên sâu, mang tính ứng dụng cao cho sinh viên quốc tế.']},{level:'Khóa dự bị đại học B',items:['Thời gian đào tạo 1 năm 6 tháng, nhập học Tháng 10.','Chương trình được thiết kế bài bản, đáp ứng tốt nhất nhu cầu học tập của sinh viên quốc tế.']}]),
      highlights: J([{title:'Môi trường đào tạo chuyên nghiệp',content:'Trường trang bị phòng học và phòng tư vấn lộ trình học lên cao, cùng những phòng học đa năng trên sân thượng nơi học viên có thể ngắm đỉnh núi Rokko. Ngoài ra có nhiều hoạt động ngoại khóa như dã ngoại đến Kyoto, núi Awaji, cuộc thi thể thao mỗi năm.'},{title:'Định hướng tương lai',content:'Mục tiêu cốt yếu là giảng dạy tiếng Nhật và cung cấp kiến thức phục vụ học viên học lên các chương trình cao hơn. Hàng năm tỷ lệ chọn học lên cao lên đến 98%. Trường có hệ thống tư vấn một học viên – một giáo viên và thường xuyên mời cán bộ tuyển sinh từ các trường đại học đến trao đổi cùng học viên.'},{title:'Chuyên môn hóa đào tạo',content:'Trường còn có những lớp học dành cho các bạn muốn theo đuổi ngành sản xuất anime và xe hơi. Sau khi hoàn thành chương trình Nhật ngữ, học viên có thể học tiếp tại các trường dạy nghề liên kết trực tiếp, và xin việc làm tại Nhật hay Việt Nam sau khi tốt nghiệp.'}]),
      cert_images: J([]),
    },
    {
      slug: 'osaka-kokusai', sort_order: 4,
      name: 'Trường Nhật ngữ Osaka Kokusai Academy', short_name: 'Osaka Kokusai',
      country: 'Nhật Bản', city: 'Osaka',
      img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
      founded: null,
      addresses: J(['2-8-5, Haginochaya, Nishinariku, Osaka']),
      intro: J(['Trường Osaka Kokusai Academy có vị trí tại trung tâm Osaka, với mạng lưới giao thông thuận tiện đến Thành Osaka, Dotonbori, Công viên USJ, cách Namba khoảng 15 phút đi bộ.','Đội ngũ giáo viên tại trường có nhiều năm kinh nghiệm trong việc đào tạo tiếng Nhật cho du học sinh. Ngoài việc giảng dạy trên lớp, thầy cô còn quan tâm đến việc sinh hoạt hàng ngày của các bạn, luôn giúp đỡ và hỗ trợ khi gặp khó khăn.','Bên cạnh đó, trường tổ chức kỳ thi kiểm tra năng lực đầu vào khi nhập học để xác định trình độ tiếng Nhật của mỗi học viên và chia lớp phù hợp.']),
      tuition_note: 'Tỷ giá tham khảo: 1 Yên = 215 VNĐ.',
      tuition_rows: J([{label:'Phí nhập học',value:'50,000 Yên',note:''},{label:'Phí đăng ký',value:'30,000 Yên',note:''},{label:'Học phí 12 tháng (chưa thuế)',value:'580,000 Yên',note:''},{label:'Phí tài liệu',value:'30,000 Yên',note:''},{label:'Phí cơ sở',value:'20,000 Yên',note:''},{label:'Tổng học phí năm đầu',value:'710,000 Yên (~152,650,000 VNĐ)',note:'',highlight:true},{label:'Tiền vào nhà (KTX)',value:'25,000 Yên',note:''},{label:'Tiền nhà KTX 6 tháng',value:'180,000 Yên',note:''},{label:'Tổng KTX 6 tháng',value:'205,000 Yên (~44,075,000 VNĐ)',note:'',highlight:true}]),
      admission: J([]),
      courses: J([]),
      highlights: J([{title:'Vị trí trung tâm Osaka',content:'Trường tọa lạc tại trung tâm Osaka, với mạng lưới giao thông thuận tiện đến Thành Osaka, Dotonbori, Công viên USJ. Cách Namba khoảng 15 phút đi bộ – trung tâm mua sắm và giải trí sầm uất nhất Osaka.'},{title:'Giảng dạy theo trình độ',content:'Trường tổ chức kỳ thi kiểm tra năng lực đầu vào để xác định trình độ tiếng Nhật và chia lớp phù hợp. Từ đó, giúp học viên cải thiện năng lực thông qua hoạt động hướng nghiệp kỹ càng từ đối thoại hàng ngày đến tìm việc làm.'}]),
      cert_images: J([]),
    },
    {
      slug: 'isb-tokyo', sort_order: 5,
      name: 'Trường Kinh Doanh Quốc Tế ISB (International School of Business)', short_name: 'ISB Tokyo',
      country: 'Nhật Bản', city: 'Tokyo',
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      founded: null,
      addresses: J([]),
      intro: J(['Trường chuyên môn Kinh Doanh Quốc Tế Nhật Bản (ISB) là nơi đào tạo chuyên sâu ngành tiếng Nhật – một Trung tâm nghiên cứu tiếng Nhật nổi tiếng tại Tokyo.','Chúng tôi muốn trở thành môi trường giáo dục quốc tế, giúp học sinh đạt được các mục tiêu đã đề ra và biến giấc mơ thành hiện thực.']),
      tuition_note: 'Học bổng ISB: sau khi nhập học sẽ xét duyệt dựa trên kết quả học tập. Học viên được nhận học bổng 100,000 JPY giảm trừ trên học phí. Sinh viên năm 1 có điểm chuyên cần cao, thành tích xuất sắc sẽ được Hiệu trưởng trực tiếp trao tặng học bổng đặc biệt.',
      tuition_rows: J([{label:'Lệ phí tuyển sinh',value:'20,000 JPY',note:'Cả 2 hệ'},{label:'Lệ phí nhập học',value:'50,000 JPY',note:'Cả 2 hệ'},{label:'Học phí 1 năm – Chuyên ngành tiếng Nhật',value:'650,000 JPY',note:''},{label:'Học phí 1 năm – Trung tâm nghiên cứu',value:'560,000 JPY',note:''},{label:'Tài liệu học tập',value:'50,000 JPY',note:'Cả 2 hệ'},{label:'Tổng – Chuyên ngành tiếng Nhật',value:'770,000 JPY',note:'',highlight:true},{label:'Tổng – Trung tâm nghiên cứu',value:'680,000 JPY',note:'',highlight:true}]),
      admission: J([]),
      courses: J([{level:'Chuyên ngành tiếng Nhật',items:['Bằng chứng nhận chuyên môn: Có.','Tổng số thời gian học: khoảng 900h/năm (5 tiết/ngày).','Nghỉ hè khoảng 2 tuần, thi định kỳ 2 lần/học kỳ.','Phù hợp cho bạn muốn ở lại Nhật làm việc nhưng chưa có bằng tốt nghiệp chuyên ngành.']},{level:'Trung tâm nghiên cứu tiếng Nhật',items:['Bằng chứng nhận chuyên môn: Không.','Tổng số thời gian học: khoảng 800h/năm (4 tiết/ngày).','Nghỉ hè khoảng 2 tuần, thi định kỳ 2 lần/học kỳ.']}]),
      highlights: J([{title:'Ký túc xá tiện nghi',content:'Có 2 cơ sở KTX: cơ sở 1 đi tàu 35 phút (từ ga đến trường 2 phút), cơ sở 2 đi bộ 10 phút. KTX được trang bị đầy đủ: vòi sen, nhà vệ sinh, nhà bếp, phòng ăn, tủ quần áo, tủ lạnh, máy giặt và tivi.'},{title:'Hỗ trợ tìm việc làm thêm',content:'Tại ISB có giáo viên chuyên môn đảm nhận việc tìm việc làm thêm cho sinh viên. ISB còn hướng dẫn viết sơ yếu lý lịch, cách liên lạc nhà tuyển dụng và chuẩn bị phỏng vấn.'}]),
      cert_images: J([]),
    },
    {
      slug: 'oja-osaka', sort_order: 6,
      name: 'Học viện ngôn ngữ Osaka (OJA – Osaka Japanese Language Academy)', short_name: 'OJA Osaka',
      country: 'Nhật Bản', city: 'Osaka',
      img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80',
      founded: 2012,
      addresses: J(['2-2-12 Nagayoshi-nagaharanishi, Hirano-ku, Osaka-shi, Osaka 547-0015']),
      intro: J(['Học viện ngôn ngữ Osaka (OJA) thành lập vào tháng 2 năm 2012, tọa lạc tại khu vực thành phố Osaka. Trường tập trung nhiều giáo viên giàu kinh nghiệm và có chất lượng đào tạo hàng đầu tại Nhật Bản.','Toàn bộ kiến thức và giáo trình học của du học sinh sẽ được nhà trường trang bị kỹ lưỡng từ sơ cấp đến cao cấp, bao gồm các khóa học dự bị và khóa học ngắn hạn cho các hệ thống giáo dục đại học và cao học tại Nhật.','Học viện OJA có chương trình đào tạo đa dạng, mỗi lớp học chia thành nhóm nhỏ tối đa khoảng 20 người, có chế độ học tập cho 244 học sinh mỗi ngày, chia thành 2 buổi sáng và chiều, mỗi buổi có 7 lớp học.']),
      tuition_note: 'Ký túc xá 6 tháng (không bắt buộc) – 202,000 Yên, bao gồm phí KTX, chăn gối nệm, bảo hiểm tai nạn và phí đưa đón sân bay.',
      tuition_rows: J([{label:'Học phí (1 năm)',value:'680,000 Yên',note:'',highlight:true},{label:'KTX 6 tháng (không bắt buộc)',value:'202,000 Yên',note:'Bao gồm phí KTX, chăn gối, bảo hiểm, đưa đón sân bay'}]),
      admission: J([]),
      courses: J([]),
      highlights: J([{title:'Đội ngũ giáo viên chất lượng',content:'Trường tập trung nhiều giáo viên giàu kinh nghiệm, có chất lượng đào tạo hàng đầu. Với môi trường học tốt và sự nhiệt tình hướng dẫn của giáo viên, học viên dễ tiếp thu kiến thức hơn.'},{title:'Ký túc xá và hỗ trợ sinh viên',content:'Để tạo điều kiện cho học viên lần đầu nhập học, nhà trường xây dựng ký túc xá riêng với chi phí thấp nhất, trang bị đầy đủ thiết bị hiện đại. Nhà trường sẽ giới thiệu việc làm thêm cho các bạn sau khi học tháng đầu tiên tại trường.'},{title:'Hoạt động ngoại khóa phong phú',content:'Nhà trường tổ chức các buổi học ngoại khóa để các bạn trải nghiệm và tìm hiểu về nền văn hóa và con người Nhật Bản qua những hoạt động thú vị nhất.'}]),
      cert_images: J([]),
    },
    {
      slug: 'kobe-university', sort_order: 7,
      name: 'Đại học Quốc tế Kobe (Kobe University)', short_name: 'Đại học Kobe',
      country: 'Nhật Bản', city: 'Kobe',
      img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
      founded: null,
      addresses: J([]),
      intro: J(['Đại học Kobe là một trong những trường đại học quốc gia có tuổi thọ lớn nhất của Nhật Bản, đào tạo các chuyên ngành về kinh tế và quản trị kinh doanh. Là đầu não nghiên cứu kinh tế của Nhật Bản, Kobe được mệnh danh là vùng đất sản sinh ra nền giáo dục về kinh tế.','Trước khi được học Đại học, các du học sinh được học tại Khoa tiếng. Trường đào tạo 15 khoa chủ yếu ở hai lĩnh vực kinh tế và phục hồi chức năng.']),
      tuition_note: 'Các trường đại học Nhật Bản thường không miễn giảm học phí hoàn toàn. Trường có chương trình giảm 50% học phí cho các trường hợp đặc biệt và nhiều chế độ học bổng đa dạng. Sinh viên chỉ cần có thành tích tốt là có thể được tiến cử học bổng. Vui lòng liên hệ Việt Phát VTI để được tư vấn học phí chi tiết.',
      tuition_rows: J([]),
      admission: J([]),
      courses: J([]),
      highlights: J([{title:'Chương trình đào tạo toàn diện',content:'Trường đại học quốc tế Kobe đào tạo 15 khoa chủ yếu ở hai lĩnh vực kinh tế và phục hồi chức năng. Trước khi vào đại học, du học sinh được học tại Khoa tiếng để chuẩn bị nền tảng ngôn ngữ.'},{title:'Cơ sở vật chất hiện đại',content:'Mỗi khoa được xây dựng một thư viện, sân bóng và nhà thi đấu riêng. Du học sinh còn được trang bị thêm phòng tự học và phòng tra cứu tài liệu.'},{title:'Chính sách học bổng',content:'Mặc dù hiếm có chương trình giảm 100%, trường vẫn có giảm 50% học phí trong một số trường hợp đặc biệt, cùng với rất nhiều chế độ học bổng. Sinh viên chỉ cần có thành tích tốt là có thể được tiến cử nhận học bổng.'}]),
      cert_images: J([]),
    },
    {
      slug: 'osafune', sort_order: 8,
      name: 'Học viện Nhật ngữ Osafune', short_name: 'Osafune',
      country: 'Nhật Bản', city: 'Okayama',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      founded: 1990,
      addresses: J(['Thành phố Okayama, tỉnh Okayama, Nhật Bản']),
      intro: J(['Học viện Nhật ngữ Osafune nằm trong quy mô học viên giáo dục phát triển của Nhật. Đội ngũ giáo viên tại đây đều có trình độ chuyên môn cao, được tuyển chọn vô cùng kỹ càng.','Học viện Nhật ngữ Osafune được thành lập năm 1990 và hiện là trường học thu hút du học sinh quốc tế đứng top đầu của Nhật Bản.','Học viện Nhật ngữ Osafune nằm ở thành phố Okayama – được mệnh danh là thành phố của giáo dục. Nơi đây có ngôi trường Shizutani lâu đời nhất của Nhật Bản và với 13 trường Đại học công lập, Okayama là điểm đến du học lý tưởng.']),
      tuition_note: 'Học phí thấp, ký túc xá tiện lợi (bao gồm 3 bữa ăn). Vui lòng liên hệ Việt Phát VTI để được tư vấn học phí chi tiết.',
      tuition_rows: J([]),
      admission: J([]),
      courses: J([]),
      highlights: J([{title:'Được công nhận bởi Hội chấn hưng giáo dục Nhật ngữ',content:'Học viện được Hội chấn hưng giáo dục Nhật ngữ công nhận. Tự hào có tỉ lệ học sinh đạt điểm cao trong các kỳ thi năng lực Nhật ngữ và công tác tư vấn hiệu quả cho học viên trong việc chọn trường và thi vào các trường chuyên môn, cao đẳng, đại học, cao học.'},{title:'Chương trình giáo dục toàn diện',content:'Giáo trình của nhà trường luôn được đổi mới để bắt kịp xã hội hiện đại, xen lẫn với các bài học về văn hoá, truyền thống. Ngoài việc học kiến thức trên lớp, nhà trường còn có nhiều chuyên gia tư vấn giúp đỡ các em giải quyết những vấn đề khó khăn trong cuộc sống.'},{title:'Thành phố Okayama – điểm đến lý tưởng',content:'Với tư cách là mạch nối giao thông quan trọng kể từ khi cây cầu Seto Ohashi được khai thông, Okayama ngày càng phát triển, mang lại nhiều cơ hội học tập và làm việc cho du học sinh.'}]),
      cert_images: J([]),
    },
    {
      slug: 'meric-osaka', sort_order: 9,
      name: 'Trường Nhật Ngữ Meric (Meric Japanese Language School)', short_name: 'Meric Osaka',
      country: 'Nhật Bản', city: 'Osaka',
      img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
      founded: 1987,
      addresses: J(['556-0006 Japan, Osaka-shi, Nariwa-ku, Nipponbashi-higashi 1-10-6 Meric Building 2F']),
      intro: J(['Meric Japanese Language School được thành lập từ năm 1987, với mục tiêu giảng dạy và nâng cao trình độ tiếng Nhật cho các học viên; đồng thời chú trọng vào việc luyện thi vào các trường đại học, cao đẳng, trường chuyên môn tại Nhật Bản.','Bên cạnh đó, trường cũng chú trọng đào tạo nguồn nhân lực chất lượng cao trong các ngành đặc biệt như phiên dịch và hướng dẫn viên du lịch.','Cùng với các chương trình học tiếng Nhật trên lớp, trường còn thường xuyên tổ chức: các cuộc thi hùng biện tiếng Nhật; các chương trình ngoại khóa; các lớp học văn hóa nhằm tạo cơ hội cho học viên tìm hiểu thêm về văn hóa, truyền thống của đất nước Nhật Bản.']),
      tuition_note: 'Trường có chế độ học bổng đa dạng và hỗ trợ ký túc xá riêng. Vui lòng liên hệ Việt Phát VTI để được tư vấn học phí chi tiết.',
      tuition_rows: J([]),
      admission: J([]),
      courses: J([]),
      highlights: J([{title:'Vị trí thuận lợi tại Osaka',content:'Trường Meric nằm ở vị trí thuận lợi, chỉ mất 10 phút đi bộ từ ga Nipponbashi. Phía đông là khu phố Shitadera với nhiều ngôi chùa cổ. Phía tây là khu phố điện tử Nipponbashi. Phía bắc là chợ Kuromon – nhà bếp của Osaka. Phía nam có thể nhìn thấy tòa tháp Tsutenkaku.'},{title:'Hoạt động ngoại khóa phong phú',content:'Trường thường xuyên tổ chức các cuộc thi hùng biện tiếng Nhật, các chương trình ngoại khóa, các lớp học văn hóa nhằm tạo cơ hội cho học viên tìm hiểu thêm về văn hóa và truyền thống Nhật Bản.'}]),
      cert_images: J([]),
    },
    {
      slug: 'tohoku-gaigo', sort_order: 10,
      name: 'Trường Nhật Ngữ Tohoku Gaigo (Tohoku Foreign Language & Tourism College)', short_name: 'Tohoku Gaigo',
      country: 'Nhật Bản', city: 'Sendai',
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      founded: 1989,
      addresses: J(['2-1-13 Itsutsubashi, Aoba-ku, Sendai-shi, Miyagi 980-0022','Ga gần nhất: Itsutsubashi Station (五橋駅)']),
      intro: J(['Trường Nhật ngữ Tohoku Gaigo (Tohoku Foreign Language & Tourism College) được thành lập năm 1989 tại thành phố Sendai, cách thành phố Tokyo 400km về phía Bắc.','Sendai được xem là thành phố văn hóa của Nhật Bản với nhiều bảo tàng và thư viện. Nơi đây tập trung 15 trường đại học, trong đó Tohoku có số lượng sinh viên quốc tế theo học rất lớn.']),
      tuition_note: 'Ngoài học phí còn có: Phí tài liệu (10,000-13,000 Yên), Phí hoạt động ngoại khóa (8,000 Yên/học kỳ), Phí hội sinh viên (5,000 Yên), Kiểm tra sức khỏe (3,000 Yên/năm), Bảo hiểm sinh viên nước ngoài (10,000 Yên/năm).',
      tuition_rows: J([{label:'Phí học tập',value:'70,000 Yên',note:'Năm 1 (cả 2 kỳ)'},{label:'Học phí (kỳ tháng 4 – năm 1)',value:'580,000 Yên',note:''},{label:'Phí cơ sở vật chất (kỳ tháng 4 – năm 1)',value:'30,000 Yên',note:''},{label:'Tổng năm 1 (kỳ tháng 4)',value:'680,000 Yên',note:'',highlight:true},{label:'Tổng năm 2 (kỳ tháng 4)',value:'610,000 Yên',note:''},{label:'Tổng năm 1 (kỳ tháng 10)',value:'680,000 Yên',note:'',highlight:true},{label:'Tổng năm 2 (kỳ tháng 10 – 1,5 năm)',value:'305,000 Yên',note:''}]),
      admission: J([{term:'Kỳ tháng 4',duration:'2 năm',applyPeriod:'—'},{term:'Kỳ tháng 10',duration:'1,5 năm',applyPeriod:'—'}]),
      courses: J([{level:'Kỳ tháng 4 – 2 năm',items:['Thời gian đào tạo 2 năm.','Chương trình học được thiết kế bài bản, phù hợp với các đối tượng người học khác nhau.']},{level:'Kỳ tháng 10 – 1,5 năm',items:['Thời gian đào tạo 1,5 năm.','Đáp ứng tốt nhất nhu cầu nâng cao năng lực tiếng Nhật của học viên.']}]),
      highlights: J([{title:'Học bổng hấp dẫn',content:'Trường đem đến chính sách học bổng tốt với nhiều chương trình:\n• Học bổng 48,000 Yên/tháng cho sinh viên học tại trường.\n• Học bổng 50,000 Yên cho sinh viên có kết quả cao nhất mỗi học kỳ (khoảng 5% sinh viên).\n• Học bổng 10,000 Yên cho sinh viên qua kỳ kiểm tra năng lực tiếng Nhật N1.'},{title:'Thành phố Sendai – chi phí hợp lý',content:'Mức sống tại Sendai chỉ bằng 60% Tokyo, giúp bạn tiết kiệm chi phí sinh hoạt và giảm áp lực kinh tế. Nhà trường cũng hỗ trợ tìm kiếm công việc làm thêm tại những cửa hàng xung quanh trường.'},{title:'Môi trường học tập thân thiện',content:'Trường tập trung nhiều học sinh sáng tạo, hòa đồng với nhiều thành tích học tập. Môi trường học tập thân thiện, tạo nhiều điều kiện thuận lợi để các bạn du học sinh thích nghi và hòa nhập nhanh chóng với cuộc sống.'},{title:'Cơ sở vật chất và giáo viên chuyên nghiệp',content:'Trường trang bị hệ thống cơ sở hạ tầng hiện đại với đầy đủ thiết bị và tiện nghi. Đội ngũ giáo viên nhiệt tình, có kinh nghiệm chuyên môn tốt, luôn đồng hành và hỗ trợ học viên trong quá trình học tập.'}]),
      cert_images: J([]),
    },
    {
      slug: 'kamei-gakuen', sort_order: 11,
      name: 'Trường Nhật ngữ Kamei Gakuen', short_name: 'Kamei Gakuen',
      country: 'Nhật Bản', city: 'Osaka',
      img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80',
      founded: 1935,
      addresses: J(['Trung tâm thành phố Osaka, Nhật Bản']),
      intro: J(['Nhật ngữ Kamei Gakuen là ngôi trường Nhật ngữ lâu đời tại xứ Phù Tang, được thành lập từ năm 1935. Trải qua hơn 75 năm giảng dạy, trường đã đạt được nhiều thành tựu đáng ghi nhận, khẳng định vị thế của mình trong đào tạo Nhật ngữ.','Để đảm bảo chất lượng dạy và học, trường trang bị cơ sở vật chất rộng rãi và hiện đại. Bên cạnh chương trình Nhật ngữ, trường còn đào tạo một số môn để thi đại học và cao học.']),
      tuition_note: 'Học bổng Kamei Gakuen: điều kiện trình độ tiếng Nhật từ N4 trở lên (hoặc tương đương). Giá trị học bổng: miễn giảm 60,000 Yên tiền nhập học và 60,000 Yên học phí 1 năm. Ngoài ra, phí sinh hoạt khoảng 70,000 Yên/tháng. Ký túc xá 22,000–28,000 Yên/tháng/người (phòng 2-3 người).',
      tuition_rows: J([{label:'Phí đăng ký dự tuyển',value:'20,000 Yên',note:''},{label:'Tiền nhập học',value:'60,000 Yên',note:''},{label:'Học phí 1 năm (kèm sách và phí ngoại khóa)',value:'700,000 Yên',note:''},{label:'Phí phúc lợi (bảo hiểm) 1 năm',value:'16,000 Yên',note:''},{label:'Phí ngân hàng',value:'5,500 Yên',note:''},{label:'Tổng',value:'801,000 Yên',note:'',highlight:true}]),
      admission: J([]),
      courses: J([{level:'Khóa học 1 năm',items:['Dành cho học viên có N1, N2 hoặc trình độ tương đương.','Mục tiêu học lên trung cấp, cao đẳng, đại học sau khi kết thúc khóa học.']},{level:'Khóa học 2 năm',items:['Dành cho sinh viên mới bắt đầu học tiếng Nhật.','Nguyện vọng thi vào các trường Trung cấp, Cao đẳng hay Đại học.','Khi hoàn thành khóa học, được cấp chứng chỉ để học liên thông lên Đại học.']},{level:'Khóa học 1,5 năm',items:['Dành cho sinh viên có nguyện vọng thi vào các trường Trung cấp, Cao đẳng, Đại học sau khi kết thúc khóa học.']}]),
      highlights: J([{title:'Tọa lạc trung tâm Osaka',content:'Trường Nhật ngữ Kamei Gakuen tọa lạc tại trung tâm thành phố Osaka với đầy đủ dịch vụ tiện nghi từ ăn uống, vui chơi, mua sắm, giúp di chuyển thuận lợi đến nhiều địa điểm.'},{title:'Visa 2 năm và cơ hội học lên',content:'Là trường chuyên môn, sinh viên học tập tại đây được cấp visa 2 năm khi nhận tư cách lưu trú. Sau khi hoàn thành chương trình tiếng Nhật, bạn có thể học lên các khoa chuyên môn như Kiến trúc, IT, Y tế...'},{title:'Ký túc xá gần trường',content:'Kamei Gakuen có chính sách hỗ trợ ký túc xá cho du học sinh, cách trường khoảng 5-10 phút đi bộ. Xung quanh có rất nhiều cửa hàng, siêu thị hay cửa hàng tiện ích, rất thuận tiện cho cuộc sống du học sinh.'}]),
      cert_images: J([]),
    },
    {
      slug: 'gag-fukuoka', sort_order: 12,
      name: 'Học viện Nhật ngữ GAG (GAG Japanese Language Institute)', short_name: 'GAG Fukuoka',
      country: 'Nhật Bản', city: 'Fukuoka',
      img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
      founded: null,
      addresses: J(['2-11-2 Sanno, Hakata-ku, Fukuoka']),
      intro: J(['Học viện Nhật ngữ GAG tọa lạc tại thành phố Fukuoka, Kyushu, Nhật Bản – một trong những trung tâm kinh tế, văn hóa của vùng Kyushu và được coi là cửa ngõ của châu Á với vị trí giao thương thuận lợi.','Định hướng của trường là giúp học sinh học tập để đạt được thành tích cao trong kỳ thi du học sinh và đạt được chứng chỉ năng lực tiếng Nhật N1 và N2 để học lên các trường đại học.','Chương trình học được thiết kế khoa học và bài bản, kết hợp lý thuyết và thực tiễn, tạo nhiều thuận lợi trong cuộc sống cũng như cơ hội để học viên tìm hiểu kiến thức về văn hóa Nhật Bản.']),
      tuition_note: 'Học bổng từ quỹ hỗ trợ sinh viên nước ngoài: 48,000 Yên/tháng (trong 1 năm) dựa theo thành tích học tập, thái độ và tỉ lệ lên lớp.',
      tuition_rows: J([{label:'Phí dự tuyển',value:'30,000 Yên',note:'Cả 2 khóa'},{label:'Phí nhập học',value:'50,000 Yên',note:'Cả 2 khóa'},{label:'Học phí khóa 2 năm',value:'1,200,000 Yên',note:''},{label:'Phí cơ sở khóa 2 năm',value:'100,000 Yên',note:''},{label:'Tổng khóa 2 năm',value:'1,380,000 Yên',note:'',highlight:true},{label:'Học phí khóa 1 năm 6 tháng',value:'900,000 Yên',note:''},{label:'Phí cơ sở khóa 1 năm 6 tháng',value:'75,000 Yên',note:''},{label:'Tổng khóa 1 năm 6 tháng',value:'1,055,000 Yên',note:'',highlight:true}]),
      admission: J([{term:'Tháng 4',duration:'2 năm',applyPeriod:'—'},{term:'Tháng 7',duration:'1 năm 9 tháng',applyPeriod:'—'},{term:'Tháng 10',duration:'1,5 năm',applyPeriod:'—'}]),
      courses: J([{level:'Trình độ sơ cấp (N5~N3)',items:['Nắm mẫu ngữ pháp cơ bản, thành thạo Hiragana, Katakana và Kanji cần thiết.','Có thể sử dụng kiến thức để hội thoại các đoạn ngắn trong cuộc sống.']},{level:'Trình độ trung cấp (N2)',items:['Đọc hiểu tạp chí, báo. Nghe hiểu hội thoại, tin tức.','Có thể viết bài văn về chủ đề. Biết tóm tắt bố cục, viết văn logic.']},{level:'Trình độ cao cấp (N1)',items:['Đọc hiểu văn bản báo chí trừu tượng hoặc bài luận.','Nghe hiểu nội dung bản tin và các bài giảng hay hội thoại với tốc độ tự nhiên.']}]),
      highlights: J([{title:'Học bổng đa dạng và hấp dẫn',content:'Trường có hệ thống học bổng phong phú:\n• Đạt N1 JLPT: 20,000 Yên/tháng (tối đa 240,000 Yên)\n• Đạt N2 JLPT: 10,000 Yên/tháng (tối đa 120,000 Yên)\n• Đạt N3 JLPT: 3,000 Yên/tháng\n• Đỗ đại học Quốc Lập: thưởng 100,000 Yên\n• Đỗ đại học Dân Lập danh tiếng: thưởng 500,000 Yên'},{title:'Cơ sở vật chất hiện đại',content:'Học viện chú trọng đến việc trang bị cơ sở vật chất, nhằm đem đến môi trường học tập và rèn luyện tốt nhất cho học viên. Trường thiết kế cơ sở vật chất hiện đại và khang trang, phục vụ tốt cho hoạt động học và nghiên cứu.'},{title:'Phương châm giáo dục',content:'• Tận tình giúp đỡ từng học sinh hoàn thành mục tiêu của bản thân.\n• Hỗ trợ học sinh tìm hiểu và thích ứng với văn hóa nước ngoài.\n• Tạo môi trường học tập lý tưởng với nhiều trải nghiệm mới lạ.'},{title:'Quan tâm đến đời sống du học sinh',content:'Tại học viện GAG, đời sống của du học sinh luôn được nhà trường chú trọng và quan tâm. Trường thường xuyên tổ chức các chương trình ngoại khóa, giúp học viên nhanh chóng tiếp thu ngôn ngữ cũng như hiểu được lối sống, giá trị văn hóa của người Nhật.'}]),
      cert_images: J([]),
    },
  ];
  const insS = db.prepare('INSERT INTO schools (slug,name,short_name,country,city,img,founded,addresses,intro,tuition_note,tuition_rows,admission,courses,highlights,cert_images,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
  seedSchools.forEach(s => insS.run(s.slug,s.name,s.short_name,s.country,s.city,s.img,s.founded,s.addresses,s.intro,s.tuition_note,s.tuition_rows,s.admission,s.courses,s.highlights,s.cert_images,s.sort_order));
}

// ─── SEED ────────────────────────────────────────────────────────────────────
const count = db.prepare('SELECT COUNT(*) as c FROM articles').get().c;
if (count === 0) {
  const seedArticles = [
    // Du học - Nhật Bản
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2025-04-01 08:00:00',
      title: 'Chương trình du học Nhật Bản 2025 – Học bổng lên đến 50%',
      cover_image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
      excerpt: 'Cơ hội vàng cho sinh viên Việt Nam với hàng loạt học bổng hấp dẫn từ chính phủ Nhật Bản và các trường đại học hàng đầu.',
      content: `<h2>Tổng quan về chương trình</h2><p>Năm 2025, Nhật Bản tiếp tục mở rộng cơ hội du học với nhiều chương trình học bổng hấp dẫn dành riêng cho sinh viên Việt Nam. Học bổng MEXT của chính phủ Nhật Bản có thể tài trợ lên đến 100% học phí cùng trợ cấp sinh hoạt hàng tháng.</p><h2>Điều kiện tham gia</h2><ul><li>Tốt nghiệp THPT loại khá trở lên</li><li>JLPT N4 trở lên (hoặc IELTS 5.5+ cho chương trình dạy bằng tiếng Anh)</li><li>Độ tuổi từ 17-35</li></ul><h2>Hồ sơ cần chuẩn bị</h2><p>Hồ sơ bao gồm: Bằng tốt nghiệp, bảng điểm, chứng chỉ ngoại ngữ, thư giới thiệu và bài luận cá nhân bằng tiếng Nhật. Việt Phát VTI hỗ trợ toàn bộ quá trình chuẩn bị hồ sơ cho học viên.</p>`
    },
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2025-02-15 09:00:00',
      title: 'Điều kiện xin visa du học Nhật Bản mới nhất 2025',
      cover_image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80',
      excerpt: 'Hướng dẫn chi tiết quy trình xin visa du học Nhật Bản với những thay đổi mới nhất từ Đại sứ quán Nhật Bản tại Việt Nam.',
      content: `<h2>Thay đổi chính sách visa 2025</h2><p>Đại sứ quán Nhật Bản tại Hà Nội và TP.HCM đã cập nhật một số quy định mới về hồ sơ xin visa du học từ đầu năm 2025, nhằm đơn giản hóa thủ tục cho sinh viên Việt Nam.</p><h2>Hồ sơ bắt buộc</h2><ul><li>Giấy tiếp nhận nhập học (COE) từ trường</li><li>Hộ chiếu còn hiệu lực tối thiểu 6 tháng</li><li>Ảnh thẻ 4x3 nền trắng</li><li>Chứng minh tài chính (tối thiểu 150 triệu VNĐ)</li></ul><p>Thời gian xử lý visa thường từ 5-7 ngày làm việc. Việt Phát VTI đồng hành cùng học viên trong suốt quá trình này.</p>`
    },
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2024-11-20 10:00:00',
      title: 'Top 10 trường đại học Nhật Bản tốt nhất cho sinh viên Việt Nam',
      cover_image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
      excerpt: 'Danh sách các trường đại học hàng đầu Nhật Bản phù hợp với sinh viên Việt Nam, kèm thông tin học phí và chuyên ngành thế mạnh.',
      content: `<h2>Tiêu chí đánh giá</h2><p>Danh sách được xây dựng dựa trên xếp hạng QS World, tỷ lệ việc làm sau tốt nghiệp và chính sách hỗ trợ sinh viên quốc tế.</p><h2>Top 5 trường hàng đầu</h2><ol><li><strong>Đại học Tokyo (UTokyo)</strong> – Số 1 Nhật Bản, thế mạnh: KHKT, Y dược</li><li><strong>Đại học Kyoto</strong> – Nghiên cứu khoa học cơ bản xuất sắc</li><li><strong>Đại học Osaka</strong> – Công nghệ và Kinh doanh quốc tế</li><li><strong>Đại học Tohoku</strong> – Kỹ thuật và Khoa học vật liệu</li><li><strong>Đại học Nagoya</strong> – Kỹ thuật ô tô và Cơ khí</li></ol>`
    },
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2024-08-10 11:00:00',
      title: 'Cuộc sống du học sinh Việt Nam tại Nhật Bản – Chia sẻ thực tế',
      cover_image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80',
      excerpt: 'Những chia sẻ chân thực từ các du học sinh Việt Nam về cuộc sống, học tập và làm thêm tại xứ sở hoa anh đào.',
      content: `<h2>Cuộc sống hàng ngày</h2><p>Du học sinh Việt Nam tại Nhật thường sinh hoạt khép kín trong các ký túc xá hoặc căn hộ nhỏ. Chi phí sống tại Tokyo khoảng 100.000–150.000 yen/tháng, ở tỉnh lẻ thấp hơn 30-40%.</p><h2>Đi làm thêm</h2><p>Visa du học cho phép làm thêm tối đa 28 giờ/tuần. Các công việc phổ biến: phục vụ nhà hàng, tiện lợi, kho bãi với mức lương 1.000-1.200 yen/giờ.</p><h2>Thích nghi với văn hóa</h2><p>Người Nhật rất coi trọng đúng giờ, trật tự và sạch sẽ. Biết một số phong tục địa phương sẽ giúp bạn hòa nhập nhanh hơn.</p>`
    },
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2024-05-05 09:30:00',
      title: 'Học bổng MEXT 2025 – Cơ hội du học Nhật Bản miễn phí toàn phần',
      cover_image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      excerpt: 'Học bổng Chính phủ Nhật Bản (MEXT) 2025 tuyển sinh rộng rãi với nhiều ưu đãi hấp dẫn. Tìm hiểu điều kiện và cách nộp hồ sơ.',
      content: `<h2>Giới thiệu học bổng MEXT</h2><p>Học bổng MEXT (Ministry of Education, Culture, Sports, Science and Technology) là chương trình học bổng toàn phần của Chính phủ Nhật Bản, tài trợ 100% học phí, vé máy bay và trợ cấp sinh hoạt hàng tháng từ 117.000-145.000 yen.</p><h2>Quy trình tuyển chọn</h2><ol><li>Nộp hồ sơ qua Đại sứ quán Nhật Bản (tháng 5-6 hàng năm)</li><li>Thi viết và phỏng vấn tại Đại sứ quán</li><li>Trường Nhật chọn sinh viên từ danh sách được giới thiệu</li></ol>`
    },

    // Du học - Nhật Bản (bài viết đặc trưng)
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2025-04-05 08:00:00',
      title: 'Danh sách các trường Nhật ngữ ở Tochigi',
      cover_image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80',
      excerpt: 'Tochigi là tỉnh nổi tiếng với nhiều trường Nhật ngữ uy tín, chi phí sinh hoạt thấp, phù hợp cho du học sinh Việt Nam mới bắt đầu.',
      content: `<h2>Các trường Nhật ngữ tại Tochigi</h2><p>Tỉnh Tochigi (栃木県) nằm ở vùng Kanto, cách Tokyo khoảng 1,5 giờ tàu điện, là điểm đến du học lý tưởng với nhiều trường Nhật ngữ chất lượng cao và chi phí sinh hoạt thấp hơn Tokyo.</p><h2>Ưu điểm du học tại Tochigi</h2><ul><li>Chi phí sinh hoạt thấp hơn Tokyo 30-40%</li><li>Môi trường học tập yên tĩnh, ít cạnh tranh</li><li>Dễ tìm việc làm thêm tại các nhà máy, trang trại</li><li>Giao thông thuận tiện lên Tokyo vào cuối tuần</li></ul><p>Việt Phát VTI có quan hệ đối tác trực tiếp với nhiều trường tại Tochigi, hỗ trợ hồ sơ và visa với tỷ lệ đậu cao nhất.</p>`
    },
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2025-03-28 09:00:00',
      title: 'ICAP Nhật – Các trường du học Nhật Bản tại Osaka cập nhật 2024',
      cover_image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80',
      excerpt: 'ICAP Nhật (hệ thống Học viện GAG) là đối tác liên kết chính thức của Việt Phát VTI, cung cấp nhiều cơ sở học tập chất lượng tại Osaka.',
      content: `<h2>Hệ thống trường ICAP tại Osaka</h2><p>ICAP (International College of Arts and Potal) là hệ thống trường Nhật ngữ uy tín tại Osaka với nhiều cơ sở, nổi tiếng với chương trình học chuyên sâu và hỗ trợ tìm việc làm thêm.</p><h2>Chương trình học</h2><ul><li>Khóa học tiếng Nhật từ N5 đến N1 (6-24 tháng)</li><li>Chương trình dự bị đại học (Daigaku Shinnen)</li><li>Chương trình chuyển tiếp vào đại học Nhật</li></ul><h2>Ưu đãi dành cho học viên VTI</h2><p>Học viên đăng ký qua Việt Phát VTI được hưởng ưu đãi học phí đặc biệt và hỗ trợ toàn bộ thủ tục hồ sơ – visa miễn phí.</p>`
    },
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2025-02-20 08:30:00',
      title: 'Trường Nhật ngữ ECC Osaka (ECC Kokusai College of Foreign Languages)',
      cover_image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
      excerpt: 'ECC Osaka là trường Nhật ngữ danh tiếng tại Namba – trung tâm Osaka, với hơn 50 năm kinh nghiệm đào tạo và cơ sở vật chất hiện đại.',
      content: `<h2>Giới thiệu trường ECC Osaka</h2><p>ECC Kokusai College of Foreign Languages (ECC国際外語専門学校) tọa lạc tại Namba, Osaka – khu vực trung tâm sầm uất nhất Nhật Bản. Trường được thành lập năm 1961, là một trong những trường ngoại ngữ lớn và uy tín nhất Nhật Bản.</p><h2>Điểm mạnh</h2><ul><li>Vị trí đắc địa tại Namba – trung tâm Osaka</li><li>Chương trình đào tạo tiếng Nhật bài bản từ sơ cấp đến cao cấp</li><li>Hỗ trợ tuyển sinh vào các trường đại học, cao đẳng top Nhật Bản</li><li>Ký túc xá ngay gần trường với chi phí hợp lý</li></ul><h2>Thông tin tuyển sinh 2025</h2><p>Việt Phát VTI là đối tác tuyển sinh chính thức của ECC Osaka tại Việt Nam. Liên hệ ngay để được tư vấn miễn phí!</p>`
    },
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2024-12-10 09:00:00',
      title: 'Du học Nhật Bản 2024 và những điều cần biết',
      cover_image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
      excerpt: 'Tổng hợp tất cả thông tin cần biết về du học Nhật Bản 2024: học phí, chi phí sinh hoạt, điều kiện visa, cơ hội việc làm và những lưu ý quan trọng.',
      content: `<h2>Tổng quan du học Nhật Bản 2024</h2><p>Nhật Bản tiếp tục là điểm đến du học hàng đầu của sinh viên Việt Nam với hơn 60.000 du học sinh đang theo học. Năm 2024 mang đến nhiều thay đổi tích cực về chính sách và cơ hội mới.</p><h2>Chi phí du học Nhật Bản</h2><ul><li><strong>Học phí trường Nhật ngữ:</strong> 600.000 – 800.000 yen/năm</li><li><strong>Chi phí sinh hoạt:</strong> 70.000 – 120.000 yen/tháng (tùy thành phố)</li><li><strong>Chi phí visa và hồ sơ:</strong> khoảng 10-15 triệu VNĐ</li></ul><h2>Điều kiện xin visa</h2><p>Visa du học Nhật Bản (Student Visa) yêu cầu giấy tiếp nhận (COE) từ trường, chứng minh tài chính đủ mạnh (thường 150 triệu VNĐ trở lên) và lý lịch sạch.</p><h2>Làm thêm tại Nhật</h2><p>Du học sinh được phép làm thêm tối đa 28 giờ/tuần với mức lương tối thiểu 1.000-1.200 yen/giờ, đủ để trang trải một phần chi phí sinh hoạt.</p>`
    },

    // Du học - Hàn Quốc
    {
      section: 'du-hoc', subcategory: 'han-quoc', published_at: '2025-03-20 08:00:00',
      title: 'Du học Hàn Quốc 2025 – Cơ hội vàng cho sinh viên Việt Nam',
      cover_image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80',
      excerpt: 'Hàn Quốc đang trở thành điểm đến du học lý tưởng với nền giáo dục chất lượng cao, chi phí hợp lý và nhiều cơ hội việc làm.',
      content: `<h2>Tại sao chọn du học Hàn Quốc?</h2><p>Hàn Quốc hiện là một trong những điểm đến du học phổ biến nhất tại châu Á, đặc biệt với làn sóng Hallyu (văn hóa Hàn) đang lan rộng toàn cầu. Nền kinh tế phát triển và nhiều tập đoàn lớn như Samsung, Hyundai, LG tạo ra cơ hội việc làm hấp dẫn sau tốt nghiệp.</p><h2>Chi phí du học</h2><ul><li>Học phí đại học: 3-7 triệu won/năm (~60-140 triệu VNĐ)</li><li>Chi phí sinh hoạt: 700.000–1.000.000 won/tháng</li><li>Học bổng GKS lên đến 100%</li></ul>`
    },
    {
      section: 'du-hoc', subcategory: 'han-quoc', published_at: '2024-12-15 10:00:00',
      title: 'Học bổng GKS 2025 – Cơ hội học miễn phí tại Hàn Quốc',
      cover_image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&q=80',
      excerpt: 'Chương trình học bổng Chính phủ Hàn Quốc (GKS) 2025 mở đơn tuyển sinh với nhiều suất học bổng toàn phần hấp dẫn.',
      content: `<h2>Về học bổng GKS</h2><p>Chương trình Học bổng Chính phủ Hàn Quốc (GKS – Global Korea Scholarship) cung cấp học bổng toàn phần cho sinh viên quốc tế đến học tại các trường đại học Hàn Quốc.</p><h2>Quyền lợi học bổng</h2><ul><li>Miễn toàn bộ học phí</li><li>Trợ cấp sinh hoạt 900.000 won/tháng</li><li>Bảo hiểm y tế toàn diện</li><li>Vé máy bay khứ hồi</li><li>Khóa học tiếng Hàn 1 năm trước khi nhập học</li></ul>`
    },
    {
      section: 'du-hoc', subcategory: 'han-quoc', published_at: '2024-09-01 09:00:00',
      title: 'Top 5 đại học Hàn Quốc tốt nhất – SKY và các trường hàng đầu',
      cover_image: 'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?w=800&q=80',
      excerpt: 'Khám phá nhóm trường đại học danh tiếng nhất Hàn Quốc – SKY và các trường top khác mà sinh viên Việt Nam nên nhắm đến.',
      content: `<h2>Nhóm SKY – Đỉnh cao giáo dục Hàn Quốc</h2><p>SKY là viết tắt của ba trường đại học danh giá nhất: Seoul National University (S), Korea University (K) và Yonsei University (Y).</p><h2>Các trường top khác</h2><ul><li>KAIST – Đại học Khoa học Công nghệ Hàn Quốc</li><li>POSTECH – Đại học Khoa học Công nghệ Pohang</li><li>Sungkyunkwan University (SKKU) – Được Samsung tài trợ</li></ul>`
    },
    {
      section: 'du-hoc', subcategory: 'han-quoc', published_at: '2024-06-20 11:00:00',
      title: 'Học tiếng Hàn từ đầu: Lộ trình 6 tháng chuẩn bị du học',
      cover_image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      excerpt: 'Lộ trình học tiếng Hàn hiệu quả từ đầu trong 6 tháng để đạt đủ điều kiện ngôn ngữ cho chương trình du học Hàn Quốc.',
      content: `<h2>Mục tiêu ngôn ngữ</h2><p>Để du học Hàn Quốc, hầu hết các trường yêu cầu TOPIK II (cấp độ 3-4) hoặc bằng chứng nhận hoàn thành chương trình tiếng Hàn tại trường ngôn ngữ trong nước.</p><h2>Lộ trình 6 tháng</h2><ul><li><strong>Tháng 1-2:</strong> Học Hangul, từ vựng cơ bản, ngữ pháp A1</li><li><strong>Tháng 3-4:</strong> Luyện hội thoại, ngữ pháp A2-B1, TOPIK I</li><li><strong>Tháng 5-6:</strong> Ôn thi TOPIK II, luyện đề, kỹ năng viết</li></ul>`
    },

    // Du học - Đài Loan
    {
      section: 'du-hoc', subcategory: 'dai-loan', published_at: '2025-01-10 08:00:00',
      title: 'Du học Đài Loan – Thiên đường học bổng châu Á 2025',
      cover_image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80',
      excerpt: 'Đài Loan ngày càng thu hút sinh viên quốc tế nhờ học bổng hào phóng, chi phí thấp và nền giáo dục kỹ thuật hàng đầu châu Á.',
      content: `<h2>Điểm mạnh của giáo dục Đài Loan</h2><p>Đài Loan nổi tiếng với các chương trình đào tạo về Kỹ thuật, CNTT, Bán dẫn và Khoa học ứng dụng. TSMC – tập đoàn chip lớn nhất thế giới đặt trụ sở tại đây, tạo cơ hội việc làm khổng lồ.</p><h2>Các học bổng tiêu biểu</h2><ul><li>Học bổng chính phủ ICDF: toàn phần, bao gồm vé máy bay</li><li>Học bổng MOE: 15.000–20.000 NTD/tháng</li><li>Học bổng trường: miễn 50-100% học phí</li></ul>`
    },
    {
      section: 'du-hoc', subcategory: 'dai-loan', published_at: '2024-10-05 09:00:00',
      title: 'Chi phí sống và học tập tại Đài Loan – Cập nhật 2024',
      cover_image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
      excerpt: 'Phân tích chi tiết chi phí du học Đài Loan giúp gia đình và sinh viên lên kế hoạch tài chính hợp lý.',
      content: `<h2>Tổng chi phí ước tính</h2><p>Du học Đài Loan khá tiết kiệm so với các nước châu Á khác. Chi phí trung bình khoảng 150-250 triệu VNĐ/năm đã bao gồm học phí và sinh hoạt phí.</p><h2>Các khoản chi tiết</h2><ul><li>Học phí: 40.000–60.000 NTD/năm</li><li>Ký túc xá: 5.000–10.000 NTD/tháng</li><li>Ăn uống: 6.000–10.000 NTD/tháng</li><li>Đi lại: 1.500–2.000 NTD/tháng</li></ul>`
    },
    {
      section: 'du-hoc', subcategory: 'dai-loan', published_at: '2024-07-12 10:00:00',
      title: 'Visa du học Đài Loan – Hướng dẫn từng bước cho người mới',
      cover_image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=800&q=80',
      excerpt: 'Quy trình xin visa du học Đài Loan đơn giản hơn bạn nghĩ. Việt Phát VTI hướng dẫn chi tiết từng bước để hồ sơ đạt tỷ lệ thành công cao nhất.',
      content: `<h2>Loại visa phù hợp</h2><p>Sinh viên du học Đài Loan cần xin Resident Visa (F Visa) – visa cư trú dài hạn dành cho học sinh/sinh viên. Sau khi nhập cảnh cần đổi sang Alien Resident Certificate (ARC) trong vòng 15 ngày.</p><h2>Hồ sơ cần chuẩn bị</h2><ul><li>Hộ chiếu còn hạn tối thiểu 6 tháng</li><li>Giấy nhập học từ trường Đài Loan</li><li>Chứng minh tài chính (tối thiểu 200 triệu VNĐ)</li><li>Lý lịch tư pháp (cần công chứng và hợp pháp hóa)</li></ul>`
    },

    // Du học nghề - Đức
    {
      section: 'du-hoc', subcategory: 'nghe-duc', published_at: '2025-02-28 08:00:00',
      title: 'Du học nghề Đức 2025 – Cơ hội định cư châu Âu cho người Việt',
      cover_image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
      excerpt: 'Chương trình đào tạo nghề kép tại Đức (Ausbildung) đang mở ra cơ hội vàng để định cư châu Âu với thu nhập cao ngay từ khi đi học.',
      content: `<h2>Ausbildung – Mô hình đào tạo nghề ưu việt</h2><p>Hệ thống đào tạo nghề kép (Dual System) của Đức kết hợp học tại trường (Berufsschule) và thực tập tại doanh nghiệp. Học viên vừa học vừa nhận lương từ 600-1.000 EUR/tháng.</p><h2>Ngành nghề hot tại Đức 2025</h2><ul><li>Điều dưỡng & Chăm sóc sức khỏe</li><li>CNTT – Lập trình phần mềm</li><li>Kỹ thuật điện – điện tử</li><li>Cơ khí ô tô</li><li>Xây dựng – Kiến trúc</li></ul>`
    },
    {
      section: 'du-hoc', subcategory: 'nghe-duc', published_at: '2024-11-01 09:00:00',
      title: 'Học bổng du học Đức – Những nguồn tài trợ không nên bỏ qua',
      cover_image: 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=800&q=80',
      excerpt: 'Đức có hệ thống học bổng rất phong phú từ nhiều nguồn khác nhau. Tìm hiểu các học bổng phù hợp để giảm gánh nặng tài chính khi du học Đức.',
      content: `<h2>DAAD – Tổ chức trao đổi hàn lâm Đức</h2><p>DAAD (Deutscher Akademischer Austauschdienst) là tổ chức học bổng lớn nhất nước Đức, hỗ trợ sinh viên quốc tế theo học bậc thạc sĩ và tiến sĩ tại Đức.</p><h2>Các nguồn học bổng khác</h2><ul><li>Konrad Adenauer Stiftung – CDU</li><li>Friedrich Ebert Stiftung – SPD</li><li>Heinrich Böll Stiftung – Đảng Xanh</li><li>Học bổng Erasmus+ (cho chương trình trao đổi)</li></ul>`
    },
    {
      section: 'du-hoc', subcategory: 'nghe-duc', published_at: '2024-08-18 10:00:00',
      title: 'Học tiếng Đức – Hành trang không thể thiếu khi du học Đức',
      cover_image: 'https://images.unsplash.com/photo-1498855926480-d98e83099315?w=800&q=80',
      excerpt: 'Tiếng Đức là yêu cầu bắt buộc cho hầu hết các chương trình du học tại Đức. Tìm hiểu lộ trình học tiếng Đức hiệu quả nhất.',
      content: `<h2>Cấp độ ngôn ngữ cần thiết</h2><p>Hầu hết chương trình đào tạo nghề và đại học tại Đức yêu cầu tối thiểu B1-B2 (Goethe-Zertifikat hoặc telc). Một số chương trình bằng tiếng Anh chỉ cần IELTS 6.0.</p><h2>Lộ trình học tiếng Đức</h2><ul><li><strong>A1-A2 (3-4 tháng):</strong> Nền tảng từ vựng và ngữ pháp cơ bản</li><li><strong>B1 (5-6 tháng):</strong> Giao tiếp thường ngày, đọc hiểu</li><li><strong>B2 (6-8 tháng):</strong> Ngôn ngữ học thuật, viết báo cáo</li></ul>`
    },

    // Sự kiện
    {
      section: 'su-kien', subcategory: 'su-kien', published_at: '2025-04-03 07:00:00',
      title: 'Việt Phát VTI tổ chức Hội thảo Du học Nhật Bản – Hàn Quốc miễn phí tháng 4/2025',
      cover_image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
      excerpt: 'Việt Phát VTI mở đăng ký tham dự hội thảo du học Nhật Bản – Hàn Quốc miễn phí dành cho học sinh, sinh viên và phụ huynh tại Hà Nội.',
      content: `<h2>Thông tin sự kiện</h2><p>Việt Phát VTI trân trọng kính mời học sinh, sinh viên và phụ huynh tham dự Hội thảo Du học Nhật Bản – Hàn Quốc miễn phí, được tổ chức vào ngày 19/04/2025 tại Hà Nội.</p><h2>Nội dung chương trình</h2><ul><li>09:00–09:30: Đón tiếp, đăng ký</li><li>09:30–10:30: Tổng quan du học Nhật Bản 2025</li><li>10:30–11:30: Du học Hàn Quốc – Cơ hội và thách thức</li><li>11:30–12:00: Tư vấn 1-1 và Q&A</li></ul><h2>Đăng ký tham dự</h2><p>Điền form đăng ký trực tuyến hoặc liên hệ hotline Việt Phát VTI: 024.3974.5xxx để được tư vấn và xác nhận suất tham dự.</p>`
    },
    {
      section: 'su-kien', subcategory: 'su-kien', published_at: '2025-03-15 08:00:00',
      title: 'Lễ tiễn đoàn học sinh Việt Phát VTI bay sang Nhật Bản tháng 3/2025',
      cover_image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
      excerpt: 'Việt Phát VTI tổ chức lễ tiễn ấm áp cho 45 học sinh lên đường du học Nhật Bản trong tháng 3/2025, đánh dấu cột mốc quan trọng trong hành trình du học.',
      content: `<h2>Khoảnh khắc đáng nhớ</h2><p>Buổi sáng ngày 15/03/2025, sảnh sân bay Nội Bài rộn rã tiếng cười và những cái ôm thân thiết khi 45 học sinh Việt Phát VTI cùng gia đình tập trung chuẩn bị cho chuyến bay sang Nhật Bản.</p><h2>Lời nhắn từ Ban giám đốc Việt Phát VTI</h2><p>Đây là thành quả của quá trình chuẩn bị nghiêm túc và cố gắng không ngừng của các em học sinh cùng sự hỗ trợ tận tình từ gia đình và đội ngũ Việt Phát VTI. Việt Phát VTI cam kết tiếp tục đồng hành cùng các em trong suốt hành trình du học.</p>`
    },
    {
      section: 'su-kien', subcategory: 'su-kien', published_at: '2025-01-20 09:00:00',
      title: 'Việt Phát VTI tham dự Triển lãm Giáo dục Quốc tế Việt Nam 2025',
      cover_image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
      excerpt: 'Việt Phát VTI tham dự Triển lãm Giáo dục Quốc tế Việt Nam 2025 tại Hà Nội, giới thiệu các chương trình du học và tiếp xúc đại diện các trường đối tác.',
      content: `<h2>Việt Phát VTI tại Triển lãm VIETEF 2025</h2><p>Triển lãm Giáo dục Quốc tế Việt Nam 2025 (VIETEF) diễn ra tại Trung tâm Hội nghị Quốc gia Hà Nội thu hút hơn 200 đơn vị tham dự từ 30 quốc gia.</p><h2>Hoạt động tại gian hàng Việt Phát VTI</h2><ul><li>Tư vấn trực tiếp về các chương trình du học Nhật, Hàn, Đài Loan, Đức</li><li>Giao lưu với đại diện các trường đối tác</li><li>Ký kết thỏa thuận hợp tác với 3 trường mới tại Nhật Bản</li></ul>`
    },
    {
      section: 'su-kien', subcategory: 'su-kien', published_at: '2024-12-25 10:00:00',
      title: 'Việt Phát VTI Team Building 2024 – Gắn kết – Phát triển – Thành công',
      cover_image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
      excerpt: 'Chương trình Team Building năm 2024 của Việt Phát VTI tại Hạ Long – Quảng Ninh mang lại những kỷ niệm khó quên và tinh thần đoàn kết mạnh mẽ cho toàn bộ nhân viên.',
      content: `<h2>Chuỗi hoạt động ý nghĩa</h2><p>Chương trình Team Building 2024 của Việt Phát VTI diễn ra trong 2 ngày 1 đêm tại Hạ Long với sự tham gia của toàn bộ 87 nhân viên tại 3 văn phòng Hà Nội, TP.HCM và Đà Nẵng.</p><h2>Kết quả đạt được</h2><p>Qua các trò chơi đồng đội, thử thách vượt khó và đêm gala dinner, tinh thần đồng đội Việt Phát VTI được nâng cao rõ rệt. Ban lãnh đạo cam kết đầu tư hơn vào phúc lợi nhân viên năm 2025.</p>`
    },
    {
      section: 'su-kien', subcategory: 'su-kien', published_at: '2024-11-10 08:30:00',
      title: 'Việt Phát VTI vinh dự nhận giải thưởng "Đơn vị tư vấn du học uy tín 2024"',
      cover_image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
      excerpt: 'Tại lễ trao giải thường niên của Hiệp hội Du học Việt Nam, Việt Phát VTI vinh dự được công nhận là đơn vị tư vấn du học uy tín nhất năm 2024.',
      content: `<h2>Giải thưởng danh giá</h2><p>Ngày 10/11/2024, tại Gala Dinner thường niên của Hiệp hội Du học Việt Nam (VUSA), Việt Phát VTI đã chính thức nhận giải thưởng "Đơn vị Tư vấn Du học Uy tín Nhất 2024" – giải thưởng được bình chọn bởi hàng nghìn sinh viên và phụ huynh trên toàn quốc.</p><h2>Lời cảm ơn từ Việt Phát VTI</h2><p>Đây là thành quả của hơn 17 năm nỗ lực không ngừng của toàn bộ đội ngũ Việt Phát VTI. Chúng tôi cam kết tiếp tục cải tiến dịch vụ và đồng hành cùng thế hệ trẻ Việt Nam trên con đường chinh phục thế giới.</p>`
    },

    // Tin tức
    {
      section: 'tin-tuc', subcategory: 'tin-tuc', published_at: '2025-04-02 07:30:00',
      title: 'Nhật Bản mở rộng chính sách tiếp nhận du học sinh – Cơ hội lớn cho Việt Nam',
      cover_image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80',
      excerpt: 'Chính phủ Nhật Bản công bố kế hoạch tăng số lượng du học sinh quốc tế lên 400.000 người vào năm 2033, tạo cơ hội lớn cho sinh viên Việt Nam.',
      content: `<h2>Chính sách mới của Nhật Bản</h2><p>Bộ Giáo dục Nhật Bản (MEXT) vừa công bố Kế hoạch Toàn cầu hóa Giáo dục giai đoạn 2025-2033, theo đó Nhật Bản sẽ tăng số lượng du học sinh quốc tế từ 250.000 hiện nay lên 400.000 vào năm 2033.</p><h2>Cơ hội cho sinh viên Việt Nam</h2><p>Việt Nam hiện là cộng đồng du học sinh lớn thứ 3 tại Nhật Bản với hơn 50.000 sinh viên. Với chính sách mới, dự kiến con số này sẽ tăng lên 80.000 vào năm 2028.</p>`
    },
    {
      section: 'tin-tuc', subcategory: 'tin-tuc', published_at: '2025-02-20 09:00:00',
      title: 'Hàn Quốc tăng chỉ tiêu tuyển dụng lao động nước ngoài 2025',
      cover_image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80',
      excerpt: 'Chính phủ Hàn Quốc thông báo tăng hạn ngạch lao động nước ngoài lên 170.000 người năm 2025, mở ra cơ hội cho người Việt Nam sau khi tốt nghiệp.',
      content: `<h2>Quyết định của Bộ Lao động Hàn Quốc</h2><p>Bộ Lao động và Việc làm Hàn Quốc vừa công bố sẽ tiếp nhận 170.000 lao động nước ngoài theo chương trình EPS (Employment Permit System) trong năm 2025, tăng 20% so với năm 2024.</p><h2>Ngành nghề được ưu tiên</h2><ul><li>Chế biến nông lâm thủy sản</li><li>Sản xuất công nghiệp (điện tử, ô tô)</li><li>Xây dựng</li><li>Dịch vụ và Chăm sóc sức khỏe</li></ul>`
    },
    {
      section: 'tin-tuc', subcategory: 'tin-tuc', published_at: '2024-12-05 10:00:00',
      title: 'Xu hướng du học nghề châu Âu 2025 – Tại sao giới trẻ chọn Đức?',
      cover_image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      excerpt: 'Du học nghề tại châu Âu, đặc biệt là Đức, ngày càng trở thành lựa chọn hàng đầu của giới trẻ Việt Nam nhờ chi phí thấp và cơ hội định cư cao.',
      content: `<h2>Tại sao Đức thu hút du học sinh?</h2><p>Với hệ thống giáo dục nghề nghiệp được xếp hạng tốt nhất thế giới, chi phí học thấp (thậm chí miễn phí tại nhiều tiểu bang) và thu nhập ổn định trong quá trình học, Đức đang trở thành điểm đến hấp dẫn cho hàng nghìn sinh viên Việt Nam mỗi năm.</p><h2>Con đường từ học đến định cư</h2><p>Sau khi hoàn thành chương trình Ausbildung 3 năm, học viên có thể xin phép làm việc tại Đức 18 tháng. Sau 3-5 năm làm việc, có thể nộp hồ sơ xin thường trú (Niederlassungserlaubnis).</p>`
    },
    {
      section: 'tin-tuc', subcategory: 'tin-tuc', published_at: '2024-10-12 08:00:00',
      title: 'Đài Loan tăng học bổng ICDF cho sinh viên Đông Nam Á 2025',
      cover_image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80',
      excerpt: 'Tổ chức Hợp tác Phát triển Quốc tế Đài Loan (ICDF) thông báo tăng ngân sách học bổng 20% cho sinh viên Đông Nam Á trong năm học 2025-2026.',
      content: `<h2>Học bổng ICDF 2025-2026</h2><p>ICDF sẽ cấp thêm 500 suất học bổng toàn phần dành riêng cho sinh viên từ 10 nước Đông Nam Á trong năm học 2025-2026, nâng tổng số suất học bổng lên 2.200 suất.</p><h2>Ngành học được ưu tiên</h2><ul><li>Kỹ thuật bán dẫn và vi mạch điện tử</li><li>Nông nghiệp công nghệ cao</li><li>Y tế công cộng và Điều dưỡng</li><li>CNTT và An ninh mạng</li></ul>`
    },
    {
      section: 'tin-tuc', subcategory: 'tin-tuc', published_at: '2024-07-30 09:30:00',
      title: 'Việt Phát VTI ký kết hợp tác với 5 trường đại học Nhật Bản và Hàn Quốc',
      cover_image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
      excerpt: 'Việt Phát VTI vừa ký kết biên bản ghi nhớ hợp tác (MOU) với 5 trường đại học uy tín tại Nhật Bản và Hàn Quốc, mở rộng cơ hội học bổng độc quyền cho học viên.',
      content: `<h2>Đối tác mới của Việt Phát VTI</h2><p>Trong chuyến công tác Nhật Bản và Hàn Quốc tháng 7/2024, Ban lãnh đạo Việt Phát VTI đã ký kết thành công biên bản ghi nhớ hợp tác với 5 trường đại học uy tín.</p><h2>Danh sách trường đối tác mới</h2><ul><li>Đại học Kansai Gaidai (Nhật Bản)</li><li>Học viện Ngôn ngữ Tokyo Nihongo (Nhật Bản)</li><li>Đại học Kokushikan (Nhật Bản)</li><li>Đại học Hanyang (Hàn Quốc)</li><li>Đại học Jeonbuk Quốc gia (Hàn Quốc)</li></ul>`
    },

    // Thêm bài viết để có archive phong phú
    {
      section: 'tin-tuc', subcategory: 'tin-tuc', published_at: '2024-04-15 09:00:00',
      title: 'Cơ hội làm việc tại Nhật Bản sau khi tốt nghiệp đại học 2024',
      cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      excerpt: 'Thị trường lao động Nhật Bản đang mở rộng cánh cửa cho sinh viên nước ngoài tốt nghiệp với nhiều chính sách hỗ trợ việc làm mới.',
      content: `<h2>Chính sách việc làm mới</h2><p>Chính phủ Nhật Bản đã cải cách chính sách visa để giữ chân nhân tài nước ngoài sau khi tốt nghiệp. Sinh viên quốc tế tốt nghiệp đại học Nhật có thể xin visa "Designated Activities" 2 năm để tìm việc làm.</p>`
    },
    {
      section: 'su-kien', subcategory: 'su-kien', published_at: '2024-03-08 08:00:00',
      title: 'Việt Phát VTI kỷ niệm 17 năm thành lập – Hành trình đồng hành cùng ước mơ',
      cover_image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      excerpt: 'Ngày 08/03/2024, Việt Phát VTI chính thức kỷ niệm 17 năm thành lập với chuỗi hoạt động ý nghĩa và nhiều ưu đãi đặc biệt dành cho học viên.',
      content: `<h2>17 năm – Hành trình ý nghĩa</h2><p>Từ một văn phòng nhỏ tại Hà Nội năm 2007, Việt Phát VTI đã trưởng thành thành trung tâm tư vấn du học hàng đầu Việt Nam với 3 văn phòng và hơn 87 nhân viên.</p>`
    },
    {
      section: 'du-hoc', subcategory: 'nhat-ban', published_at: '2023-12-20 09:00:00',
      title: 'Tổng kết du học Nhật Bản 2023 – Những con số ấn tượng',
      cover_image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80',
      excerpt: 'Việt Phát VTI nhìn lại năm 2023 với những con số ấn tượng về số lượng học sinh được tư vấn, tỷ lệ đỗ visa và thành tích của học viên tại Nhật Bản.',
      content: `<h2>Nhìn lại năm 2023</h2><p>Năm 2023, Việt Phát VTI đã tư vấn thành công cho 1.247 học viên sang Nhật Bản du học với tỷ lệ đỗ visa đạt 99.2%.</p>`
    },
    {
      section: 'tin-tuc', subcategory: 'tin-tuc', published_at: '2023-11-14 10:00:00',
      title: 'Hội chợ du học Nhật Bản – Hàn Quốc tháng 11/2023 tại TP.HCM',
      cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      excerpt: 'Hội chợ du học tháng 11/2023 tại TP.HCM thu hút hàng nghìn học sinh, sinh viên đến tìm hiểu cơ hội du học tại Nhật Bản và Hàn Quốc.',
      content: `<h2>Quy mô sự kiện</h2><p>Hội chợ du học Nhật Bản – Hàn Quốc diễn ra tại Nhà thi đấu Phú Thọ TP.HCM với sự tham gia của 45 trường đại học và cao đẳng từ Nhật Bản, Hàn Quốc.</p>`
    },
    {
      section: 'du-hoc', subcategory: 'han-quoc', published_at: '2023-09-05 08:30:00',
      title: 'Du học Hàn Quốc ngành CNTT – Cơ hội thực tập tại Samsung, LG',
      cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      excerpt: 'Sinh viên CNTT tại Hàn Quốc có cơ hội thực tập tại các tập đoàn công nghệ hàng đầu thế giới như Samsung Electronics, LG và Kakao.',
      content: `<h2>Hàn Quốc – Cường quốc công nghệ</h2><p>Hàn Quốc là quê hương của Samsung, LG, Hyundai và hàng trăm startup công nghệ đẳng cấp thế giới. Sinh viên CNTT tại đây có cơ hội tiếp cận môi trường công nghệ đỉnh cao.</p>`
    },
    {
      section: 'tin-tuc', subcategory: 'tin-tuc', published_at: '2023-07-18 09:00:00',
      title: 'Chi phí sinh hoạt tại Nhật Bản 2023 – Cập nhật mới nhất',
      cover_image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      excerpt: 'Cập nhật chi phí sinh hoạt thực tế tại các thành phố lớn của Nhật Bản năm 2023, giúp du học sinh và gia đình lên kế hoạch tài chính.',
      content: `<h2>Chi phí sinh hoạt theo thành phố</h2><p>Chi phí sinh hoạt tại Nhật tùy thuộc vào thành phố và lối sống. Tokyo đắt nhất, còn các tỉnh lẻ như Sendai, Sapporo hay Fukuoka có mức chi phí thấp hơn 30-40%.</p>`
    },
    {
      section: 'su-kien', subcategory: 'su-kien', published_at: '2023-05-20 08:00:00',
      title: 'Việt Phát VTI tổ chức buổi gặp gỡ cựu du học sinh Nhật Bản 2023',
      cover_image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
      excerpt: 'Buổi gặp gỡ cựu du học sinh Nhật Bản do Việt Phát VTI tổ chức quy tụ hơn 200 cựu học viên từ khắp mọi miền đất nước.',
      content: `<h2>Kết nối cựu du học sinh</h2><p>Ngày 20/05/2023, Việt Phát VTI tổ chức buổi gặp gỡ cựu du học sinh Nhật Bản với sự tham gia của hơn 200 cựu học viên đã và đang làm việc tại Việt Nam và Nhật Bản.</p>`
    }
  ];

  const insertArticle = db.prepare(`
    INSERT INTO articles (title, section, subcategory, cover_image, excerpt, content, published_at)
    VALUES (@title, @section, @subcategory, @cover_image, @excerpt, @content, @published_at)
  `);

  const insertMany = db.transaction((articles) => {
    for (const a of articles) insertArticle.run(a);
  });
  insertMany(seedArticles);
}

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5021'] : '*',
  credentials: true,
}));
app.use(express.json());

// ─── AUTH ─────────────────────────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) res.json({ ok: true, token: 'havico-admin-2025' });
  else res.status(401).json({ error: 'Sai mật khẩu' });
});

function authAdmin(req, res, next) {
  if (req.headers.authorization === 'Bearer havico-admin-2025') return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// ─── UPLOAD ───────────────────────────────────────────────────────────────────
app.post('/api/admin/upload', authAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Không có file' });
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'vietphat-vti', resource_type: 'image' },
        (err, result) => err ? reject(err) : resolve(result)
      );
      stream.end(req.file.buffer);
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload thất bại: ' + err.message });
  }
});

// ─── ARTICLES ─────────────────────────────────────────────────────────────────
app.get('/api/articles', (req, res) => {
  const { section, subcategory, limit = 20, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  let where = 'WHERE is_published=1';
  const params = [];
  if (section) { where += ' AND section=?'; params.push(section); }
  if (subcategory) { where += ' AND subcategory=?'; params.push(subcategory); }

  const total = db.prepare(`SELECT COUNT(*) as c FROM articles ${where}`).get(...params).c;
  const rows = db.prepare(`SELECT id,title,section,subcategory,cover_image,excerpt,author,published_at FROM articles ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`).all(...params, Number(limit), Number(offset));
  res.json({ articles: rows, total, page: Number(page), limit: Number(limit) });
});

app.get('/api/articles/archive', (req, res) => {
  const rows = db.prepare(`
    SELECT strftime('%Y-%m', published_at) as ym, COUNT(*) as c
    FROM articles WHERE is_published=1
    GROUP BY ym ORDER BY ym DESC
  `).all();
  res.json(rows);
});

app.get('/api/articles/featured', (req, res) => {
  const events = db.prepare(`SELECT id,title,cover_image,excerpt,published_at FROM articles WHERE is_published=1 AND section='su-kien' ORDER BY published_at DESC LIMIT 6`).all();
  const news = db.prepare(`SELECT id,title,cover_image,excerpt,published_at FROM articles WHERE is_published=1 AND section='tin-tuc' ORDER BY published_at DESC LIMIT 6`).all();
  res.json({ events, news });
});

app.get('/api/articles/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM articles WHERE id=?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Không tìm thấy bài viết' });
  const related = db.prepare('SELECT id,title,cover_image,published_at FROM articles WHERE subcategory=? AND id!=? AND is_published=1 ORDER BY published_at DESC LIMIT 4').all(row.subcategory, row.id);
  res.json({ ...row, related });
});

// Admin CRUD
app.get('/api/admin/articles', authAdmin, (req, res) => {
  const rows = db.prepare('SELECT id,title,section,subcategory,published_at,is_published FROM articles ORDER BY published_at DESC').all();
  res.json(rows);
});

app.post('/api/admin/articles', authAdmin, (req, res) => {
  const { title, section, subcategory, cover_image, excerpt, content, is_published } = req.body;
  const result = db.prepare('INSERT INTO articles (title,section,subcategory,cover_image,excerpt,content,is_published) VALUES (?,?,?,?,?,?,?)').run(title, section, subcategory, cover_image || '', excerpt || '', content || '', is_published ?? 1);
  res.json({ id: result.lastInsertRowid });
});

app.put('/api/admin/articles/:id', authAdmin, (req, res) => {
  const { title, section, subcategory, cover_image, excerpt, content, is_published, published_at } = req.body;
  db.prepare('UPDATE articles SET title=?,section=?,subcategory=?,cover_image=?,excerpt=?,content=?,is_published=?,published_at=? WHERE id=?').run(title, section, subcategory, cover_image || '', excerpt || '', content || '', is_published ?? 1, published_at || null, req.params.id);
  res.json({ ok: true });
});

app.delete('/api/admin/articles/:id', authAdmin, (req, res) => {
  db.prepare('DELETE FROM articles WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// ─── CONTACTS ─────────────────────────────────────────────────────────────────
app.post('/api/contacts', (req, res) => {
  const { name, phone, email, province, message } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Thiếu họ tên hoặc số điện thoại' });
  db.prepare('INSERT INTO contacts (name,phone,email,province,message) VALUES (?,?,?,?,?)').run(name, phone, email || '', province || '', message || '');
  res.json({ ok: true, message: 'Đã gửi thông tin thành công! Việt Phát VTI sẽ liên hệ với bạn sớm nhất. Thông tin du học sẽ được gửi qua email của bạn.' });
});

app.get('/api/admin/contacts', authAdmin, (req, res) => {
  const rows = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json(rows);
});

// ─── SETTINGS ────────────────────────────────────────────────────────────────
app.get('/api/settings', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM site_settings').all();
  const obj = {};
  rows.forEach(r => { obj[r.key] = r.value; });
  res.json(obj);
});

app.put('/api/admin/settings', authAdmin, (req, res) => {
  const upsert = db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value');
  const updates = db.transaction((data) => {
    Object.entries(data).forEach(([k, v]) => upsert.run(k, String(v)));
  });
  updates(req.body);
  res.json({ ok: true });
});

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
app.get('/api/testimonials', (req, res) => {
  const rows = db.prepare('SELECT * FROM testimonials WHERE is_published=1 ORDER BY sort_order ASC, id ASC').all();
  res.json(rows);
});

app.get('/api/admin/testimonials', authAdmin, (req, res) => {
  const rows = db.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC').all();
  res.json(rows);
});

app.post('/api/admin/testimonials', authAdmin, (req, res) => {
  const { name, role, avatar, country, content, sort_order, is_published } = req.body;
  if (!name || !content) return res.status(400).json({ error: 'Thiếu tên hoặc nội dung' });
  const info = db.prepare('INSERT INTO testimonials (name,role,avatar,country,content,sort_order,is_published) VALUES (?,?,?,?,?,?,?)')
    .run(name, role || '', avatar || '', country || '', content, sort_order || 0, is_published ?? 1);
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/admin/testimonials/:id', authAdmin, (req, res) => {
  const { name, role, avatar, country, content, sort_order, is_published } = req.body;
  db.prepare('UPDATE testimonials SET name=?,role=?,avatar=?,country=?,content=?,sort_order=?,is_published=? WHERE id=?')
    .run(name, role || '', avatar || '', country || '', content, sort_order || 0, is_published ?? 1, req.params.id);
  res.json({ ok: true });
});

app.delete('/api/admin/testimonials/:id', authAdmin, (req, res) => {
  db.prepare('DELETE FROM testimonials WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// ─── SCHOOLS ──────────────────────────────────────────────────────────────────
function parseSchool(row) {
  if (!row) return null;
  const jsonFields = ['addresses','intro','tuition_rows','admission','courses','highlights','cert_images'];
  jsonFields.forEach(f => { try { row[f] = JSON.parse(row[f] || '[]'); } catch { row[f] = []; } });
  return row;
}

app.get('/api/schools', (req, res) => {
  const rows = db.prepare('SELECT id,slug,name,short_name,country,city,img,founded FROM schools ORDER BY sort_order ASC, id ASC').all();
  res.json(rows);
});

app.get('/api/schools/:slug', (req, res) => {
  const row = db.prepare('SELECT * FROM schools WHERE slug=?').get(req.params.slug);
  if (!row) return res.status(404).json({ error: 'Không tìm thấy trường' });
  res.json(parseSchool(row));
});

app.get('/api/admin/schools', authAdmin, (req, res) => {
  const rows = db.prepare('SELECT * FROM schools ORDER BY sort_order ASC, id ASC').all();
  res.json(rows.map(parseSchool));
});

app.put('/api/admin/schools/:id', authAdmin, (req, res) => {
  const { name, short_name, country, city, img, founded, addresses, intro, tuition_note, tuition_rows, admission, courses, highlights, cert_images, sort_order } = req.body;
  db.prepare(`UPDATE schools SET name=?,short_name=?,country=?,city=?,img=?,founded=?,addresses=?,intro=?,tuition_note=?,tuition_rows=?,admission=?,courses=?,highlights=?,cert_images=?,sort_order=? WHERE id=?`)
    .run(name, short_name||'', country||'Nhật Bản', city||'', img||'', founded||null,
      JSON.stringify(addresses||[]), JSON.stringify(intro||[]), tuition_note||'',
      JSON.stringify(tuition_rows||[]), JSON.stringify(admission||[]),
      JSON.stringify(courses||[]), JSON.stringify(highlights||[]),
      JSON.stringify(cert_images||[]), sort_order||0, req.params.id);
  res.json({ ok: true });
});

// ─── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => console.log(`Việt Phát VTI Backend running on port ${PORT}`));
