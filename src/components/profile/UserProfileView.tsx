import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../services/storageService';
import {
  UserCheck,
  Flame,
  Sparkles,
  Award,
  BookOpen,
  Highlighter,
  Layers,
  Settings,
  Globe,
  Sun,
  Moon,
  Trash2,
  Calendar,
  Clock,
  RotateCcw
} from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const {
    userProfile,
    savedWords,
    highlights,
    removeHighlight,
    language,
    setLanguage,
    theme,
    toggleTheme,
    selectArticle,
    articles
  } = useApp();

  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'notes' | 'settings'>('overview');

  const level = StorageService.getLevel(userProfile.xp);
  const levelTitle = StorageService.getLevelTitle(level, language);

  const nextLevelXp = level === 1 ? 50 : level === 2 ? 150 : level === 3 ? 350 : level === 4 ? 700 : 1200;
  const currentLevelFloorXp = level === 1 ? 0 : level === 2 ? 50 : level === 3 ? 150 : level === 4 ? 350 : 700;
  const progressPercent = Math.min(
    100,
    Math.max(0, ((userProfile.xp - currentLevelFloorXp) / (nextLevelXp - currentLevelFloorXp)) * 100)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* User Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 text-white flex items-center justify-center font-bold text-3xl shadow-lg shadow-rose-600/20">
            日
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                Người học Nihongo
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-xs font-bold">
                Level {level}
              </span>
            </div>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
              Danh hiệu: {levelTitle}
            </p>
            <p className="text-xs text-stone-400">
              Bắt đầu hành trình học tiếng Nhật qua tin tức cùng Nihongo News
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/50 text-center min-w-[90px]">
            <Flame className="w-4 h-4 mx-auto fill-amber-500 text-amber-500" />
            <div className="text-lg font-bold mt-1">{userProfile.streak} ngày</div>
            <div className="text-[10px] text-amber-600/80 uppercase font-semibold">Streak</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 text-center min-w-[90px]">
            <Sparkles className="w-4 h-4 mx-auto text-amber-500" />
            <div className="text-lg font-bold mt-1">{userProfile.xp}</div>
            <div className="text-[10px] text-stone-500 uppercase font-semibold">Tổng XP</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/50 text-center min-w-[90px]">
            <BookOpen className="w-4 h-4 mx-auto text-emerald-600" />
            <div className="text-lg font-bold mt-1">{userProfile.completedArticleIds.length}</div>
            <div className="text-[10px] text-emerald-600/80 uppercase font-semibold">Đã đọc</div>
          </div>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-stone-600 dark:text-stone-300">
            Tiến độ lên Level {level + 1}
          </span>
          <span className="text-rose-600 dark:text-rose-400">
            {userProfile.xp} / {nextLevelXp} XP ({Math.round(progressPercent)}%)
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveProfileTab('overview')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors ${
            activeProfileTab === 'overview'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Thành tích & Lịch sử học</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('notes')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors ${
            activeProfileTab === 'notes'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Highlighter className="w-3.5 h-3.5" />
          <span>Ghi chú & Đánh dấu ({highlights.length})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('settings')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors ${
            activeProfileTab === 'settings'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Cài đặt ứng dụng</span>
        </button>
      </div>

      {/* Tab 1: Overview & Completed Articles */}
      {activeProfileTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Completed Articles List */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Các bài đọc đã hoàn thành</span>
              </h3>

              {userProfile.completedArticleIds.length === 0 ? (
                <p className="text-xs text-stone-500 italic">Chưa có bài nào được hoàn thành.</p>
              ) : (
                <div className="space-y-2.5">
                  {userProfile.completedArticleIds.map(artId => {
                    const art = articles.find(a => a.id === artId);
                    if (!art) return null;
                    return (
                      <div
                        key={artId}
                        onClick={() => selectArticle(art)}
                        className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between text-xs cursor-pointer hover:border-rose-300"
                      >
                        <div className="truncate pr-2">
                          <span className="font-japanese font-bold text-stone-900 dark:text-stone-100 block truncate">
                            {art.title}
                          </span>
                          <span className="text-[11px] text-stone-500">{art.titleVi}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                          JLPT {art.jlptLevel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Vocabulary Snapshot */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Sổ từ vựng đang lưu ({savedWords.length} từ)</span>
              </h3>

              {savedWords.length === 0 ? (
                <p className="text-xs text-stone-500 italic">Chưa có từ nào trong sổ từ.</p>
              ) : (
                <div className="space-y-2">
                  {savedWords.slice(0, 4).map(w => (
                    <div
                      key={w.id}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-japanese font-bold text-stone-900 dark:text-stone-100">
                          {w.word}
                        </span>
                        <span className="text-rose-600 font-japanese ml-1.5 text-[11px]">
                          【{w.reading}】
                        </span>
                        <p className="text-[11px] text-stone-500">{w.meaning}</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-700 font-semibold">
                        {w.jlpt}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Notes & Highlights */}
      {activeProfileTab === 'notes' && (
        <div className="space-y-4">
          {highlights.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-2">
              <Highlighter className="w-8 h-8 text-stone-400 mx-auto" />
              <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">
                Chưa có câu nào được đánh dấu
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Khi đọc báo, bạn có thể tô sáng câu bằng các màu vàng, xanh, hồng và đính kèm ghi chú cá nhân để lưu vào đây.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {highlights.map(hl => (
                <div
                  key={hl.id}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] text-stone-400 font-semibold uppercase">
                      Bài đọc: {hl.articleTitle}
                    </span>
                    <p className="font-japanese text-sm font-bold text-stone-900 dark:text-stone-100">
                      {hl.sentenceText}
                    </p>
                    {hl.note && (
                      <p className="text-xs text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
                        📝 Ghi chú: {hl.note}
                      </p>
                    )}
                    <div className="text-[10px] text-stone-400">
                      {new Date(hl.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>

                  <button
                    onClick={() => removeHighlight(hl.sentenceId, hl.articleId)}
                    title="Xóa ghi chú"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeProfileTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Tùy chỉnh giao diện và ngôn ngữ
          </h3>

          <div className="space-y-4 text-xs divide-y divide-stone-100 dark:divide-stone-800">
            {/* Language Switch */}
            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">
                  Ngôn ngữ giao diện (Interface Language)
                </span>
                <span className="text-stone-500">Chuyển đổi giữa Tiếng Việt và 日本語</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage('vi')}
                  className={`px-3 py-1.5 rounded-xl font-bold ${
                    language === 'vi' ? 'bg-rose-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600'
                  }`}
                >
                  Tiếng Việt
                </button>
                <button
                  onClick={() => setLanguage('ja')}
                  className={`px-3 py-1.5 rounded-xl font-bold ${
                    language === 'ja' ? 'bg-rose-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600'
                  }`}
                >
                  日本語
                </button>
              </div>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between pt-4">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">
                  Giao diện Sáng / Tối (Light & Dark mode)
                </span>
                <span className="text-stone-500">Bảo vệ mắt khi đọc báo vào ban đêm</span>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 font-semibold text-stone-700 dark:text-stone-300"
              >
                {theme === 'light' ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                <span>{theme === 'light' ? 'Chế độ Sáng' : 'Chế độ Tối'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
