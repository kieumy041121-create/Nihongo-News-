export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type TopicCategory =
  | 'Xã hội'
  | 'Kinh tế'
  | 'Công nghệ'
  | 'Ẩm thực'
  | 'Văn hóa'
  | 'Du lịch'
  | 'Giáo dục'
  | 'Môi trường'
  | 'Thể thao'
  | 'Giải trí'
  | 'Khoa học'
  | 'Chính trị'
  | 'Kinh tế & Tài chính'
  | 'Văn hóa & Lễ hội'
  | 'Xã hội & Đời sống'
  | 'Môi trường & Thiên nhiên'
  | 'Thời sự & Chính trị'
  | 'Giải trí & Nghệ thuật'
  | 'Công nghệ & Xe'
  | 'Sức khỏe & Làm đẹp'
  | 'Ẩm thực & Taste of Japan'
  | 'Du lịch & Trải nghiệm'
  | 'Triết lý sống & Góc nhìn';

export type SourceType =
  | 'editorial_sample'
  | 'ai_generated'
  // 1. Đài Truyền hình & Cơ quan Báo chí Quốc gia Việt Nam
  | 'vietnam_today_vtv'
  | 'vtv_news'
  | 'vna_net'
  | 'vietnam_plus'
  | 'vov_world'
  | 'vov_vn'
  | 'nhan_dan'
  | 'qdnd'
  | 'tuoi_tre'
  | 'thanh_nien'
  | 'vnexpress_intl'
  | 'lao_dong'
  | 'vgp_news'
  | 'dantri'
  | 'sggp'
  | 'saigon_times'
  | 'vneconomy'
  // 2. Đài Truyền hình & Hãng Thông tấn Quốc gia Nhật Bản
  | 'nhk_easy'
  | 'nhk_news'
  | 'nhk_world'
  | 'kyodo_news'
  | 'jiji_press'
  // 3. Ngũ đại Nhật báo & Báo chí Chính luận Hàng đầu Nhật Bản
  | 'nikkei'
  | 'asahi'
  | 'mainichi'
  | 'yomiuri'
  | 'sankei'
  | 'tokyo_shimbun'
  | 'japan_times'
  // 4. Tạp chí Kinh tế, Tài chính, Khoa học & Công nghệ Nhật Bản
  | 'toyo_keizai'
  | 'diamond_online'
  | 'nikkei_business'
  | 'itmedia'
  | 'pr_times'
  | 'chunichi'
  | 'nishinippon'
  | 'hokkaido_np'
  | 'nikkan_kogyo'
  // 5. Hãng Thông tấn & Báo chí Quốc tế tiếng Nhật
  | 'reuters_japan'
  | 'bloomberg_japan'
  | 'bbc_japan'
  | 'cnn_japan'
  | 'afpbb_news'
  | 'forbes_japan'
  | 'courrier_japon'
  | 'ap_news'
  | 'wsj_japan'
  | 'yonhap_japan'
  | 'dw_japan'
  // 6. Cổng tin tức & Cẩm nang Văn hóa, Du lịch, Ẩm thực
  | 'yahoo_news'
  | 'nippon_com'
  | 'kilala'
  | 'tsunagu_japan'
  | 'locobee'
  | 'japan_travel'
  | 'taste_of_japan';

export type SourceCategory =
  | 'vn_broadcaster'
  | 'vn_news_agency'
  | 'jp_broadcaster'
  | 'jp_national_press'
  | 'jp_business_tech'
  | 'global_media_jp'
  | 'culture_lifestyle'
  | 'educational_ai';

export interface SourceMetadata {
  id: SourceType;
  name: string;
  nameJa?: string;
  url: string;
  country: string;
  category: SourceCategory;
  categoryNameVi: string;
  badge: string;
  descriptionVi: string;
}

export interface FuriganaToken {
  surface: string;
  reading?: string;
  isKanji?: boolean;
  jlpt?: JLPTLevel;
  hanViet?: string;
  pos?: string;
  meaning?: string;
}

export interface Sentence {
  id: string;
  text: string;
  translation: string;
  tokens: FuriganaToken[];
  audioStart?: number;
  audioEnd?: number;
}

export interface VocabularyItem {
  id: string;
  word: string;
  reading: string;
  hanViet?: string;
  pos: string;
  meaning: string;
  otherMeanings?: string[];
  example: string;
  exampleVi: string;
  jlpt: JLPTLevel;
}

export interface GrammarPoint {
  id: string;
  pattern: string;
  meaning: string;
  explanation: string;
  jlpt: JLPTLevel;
  example: string;
  exampleVi: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Article {
  id: string;
  title: string;
  titleVi: string;
  summary: string;
  jlptLevel: JLPTLevel;
  topic: TopicCategory;
  sourceName: string;
  sourceType: SourceType;
  sourceUrl?: string;
  publishedAt: string;
  readTimeMinutes: number;
  wordCount: number;
  sentences: Sentence[];
  vocabulary: VocabularyItem[];
  grammar: GrammarPoint[];
  quiz: QuizQuestion[];
  kanjiStats?: {
    n5: number;
    n4: number;
    n3: number;
    n2: number;
    n1: number;
    total: number;
  };
}

export interface CulturalTrivia {
  id: string;
  titleJa: string;
  titleVi: string;
  contentJa: string;
  contentVi: string;
  keywordJa: string;
  keywordReading: string;
  keywordHanViet: string;
  keywordExplanation: string;
  category: string;
}

export interface UserSavedWord {
  id: string;
  word: string;
  reading: string;
  hanViet?: string;
  pos?: string;
  meaning: string;
  otherMeanings?: string[];
  example: string;
  exampleVi: string;
  jlpt: JLPTLevel;
  articleId?: string;
  articleTitle?: string;
  savedAt: string;
  mastery: 'hard' | 'normal' | 'easy'; // Khó, Bình thường, Dễ
  nextReviewDate: string;
  reviewCount: number;
}

export interface SentenceHighlight {
  id: string;
  sentenceId: string;
  sentenceText: string;
  articleId: string;
  articleTitle: string;
  color: 'yellow' | 'green' | 'pink';
  note?: string;
  createdAt: string;
}

export interface UserProfile {
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedArticleIds: string[];
  readingArticleIds: { [id: string]: number }; // articleId -> sentence index
  completedQuizIds: string[];
  claimedTriviaIds: string[];
  weeklyActivity: { [dateStr: string]: number }; // date (YYYY-MM-DD) -> minutes
  jlptTarget: JLPTLevel;
}

export type FuriganaMode = 'all' | 'difficult_only' | 'off';
export type TranslationMode = 'ja_only' | 'bilingual' | 'study';

export interface KanjiDetail {
  kanji: string;
  hanViet: string;
  onyomi: string[];
  kunyomi: string[];
  strokes: number;
  jlpt: JLPTLevel;
  meaning: string;
  examples: Array<{
    word: string;
    reading: string;
    meaning: string;
  }>;
}

export interface SimulatorPassage {
  id: string;
  type: 'short' | 'medium' | 'long'; // Đoản văn, Trung văn, Trường văn
  typeName: string;
  jlptLevel: JLPTLevel;
  title: string;
  titleVi: string;
  timeLimitSeconds: number;
  passageText: string;
  passageTextVi: string;
  sentences: Sentence[];
  questions: QuizQuestion[];
}
