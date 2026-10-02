import React, { useState, useMemo } from 'react';
import { SourceType, SourceCategory, SourceMetadata } from '../../types';
import { VERIFIED_SOURCES } from '../../data/newsRepository';
import { useApp } from '../../context/AppContext';
import {
  Globe2,
  X,
  Search,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  Building2,
  Radio,
  Newspaper,
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface PressDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSourceFilter: (source: SourceType) => void;
}

export const PressDirectoryModal: React.FC<PressDirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectSourceFilter
}) => {
  const { articles, setIsSenseiOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | SourceCategory>('ALL');

  const sourceList = useMemo(() => {
    return Object.values(VERIFIED_SOURCES).filter(s => s.id !== 'editorial_sample' && s.id !== 'ai_generated');
  }, []);

  // Calculate article counts per source
  const sourceArticleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach(a => {
      counts[a.sourceType] = (counts[a.sourceType] || 0) + 1;
    });
    return counts;
  }, [articles]);

  const categories: Array<{ id: 'ALL' | SourceCategory; labelVi: string; icon: React.ReactNode }> = [
    { id: 'ALL', labelVi: 'Tất cả (40+ Tòa soạn)', icon: <Globe2 className="w-3.5 h-3.5" /> },
    { id: 'vn_broadcaster', labelVi: 'Truyền hình & Đối ngoại VN', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'vn_news_agency', labelVi: 'Thông tấn & Chính luận VN', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'jp_broadcaster', labelVi: 'Hãng tin & NHK Nhật Bản', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'jp_national_press', labelVi: 'Ngũ đại Nhật báo Nhật', icon: <Newspaper className="w-3.5 h-3.5" /> },
    { id: 'jp_business_tech', labelVi: 'Kinh tế & Công nghệ Nhật', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'global_media_jp', labelVi: 'Hãng tin Quốc tế tiếng Nhật', icon: <Globe2 className="w-3.5 h-3.5" /> },
    { id: 'culture_lifestyle', labelVi: 'Cẩm nang Văn hóa & Đời sống', icon: <Sparkles className="w-3.5 h-3.5" /> }
  ];

  const filteredSources = useMemo(() => {
    return sourceList.filter(s => {
      const matchesCategory = activeCategory === 'ALL' || s.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        s.name.toLowerCase().includes(q) ||
        (s.nameJa && s.nameJa.toLowerCase().includes(q)) ||
        s.country.toLowerCase().includes(q) ||
        s.badge.toLowerCase().includes(q) ||
        s.descriptionVi.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [sourceList, activeCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] bg-[#FBFBFA] dark:bg-[#15171B] border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-rose-600/20">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg sm:text-xl font-sans">
                  Trung tâm Báo chí & Thông tấn Chính thống
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold">
                  {sourceList.length}+ Cơ quan
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Danh bạ toàn diện các đài truyền hình, cơ quan thông tấn, ngũ đại nhật báo và tạp chí uy tín trong và ngoài nước
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên tòa soạn, cơ quan (vd: VTV, VNA, Kyodo, Nikkei, Reuters, Tuổi Trẻ, Kilala)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          {/* Categories Tab Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {categories.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white dark:bg-stone-850 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.labelVi}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sources Grid Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Hiển thị {filteredSources.length} cơ quan báo chí chính thống</span>
            <span>Mỗi bài báo đều được đính kèm bản quyền & liên kết trực tiếp</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSources.map(source => {
              const count = sourceArticleCounts[source.id] || 0;
              return (
                <div
                  key={source.id}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[11px] font-bold text-stone-700 dark:text-stone-300">
                        {source.badge}
                      </span>
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                        {count > 0 ? `${count}+ bài đọc` : 'Cập nhật liên tục'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                        {source.name}
                      </h4>
                      {source.nameJa && (
                        <p className="font-japanese text-xs text-stone-500 font-medium mt-0.5">
                          {source.nameJa}
                        </p>
                      )}
                    </div>

                    <div className="text-[11px] text-stone-400 font-medium">
                      {source.country}
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {source.descriptionVi}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs gap-2">
                    <button
                      onClick={() => {
                        onSelectSourceFilter(source.id);
                        onClose();
                      }}
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold transition-colors text-center text-[11px]"
                    >
                      Lọc bài từ nguồn này
                    </button>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors shrink-0"
                      title={`Truy cập trang web chính thức: ${source.url}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Nihongo News cam kết trích dẫn nguyên văn đường dẫn & tôn trọng bản quyền báo chí chính thống.</span>
          </div>

          <button
            onClick={() => {
              onClose();
              setIsSenseiOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Yêu cầu AI Sensei tạo bài từ nguồn mới</span>
          </button>
        </div>
      </div>
    </div>
  );
};
