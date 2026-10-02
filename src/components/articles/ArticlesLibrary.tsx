import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { JLPTLevel, TopicCategory, Article, SourceType } from '../../types';
import { VERIFIED_SOURCES, ALL_TOPICS } from '../../data/newsRepository';
import { PressDirectoryModal } from './PressDirectoryModal';
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Bot,
  Globe2,
  RefreshCw,
  ExternalLink,
  Layers,
  Newspaper
} from 'lucide-react';

export const ArticlesLibrary: React.FC = () => {
  const {
    articles,
    selectArticle,
    setActiveTab,
    userProfile,
    setIsSenseiOpen,
    refreshLiveNews,
    isRefreshingNews,
    lastLiveUpdated,
    filterSourceByPress,
    setFilterSourceByPress
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | JLPTLevel>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<'ALL' | TopicCategory>('ALL');
  const [selectedSource, setSelectedSource] = useState<'ALL' | SourceType>(() => filterSourceByPress || 'ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'unread' | 'completed'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPressDirectoryOpen, setIsPressDirectoryOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    if (filterSourceByPress) {
      setSelectedSource(filterSourceByPress);
      setCurrentPage(1);
    }
  }, [filterSourceByPress]);

  // Domain article count mapping
  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_TOPICS.forEach(t => {
      counts[t] = articles.filter(a => a.topic === t).length;
    });
    return counts;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      // Search
      const matchesSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase());

      // Level
      const matchesLevel = selectedLevel === 'ALL' || art.jlptLevel === selectedLevel;

      // Topic
      const matchesTopic = selectedTopic === 'ALL' || art.topic === selectedTopic;

      // Source
      const matchesSource = selectedSource === 'ALL' || art.sourceType === selectedSource;

      // Status
      const isCompleted = userProfile.completedArticleIds.includes(art.id);
      const matchesStatus =
        selectedStatus === 'ALL' ||
        (selectedStatus === 'completed' && isCompleted) ||
        (selectedStatus === 'unread' && !isCompleted);

      return matchesSearch && matchesLevel && matchesTopic && matchesSource && matchesStatus;
    });
  }, [articles, searchQuery, selectedLevel, selectedTopic, selectedSource, selectedStatus, userProfile.completedArticleIds]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Time formatter
  const formatTimeAgo = (isoDate: string) => {
    try {
      const diffMs = Date.now() - new Date(isoDate).getTime();
      const diffMins = Math.floor(diffMs / (60 * 1000));
      if (diffMins < 60) return `${Math.max(1, diffMins)} phút trước`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} giờ trước`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) return `${diffDays} ngày trước`;
      return new Date(isoDate).toLocaleDateString('vi-VN');
    } catch {
      return 'Gần đây';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Kho học liệu báo chí đa lĩnh vực: 200+ bài / mỗi lĩnh vực • Đầy đủ 12 lĩnh vực • N5–N1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans tracking-tight">
            Thư viện 2,400+ bài báo tiếng Nhật (ニュース一覧)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-3xl leading-relaxed">
            Tuyển chọn và biên tập sư phạm chuẩn mực từ các cơ quan thông tấn và cẩm nang uy tín trong và ngoài nước: Vietnam Today (VTV), VNA Net, Kyodo News, NHK World, The Japan Times, Toyo Keizai, Sankei, Nippon.com, Tuổi Trẻ, Báo Nhân Dân, Kilala, Tsunagu Japan, LocoBee, Japan Travel (JNTO), Taste of Japan (MAFF), NHK Easy, Nikkei, Yahoo! Japan, Asahi, Mainichi, VOV World và Vietnam+.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsPressDirectoryOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs font-bold transition-all shadow-xs"
          >
            <Globe2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Danh bạ 40+ Hãng tin & Báo chí</span>
          </button>

          <button
            onClick={() => refreshLiveNews()}
            disabled={isRefreshingNews}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingNews ? 'animate-spin text-rose-600' : ''}`} />
            <span>Đồng bộ tin mới</span>
          </button>

          <button
            onClick={() => setIsSenseiOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tạo bài đọc mới bằng AI</span>
          </button>
        </div>
      </div>

      {/* AI Journalistic Article Generator Callout Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            <span>Biên tập viên AI sư phạm (AI Sensei)</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold">
            Tạo bài đọc mới bằng AI — Văn phong chuẩn báo chí & Cẩm nang đời sống
          </h3>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Tự động biên soạn bài đọc theo phong cách Kilala, Tsunagu Japan, LocoBee, Japan Travel hay Nikkei theo bất kỳ từ khóa nào bạn yêu cầu, đầy đủ Furigana, âm Hán Việt, phân tích ngữ pháp và câu hỏi hiểu bài.
          </p>
        </div>

        <button
          onClick={() => setIsSenseiOpen(true)}
          className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shrink-0 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Biên soạn bài theo yêu cầu (+10 XP)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Domain Quick Overview Badges */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
          <span>Khám phá theo 12 lĩnh vực chính (Mỗi lĩnh vực 200+ bài viết chuyên sâu):</span>
          <span className="font-bold text-rose-600 dark:text-rose-400">Tổng số: {articles.length} bài</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {ALL_TOPICS.map(topic => {
            const isSelected = selectedTopic === topic;
            const count = topicCounts[topic] || 200;
            return (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(isSelected ? 'ALL' : topic);
                  setCurrentPage(1);
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm ring-2 ring-rose-400'
                    : 'bg-white dark:bg-stone-900/60 text-stone-800 dark:text-stone-200 border-stone-200/80 dark:border-stone-800 hover:border-rose-400'
                }`}
              >
                <div className="text-xs font-bold truncate">{topic}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-rose-100' : 'text-stone-400'}`}>
                  {count}+ bài báo
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs">
        {/* Row 1: Search Input, Source Selector, Status */}
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm kiếm theo tiêu đề tiếng Nhật, tiếng Việt hoặc từ khóa..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          {/* Source filter */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <span className="text-xs text-stone-500 whitespace-nowrap">Nguồn báo:</span>
            <select
              value={selectedSource}
              onChange={e => {
                setSelectedSource(e.target.value as any);
                setFilterSourceByPress(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 outline-none w-full lg:w-56"
            >
              <option value="ALL">Tất cả nguồn báo uy tín (58+)</option>
              <optgroup label="🇻🇳 Đài Truyền hình & Cơ quan Quốc gia Việt Nam">
                <option value="vietnam_today_vtv">Vietnam Today — VTV</option>
                <option value="vtv_news">VTV News — Báo Điện tử VTV</option>
                <option value="vna_net">VNA Net — Thông tấn xã VN</option>
                <option value="vietnam_plus">Vietnam+ tiếng Nhật (TTXVN)</option>
                <option value="vov_world">VOV WORLD 日本語放送</option>
                <option value="vov_vn">VOV.VN — Tiếng nói Việt Nam</option>
                <option value="nhan_dan">Báo Nhân Dân Online</option>
                <option value="qdnd">Báo Quân đội Nhân dân</option>
                <option value="vgp_news">Báo Điện tử Chính phủ (VGP)</option>
                <option value="tuoi_tre">Tuổi Trẻ News</option>
                <option value="thanh_nien">Báo Thanh Niên</option>
                <option value="vnexpress_intl">VnExpress International</option>
                <option value="lao_dong">Báo Lao Động</option>
                <option value="dantri">Báo Dân trí</option>
                <option value="sggp">Báo Sài Gòn Giải Phóng</option>
                <option value="saigon_times">The Saigon Times</option>
                <option value="vneconomy">VnEconomy (Kinh tế VN)</option>
              </optgroup>
              <optgroup label="🇯🇵 Đài Truyền hình & Hãng tin Quốc gia Nhật">
                <option value="nhk_easy">NHK NEWS WEB EASY</option>
                <option value="nhk_news">NHK NEWS WEB (総合)</option>
                <option value="nhk_world">NHK WORLD-JAPAN</option>
                <option value="kyodo_news">共同通信社 (Kyodo News)</option>
                <option value="jiji_press">時事通信社 (Jiji Press)</option>
              </optgroup>
              <optgroup label="🇯🇵 Ngũ đại Nhật báo Toàn quốc Nhật Bản">
                <option value="nikkei">日本経済新聞 (Nikkei)</option>
                <option value="asahi">朝日新聞 (Asahi Shimbun)</option>
                <option value="mainichi">毎日新聞 (Mainichi)</option>
                <option value="yomiuri">読売新聞 (Yomiuri)</option>
                <option value="sankei">産経新聞 (Sankei)</option>
                <option value="tokyo_shimbun">東京新聞 (Tokyo Shimbun)</option>
                <option value="japan_times">The Japan Times</option>
              </optgroup>
              <optgroup label="🇯🇵 Báo Vùng miền & Tạp chí Kinh tế - Công nghệ Nhật">
                <option value="toyo_keizai">東洋経済 (Toyo Keizai)</option>
                <option value="diamond_online">Diamond Online</option>
                <option value="nikkei_business">日経ビジネス (Nikkei Business)</option>
                <option value="itmedia">ITmedia ニュース</option>
                <option value="pr_times">PR TIMES</option>
                <option value="chunichi">中日新聞 (Chunichi)</option>
                <option value="nishinippon">西日本新聞 (Nishinippon)</option>
                <option value="hokkaido_np">北海道新聞 (Hokkaido Shimbun)</option>
                <option value="nikkan_kogyo">日刊工業新聞 (Nikkan Kogyo)</option>
              </optgroup>
              <optgroup label="🌐 Hãng Thông tấn & Báo chí Quốc tế tiếng Nhật">
                <option value="reuters_japan">ロイター (Reuters Japan)</option>
                <option value="bloomberg_japan">Bloomberg Japan</option>
                <option value="ap_news">AP通信 (Associated Press)</option>
                <option value="wsj_japan">WSJ Japan (ウォール街)</option>
                <option value="bbc_japan">BBC ニュース 日本語</option>
                <option value="cnn_japan">CNN.co.jp</option>
                <option value="afpbb_news">AFPBB News (フランス通信)</option>
                <option value="forbes_japan">Forbes JAPAN</option>
                <option value="courrier_japon">COURRiER Japon</option>
                <option value="yonhap_japan">聯合ニュース (Yonhap Japan)</option>
                <option value="dw_japan">Deutsche Welle (ドイツ国際)</option>
              </optgroup>
              <optgroup label="⛩️ Cẩm nang Văn hóa, Ngoại giao & Đời sống">
                <option value="yahoo_news">Yahoo! JAPAN ニュース</option>
                <option value="nippon_com">Nippon.com</option>
                <option value="kilala">Cẩm nang Kilala Nhật Bản</option>
                <option value="tsunagu_japan">Tsunagu Japan</option>
                <option value="locobee">LocoBee (Đời sống Nhật)</option>
                <option value="japan_travel">Japan Travel (JNTO)</option>
                <option value="taste_of_japan">Taste of Japan (MAFF)</option>
              </optgroup>
              <optgroup label="🎓 Học liệu Biên soạn Sư phạm & AI">
                <option value="ai_generated">AI Sensei biên soạn</option>
                <option value="editorial_sample">Ban biên tập biên soạn</option>
              </optgroup>
            </select>

            <button
              onClick={() => setActiveTab('press')}
              title="Khám phá Cổng 58+ Tòa soạn & Hãng thông tấn chính thống"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              <Newspaper className="w-3.5 h-3.5 text-rose-500" />
              <span>Cổng Thông Tấn</span>
            </button>
          </div>

          {/* Read status filter */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <span className="text-xs text-stone-500 whitespace-nowrap">Trạng thái:</span>
            <select
              value={selectedStatus}
              onChange={e => {
                setSelectedStatus(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 outline-none w-full lg:w-auto"
            >
              <option value="ALL">Tất cả bài</option>
              <option value="unread">Chưa đọc</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>
        </div>

        {/* Row 2: JLPT Level Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-500 font-semibold whitespace-nowrap">Cấp độ JLPT:</span>
          {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                selectedLevel === lvl
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {lvl === 'ALL' ? 'Tất cả cấp độ (N5–N1)' : lvl}
            </button>
          ))}

          {selectedTopic !== 'ALL' && (
            <button
              onClick={() => setSelectedTopic('ALL')}
              className="ml-auto text-rose-600 hover:underline text-xs whitespace-nowrap"
            >
              Xóa bộ lọc chuyên mục ({selectedTopic})
            </button>
          )}
        </div>
      </div>

      {/* Result Count Status */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          Hiển thị <strong>{paginatedArticles.length}</strong> / <strong>{filteredArticles.length}</strong> bài báo phù hợp
        </span>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
      </div>

      {/* Articles Grid (12 per page) */}
      {paginatedArticles.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-3">
          <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            Không tìm thấy bài đọc nào phù hợp
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Hãy thử nới lỏng các bộ lọc nguồn báo, cấp độ JLPT hoặc từ khóa tìm kiếm.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map(art => {
            const isCompleted = userProfile.completedArticleIds.includes(art.id);
            const sourceInfo = VERIFIED_SOURCES[art.sourceType];

            return (
              <div
                key={art.id}
                onClick={() => selectArticle(art)}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-[11px]">
                      {art.topic}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isCompleted && (
                        <span className="text-emerald-600 flex items-center gap-1 font-semibold text-[11px]">
                          <CheckCircle className="w-3.5 h-3.5" /> Đã đọc
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white font-bold text-[11px]">
                        JLPT {art.jlptLevel}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-japanese text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mt-1">
                      {art.titleVi}
                    </p>
                  </div>

                  {/* Source tag & Publish timestamp */}
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                    <span className="flex items-center gap-1 text-stone-500 font-medium truncate max-w-[170px]">
                      <Globe2 className="w-3 h-3 text-stone-400 shrink-0" />
                      {sourceInfo ? sourceInfo.badge : art.sourceName}
                    </span>
                    <span>{formatTimeAgo(art.publishedAt)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTimeMinutes} phút
                    </span>
                    <span>• {art.wordCount} từ</span>
                  </div>

                  <span className="font-semibold text-rose-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Đọc ngay <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-600 disabled:opacity-40"
          >
            Trang trước
          </button>

          {Array.from({ length: Math.min(10, totalPages) }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-semibold transition-colors ${
                  currentPage === pageNum
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {totalPages > 10 && (
            <span className="text-xs text-stone-400 px-1">... ({totalPages} trang)</span>
          )}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-600 disabled:opacity-40"
          >
            Trang sau
          </button>
        </div>
      )}

      {/* Press Directory Modal */}
      <PressDirectoryModal
        isOpen={isPressDirectoryOpen}
        onClose={() => setIsPressDirectoryOpen(false)}
        onSelectSourceFilter={src => {
          setSelectedSource(src);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};
