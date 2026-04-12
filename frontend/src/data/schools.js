export const SCHOOLS = [
  // 1. YIEA Tokyo
  {
    slug: 'yiea-tokyo',
    name: 'YIEA Tokyo Academy – Học Viện Tokyo YIEA',
    shortName: 'YIEA Tokyo',
    country: 'Nhật Bản', city: 'Tokyo',
    img: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80',
    founded: 2000, principal: 'Muto Yozo',
    phone: '03-5823-4596', fax: '03-5823-4597', email: 'info@yieatokyo.com',
    addresses: [
      'Địa chỉ cũ: 6-32-7 Kameido Koto-ku, Tokyo 136-0071',
      'Địa chỉ mới: Yubinbango111-0053 Taito-ku, Tokyo Asakusabashi 2-20-5',
    ],
    intro: [
      'Được thành lập năm 1988, Học viện YIEA Tokyo tọa lạc tại thành phố Tokyo, được nằm gần cảng xinh đẹp và nổi tiếng tại trung tâm thành phố Yokohama. Đây là trường đào tạo Nhật ngữ hàng đầu Nhật Bản với hơn 400 học viên đến từ những quốc gia khác nhau theo học.',
      'Ngay từ khi thành lập, trường đã thu hút được nhiều du học sinh với chất lượng đào tạo tốt và toàn diện. Đến năm 2008 nhà trường đã mở thêm chi nhánh học viện YIEA tại trung tâm thành phố Tokyo với quy mô lớn.',
    ],
    tuition: {
      note: 'Học phí đã bao gồm phí sách giáo khoa (từ lúc nhập học đến lúc tốt nghiệp) và phí bảo hiểm sức khỏe.',
      rows: [
        { label: 'Phí xét tuyển', value: '20,000 JPY', note: 'Thanh toán khi nộp đơn' },
        { label: 'Phí nhập học', value: '70,000 JPY', note: '' },
        { label: 'Học phí (1 năm)', value: '620,000 JPY', note: '' },
        { label: 'Tổng phí (năm đầu tiên)', value: '710,000 JPY', note: '', highlight: true },
      ],
    },
    admission: [
      { term: 'Tháng 4', duration: '1 năm / 2 năm', applyPeriod: 'Tháng 10 ~ Tháng 11' },
      { term: 'Tháng 7', duration: '1 năm 9 tháng', applyPeriod: 'Tháng 2 ~ Tháng 3' },
      { term: 'Tháng 10', duration: '1 năm 6 tháng', applyPeriod: 'Tháng 4 ~ Tháng 5' },
      { term: 'Tháng 1', duration: '1 năm 3 tháng', applyPeriod: 'Tháng 8 ~ Tháng 9' },
    ],
    courses: [
      { level: 'Sơ cấp', items: ['Luyện tập phát âm tiếng Nhật chính xác.', 'Giao tiếp tiếng Nhật thông thường.', 'Đọc hiểu những đoạn văn ngắn đơn giản, viết nhật ký, thư, tiểu luận.', 'Luyện tập cho kỳ thi năng lực Nhật ngữ 3kyu.'] },
      { level: 'Trung cấp', items: ['Đọc hiểu những bài báo và luận văn đơn giản.', 'Luyện nghe tin tức mới định kỳ.', 'Tổng hợp suy nghĩ, phát biểu.', 'Luyện tập cho kỳ thi du học Nhật Bản (200 điểm) và kỳ thi năng lực Nhật ngữ 2kyu.'] },
      { level: 'Trung thượng cấp', items: ['Đọc hiểu tiếng Nhật một cách tự nhiên như người bản xứ.', 'Đọc hiểu những bài báo chuyên đề và tiểu thuyết đơn giản.', 'Luyện tập cho kỳ thi năng lực Nhật ngữ 1kyu.'] },
      { level: 'Thượng cấp', items: ['Có thể diễn tả tiếng Nhật một cách tự nhiên nhất.', 'Có thể nghe hiểu tốt những bài giảng chuyên đề.', 'Đạt được trình độ tiếng Nhật cho những nghiên cứu chuyên đề.'] },
    ],
    highlights: [
      { title: 'Giao thông rất thuận tiện', content: 'Với vị trí nằm tại trung tâm thành phố, từ trường các bạn có thể di chuyển đến thành phố Yokohama chỉ với 20 phút đi tàu điện. Bạn cũng có nhiều cơ hội tham quan phòng hội nghị quốc tế, phòng mỹ thuật YOKOHAMA, và Minato Mirai 21.\n\nTrường cũng có cơ sở tại đường Koto – Tokyo. Từ trường di chuyển khoảng 8 phút đi tàu điện là đến trung tâm thành phố.' },
      { title: 'Chương trình tiêu chuẩn quốc tế', content: 'Các giáo viên được trang bị kiến thức tiếng Nhật chuẩn với giáo trình dạy học đa dạng, hướng đến thực tế, đem đến chương trình đào tạo đạt tiêu chuẩn quốc tế. Giáo viên hướng dẫn học viên hoàn thành tốt 4 kỹ năng nghe nói đọc viết, có cơ hội học tiếp lên đại học và cao học tại Nhật.' },
      { title: 'Chú trọng rèn luyện nhân cách', content: 'Học viện YIEA thực hiện phương châm không chỉ luyện tập các em giỏi tiếng Nhật mà còn giáo dục các em trở thành người có nhân cách tốt, mang tính quốc tế. Nhà trường giới thiệu việc làm thêm và xây dựng ký túc xá cho các bạn lần đầu sang Nhật.' },
    ],
  },

  // 2. Arc Academy
  {
    slug: 'arc-academy',
    name: 'Học viện ARC (ARC Academy)',
    shortName: 'ARC Academy',
    country: 'Nhật Bản', city: 'Tokyo · Osaka · Kyoto',
    img: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80',
    founded: 1986, principal: 'Endo Yumiko / Miya Tagayasu / Moriwaki Naoko', ceo: 'Suzuki Nobuo',
    addresses: ['Cơ sở Iidabashi: cách ga Iidabashi 900m (Tokyo)', 'Cơ sở Itabashi & Shinjuku (Tokyo)', 'Cơ sở Namba (Osaka)', 'Cơ sở Kyoto'],
    intro: [
      'Học viện ARC được thành lập vào năm 1986, dành cho những doanh nhân người nước ngoài có nhu cầu học tiếng Nhật. ARC có ý nghĩa là "cánh cổng dẫn đến thế giới".',
      'Từ khi thành lập đến nay, quy mô của trường ngày càng mở rộng, phục vụ các đối tượng từ doanh nhân đến học sinh, nhà nghiên cứu, nhân viên đại sứ quán, thực tập sinh và cả những người có kế hoạch định cư dài hạn.',
      'Học viện cung cấp các khóa học được giảng dạy bởi giáo viên dày dặn kinh nghiệm và nhiệt huyết, đồng thời đem đến môi trường quốc tế phong phú.',
    ],
    tuition: { note: 'Học viện Arc Academy có nhiều chương trình học bổng cho sinh viên có thành tích xuất sắc và chế độ hỗ trợ chi phí y tế dành riêng cho học viên. Vui lòng liên hệ Việt Phát VTI để được tư vấn học phí chi tiết.', rows: [] },
    courses: [
      { level: 'Khóa học du học', items: ['Dành cho học viên có nhu cầu học tiếng Nhật hệ thống, mục tiêu thi vào đại học hoặc chương trình sau đại học.', 'Chú trọng kỹ năng giao tiếp và tiếng Nhật học thuật.', 'Tham gia bài giảng tiếng Nhật trình độ cao và nhiều hoạt động đa dạng.'] },
      { level: 'Khóa học cấp tốc', items: ['Dành cho học viên đang trải nghiệm hoặc cư trú tại Nhật, cần tiếng Nhật để giao tiếp và làm việc.', 'Tập trung vào kỹ năng nghe và nói tự nhiên, lưu loát.'] },
      { level: 'Khóa học đa chức năng', items: ['Bao gồm các khóa với mục tiêu khác nhau như tiếng Nhật thương mại, khóa dự bị cao học.'] },
      { level: 'Khóa học cá nhân', items: ['Thiết kế riêng cho từng cá nhân, từ người mới bắt đầu đến trình độ cao.', 'Thời gian học linh hoạt theo nhu cầu học viên.', 'Giảng viên có thể dạy tại văn phòng và nơi công tác.'] },
    ],
    highlights: [
      { title: 'Đội ngũ giảng viên ưu tú', content: 'Đội ngũ giáo viên có trình độ chuyên môn tốt và nhiệt tình, đem đến những giờ học chất lượng. Hệ thống học được thiết kế phù hợp và phân chia theo trình độ. Giáo viên cũng hỗ trợ học viên tận tình trong những vấn đề sinh hoạt và cuộc sống hàng ngày.' },
      { title: 'Quy mô lớn và môi trường đa quốc gia', content: 'Trường gồm 2 cơ sở tại Tokyo (Itabashi và Shinjuku), cơ sở ở Namba – Osaka và Kyoto. Các du học sinh quốc tế đến từ hơn 40 quốc gia. Những hoạt động giao lưu, ngoại khóa được tổ chức thường xuyên để đảm bảo học viên có trải nghiệm đầy đủ và trao đổi văn hóa.' },
      { title: 'Hỗ trợ toàn diện cho du học sinh', content: 'Nhà trường bố trí ký túc xá gần trường với giá cả phải chăng và an toàn. Về việc làm thêm, trường có phòng hỗ trợ việc làm chuyên biệt, cung cấp thông tin và giới thiệu việc làm sau ít nhất 3 tháng đầu học tập.' },
    ],
  },

  // 3. Kobe Sumiyoshi
  {
    slug: 'kobe-sumiyoshi',
    name: 'Trường Nhật ngữ Quốc tế Kobe Sumiyoshi',
    shortName: 'Kobe Sumiyoshi',
    country: 'Nhật Bản', city: 'Kobe',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    founded: 2001, foundedNote: 'Tháng 7/2001',
    admissionTerms: 'Tháng 4, 7, 10, 1', dormitory: '46,000 yên / tháng', jobSupport: true,
    addresses: ['2-21-8 Sumiyoshimiya-cho, Higashi-Nada-ku, Kobe-shi'],
    intro: [
      'Trường Nhật ngữ Quốc tế Kobe Sumiyoshi là cơ sở giảng dạy và đào tạo tiếng Nhật uy tín tại tỉnh Kobe, được thành lập vào tháng 7/2001.',
      'Thành phố Kobe nằm tại miền Nam Hyogo, là một trong những thành phố cảng quan trọng của xứ hoa anh đào. Xung quanh trường có nhiều địa điểm nổi tiếng như núi Rokko, suối nước nóng Arima và các lễ hội văn hóa độc đáo quanh năm.',
    ],
    tuition: {
      note: 'Học phí đã bao gồm chi phí đăng ký.',
      rows: [
        { label: 'Khóa dự bị đại học A (2 năm)', value: '1,404,200 JPY', note: '' },
        { label: 'Khóa dự bị đại học B (1 năm 6 tháng)', value: '1,070,400 JPY', note: '' },
      ],
    },
    admission: [
      { term: 'Tháng 4', duration: '2 năm (Khóa A)', applyPeriod: '—' },
      { term: 'Tháng 10', duration: '1 năm 6 tháng (Khóa B)', applyPeriod: '—' },
    ],
    courses: [
      { level: 'Khóa dự bị đại học A', items: ['Thời gian đào tạo 2 năm, nhập học Tháng 4.', 'Đào tạo tiếng Nhật chuyên sâu, mang tính ứng dụng cao cho sinh viên quốc tế.'] },
      { level: 'Khóa dự bị đại học B', items: ['Thời gian đào tạo 1 năm 6 tháng, nhập học Tháng 10.', 'Chương trình được thiết kế bài bản, đáp ứng tốt nhất nhu cầu học tập của sinh viên quốc tế.'] },
    ],
    highlights: [
      { title: 'Môi trường đào tạo chuyên nghiệp', content: 'Trường trang bị phòng học và phòng tư vấn lộ trình học lên cao, cùng những phòng học đa năng trên sân thượng nơi học viên có thể ngắm đỉnh núi Rokko. Ngoài ra có nhiều hoạt động ngoại khóa như dã ngoại đến Kyoto, núi Awaji, cuộc thi thể thao mỗi năm.' },
      { title: 'Định hướng tương lai', content: 'Mục tiêu cốt yếu là giảng dạy tiếng Nhật và cung cấp kiến thức phục vụ học viên học lên các chương trình cao hơn. Hàng năm tỷ lệ chọn học lên cao lên đến 98%. Trường có hệ thống tư vấn một học viên – một giáo viên và thường xuyên mời cán bộ tuyển sinh từ các trường đại học đến trao đổi cùng học viên.' },
      { title: 'Chuyên môn hóa đào tạo', content: 'Trường còn có những lớp học dành cho các bạn muốn theo đuổi ngành sản xuất anime và xe hơi. Sau khi hoàn thành chương trình Nhật ngữ, học viên có thể học tiếp tại các trường dạy nghề liên kết trực tiếp, và xin việc làm tại Nhật hay Việt Nam sau khi tốt nghiệp.' },
      { title: 'Cơ hội giao lưu và phát triển', content: 'Nhà trường thường xuyên tổ chức các hoạt động giao lưu, vui chơi thông qua cuộc thi hùng biện, các chuyến dã ngoại hay hội thảo, giúp học viên tìm hiểu thêm về văn hóa và lịch sử Nhật Bản.' },
    ],
  },

  // 4. Osaka Kokusai Academy
  {
    slug: 'osaka-kokusai',
    name: 'Trường Nhật ngữ Osaka Kokusai Academy',
    shortName: 'Osaka Kokusai',
    country: 'Nhật Bản', city: 'Osaka',
    img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    phone: '+81-6-6606-9679', fax: '+81-744-33-9272',
    email: 'osaka-kkacademy@aioros.ne.jp', website: 'http://osaka-intlacademy.jp',
    facebook: 'https://www.facebook.com/Osaka-Kokusai-Academy-480146039082280',
    addresses: ['2-8-5, Haginochaya, Nishinariku, Osaka'],
    intro: [
      'Trường Osaka Kokusai Academy có vị trí tại trung tâm Osaka, với mạng lưới giao thông thuận tiện đến Thành Osaka, Dotonbori, Công viên USJ, cách Namba khoảng 15 phút đi bộ.',
      'Đội ngũ giáo viên tại trường có nhiều năm kinh nghiệm trong việc đào tạo tiếng Nhật cho du học sinh. Ngoài việc giảng dạy trên lớp, thầy cô còn quan tâm đến việc sinh hoạt hàng ngày của các bạn, luôn giúp đỡ và hỗ trợ khi gặp khó khăn.',
      'Bên cạnh đó, trường tổ chức kỳ thi kiểm tra năng lực đầu vào khi nhập học để xác định trình độ tiếng Nhật của mỗi học viên và chia lớp phù hợp. Trường giúp học viên cải thiện năng lực thông qua hoạt động hướng nghiệp kỹ càng, từ học tiếng Nhật trong đối thoại hàng ngày đến tìm việc làm.',
    ],
    tuition: {
      note: 'Tỷ giá tham khảo: 1 Yên = 215 VNĐ.',
      rows: [
        { label: 'Phí nhập học', value: '50,000 Yên', note: '' },
        { label: 'Phí đăng ký', value: '30,000 Yên', note: '' },
        { label: 'Học phí 12 tháng (chưa thuế)', value: '580,000 Yên', note: '' },
        { label: 'Phí tài liệu', value: '30,000 Yên', note: '' },
        { label: 'Phí cơ sở', value: '20,000 Yên', note: '' },
        { label: 'Tổng học phí năm đầu', value: '710,000 Yên (~152,650,000 VNĐ)', note: '', highlight: true },
        { label: 'Tiền vào nhà (KTX)', value: '25,000 Yên', note: '' },
        { label: 'Tiền nhà KTX 6 tháng', value: '180,000 Yên', note: '' },
        { label: 'Tổng KTX 6 tháng', value: '205,000 Yên (~44,075,000 VNĐ)', note: '', highlight: true },
      ],
    },
    highlights: [
      { title: 'Vị trí trung tâm Osaka', content: 'Trường tọa lạc tại trung tâm Osaka, với mạng lưới giao thông thuận tiện đến Thành Osaka, Dotonbori, Công viên USJ. Cách Namba khoảng 15 phút đi bộ – trung tâm mua sắm và giải trí sầm uất nhất Osaka.' },
      { title: 'Giảng dạy theo trình độ', content: 'Trường tổ chức kỳ thi kiểm tra năng lực đầu vào để xác định trình độ tiếng Nhật và chia lớp phù hợp. Từ đó, giúp học viên cải thiện năng lực thông qua hoạt động hướng nghiệp kỹ càng từ đối thoại hàng ngày đến tìm việc làm.' },
    ],
  },

  // 5. ISB
  {
    slug: 'isb-tokyo',
    name: 'Trường Kinh Doanh Quốc Tế ISB (International School of Business)',
    shortName: 'ISB Tokyo',
    country: 'Nhật Bản', city: 'Tokyo',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    intro: [
      'Trường chuyên môn Kinh Doanh Quốc Tế Nhật Bản (ISB) là nơi đào tạo chuyên sâu ngành tiếng Nhật – một Trung tâm nghiên cứu tiếng Nhật nổi tiếng tại Tokyo.',
      '"Giấc mơ thì ai cũng có. Đặc biệt là đối với các bạn trẻ thì việc thực hiện được những ước mơ trong cuộc đời mình là một vấn đề quan trọng. Ở trường chúng tôi thì có rất nhiều học sinh, và để thực hiện được ước mơ của mình mọi người đi học tiếng Nhật, văn hóa Nhật, Kinh doanh Quốc tế… Chúng tôi muốn trở thành môi trường giáo dục quốc tế, giúp học sinh đạt được các mục tiêu đã đề ra và biến giấc mơ thành hiện thực."',
    ],
    tuition: {
      note: 'Học bổng ISB: sau khi nhập học sẽ xét duyệt dựa trên kết quả học tập. Học viên được nhận học bổng 100,000 JPY giảm trừ trên học phí. Sinh viên năm 1 có điểm chuyên cần cao, thành tích xuất sắc sẽ được Hiệu trưởng Tanaka trực tiếp trao tặng học bổng đặc biệt.',
      rows: [
        { label: 'Lệ phí tuyển sinh', value: '20,000 JPY', note: 'Cả 2 hệ' },
        { label: 'Lệ phí nhập học', value: '50,000 JPY', note: 'Cả 2 hệ' },
        { label: 'Học phí 1 năm – Chuyên ngành tiếng Nhật', value: '650,000 JPY', note: '' },
        { label: 'Học phí 1 năm – Trung tâm nghiên cứu', value: '560,000 JPY', note: '' },
        { label: 'Tài liệu học tập', value: '50,000 JPY', note: 'Cả 2 hệ' },
        { label: 'Tổng – Chuyên ngành tiếng Nhật', value: '770,000 JPY', note: '', highlight: true },
        { label: 'Tổng – Trung tâm nghiên cứu', value: '680,000 JPY', note: '', highlight: true },
      ],
    },
    courses: [
      {
        level: 'Chuyên ngành tiếng Nhật',
        items: ['Bằng chứng nhận chuyên môn: Có.', 'Tổng số thời gian học: khoảng 900h/năm (5 tiết/ngày).', 'Nghỉ hè khoảng 2 tuần, thi định kỳ 2 lần/học kỳ.', 'Phù hợp cho bạn muốn ở lại Nhật làm việc nhưng chưa có bằng tốt nghiệp chuyên ngành.'],
      },
      {
        level: 'Trung tâm nghiên cứu tiếng Nhật',
        items: ['Bằng chứng nhận chuyên môn: Không.', 'Tổng số thời gian học: khoảng 800h/năm (4 tiết/ngày).', 'Nghỉ hè khoảng 2 tuần, thi định kỳ 2 lần/học kỳ.'],
      },
    ],
    highlights: [
      { title: 'Ký túc xá tiện nghi', content: 'Có 2 cơ sở KTX: cơ sở 1 đi tàu 35 phút (từ ga đến trường 2 phút), cơ sở 2 đi bộ 10 phút. KTX được trang bị đầy đủ: vòi sen, nhà vệ sinh, nhà bếp, phòng ăn, tủ quần áo, tủ lạnh, máy giặt và tivi.' },
      { title: 'Hỗ trợ tìm việc làm thêm', content: 'Tại ISB có giáo viên chuyên môn đảm nhận việc tìm việc làm thêm cho sinh viên. Trường cố gắng tìm việc nhanh nhất tại nơi sinh sống hoặc tại các trung tâm như Otsuka, Ikebukuro, Shinjuku. ISB còn hướng dẫn viết sơ yếu lý lịch, cách liên lạc nhà tuyển dụng và chuẩn bị phỏng vấn.' },
    ],
  },

  // 6. OJA
  {
    slug: 'oja-osaka',
    name: 'Học viện ngôn ngữ Osaka (OJA – Osaka Japanese Language Academy)',
    shortName: 'OJA Osaka',
    country: 'Nhật Bản', city: 'Osaka',
    img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80',
    founded: 2012, foundedNote: 'Tháng 2/2012',
    admissionTerms: 'Tháng 4, 7, 10',
    phone: '+81-6-6707-2227', email: 'contact@oja.jp', website: 'http://www.oja.jp',
    addresses: ['2-2-12 Nagayoshi-nagaharanishi, Hirano-ku, Osaka-shi, Osaka 547-0015'],
    intro: [
      'Học viện ngôn ngữ Osaka (OJA) thành lập vào tháng 2 năm 2012, tọa lạc tại khu vực thành phố Osaka. Trường tập trung nhiều giáo viên giàu kinh nghiệm và có chất lượng đào tạo hàng đầu tại Nhật Bản.',
      'Toàn bộ kiến thức và giáo trình học của du học sinh sẽ được nhà trường trang bị kỹ lưỡng từ sơ cấp đến cao cấp, bao gồm các khóa học dự bị và khóa học ngắn hạn cho các hệ thống giáo dục đại học và cao học tại Nhật.',
      'Học viện OJA có chương trình đào tạo đa dạng, mỗi lớp học chia thành nhóm nhỏ tối đa khoảng 20 người, có chế độ học tập cho 244 học sinh mỗi ngày, chia thành 2 buổi sáng và chiều, mỗi buổi có 7 lớp học.',
    ],
    tuition: {
      note: 'Ký túc xá 6 tháng (không bắt buộc) – 202,000 Yên, bao gồm phí KTX, chăn gối nệm, bảo hiểm tai nạn và phí đưa đón sân bay. Ký túc xá có nhiều loại phòng, có thể ở 1 hoặc 2 bạn tùy sở thích.',
      rows: [
        { label: 'Học phí (1 năm)', value: '680,000 Yên', note: '', highlight: true },
        { label: 'KTX 6 tháng (không bắt buộc)', value: '202,000 Yên', note: 'Bao gồm phí KTX, chăn gối, bảo hiểm, đưa đón sân bay' },
      ],
    },
    highlights: [
      { title: 'Đội ngũ giáo viên chất lượng', content: 'Trường tập trung nhiều giáo viên giàu kinh nghiệm, có chất lượng đào tạo hàng đầu. Với môi trường học tốt và sự nhiệt tình hướng dẫn của giáo viên, học viên dễ tiếp thu kiến thức hơn.' },
      { title: 'Ký túc xá và hỗ trợ sinh viên', content: 'Để tạo điều kiện cho học viên lần đầu nhập học, nhà trường xây dựng ký túc xá riêng với chi phí thấp nhất, trang bị đầy đủ thiết bị hiện đại. Nhà trường sẽ giới thiệu việc làm thêm cho các bạn sau khi học tháng đầu tiên tại trường.' },
      { title: 'Hoạt động ngoại khóa phong phú', content: 'Nhà trường tổ chức các buổi học ngoại khóa để các bạn trải nghiệm và tìm hiểu về nền văn hóa và con người Nhật Bản qua những hoạt động thú vị nhất.' },
    ],
  },

  // 7. Kobe University
  {
    slug: 'kobe-university',
    name: 'Đại học Quốc tế Kobe (Kobe University)',
    shortName: 'Đại học Kobe',
    country: 'Nhật Bản', city: 'Kobe',
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    intro: [
      'Đại học Kobe là một trong những trường đại học quốc gia có tuổi thọ lớn nhất của Nhật Bản, đào tạo các chuyên ngành về kinh tế và quản trị kinh doanh. Là đầu não nghiên cứu kinh tế của Nhật Bản, Kobe được mệnh danh là vùng đất sản sinh ra nền giáo dục về kinh tế.',
      'Trước khi được học Đại học, các du học sinh được học tại Khoa tiếng. Trường đào tạo 15 khoa chủ yếu ở hai lĩnh vực kinh tế và phục hồi chức năng.',
    ],
    tuition: {
      note: 'Các trường đại học Nhật Bản thường không miễn giảm học phí hoàn toàn. Trường có chương trình giảm 50% học phí cho các trường hợp đặc biệt và nhiều chế độ học bổng đa dạng. Sinh viên chỉ cần có thành tích tốt là có thể được tiến cử học bổng. Vui lòng liên hệ Việt Phát VTI để được tư vấn học phí chi tiết.',
      rows: [],
    },
    highlights: [
      { title: 'Chương trình đào tạo toàn diện', content: 'Trường đại học quốc tế Kobe đào tạo 15 khoa chủ yếu ở hai lĩnh vực kinh tế và phục hồi chức năng. Trước khi vào đại học, du học sinh được học tại Khoa tiếng để chuẩn bị nền tảng ngôn ngữ.' },
      { title: 'Cơ sở vật chất hiện đại', content: 'Mỗi khoa được xây dựng một thư viện, sân bóng và nhà thi đấu riêng. Du học sinh còn được trang bị thêm phòng tự học và phòng tra cứu tài liệu.' },
      { title: 'Chính sách học bổng', content: 'Mặc dù hiếm có chương trình giảm 100%, trường vẫn có giảm 50% học phí trong một số trường hợp đặc biệt, cùng với rất nhiều chế độ học bổng. Sinh viên chỉ cần có thành tích tốt là có thể được tiến cử nhận học bổng.' },
    ],
  },

  // 8. Osafune
  {
    slug: 'osafune',
    name: 'Học viện Nhật ngữ Osafune',
    shortName: 'Osafune',
    country: 'Nhật Bản', city: 'Okayama',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    founded: 1990,
    addresses: ['Thành phố Okayama, tỉnh Okayama, Nhật Bản'],
    intro: [
      'Học viện Nhật ngữ Osafune nằm trong quy mô học viên giáo dục phát triển của Nhật. Đội ngũ giáo viên tại đây đều có trình độ chuyên môn cao, được tuyển chọn vô cùng kỹ càng. Vì vậy, môi trường học tập ở đây không chỉ vô cùng chất lượng mà không khí học cũng rất vui vẻ, thoải mái.',
      'Học viện Nhật ngữ Osafune được thành lập năm 1990 và hiện là trường học thu hút du học sinh quốc tế đứng top đầu của Nhật Bản.',
      'Học viện Nhật ngữ Osafune nằm ở thành phố Okayama – được mệnh danh là thành phố của giáo dục. Nơi đây có ngôi trường Shizutani lâu đời nhất của Nhật Bản và với 13 trường Đại học công lập, tự lập cùng 42 trường chuyên môn, Okayama là điểm đến du học lý tưởng.',
    ],
    tuition: {
      note: 'Học phí thấp, ký túc xá tiện lợi (bao gồm 3 bữa ăn). Vui lòng liên hệ Việt Phát VTI để được tư vấn học phí chi tiết.',
      rows: [],
    },
    highlights: [
      { title: 'Được công nhận bởi Hội chấn hưng giáo dục Nhật ngữ', content: 'Học viện được Hội chấn hưng giáo dục Nhật ngữ công nhận. Tự hào có tỉ lệ học sinh đạt điểm cao trong các kỳ thi năng lực Nhật ngữ và công tác tư vấn hiệu quả cho học viên trong việc chọn trường và thi vào các trường chuyên môn, cao đẳng, đại học, cao học.' },
      { title: 'Chương trình giáo dục toàn diện', content: 'Giáo trình của nhà trường luôn được đổi mới để bắt kịp xã hội hiện đại, xen lẫn với các bài học về văn hoá, truyền thống. Ngoài việc học kiến thức trên lớp, nhà trường còn có nhiều chuyên gia tư vấn giúp đỡ các em giải quyết những vấn đề khó khăn trong cuộc sống.' },
      { title: 'Thành phố Okayama – điểm đến lý tưởng', content: 'Với tư cách là mạch nối giao thông quan trọng kể từ khi cây cầu Seto Ohashi được khai thông, kết nối với các đảo Kyushu và Shikoku, Okayama ngày càng phát triển, mang lại nhiều cơ hội học tập và làm việc cho du học sinh.' },
    ],
  },

  // 9. Meric
  {
    slug: 'meric-osaka',
    name: 'Trường Nhật Ngữ Meric (Meric Japanese Language School)',
    shortName: 'Meric Osaka',
    country: 'Nhật Bản', city: 'Osaka',
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    founded: 1987, admissionTerms: 'Tháng 1, 4, 7, 10',
    phone: '+81 6-6646-0330', fax: '06-6646-0320', website: 'http://www.meric.co.jp/meric/',
    addresses: ['556-0006 Japan, Osaka-shi, Nariwa-ku, Nipponbashi-higashi 1-10-6 Meric Building 2F'],
    intro: [
      'Meric Japanese Language School được thành lập từ năm 1987, với mục tiêu giảng dạy và nâng cao trình độ tiếng Nhật cho các học viên; đồng thời chú trọng vào việc luyện thi vào các trường đại học, cao đẳng, trường chuyên môn tại Nhật Bản.',
      'Bên cạnh đó, trường cũng chú trọng đào tạo nguồn nhân lực chất lượng cao trong các ngành đặc biệt như phiên dịch và hướng dẫn viên du lịch.',
      'Cùng với các chương trình học tiếng Nhật trên lớp, trường còn thường xuyên tổ chức: các cuộc thi hùng biện tiếng Nhật; các chương trình ngoại khóa; các lớp học văn hóa nhằm tạo cơ hội cho học viên tìm hiểu thêm về văn hóa, truyền thống của đất nước Nhật Bản.',
    ],
    tuition: {
      note: 'Trường có chế độ học bổng đa dạng và hỗ trợ ký túc xá riêng. Vui lòng liên hệ Việt Phát VTI để được tư vấn học phí chi tiết.',
      rows: [],
    },
    highlights: [
      { title: 'Vị trí thuận lợi tại Osaka', content: 'Trường Meric nằm ở vị trí thuận lợi, chỉ mất 10 phút đi bộ từ ga Nipponbashi. Phía đông là khu phố Shitadera với nhiều ngôi chùa cổ. Phía tây là khu phố điện tử Nipponbashi. Phía bắc là chợ Kuromon – nhà bếp của Osaka. Phía nam có thể nhìn thấy tòa tháp Tsutenkaku.' },
      { title: 'Hoạt động ngoại khóa phong phú', content: 'Trường thường xuyên tổ chức các cuộc thi hùng biện tiếng Nhật, các chương trình ngoại khóa, các lớp học văn hóa nhằm tạo cơ hội cho học viên tìm hiểu thêm về văn hóa và truyền thống Nhật Bản.' },
    ],
  },

  // 10. Tohoku Gaigo
  {
    slug: 'tohoku-gaigo',
    name: 'Trường Nhật Ngữ Tohoku Gaigo (Tohoku Foreign Language & Tourism College)',
    shortName: 'Tohoku Gaigo',
    country: 'Nhật Bản', city: 'Sendai',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    founded: 1989, admissionTerms: 'Tháng 4, 10',
    addresses: ['2-1-13 Itsutsubashi, Aoba-ku, Sendai-shi, Miyagi 980-0022', 'Ga gần nhất: Itsutsubashi Station (五橋駅)'],
    intro: [
      'Trường Nhật ngữ Tohoku Gaigo (Tohoku Foreign Language & Tourism College) được thành lập năm 1989 tại thành phố Sendai, cách thành phố Tokyo 400km về phía Bắc.',
      'Sendai được xem là thành phố văn hóa của Nhật Bản với nhiều bảo tàng và thư viện. Nơi đây tập trung 15 trường đại học, trong đó Tohoku có số lượng sinh viên quốc tế theo học rất lớn.',
    ],
    tuition: {
      note: 'Ngoài học phí còn có: Phí tài liệu (10,000-13,000 Yên), Phí hoạt động ngoại khóa (8,000 Yên/học kỳ), Phí hội sinh viên (5,000 Yên), Kiểm tra sức khỏe (3,000 Yên/năm), Bảo hiểm sinh viên nước ngoài (10,000 Yên/năm).',
      rows: [
        { label: 'Phí học tập', value: '70,000 Yên', note: 'Năm 1 (cả 2 kỳ)' },
        { label: 'Học phí (kỳ tháng 4 – năm 1)', value: '580,000 Yên', note: '' },
        { label: 'Phí cơ sở vật chất (kỳ tháng 4 – năm 1)', value: '30,000 Yên', note: '' },
        { label: 'Tổng năm 1 (kỳ tháng 4)', value: '680,000 Yên', note: '', highlight: true },
        { label: 'Tổng năm 2 (kỳ tháng 4)', value: '610,000 Yên', note: '' },
        { label: 'Tổng năm 1 (kỳ tháng 10)', value: '680,000 Yên', note: '', highlight: true },
        { label: 'Tổng năm 2 (kỳ tháng 10 – 1,5 năm)', value: '305,000 Yên', note: '' },
      ],
    },
    courses: [
      { level: 'Kỳ tháng 4 – 2 năm', items: ['Thời gian đào tạo 2 năm.', 'Chương trình học được thiết kế bài bản, phù hợp với các đối tượng người học khác nhau.'] },
      { level: 'Kỳ tháng 10 – 1,5 năm', items: ['Thời gian đào tạo 1,5 năm.', 'Đáp ứng tốt nhất nhu cầu nâng cao năng lực tiếng Nhật của học viên.'] },
    ],
    highlights: [
      { title: 'Học bổng hấp dẫn', content: 'Trường đem đến chính sách học bổng tốt với nhiều chương trình:\n• Học bổng 48,000 Yên/tháng cho sinh viên học tại trường.\n• Học bổng 50,000 Yên cho sinh viên có kết quả cao nhất mỗi học kỳ (khoảng 5% sinh viên).\n• Học bổng 10,000 Yên cho sinh viên qua kỳ kiểm tra năng lực tiếng Nhật N1.' },
      { title: 'Thành phố Sendai – chi phí hợp lý', content: 'Mức sống tại Sendai chỉ bằng 60% Tokyo, giúp bạn tiết kiệm chi phí sinh hoạt và giảm áp lực kinh tế. Nhà trường cũng hỗ trợ tìm kiếm công việc làm thêm tại những cửa hàng xung quanh trường.' },
      { title: 'Môi trường học tập thân thiện', content: 'Trường tập trung nhiều học sinh sáng tạo, hòa đồng với nhiều thành tích học tập. Môi trường học tập thân thiện, tạo nhiều điều kiện thuận lợi để các bạn du học sinh thích nghi và hòa nhập nhanh chóng với cuộc sống.' },
      { title: 'Cơ sở vật chất và giáo viên chuyên nghiệp', content: 'Trường trang bị hệ thống cơ sở hạ tầng hiện đại với đầy đủ thiết bị và tiện nghi. Đội ngũ giáo viên nhiệt tình, có kinh nghiệm chuyên môn tốt, luôn đồng hành và hỗ trợ học viên trong quá trình học tập.' },
    ],
  },

  // 11. Kamei Gakuen
  {
    slug: 'kamei-gakuen',
    name: 'Trường Nhật ngữ Kamei Gakuen',
    shortName: 'Kamei Gakuen',
    country: 'Nhật Bản', city: 'Osaka',
    img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80',
    founded: 1935,
    addresses: ['Trung tâm thành phố Osaka, Nhật Bản'],
    intro: [
      'Nhật ngữ Kamei Gakuen là ngôi trường Nhật ngữ lâu đời tại xứ Phù Tang, được thành lập từ năm 1935. Trải qua hơn 75 năm giảng dạy, trường đã đạt được nhiều thành tựu đáng ghi nhận, khẳng định vị thế của mình trong đào tạo Nhật ngữ.',
      'Để đảm bảo chất lượng dạy và học, trường trang bị cơ sở vật chất rộng rãi và hiện đại. Bên cạnh chương trình Nhật ngữ, trường còn đào tạo một số môn để thi đại học và cao học.',
    ],
    tuition: {
      note: 'Học bổng Kamei Gakuen: điều kiện trình độ tiếng Nhật từ N4 trở lên (hoặc tương đương). Giá trị học bổng: miễn giảm 60,000 Yên tiền nhập học và 60,000 Yên học phí 1 năm. Ngoài ra, phí sinh hoạt khoảng 70,000 Yên/tháng. Ký túc xá 22,000–28,000 Yên/tháng/người (phòng 2-3 người).',
      rows: [
        { label: 'Phí đăng ký dự tuyển', value: '20,000 Yên', note: '' },
        { label: 'Tiền nhập học', value: '60,000 Yên', note: '' },
        { label: 'Học phí 1 năm (kèm sách và phí ngoại khóa)', value: '700,000 Yên', note: '' },
        { label: 'Phí phúc lợi (bảo hiểm) 1 năm', value: '16,000 Yên', note: '' },
        { label: 'Phí ngân hàng', value: '5,500 Yên', note: '' },
        { label: 'Tổng', value: '801,000 Yên', note: '', highlight: true },
      ],
    },
    courses: [
      { level: 'Khóa học 1 năm', items: ['Dành cho học viên có N1, N2 hoặc trình độ tương đương.', 'Mục tiêu học lên trung cấp, cao đẳng, đại học sau khi kết thúc khóa học.'] },
      { level: 'Khóa học 2 năm', items: ['Dành cho sinh viên mới bắt đầu học tiếng Nhật.', 'Nguyện vọng thi vào các trường Trung cấp, Cao đẳng hay Đại học.', 'Khi hoàn thành khóa học, được cấp chứng chỉ để học liên thông lên Đại học.'] },
      { level: 'Khóa học 1,5 năm', items: ['Dành cho sinh viên có nguyện vọng thi vào các trường Trung cấp, Cao đẳng, Đại học sau khi kết thúc khóa học.'] },
    ],
    highlights: [
      { title: 'Tọa lạc trung tâm Osaka', content: 'Trường Nhật ngữ Kamei Gakuen tọa lạc tại trung tâm thành phố Osaka với đầy đủ dịch vụ tiện nghi từ ăn uống, vui chơi, mua sắm, giúp di chuyển thuận lợi đến nhiều địa điểm.' },
      { title: 'Visa 2 năm và cơ hội học lên', content: 'Là trường chuyên môn, sinh viên học tập tại đây được cấp visa 2 năm khi nhận tư cách lưu trú. Sau khi hoàn thành chương trình tiếng Nhật, bạn có thể học lên các khoa chuyên môn như Kiến trúc, IT, Y tế... Nhà trường giới thiệu việc làm cho sinh viên đã tốt nghiệp.' },
      { title: 'Ký túc xá gần trường', content: 'Kamei Gakuen có chính sách hỗ trợ ký túc xá cho du học sinh, cách trường khoảng 5-10 phút đi bộ. Xung quanh có rất nhiều cửa hàng, siêu thị hay cửa hàng tiện ích, rất thuận tiện cho cuộc sống du học sinh.' },
    ],
  },

  // 12. GAG
  {
    slug: 'gag-fukuoka',
    name: 'Học viện Nhật ngữ GAG (GAG Japanese Language Institute)',
    shortName: 'GAG Fukuoka',
    country: 'Nhật Bản', city: 'Fukuoka',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    admissionTerms: 'Tháng 4, 7, 10',
    addresses: ['2-11-2 Sanno, Hakata-ku, Fukuoka'],
    intro: [
      'Học viện Nhật ngữ GAG tọa lạc tại thành phố Fukuoka, Kyushu, Nhật Bản – một trong những trung tâm kinh tế, văn hóa của vùng Kyushu và được coi là cửa ngõ của châu Á với vị trí giao thương thuận lợi.',
      'Định hướng của trường là giúp học sinh học tập để đạt được thành tích cao trong kỳ thi du học sinh và đạt được chứng chỉ năng lực tiếng Nhật N1 và N2 để học lên các trường đại học.',
      'Chương trình học được thiết kế khoa học và bài bản, kết hợp lý thuyết và thực tiễn, tạo nhiều thuận lợi trong cuộc sống cũng như cơ hội để học viên tìm hiểu kiến thức về văn hóa Nhật Bản.',
    ],
    tuition: {
      note: 'Học bổng từ quỹ hỗ trợ sinh viên nước ngoài: 48,000 Yên/tháng (trong 1 năm) dựa theo thành tích học tập, thái độ và tỉ lệ lên lớp.',
      rows: [
        { label: 'Phí dự tuyển', value: '30,000 Yên', note: 'Cả 2 khóa' },
        { label: 'Phí nhập học', value: '50,000 Yên', note: 'Cả 2 khóa' },
        { label: 'Học phí khóa 2 năm', value: '1,200,000 Yên', note: '' },
        { label: 'Phí cơ sở khóa 2 năm', value: '100,000 Yên', note: '' },
        { label: 'Tổng khóa 2 năm', value: '1,380,000 Yên', note: '', highlight: true },
        { label: 'Học phí khóa 1 năm 6 tháng', value: '900,000 Yên', note: '' },
        { label: 'Phí cơ sở khóa 1 năm 6 tháng', value: '75,000 Yên', note: '' },
        { label: 'Tổng khóa 1 năm 6 tháng', value: '1,055,000 Yên', note: '', highlight: true },
      ],
    },
    admission: [
      { term: 'Tháng 4', duration: '2 năm', applyPeriod: '—' },
      { term: 'Tháng 7', duration: '1 năm 9 tháng', applyPeriod: '—' },
      { term: 'Tháng 10', duration: '1,5 năm', applyPeriod: '—' },
    ],
    courses: [
      { level: 'Trình độ sơ cấp (N5~N3)', items: ['Nắm mẫu ngữ pháp cơ bản, thành thạo Hiragana, Katakana và Kanji cần thiết.', 'Có thể sử dụng kiến thức để hội thoại các đoạn ngắn trong cuộc sống.'] },
      { level: 'Trình độ trung cấp (N2)', items: ['Đọc hiểu tạp chí, báo. Nghe hiểu hội thoại, tin tức.', 'Có thể viết bài văn về chủ đề. Biết tóm tắt bố cục, viết văn logic.'] },
      { level: 'Trình độ cao cấp (N1)', items: ['Đọc hiểu văn bản báo chí trừu tượng hoặc bài luận.', 'Nghe hiểu nội dung bản tin và các bài giảng hay hội thoại với tốc độ tự nhiên.'] },
    ],
    highlights: [
      {
        title: 'Học bổng đa dạng và hấp dẫn',
        content: 'Trường có hệ thống học bổng phong phú:\n• Đạt N1 JLPT: 20,000 Yên/tháng (tối đa 240,000 Yên)\n• Đạt N2 JLPT: 10,000 Yên/tháng (tối đa 120,000 Yên)\n• Đạt N3 JLPT: 3,000 Yên/tháng\n• Đạt 300 điểm EJU: 20,000 Yên/tháng\n• Đỗ đại học Quốc Lập: thưởng 100,000 Yên\n• Đỗ đại học Dân Lập danh tiếng: thưởng 500,000 Yên\n• Đi học đầy đủ 100%: 5,000 Yên (6 tháng)',
      },
      { title: 'Cơ sở vật chất hiện đại', content: 'Học viện chú trọng đến việc trang bị cơ sở vật chất, nhằm đem đến môi trường học tập và rèn luyện tốt nhất cho học viên. Trường thiết kế cơ sở vật chất hiện đại và khang trang, phục vụ tốt cho hoạt động học và nghiên cứu.' },
      {
        title: 'Phương châm giáo dục',
        content: '• Tận tình giúp đỡ từng học sinh hoàn thành mục tiêu của bản thân.\n• Hỗ trợ học sinh tìm hiểu và thích ứng với văn hóa nước ngoài.\n• Tạo môi trường học tập lý tưởng với nhiều trải nghiệm mới lạ.\n• Luôn đặt mình vào hoàn cảnh của học sinh để đưa ra những lời khuyên hữu ích.\n• Thông qua việc giáo dục tại trường giúp học sinh trưởng thành trong cuộc sống.',
      },
      { title: 'Quan tâm đến đời sống du học sinh', content: 'Tại học viện GAG, đời sống của du học sinh luôn được nhà trường chú trọng và quan tâm. Trường thường xuyên tổ chức các chương trình ngoại khóa, giúp học viên nhanh chóng tiếp thu ngôn ngữ cũng như hiểu được lối sống, giá trị văn hóa của người Nhật.' },
    ],
  },
];

export function getSchool(slug) {
  return SCHOOLS.find(s => s.slug === slug) || null;
}
