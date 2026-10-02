import { Article, TopicCategory, JLPTLevel, SourceType, SourceMetadata, SourceCategory } from '../types';
import { MOCK_ARTICLES } from './mockArticles';

// Complete Directory of Authoritative Domestic & International Press Agencies
export const VERIFIED_SOURCES: Record<SourceType, SourceMetadata> = {
  // 1. Đài Truyền hình & Cơ quan Báo chí Quốc gia Việt Nam
  vietnam_today_vtv: {
    id: 'vietnam_today_vtv',
    name: 'Vietnam Today — VTV (Đài Truyền hình Việt Nam)',
    nameJa: 'ベトナムテレビ (VTV Vietnam Today)',
    url: 'https://vietnamtoday.vtv.vn/',
    country: 'Việt Nam (Đài Truyền hình Quốc gia VTV)',
    category: 'vn_broadcaster',
    categoryNameVi: 'Đài Truyền hình & Đối ngoại Việt Nam',
    badge: 'VTV Vietnam Today',
    descriptionVi: 'Kênh truyền hình đối ngoại quốc gia VTV4, phóng sự nhịp cầu Việt - Nhật, giao lưu doanh nghiệp và gương mặt trẻ.'
  },
  vtv_news: {
    id: 'vtv_news',
    name: 'VTV News — Báo Điện tử Đài Truyền hình Việt Nam',
    nameJa: 'ベトナム国営テレビ電子版 (VTV News)',
    url: 'https://vtv.vn/',
    country: 'Việt Nam (Cổng tin tức chính thức VTV)',
    category: 'vn_broadcaster',
    categoryNameVi: 'Đài Truyền hình & Đối ngoại Việt Nam',
    badge: 'VTV News',
    descriptionVi: 'Báo điện tử của Đài Truyền hình Việt Nam, cập nhật dòng thời sự nóng và phóng sự chuyên sâu.'
  },
  vna_net: {
    id: 'vna_net',
    name: 'VNA Net — Thông tấn xã Việt Nam (Vietnam News Agency)',
    nameJa: 'ベトナム通信社 (VNA Net)',
    url: 'https://vnanet.vn/en/',
    country: 'Việt Nam (Cổng Thông tấn Quốc gia VNA)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'VNA Net',
    descriptionVi: 'Cơ quan thông tấn nhà nước chính thức, cơ sở dữ liệu kinh tế vĩ mô, FDI và hợp tác song phương.'
  },
  vietnam_plus: {
    id: 'vietnam_plus',
    name: 'Vietnam+ (Thông tấn xã Việt Nam tiếng Nhật)',
    nameJa: 'ベトナムプラス 日本語版 (VietnamPlus)',
    url: 'https://vietnamplus.vn/',
    country: 'Việt Nam (Báo điện tử đối ngoại TTXVN)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'VietnamPlus',
    descriptionVi: 'Cổng thông tin đa ngữ của Thông tấn xã Việt Nam ban tiếng Nhật, thời sự kinh tế chính trị.'
  },
  vov_world: {
    id: 'vov_world',
    name: 'VOV WORLD 日本語放送 (Đài Tiếng nói Việt Nam)',
    nameJa: 'ベトナムの声放送局 日本語班 (VOV World)',
    url: 'https://vovworld.vn/ja-JP.vov',
    country: 'Việt Nam (Đài Tiếng nói Việt Nam ban đối ngoại)',
    category: 'vn_broadcaster',
    categoryNameVi: 'Đài Truyền hình & Đối ngoại Việt Nam',
    badge: 'VOV World',
    descriptionVi: 'Ban phát thanh đối ngoại tiếng Nhật của Đài Tiếng nói Việt Nam, giọng đọc chuẩn mực và truyền cảm.'
  },
  nhan_dan: {
    id: 'nhan_dan',
    name: 'Báo Nhân Dân (Nhan Dan Online)',
    nameJa: 'ニャンダーン新聞 日本語版 (Nhan Dan)',
    url: 'https://nhandan.vn/',
    country: 'Việt Nam (Cơ quan ngôn luận Trung ương)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'Báo Nhân Dân',
    descriptionVi: 'Tiếng nói của Đảng, Nhà nước và Nhân dân, thông tin đối ngoại cấp cao và chính sách hợp tác quốc tế.'
  },
  tuoi_tre: {
    id: 'tuoi_tre',
    name: 'Tuổi Trẻ News (Báo Tuổi Trẻ đối ngoại)',
    nameJa: 'トゥオイチェー新聞 (Tuoi Tre News)',
    url: 'https://tuoitrenews.vn/',
    country: 'Việt Nam (Nhật báo độc giả lớn nhất)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'Tuổi Trẻ',
    descriptionVi: 'Nhật báo thời sự hàng đầu, nhịp sống du học sinh, giáo dục và việc làm tại Nhật Bản.'
  },
  thanh_nien: {
    id: 'thanh_nien',
    name: 'Báo Thanh Niên (Thanh Nien Online)',
    nameJa: 'タインニエン新聞 (Thanh Nien)',
    url: 'https://thanhnien.vn/',
    country: 'Việt Nam (Diễn đàn thanh niên cả nước)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'Thanh Niên',
    descriptionVi: 'Nhật báo chính luận uy tín, tin tức giới trẻ, đổi mới sáng tạo và cơ hội du học, việc làm Nhật Bản.'
  },
  vnexpress_intl: {
    id: 'vnexpress_intl',
    name: 'VnExpress International',
    nameJa: 'VnExpress 国際版',
    url: 'https://e.vnexpress.net/',
    country: 'Việt Nam (Báo điện tử nhiều độc giả nhất)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'VnExpress',
    descriptionVi: 'Bản tin đối ngoại tiếng Anh và kinh tế của VnExpress, cập nhật dòng chảy kinh doanh và FDI Nhật Bản.'
  },
  lao_dong: {
    id: 'lao_dong',
    name: 'Báo Lao Động (Lao Dong Online)',
    nameJa: 'ラオドン新聞 (Lao Dong)',
    url: 'https://laodong.vn/',
    country: 'Việt Nam (Cơ quan Tổng Liên đoàn Lao động)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'Lao Động',
    descriptionVi: 'Chính sách việc làm, quyền lợi lao động, chế độ kỹ năng đặc định và tu nghiệp sinh tại Nhật Bản.'
  },
  vgp_news: {
    id: 'vgp_news',
    name: 'Báo Điện tử Chính phủ (VGP News)',
    nameJa: 'ベトナム政府電子情報ポータル (VGP)',
    url: 'https://baochinhphu.vn/',
    country: 'Việt Nam (Cổng Thông tin Điện tử Chính phủ)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'VGP Chính Phủ',
    descriptionVi: 'Cổng thông tin điều hành của Thủ tướng và Chính phủ, hiệp định thương mại tự do và đầu tư song phương.'
  },
  vov_vn: {
    id: 'vov_vn',
    name: 'VOV.VN — Báo Điện tử Đài Tiếng nói Việt Nam',
    nameJa: 'ベトナムの声電子版 (VOV.VN)',
    url: 'https://vov.vn/',
    country: 'Việt Nam (Đài phát thanh Quốc gia VOV)',
    category: 'vn_broadcaster',
    categoryNameVi: 'Đài Truyền hình & Đối ngoại Việt Nam',
    badge: 'VOV.VN',
    descriptionVi: 'Báo điện tử của Đài Tiếng nói Việt Nam, dòng thời sự nóng, chuyên mục đối ngoại và chính sách.'
  },
  qdnd: {
    id: 'qdnd',
    name: 'Báo Quân đội Nhân dân (QDND Online)',
    nameJa: '人民軍新聞 (QDND Online)',
    url: 'https://www.qdnd.vn/',
    country: 'Việt Nam (Cơ quan của Quân ủy Trung ương)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'Báo Quân Đội',
    descriptionVi: 'Cơ quan của Quân ủy Trung ương và Bộ Quốc phòng, tin tức quốc phòng, an ninh, chủ quyền và hội nhập.'
  },
  dantri: {
    id: 'dantri',
    name: 'Báo Dân trí (Dantri Online)',
    nameJa: 'ダントリ電子新聞 (Dan Tri)',
    url: 'https://dantri.com.vn/',
    country: 'Việt Nam (Báo điện tử trực thuộc Bộ Lao động - TB&XH)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'Dân trí',
    descriptionVi: 'Báo điện tử hàng đầu về tin tức dân sinh, giáo dục du học Nhật Bản, thị trường lao động và công nghệ.'
  },
  sggp: {
    id: 'sggp',
    name: 'Báo Sài Gòn Giải Phóng (SGGP Online)',
    nameJa: 'サイゴン・ザイフォン新聞 (SGGP)',
    url: 'https://www.sggp.org.vn/',
    country: 'Việt Nam (Tiếng nói của Đảng bộ TPHCM)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'SGGP',
    descriptionVi: 'Nhật báo kinh tế - đô thị lớn nhất miền Nam, đầu mối thông tin giao thương Việt - Nhật tại TP.HCM.'
  },
  saigon_times: {
    id: 'saigon_times',
    name: 'The Saigon Times (Tạp chí Kinh tế Sài Gòn)',
    nameJa: 'ザ・サイゴンタイムズ (The Saigon Times)',
    url: 'https://thesaigontimes.vn/',
    country: 'Việt Nam (Cơ quan báo chí kinh tế đối ngoại uy tín)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'Saigon Times',
    descriptionVi: 'Tạp chí kinh tế phân tích chuyên sâu dòng vốn FDI Nhật Bản, thị trường tài chính và logistics.'
  },
  vneconomy: {
    id: 'vneconomy',
    name: 'VnEconomy (Tạp chí Kinh tế Việt Nam)',
    nameJa: 'ベトナム・エコノミー (VnEconomy)',
    url: 'https://vneconomy.vn/',
    country: 'Việt Nam (Hội Khoa học Kinh tế Việt Nam)',
    category: 'vn_news_agency',
    categoryNameVi: 'Thông tấn xã & Báo chí Chính luận VN',
    badge: 'VnEconomy',
    descriptionVi: 'Cổng thông tin kinh tế tài chính hàng đầu, nhịp đập doanh nghiệp FDI và chuyển đổi xanh song phương.'
  },

  // 2. Đài Truyền hình & Hãng Thông tấn Quốc gia Nhật Bản
  nhk_easy: {
    id: 'nhk_easy',
    name: 'NHK NEWS WEB EASY (NHKやさしい日本語)',
    nameJa: 'NHK NEWS WEB EASY',
    url: 'https://www3.nhk.or.jp/news/easy/',
    country: 'Nhật Bản (Đài truyền hình quốc gia NHK)',
    category: 'jp_broadcaster',
    categoryNameVi: 'Đài Truyền hình & Hãng tin Quốc gia Nhật Bản',
    badge: 'NHK Easy',
    descriptionVi: 'Bản tin thời sự biên tập từ vựng N4-N5 có Furigana và giọng đọc chuẩn mực của đài quốc gia NHK.'
  },
  nhk_news: {
    id: 'nhk_news',
    name: 'NHK NEWS WEB (総合ニュース)',
    nameJa: 'NHK ニュース速報・総合',
    url: 'https://www3.nhk.or.jp/news/',
    country: 'Nhật Bản (Đài truyền hình quốc gia NHK)',
    category: 'jp_broadcaster',
    categoryNameVi: 'Đài Truyền hình & Hãng tin Quốc gia Nhật Bản',
    badge: 'NHK News',
    descriptionVi: 'Cổng tin tức chính luận toàn diện của đài NHK, bao quát chính trị, kinh tế, xã hội và quốc tế.'
  },
  nhk_world: {
    id: 'nhk_world',
    name: 'NHK WORLD-JAPAN (NHK国際放送)',
    nameJa: 'NHK ワールド JAPAN',
    url: 'https://www3.nhk.or.jp/nhkworld/',
    country: 'Nhật Bản (Đài phát thanh truyền hình đối ngoại)',
    category: 'jp_broadcaster',
    categoryNameVi: 'Đài Truyền hình & Hãng tin Quốc gia Nhật Bản',
    badge: 'NHK World',
    descriptionVi: 'Kênh truyền thông đối ngoại toàn cầu của NHK, chia sẻ công nghệ phòng chống thiên tai và văn hóa Nhật.'
  },
  kyodo_news: {
    id: 'kyodo_news',
    name: '共同通信社 (Kyodo News)',
    nameJa: '一般社団法人 共同通信社',
    url: 'https://nordot.app/kyodonews',
    country: 'Nhật Bản (Hãng thông tấn xã số 1 Nhật Bản)',
    category: 'jp_broadcaster',
    categoryNameVi: 'Đài Truyền hình & Hãng tin Quốc gia Nhật Bản',
    badge: 'Kyodo News',
    descriptionVi: 'Hãng thông tấn độc lập hàng đầu Nhật Bản, nguồn cấp tin chính thức cho hàng trăm cơ quan báo chí.'
  },
  jiji_press: {
    id: 'jiji_press',
    name: '時事通信社 (Jiji Press)',
    nameJa: '株式会社 時事通信社',
    url: 'https://www.jiji.com/',
    country: 'Nhật Bản (Hãng thông tấn chuyên đề kinh tế chính trị)',
    category: 'jp_broadcaster',
    categoryNameVi: 'Đài Truyền hình & Hãng tin Quốc gia Nhật Bản',
    badge: 'Jiji Press',
    descriptionVi: 'Hãng thông tấn chuyên sâu về tin tức thị trường chứng khoán, chính phủ, ngoại giao và tài chính công.'
  },

  // 3. Ngũ đại Nhật báo & Báo chí Chính luận Hàng đầu Nhật Bản
  nikkei: {
    id: 'nikkei',
    name: '日本経済新聞 (Nikkei)',
    nameJa: '日本経済新聞 (日経)',
    url: 'https://www.nikkei.com/',
    country: 'Nhật Bản (Nhật báo kinh tế hàng đầu châu Á)',
    category: 'jp_national_press',
    categoryNameVi: 'Ngũ đại Nhật báo Chính luận Nhật Bản',
    badge: 'Nikkei',
    descriptionVi: 'Nhật báo tài chính số 1 Nhật Bản, phân tích thị trường chứng khoán Tokyo, chỉ số Nikkei 225 và công nghệ.'
  },
  asahi: {
    id: 'asahi',
    name: '朝日新聞 (Asahi Shimbun)',
    nameJa: '朝日新聞デジタル',
    url: 'https://www.asahi.com/',
    country: 'Nhật Bản (Nhật báo tự do uy tín toàn quốc)',
    category: 'jp_national_press',
    categoryNameVi: 'Ngũ đại Nhật báo Chính luận Nhật Bản',
    badge: 'Asahi',
    descriptionVi: 'Nhật báo có truyền thống văn phong sắc bén, phóng sự điều tra và góc nhìn đa chiều về giáo dục xã hội.'
  },
  mainichi: {
    id: 'mainichi',
    name: '毎日新聞 (Mainichi Shimbun)',
    nameJa: '毎日新聞',
    url: 'https://mainichi.jp/',
    country: 'Nhật Bản (Nhật báo lâu đời nhất Nhật Bản, từ 1872)',
    category: 'jp_national_press',
    categoryNameVi: 'Ngũ đại Nhật báo Chính luận Nhật Bản',
    badge: 'Mainichi',
    descriptionVi: 'Tờ báo có lịch sử lâu đời nhất Nhật Bản, giải thưởng báo chí danh giá và phân tích chính sách dân sinh.'
  },
  yomiuri: {
    id: 'yomiuri',
    name: '読売新聞 (Yomiuri Shimbun)',
    nameJa: '読売新聞オンライン',
    url: 'https://www.yomiuri.co.jp/',
    country: 'Nhật Bản (Nhật báo phát hành số 1 thế giới)',
    category: 'jp_national_press',
    categoryNameVi: 'Ngũ đại Nhật báo Chính luận Nhật Bản',
    badge: 'Yomiuri',
    descriptionVi: 'Nhật báo có lượng ấn bản phát hành hàng ngày lớn nhất thế giới, tin tức an ninh quốc phòng và đối ngoại.'
  },
  sankei: {
    id: 'sankei',
    name: '産経新聞 (Sankei Shimbun)',
    nameJa: '産経ニュース',
    url: 'https://www.sankei.com/',
    country: 'Nhật Bản (Nhật báo chính luận quốc gia uy tín)',
    category: 'jp_national_press',
    categoryNameVi: 'Ngũ đại Nhật báo Chính luận Nhật Bản',
    badge: 'Sankei',
    descriptionVi: 'Nhật báo lập trường vững chắc, chuyên sâu về công nghệ chiến lược, an ninh chuỗi cung ứng và vũ trụ JAXA.'
  },
  tokyo_shimbun: {
    id: 'tokyo_shimbun',
    name: '東京新聞 (Tokyo Shimbun / Chunichi)',
    nameJa: '東京新聞 TOKYO Web',
    url: 'https://www.tokyo-np.co.jp/',
    country: 'Nhật Bản (Nhật báo thủ đô Tokyo)',
    category: 'jp_national_press',
    categoryNameVi: 'Ngũ đại Nhật báo Chính luận Nhật Bản',
    badge: 'Tokyo Shimbun',
    descriptionVi: 'Tiếng nói của vùng thủ đô Kanto và miền Trung Chubu, bám sát các vấn đề đời sống cư dân và môi trường.'
  },
  japan_times: {
    id: 'japan_times',
    name: 'The Japan Times (ジャパンタイムズ)',
    nameJa: 'ジャパンタイムズ (The Japan Times)',
    url: 'https://www.japantimes.co.jp/',
    country: 'Nhật Bản (Nhật báo độc lập tiếng Anh thành lập 1897)',
    category: 'jp_national_press',
    categoryNameVi: 'Ngũ đại Nhật báo Chính luận Nhật Bản',
    badge: 'Japan Times',
    descriptionVi: 'Nhật báo độc lập danh giá nhất Nhật Bản bằng tiếng Anh, phân tích chính sách xã hội và xu hướng toàn cầu.'
  },

  // 4. Tạp chí Kinh tế, Tài chính, Khoa học & Công nghệ Nhật Bản
  toyo_keizai: {
    id: 'toyo_keizai',
    name: '東洋経済オンライン (Toyo Keizai Online)',
    nameJa: '東洋経済新報社',
    url: 'https://toyokeizai.net/',
    country: 'Nhật Bản (Tạp chí kinh tế - kinh doanh hàng đầu)',
    category: 'jp_business_tech',
    categoryNameVi: 'Kinh tế, Tài chính & Công nghệ Nhật Bản',
    badge: 'Toyo Keizai',
    descriptionVi: 'Tạp chí phân tích kinh tế kinh doanh sâu sắc, chiến lược nhân sự, quản trị doanh nghiệp và việc làm.'
  },
  diamond_online: {
    id: 'diamond_online',
    name: 'ダイヤモンド・オンライン (Diamond Online)',
    nameJa: 'DIAMOND online',
    url: 'https://diamond.jp/',
    country: 'Nhật Bản (Tạp chí kinh doanh danh tiếng Diamond)',
    category: 'jp_business_tech',
    categoryNameVi: 'Kinh tế, Tài chính & Công nghệ Nhật Bản',
    badge: 'Diamond Online',
    descriptionVi: 'Chuyên trang tư duy lãnh đạo, phân tích các tập đoàn lớn Toyota, Sony, SoftBank và chiến lược tài chính.'
  },
  nikkei_business: {
    id: 'nikkei_business',
    name: '日経ビジネス (Nikkei Business)',
    nameJa: '日経ビジネス電子版',
    url: 'https://business.nikkei.com/',
    country: 'Nhật Bản (Tuần báo kinh doanh uy tín của Nikkei)',
    category: 'jp_business_tech',
    categoryNameVi: 'Kinh tế, Tài chính & Công nghệ Nhật Bản',
    badge: 'Nikkei Business',
    descriptionVi: 'Tạp chí chiến lược dành cho nhà quản lý, phóng sự chuyên sâu về thị trường công nghệ và nhân lực toàn cầu.'
  },
  itmedia: {
    id: 'itmedia',
    name: 'ITmedia ニュース (Tin Công nghệ & AI Nhật Bản)',
    nameJa: 'ITmedia NEWS',
    url: 'https://www.itmedia.co.jp/news/',
    country: 'Nhật Bản (Cổng tin tức CNTT số 1 Nhật Bản)',
    category: 'jp_business_tech',
    categoryNameVi: 'Kinh tế, Tài chính & Công nghệ Nhật Bản',
    badge: 'ITmedia',
    descriptionVi: 'Cập nhật tin tức công nghệ bán dẫn, trí tuệ nhân tạo Generative AI, xe điện EV và an ninh mạng tại Nhật.'
  },
  pr_times: {
    id: 'pr_times',
    name: 'PR TIMES (Thông cáo Báo chí Doanh nghiệp Nhật)',
    nameJa: 'プレスリリース配信 PR TIMES',
    url: 'https://prtimes.jp/',
    country: 'Nhật Bản (Nền tảng thông cáo báo chí số 1 Nhật Bản)',
    category: 'jp_business_tech',
    categoryNameVi: 'Kinh tế, Tài chính & Công nghệ Nhật Bản',
    badge: 'PR Times',
    descriptionVi: 'Nguồn phát hành thông cáo báo chí chính thống của các công ty niêm yết, sản phẩm mới và sự kiện kinh doanh.'
  },
  chunichi: {
    id: 'chunichi',
    name: '中日新聞 (Chunichi Shimbun)',
    nameJa: '中日新聞 (Chunichi)',
    url: 'https://www.chunichi.co.jp/',
    country: 'Nhật Bản (Nhật báo lớn nhất miền Trung Nhật Bản)',
    category: 'jp_business_tech',
    categoryNameVi: 'Kinh tế, Tài chính & Công nghệ Nhật Bản',
    badge: 'Chunichi',
    descriptionVi: 'Nhật báo trụ cột vùng công nghiệp Chubu (Nagoya, Aichi), cái nôi công nghiệp chế tạo ô tô và robot Nhật Bản.'
  },
  nishinippon: {
    id: 'nishinippon',
    name: '西日本新聞 (Nishinippon Shimbun)',
    nameJa: '西日本新聞me (Nishinippon)',
    url: 'https://www.nishinippon.co.jp/',
    country: 'Nhật Bản (Nhật báo hàng đầu đảo Kyushu)',
    category: 'jp_business_tech',
    categoryNameVi: 'Kinh tế, Tài chính & Công nghệ Nhật Bản',
    badge: 'Nishinippon',
    descriptionVi: 'Báo chí hàng đầu khu vực Kyushu - "Thung lũng Silicon bán dẫn" của Nhật Bản với đại tổ hợp TSMC Kumamoto.'
  },
  hokkaido_np: {
    id: 'hokkaido_np',
    name: '北海道新聞 (Hokkaido Shimbun)',
    nameJa: '北海道新聞 どうしん電子版',
    url: 'https://www.hokkaido-np.co.jp/',
    country: 'Nhật Bản (Nhật báo lớn nhất miền Bắc Nhật Bản)',
    category: 'jp_business_tech',
    categoryNameVi: 'Kinh tế, Tài chính & Công nghệ Nhật Bản',
    badge: 'Hokkaido Shimbun',
    descriptionVi: 'Nhật báo lớn nhất vùng Hokkaido, bao quát nông sản cao cấp, sinh thái du lịch tuyết và chuyển dịch năng lượng xanh.'
  },
  nikkan_kogyo: {
    id: 'nikkan_kogyo',
    name: '日刊工業新聞 (Nikkan Kogyo Shimbun)',
    nameJa: '日刊工業新聞 (The Nikkan Kogyo Shimbun)',
    url: 'https://www.nikkan.co.jp/',
    country: 'Nhật Bản (Nhật báo công nghiệp và chế tạo máy hàng đầu)',
    category: 'jp_business_tech',
    categoryNameVi: 'Kinh tế, Tài chính & Công nghệ Nhật Bản',
    badge: 'Nikkan Kogyo',
    descriptionVi: 'Nhật báo chuyên ngành công nghiệp nặng, công nghệ vật liệu mới, bán dẫn, cơ khí chính xác và Monozukuri.'
  },

  // 5. Hãng Thông tấn & Báo chí Quốc tế tiếng Nhật
  reuters_japan: {
    id: 'reuters_japan',
    name: 'ロイター通信 日本語版 (Reuters Japan)',
    nameJa: 'ロイター (Reuters Japan)',
    url: 'https://jp.reuters.com/',
    country: 'Quốc tế (Hãng thông tấn Reuters ban tiếng Nhật)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'Reuters Japan',
    descriptionVi: 'Bản tin tài chính toàn cầu, tỷ giá hối đoái Yên Nhật, giá dầu và kinh tế thế giới bằng tiếng Nhật chuẩn mực.'
  },
  bloomberg_japan: {
    id: 'bloomberg_japan',
    name: 'ブルームバーグ 日本語版 (Bloomberg Japan)',
    nameJa: 'Bloomberg Japan',
    url: 'https://www.bloomberg.co.jp/',
    country: 'Quốc tế (Bloomberg L.P. ban tiếng Nhật)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'Bloomberg Japan',
    descriptionVi: 'Dữ liệu tài chính, phân tích thị trường trái phiếu, chứng khoán và quyết sách của Ngân hàng Trung ương BOJ.'
  },
  bbc_japan: {
    id: 'bbc_japan',
    name: 'BBCニュース 日本語 (BBC News Japan)',
    nameJa: 'BBC ニュース 日本語',
    url: 'https://www.bbc.com/japanese',
    country: 'Quốc tế (Đài truyền hình Hoàng gia Anh BBC tiếng Nhật)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'BBC Japan',
    descriptionVi: 'Thời sự thế giới khách quan, phóng sự tài liệu chuyên sâu với câu văn tiếng Nhật tinh gọn, chuẩn mực.'
  },
  cnn_japan: {
    id: 'cnn_japan',
    name: 'CNN.co.jp (CNN tiếng Nhật)',
    nameJa: 'CNN.co.jp',
    url: 'https://www.cnn.co.jp/',
    country: 'Quốc tế (Hãng truyền hình tin tức CNN Mỹ tiếng Nhật)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'CNN Japan',
    descriptionVi: 'Tin tức thời sự nóng bỏng, khám phá khoa học vũ trụ và sự kiện quốc tế qua lăng kính truyền thông Mỹ.'
  },
  afpbb_news: {
    id: 'afpbb_news',
    name: 'AFPBB News (Hãng thông tấn AFP tiếng Nhật)',
    nameJa: 'AFPBB News (フランス通信社)',
    url: 'https://www.afpbb.com/',
    country: 'Quốc tế (Agence France-Presse tiếng Nhật)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'AFPBB News',
    descriptionVi: 'Ảnh báo chí đỉnh cao và tin bài thời sự quốc tế từ hãng thông tấn lâu đời nhất thế giới AFP.'
  },
  forbes_japan: {
    id: 'forbes_japan',
    name: 'Forbes JAPAN (Tạp chí Forbes Nhật Bản)',
    nameJa: 'フォーブス ジャパン (Forbes JAPAN)',
    url: 'https://forbesjapan.com/',
    country: 'Quốc tế (Forbes Media ban tiếng Nhật)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'Forbes Japan',
    descriptionVi: 'Chân dung các tỷ phú, nhà khởi nghiệp tiên phong, đổi mới sáng tạo và triết lý kinh doanh nhân văn.'
  },
  courrier_japon: {
    id: 'courrier_japon',
    name: 'クーリエ・ジャポン (Courrier Japon)',
    nameJa: 'COURRiER Japon (講談社)',
    url: 'https://courrier.jp/',
    country: 'Quốc tế (Tạp chí tuyển chọn bài báo thế giới của Kodansha)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'Courrier Japon',
    descriptionVi: 'Tuyển dịch những bài phóng sự và tiểu luận sâu sắc từ các tờ báo lớn The New York Times, Le Monde sang tiếng Nhật.'
  },
  ap_news: {
    id: 'ap_news',
    name: 'AP通信 日本語・国際 (Associated Press)',
    nameJa: 'AP通信 (Associated Press)',
    url: 'https://apnews.com/',
    country: 'Quốc tế (Hãng thông tấn AP - Hoa Kỳ)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'AP News',
    descriptionVi: 'Hãng thông tấn độc lập lâu đời nhất Hoa Kỳ và toàn cầu, nguồn tin gốc khách quan được tiếp sóng toàn thế giới.'
  },
  wsj_japan: {
    id: 'wsj_japan',
    name: 'ウォール・ストリート・ジャーナル 日本版 (WSJ Japan)',
    nameJa: 'ウォール・ストリート・ジャーナル 日本版',
    url: 'https://jp.wsj.com/',
    country: 'Quốc tế (The Wall Street Journal ban tiếng Nhật)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'WSJ Japan',
    descriptionVi: 'Nhật báo tài chính số 1 phố Wall bằng tiếng Nhật, phân tích thị trường chứng khoán Mỹ, chính sách Fed và kinh tế toàn cầu.'
  },
  yonhap_japan: {
    id: 'yonhap_japan',
    name: '聯合ニュース 日本語版 (Yonhap News Japan)',
    nameJa: '聯合ニュース 日本語版',
    url: 'https://jp.yna.co.kr/',
    country: 'Quốc tế (Hãng thông tấn Quốc gia Hàn Quốc)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'Yonhap Japan',
    descriptionVi: 'Hãng thông tấn nhà nước Hàn Quốc ban tiếng Nhật, thời sự kinh tế Đông Á, công nghệ chip và giao lưu văn hóa.'
  },
  dw_japan: {
    id: 'dw_japan',
    name: 'ドイチェ・ヴェレ 日本語 (Deutsche Welle Japan)',
    nameJa: 'ドイツ国際放送 (Deutsche Welle)',
    url: 'https://www.dw.com/ja/',
    country: 'Quốc tế (Đài phát thanh truyền hình Quốc tế Đức)',
    category: 'global_media_jp',
    categoryNameVi: 'Báo chí & Hãng tin Quốc tế tiếng Nhật',
    badge: 'DW Japan',
    descriptionVi: 'Đài đối ngoại quốc gia Đức, phân tích chuyển dịch năng lượng xanh châu Âu, kinh tế EU và xã hội văn minh.'
  },

  // 6. Cổng tin tức & Cẩm nang Văn hóa, Du lịch, Ẩm thực
  yahoo_news: {
    id: 'yahoo_news',
    name: 'Yahoo! JAPAN ニュース',
    nameJa: 'ヤフーニュース (Yahoo! JAPAN)',
    url: 'https://news.yahoo.co.jp/',
    country: 'Nhật Bản (Cổng tin tức tổng hợp lớn nhất Nhật Bản)',
    category: 'culture_lifestyle',
    categoryNameVi: 'Cẩm nang Văn hóa, Đời sống & Du lịch',
    badge: 'Yahoo! Japan',
    descriptionVi: 'Cổng thông tin tổng hợp truy cập nhiều nhất Nhật Bản, tổng hòa tin tức từ hàng trăm tòa soạn uy tín.'
  },
  nippon_com: {
    id: 'nippon_com',
    name: 'Nippon.com (Nippon Communications Foundation)',
    nameJa: 'ニッポンドットコム (nippon.com)',
    url: 'https://www.nippon.com/ja/',
    country: 'Nhật Bản (Tổ chức thông tin đối ngoại chuyên sâu)',
    category: 'culture_lifestyle',
    categoryNameVi: 'Cẩm nang Văn hóa, Đời sống & Du lịch',
    badge: 'Nippon.com',
    descriptionVi: 'Tổ chức nghiên cứu, văn hóa và phân tích chính sách đa ngôn ngữ, khắc họa chiều sâu tâm hồn Nhật Bản.'
  },
  kilala: {
    id: 'kilala',
    name: 'Cẩm nang Kilala Nhật Bản',
    nameJa: 'キララ 日本カルチャーガイド',
    url: 'https://kilala.vn/cam-nang-nhat-ban.html',
    country: 'Việt Nam & Nhật Bản (Tạp chí phong cách sống Nhật)',
    category: 'culture_lifestyle',
    categoryNameVi: 'Cẩm nang Văn hóa, Đời sống & Du lịch',
    badge: 'Kilala',
    descriptionVi: 'Cẩm nang văn hóa, phong cách sống & mỹ học Nhật Bản tao nhã: Ikigai, Wabi-sabi, trà đạo, kimono và lễ hội.'
  },
  tsunagu_japan: {
    id: 'tsunagu_japan',
    name: 'Tsunagu Japan (Connecting to Japan)',
    nameJa: 'ツナグジャパン (TSUNAGU JAPAN)',
    url: 'https://www.tsunagujapan.com/vi/',
    country: 'Nhật Bản (Cẩm nang du lịch thực địa hàng đầu)',
    category: 'culture_lifestyle',
    categoryNameVi: 'Cẩm nang Văn hóa, Đời sống & Du lịch',
    badge: 'Tsunagu Japan',
    descriptionVi: 'Cẩm nang du lịch và trải nghiệm thực địa chuyên sâu, dẫn dắt khám phá danh thắng, làng nghề và ẩm thực.'
  },
  locobee: {
    id: 'locobee',
    name: 'LocoBee — Thông tin Nhật Bản cho người Việt',
    nameJa: 'ロコビー (LocoBee 日本情報)',
    url: 'https://locobee.com/',
    country: 'Việt Nam & Nhật Bản (Đời sống người Việt tại Nhật)',
    category: 'culture_lifestyle',
    categoryNameVi: 'Cẩm nang Văn hóa, Đời sống & Du lịch',
    badge: 'LocoBee',
    descriptionVi: 'Thông tin đời sống, thuê nhà, việc làm, thủ tục hành chính và mẹo hòa nhập dành cho người Việt tại Nhật.'
  },
  japan_travel: {
    id: 'japan_travel',
    name: 'Japan Travel (JNTO Nhật Bản)',
    nameJa: '日本政府観光局 (JNTO)',
    url: 'https://www.japan.travel/vi/things-to-do/culture/',
    country: 'Nhật Bản (Cơ quan Xúc tiến Du lịch Quốc gia)',
    category: 'culture_lifestyle',
    categoryNameVi: 'Cẩm nang Văn hóa, Đời sống & Du lịch',
    badge: 'Japan Travel',
    descriptionVi: 'Cơ quan Xúc tiến Du lịch Quốc gia Nhật Bản, giới thiệu di sản văn hóa, danh lam thắng cảnh bốn mùa tuyệt sắc.'
  },
  taste_of_japan: {
    id: 'taste_of_japan',
    name: 'Taste of Japan — Ẩm thực & Nông sản Nhật',
    nameJa: '農林水産省 和食・日本の食文化',
    url: 'https://tasteofjapan.maff.go.jp/',
    country: 'Nhật Bản (Bộ Nông Lâm Thủy sản Nhật Bản MAFF)',
    category: 'culture_lifestyle',
    categoryNameVi: 'Cẩm nang Văn hóa, Đời sống & Du lịch',
    badge: 'Taste of Japan',
    descriptionVi: 'Dự án chính thức của Bộ Nông Lâm Thủy sản Nhật Bản, tôn vinh nghệ thuật ẩm thực Washoku và nguyên liệu Wagyu.'
  },

  // 7. Học liệu Biên soạn Sư phạm & AI
  editorial_sample: {
    id: 'editorial_sample',
    name: 'Ban biên tập Sư phạm Nihongo News',
    nameJa: '日本語ニュース 編集部',
    url: '#',
    country: 'Biên soạn độc quyền dành cho người Việt',
    category: 'educational_ai',
    categoryNameVi: 'Học liệu Biên soạn & AI',
    badge: 'Biên soạn',
    descriptionVi: 'Đội ngũ giảng viên tiếng Nhật chuyên dạy cho người Việt chọn lọc, giải nghĩa âm Hán Việt và cấu trúc câu.'
  },
  ai_generated: {
    id: 'ai_generated',
    name: 'Hệ thống luyện tập AI (AI Sensei)',
    nameJa: 'AI 先生・学習システム',
    url: '#',
    country: 'AI Sư phạm Báo chí',
    category: 'educational_ai',
    categoryNameVi: 'Học liệu Biên soạn & AI',
    badge: 'AI Sensei',
    descriptionVi: 'Hệ thống AI Sensei tự động biên soạn theo chuẩn văn phong báo chí từng tòa soạn và trình độ JLPT mong muốn.'
  }
};

export const ALL_TOPICS: TopicCategory[] = [
  'Kinh tế & Tài chính',
  'Văn hóa & Lễ hội',
  'Xã hội & Đời sống',
  'Môi trường & Thiên nhiên',
  'Thời sự & Chính trị',
  'Giải trí & Nghệ thuật',
  'Thể thao',
  'Công nghệ & Xe',
  'Sức khỏe & Làm đẹp',
  'Ẩm thực & Taste of Japan',
  'Du lịch & Trải nghiệm',
  'Triết lý sống & Góc nhìn'
];

interface TopicTemplate {
  title: string;
  titleVi: string;
  summary: string;
  jlpt: JLPTLevel;
  sourceType: SourceType;
  keywords: string[];
  vocabWord: string;
  vocabReading: string;
  vocabHanViet: string;
  vocabPos: string;
  vocabMeaning: string;
  grammarPattern: string;
  grammarMeaning: string;
}

const TOPIC_PRESETS: Record<string, TopicTemplate[]> = {
  'Kinh tế & Tài chính': [
    {
      title: '日本銀行の利上げ決定と金融市場への波及効果',
      titleVi: 'Quyết định tăng lãi suất của Ngân hàng Trung ương Nhật Bản và hiệu ứng lan tỏa lên thị trường tài chính',
      summary: 'Thống đốc BOJ phân tích lộ trình bình thường hóa tiền tệ trong bối cảnh tiền lương và giá cả tăng trưởng đồng nhịp.',
      jlpt: 'N1',
      sourceType: 'nikkei',
      keywords: ['日銀', '利上げ', '金融市場', '為替'],
      vocabWord: '波及',
      vocabReading: 'はきゅう',
      vocabHanViet: 'BA CẬP',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Lan tỏa, tác động dây chuyền',
      grammarPattern: '〜を踏まえて',
      grammarMeaning: 'Dựa trên cơ sở...'
    },
    {
      title: '東京株式市場：新NISAの普及で個人投資家の買いが急増',
      titleVi: 'Thị trường Chứng khoán Tokyo: Làn sóng mua vào của nhà đầu tư cá nhân tăng vọt nhờ chương trình NISA mới',
      summary: 'Chính sách miễn thuế đầu tư dài hạn mới thúc đẩy người dân chuyển tiền gửi tiết kiệm sang cổ phiếu và quỹ chỉ số.',
      jlpt: 'N2',
      sourceType: 'nikkei',
      keywords: ['新NISA', '株式市場', '個人投資家', '資産形成'],
      vocabWord: '資産形成',
      vocabReading: 'しさんけいせい',
      vocabHanViet: 'TƯ SẢN HÌNH THÀNH',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Tích lũy và phát triển tài sản cá nhân',
      grammarPattern: '〜をきっかけに',
      grammarMeaning: 'Nhân cơ hội / Khởi nguồn từ việc...'
    },
    {
      title: '日越貿易総額が過去最高を更新、裾野産業の連携強化へ',
      titleVi: 'Kim ngạch thương mại Việt - Nhật đạt kỷ lục mới, tăng cường liên kết công nghiệp phụ trợ',
      summary: 'Các tập đoàn bán lẻ và sản xuất Nhật Bản đẩy mạnh chuỗi cung ứng chiến lược tại thị trường Việt Nam.',
      jlpt: 'N3',
      sourceType: 'vov_world',
      keywords: ['貿易', 'サプライチェーン', '日越関係'],
      vocabWord: '連携',
      vocabReading: 'れんけい',
      vocabHanViet: 'LIÊN HUYÊNH',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Liên kết, phối hợp chặt chẽ',
      grammarPattern: '〜に伴って',
      grammarMeaning: 'Đi đôi với...'
    },
    {
      title: 'ベトナム通信社（VNA）：日本企業の対越直接投資が拡大、ハイテク産業へシフト',
      titleVi: 'Thông tấn xã Việt Nam (VNA Net): Vốn FDI của doanh nghiệp Nhật Bản vào Việt Nam tăng trưởng, chuyển dịch mạnh sang công nghệ cao',
      summary: 'Bản tin kinh tế từ VNA Net phân tích dòng vốn đầu tư từ Tokyo và Osaka đổ vào các khu công nghệ bán dẫn tại Đà Nẵng và Bắc Ninh.',
      jlpt: 'N2',
      sourceType: 'vna_net',
      keywords: ['VNA', '対越投資', 'ハイテク', '半導体'],
      vocabWord: '誘致',
      vocabReading: 'ゆうち',
      vocabHanViet: 'DỤ TRÍ',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Thu hút đầu tư, mời gọi dự án',
      grammarPattern: '〜をめぐって',
      grammarMeaning: 'Xoay quanh vấn đề...'
    },
    {
      title: '東洋経済：日本企業の賃上げ継続と脱デフレに向けた構造改革',
      titleVi: 'Toyo Keizai Online: Xu hướng tăng lương liên tiếp của doanh nghiệp Nhật và cải cách cơ cấu thoát giảm phát',
      summary: 'Phân tích chuyên sâu từ tạp chí Toyo Keizai về sức mua tiêu dùng nội địa và bài toán năng suất lao động trong kỷ nguyên số.',
      jlpt: 'N1',
      sourceType: 'toyo_keizai',
      keywords: ['東洋経済', '賃上げ', '脱デフレ', '構造改革'],
      vocabWord: '構造改革',
      vocabReading: 'こうぞうかいかく',
      vocabHanViet: 'CẤU TẠO CẢI CÁCH',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Cải cách cơ cấu kinh tế',
      grammarPattern: '〜のみならず',
      grammarMeaning: 'Không chỉ... mà còn...'
    },
    {
      title: '日本の電子決済サービスと手数料引き下げの競争',
      titleVi: 'Các dịch vụ thanh toán điện tử tại Nhật và cuộc đua hạ phí giao dịch',
      summary: 'Mã QR và thẻ không tiếp xúc trở thành thói quen chi tiêu hàng ngày tại các siêu thị và cửa hàng tiện lợi.',
      jlpt: 'N4',
      sourceType: 'yahoo_news',
      keywords: ['電子決済', 'QRコード', '手数料'],
      vocabWord: '手数料',
      vocabReading: 'てすうりょう',
      vocabHanViet: 'THỦ SỐ LIỆU',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Phí dịch vụ, hoa hồng giao dịch',
      grammarPattern: '〜ようになります',
      grammarMeaning: 'Trở nên có thể làm gì...'
    },
    {
      title: 'お金の使い分けと日本の「お年玉」の習慣',
      titleVi: 'Cách quản lý tiền tiêu vặt và phong tục tiền mừng tuổi Otoshidama ở Nhật',
      summary: 'Dịp năm mới, trẻ em Nhật Bản nhận phong bao tiền mừng tuổi và được bố mẹ hướng dẫn gửi tiết kiệm ngân hàng.',
      jlpt: 'N5',
      sourceType: 'nhk_easy',
      keywords: ['お年玉', 'お正月', '貯金'],
      vocabWord: '貯金',
      vocabReading: 'ちょきん',
      vocabHanViet: 'TRỮ KIM',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Tiết kiệm tiền',
      grammarPattern: '〜たほうがいい',
      grammarMeaning: 'Nên làm gì...'
    }
  ],
  'Văn hóa & Lễ hội': [
    {
      title: '京都の祇園祭と千年続く山鉾巡行の伝統美',
      titleVi: 'Lễ hội Gion Matsuri ở Kyoto và vẻ đẹp truyền thống của lễ rước kiệu Yamaboko nghìn năm tuổi',
      summary: 'Cẩm nang Kilala phân tích chiều sâu văn hóa và bàn tay khéo léo của các nghệ nhân gìn giữ báu vật quốc gia.',
      jlpt: 'N2',
      sourceType: 'kilala',
      keywords: ['祇園祭', '山鉾巡行', '京都', '伝統工芸'],
      vocabWord: '巡行',
      vocabReading: 'じゅんこう',
      vocabHanViet: 'TUẦN HÀNH',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Diễu hành, rước kiệu tuần tra',
      grammarPattern: '〜にかけては',
      grammarMeaning: 'Riêng về mặt...'
    },
    {
      title: '日本の茶道における「一期一会」の心と客をもてなす礼儀',
      titleVi: 'Tinh thần "Nhất kỳ nhất hội" (Ichigo Ichie) trong Trà đạo và đạo hiếu khách của người Nhật',
      summary: 'Mỗi buổi thưởng trà được xem như duyên hội ngộ duy nhất trong đời người, đòi hỏi sự trân trọng tuyệt đối.',
      jlpt: 'N3',
      sourceType: 'japan_travel',
      keywords: ['茶道', '一期一会', 'おもてなし', '抹茶'],
      vocabWord: 'もてなす',
      vocabReading: 'もてなす',
      vocabHanViet: 'ĐÃI',
      vocabPos: 'Động từ nhóm 1',
      vocabMeaning: 'Tiếp đón, thết đãi nồng hậu',
      grammarPattern: '〜を通じて',
      grammarMeaning: 'Thông qua...'
    },
    {
      title: '青森ねぶた祭：夜空を焦がす巨大武者人形の熱気と踊り手「ハネト」',
      titleVi: 'Lễ hội Aomori Nebuta: Sức nóng của những bức tượng võ sĩ khổng lồ rực sáng bầu trời đêm',
      summary: 'Tsunagu Japan giới thiệu vũ điệu cuồng nhiệt của các vũ công Haneto bên lồng đèn khổng lồ làm từ giấy washi.',
      jlpt: 'N3',
      sourceType: 'tsunagu_japan',
      keywords: ['ねぶた祭', '青森', '祭り', '武者人形'],
      vocabWord: '活気',
      vocabReading: 'かっき',
      vocabHanViet: 'HOẠT KHÍ',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Sức sống, bầu không khí sôi động',
      grammarPattern: '〜にわたって',
      grammarMeaning: 'Trải suốt / Trong suốt...'
    },
    {
      title: '日本の伝統的な着物と浴衣の正しい着方とマナー',
      titleVi: 'Cách mặc đúng chuẩn và phép tắc thanh lịch khi diện Kimono và Yukata',
      summary: 'Hướng dẫn từ LocoBee giúp bạn tự tin dạo phố ngắm pháo hoa mùa hè hay chụp ảnh mùa thu lá đỏ.',
      jlpt: 'N4',
      sourceType: 'locobee',
      keywords: ['着物', '浴衣', '夏祭り', '和服'],
      vocabWord: '着付け',
      vocabReading: 'きつけ',
      vocabHanViet: 'TRƯỚC PHÓ',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Nghệ thuật mặc Kimono chuẩn mực',
      grammarPattern: '〜前に',
      grammarMeaning: 'Trước khi làm gì...'
    },
    {
      title: '節分の豆まきと「鬼は外、福は内」の意味',
      titleVi: 'Tục tung đậu Setsubun và ý nghĩa câu chúc "Quỷ đuổi ra ngoài, Phúc đón vào trong"',
      summary: 'Vào ngày 3 tháng 2 hàng năm, các gia đình và ngôi đền Nhật Bản cùng tung đậu nành để xua đuổi tà khí.',
      jlpt: 'N5',
      sourceType: 'nhk_easy',
      keywords: ['節分', '豆まき', '福', '鬼'],
      vocabWord: '幸福',
      vocabReading: 'こうふく',
      vocabHanViet: 'HẠNH PHÚC',
      vocabPos: 'Danh từ / Tính từ đuôi な',
      vocabMeaning: 'Hạnh phúc, phúc lành',
      grammarPattern: '〜ながら',
      grammarMeaning: 'Vừa... vừa...'
    }
  ],
  'Xã hội & Đời sống': [
    {
      title: '外国人材の共生に向けた「育成就労制度」の創設と日本の未来',
      titleVi: 'Thành lập chế độ "Lao động đào tạo" (Ikusei Shuro) và tương lai xã hội đa văn hóa Nhật Bản',
      summary: 'Cải cách lớn thay thế chương trình thực tập sinh, cho phép chuyển việc linh hoạt và mở rộng con đường định cư lâu dài.',
      jlpt: 'N1',
      sourceType: 'mainichi',
      keywords: ['育成就労', '外国人材', '多文化共生', '技能実習'],
      vocabWord: '創設',
      vocabReading: 'そうせつ',
      vocabHanViet: 'SANG THIẾT',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Sáng lập, thiết lập chính sách mới',
      grammarPattern: '〜を皮切りに',
      grammarMeaning: 'Khởi đầu từ...'
    },
    {
      title: '在日ベトナム人コミュニティの成長と日本社会への貢献',
      titleVi: 'Sự lớn mạnh của cộng đồng người Việt tại Nhật và những đóng góp cho xã hội sở tại',
      summary: 'LocoBee tổng hợp các hoạt động tương thân tương ái, lễ hội Việt Nam tại Tokyo và giao lưu văn hóa hai nước.',
      jlpt: 'N2',
      sourceType: 'locobee',
      keywords: ['ベトナム人', 'コミュニティ', '日本社会', '交流'],
      vocabWord: '貢献',
      vocabReading: 'こうけん',
      vocabHanViet: 'CỐNG HIẾN',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Đóng góp, cống hiến',
      grammarPattern: '〜をはじめとする',
      grammarMeaning: 'Đầu tiên phải kể đến...'
    },
    {
      title: 'VTV Vietnam Today：日本で夢を追うベトナム人若手起業家たちの情熱と挑戦',
      titleVi: 'Vietnam Today (VTV): Khát vọng và hành trình khởi nghiệp của các bạn trẻ Việt Nam tại đất nước Mặt trời mọc',
      summary: 'Phóng sự đặc biệt của kênh Vietnam Today (VTV) khắc họa bản lĩnh của kỹ sư công nghệ và chủ chuỗi nhà hàng ẩm thực Việt.',
      jlpt: 'N2',
      sourceType: 'vietnam_today_vtv',
      keywords: ['VTV', 'Vietnam Today', '起業家', '若者', '挑戦'],
      vocabWord: '情熱',
      vocabReading: 'じょうねつ',
      vocabHanViet: 'TÌNH NHIỆT',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Nhiệt huyết, niềm đam mê cháy bỏng',
      grammarPattern: '〜にほかならない',
      grammarMeaning: 'Chính là / Không gì khác ngoài...'
    },
    {
      title: 'Tuoi Tre News：日越教育交流の架け橋となる留学生支援プロジェクトの広がり',
      titleVi: 'Tuổi Trẻ News: Các dự án học bổng và hỗ trợ du học sinh làm cầu nối hữu nghị giao lưu giáo dục Việt - Nhật',
      summary: 'Bài viết đối ngoại từ báo Tuổi Trẻ phân tích các chương trình đào tạo kỹ sư liên kết giữa Đại học Bách khoa và các trường Nhật Bản.',
      jlpt: 'N3',
      sourceType: 'tuoi_tre',
      keywords: ['Tuổi Trẻ', '留学生', '教育交流', '奨学金'],
      vocabWord: '架け橋',
      vocabReading: 'かけはし',
      vocabHanViet: 'GIÁ KIỀU',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Nhịp cầu nối, cầu nối gắn kết',
      grammarPattern: '〜をきっかけに',
      grammarMeaning: 'Nhân cơ hội / Bắt nguồn từ...'
    },
    {
      title: 'The Japan Times：少子高齢化が進む日本社会における外国人労働者の権利擁護',
      titleVi: 'The Japan Times: Bảo vệ quyền lợi người lao động nước ngoài trong bối cảnh già hóa dân số tại Nhật Bản',
      summary: 'Bài xã luận từ The Japan Times kêu gọi hoàn thiện hệ thống an sinh xã hội và xóa bỏ rào cản ngôn ngữ nơi công sở.',
      jlpt: 'N1',
      sourceType: 'japan_times',
      keywords: ['Japan Times', '少子高齢化', '労働環境', '人権'],
      vocabWord: '擁護',
      vocabReading: 'ようご',
      vocabHanViet: 'ỦNG HỘ',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Bảo vệ, bênh vực quyền lợi',
      grammarPattern: '〜を踏まえて',
      grammarMeaning: 'Dựa trên cơ sở...'
    },
    {
      title: '日本での部屋探しの注意点：礼金・敷金と賃貸契約の仕組み',
      titleVi: 'Cẩm nang thuê nhà ở Nhật: Tiền lễ (Reikin), tiền cọc (Shikikin) và thủ tục hợp đồng thuê nhà',
      summary: 'Những kinh nghiệm thực tế giúp người nước ngoài tránh bỡ ngỡ khi thuê căn hộ đầu tiên ở Tokyo hay Osaka.',
      jlpt: 'N3',
      sourceType: 'locobee',
      keywords: ['部屋探し', '敷金', '礼金', '賃貸契約'],
      vocabWord: '契約',
      vocabReading: 'けいやく',
      vocabHanViet: 'KHẾ ƯỚC',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Hợp đồng, cam kết pháp lý',
      grammarPattern: '〜なければならない',
      grammarMeaning: 'Bắt buộc phải...'
    },
    {
      title: '日本のゴミ出しルールとリサイクルマークの見分け方',
      titleVi: 'Quy tắc vứt rác tại Nhật và cách nhận biết các biểu tượng tái chế',
      summary: 'Phân loại đúng rác cháy được, rác không cháy, chai nhựa PET và hộp sữa giấy theo lịch của từng quận huyện.',
      jlpt: 'N4',
      sourceType: 'nhk_easy',
      keywords: ['ゴミ出し', 'リサイクル', '分別', '資源'],
      vocabWord: '資源',
      vocabReading: 'しげん',
      vocabHanViet: 'TƯ NGUYÊN',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Tài nguyên, đồ tái chế',
      grammarPattern: '〜てください',
      grammarMeaning: 'Xin hãy làm...'
    },
    {
      title: '日本のコンビニの便利な使い方と毎日のサービス',
      titleVi: 'Những tiện ích bất ngờ tại cửa hàng tiện lợi Nhật Bản trong cuộc sống thường ngày',
      summary: 'Gửi hàng chuyển phát bưu điện, thanh toán hóa đơn tiền điện nước, in ấn tài liệu chỉ trong vài phút.',
      jlpt: 'N5',
      sourceType: 'nhk_easy',
      keywords: ['コンビニ', '買い物', 'サービス'],
      vocabWord: '便利',
      vocabReading: 'べんり',
      vocabHanViet: 'TIỆN LỢI',
      vocabPos: 'Tính từ đuôi な',
      vocabMeaning: 'Thuận tiện, tiện dụng',
      grammarPattern: '〜ことができます',
      grammarMeaning: 'Có thể làm gì...'
    }
  ],
  'Môi trường & Thiên nhiên': [
    {
      title: '徳島県上勝町の「ゼロ・ウェイスト」宣言と世界が注目する循環型社会',
      titleVi: 'Tuyên ngôn "Không rác thải" của thị trấn Kamikatsu và mô hình kinh tế tuần hoàn kiểu mẫu của thế giới',
      summary: 'Thị trấn phân loại rác thành 45 danh mục chi tiết, tái chế gần 80% rác sinh hoạt một cách kỳ diệu.',
      jlpt: 'N1',
      sourceType: 'asahi',
      keywords: ['上勝町', 'ゼロ・ウェイスト', 'リサイクル', '循環型社会'],
      vocabWord: '循環',
      vocabReading: 'じゅんかん',
      vocabHanViet: 'TUẦN HOÀN',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Tuần hoàn, khép kín quy trình',
      grammarPattern: '〜にほかならない',
      grammarMeaning: 'Chính là / Không gì khác ngoài...'
    },
    {
      title: '日本の四季を告げる「二十四節気」と気候変動の影響',
      titleVi: '24 tiết khí báo hiệu bốn mùa tại Nhật và tác động của biến đổi khí hậu',
      summary: 'Kilala khắc họa vẻ đẹp thiên nhiên từ hoa tuyết tan đến tiếng ve sầu và những cảnh báo về sự ấm lên toàn cầu.',
      jlpt: 'N2',
      sourceType: 'kilala',
      keywords: ['二十四節気', '四季', '気候変動', '自然'],
      vocabWord: '変遷',
      vocabReading: 'へんせん',
      vocabHanViet: 'BIẾN THIÊN',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Sự biến đổi qua năm tháng',
      grammarPattern: '〜につれて',
      grammarMeaning: 'Càng... càng / Cùng với sự...'
    },
    {
      title: '屋久島の原生林と樹齢数千年の縄文杉が守る生態系',
      titleVi: 'Rừng nguyên sinh đảo Yakushima và hệ sinh thái được chở che bởi cây tuyết tùng Jomon Sugi nghìn tuổi',
      summary: 'Khu di sản thế giới truyền cảm hứng cho bộ phim hoạt hình Mononoke Hime của đạo diễn Hayao Miyazaki.',
      jlpt: 'N3',
      sourceType: 'japan_travel',
      keywords: ['屋久島', '縄文杉', '世界自然遺産', '生態系'],
      vocabWord: '原生林',
      vocabReading: 'げんせいりん',
      vocabHanViet: 'NGUYÊN SINH LÂM',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Rừng nguyên sinh cổ xưa',
      grammarPattern: '〜として知られる',
      grammarMeaning: 'Nổi tiếng như là...'
    },
    {
      title: 'プラスチック削減のためのエコバッグとマイボトルの普及',
      titleVi: 'Sự phổ biến của túi vải sinh thái và bình nước cá nhân để giảm thiểu đồ nhựa',
      summary: 'Người dân Nhật Bản hình thành thói quen từ chối túi nilon dùng một lần để bảo vệ đại dương.',
      jlpt: 'N4',
      sourceType: 'nhk_easy',
      keywords: ['エコバッグ', 'マイボトル', '海洋保護'],
      vocabWord: '削減',
      vocabReading: 'さくげん',
      vocabHanViet: 'TƯỚC GIẢM',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Cắt giảm số lượng',
      grammarPattern: '〜ようにする',
      grammarMeaning: 'Cố gắng tạo thói quen...'
    },
    {
      title: '春の桜と秋の紅葉：日本の美しい自然を楽しむ季節',
      titleVi: 'Hoa anh đào mùa xuân và lá đỏ mùa thu: Thưởng thức vẻ đẹp thiên nhiên Nhật Bản',
      summary: 'Người Nhật luôn mong ngóng từng mùa hoa nở và dành thời gian tản bộ bên gia đình dưới tán cây rực rỡ.',
      jlpt: 'N5',
      sourceType: 'nhk_easy',
      keywords: ['桜', '紅葉', '春', '秋', '自然'],
      vocabWord: '自然',
      vocabReading: 'しぜん',
      vocabHanViet: 'TỰ NHIÊN',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Thiên nhiên, tạo hóa',
      grammarPattern: '〜とき',
      grammarMeaning: 'Khi / Vào lúc...'
    }
  ],
  'Thời sự & Chính trị': [
    {
      title: '日越外交関係樹立50周年以降の包括的戦略的パートナーシップの深化',
      titleVi: 'Làm sâu sắc thêm quan hệ Đối tác Chiến lược Toàn diện Việt Nam - Nhật Bản',
      summary: 'Lãnh đạo cấp cao hai nước thảo luận các giải pháp thúc đẩy hợp tác an ninh chuỗi cung ứng và chuyển đổi xanh.',
      jlpt: 'N1',
      sourceType: 'vov_world',
      keywords: ['日越関係', '包括的戦略', '首脳会談', '外交'],
      vocabWord: '包括的',
      vocabReading: 'ほうかつてき',
      vocabHanViet: 'BAO QUÁT ĐÍCH',
      vocabPos: 'Tính từ đuôi な',
      vocabMeaning: 'Mang tính bao quát, toàn diện',
      grammarPattern: '〜をめぐって',
      grammarMeaning: 'Xoay quanh vấn đề...'
    },
    {
      title: '共同通信：日米首脳会談で確認されたインド太平洋地域の平和と安定の維持',
      titleVi: 'Kyodo News: Hội đàm Thượng đỉnh Nhật - Mỹ tái khẳng định duy trì hòa bình và ổn định khu vực Ấn Độ Dương - Thái Bình Dương',
      summary: 'Hãng thông tấn Kyodo phân tích các cam kết an ninh kinh tế, chuyển giao công nghệ bán dẫn và tự do hàng hải.',
      jlpt: 'N1',
      sourceType: 'kyodo_news',
      keywords: ['共同通信', '首脳会談', '安全保障', 'インド太平洋'],
      vocabWord: '維持',
      vocabReading: 'いじ',
      vocabHanViet: 'DUY TRÌ',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Gìn giữ, duy trì nguyên trạng',
      grammarPattern: '〜を踏まえ',
      grammarMeaning: 'Dựa trên cơ sở...'
    },
    {
      title: 'NHK WORLD-JAPAN：多言語ニュースで世界に発信する日本の防災技術と国際貢献',
      titleVi: 'NHK WORLD-JAPAN: Phát thanh đa ngôn ngữ truyền tải công nghệ phòng chống thiên tai và đóng góp quốc tế của Nhật Bản',
      summary: 'Bản tin NHK World giới thiệu hệ thống cảnh báo sớm sóng thần và kinh nghiệm ứng phó động đất cho cộng đồng toàn cầu.',
      jlpt: 'N2',
      sourceType: 'nhk_world',
      keywords: ['NHK World', '防災', '国際貢献', '早期警報'],
      vocabWord: '発信',
      vocabReading: 'はっしん',
      vocabHanViet: 'PHÁT TÍN',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Phát đi thông điệp, truyền thông rộng rãi',
      grammarPattern: '〜を通じて',
      grammarMeaning: 'Thông qua...'
    },
    {
      title: 'Báo Nhân Dân：ベトナムと日本の戦略的パートナーシップと地方都市間交流の加速',
      titleVi: 'Báo Nhân Dân Online: Đối tác chiến lược Việt Nam - Nhật Bản và sự bứt phá trong hợp tác giữa các địa phương',
      summary: 'Cơ quan ngôn luận Trung ương Báo Nhân Dân ghi nhận hơn 100 cặp quan hệ kết nghĩa địa phương giữa hai quốc gia.',
      jlpt: 'N2',
      sourceType: 'nhan_dan',
      keywords: ['Báo Nhân Dân', '戦略的パートナーシップ', '地方交流', '友好'],
      vocabWord: '加速',
      vocabReading: 'かそく',
      vocabHanViet: 'GIA TỐC',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Đẩy mạnh tốc độ, gia tốc',
      grammarPattern: '〜とともに',
      grammarMeaning: 'Cùng với...'
    },
    {
      title: '産経新聞：先端技術の安全保障と日本のサプライチェーン強靭化に向けた新法制',
      titleVi: 'Sankei Shimbun: An ninh công nghệ tiên tiến và khung pháp lý mới củng cố chuỗi cung ứng chiến lược',
      summary: 'Nhật báo Sankei phân tích chính sách bảo vệ dữ liệu nhạy cảm và phát triển ngành công nghiệp bán dẫn nội địa.',
      jlpt: 'N1',
      sourceType: 'sankei',
      keywords: ['産経新聞', '経済安保', 'サプライチェーン', '半導体'],
      vocabWord: '強靭化',
      vocabReading: 'きょうじんか',
      vocabHanViet: 'CƯỜNG NHẬN HÓA',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Tăng cường sức bền, kiên cố hóa',
      grammarPattern: '〜を契機として',
      grammarMeaning: 'Lấy mốc đó làm thời cơ...'
    },
    {
      title: '国会予算委員会での物価高対策と定額減税をめぐる論戦',
      titleVi: 'Tranh luận tại Ủy ban Ngân sách Quốc hội Nhật về các gói cứu trợ giá cả và giảm thuế',
      summary: 'Các đảng phái đối lập chất vấn Thủ tướng về hiệu quả của các gói trợ cấp năng lượng hỗ trợ người dân.',
      jlpt: 'N1',
      sourceType: 'yomiuri',
      keywords: ['国会', '予算委員会', '減税', '物価高'],
      vocabWord: '審議',
      vocabReading: 'しんぎ',
      vocabHanViet: 'THẨM NGHỊ',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Xem xét thảo luận tại nghị trường',
      grammarPattern: '〜にもかかわらず',
      grammarMeaning: 'Mặc dù...'
    },
    {
      title: '日本の選挙制度と若者の投票率向上に向けた自治体の工夫',
      titleVi: 'Hệ thống bầu cử Nhật Bản và những sáng kiến thu hút cử tri trẻ tuổi',
      summary: 'Đặt trạm bỏ phiếu tại trung tâm thương mại và đại học để người trẻ thuận tiện thực hiện quyền công dân.',
      jlpt: 'N2',
      sourceType: 'asahi',
      keywords: ['選挙', '投票率', '若者', '主権者教育'],
      vocabWord: '投票',
      vocabReading: 'とうひょう',
      vocabHanViet: 'ĐẦU PHIẾU',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Bỏ phiếu bầu cử',
      grammarPattern: '〜に向けて',
      grammarMeaning: 'Hướng về phía mục tiêu...'
    },
    {
      title: '日本の首相官邸の役割と内閣の仕組みについて',
      titleVi: 'Vai trò của Phủ Thủ tướng (Kantei) và cơ chế vận hành của Nội các Nhật Bản',
      summary: 'Bản tin NHK Easy giải thích cơ cấu điều hành quốc gia một cách rõ ràng và dễ tiếp thu cho người học sơ trung cấp.',
      jlpt: 'N3',
      sourceType: 'nhk_easy',
      keywords: ['首相官邸', '内閣', '大臣', '政治'],
      vocabWord: '内閣',
      vocabReading: 'ないかく',
      vocabHanViet: 'NỘI CÁC',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Nội các chính phủ',
      grammarPattern: '〜といわれている',
      grammarMeaning: 'Được cho là...'
    }
  ],
  'Giải trí & Nghệ thuật': [
    {
      title: 'スタジオジブリ美術館と宮崎駿監督が紡ぐ不朽の映画世界',
      titleVi: 'Bảo tàng Ghibli Mitaka và thế giới điện ảnh bất hủ do đạo diễn Hayao Miyazaki dệt nên',
      summary: 'Kilala đưa độc giả bước vào thánh đường nghệ thuật vẽ tay tinh xảo, nơi gìn giữ linh hồn của hoạt hình Nhật.',
      jlpt: 'N2',
      sourceType: 'kilala',
      keywords: ['スタジオジブリ', '宮崎駿', 'アニメ', '美術館'],
      vocabWord: '不朽',
      vocabReading: 'ふきゅう',
      vocabHanViet: 'BẤT HỦ',
      vocabPos: 'Danh từ / Tính từ đuôi の',
      vocabMeaning: 'Trường tồn, bất hủ theo thời gian',
      grammarPattern: '〜ならではの',
      grammarMeaning: 'Chỉ có ở / Độc đáo riêng có của...'
    },
    {
      title: '日本の漫画・アニメ産業の海外市場規模が過去最大を記録',
      titleVi: 'Quy mô thị trường quốc tế của ngành công nghiệp Manga và Anime Nhật Bản đạt đỉnh lịch sử',
      summary: 'Nền tảng streaming trực tuyến đưa One Piece, Jujutsu Kaisen đến hàng trăm triệu người hâm mộ khắp năm châu.',
      jlpt: 'N3',
      sourceType: 'yahoo_news',
      keywords: ['アニメ', '漫画', '海外市場', '配信'],
      vocabWord: '躍進',
      vocabReading: 'やくしん',
      vocabHanViet: 'DƯỢC TIẾN',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Bước tiến nhảy vọt',
      grammarPattern: '〜にわたって',
      grammarMeaning: 'Trải rộng khắp...'
    },
    {
      title: '歌舞伎（かぶき）の伝統美：隈取の化粧と舞台装置の秘密',
      titleVi: 'Vẻ đẹp sân khấu kịch Kabuki: Lớp hóa trang Kumadori và bí mật sân khấu quay linh hoạt',
      summary: 'Khám phá môn nghệ thuật diễn xướng độc đáo từ thời Edo do Tsunagu Japan giới thiệu chi tiết.',
      jlpt: 'N2',
      sourceType: 'tsunagu_japan',
      keywords: ['歌舞伎', '伝統芸能', '隈取', '江戸時代'],
      vocabWord: '伝承',
      vocabReading: 'でんしょう',
      vocabHanViet: 'TRUYỀN THỪA',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Lưu truyền, kế thừa văn hóa',
      grammarPattern: '〜を通じて',
      grammarMeaning: 'Thông qua...'
    },
    {
      title: '秋葉原のポップカルチャーとメイドカフェの最新トレンド',
      titleVi: 'Văn hóa Pop tại Akihabara và những xu hướng cà phê hầu gái (Maid Cafe) mới nhất',
      summary: 'LocoBee dẫn lối khám phá góc phố điện tử sầm uất ngập tràn mô hình figure và trò chơi điện tử gacha.',
      jlpt: 'N4',
      sourceType: 'locobee',
      keywords: ['秋葉原', 'ポップカルチャー', 'メイドカフェ'],
      vocabWord: '発信',
      vocabReading: 'はっしん',
      vocabHanViet: 'PHÁT TÍN',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Lan tỏa, truyền thông tin',
      grammarPattern: '〜だけでなく〜も',
      grammarMeaning: 'Không chỉ... mà còn...'
    }
  ],
  'Thể thao': [
    {
      title: '大谷翔平選手が前人未到の「50本塁打・50盗塁」を達成し全米に衝撃',
      titleVi: 'Siêu sao Ohtani Shohei lập kỳ tích vô tiền khoáng hậu "50 Homerun - 50 Cướp gôn" làm chấn động nước Mỹ',
      summary: 'Cầu thủ bóng chày Nhật Bản khẳng định vị thế huyền thoại thể thao thế giới với tinh thần tập luyện nghiêm cẩn.',
      jlpt: 'N2',
      sourceType: 'yahoo_news',
      keywords: ['大谷翔平', 'メジャーリーグ', 'ホームラン', '記録'],
      vocabWord: '前人未到',
      vocabReading: 'ぜんじんみとう',
      vocabHanViet: 'TIỀN NHÂN VỊ ĐÁO',
      vocabPos: 'Danh từ / Tính từ đuôi の',
      vocabMeaning: 'Kỷ lục chưa ai từng chạm tới',
      grammarPattern: '〜にほかならない',
      grammarMeaning: 'Chính là nhờ vào...'
    },
    {
      title: '大相撲の歴史と土俵に込められた神事としての厳粛な精神',
      titleVi: 'Lịch sử môn vật Sumo và tinh thần nghi lễ Thần đạo trang nghiêm trên sàn đấu Dohyo',
      summary: 'Mỗi cú rắc muối thanh tẩy và dậm chân Shiko đều mang ý nghĩa trừ tà cầu chúc mùa màng bội thu.',
      jlpt: 'N3',
      sourceType: 'japan_travel',
      keywords: ['相撲', '力士', '神事', '土俵'],
      vocabWord: '清める',
      vocabReading: 'きよめる',
      vocabHanViet: 'THANH',
      vocabPos: 'Động từ nhóm 2',
      vocabMeaning: 'Thanh tẩy, gột rửa trong sạch',
      grammarPattern: '〜ことに基づいて',
      grammarMeaning: 'Dựa trên việc...'
    },
    {
      title: '日本の部活動文化：高校野球「甲子園」が育む若者の青春と絆',
      titleVi: 'Văn hóa câu lạc bộ học đường: Giải bóng chày trung học Koshien nuôi dưỡng thanh xuân và tình đồng đội',
      summary: 'Mỗi mùa hè, hàng vạn khán giả đổ về sân vận động Koshien để cổ vũ những giọt nước mắt và nụ cười nhiệt huyết.',
      jlpt: 'N3',
      sourceType: 'asahi',
      keywords: ['甲子園', '高校野球', '部活動', '青春'],
      vocabWord: '青春',
      vocabReading: 'せいしゅん',
      vocabHanViet: 'THANH XUÂN',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Tuổi trẻ, thanh xuân',
      grammarPattern: '〜を胸に',
      grammarMeaning: 'Ghi khắc trong tim...'
    },
    {
      title: '健康のためのウォーキングと日本のラジオ体操の習慣',
      titleVi: 'Đi bộ rèn luyện sức khỏe và thói quen tập Thể dục Đài tiếng nói (Radio Taiso) ở Nhật',
      summary: 'Bài tập thể dục 3 phút mỗi sáng giúp khởi động xương khớp và gắn kết cộng đồng cư dân mọi lứa tuổi.',
      jlpt: 'N5',
      sourceType: 'nhk_easy',
      keywords: ['ラジオ体操', '健康', '運動', '朝'],
      vocabWord: '習慣',
      vocabReading: 'しゅうかん',
      vocabHanViet: 'TẬP QUÁN',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Thói quen sinh hoạt',
      grammarPattern: '〜てから',
      grammarMeaning: 'Sau khi làm...'
    }
  ],
  'Công nghệ & Xe': [
    {
      title: '全固体電池の実用化競争とトヨタの次世代電気自動車（EV）戦略',
      titleVi: 'Cuộc đua thương mại hóa pin thể rắn và chiến lược xe điện (EV) thế hệ mới của tập đoàn Toyota',
      summary: 'Công nghệ pin sạc siêu nhanh 10 phút đi được 1.200 km hứa hẹn định hình lại bản đồ ngành công nghiệp ô tô thế giới.',
      jlpt: 'N1',
      sourceType: 'nikkei',
      keywords: ['全固体電池', 'EV', 'トヨタ', '次世代バッテリー'],
      vocabWord: '実用化',
      vocabReading: 'じつようか',
      vocabHanViet: 'THỰC DỤNG HÓA',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Đưa vào ứng dụng thực tiễn',
      grammarPattern: '〜に先駆けて',
      grammarMeaning: 'Đi tiên phong trước...'
    },
    {
      title: '時速500キロを超えるリニア中央新幹線の建設と日本の鉄道技術',
      titleVi: 'Xây dựng tuyến tàu đệm từ Maglev Linear Shinkansen vượt mốc 500 km/h và công nghệ đường sắt Nhật',
      summary: 'Tàu chạy trên đệm từ trường siêu dẫn sẽ rút ngắn thời gian di chuyển từ Tokyo đến Nagoya chỉ còn 40 phút.',
      jlpt: 'N2',
      sourceType: 'mainichi',
      keywords: ['リニア中央新幹線', '超電導', '時速500km', '鉄道技術'],
      vocabWord: '超電導',
      vocabReading: 'ちょうでんどう',
      vocabHanViet: 'SIÊU ĐIỆN ĐẠO',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Hiện tượng siêu dẫn',
      grammarPattern: '〜を可能にする',
      grammarMeaning: 'Hiện thực hóa / Khiến cho có thể...'
    },
    {
      title: '日本の自動運転タクシー実証実験と過疎地の交通課題解決',
      titleVi: 'Thử nghiệm taxi tự lái tại Nhật và lời giải cho bài toán giao thông vùng nông thôn',
      summary: 'Phương tiện tự hành cấp độ 4 hỗ trợ người cao tuổi đi chợ và khám chữa bệnh một cách an toàn.',
      jlpt: 'N3',
      sourceType: 'asahi',
      keywords: ['自動運転', 'モビリティ', '実証実験', '過疎地'],
      vocabWord: '課題',
      vocabReading: 'かだい',
      vocabHanViet: 'KHÓA ĐỀ',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Nhiệm vụ trọng tâm, nan đề',
      grammarPattern: '〜を目的として',
      grammarMeaning: 'Với mục tiêu là...'
    },
    {
      title: 'スマート農業：ドローンとAIを活用した日本の米作り',
      titleVi: 'Nông nghiệp thông minh: Ứng dụng máy bay không người lái (Drone) và AI trong trồng trọt lúa gạo',
      summary: 'Máy bay không người lái tự động phun phân bón và phân tích độ ẩm đất đai giúp giảm 70% sức lao động.',
      jlpt: 'N4',
      sourceType: 'nhk_easy',
      keywords: ['スマート農業', 'ドローン', '米作り', 'AI'],
      vocabWord: '収穫',
      vocabReading: 'しゅうかく',
      vocabHanViet: 'THU HOẠCH',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Mùa màng thu hoạch',
      grammarPattern: '〜てある',
      grammarMeaning: 'Được làm sẵn...'
    }
  ],
  'Sức khỏe & Làm đẹp': [
    {
      title: '日本の「J-Beauty」スキンケア哲学：肌のバリア機能を守るミニマリズム',
      titleVi: 'Triết lý dưỡng da J-Beauty: Chủ nghĩa tối giản bảo vệ hàng rào ẩm tự nhiên của làn da',
      summary: 'Kilala phân tích bí quyết rửa mặt tạo bọt mịn, dưỡng ẩm từ gạo lên men và lối sống ăn sạch uống thanh.',
      jlpt: 'N2',
      sourceType: 'kilala',
      keywords: ['J-Beauty', 'スキンケア', '美肌', '発酵エキス'],
      vocabWord: '保湿',
      vocabReading: 'ほしつ',
      vocabHanViet: 'BẢO THẤP',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Giữ ẩm, cấp ẩm cho da',
      grammarPattern: '〜に欠かせない',
      grammarMeaning: 'Không thể thiếu đối với...'
    },
    {
      title: '温泉（Onsen）の泉質別効能と日本古来の「湯治」文化の癒やし',
      titleVi: 'Công dụng chữa bệnh của từng loại suối khoáng nóng Onsen và văn hóa tắm trị liệu Toji cổ xưa',
      summary: 'Tsunagu Japan hướng dẫn các suối nước nóng giàu lưu huỳnh, muối khoáng giúp phục hồi cơ bắp và lưu thông khí huyết.',
      jlpt: 'N3',
      sourceType: 'tsunagu_japan',
      keywords: ['温泉', '湯治', '効能', 'リフレッシュ'],
      vocabWord: '効能',
      vocabReading: 'こうのう',
      vocabHanViet: 'HIỆU NĂNG',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Tác dụng trị liệu, công hiệu',
      grammarPattern: '〜によって異なる',
      grammarMeaning: 'Khác nhau tùy thuộc vào...'
    },
    {
      title: '長寿国・日本の健康長寿の秘訣：発酵食品「納豆・味噌」の栄養学',
      titleVi: 'Bí quyết sống thọ của người Nhật: Dinh dưỡng học từ thực phẩm lên men Natto và Miso',
      summary: 'LocoBee tổng hợp các nghiên cứu y khoa về lợi khuẩn Probiotics giúp tăng cường sức đề kháng và bảo vệ tim mạch.',
      jlpt: 'N3',
      sourceType: 'locobee',
      keywords: ['健康長寿', '発酵食品', '納豆', '味噌'],
      vocabWord: '長寿',
      vocabReading: 'ちょうじゅ',
      vocabHanViet: 'TRƯỜNG THỌ',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Sống thọ, tuổi thọ cao',
      grammarPattern: '〜といわれている',
      grammarMeaning: 'Tương truyền / Được đánh giá là...'
    },
    {
      title: '正しい姿勢と睡眠の質を高める日本の生活習慣',
      titleVi: 'Tư thế đúng và thói quen sinh hoạt giúp nâng cao chất lượng giấc ngủ ở Nhật',
      summary: 'Ngâm bồn nước ấm 15 phút trước khi đi ngủ và sử dụng gối kiều mạch (Sobagara) để giải tỏa căng thẳng cổ vai gáy.',
      jlpt: 'N4',
      sourceType: 'nhk_easy',
      keywords: ['睡眠', '入浴', '健康', '姿勢'],
      vocabWord: '疲労',
      vocabReading: 'ひろう',
      vocabHanViet: 'BÌ LAO',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Mệt mỏi cơ thể',
      grammarPattern: '〜ようにする',
      grammarMeaning: 'Cố gắng giữ thói quen...'
    }
  ],
  'Ẩm thực & Taste of Japan': [
    {
      title: 'Taste of Japan：旬の味覚と日本全国の特産和牛（Wagyu）の極上サシ',
      titleVi: 'Taste of Japan: Hương vị tinh hoa theo mùa và nghệ thuật vân mỡ cẩm thạch của thịt bò Wagyu',
      summary: 'Chuyên trang Bộ Nông Lâm MAFF giới thiệu tiêu chuẩn xếp hạng thịt bò Kobe, Matsusaka và nguồn gốc nuôi dưỡng khắt khe.',
      jlpt: 'N2',
      sourceType: 'taste_of_japan',
      keywords: ['和牛', 'Taste of Japan', '神戸牛', '霜降り'],
      vocabWord: '霜降り',
      vocabReading: 'しもふり',
      vocabHanViet: 'SƯƠNG GIÁNG',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Vân mỡ cẩm thạch xen kẽ thớ thịt',
      grammarPattern: '〜をはじめとする',
      grammarMeaning: 'Trước hết phải kể đến...'
    },
    {
      title: '日本の出汁（Dashi）の科学：昆布と鰹節のうま味相乗効果',
      titleVi: 'Khoa học nước dùng Dashi: Sự kết hợp hoàn hảo giữa rong biển Kombu và cá bào Katsuobushi tạo nên vị Umami',
      summary: 'Khám phá bí mật vị ngọt thịt tự nhiên (Umami) được các đầu bếp ba sao Michelin tôn vinh khắp toàn cầu.',
      jlpt: 'N2',
      sourceType: 'taste_of_japan',
      keywords: ['出汁', 'うま味', '昆布', '鰹節'],
      vocabWord: '相乗効果',
      vocabReading: 'そうじょうこうか',
      vocabHanViet: 'TƯƠNG THỪA HIỆU QUẢ',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Hiệu quả hiệp đồng, cộng hưởng nhân đôi',
      grammarPattern: '〜を通じて',
      grammarMeaning: 'Thông qua...'
    },
    {
      title: '江戸前寿司の職人技：赤酢のシャリとネタの仕込みの真髄',
      titleVi: 'Kỹ nghệ bậc thầy của Sushi Edomae: Cơm trộn giấm đỏ Akasu và bí quyết ủ chín hải sản Neta',
      summary: 'Kilala dẫn bạn vào thế giới của những nghệ nhân sushi dành trọn đời người để mài giũa giác quan thẩm vị.',
      jlpt: 'N3',
      sourceType: 'kilala',
      keywords: ['江戸前寿司', '赤酢', '職人技', '握り'],
      vocabWord: '仕込み',
      vocabReading: 'しこみ',
      vocabHanViet: 'SĨ VÀO',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Công đoạn chuẩn bị sơ chế công phu',
      grammarPattern: '〜にこだわって',
      grammarMeaning: 'Kỹ tính, tâm huyết đặc biệt với...'
    },
    {
      title: '日本の家庭料理「肉じゃが」の作り方と母の味',
      titleVi: 'Cách nấu món ăn gia đình "Nikujaga" (Thịt hầm khoai tây) và vị ngọt ngào của mẹ',
      summary: 'Món ăn truyền thống ấm áp trong mâm cơm mùa đông Nhật Bản với nước tương mirin và thịt bò thái mỏng.',
      jlpt: 'N4',
      sourceType: 'nhk_easy',
      keywords: ['家庭料理', '肉じゃが', '和食', 'レシピ'],
      vocabWord: '煮込む',
      vocabReading: 'にこむ',
      vocabHanViet: 'CHỬ VÀO',
      vocabPos: 'Động từ nhóm 1',
      vocabMeaning: 'Ninh nhừ, hầm chín kỹ',
      grammarPattern: '〜てから',
      grammarMeaning: 'Sau khi làm xong...'
    },
    {
      title: 'おいしい日本の緑茶とおにぎりの簡単な作り方',
      titleVi: 'Cách pha trà xanh Nhật Bản thơm ngon và làm cơm nắm Onigiri đơn giản',
      summary: 'Cơm nắm bọc rong biển nori kẹp nhân cá hồi nướng là món ăn khoái khẩu của học sinh và nhân viên công sở.',
      jlpt: 'N5',
      sourceType: 'nhk_easy',
      keywords: ['おにぎり', '緑茶', 'お弁当'],
      vocabWord: '握る',
      vocabReading: 'にぎる',
      vocabHanViet: 'ÁC',
      vocabPos: 'Động từ nhóm 1',
      vocabMeaning: 'Nắm chặt, vắt cơm',
      grammarPattern: '〜てください',
      grammarMeaning: 'Xin hãy làm...'
    }
  ],
  'Du lịch & Trải nghiệm': [
    {
      title: '白川郷の合掌造り集落：豪雪地帯に息づく知恵と「結（ゆい）」の助け合い',
      titleVi: 'Làng cổ Shirakawa-go mái dốc Gassho-zukuri: Trí tuệ vùng tuyết phủ và tinh thần tương trợ "Yui"',
      summary: 'Japan Travel JNTO giới thiệu ngôi làng cổ tích nơi cả cộng đồng cùng chung tay lợp lại mái tranh rơm khổng lồ.',
      jlpt: 'N2',
      sourceType: 'japan_travel',
      keywords: ['白川郷', '合掌造り', '世界遺産', '結の精神'],
      vocabWord: '集落',
      vocabReading: 'しゅうらく',
      vocabHanViet: 'TẬP LẠC',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Làng bản, thôn xóm định cư',
      grammarPattern: '〜ならではの',
      grammarMeaning: 'Đặc trưng độc đáo của...'
    },
    {
      title: '北海道・富良野のラベンダー畑と美瑛の丘を巡る絶景ドライブ旅',
      titleVi: 'Hành trình lái xe ngắm cảnh sắc Furano mùa hoa oải hương và những triền đồi Biei thơ mộng tại Hokkaido',
      summary: 'Tsunagu Japan gợi ý lịch trình 3 ngày 2 đêm săn hoàng hôn và thưởng thức sữa tươi kem béo ngậy.',
      jlpt: 'N3',
      sourceType: 'tsunagu_japan',
      keywords: ['北海道', '富良野', 'ラベンダー', 'ドライブ'],
      vocabWord: '絶景',
      vocabReading: 'ぜっけい',
      vocabHanViet: 'TUYỆT CẢNH',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Cảnh sắc tuyệt mỹ, kỳ quan',
      grammarPattern: '〜に沿って',
      grammarMeaning: 'Men theo / Đi dọc theo...'
    },
    {
      title: '東京の下町散歩：浅草寺から谷中銀座のレトロな商店街巡り',
      titleVi: 'Dạo bước qua khu phố cổ Tokyo: Từ chùa Senso-ji đến con phố hoài cổ Yanaka Ginza',
      summary: 'LocoBee mách bạn những tiệm bánh gạo Senbei nướng than hoa và không gian hoài niệm thời Showa.',
      jlpt: 'N4',
      sourceType: 'locobee',
      keywords: ['下町', '浅草', '谷中銀座', '散歩'],
      vocabWord: '下町',
      vocabReading: 'したまち',
      vocabHanViet: 'HẠ ĐINH',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Khu phố cổ, khu dân cư truyền thống',
      grammarPattern: '〜たり〜たりする',
      grammarMeaning: 'Lúc thì... lúc thì...'
    },
    {
      title: '新幹線の切符の買い方と電車の乗り換え案内',
      titleVi: 'Hướng dẫn mua vé tàu cao tốc Shinkansen và kinh nghiệm đổi tàu tại các ga lớn',
      summary: 'Mua vé tại máy tự động có màn hình tiếng Anh hoặc quầy vé Midori no Madoguchi cực kỳ nhanh chóng.',
      jlpt: 'N5',
      sourceType: 'nhk_easy',
      keywords: ['新幹線', '切符', '駅', '乗り換え'],
      vocabWord: '切符',
      vocabReading: 'きっぷ',
      vocabHanViet: 'THIẾT PHÙ',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Vé tàu xe',
      grammarPattern: '〜から〜まで',
      grammarMeaning: 'Từ... đến...'
    }
  ],
  'Triết lý sống & Góc nhìn': [
    {
      title: '「生きがい（Ikigai）」の探求：毎朝目覚める喜びと人生の意義を見つける知恵',
      titleVi: 'Khám phá triết lý "Ikigai": Niềm vui thức dậy mỗi sớm mai và tìm kiếm ý nghĩa cuộc đời',
      summary: 'Kilala đúc kết giao điểm giữa điều bạn yêu thích, điều bạn giỏi, điều xã hội cần và điều tạo ra thu nhập.',
      jlpt: 'N1',
      sourceType: 'kilala',
      keywords: ['生きがい', '人生観', '幸福論', '自己実現'],
      vocabWord: '意義',
      vocabReading: 'いぎ',
      vocabHanViet: 'Ý NGHĨA',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Ý nghĩa sâu xa, giá trị nhân sinh',
      grammarPattern: '〜にほかならない',
      grammarMeaning: 'Chính là...'
    },
    {
      title: '「わびさび（侘寂）」の美学：不完全さや移ろいの中に宿る真の美しさ',
      titleVi: 'Mỹ học "Wabi-Sabi": Vẻ đẹp chân thực ẩn sâu trong sự bất toàn và vô thường của vạn vật',
      summary: 'Bát trà rạn vỡ gắn vàng Kintsugi dạy chúng ta trân trọng những vết sẹo và trải nghiệm thăng trầm của thời gian.',
      jlpt: 'N2',
      sourceType: 'kilala',
      keywords: ['わびさび', '金継ぎ', '不完全美', '日本美学'],
      vocabWord: '無常',
      vocabReading: 'むじょう',
      vocabHanViet: 'VÔ THƯỜNG',
      vocabPos: 'Danh từ / Tính từ đuôi の',
      vocabMeaning: 'Vô thường, không có gì là vĩnh hằng',
      grammarPattern: '〜を通じて',
      grammarMeaning: 'Thông qua...'
    },
    {
      title: 'Nippon.com：現代社会を生き抜く「間（Ma）」の哲学と沈黙が語るコミュニケーション',
      titleVi: 'Nippon.com: Triết lý khoảng trống "Ma" trong đời sống hiện đại và nghệ thuật giao tiếp từ sự tĩnh lặng',
      summary: 'Bài phân tích văn hóa từ Nippon.com về khoảng lặng trong kiến trúc, cắm hoa Ikebana và cung cách đối thoại tinh tế của người Nhật.',
      jlpt: 'N1',
      sourceType: 'nippon_com',
      keywords: ['Nippon.com', '間の美学', '沈黙', '日本文化論'],
      vocabWord: '余白',
      vocabReading: 'よはく',
      vocabHanViet: 'DƯ BẠCH',
      vocabPos: 'Danh từ',
      vocabMeaning: 'Khoảng trống, dư vị lắng đọng',
      grammarPattern: '〜にとどまらず',
      grammarMeaning: 'Không chỉ dừng lại ở...'
    },
    {
      title: '「もったいない」の精神と物を大切にする心',
      titleVi: 'Tinh thần "Mottainai" và tấm lòng trân quý vạn vật xung quanh',
      summary: 'Bài học không lãng phí thức ăn, sửa chữa đồ đạc cũ và biết ơn tài nguyên thiên nhiên trong cuộc sống hiện đại.',
      jlpt: 'N3',
      sourceType: 'locobee',
      keywords: ['もったいない', '感謝', '節約', 'エコ'],
      vocabWord: '感謝',
      vocabReading: 'かんしゃ',
      vocabHanViet: 'CẢM TẠ',
      vocabPos: 'Danh từ / Động từ nhóm 3',
      vocabMeaning: 'Biết ơn, tri ân',
      grammarPattern: '〜べきだ',
      grammarMeaning: 'Nên / Cần phải...'
    },
    {
      title: '日本の挨拶「お疲れ様です」に込められた労いと思いやりの気持ち',
      titleVi: 'Lời chào "Otsukaresama desu" và sự quan tâm tinh tế sau một ngày làm việc',
      summary: 'Câu nói cửa miệng nơi công sở chứa đựng sự thấu hiểu nỗ lực của đồng nghiệp và tạo bầu không khí ấm áp.',
      jlpt: 'N4',
      sourceType: 'nhk_easy',
      keywords: ['お疲れ様', '挨拶', '職場', '思いやり'],
      vocabWord: '労う',
      vocabReading: 'ねぎらう',
      vocabHanViet: 'LAO',
      vocabPos: 'Động từ nhóm 1',
      vocabMeaning: 'Động viên, hỏi han công sức',
      grammarPattern: '〜てくれてありがとう',
      grammarMeaning: 'Cảm ơn vì đã...'
    }
  ]
};

// Generate comprehensive multi-domain library: 200+ articles per domain, 2,400+ articles total!
export function generateComprehensiveNewsLibrary(): Article[] {
  const library: Article[] = [...MOCK_ARTICLES];
  const now = new Date();
  const targetPerTopic = 200;

  ALL_TOPICS.forEach((topic, tIdx) => {
    const presets = TOPIC_PRESETS[topic] || TOPIC_PRESETS['Kinh tế & Tài chính'];

    for (let i = 1; i <= targetPerTopic; i++) {
      const preset = presets[(i - 1) % presets.length];
      const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
      const chosenLevel = levels[(i + tIdx) % levels.length];
      const sourceKey = preset.sourceType;
      const sourceMeta = VERIFIED_SOURCES[sourceKey] || VERIFIED_SOURCES['nhk_easy'];

      // Recent timestamps with high recency feel
      const minutesAgo = (tIdx * 8 + i * 12);
      const articleDate = new Date(now.getTime() - minutesAgo * 60 * 1000);
      const publishedAtStr = articleDate.toISOString();

      const articleId = `art-${tIdx + 1}-${i}`;
      if (library.some(a => a.id === articleId)) continue;

      const titleSuffix = i > presets.length ? `【特集 #${i}】` : '';
      const titleViSuffix = i > presets.length ? ` (Chuyên đề #${i})` : '';

      const articleTitle = `${preset.title} ${titleSuffix}`.trim();
      const articleTitleVi = `${preset.titleVi}${titleViSuffix}`.trim();

      const sampleSentenceText = `${preset.title}について、最新の知見と動向が注目されています。`;
      const sampleSentenceVi = `Những hiểu biết và chuyển biến mới nhất xoay quanh "${preset.titleVi}" đang nhận được nhiều sự quan tâm.`;

      const art: Article = {
        id: articleId,
        title: articleTitle,
        titleVi: articleTitleVi,
        summary: `${preset.summary} Tổng hợp thông tin chuyên sâu từ ${sourceMeta.name}.`,
        jlptLevel: chosenLevel,
        topic,
        sourceName: sourceMeta.name,
        sourceType: sourceKey,
        sourceUrl: sourceMeta.url,
        publishedAt: publishedAtStr,
        readTimeMinutes: Math.min(6, Math.max(2, Math.floor(i % 4) + 2)),
        wordCount: 160 + (i % 8) * 25,
        kanjiStats: {
          n5: 22 + (i % 5),
          n4: 16 + (i % 6),
          n3: 14 + (i % 7),
          n2: 10 + (i % 5),
          n1: 6 + (i % 4),
          total: 68 + (i % 20)
        },
        sentences: [
          {
            id: `s-${articleId}-1`,
            text: sampleSentenceText,
            translation: sampleSentenceVi,
            tokens: [
              { surface: preset.vocabWord, reading: preset.vocabReading, isKanji: true, jlpt: chosenLevel, hanViet: preset.vocabHanViet },
              { surface: 'について、' },
              { surface: '最新', reading: 'さいしん', isKanji: true, jlpt: 'N3', hanViet: 'TỐI TÂN' },
              { surface: 'の' },
              { surface: '知見', reading: 'ちけん', isKanji: true, jlpt: 'N1', hanViet: 'TRI KIẾN' },
              { surface: 'と' },
              { surface: '動向', reading: 'どうこう', isKanji: true, jlpt: 'N2', hanViet: 'ĐỘNG HƯỚNG' },
              { surface: 'が' },
              { surface: '注目されています。', reading: 'ちゅうもくされています', isKanji: true, jlpt: 'N3', hanViet: 'CHÚ MỤC' }
            ]
          },
          {
            id: `s-${articleId}-2`,
            text: `専門家や関係者は、${preset.keywords.join('や')}への影響を深く分析しています。`,
            translation: `Các chuyên gia và bên liên quan đang phân tích sâu sắc tác động tới ${preset.keywords.join(' và ')}.`,
            tokens: [
              { surface: '専門家', reading: 'せんもんか', isKanji: true, jlpt: 'N3', hanViet: 'CHUYÊN MÔN GIA' },
              { surface: 'や' },
              { surface: '関係者', reading: 'かんけいしゃ', isKanji: true, jlpt: 'N2', hanViet: 'QUAN HỆ GIẢ' },
              { surface: 'は、' },
              { surface: preset.keywords[0] || '生活' },
              { surface: 'への' },
              { surface: '影響', reading: 'えいきょう', isKanji: true, jlpt: 'N3', hanViet: 'ẢNH HƯỞNG' },
              { surface: 'を' },
              { surface: '深く', reading: 'ふかく', isKanji: true, jlpt: 'N4', hanViet: 'THÂM' },
              { surface: '分析しています。', reading: 'ぶんせきしています', isKanji: true, jlpt: 'N2', hanViet: 'PHÂN TÍCH' }
            ]
          },
          {
            id: `s-${articleId}-3`,
            text: `今後も日本の文化や社会の進化を見据えた取り組みが求められます。`,
            translation: `Trong tương lai, những nỗ lực hướng tới sự phát triển hài hòa của văn hóa và xã hội Nhật Bản sẽ tiếp tục được đòi hỏi.`,
            tokens: [
              { surface: '今後も', reading: 'こんごも', isKanji: true, jlpt: 'N3', hanViet: 'KIM HẬU' },
              { surface: '日本', reading: 'にほん', isKanji: true, jlpt: 'N5' },
              { surface: 'の' },
              { surface: '文化', reading: 'ぶんか', isKanji: true, jlpt: 'N4' },
              { surface: 'や' },
              { surface: '社会', reading: 'しゃかい', isKanji: true, jlpt: 'N5' },
              { surface: 'の' },
              { surface: '進化', reading: 'しんか', isKanji: true, jlpt: 'N2', hanViet: 'TIẾN HÓA' },
              { surface: 'を' },
              { surface: '見据えた', reading: 'みすえた', isKanji: true, jlpt: 'N1', hanViet: 'KIẾN CỨ' },
              { surface: '取り組み', reading: 'とりくみ', isKanji: true, jlpt: 'N2', hanViet: 'THỦ TỔ' },
              { surface: 'が' },
              { surface: '求められます。', reading: 'もとめられます', isKanji: true, jlpt: 'N3', hanViet: 'CẦU' }
            ]
          }
        ],
        vocabulary: [
          {
            id: `v-${articleId}-1`,
            word: preset.vocabWord,
            reading: preset.vocabReading,
            hanViet: preset.vocabHanViet,
            pos: preset.vocabPos,
            meaning: preset.vocabMeaning,
            example: `${preset.vocabWord}を深く理解することが重要です。`,
            exampleVi: `Hiểu sâu sắc về "${preset.vocabMeaning}" là điều hết sức trọng yếu.`,
            jlpt: chosenLevel
          },
          {
            id: `v-${articleId}-2`,
            word: '分析',
            reading: 'ぶんせき',
            hanViet: 'PHÂN TÍCH',
            pos: 'Danh từ / Động từ nhóm 3',
            meaning: 'Phân tích số liệu, hiện tượng',
            example: '市場のデータを詳しく分析する。',
            exampleVi: 'Phân tích kỹ lưỡng dữ liệu thị trường.',
            jlpt: 'N2'
          }
        ],
        grammar: [
          {
            id: `g-${articleId}-1`,
            pattern: preset.grammarPattern,
            meaning: preset.grammarMeaning,
            explanation: `Mẫu ngữ pháp báo chí đặc trưng cấp độ ${chosenLevel}, dùng để liên kết câu văn lập luận sắc bén.`,
            jlpt: chosenLevel,
            example: `事実${preset.grammarPattern}報道を行う。`,
            exampleVi: `Thực hiện đưa tin dựa trên sự thật khách quan.`
          }
        ],
        quiz: [
          {
            id: `q-${articleId}-1`,
            question: `本文が最も伝えようとしている主旨は何ですか。`,
            options: [
              `${preset.titleVi} và ý nghĩa đối với đời sống`,
              'Giá cả hàng hóa tiêu dùng giảm mạnh',
              'Thời tiết mùa đông tuyết rơi dày bất thường',
              'Sự xuất hiện của ứng dụng trò chơi mới'
            ],
            correctIndex: 0,
            explanation: `Trọng tâm cốt lõi của bài viết là phân tích "${preset.titleVi}".`
          }
        ]
      };

      library.push(art);
    }
  });

  return library;
}
