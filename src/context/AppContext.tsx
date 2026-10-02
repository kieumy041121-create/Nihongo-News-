import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Article,
  JLPTLevel,
  FuriganaMode,
  TranslationMode,
  UserProfile,
  UserSavedWord,
  SentenceHighlight,
  SourceType
} from '../types';
import { MOCK_ARTICLES } from '../data/mockArticles';
import { generateComprehensiveNewsLibrary } from '../data/newsRepository';
import { StorageService } from '../services/storageService';

export type NavTab = 'home' | 'articles' | 'press' | 'reader' | 'listening' | 'flashcards' | 'simulator' | 'profile';

export interface LiveNewsItem {
  id: string;
  title: string;
  titleVi: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  timeAgo: string;
  topic: string;
  jlpt: string;
}

interface Toast {
  id: string;
  type: 'success' | 'info' | 'xp';
  message: string;
}

interface AppContextType {
  language: 'vi' | 'ja';
  setLanguage: (lang: 'vi' | 'ja') => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  // Articles & Reading
  articles: Article[];
  selectedArticle: Article | null;
  selectArticle: (article: Article) => void;
  addCustomArticle: (article: Article) => void;
  filterSourceByPress: SourceType | 'ALL';
  setFilterSourceByPress: (source: SourceType | 'ALL') => void;
  openArticlesWithSource: (source: SourceType | 'ALL') => void;
  liveNewsTicker: LiveNewsItem[];
  refreshLiveNews: () => Promise<void>;
  isRefreshingNews: boolean;
  lastLiveUpdated: string;

  // Reader Settings
  furiganaMode: FuriganaMode;
  setFuriganaMode: (mode: FuriganaMode) => void;
  translationMode: TranslationMode;
  setTranslationMode: (mode: TranslationMode) => void;
  speechSpeed: number;
  setSpeechSpeed: (speed: number) => void;

  // User Profile & Gamification
  userProfile: UserProfile;
  awardXp: (amount: number, reason: string) => void;
  completeArticle: (articleId: string) => void;
  claimTrivia: (triviaId: string) => boolean;

  // Saved Words & Notes
  savedWords: UserSavedWord[];
  saveVocabularyWord: (wordData: Parameters<typeof StorageService.saveWord>[0]) => boolean;
  updateWordStatus: (wordId: string, mastery: 'hard' | 'normal' | 'easy') => void;
  deleteSavedWord: (wordId: string) => void;

  // Highlights
  highlights: SentenceHighlight[];
  addHighlight: (hl: Parameters<typeof StorageService.saveHighlight>[0]) => void;
  removeHighlight: (sentenceId: string, articleId: string) => void;

  // Radio Mode
  radioQueue: Article[];
  addToRadioQueue: (article: Article) => boolean;
  removeFromRadioQueue: (articleId: string) => void;
  isRadioOpen: boolean;
  setIsRadioOpen: (open: boolean) => void;

  // Sensei Assistant
  isSenseiOpen: boolean;
  setIsSenseiOpen: (open: boolean) => void;
  senseiContextSentence: string | null;
  setSenseiContextSentence: (sentence: string | null) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'xp') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'vi' | 'ja'>('vi');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  const [articles, setArticles] = useState<Article[]>(() => {
    const fullLibrary = generateComprehensiveNewsLibrary();
    try {
      const stored = localStorage.getItem('nihongo_news_custom_articles_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...parsed, ...fullLibrary];
      }
    } catch {}
    return fullLibrary;
  });

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => articles[0] || MOCK_ARTICLES[0]);
  const [filterSourceByPress, setFilterSourceByPress] = useState<SourceType | 'ALL'>('ALL');
  const [furiganaMode, setFuriganaMode] = useState<FuriganaMode>('all');
  const [translationMode, setTranslationMode] = useState<TranslationMode>('bilingual');
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);

  const openArticlesWithSource = (source: SourceType | 'ALL') => {
    setFilterSourceByPress(source);
    setActiveTab('articles');
  };

  const [userProfile, setUserProfile] = useState<UserProfile>(() => StorageService.getProfile());
  const [savedWords, setSavedWords] = useState<UserSavedWord[]>(() => StorageService.getSavedWords());
  const [highlights, setHighlights] = useState<SentenceHighlight[]>(() => StorageService.getHighlights());

  const [radioQueue, setRadioQueue] = useState<Article[]>([MOCK_ARTICLES[0], MOCK_ARTICLES[1]]);
  const [isRadioOpen, setIsRadioOpen] = useState<boolean>(false);

  const [isSenseiOpen, setIsSenseiOpen] = useState<boolean>(false);
  const [senseiContextSentence, setSenseiContextSentence] = useState<string | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Live News Ticker State
  const [liveNewsTicker, setLiveNewsTicker] = useState<LiveNewsItem[]>([
    {
      id: 'init-vtv',
      title: 'VTV Vietnam Today：日越外交関係の新時代、両国の青年IT技術者交流とイノベーション拠点開設',
      titleVi: 'Vietnam Today (VTV): Kỷ nguyên mới quan hệ Việt - Nhật, giao lưu kỹ sư IT trẻ và ra mắt trung tâm đổi mới sáng tạo',
      sourceName: 'Vietnam Today — VTV',
      sourceUrl: 'https://vietnamtoday.vtv.vn/',
      publishedAt: new Date().toISOString(),
      timeAgo: 'Vừa xong',
      topic: 'Thời sự & Chính trị',
      jlpt: 'N2'
    },
    {
      id: 'init-vna',
      title: 'ベトナム通信社（VNA）：日本企業の対越直接投資が拡大、ハイテク産業とグリーン変革で連携',
      titleVi: 'Thông tấn xã Việt Nam (VNA Net): Vốn FDI của doanh nghiệp Nhật Bản vào Việt Nam tăng vọt, chuyển dịch sang bán dẫn và chuyển đổi xanh',
      sourceName: 'VNA Net — Thông tấn xã Việt Nam',
      sourceUrl: 'https://vnanet.vn/en/',
      publishedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      timeAgo: '10 phút trước',
      topic: 'Kinh tế & Tài chính',
      jlpt: 'N2'
    }
  ]);
  const [isRefreshingNews, setIsRefreshingNews] = useState<boolean>(false);
  const [lastLiveUpdated, setLastLiveUpdated] = useState<string>('Vừa xong');

  const refreshLiveNews = async () => {
    setIsRefreshingNews(true);
    try {
      const res = await fetch('/api/news/latest');
      if (res.ok) {
        const data = await res.json();
        if (data.news && Array.isArray(data.news)) {
          setLiveNewsTicker(data.news);
          setLastLiveUpdated('Vừa cập nhật tức thì');
          showToast('Đã đồng bộ tin tức mới nhất từ các hãng thông tấn!', 'success');
        }
      }
    } catch (e) {
      console.warn('Live news fetch failed:', e);
    } finally {
      setIsRefreshingNews(false);
    }
  };

  useEffect(() => {
    refreshLiveNews();
  }, []);

  // Sync theme with HTML class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'xp' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const awardXp = (amount: number, reason: string) => {
    const result = StorageService.addXp(amount, reason);
    setUserProfile(StorageService.getProfile());
    showToast(`+${amount} XP: ${reason}`, 'xp');
    if (result.leveledUp) {
      showToast(`🎉 CHÚC MỪNG! Bạn đã thăng cấp Level ${result.level} - ${StorageService.getLevelTitle(result.level, language)}!`, 'success');
    }
  };

  const completeArticle = (articleId: string) => {
    const profile = StorageService.getProfile();
    if (!profile.completedArticleIds.includes(articleId)) {
      profile.completedArticleIds.push(articleId);
      StorageService.saveProfile(profile);
      setUserProfile(profile);
      awardXp(20, 'Hoàn thành bài đọc');
    }
  };

  const claimTrivia = (triviaId: string): boolean => {
    const profile = StorageService.getProfile();
    if (profile.claimedTriviaIds.includes(triviaId)) {
      showToast('Bạn đã nhận điểm cho sự thật văn hóa này rồi!', 'info');
      return false;
    }
    profile.claimedTriviaIds.push(triviaId);
    StorageService.saveProfile(profile);
    setUserProfile(profile);
    awardXp(5, 'Sự thật văn hóa trong ngày');
    return true;
  };

  const selectArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveTab('reader');
    awardXp(10, 'Bắt đầu bài đọc mới');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addCustomArticle = (article: Article) => {
    setArticles(prev => [article, ...prev]);
    try {
      const stored = localStorage.getItem('nihongo_news_custom_articles_v1');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(article);
      localStorage.setItem('nihongo_news_custom_articles_v1', JSON.stringify(list));
    } catch {}
    selectArticle(article);
    showToast('Đã tạo thành công bài đọc mới!', 'success');
  };

  const saveVocabularyWord = (wordData: Parameters<typeof StorageService.saveWord>[0]) => {
    const res = StorageService.saveWord(wordData);
    if (res.added) {
      setSavedWords(StorageService.getSavedWords());
      setUserProfile(StorageService.getProfile());
      showToast(`Đã lưu "${wordData.word}" vào sổ từ (+2 XP)`, 'success');
      return true;
    } else {
      showToast(`Từ "${wordData.word}" đã có trong sổ từ của bạn!`, 'info');
      return false;
    }
  };

  const updateWordStatus = (wordId: string, mastery: 'hard' | 'normal' | 'easy') => {
    StorageService.updateWordMastery(wordId, mastery);
    setSavedWords(StorageService.getSavedWords());
    const label = mastery === 'easy' ? 'Đã nắm chắc (Dễ)' : mastery === 'normal' ? 'Cần ôn thêm (Bình thường)' : 'Từ khó';
    showToast(`Đã cập nhật trạng thái từ: ${label}`, 'info');
  };

  const deleteSavedWord = (wordId: string) => {
    StorageService.removeSavedWord(wordId);
    setSavedWords(StorageService.getSavedWords());
    showToast('Đã xóa từ khỏi sổ từ', 'info');
  };

  const addHighlight = (hl: Parameters<typeof StorageService.saveHighlight>[0]) => {
    StorageService.saveHighlight(hl);
    setHighlights(StorageService.getHighlights());
    showToast('Đã lưu đánh dấu và ghi chú!', 'success');
  };

  const removeHighlight = (sentenceId: string, articleId: string) => {
    StorageService.removeHighlight(sentenceId, articleId);
    setHighlights(StorageService.getHighlights());
    showToast('Đã hủy đánh dấu', 'info');
  };

  const addToRadioQueue = (article: Article): boolean => {
    if (radioQueue.length >= 5) {
      showToast('Danh sách phát tối đa 5 bài! Hãy xóa bớt trước.', 'info');
      return false;
    }
    if (radioQueue.some(a => a.id === article.id)) {
      showToast('Bài đọc đã có trong danh sách phát!', 'info');
      return false;
    }
    setRadioQueue(prev => [...prev, article]);
    showToast(`Đã thêm "${article.title}" vào Radio`, 'success');
    return true;
  };

  const removeFromRadioQueue = (articleId: string) => {
    setRadioQueue(prev => prev.filter(a => a.id !== articleId));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        articles,
        selectedArticle,
        selectArticle,
        addCustomArticle,
        filterSourceByPress,
        setFilterSourceByPress,
        openArticlesWithSource,
        furiganaMode,
        setFuriganaMode,
        translationMode,
        setTranslationMode,
        speechSpeed,
        setSpeechSpeed,
        userProfile,
        awardXp,
        completeArticle,
        claimTrivia,
        savedWords,
        saveVocabularyWord,
        updateWordStatus,
        deleteSavedWord,
        highlights,
        addHighlight,
        removeHighlight,
        radioQueue,
        addToRadioQueue,
        removeFromRadioQueue,
        isRadioOpen,
        setIsRadioOpen,
        isSenseiOpen,
        setIsSenseiOpen,
        senseiContextSentence,
        setSenseiContextSentence,
        liveNewsTicker,
        refreshLiveNews,
        isRefreshingNews,
        lastLiveUpdated,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
