import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Keyboard, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveTab } = useApp();

  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
                日
              </div>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-base">
                Nihongo News — 日本語ニュース
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-md">
              {language === 'vi'
                ? 'Nền tảng học tiếng Nhật qua tin tức và bài đọc chuẩn JLPT từ N5 đến N1 dành cho người Việt. Kết hợp Furigana động, tra từ ngữ cảnh, âm thanh native và trợ lý AI Sensei.'
                : 'ベトナム人学習者のためのニュース日本語学習プラットフォーム。JLPT N5からN1まで対応。ふりがな、文脈辞書、ネイティブ音声、AI Senseiを搭載。'}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-stone-400 dark:text-stone-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>
                Nội dung học tập được kiểm định và phân loại minh bạch theo chuẩn mẫu sư phạm và nguồn tham khảo hợp pháp.
              </span>
            </div>
          </div>

          {/* Col 2: Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-200 uppercase tracking-wider">
              {language === 'vi' ? 'Học tập theo trình độ' : 'レベル別学習'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              {['N5 - Sơ cấp căn bản', 'N4 - Sơ cấp nâng cao', 'N3 - Trung cấp thực tế', 'N2 - Trung cao cấp', 'N1 - Cao cấp chuyên sâu'].map((lvl, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActiveTab('articles')}
                    className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                  >
                    {lvl}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Keyboard Guide */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-stone-200 uppercase tracking-wider">
              <Keyboard className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Phím tắt tiện dụng' : 'ショートカット'}</span>
            </div>
            <div className="space-y-2 text-[11px] text-stone-500 dark:text-stone-400">
              <div className="flex items-center justify-between">
                <span>Nhấp vào từ:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">Tra từ</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Đổi Furigana:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">Furigana Mode</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Bật AI Sensei:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">AI Sensei</kbd>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 dark:text-stone-500">
          <p>© 2026 Nihongo News. Đọc tin Nhật, học tiếng Nhật mỗi ngày.</p>
          <p className="flex items-center gap-1">
            Thiết kế dành riêng cho cộng đồng học tiếng Nhật tại Việt Nam <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
