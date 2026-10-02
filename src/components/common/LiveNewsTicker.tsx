import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Radio,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Globe2
} from 'lucide-react';

export const LiveNewsTicker: React.FC = () => {
  const {
    liveNewsTicker,
    refreshLiveNews,
    isRefreshingNews,
    lastLiveUpdated,
    selectArticle,
    articles
  } = useApp();

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Auto-cycle live news every 7 seconds
  useEffect(() => {
    if (liveNewsTicker.length === 0) return;
    const interval = setInterval(() => {
      setCurrentNewsIndex(prev => (prev + 1) % liveNewsTicker.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [liveNewsTicker.length]);

  if (liveNewsTicker.length === 0) return null;

  const currentNews = liveNewsTicker[currentNewsIndex] || liveNewsTicker[0];

  const handleOpenArticle = () => {
    // Find matching article in repository or match by topic
    const found =
      articles.find(a => a.title.includes(currentNews.title.slice(0, 10))) ||
      articles.find(a => a.topic === currentNews.topic) ||
      articles[0];
    selectArticle(found);
  };

  return (
    <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white border-b border-stone-800 text-xs px-4 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Live Pulse Tag */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600/90 text-white font-bold text-[10px] tracking-wider uppercase animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            TIN MỚI NHẤT
          </span>
          <span className="text-stone-400 text-[11px] hidden sm:inline flex items-center gap-1">
            <Globe2 className="w-3 h-3 text-stone-400" />
            Nguồn: {currentNews.sourceName} • {currentNews.timeAgo}
          </span>
        </div>

        {/* Center: Dynamic News Headline */}
        <div
          onClick={handleOpenArticle}
          className="flex-1 text-center md:text-left truncate cursor-pointer hover:text-rose-300 transition-colors group flex items-center justify-center md:justify-start gap-2"
        >
          <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] font-bold text-amber-300">
            JLPT {currentNews.jlpt}
          </span>
          <span className="font-japanese font-bold truncate">
            {currentNews.title}
          </span>
          <span className="text-stone-400 text-[11px] truncate hidden lg:inline">
            ({currentNews.titleVi})
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </div>

        {/* Right: Refresh button and updated timestamp */}
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <span className="text-stone-400 hidden xl:inline">
            Đồng bộ: {lastLiveUpdated}
          </span>
          <button
            onClick={() => refreshLiveNews()}
            disabled={isRefreshingNews}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors disabled:opacity-50"
            title="Tải tin tức cập nhật mới nhất"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshingNews ? 'animate-spin text-rose-400' : ''}`} />
            <span className="hidden sm:inline">Cập nhật tin mới</span>
          </button>
        </div>
      </div>
    </div>
  );
};
