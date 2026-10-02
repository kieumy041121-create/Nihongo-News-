import { UserProfile, UserSavedWord, SentenceHighlight, JLPTLevel } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'nihongo_news_user_profile_v1',
  SAVED_WORDS: 'nihongo_news_saved_words_v1',
  HIGHLIGHTS: 'nihongo_news_highlights_v1',
  UI_SETTINGS: 'nihongo_news_ui_settings_v1',
  CUSTOM_ARTICLES: 'nihongo_news_custom_articles_v1'
};

const DEFAULT_PROFILE: UserProfile = {
  xp: 45,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedArticleIds: ['art-n5-cherry-blossom'],
  readingArticleIds: {},
  completedQuizIds: [],
  claimedTriviaIds: [],
  weeklyActivity: {
    '2026-09-28': 15,
    '2026-09-29': 25,
    '2026-09-30': 20,
    '2026-10-01': 35,
    '2026-10-02': 10
  },
  jlptTarget: 'N3'
};

export class StorageService {
  public static getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (!data) return DEFAULT_PROFILE;
      return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  public static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  public static addXp(amount: number, reason: string): { newXp: number; level: number; leveledUp: boolean } {
    const profile = this.getProfile();
    const oldLevel = this.getLevel(profile.xp);
    profile.xp += amount;
    const newLevel = this.getLevel(profile.xp);

    // Update streak and activity
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastActiveDate !== today) {
      const last = new Date(profile.lastActiveDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        profile.streak += 1;
      } else if (diffDays > 1) {
        profile.streak = 1;
      }
      profile.lastActiveDate = today;
    }

    if (!profile.weeklyActivity[today]) {
      profile.weeklyActivity[today] = 0;
    }
    profile.weeklyActivity[today] += 5; // 5 min logged

    this.saveProfile(profile);

    return {
      newXp: profile.xp,
      level: newLevel,
      leveledUp: newLevel > oldLevel
    };
  }

  public static getLevel(xp: number): number {
    if (xp < 50) return 1; // Beginner
    if (xp < 150) return 2; // Explorer
    if (xp < 350) return 3; // Reader
    if (xp < 700) return 4; // Scholar
    return 5; // Master
  }

  public static getLevelTitle(level: number, lang: 'vi' | 'ja' = 'vi'): string {
    const titlesVi = {
      1: 'Tập sự (Beginner)',
      2: 'Khám phá (Explorer)',
      3: 'Độc giả (Reader)',
      4: 'Học giả (Scholar)',
      5: 'Bậc thầy (Master)'
    };
    const titlesJa = {
      1: '初級者 (Beginner)',
      2: '探求者 (Explorer)',
      3: '読書家 (Reader)',
      4: '研究者 (Scholar)',
      5: '達人 (Master)'
    };
    return (lang === 'ja' ? titlesJa : titlesVi)[level as 1 | 2 | 3 | 4 | 5] || 'Người học';
  }

  // Saved Vocabulary
  public static getSavedWords(): UserSavedWord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_WORDS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveWord(word: Omit<UserSavedWord, 'id' | 'savedAt' | 'mastery' | 'nextReviewDate' | 'reviewCount'>): { added: boolean; word: UserSavedWord } {
    const words = this.getSavedWords();
    const existingIndex = words.findIndex(w => w.word === word.word);

    if (existingIndex >= 0) {
      return { added: false, word: words[existingIndex] };
    }

    const newWord: UserSavedWord = {
      ...word,
      id: `w-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      savedAt: new Date().toISOString(),
      mastery: 'normal',
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0
    };

    words.unshift(newWord);
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(words));
    } catch (e) {
      console.warn(e);
    }

    // Award +2 XP for saving a new word
    this.addXp(2, 'Lưu từ mới');

    return { added: true, word: newWord };
  }

  public static updateWordMastery(wordId: string, mastery: 'hard' | 'normal' | 'easy'): void {
    const words = this.getSavedWords();
    const word = words.find(w => w.id === wordId);
    if (!word) return;

    word.mastery = mastery;
    word.reviewCount += 1;

    // Calculate next review based on SRS simple intervals
    const now = new Date();
    const daysToAdd = mastery === 'easy' ? 4 : mastery === 'normal' ? 2 : 1;
    now.setDate(now.getDate() + daysToAdd);
    word.nextReviewDate = now.toISOString();

    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(words));
    } catch (e) {
      console.warn(e);
    }
  }

  public static removeSavedWord(wordId: string): void {
    const words = this.getSavedWords().filter(w => w.id !== wordId);
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(words));
    } catch (e) {
      console.warn(e);
    }
  }

  // Highlights & Notes
  public static getHighlights(): SentenceHighlight[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HIGHLIGHTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveHighlight(highlight: Omit<SentenceHighlight, 'id' | 'createdAt'>): SentenceHighlight {
    const highlights = this.getHighlights();
    const existingIndex = highlights.findIndex(h => h.sentenceId === highlight.sentenceId && h.articleId === highlight.articleId);

    if (existingIndex >= 0) {
      highlights[existingIndex] = {
        ...highlights[existingIndex],
        color: highlight.color,
        note: highlight.note
      };
      localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));
      return highlights[existingIndex];
    }

    const newHighlight: SentenceHighlight = {
      ...highlight,
      id: `hl-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    highlights.unshift(newHighlight);
    localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));
    return newHighlight;
  }

  public static removeHighlight(sentenceId: string, articleId: string): void {
    const highlights = this.getHighlights().filter(h => !(h.sentenceId === sentenceId && h.articleId === articleId));
    localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));
  }

  // Export to Anki-compatible CSV
  public static exportWordsToCsv(words: UserSavedWord[]): string {
    const headers = ['Kanji/Từ', 'Hiragana/Cách đọc', 'Âm Hán Việt', 'Từ loại', 'Nghĩa tiếng Việt', 'Cấp độ JLPT', 'Ví dụ tiếng Nhật', 'Dịch ví dụ'];
    const rows = words.map(w => [
      `"${(w.word || '').replace(/"/g, '""')}"`,
      `"${(w.reading || '').replace(/"/g, '""')}"`,
      `"${(w.hanViet || '').replace(/"/g, '""')}"`,
      `"${(w.pos || '').replace(/"/g, '""')}"`,
      `"${(w.meaning || '').replace(/"/g, '""')}"`,
      `"${(w.jlpt || '').replace(/"/g, '""')}"`,
      `"${(w.example || '').replace(/"/g, '""')}"`,
      `"${(w.exampleVi || '').replace(/"/g, '""')}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  public static downloadCsv(csvContent: string, fileName = 'nihongo-news-vocabulary.csv'): void {
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
