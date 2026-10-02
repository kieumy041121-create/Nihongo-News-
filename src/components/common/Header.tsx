import React, { useState } from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { StorageService } from '../../services/storageService';
import {
  Flame,
  Sparkles,
  BookOpen,
  Headphones,
  Layers,
  GraduationCap,
  Bot,
  Radio,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  UserCheck,
  Newspaper
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    language,
    setLanguage,
    userProfile,
    setIsSenseiOpen,
    radioQueue,
    setIsRadioOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const level = StorageService.getLevel(userProfile.xp);
  const levelTitle = StorageService.getLevelTitle(level, language);

  const navItems: Array<{ id: NavTab; labelVi: string; labelJa: string; icon: React.ReactNode }> = [
    { id: 'home', labelVi: 'Trang chủ', labelJa: 'ホーム', icon: <Compass className="w-4 h-4" /> },
    { id: 'articles', labelVi: 'Bài đọc', labelJa: 'ニュース一覧', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'press', labelVi: 'Cổng Thông Tấn', labelJa: '報道・通信社', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'listening', labelVi: 'Luyện nghe', labelJa: 'リスニング', icon: <Headphones className="w-4 h-4" /> },
    { id: 'flashcards', labelVi: 'Sổ từ & Thẻ', labelJa: '単語帳', icon: <Layers className="w-4 h-4" /> },
    { id: 'simulator', labelVi: 'Thi JLPT', labelJa: 'JLPT模擬試験', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'profile', labelVi: 'Hồ sơ', labelJa: 'マイページ', icon: <UserCheck className="w-4 h-4" /> }
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 dark:bg-[#121316]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-rose-700 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-rose-600/20 group-hover:scale-105 transition-transform">
            日
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg tracking-tight text-stone-900 dark:text-stone-100 font-sans">
                Nihongo News
              </span>
              <span className="text-xs font-medium text-rose-600 dark:text-rose-400 font-japanese">
                日本語
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 tracking-tight hidden sm:block">
              {language === 'vi' ? 'Đọc tin Nhật, học tiếng Nhật mỗi ngày' : 'ニュースで学ぶ日本語'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800/60'
                }`}
              >
                {item.icon}
                <span>{language === 'vi' ? item.labelVi : item.labelJa}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Gamification stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak */}
          <div
            title={`Chuỗi học tập liên tục: ${userProfile.streak} ngày`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-200/60 dark:border-amber-800/50"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{userProfile.streak} ngày</span>
          </div>

          {/* XP & Level Badge */}
          <div
            onClick={() => setActiveTab('profile')}
            title={`Level ${level}: ${levelTitle} (${userProfile.xp} XP)`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-rose-600 dark:text-rose-400">Lv.{level}</span>
            <span className="text-stone-400">|</span>
            <span>{userProfile.xp} XP</span>
          </div>

          {/* Radio Toggle */}
          <button
            onClick={() => setIsRadioOpen(true)}
            title="Đài phát Radio tiếng Nhật (Radio Mode)"
            className="relative p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Radio className="w-4 h-4" />
            {radioQueue.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-stone-900" />
            )}
          </button>

          {/* AI Sensei Quick Button */}
          <button
            onClick={() => setIsSenseiOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-xs transition-all hover:shadow-md"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">AI Sensei</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'vi' ? 'ja' : 'vi')}
            className="px-2 py-1 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Chuyển ngôn ngữ giao diện (Tiếng Việt / 日本語)"
          >
            {language === 'vi' ? 'VI' : 'JA'}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title={theme === 'light' ? 'Bật chế độ tối (Dark mode)' : 'Bật chế độ sáng (Light mode)'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#FBFBFA] dark:bg-[#121316] px-4 py-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {item.icon}
              <span>{language === 'vi' ? item.labelVi : item.labelJa}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
            <span>Level {level}: {levelTitle}</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">{userProfile.xp} XP</span>
          </div>
        </div>
      )}
    </header>
  );
};
