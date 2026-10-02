import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JLPTLevel, Article } from '../../types';
import { CULTURAL_TRIVIA_LIST } from '../../data/culturalTrivia';
import { StorageService } from '../../services/storageService';
import { SpeechService } from '../../services/speechService';
import {
  Flame,
  Sparkles,
  BookOpen,
  Headphones,
  Layers,
  GraduationCap,
  Bot,
  Volume2,
  RefreshCw,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
  Radio,
  Newspaper,
  ExternalLink,
  ChevronRight,
  Globe
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    articles,
    selectArticle,
    setActiveTab,
    openArticlesWithSource,
    userProfile,
    claimTrivia,
    setIsSenseiOpen,
    language,
    liveNewsTicker,
    refreshLiveNews,
    isRefreshingNews,
    lastLiveUpdated,
    addToRadioQueue
  } = useApp();

  // Cultural Trivia state
  const [triviaIndex, setTriviaIndex] = useState(0);
  const currentTrivia = CULTURAL_TRIVIA_LIST[triviaIndex];
  const isTriviaClaimed = userProfile.claimedTriviaIds.includes(currentTrivia.id);
  const [isTriviaFavorite, setIsTriviaFavorite] = useState(false);

  // Active breaking news item index
  const [activeNewsIdx, setActiveNewsIdx] = useState(0);
  const activeBreakingNews = liveNewsTicker[activeNewsIdx] || liveNewsTicker[0];

  // JLPT Filter for recommended list
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'ALL' | JLPTLevel>('ALL');

  const filteredArticles = selectedLevelFilter === 'ALL'
    ? articles
    : articles.filter(a => a.jlptLevel === selectedLevelFilter);

  // Continue reading article
  const continueArticle: Article = articles[0];

  const level = StorageService.getLevel(userProfile.xp);
  const levelTitle = StorageService.getLevelTitle(level, language);

  const handleShuffleTrivia = () => {
    setTriviaIndex(prev => (prev + 1) % CULTURAL_TRIVIA_LIST.length);
  };

  const handleSpeakTrivia = () => {
    SpeechService.speak(currentTrivia.contentJa, { rate: 0.9 });
  };

  const handleSpeakBreakingNews = (text: string) => {
    SpeechService.speak(text, { rate: 0.95 });
  };

  const handleOpenBreakingNewsArticle = () => {
    // Find matching article in repository or use continue article
    const match = articles.find(a =>
      a.title.includes(activeBreakingNews.title.slice(0, 10)) ||
      a.topic === activeBreakingNews.topic
    ) || articles[0];

    selectArticle(match);
    setActiveTab('reader');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Banner: Welcome & Quick Gamification Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Chuỗi học {userProfile.streak} ngày liên tục</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Konnichiwa! Sẵn sàng đọc tin Nhật hôm nay?
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
            Mỗi bài báo bạn đọc, mỗi từ mới bạn lưu sẽ giúp bạn tiến gần hơn tới mục tiêu chinh phục JLPT N5–N1.
          </p>
        </div>

        {/* Level Stats Block */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center font-bold text-2xl text-white shadow-lg">
            {level}
          </div>
          <div>
            <div className="text-xs text-stone-300 font-medium">Trình độ độc giả</div>
            <div className="text-base font-bold text-white">{levelTitle}</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{userProfile.xp} XP</span>
              <span className="text-stone-400 font-normal">| Mục tiêu: 700 XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Breaking News Section: Updates automatically every time user enters */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-50/80 via-white to-stone-50/60 dark:from-rose-950/20 dark:via-stone-900/60 dark:to-stone-900/40 border border-rose-200/80 dark:border-rose-900/50 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
            </span>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Bản tin mới nhất cập nhật tức thì (Breaking News)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-stone-200/70 dark:bg-stone-800 text-[10px] font-semibold text-stone-600 dark:text-stone-300">
              {activeBreakingNews.timeAgo}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-400 text-[11px] hidden sm:inline">
              Cập nhật: {lastLiveUpdated}
            </span>
            <button
              onClick={() => refreshLiveNews()}
              disabled={isRefreshingNews}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 text-stone-600 dark:text-stone-300 text-[11px] font-medium transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshingNews ? 'animate-spin text-rose-600' : ''}`} />
              <span>Làm mới</span>
            </button>
          </div>
        </div>

        {/* Breaking News Card Content */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-bold text-[11px]">
              JLPT {activeBreakingNews.jlpt}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-semibold text-[11px]">
              {activeBreakingNews.topic}
            </span>
            <a
              href={activeBreakingNews.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              <span>Nguồn: {activeBreakingNews.sourceName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-japanese text-stone-900 dark:text-stone-100 leading-snug">
              {activeBreakingNews.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed font-medium">
              {activeBreakingNews.titleVi}
            </p>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenBreakingNewsArticle}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Đọc toàn bài với Furigana & Phân tích</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleSpeakBreakingNews(activeBreakingNews.title)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 text-xs font-semibold transition-colors"
            >
              <Volume2 className="w-4 h-4 text-stone-500" />
              <span>Nghe đọc tiêu đề</span>
            </button>

            <button
              onClick={() => setIsSenseiOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>Hỏi AI Sensei về bài này</span>
            </button>
          </div>
        </div>

        {/* Live Ticker Mini-Selector */}
        <div className="pt-3 border-t border-rose-100 dark:border-stone-800/80">
          <div className="text-[11px] text-stone-400 font-semibold mb-2">
            Các tin nóng khác trong ngày (Bấm để xem):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {liveNewsTicker.slice(0, 3).map((item, idx) => (
              <button
                key={item.id || idx}
                onClick={() => setActiveNewsIdx(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all text-xs flex items-center justify-between gap-2 ${
                  activeNewsIdx === idx
                    ? 'bg-white dark:bg-stone-800 border-rose-400 ring-1 ring-rose-400 shadow-xs'
                    : 'bg-stone-50/60 dark:bg-stone-900/40 border-stone-200/60 dark:border-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="truncate">
                  <div className="font-japanese font-bold text-stone-900 dark:text-stone-100 truncate text-[11px]">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                    <span>{item.sourceName}</span>
                    <span>•</span>
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Cultural Trivia & Continue Reading */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Col 1 & 2: Cultural Trivia (今日の日本トリビア) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 font-japanese">
                今日の日本トリビア
                <span className="text-xs font-normal font-sans text-stone-500">
                  (Sự thật thú vị về văn hóa Nhật Bản)
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleShuffleTrivia}
                title="Xem sự thật khác"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đổi sự thật</span>
              </button>
            </div>
          </div>

          {/* Trivia Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-600 dark:text-stone-400">
                  {currentTrivia.category}
                </span>
                <h3 className="text-xl font-bold font-japanese text-stone-900 dark:text-stone-100 mt-2">
                  {currentTrivia.titleJa}
                </h3>
                <h4 className="text-sm font-medium text-stone-600 dark:text-stone-400 mt-0.5">
                  {currentTrivia.titleVi}
                </h4>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handleSpeakTrivia}
                  title="Nghe phát âm tiếng Nhật"
                  className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsTriviaFavorite(prev => !prev)}
                  title="Yêu thích"
                  className={`p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 transition-colors ${
                    isTriviaFavorite ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cultural Keyword highlight box */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 space-y-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold font-japanese text-rose-600 dark:text-rose-400">
                  {currentTrivia.keywordJa}
                </span>
                <span className="text-xs text-stone-500 font-japanese">
                  {currentTrivia.keywordReading}
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Hán tự: {currentTrivia.keywordHanViet}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                {currentTrivia.keywordExplanation}
              </p>
            </div>

            {/* Content paragraph */}
            <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              <p className="font-japanese font-medium text-stone-900 dark:text-stone-100">
                {currentTrivia.contentJa}
              </p>
              <p className="text-stone-600 dark:text-stone-400 italic">
                {currentTrivia.contentVi}
              </p>
            </div>

            {/* Claim Reward Button */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                Mỗi ngày mở một điều thú vị mới về nước Nhật
              </span>
              <button
                onClick={() => claimTrivia(currentTrivia.id)}
                disabled={isTriviaClaimed}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  isTriviaClaimed
                    ? 'bg-stone-100 dark:bg-stone-800 text-emerald-600 dark:text-emerald-400 cursor-default'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {isTriviaClaimed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Đã nhận +5 XP hôm nay</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Nhận thưởng +5 XP</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Col 3: Continue Reading & Weekly Activity Widget */}
        <div className="space-y-6">
          {/* Continue Reading Card */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-600" />
              <span>Tiếp tục bài đang đọc</span>
            </h2>

            <div
              onClick={() => selectArticle(continueArticle)}
              className="p-5 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:border-rose-300 dark:hover:border-rose-700 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold">
                  JLPT {continueArticle.jlptLevel}
                </span>
                <span className="text-stone-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {continueArticle.readTimeMinutes} phút
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold font-japanese text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {continueArticle.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                  {continueArticle.titleVi}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-rose-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>Vào đọc ngay</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Weekly Learning Activity Chart */}
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                Thời gian học trong tuần
              </span>
              <span className="text-xs text-stone-400">7 ngày gần nhất</span>
            </div>

            {/* Bar chart representation */}
            <div className="flex items-end justify-between gap-2 h-24 pt-4 px-2">
              {[
                { day: 'T2', mins: 15 },
                { day: 'T3', mins: 25 },
                { day: 'T4', mins: 20 },
                { day: 'T5', mins: 35 },
                { day: 'T6', mins: 10 },
                { day: 'T7', mins: 0 },
                { day: 'CN', mins: 0 }
              ].map((item, idx) => {
                const heightPercent = item.mins > 0 ? Math.min(100, (item.mins / 40) * 100) : 8;
                const isToday = item.day === 'T6';

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full flex items-end justify-center h-16">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[20px] rounded-t-lg transition-all ${
                          isToday
                            ? 'bg-rose-600 shadow-xs'
                            : item.mins > 0
                            ? 'bg-stone-300 dark:bg-stone-700'
                            : 'bg-stone-100 dark:bg-stone-800'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] text-stone-500 font-medium">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Official Press Agencies Hub Showcase */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200/60 dark:border-rose-850">
              <Globe className="w-3.5 h-3.5" />
              <span>Cổng Thông Tấn Chính Thống Đa Quốc Gia</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
              58+ Đài Truyền Hình, Hãng Tin & Tòa Soạn Báo Chí Chính Thống
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Tích hợp đầy đủ các kênh truyền thông quốc gia Việt Nam (VTV, VTV Today, VNA, Nhân Dân, VOV...), Nhật Bản (NHK, Kyodo, Nikkei, Asahi...) và quốc tế (Reuters, Bloomberg, AP, WSJ, BBC...).
            </p>
          </div>

          <button
            onClick={() => setActiveTab('press')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-rose-600 dark:hover:bg-rose-600 text-white dark:text-stone-900 dark:hover:text-white text-xs font-semibold whitespace-nowrap transition-colors shadow-xs"
          >
            <span>Mở Cổng Thông Tấn</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Agency Quick Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-2">
          {[
            { id: 'vietnam_today_vtv', name: 'Vietnam Today VTV', flag: '🇻🇳', badge: 'VTV4' },
            { id: 'vna_net', name: 'VNA Net (TTXVN)', flag: '🇻🇳', badge: 'Thông tấn xã' },
            { id: 'nhk_easy', name: 'NHK NEWS EASY', flag: '🇯🇵', badge: 'NHKやさしい' },
            { id: 'kyodo_news', name: 'Kyodo News', flag: '🇯🇵', badge: '共同通信' },
            { id: 'nikkei', name: 'Nikkei (日経)', flag: '🇯🇵', badge: 'Kinh tế' },
            { id: 'reuters_japan', name: 'Reuters Japan', flag: '🌐', badge: 'Quốc tế' }
          ].map(agency => (
            <button
              key={agency.id}
              onClick={() => openArticlesWithSource(agency.id as any)}
              className="p-3 rounded-xl border border-stone-200/70 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/50 hover:border-rose-400 hover:bg-white dark:hover:bg-stone-800 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{agency.flag}</span>
                <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 font-mono">
                  {agency.badge}
                </span>
              </div>
              <div className="font-bold text-xs text-stone-900 dark:text-stone-100 mt-1 truncate group-hover:text-rose-600 transition-colors">
                {agency.name}
              </div>
              <div className="text-[10px] text-stone-400 mt-0.5">
                Bấm xem bài →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Fast Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          {
            title: 'Cổng Thông Tấn (58+)',
            desc: 'Danh bạ tòa soạn & thông tấn xã',
            icon: <Globe className="w-5 h-5 text-rose-500" />,
            tab: 'press'
          },
          {
            title: 'Luyện nghe & Shadowing',
            desc: 'Nghe đối chiếu và ghi âm giọng đọc',
            icon: <Headphones className="w-5 h-5 text-indigo-500" />,
            tab: 'listening'
          },
          {
            title: 'Sổ từ & Flashcard',
            desc: 'Ôn tập từ vựng ngắt quãng SRS',
            icon: <Layers className="w-5 h-5 text-amber-500" />,
            tab: 'flashcards'
          },
          {
            title: 'JLPT Simulator',
            desc: 'Mô phỏng bài thi đọc hiểu có bấm giờ',
            icon: <GraduationCap className="w-5 h-5 text-emerald-500" />,
            tab: 'simulator'
          },
          {
            title: 'Tạo bài đọc mới bằng AI',
            desc: 'Chuẩn báo chí Kilala, LocoBee, Nikkei',
            icon: <Newspaper className="w-5 h-5 text-rose-500" />,
            action: () => setIsSenseiOpen(true)
          },
          {
            title: 'Hỏi AI Sensei',
            desc: 'Phân tích sâu ngữ pháp & trợ từ',
            icon: <Bot className="w-5 h-5 text-purple-500" />,
            action: () => setIsSenseiOpen(true)
          }
        ].map((feat, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (feat.action) feat.action();
              else if (feat.tab) setActiveTab(feat.tab as any);
            }}
            className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 transition-all cursor-pointer shadow-xs group flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 w-fit group-hover:scale-105 transition-transform">
                {feat.icon}
              </div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-3">
                {feat.title}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {feat.desc}
              </p>
            </div>
            <div className="pt-2 mt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center justify-between">
              <span>Mở tính năng</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Articles Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              Bài đọc đề xuất theo trình độ (200+ bài / lĩnh vực)
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Chọn cấp độ JLPT phù hợp để bắt đầu luyện đọc với Furigana, âm Hán Việt và bản dịch song ngữ
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800/80 rounded-xl p-1 border border-stone-200 dark:border-stone-700 text-xs font-semibold overflow-x-auto">
            {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedLevelFilter === lvl
                    ? 'bg-white dark:bg-stone-900 text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {lvl === 'ALL' ? 'Tất cả' : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid (Top 9) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(0, 9).map(art => (
            <div
              key={art.id}
              onClick={() => selectArticle(art)}
              className="p-5 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-rose-300 dark:hover:border-rose-800 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-[11px]">
                    {art.topic}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-bold text-[11px]">
                    JLPT {art.jlptLevel}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-japanese text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {art.titleVi}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {art.readTimeMinutes} phút đọc
                </span>
                <span className="font-semibold text-rose-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Đọc bài <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View all articles button */}
        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('articles')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.01]"
          >
            <span>Khám phá toàn bộ 2,400+ bài báo trong Thư viện (200+ bài / 12 Lĩnh vực • N5–N1)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
