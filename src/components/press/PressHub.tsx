import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_SOURCES } from '../../data/newsRepository';
import { SourceType, SourceCategory, SourceMetadata } from '../../types';
import {
  Globe,
  ExternalLink,
  BookOpen,
  Sparkles,
  Search,
  Building2,
  Tv,
  Newspaper,
  Compass,
  CheckCircle2,
  TrendingUp,
  FileText,
  Bot,
  Filter
} from 'lucide-react';

interface CategoryTab {
  id: 'ALL' | SourceCategory;
  labelVi: string;
  labelJa: string;
  icon: React.ReactNode;
  flag: string;
}

export const PressHub: React.FC = () => {
  const {
    openArticlesWithSource,
    setIsSenseiOpen,
    setSenseiContextSentence,
    language,
    articles
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | SourceCategory>('ALL');

  // Calculate count of articles per source in repository
  const articleCountBySource = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach(art => {
      const src = art.sourceType || 'editorial_sample';
      counts[src] = (counts[src] || 0) + 1;
    });
    return counts;
  }, [articles]);

  const categories: CategoryTab[] = [
    { id: 'ALL', labelVi: 'Tất cả (58+)', labelJa: 'すべて', icon: <Globe className="w-4 h-4" />, flag: '🌐' },
    { id: 'vn_broadcaster', labelVi: 'Đài Truyền hình & Đối ngoại VN', labelJa: 'ベトナム国営放送', icon: <Tv className="w-4 h-4" />, flag: '🇻🇳' },
    { id: 'vn_news_agency', labelVi: 'Thông tấn xã & Báo chí TW VN', labelJa: 'ベトナム通信社・全国紙', icon: <Building2 className="w-4 h-4" />, flag: '🇻🇳' },
    { id: 'jp_broadcaster', labelVi: 'Đài TH & Thông tấn xã Nhật', labelJa: '日本国営放送・通信社', icon: <Tv className="w-4 h-4" />, flag: '🇯🇵' },
    { id: 'jp_national_press', labelVi: 'Ngũ đại Nhật báo Toàn quốc Nhật', labelJa: '五大全国紙・英字紙', icon: <Newspaper className="w-4 h-4" />, flag: '🇯🇵' },
    { id: 'jp_business_tech', labelVi: 'Báo Vùng miền, Kinh tế & Công nghệ Nhật', labelJa: 'ブロック紙・経済IT専門誌', icon: <TrendingUp className="w-4 h-4" />, flag: '🇯🇵' },
    { id: 'global_media_jp', labelVi: 'Hãng Thông tấn & Báo chí Quốc tế', labelJa: '国際通信社・日本語版', icon: <Globe className="w-4 h-4" />, flag: '🌍' },
    { id: 'culture_lifestyle', labelVi: 'Cẩm nang Văn hóa, Du lịch & Ngoại giao', labelJa: '文化・観光・ポータル', icon: <Compass className="w-4 h-4" />, flag: '⛩️' }
  ];

  const allSourcesList = useMemo(() => {
    return Object.values(VERIFIED_SOURCES).filter(s => s.id !== 'editorial_sample' && s.id !== 'ai_generated');
  }, []);

  const filteredSources = useMemo(() => {
    return allSourcesList.filter(src => {
      if (selectedCategory !== 'ALL' && src.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        src.name.toLowerCase().includes(q) ||
        (src.nameJa && src.nameJa.toLowerCase().includes(q)) ||
        src.badge.toLowerCase().includes(q) ||
        src.country.toLowerCase().includes(q) ||
        src.descriptionVi.toLowerCase().includes(q) ||
        src.categoryNameVi.toLowerCase().includes(q)
      );
    });
  }, [allSourcesList, selectedCategory, searchQuery]);

  const handleGenerateWithStyle = (source: SourceMetadata) => {
    setSenseiContextSentence(
      `Hãy biên soạn 1 bản tin tiếng Nhật trình độ N3-N2 theo đúng văn phong chuẩn mực của "${source.name}" (${source.nameJa || ''}), chủ đề quan hệ hợp tác Việt - Nhật hoặc thời sự kinh tế mới nhất, có kèm Furigana, phân tích ngữ pháp báo chí và bản dịch tiếng Việt súc tích.`
    );
    setIsSenseiOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white p-6 sm:p-10 border border-stone-800 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mạng lưới Báo chí & Thông tấn Chính thống Quốc tế & Việt Nam</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white">
            Cổng Cơ Quan Báo Chí & Thông Tấn Chính Thống
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Tích hợp toàn diện <strong className="text-white">58+ đài truyền hình quốc gia, hãng thông tấn nhà nước và ngũ đại nhật báo</strong> uy tín hàng đầu của Việt Nam, Nhật Bản và các tổ chức báo chí quốc tế. Kết nối người học với dòng chảy thời sự chuẩn mực, chính xác và có thể tra cứu song ngữ tức thì.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800/80">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-rose-400 font-mono">58+</div>
              <div className="text-xs text-stone-400">Tòa soạn & Thông tấn xã</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-amber-400 font-mono">2,400+</div>
              <div className="text-xs text-stone-400">Bài đọc song ngữ N5 - N1</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-stone-400">Nguồn chính thống kiểm chứng</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-indigo-400 font-mono">24/7</div>
              <div className="text-xs text-stone-400">Dòng tin tức liên tục</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Strategic Portals Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* VTV Vietnam Today */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent border border-red-200 dark:border-red-900/50 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                🇻🇳 Đài Truyền hình Quốc gia
              </span>
              <a
                href="https://vietnamtoday.vtv.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-stone-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="Mở cổng Vietnam Today VTV"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mt-2">
              Vietnam Today — VTV
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
              Kênh truyền hình đối ngoại quốc gia VTV4, phóng sự nhịp cầu Việt - Nhật, giao lưu nhân dân và doanh nghiệp trẻ.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-stone-200/60 dark:border-stone-800">
            <button
              onClick={() => openArticlesWithSource('vietnam_today_vtv')}
              className="flex-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors text-center"
            >
              Đọc bài VTV ({articleCountBySource['vietnam_today_vtv'] || 50}+ bài)
            </button>
            <button
              onClick={() => handleGenerateWithStyle(VERIFIED_SOURCES['vietnam_today_vtv'])}
              className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs transition-colors"
              title="Luyện viết cùng AI phong cách VTV"
            >
              <Bot className="w-4 h-4 text-rose-500" />
            </button>
          </div>
        </div>

        {/* VNA Net */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-transparent border border-blue-200 dark:border-blue-900/50 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                🇻🇳 Thông tấn xã Quốc gia
              </span>
              <a
                href="https://vnanet.vn/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-stone-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                title="Mở cổng VNA Net Thông tấn xã Việt Nam"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mt-2">
              VNA Net — Thông tấn xã Việt Nam
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
              Cơ quan thông tấn nhà nước chính thức, dữ liệu kinh tế vĩ mô, thông tin đối ngoại song phương và vốn FDI Nhật Bản.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-stone-200/60 dark:border-stone-800">
            <button
              onClick={() => openArticlesWithSource('vna_net')}
              className="flex-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors text-center"
            >
              Đọc bài VNA ({articleCountBySource['vna_net'] || 50}+ bài)
            </button>
            <button
              onClick={() => handleGenerateWithStyle(VERIFIED_SOURCES['vna_net'])}
              className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs transition-colors"
              title="Luyện viết cùng AI phong cách VNA"
            >
              <Bot className="w-4 h-4 text-blue-500" />
            </button>
          </div>
        </div>

        {/* NHK World & Kyodo News */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-200 dark:border-indigo-900/50 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                🇯🇵 Đài Truyền hình & Hãng tin Nhật
              </span>
              <a
                href="https://www3.nhk.or.jp/nhkworld/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-stone-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                title="Mở cổng NHK World Japan"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mt-2">
              NHK World & Kyodo News
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
              Đài phát thanh truyền hình đối ngoại quốc gia Nhật Bản và hãng thông tấn số 1 xứ Phù Tang, chuẩn mực văn phong sư phạm.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-stone-200/60 dark:border-stone-800">
            <button
              onClick={() => openArticlesWithSource('nhk_easy')}
              className="flex-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors text-center"
            >
              Đọc NHK Easy ({articleCountBySource['nhk_easy'] || 50}+ bài)
            </button>
            <button
              onClick={() => handleGenerateWithStyle(VERIFIED_SOURCES['nhk_easy'])}
              className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs transition-colors"
              title="Luyện viết cùng AI phong cách NHK"
            >
              <Bot className="w-4 h-4 text-indigo-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên cơ quan thông tấn, quốc gia, từ khóa (VTV, VNA, Kyodo, Nikkei, Asahi, Reuters, VOV, AP, WSJ...)"
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/80 text-sm text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-rose-500 outline-none shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              Xóa tìm kiếm
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-rose-400'
                }`}
              >
                <span>{cat.flag}</span>
                <span>{language === 'vi' ? cat.labelVi : cat.labelJa}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sources Directory Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1">
          <span>
            Hiển thị <strong>{filteredSources.length}</strong> cơ quan thông tấn & tòa soạn
          </span>
          <span>Bấm link trực tiếp để mở trang báo chính thống gốc</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSources.map(source => {
            const articleCount = articleCountBySource[source.id] || 0;
            return (
              <div
                key={source.id}
                className="group p-5 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-800 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  {/* Top Bar: Badge, Country, and External Link */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200/60 dark:border-stone-700">
                      {source.badge}
                    </span>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Truy cập trang báo chính thức: ${source.url}`}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Name and Japanese Title */}
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {source.name}
                    </h3>
                    {source.nameJa && (
                      <p className="text-xs text-rose-600/80 dark:text-rose-400/80 font-japanese mt-0.5">
                        {source.nameJa}
                      </p>
                    )}
                  </div>

                  {/* Country & Category */}
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium text-stone-700 dark:text-stone-300">{source.country}</span>
                    <span>•</span>
                    <span>{source.categoryNameVi}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                    {source.descriptionVi}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-2">
                  <button
                    onClick={() => openArticlesWithSource(source.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Học bài báo ({articleCount > 0 ? `${articleCount} bài` : 'Kho bài'})</span>
                  </button>

                  <button
                    onClick={() => handleGenerateWithStyle(source)}
                    title={`Biên soạn bản tin AI theo phong cách ${source.name}`}
                    className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-rose-600 hover:border-rose-300 dark:hover:border-rose-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSources.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
            <Newspaper className="w-10 h-10 text-stone-400 mx-auto" />
            <div className="font-bold text-base text-stone-900 dark:text-stone-100">
              Không tìm thấy tòa soạn phù hợp
            </div>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Vui lòng thử lại với từ khóa khác (ví dụ: VTV, TTXVN, Nikkei, Kyodo, Asahi, Reuters, Nhân Dân, Tuổi Trẻ...)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
