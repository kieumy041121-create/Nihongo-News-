import { KanjiDetail } from '../types';

export const KANJI_DATABASE: Record<string, KanjiDetail> = {
  '日': {
    kanji: '日',
    hanViet: 'NHẬT',
    onyomi: ['ニチ', 'ジツ'],
    kunyomi: ['ひ', '-び', '-か'],
    strokes: 4,
    jlpt: 'N5',
    meaning: 'Mặt trời, ngày, Nhật Bản',
    examples: [
      { word: '日本', reading: 'にほん', meaning: 'Nhật Bản' },
      { word: '毎日', reading: 'まいにち', meaning: 'Mỗi ngày' },
      { word: '休日', reading: 'きゅうじつ', meaning: 'Ngày nghỉ' }
    ]
  },
  '本': {
    kanji: '本',
    hanViet: 'BẢN / BỔN',
    onyomi: ['ホン'],
    kunyomi: ['もと'],
    strokes: 5,
    jlpt: 'N5',
    meaning: 'Sách, gốc, cơ bản, nguồn cội',
    examples: [
      { word: '本屋', reading: 'ほんや', meaning: 'Hiệu sách' },
      { word: '本当に', reading: 'ほんとうに', meaning: 'Thật sự' }
    ]
  },
  '語': {
    kanji: '語',
    hanViet: 'NGỮ',
    onyomi: ['ゴ'],
    kunyomi: ['かた.る', 'かた.らう'],
    strokes: 14,
    jlpt: 'N5',
    meaning: 'Ngôn ngữ, lời nói, kể lại',
    examples: [
      { word: '日本語', reading: 'にほんご', meaning: 'Tiếng Nhật' },
      { word: '単語', reading: 'たんご', meaning: 'Từ vựng' }
    ]
  },
  '新': {
    kanji: '新',
    hanViet: 'TÂN',
    onyomi: ['シン'],
    kunyomi: ['あたら.しい', 'あら.た', 'にい-'],
    strokes: 13,
    jlpt: 'N5',
    meaning: 'Mới, tươi mới',
    examples: [
      { word: '新聞', reading: 'しんぶん', meaning: 'Báo chí' },
      { word: '新年', reading: 'しんねん', meaning: 'Năm mới' }
    ]
  },
  '聞': {
    kanji: '聞',
    hanViet: 'VĂN',
    onyomi: ['ブン', 'モン'],
    kunyomi: ['き.く', 'き.こえる'],
    strokes: 14,
    jlpt: 'N5',
    meaning: 'Nghe, hỏi, nghe thấy',
    examples: [
      { word: '新聞', reading: 'しんぶん', meaning: 'Báo' },
      { word: '聞き手', reading: 'ききて', meaning: 'Người nghe' }
    ]
  },
  '食': {
    kanji: '食',
    hanViet: 'THỰC',
    onyomi: ['ショク', 'ジキ'],
    kunyomi: ['た.べる', 'く.う'],
    strokes: 9,
    jlpt: 'N5',
    meaning: 'Ăn, món ăn, thực phẩm',
    examples: [
      { word: '食事', reading: 'しょくじ', meaning: 'Bữa ăn' },
      { word: '食べ物', reading: 'たべもの', meaning: 'Thức ăn' },
      { word: '和食', reading: 'わしょく', meaning: 'Món ăn truyền thống Nhật' }
    ]
  },
  '桜': {
    kanji: '桜',
    hanViet: 'ANH',
    onyomi: ['オウ'],
    kunyomi: ['さくら'],
    strokes: 10,
    jlpt: 'N3',
    meaning: 'Hoa anh đào, cây anh đào',
    examples: [
      { word: '桜', reading: 'さくら', meaning: 'Hoa anh đào' },
      { word: '桜前線', reading: 'さくらぜんせん', meaning: 'Đường phân bố hoa anh đào nở' }
    ]
  },
  '春': {
    kanji: '春',
    hanViet: 'XUÂN',
    onyomi: ['シュン'],
    kunyomi: ['はる'],
    strokes: 9,
    jlpt: 'N5',
    meaning: 'Mùa xuân',
    examples: [
      { word: '春休み', reading: 'はるやすみ', meaning: 'Kỳ nghỉ xuân' },
      { word: '青春', reading: 'せいしゅん', meaning: 'Thanh xuân' }
    ]
  },
  '開': {
    kanji: '開',
    hanViet: 'KHAI',
    onyomi: ['カイ'],
    kunyomi: ['ひら.く', 'あ.く', 'あ.ける'],
    strokes: 12,
    jlpt: 'N4',
    meaning: 'Mở ra, khai trương, nở hoa',
    examples: [
      { word: '開花', reading: 'かいか', meaning: 'Nở hoa' },
      { word: '開店', reading: 'かいてん', meaning: 'Mở cửa hàng' }
    ]
  },
  '花': {
    kanji: '花',
    hanViet: 'HOA',
    onyomi: ['カ', 'ケ'],
    kunyomi: ['はな'],
    strokes: 7,
    jlpt: 'N5',
    meaning: 'Bông hoa, pháo hoa',
    examples: [
      { word: '花見', reading: 'はなみ', meaning: 'Ngắm hoa' },
      { word: '花火', reading: 'はなび', meaning: 'Pháo hoa' }
    ]
  },
  '電': {
    kanji: '電',
    hanViet: 'ĐIỆN',
    onyomi: ['デン'],
    kunyomi: [],
    strokes: 13,
    jlpt: 'N5',
    meaning: 'Điện, tia chớp',
    examples: [
      { word: '電車', reading: 'でんしゃ', meaning: 'Tàu điện' },
      { word: '電気', reading: 'でんき', meaning: 'Điện khí, đèn' }
    ]
  },
  '車': {
    kanji: '車',
    hanViet: 'XA',
    onyomi: ['シャ'],
    kunyomi: ['くるま'],
    strokes: 7,
    jlpt: 'N5',
    meaning: 'Xe, bánh xe',
    examples: [
      { word: '自動車', reading: 'じどうしゃ', meaning: 'Xe ô tô' },
      { word: '自転車', reading: 'じてんしゃ', meaning: 'Xe đạp' }
    ]
  },
  '気': {
    kanji: '気',
    hanViet: 'KHÍ',
    onyomi: ['キ', 'ケ'],
    kunyomi: ['いき'],
    strokes: 6,
    jlpt: 'N5',
    meaning: 'Khí sắc, tinh thần, thời tiết',
    examples: [
      { word: '天気', reading: 'てんき', meaning: 'Thời tiết' },
      { word: '元気', reading: 'げんき', meaning: 'Khỏe mạnh' }
    ]
  },
  '温': {
    kanji: '温',
    hanViet: 'ÔN',
    onyomi: ['オン'],
    kunyomi: ['あたた.かい', 'あたた.まる'],
    strokes: 12,
    jlpt: 'N4',
    meaning: 'Ấm áp, nhiệt độ',
    examples: [
      { word: '気温', reading: 'きおん', meaning: 'Nhiệt độ không khí' },
      { word: '温泉', reading: 'おんせん', meaning: 'Suối nước nóng' }
    ]
  },
  '環': {
    kanji: '環',
    hanViet: 'HOÀN',
    onyomi: ['カン'],
    kunyomi: ['わ'],
    strokes: 17,
    jlpt: 'N2',
    meaning: 'Vòng tròn, bao quanh, chuỗi',
    examples: [
      { word: '環境', reading: 'かんきょう', meaning: 'Môi trường' },
      { word: '循環', reading: 'じゅんかん', meaning: 'Tuần hoàn' }
    ]
  },
  '境': {
    kanji: '境',
    hanViet: 'CẢNH',
    onyomi: ['キョウ', 'ケイ'],
    kunyomi: ['さかい'],
    strokes: 14,
    jlpt: 'N3',
    meaning: 'Ranh giới, hoàn cảnh',
    examples: [
      { word: '環境', reading: 'かんきょう', meaning: 'Môi trường' },
      { word: '国境', reading: 'こっきょう', meaning: 'Biên giới quốc gia' }
    ]
  },
  '技': {
    kanji: '技',
    hanViet: 'KỸ',
    onyomi: ['ギ'],
    kunyomi: ['わざ'],
    strokes: 7,
    jlpt: 'N3',
    meaning: 'Kỹ thuật, tay nghề, kỹ năng',
    examples: [
      { word: '技術', reading: 'ぎじゅつ', meaning: 'Kỹ thuật, công nghệ' },
      { word: '特技', reading: 'とくぎ', meaning: 'Kỹ năng đặc biệt' }
    ]
  },
  '術': {
    kanji: '術',
    hanViet: 'THUẬT',
    onyomi: ['ジュツ'],
    kunyomi: ['すべ'],
    strokes: 11,
    jlpt: 'N3',
    meaning: 'Phương pháp, mỹ thuật, tài nghệ',
    examples: [
      { word: '技術', reading: 'ぎじゅつ', meaning: 'Kỹ thuật' },
      { word: '美術', reading: 'びじゅつ', meaning: 'Mỹ thuật' }
    ]
  },
  '経': {
    kanji: '経',
    hanViet: 'KINH',
    onyomi: ['ケイ', 'キョウ'],
    kunyomi: ['へ.る', 'た.つ'],
    strokes: 11,
    jlpt: 'N3',
    meaning: 'Trải qua, kinh tế, kinh điển',
    examples: [
      { word: '経済', reading: 'けいざい', meaning: 'Kinh tế' },
      { word: '経験', reading: 'けいけん', meaning: 'Kinh nghiệm' }
    ]
  },
  '済': {
    kanji: '済',
    hanViet: 'TẾ',
    onyomi: ['サイ', 'セイ'],
    kunyomi: ['す.む', 'す.ます'],
    strokes: 11,
    jlpt: 'N3',
    meaning: 'Xong, kết thúc, cứu giúp (kinh bang tế thế)',
    examples: [
      { word: '経済', reading: 'けいざい', meaning: 'Kinh tế' },
      { word: '返済', reading: 'へんさい', meaning: 'Hoàn trả nợ' }
    ]
  },
  '人': {
    kanji: '人',
    hanViet: 'NHÂN',
    onyomi: ['ジン', 'ニン'],
    kunyomi: ['ひと'],
    strokes: 2,
    jlpt: 'N5',
    meaning: 'Con người, người',
    examples: [
      { word: '人間', reading: 'にんげん', meaning: 'Con người' },
      { word: '外国人', reading: 'がいこくじん', meaning: 'Người nước ngoài' }
    ]
  },
  '工': {
    kanji: '工',
    hanViet: 'CÔNG',
    onyomi: ['コウ', 'ク'],
    kunyomi: [],
    strokes: 3,
    jlpt: 'N4',
    meaning: 'Công việc, thợ thủ công, kỹ nghệ',
    examples: [
      { word: '人工', reading: 'じんこう', meaning: 'Nhân tạo' },
      { word: '工場', reading: 'こうじょう', meaning: 'Nhà máy' }
    ]
  },
  '知': {
    kanji: '知',
    hanViet: 'TRI',
    onyomi: ['チ'],
    kunyomi: ['し.る'],
    strokes: 8,
    jlpt: 'N5',
    meaning: 'Biết, tri thức',
    examples: [
      { word: '知能', reading: 'ちのう', meaning: 'Trí năng, trí thông minh' },
      { word: '知識', reading: 'ちしき', meaning: 'Tri thức' }
    ]
  },
  '能': {
    kanji: '能',
    hanViet: 'NĂNG',
    onyomi: ['ノウ'],
    kunyomi: [],
    strokes: 10,
    jlpt: 'N3',
    meaning: 'Năng lực, khả năng',
    examples: [
      { word: '能力', reading: 'のうりょく', meaning: 'Năng lực' },
      { word: '可能', reading: 'かのう', meaning: 'Khả thi' }
    ]
  }
};

export function getKanjiInfo(char: string): KanjiDetail | null {
  if (KANJI_DATABASE[char]) return KANJI_DATABASE[char];
  return null;
}
