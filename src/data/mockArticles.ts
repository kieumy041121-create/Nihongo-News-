import { Article } from '../types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-n5-cherry-blossom',
    title: '日本の春と桜の季節',
    titleVi: 'Mùa xuân Nhật Bản và mùa hoa anh đào',
    summary: 'Mùa xuân ở Nhật Bản thường bắt đầu từ tháng ba. Mọi người thích ngắm hoa anh đào và tổ chức tiệc Hanami cùng gia đình, bạn bè.',
    jlptLevel: 'N5',
    topic: 'Văn hóa',
    sourceName: 'Ban biên tập Nihongo News',
    sourceType: 'editorial_sample',
    publishedAt: '2026-03-25',
    readTimeMinutes: 2,
    wordCount: 145,
    kanjiStats: { n5: 18, n4: 4, n3: 1, n2: 0, n1: 0, total: 23 },
    sentences: [
      {
        id: 's1',
        text: '日本には四つの季節があります。',
        translation: 'Nhật Bản có bốn mùa.',
        tokens: [
          { surface: '日本', reading: 'にほん', isKanji: true, jlpt: 'N5', hanViet: 'NHẬT BẢN' },
          { surface: 'には' },
          { surface: '四つ', reading: 'よっつ', isKanji: true, jlpt: 'N5', hanViet: 'TỨ' },
          { surface: 'の' },
          { surface: '季節', reading: 'きせつ', isKanji: true, jlpt: 'N4', hanViet: 'QUÝ TIẾT' },
          { surface: 'が' },
          { surface: 'あります。' }
        ]
      },
      {
        id: 's2',
        text: '春は三月から五月までです。',
        translation: 'Mùa xuân kéo dài từ tháng ba đến tháng năm.',
        tokens: [
          { surface: '春', reading: 'はる', isKanji: true, jlpt: 'N5', hanViet: 'XUÂN' },
          { surface: 'は' },
          { surface: '三月', reading: 'さんがつ', isKanji: true, jlpt: 'N5', hanViet: 'TAM NGUYỆT' },
          { surface: 'から' },
          { surface: '五月', reading: 'ごがつ', isKanji: true, jlpt: 'N5', hanViet: 'NGŨ NGUYỆT' },
          { surface: 'まで' },
          { surface: 'です。' }
        ]
      },
      {
        id: 's3',
        text: '春になると、たくさんの桜の花が咲きます。',
        translation: 'Khi mùa xuân đến, rất nhiều hoa anh đào sẽ nở rộ.',
        tokens: [
          { surface: '春', reading: 'はる', isKanji: true, jlpt: 'N5', hanViet: 'XUÂN' },
          { surface: 'に' },
          { surface: 'なる' },
          { surface: 'と、' },
          { surface: 'たくさん' },
          { surface: 'の' },
          { surface: '桜', reading: 'さくら', isKanji: true, jlpt: 'N3', hanViet: 'ANH' },
          { surface: 'の' },
          { surface: '花', reading: 'はな', isKanji: true, jlpt: 'N5', hanViet: 'HOA' },
          { surface: 'が' },
          { surface: '咲きます。', reading: 'さきます', isKanji: true, jlpt: 'N5', hanViet: 'TIẾU' }
        ]
      },
      {
        id: 's4',
        text: '人々は公園へ行って、桜を見ながらお弁当を食べます。',
        translation: 'Mọi người đi tới công viên, vừa ngắm hoa đào vừa ăn cơm hộp.',
        tokens: [
          { surface: '人々', reading: 'ひとびと', isKanji: true, jlpt: 'N4', hanViet: 'NHÂN NHÂN' },
          { surface: 'は' },
          { surface: '公園', reading: 'こうえん', isKanji: true, jlpt: 'N5', hanViet: 'CÔNG VIÊN' },
          { surface: 'へ' },
          { surface: '行って、', reading: 'いって', isKanji: true, jlpt: 'N5', hanViet: 'HÀNH' },
          { surface: '桜', reading: 'さくら', isKanji: true, jlpt: 'N3', hanViet: 'ANH' },
          { surface: 'を' },
          { surface: '見ながら', reading: 'みながら', isKanji: true, jlpt: 'N5', hanViet: 'KIẾN' },
          { surface: 'お弁当', reading: 'おべんとう', isKanji: true, jlpt: 'N5', hanViet: 'BIỆN ĐƯƠNG' },
          { surface: 'を' },
          { surface: '食べます。', reading: 'たべます', isKanji: true, jlpt: 'N5', hanViet: 'THỰC' }
        ]
      },
      {
        id: 's5',
        text: 'これを「お花見」と言います。とても楽しいです。',
        translation: 'Điều này được gọi là "Ohanami" (Ngắm hoa). Thật là vui vẻ.',
        tokens: [
          { surface: 'これ' },
          { surface: 'を' },
          { surface: '「お花見」', reading: 'おはなみ', isKanji: true, jlpt: 'N5', hanViet: 'HOA KIẾN' },
          { surface: 'と' },
          { surface: '言います。', reading: 'いいま', isKanji: true, jlpt: 'N5', hanViet: 'NGÔN' },
          { surface: 'とても' },
          { surface: '楽しい', reading: 'たのしい', isKanji: true, jlpt: 'N5', hanViet: 'LẠC' },
          { surface: 'です。' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1',
        word: '桜',
        reading: 'さくら',
        hanViet: 'ANH',
        pos: 'Danh từ',
        meaning: 'Hoa anh đào — quốc hoa biểu tượng của nước Nhật',
        otherMeanings: ['Cây anh đào'],
        example: '公園の桜がとても綺麗です。',
        exampleVi: 'Hoa anh đào ở công viên rất đẹp.',
        jlpt: 'N5'
      },
      {
        id: 'v2',
        word: 'お花見',
        reading: 'おはなみ',
        hanViet: 'HOA KIẾN',
        pos: 'Danh từ',
        meaning: 'Phong tục ngắm hoa anh đào vào mùa xuân',
        example: '週末、友達とお花見に行きます。',
        exampleVi: 'Cuối tuần tôi sẽ đi ngắm hoa cùng bạn bè.',
        jlpt: 'N5'
      },
      {
        id: 'v3',
        word: 'お弁当',
        reading: 'おべんとう',
        hanViet: 'BIỆN ĐƯƠNG',
        pos: 'Danh từ',
        meaning: 'Hộp cơm trưa kiểu Nhật',
        example: '母が美味しいお弁当を作ってくれました。',
        exampleVi: 'Mẹ đã làm cho tôi hộp cơm trưa rất ngon.',
        jlpt: 'N5'
      },
      {
        id: 'v4',
        word: '咲く',
        reading: 'さく',
        hanViet: 'TIẾU',
        pos: 'Động từ nhóm 1',
        meaning: 'Nở (hoa)',
        example: '庭の花が咲きました。',
        exampleVi: 'Hoa trong vườn đã nở rồi.',
        jlpt: 'N5'
      }
    ],
    grammar: [
      {
        id: 'g1',
        pattern: 'V-stem + ながら',
        meaning: 'Vừa... vừa... (hai hành động diễn ra đồng thời cùng lúc)',
        explanation: 'Hành động thứ hai ở phía sau là hành động chính của người nói.',
        jlpt: 'N5',
        example: '桜を見ながらお弁当を食べます。',
        exampleVi: 'Vừa ngắm hoa anh đào vừa ăn cơm hộp.'
      },
      {
        id: 'g2',
        pattern: 'V-thể từ điển + と',
        meaning: 'Hễ mà... thì... / Khi...',
        explanation: 'Diễn tả mối quan hệ tự nhiên, tất yếu hoặc thời gian diễn tiến chắc chắn.',
        jlpt: 'N4',
        example: '春になると、桜が咲きます。',
        exampleVi: 'Hễ mùa xuân đến thì hoa anh đào nở.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: '日本の春は何月から何月までですか。',
        options: ['一月から三月まで', '三月から五月まで', '六月から八月まで', '九月から十一月まで'],
        correctIndex: 1,
        explanation: 'Trong bài có câu: "春は三月から五月までです。" (Mùa xuân là từ tháng ba đến tháng năm).'
      },
      {
        id: 'q2',
        question: '「お花見」で人々は何をしますか。',
        options: [
          '川で泳ぎます',
          '桜を見ながらお弁当を食べます',
          '学校で試験を受けます',
          '雪で遊びます'
        ],
        correctIndex: 1,
        explanation: 'Bài viết nêu rõ: "人々は公園へ行って、桜を見ながらお弁当を食べます。これを「お花見」と言います。"'
      }
    ]
  },
  {
    id: 'art-n4-train-manners',
    title: '日本の電車でのマナーと静かな空間',
    titleVi: 'Văn hóa ứng xử trên tàu điện ngầm và không gian yên tĩnh ở Nhật',
    summary: 'Đi tàu điện ở Nhật Bản đòi hỏi sự tôn trọng không gian chung. Nói chuyện điện thoại và gây ồn ào bị coi là hành vi thiếu lịch sự.',
    jlptLevel: 'N4',
    topic: 'Xã hội',
    sourceName: 'Ban biên tập Nihongo News',
    sourceType: 'editorial_sample',
    publishedAt: '2026-03-20',
    readTimeMinutes: 3,
    wordCount: 180,
    kanjiStats: { n5: 22, n4: 15, n3: 3, n2: 1, n1: 0, total: 41 },
    sentences: [
      {
        id: 's1',
        text: '日本の電車は、時間が正確でとても便利です。',
        translation: 'Tàu điện ở Nhật Bản có giờ giấc chuẩn xác và rất tiện lợi.',
        tokens: [
          { surface: '日本', reading: 'にほん', isKanji: true, jlpt: 'N5' },
          { surface: 'の' },
          { surface: '電車', reading: 'でんしゃ', isKanji: true, jlpt: 'N5', hanViet: 'ĐIỆN XA' },
          { surface: 'は、' },
          { surface: '時間', reading: 'じかん', isKanji: true, jlpt: 'N5', hanViet: 'THỜI GIAN' },
          { surface: 'が' },
          { surface: '正確で', reading: 'せいかくで', isKanji: true, jlpt: 'N3', hanViet: 'CHÍNH XÁC' },
          { surface: 'とても' },
          { surface: '便利', reading: 'べんり', isKanji: true, jlpt: 'N5', hanViet: 'TIỆN LỢI' },
          { surface: 'です。' }
        ]
      },
      {
        id: 's2',
        text: 'しかし、電車の中ではいくつかのマナーを守らなければなりません。',
        translation: 'Tuy nhiên, bên trong tàu điện bạn phải tuân thủ một số phép tắc xã sự.',
        tokens: [
          { surface: 'しかし、' },
          { surface: '電車', reading: 'でんしゃ', isKanji: true, jlpt: 'N5' },
          { surface: 'の' },
          { surface: '中', reading: 'なか', isKanji: true, jlpt: 'N5', hanViet: 'TRUNG' },
          { surface: 'では' },
          { surface: 'いくつか' },
          { surface: 'の' },
          { surface: 'マナー' },
          { surface: 'を' },
          { surface: '守らなければなりません。', reading: 'まもらなければなりません', isKanji: true, jlpt: 'N4', hanViet: 'THỦ' }
        ]
      },
      {
        id: 's3',
        text: 'まず、携帯電話で通話をしてはいけません。',
        translation: 'Trước hết, không được phép gọi điện thoại di động trên tàu.',
        tokens: [
          { surface: 'まず、' },
          { surface: '携帯電話', reading: 'けいたいでんわ', isKanji: true, jlpt: 'N4', hanViet: 'HUỀ ĐỚI ĐIỆN THOẠI' },
          { surface: 'で' },
          { surface: '通話', reading: 'つうわ', isKanji: true, jlpt: 'N3', hanViet: 'THÔNG THOẠI' },
          { surface: 'を' },
          { surface: 'してはいけません。' }
        ]
      },
      {
        id: 's4',
        text: '周りの人の迷惑になるからです。マナーモードに設定しましょう。',
        translation: 'Bởi vì điều đó sẽ gây phiền phức cho những người xung quanh. Hãy chuyển điện thoại sang chế độ im lặng nhé.',
        tokens: [
          { surface: '周り', reading: 'まわり', isKanji: true, jlpt: 'N4', hanViet: 'CHU' },
          { surface: 'の' },
          { surface: '人', reading: 'ひと', isKanji: true, jlpt: 'N5' },
          { surface: 'の' },
          { surface: '迷惑', reading: 'めいわく', isKanji: true, jlpt: 'N3', hanViet: 'MÊ HOẶC' },
          { surface: 'に' },
          { surface: 'なる' },
          { surface: 'から' },
          { surface: 'です。' },
          { surface: 'マナーモード' },
          { surface: 'に' },
          { surface: '設定しましょう。', reading: 'せっていしましょう', isKanji: true, jlpt: 'N3', hanViet: 'THIẾT ĐỊNH' }
        ]
      },
      {
        id: 's5',
        text: 'お年寄りや体の不自由な人には、席を譲ることが大切です。',
        translation: 'Đối với người cao tuổi hoặc người khuyết tật, việc nhường ghế là điều hết sức quan trọng.',
        tokens: [
          { surface: 'お年寄り', reading: 'おとしより', isKanji: true, jlpt: 'N4', hanViet: 'NIÊN KÝ' },
          { surface: 'や' },
          { surface: '体', reading: 'からだ', isKanji: true, jlpt: 'N5', hanViet: 'THỂ' },
          { surface: 'の' },
          { surface: '不自由な', reading: 'ふじゆうな', isKanji: true, jlpt: 'N3', hanViet: 'BẤT TỰ DO' },
          { surface: '人', reading: 'ひと', isKanji: true, jlpt: 'N5' },
          { surface: 'には、' },
          { surface: '席', reading: 'せき', isKanji: true, jlpt: 'N4', hanViet: 'TỊCH' },
          { surface: 'を' },
          { surface: '譲る', reading: 'ゆずる', isKanji: true, jlpt: 'N3', hanViet: 'NHƯỢNG' },
          { surface: 'こと' },
          { surface: 'が' },
          { surface: '大切', reading: 'たいせつ', isKanji: true, jlpt: 'N5', hanViet: 'ĐẠI THIẾT' },
          { surface: 'です。' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1',
        word: '迷惑',
        reading: 'めいわく',
        hanViet: 'MÊ HOẶC',
        pos: 'Danh từ / Tính từ đuôi な',
        meaning: 'Sự phiền hà, quấy rầy người khác',
        otherMeanings: ['Khó xử', 'Rắc rối'],
        example: '人に迷惑をかけてはいけません。',
        exampleVi: 'Không được gây phiền hà cho người khác.',
        jlpt: 'N4'
      },
      {
        id: 'v2',
        word: '譲る',
        reading: 'ゆずる',
        hanViet: 'NHƯỢNG',
        pos: 'Động từ nhóm 1',
        meaning: 'Nhường (ghế, chỗ, đồ vật)',
        example: 'お年寄りに席を譲りました。',
        exampleVi: 'Tôi đã nhường ghế cho cụ già.',
        jlpt: 'N4'
      },
      {
        id: 'v3',
        word: '守る',
        reading: 'まもる',
        hanViet: 'THỦ',
        pos: 'Động từ nhóm 1',
        meaning: 'Tuân thủ (quy tắc), bảo vệ',
        example: 'ルールをしっかり守りましょう。',
        exampleVi: 'Hãy tuân thủ nghiêm ngặt quy tắc nhé.',
        jlpt: 'N4'
      }
    ],
    grammar: [
      {
        id: 'g1',
        pattern: 'V-なければなりません',
        meaning: 'Bắt buộc phải làm gì...',
        explanation: 'Chỉ nghĩa vụ, bổn phận hoặc sự tất yếu phải tuân theo luật lệ, nội quy.',
        jlpt: 'N4',
        example: '電車の中ではマナーを守らなければなりません。',
        exampleVi: 'Trên tàu điện bạn phải tuân thủ phép tắc lịch sự.'
      },
      {
        id: 'g2',
        pattern: 'V-てはいけません',
        meaning: 'Không được phép làm gì...',
        explanation: 'Dùng để cấm chỉ hoặc nhắc nhở hành vi bị cấm ở nơi công cộng.',
        jlpt: 'N5',
        example: '電車の中で通話をしてはいけません。',
        exampleVi: 'Không được nói chuyện điện thoại trên tàu.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: '日本の電車の中でしてはいけないことは何ですか。',
        options: ['本を読むこと', '音楽をイヤホンで聴くこと', '携帯電話で通話をすること', '席に座ること'],
        correctIndex: 2,
        explanation: 'Bài viết chỉ rõ: "携帯電話で通話をしてはいけません。" (Không được gọi điện thoại).'
      },
      {
        id: 'q2',
        question: 'なぜ電車で通話をしてはいけませんか。',
        options: ['電車が止まるから', '周りの人の迷惑になるから', '電話代が高くなるから', '切符をなくすから'],
        correctIndex: 1,
        explanation: '"周りの人の迷惑になるからです。" (Vì sẽ gây phiền phức cho những người xung quanh).'
      }
    ]
  },
  {
    id: 'art-n3-ai-convenience-store',
    title: '日本の無人コンビニとAI技術の進化',
    titleVi: 'Cửa hàng tiện lợi không người và bước tiến công nghệ AI tại Nhật',
    summary: 'Nhằm giải quyết tình trạng thiếu hụt lao động do già hóa dân số, các chuỗi cửa hàng tiện lợi Nhật Bản đang đẩy mạnh ứng dụng AI và thanh toán tự động.',
    jlptLevel: 'N3',
    topic: 'Công nghệ',
    sourceName: 'Ban biên tập Nihongo News',
    sourceType: 'editorial_sample',
    publishedAt: '2026-03-15',
    readTimeMinutes: 3,
    wordCount: 220,
    kanjiStats: { n5: 25, n4: 20, n3: 18, n2: 4, n1: 0, total: 67 },
    sentences: [
      {
        id: 's1',
        text: '深刻な少子高齢化によって、日本のサービス業では人手不足が続いています。',
        translation: 'Do vấn đề già hóa dân số và giảm tỷ lệ sinh nghiêm trọng, ngành dịch vụ tại Nhật Bản đang liên tục thiếu nhân lực.',
        tokens: [
          { surface: '深刻な', reading: 'しんこくな', isKanji: true, jlpt: 'N2', hanViet: 'THÂM KHẮC' },
          { surface: '少子高齢化', reading: 'しょうしこうれいか', isKanji: true, jlpt: 'N2', hanViet: 'THIẾU TỬ CAO LINH HÓA' },
          { surface: 'によって、' },
          { surface: '日本', reading: 'にほん', isKanji: true, jlpt: 'N5' },
          { surface: 'の' },
          { surface: 'サービス業', reading: 'サービスぎょう', isKanji: true, jlpt: 'N3', hanViet: 'NGHIỆP' },
          { surface: 'では' },
          { surface: '人手不足', reading: 'ひとでぶそく', isKanji: true, jlpt: 'N3', hanViet: 'NHÂN THỦ BẤT TÚC' },
          { surface: 'が' },
          { surface: '続いています。', reading: 'つづいています', isKanji: true, jlpt: 'N4', hanViet: 'TỤC' }
        ]
      },
      {
        id: 's2',
        text: 'この問題を解決するために、多くのコンビニがAIを活用した「無人店舗」を導入し始めました。',
        translation: 'Để giải quyết vấn đề này, nhiều chuỗi cửa hàng tiện lợi đã bắt đầu đưa vào vận hành các "cửa hàng không người" ứng dụng AI.',
        tokens: [
          { surface: 'この' },
          { surface: '問題', reading: 'もんだい', isKanji: true, jlpt: 'N5', hanViet: 'VẤN ĐỀ' },
          { surface: 'を' },
          { surface: '解決するために、', reading: 'かいけつするために', isKanji: true, jlpt: 'N3', hanViet: 'GIẢI QUYẾT' },
          { surface: '多く', reading: 'おおく', isKanji: true, jlpt: 'N4', hanViet: 'ĐA' },
          { surface: 'の' },
          { surface: 'コンビニ' },
          { surface: 'が' },
          { surface: 'AI' },
          { surface: 'を' },
          { surface: '活用した', reading: 'かつようした', isKanji: true, jlpt: 'N3', hanViet: 'HOẠT DỤNG' },
          { surface: '「無人店舗」', reading: 'むじんてんぽ', isKanji: true, jlpt: 'N3', hanViet: 'VÔ NHÂN ĐIẾM PHỐ' },
          { surface: 'を' },
          { surface: '導入し始めました。', reading: 'どうにゅうしはじめました', isKanji: true, jlpt: 'N2', hanViet: 'ĐẠO NHẬP THỦY' }
        ]
      },
      {
        id: 's3',
        text: '客が商品を手に取ると、天井のカメラやセンサーが自動的に認識します。',
        translation: 'Khi khách hàng cầm sản phẩm lên tay, các camera và cảm biến trên trần nhà sẽ tự động nhận diện món đồ.',
        tokens: [
          { surface: '客', reading: 'きゃく', isKanji: true, jlpt: 'N4', hanViet: 'KHÁCH' },
          { surface: 'が' },
          { surface: '商品', reading: 'しょうひん', isKanji: true, jlpt: 'N4', hanViet: 'THƯƠNG PHẨM' },
          { surface: 'を' },
          { surface: '手に取る', reading: 'てにとる', isKanji: true, jlpt: 'N4', hanViet: 'THỦ THỦ' },
          { surface: 'と、' },
          { surface: '天井', reading: 'てんじょう', isKanji: true, jlpt: 'N3', hanViet: 'THIÊN TỈNH' },
          { surface: 'の' },
          { surface: 'カメラ' },
          { surface: 'や' },
          { surface: 'センサー' },
          { surface: 'が' },
          { surface: '自動的に', reading: 'じどうてきに', isKanji: true, jlpt: 'N3', hanViet: 'TỰ ĐỘNG ĐÍCH' },
          { surface: '認識します。', reading: 'にんしきします', isKanji: true, jlpt: 'N2', hanViet: 'NHẬN THỨC' }
        ]
      },
      {
        id: 's4',
        text: 'レジに並ぶことなく、スマートフォンで決済してすぐに店を出ることができます。',
        translation: 'Không cần phải xếp hàng ở quầy thu ngân, khách có thể thanh toán qua điện thoại thông minh rồi rời khỏi cửa hàng ngay tức thì.',
        tokens: [
          { surface: 'レジ' },
          { surface: 'に' },
          { surface: '並ぶことなく、', reading: 'ならぶことなく', isKanji: true, jlpt: 'N3', hanViet: 'TỊNH' },
          { surface: 'スマートフォン' },
          { surface: 'で' },
          { surface: '決済して', reading: 'けっさいして', isKanji: true, jlpt: 'N2', hanViet: 'QUYẾT TẾ' },
          { surface: 'すぐに' },
          { surface: '店', reading: 'みせ', isKanji: true, jlpt: 'N5', hanViet: 'ĐIẾM' },
          { surface: 'を' },
          { surface: '出ることができます。', reading: 'でることができます', isKanji: true, jlpt: 'N5', hanViet: 'XUẤT' }
        ]
      },
      {
        id: 's5',
        text: '今後、駅や地方の住宅街でもこのような店舗が増える見込みです。',
        translation: 'Trong tương lai, các cửa hàng như thế này dự kiến sẽ tiếp tục gia tăng ở các ga tàu và khu dân cư địa phương.',
        tokens: [
          { surface: '今後、', reading: 'こんご', isKanji: true, jlpt: 'N3', hanViet: 'KIM HẬU' },
          { surface: '駅', reading: 'えき', isKanji: true, jlpt: 'N5', hanViet: 'DỊCH' },
          { surface: 'や' },
          { surface: '地方', reading: 'ちほう', isKanji: true, jlpt: 'N3', hanViet: 'ĐỊA PHƯƠNG' },
          { surface: 'の' },
          { surface: '住宅街', reading: 'じゅうたくがい', isKanji: true, jlpt: 'N2', hanViet: 'TRÚ TRẠCH NHAI' },
          { surface: 'でも' },
          { surface: 'このような' },
          { surface: '店舗', reading: 'てんぽ', isKanji: true, jlpt: 'N2', hanViet: 'ĐIẾM PHỐ' },
          { surface: 'が' },
          { surface: '増える', reading: 'ふえる', isKanji: true, jlpt: 'N4', hanViet: 'TĂNG' },
          { surface: '見込みです。', reading: 'みこみです', isKanji: true, jlpt: 'N2', hanViet: 'KIẾN VÀO' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1',
        word: '人手不足',
        reading: 'ひとでぶそく',
        hanViet: 'NHÂN THỦ BẤT TÚC',
        pos: 'Danh từ',
        meaning: 'Thiếu hụt lao động, thiếu người làm',
        example: '多くのレストランが人手不足に悩んでいます。',
        exampleVi: 'Nhiều nhà hàng đang đau đầu vì thiếu nhân viên.',
        jlpt: 'N3'
      },
      {
        id: 'v2',
        word: '無人店舗',
        reading: 'むじんてんぽ',
        hanViet: 'VÔ NHÂN ĐIẾM PHỐ',
        pos: 'Danh từ',
        meaning: 'Cửa hàng không người trực (vận hành tự động)',
        example: '駅のホームに無人店舗がオープンしました。',
        exampleVi: 'Một cửa hàng tự động không người đã mở tại sân ga.',
        jlpt: 'N3'
      },
      {
        id: 'v3',
        word: '解決する',
        reading: 'かいけつする',
        hanViet: 'GIẢI QUYẾT',
        pos: 'Động từ nhóm 3',
        meaning: 'Giải quyết (vấn đề, mâu thuẫn)',
        example: '話し合って問題を解決しましょう。',
        exampleVi: 'Hãy cùng thảo luận để giải quyết vấn đề nhé.',
        jlpt: 'N3'
      },
      {
        id: 'v4',
        word: '認識する',
        reading: 'にんしきする',
        hanViet: 'NHẬN THỨC',
        pos: 'Động từ nhóm 3',
        meaning: 'Nhận diện, nhận biết thức',
        example: 'カメラが顔を認識します。',
        exampleVi: 'Camera nhận diện khuôn mặt.',
        jlpt: 'N3'
      }
    ],
    grammar: [
      {
        id: 'g1',
        pattern: 'V-ことなしに / V-ことなく',
        meaning: 'Mà không làm V...',
        explanation: 'Thực hiện hành động sau mà hoàn toàn không trải qua hay cần đến hành động trước.',
        jlpt: 'N3',
        example: 'レジに並ぶことなく、店を出ることができます。',
        exampleVi: 'Có thể rời khỏi cửa hàng mà không cần phải xếp hàng ở quầy thanh toán.'
      },
      {
        id: 'g2',
        pattern: 'V-stem + 始める',
        meaning: 'Bắt đầu làm một việc gì đó...',
        explanation: 'Diễn tả khởi điểm của một hành động hoặc biến chuyển trạng thái mang tính liên tục.',
        jlpt: 'N4',
        example: '無人店舗を導入し始めました。',
        exampleVi: 'Đã bắt đầu đưa vào triển khai các cửa hàng không người.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: '日本のコンビニが無人店舗を導入している主な理由は何ですか。',
        options: [
          '電気代を安くするため',
          '人手不足を解決するため',
          '商品の数を減らすため',
          '外国人観光客を呼ぶため'
        ],
        correctIndex: 1,
        explanation: '"少子高齢化によって、日本のサービス業では人手不足が続いています。この問題を解決するために..." (Để giải quyết vấn đề thiếu nhân lực do già hóa dân số).'
      },
      {
        id: 'q2',
        question: '客が店を出るとき、どのように支払いますか。',
        options: [
          'レジで店員に現金を渡す',
          'スマートフォンで決済する',
          '手紙でお金を送る',
          '銀行に直接振り込む'
        ],
        correctIndex: 1,
        explanation: '"レジに並ぶことなく、スマートフォンで決済してすぐに店を出ることができます。"'
      }
    ]
  },
  {
    id: 'art-n2-ev-transition',
    title: '日本の自動車産業と脱炭素社会への挑戦',
    titleVi: 'Ngành công nghiệp ô tô Nhật Bản và thách thức chuyển đổi sang xã hội phi phát thải',
    summary: 'Trước xu thế xe điện hóa toàn cầu, các nhà sản xuất ô tô hàng đầu Nhật Bản đang cân bằng chiến lược giữa xe thuần điện (EV), Hybrid và nhiên liệu Hydro.',
    jlptLevel: 'N2',
    topic: 'Kinh tế',
    sourceName: 'Ban biên tập Nihongo News',
    sourceType: 'editorial_sample',
    publishedAt: '2026-03-08',
    readTimeMinutes: 4,
    wordCount: 290,
    kanjiStats: { n5: 30, n4: 25, n3: 32, n2: 26, n1: 4, total: 117 },
    sentences: [
      {
        id: 's1',
        text: '世界的な気候変動対策が加速する中、自動車産業は百年に一度の大変革期を迎えています。',
        translation: 'Giữa bối cảnh các biện pháp ứng phó biến đổi khí hậu toàn cầu đang tăng tốc, ngành công nghiệp ô tô đang bước vào giai đoạn đại chuyển mình trăm năm có một.',
        tokens: [
          { surface: '世界的な', reading: 'せかいてきな', isKanji: true, jlpt: 'N3' },
          { surface: '気候変動', reading: 'きこうへんどう', isKanji: true, jlpt: 'N2', hanViet: 'KHÍ HẬU BIẾN ĐỘNG' },
          { surface: '対策', reading: 'たいさく', isKanji: true, jlpt: 'N3', hanViet: 'ĐỐI SÁCH' },
          { surface: 'が' },
          { surface: '加速する', reading: 'かそくする', isKanji: true, jlpt: 'N2', hanViet: 'GIA TỐC' },
          { surface: '中、' },
          { surface: '自動車産業', reading: 'じどうしゃさんぎょう', isKanji: true, jlpt: 'N3', hanViet: 'TỰ ĐỘNG XA SẢN NGHIỆP' },
          { surface: 'は' },
          { surface: '百年', reading: 'ひゃくねん', isKanji: true, jlpt: 'N5' },
          { surface: 'に' },
          { surface: '一度', reading: 'いちど', isKanji: true, jlpt: 'N5' },
          { surface: 'の' },
          { surface: '大変革期', reading: 'だいへんかくき', isKanji: true, jlpt: 'N1', hanViet: 'ĐẠI BIẾN CÁCH KỲ' },
          { surface: 'を' },
          { surface: '迎えています。', reading: 'むかえています', isKanji: true, jlpt: 'N3', hanViet: 'NGHÊNH' }
        ]
      },
      {
        id: 's2',
        text: '日本企業は長年ハイブリッド車で世界をリードしてきましたが、欧米や中国のEVシフトに伴い、方針転換を迫られています。',
        translation: 'Các doanh nghiệp Nhật Bản từng nhiều năm dẫn đầu thế giới về dòng xe Hybrid, song trước làn sóng chuyển dịch sang xe điện (EV) của phương Tây và Trung Quốc, họ buộc phải điều chỉnh đường lối.',
        tokens: [
          { surface: '日本企業', reading: 'にほんきぎょう', isKanji: true, jlpt: 'N3', hanViet: 'NHẬT BẢN XÍ NGHIỆP' },
          { surface: 'は' },
          { surface: '長年', reading: 'ながねん', isKanji: true, jlpt: 'N3', hanViet: 'TRƯỜNG NIÊN' },
          { surface: 'ハイブリッド車' },
          { surface: 'で' },
          { surface: '世界', reading: 'せかい', isKanji: true, jlpt: 'N5' },
          { surface: 'を' },
          { surface: 'リードしてきました' },
          { surface: 'が、' },
          { surface: '欧米', reading: 'おうべい', isKanji: true, jlpt: 'N3', hanViet: 'ÂU MỄ' },
          { surface: 'や' },
          { surface: '中国', reading: 'ちゅうごく', isKanji: true, jlpt: 'N5' },
          { surface: 'の' },
          { surface: 'EVシフト' },
          { surface: 'に' },
          { surface: '伴い、', reading: 'ともない', isKanji: true, jlpt: 'N2', hanViet: 'BẠN' },
          { surface: '方針転換', reading: 'ほうしんてんかん', isKanji: true, jlpt: 'N2', hanViet: 'PHƯƠNG CHÂM CHUYỂN HOÁN' },
          { surface: 'を' },
          { surface: '迫られています。', reading: 'せまられています', isKanji: true, jlpt: 'N1', hanViet: 'BÁCH' }
        ]
      },
      {
        id: 's3',
        text: '単に電気自動車に切り替えるだけでなく、水素燃料や次世代バッテリーの開発にも莫大な投資が行われています。',
        translation: 'Không đơn thuần là chuyển đổi hoàn toàn sang xe điện, những khoản đầu tư khổng lồ cũng đang được đổ vào việc phát triển nhiên liệu hydro và pin thế hệ mới.',
        tokens: [
          { surface: '単に', reading: 'たんに', isKanji: true, jlpt: 'N2', hanViet: 'ĐƠN' },
          { surface: '電気自動車', reading: 'でんきじどうしゃ', isKanji: true, jlpt: 'N4', hanViet: 'ĐIỆN KHÍ TỰ ĐỘNG XA' },
          { surface: 'に' },
          { surface: '切り替える', reading: 'きりかえる', isKanji: true, jlpt: 'N2', hanViet: 'THIẾT THẾ' },
          { surface: 'だけでなく、' },
          { surface: '水素燃料', reading: 'すいそねんりょう', isKanji: true, jlpt: 'N2', hanViet: 'THỦY TỐ NHIÊN LIỆU' },
          { surface: 'や' },
          { surface: '次世代', reading: 'じせだい', isKanji: true, jlpt: 'N2', hanViet: 'THỨ THẾ ĐẠI' },
          { surface: 'バッテリー' },
          { surface: 'の' },
          { surface: '開発', reading: 'かいはつ', isKanji: true, jlpt: 'N3', hanViet: 'KHAI PHÁT' },
          { surface: 'にも' },
          { surface: '莫大な', reading: 'ばくだいな', isKanji: true, jlpt: 'N1', hanViet: 'MẠC ĐẠI' },
          { surface: '投資', reading: 'とうし', isKanji: true, jlpt: 'N2', hanViet: 'ĐẦU TƯ' },
          { surface: 'が' },
          { surface: '行われています。', reading: 'おこなわれています', isKanji: true, jlpt: 'N4', hanViet: 'HÀNH' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1',
        word: '変革',
        reading: 'へんかく',
        hanViet: 'BIẾN CÁCH',
        pos: 'Danh từ / Động từ nhóm 3',
        meaning: 'Cải cách mang tính bước ngoặt, cách mạng',
        example: '社会構造の変革が求められています。',
        exampleVi: 'Một cuộc biến cách cơ cấu xã hội đang được đòi hỏi.',
        jlpt: 'N2'
      },
      {
        id: 'v2',
        word: '投資',
        reading: 'とうし',
        hanViet: 'ĐẦU TƯ',
        pos: 'Danh từ / Động từ nhóm 3',
        meaning: 'Đầu tư tài chính hoặc công nghệ',
        example: '新技術に巨額の資金を投資する。',
        exampleVi: 'Đầu tư nguồn vốn khổng lồ vào công nghệ mới.',
        jlpt: 'N2'
      },
      {
        id: 'v3',
        word: '方針転換',
        reading: 'ほうしんてんかん',
        hanViet: 'PHƯƠNG CHÂM CHUYỂN HOÁN',
        pos: 'Danh từ',
        meaning: 'Thay đổi đường lối, chuyển hướng chính sách',
        example: '急激な市場の変化で方針転換を余儀なくされた。',
        exampleVi: 'Bị buộc phải chuyển hướng chính sách do thị trường biến đổi đột ngột.',
        jlpt: 'N2'
      }
    ],
    grammar: [
      {
        id: 'g1',
        pattern: '〜に伴って / 〜に伴い',
        meaning: 'Cùng với... / Đi đôi với việc...',
        explanation: 'Diễn tả sự thay đổi của vế B xảy ra tương ứng theo nhịp độ thay đổi của vế A.',
        jlpt: 'N2',
        example: 'EVシフトに伴い、方針転換を迫られています。',
        exampleVi: 'Cùng với làn sóng chuyển sang EV, họ bị buộc phải thay đổi phương châm.'
      },
      {
        id: 'g2',
        pattern: '単に〜だけでなく',
        meaning: 'Không đơn thuần chỉ... mà còn...',
        explanation: 'Nhấn mạnh phạm vi rộng lớn hoặc sự bổ sung yếu tố mới ngoài sự việc thông thường.',
        jlpt: 'N2',
        example: '単に電気自動車に切り替えるだけでなく、次世代バッテリーの開発も重要だ。',
        exampleVi: 'Không đơn thuần chỉ chuyển sang xe điện mà phát triển pin thế hệ mới cũng rất trọng yếu.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: '日本の自動車メーカーが今直面している状況として正しいものはどれですか。',
        options: [
          '自動車の需要が世界で完全になくなった。',
          'EVシフトに伴い、これまでの戦略の転換を迫られている。',
          'ハイブリッド車の生産を完全に中止した。',
          'すべての研究開発への投資をやめた。'
        ],
        correctIndex: 1,
        explanation: 'Trong bài nêu rõ: "欧米や中国のEVシフトに伴い、方針転換を迫られています。" (Bị thúc ép phải chuyển hướng chiến lược cùng với làn sóng xe điện).'
      }
    ]
  },
  {
    id: 'art-n1-workstyle-reform',
    title: '労働力人口減少下における日本企業の働き方改革と生産性向上',
    titleVi: 'Cải cách phong cách làm việc và nâng cao năng suất của doanh nghiệp Nhật Bản trong bối cảnh suy giảm lực lượng lao động',
    summary: 'Đối mặt với áp lực nhân khẩu học chưa từng có, các tập đoàn Nhật Bản đang tái định hình văn hóa làm việc suốt đời và chế độ thâm niên truyền thống.',
    jlptLevel: 'N1',
    topic: 'Kinh tế',
    sourceName: 'Ban biên tập Nihongo News',
    sourceType: 'editorial_sample',
    publishedAt: '2026-03-01',
    readTimeMinutes: 5,
    wordCount: 350,
    kanjiStats: { n5: 35, n4: 30, n3: 40, n2: 35, n1: 28, total: 168 },
    sentences: [
      {
        id: 's1',
        text: '少子高齢化の進展に伴う生産年齢人口の激減は、日本経済の持続可能性を揺るがす深刻な構造的課題となっている。',
        translation: 'Sự sụt giảm mạnh dân số trong độ tuổi lao động đi đôi với xu hướng già hóa dân số đã và đang trở thành một thách thức mang tính cơ cấu trầm trọng, làm lay chuyển tính bền vững của nền kinh tế Nhật Bản.',
        tokens: [
          { surface: '少子高齢化', reading: 'しょうしこうれいか', isKanji: true, jlpt: 'N2' },
          { surface: 'の' },
          { surface: '進展', reading: 'しんてん', isKanji: true, jlpt: 'N1', hanViet: 'TIẾN TRIỂN' },
          { surface: 'に' },
          { surface: '伴う', reading: 'ともなう', isKanji: true, jlpt: 'N2' },
          { surface: '生産年齢人口', reading: 'せいさんねんれいじんこう', isKanji: true, jlpt: 'N1', hanViet: 'SINH SẢN NIÊN LINH NHÂN KHẨU' },
          { surface: 'の' },
          { surface: '激減', reading: 'げきげん', isKanji: true, jlpt: 'N1', hanViet: 'KÍCH GIẢM' },
          { surface: 'は、' },
          { surface: '日本経済', reading: 'にほんけいざい', isKanji: true, jlpt: 'N3' },
          { surface: 'の' },
          { surface: '持続可能性', reading: 'じぞくかのうせい', isKanji: true, jlpt: 'N1', hanViet: 'TRÌ TỤC KHẢ NĂNG TÍNH' },
          { surface: 'を' },
          { surface: '揺るがす', reading: 'ゆるがす', isKanji: true, jlpt: 'N1', hanViet: 'DAO' },
          { surface: '深刻な', reading: 'しんこくな', isKanji: true, jlpt: 'N2' },
          { surface: '構造的課題', reading: 'こうぞうてきかだい', isKanji: true, jlpt: 'N1', hanViet: 'CẤU TẠO ĐÍCH KHÓA ĐỀ' },
          { surface: 'と' },
          { surface: 'なっている。' }
        ]
      },
      {
        id: 's2',
        text: '従来の終身雇用や年功序列といった日本型雇用慣行は、柔軟な人材登用やイノベーション創出を阻害しかねないとの指摘が相次いでいる。',
        translation: 'Các tập quán tuyển dụng kiểu Nhật truyền thống như tuyển dụng trọn đời hay chế độ thâm niên đang liên tục vấp phải những chỉ trích rằng có nguy cơ cản trở việc trọng dụng nhân tài linh hoạt và sáng tạo đổi mới.',
        tokens: [
          { surface: '従来の', reading: 'じゅうらいの', isKanji: true, jlpt: 'N1', hanViet: 'TÙNG LAI' },
          { surface: '終身雇用', reading: 'しゅうしんこよう', isKanji: true, jlpt: 'N1', hanViet: 'CHUNG THÂN CỐ DỤNG' },
          { surface: 'や' },
          { surface: '年功序列', reading: 'ねんこうじょれつ', isKanji: true, jlpt: 'N1', hanViet: 'NIÊN CÔNG TỰ LIỆT' },
          { surface: 'といった' },
          { surface: '日本型雇用慣行', reading: 'にほんがたこようかんこう', isKanji: true, jlpt: 'N1', hanViet: 'CỐ DỤNG QUÁN HÀNH' },
          { surface: 'は、' },
          { surface: '柔軟な', reading: 'じゅうなんな', isKanji: true, jlpt: 'N1', hanViet: 'NHU NHUYỄN' },
          { surface: '人材登用', reading: 'じんざいとうよう', isKanji: true, jlpt: 'N1', hanViet: 'NHÂN TÀI ĐĂNG DỤNG' },
          { surface: 'や' },
          { surface: 'イノベーション創出', reading: 'そうしゅつ', isKanji: true, jlpt: 'N1', hanViet: 'SANG XUẤT' },
          { surface: 'を' },
          { surface: '阻害しかねない', reading: 'そがいしかねない', isKanji: true, jlpt: 'N1', hanViet: 'TRỞ HẠI' },
          { surface: 'との' },
          { surface: '指摘', reading: 'してき', isKanji: true, jlpt: 'N1', hanViet: 'CHỈ TRÍCH' },
          { surface: 'が' },
          { surface: '相次いでいる。', reading: 'あいついでいる', isKanji: true, jlpt: 'N1', hanViet: 'TƯƠNG THỨ' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1',
        word: '持続可能性',
        reading: 'じぞくかのうせい',
        hanViet: 'TRÌ TỤC KHẢ NĂNG TÍNH',
        pos: 'Danh từ',
        meaning: 'Tính bền vững (Sustainability)',
        example: '環境と経済の持続可能性を追求する。',
        exampleVi: 'Theo đuổi tính bền vững giữa môi trường và kinh tế.',
        jlpt: 'N1'
      },
      {
        id: 'v2',
        word: '年功序列',
        reading: 'ねんこうじょれつ',
        hanViet: 'NIÊN CÔNG TỰ LIỆT',
        pos: 'Danh từ',
        meaning: 'Chế độ thâm niên (tăng lương thăng chức theo tuổi tác và số năm cống hiến)',
        example: '年功序列から実力主義への移行が進む。',
        exampleVi: 'Quá trình dịch chuyển từ chế độ thâm niên sang chủ nghĩa năng lực đang diễn ra.',
        jlpt: 'N1'
      }
    ],
    grammar: [
      {
        id: 'g1',
        pattern: 'V-stem + かねない',
        meaning: 'Có nguy cơ... / Hoàn toàn có thể dẫn đến hậu quả tiêu cực...',
        explanation: 'Diễn tả một khả năng xấu có thể phát sinh nếu tình trạng hiện tại tiếp diễn.',
        jlpt: 'N1',
        example: 'イノベーション創出を阻害しかねない。',
        exampleVi: 'Có nguy cơ kìm hãm sự đổi mới sáng tạo.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: '日本型雇用慣行（終身雇用や年功序列）に対して、どのような懸念が示されていますか。',
        options: [
          '給与が高くなりすぎること',
          '柔軟な人材登用やイノベーション創出を阻害する恐れがあること',
          '退職金が支払われなくなること',
          '労働時間が極端に短くなること'
        ],
        correctIndex: 1,
        explanation: 'Đoạn văn chỉ rõ: "柔軟な人材登用やイノベーション創出を阻害しかねないとの指摘が相次いでいる。"'
      }
    ]
  }
];
