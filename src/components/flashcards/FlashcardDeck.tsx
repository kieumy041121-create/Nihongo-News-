import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserSavedWord, JLPTLevel } from '../../types';
import { StorageService } from '../../services/storageService';
import { SpeechService } from '../../services/speechService';
import {
  Layers,
  Volume2,
  Download,
  Plus,
  Trash2,
  RotateCw,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

export const FlashcardDeck: React.FC = () => {
  const { savedWords, updateWordStatus, deleteSavedWord, saveVocabularyWord, awardXp } = useApp();

  const [activeTab, setActiveTab] = useState<'study' | 'list'>('study');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filters
  const [filterLevel, setFilterLevel] = useState<'ALL' | JLPTLevel>('ALL');
  const [filterMastery, setFilterMastery] = useState<'ALL' | 'hard' | 'normal' | 'easy'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Add custom word modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newReading, setNewReading] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newHanViet, setNewHanViet] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newJlpt, setNewJlpt] = useState<JLPTLevel>('N3');

  const filteredWords = savedWords.filter(w => {
    const matchesLevel = filterLevel === 'ALL' || w.jlpt === filterLevel;
    const matchesMastery = filterMastery === 'ALL' || w.mastery === filterMastery;
    const matchesSearch =
      searchQuery.trim() === '' ||
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesMastery && matchesSearch;
  });

  const currentWord: UserSavedWord | undefined = filteredWords[currentIndex];

  const handleNextCard = (rating: 'hard' | 'normal' | 'easy') => {
    if (!currentWord) return;
    updateWordStatus(currentWord.id, rating);
    setIsFlipped(false);

    if (currentIndex + 1 < filteredWords.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed deck!
      awardXp(15, 'Hoàn thành phiên ôn tập Flashcard');
      setCurrentIndex(0);
    }
  };

  const handleExportCsv = () => {
    if (savedWords.length === 0) return;
    const csv = StorageService.exportWordsToCsv(savedWords);
    StorageService.downloadCsv(csv, `nihongo-news-vocab-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleCreateCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newMeaning.trim()) return;

    saveVocabularyWord({
      word: newWord.trim(),
      reading: newReading.trim() || newWord.trim(),
      hanViet: newHanViet.trim() || undefined,
      pos: 'Từ vựng tự thêm',
      meaning: newMeaning.trim(),
      example: newExample.trim() || `${newWord.trim()}の例文です。`,
      exampleVi: 'Ví dụ tự thêm.',
      jlpt: newJlpt
    });

    setNewWord('');
    setNewReading('');
    setNewMeaning('');
    setNewHanViet('');
    setNewExample('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Sổ từ vựng & Thuật toán lặp ngắt quãng (SRS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans tracking-tight">
            Flashcard & Sổ từ đã lưu ({savedWords.length} từ)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Lật thẻ ôn tập từ vựng, phân loại mức độ và xuất file CSV tương thích để nhập trực tiếp vào Anki.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm từ mới</span>
          </button>
          <button
            onClick={handleExportCsv}
            disabled={savedWords.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:bg-stone-800 transition-colors disabled:opacity-40"
          >
            <Download className="w-4 h-4" />
            <span>Xuất CSV (Anki)</span>
          </button>
        </div>
      </div>

      {/* Mode Switches: Deck vs Table List */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('study')}
            className={`px-4 py-1.5 rounded-lg transition-colors ${
              activeTab === 'study' ? 'bg-white dark:bg-stone-900 text-rose-600 shadow-xs' : 'text-stone-500'
            }`}
          >
            Chế độ Flashcard lật thẻ
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-1.5 rounded-lg transition-colors ${
              activeTab === 'list' ? 'bg-white dark:bg-stone-900 text-rose-600 shadow-xs' : 'text-stone-500'
            }`}
          >
            Danh sách sổ từ chi tiết
          </button>
        </div>

        {/* Level Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-400 hidden sm:inline">Lọc:</span>
          {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                setFilterLevel(lvl);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold ${
                filterLevel === lvl
                  ? 'bg-rose-600 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive Flashcard Deck */}
      {activeTab === 'study' && (
        <div className="space-y-6">
          {filteredWords.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-3">
              <Layers className="w-8 h-8 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
                Chưa có từ nào trong danh mục này
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Khi đọc báo, bạn hãy nhấp vào bất kỳ từ nào và chọn "Lưu vào sổ từ" để đưa vào danh sách ôn tập Flashcard nhé!
              </p>
            </div>
          ) : currentWord ? (
            <div className="max-w-xl mx-auto space-y-6">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>
                  Thẻ {currentIndex + 1} / {filteredWords.length}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 font-semibold">
                  JLPT {currentWord.jlpt}
                </span>
              </div>

              {/* The Flip Card */}
              <div
                onClick={() => setIsFlipped(prev => !prev)}
                className="relative min-h-[320px] rounded-3xl p-8 bg-white dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 shadow-xl cursor-pointer select-none flex flex-col justify-between hover:border-rose-300 dark:hover:border-rose-700 transition-all duration-300 group"
              >
                {!isFlipped ? (
                  /* Front: Kanji / Word */
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center my-auto">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                      Mặt trước (Kanji)
                    </span>
                    <h2 className="text-5xl font-bold font-japanese text-stone-900 dark:text-stone-100 tracking-wide">
                      {currentWord.word}
                    </h2>
                    {currentWord.hanViet && (
                      <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                        {currentWord.hanViet}
                      </p>
                    )}
                    <span className="text-xs text-stone-400 italic pt-2">
                      (Nhấp vào thẻ để lật xem cách đọc & nghĩa)
                    </span>
                  </div>
                ) : (
                  /* Back: Reading, Meaning, Examples */
                  <div className="flex-1 flex flex-col justify-between space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-2xl font-bold font-japanese text-rose-600 dark:text-rose-400">
                          {currentWord.reading}
                        </span>
                        <span className="text-xs text-stone-400 ml-2 font-japanese">
                          ({currentWord.word})
                        </span>
                        {currentWord.hanViet && (
                          <div className="text-xs font-semibold text-stone-500 uppercase mt-0.5">
                            {currentWord.hanViet}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          SpeechService.speak(currentWord.word);
                        }}
                        className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 hover:text-rose-600"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 space-y-1">
                      <span className="text-[11px] font-semibold text-stone-400 uppercase">
                        Nghĩa tiếng Việt:
                      </span>
                      <p className="text-base font-bold text-stone-900 dark:text-stone-100">
                        {currentWord.meaning}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-stone-600 dark:text-stone-400">
                      <p className="font-japanese font-medium text-stone-800 dark:text-stone-200">
                        {currentWord.example}
                      </p>
                      <p className="italic">{currentWord.exampleVi}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
                  <span>Trạng thái: {currentWord.mastery === 'easy' ? 'Đã nhớ' : currentWord.mastery === 'normal' ? 'Bình thường' : 'Từ khó'}</span>
                  <span className="flex items-center gap-1 group-hover:text-rose-600 transition-colors">
                    <RotateCw className="w-3.5 h-3.5" /> Lật thẻ
                  </span>
                </div>
              </div>

              {/* SRS Rating Actions (Khó / Bình thường / Dễ) */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleNextCard('hard')}
                  className="py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-900 transition-colors"
                >
                  Khó (Ôn lại sớm)
                </button>
                <button
                  onClick={() => handleNextCard('normal')}
                  className="py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-bold text-xs border border-amber-200 dark:border-amber-900 transition-colors"
                >
                  Bình thường (2 ngày)
                </button>
                <button
                  onClick={() => handleNextCard('easy')}
                  className="py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-900 transition-colors"
                >
                  Dễ (Đã nắm chắc)
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Tab 2: Detailed Table List */}
      {activeTab === 'list' && (
        <div className="bg-white dark:bg-stone-900/60 rounded-3xl border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm từ vựng..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs focus:ring-1 focus:ring-rose-500 outline-none"
              />
            </div>

            <span className="text-xs text-stone-400">
              {filteredWords.length} từ vựng
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Từ vựng</th>
                  <th className="py-3 px-4">Cách đọc (Kana)</th>
                  <th className="py-3 px-4">Hán Việt</th>
                  <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                  <th className="py-3 px-4">JLPT</th>
                  <th className="py-3 px-4">Đánh giá</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredWords.map(w => (
                  <tr key={w.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-japanese font-bold text-stone-900 dark:text-stone-100 text-sm">
                      {w.word}
                    </td>
                    <td className="py-3.5 px-4 font-japanese text-rose-600 dark:text-rose-400">
                      {w.reading}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-500 uppercase">
                      {w.hanViet || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-800 dark:text-stone-200 max-w-xs">
                      {w.meaning}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 font-bold text-[10px]">
                        {w.jlpt}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                          w.mastery === 'easy'
                            ? 'bg-emerald-100 text-emerald-700'
                            : w.mastery === 'hard'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {w.mastery === 'easy' ? 'Dễ' : w.mastery === 'hard' ? 'Khó' : 'Bình thường'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => SpeechService.speak(w.word)}
                          title="Nghe"
                          className="p-1 rounded-lg text-stone-400 hover:text-rose-600"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteSavedWord(w.id)}
                          title="Xóa khỏi sổ từ"
                          className="p-1 rounded-lg text-stone-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Custom Word Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#FBFBFA] dark:bg-[#1A1C20] rounded-2xl p-6 shadow-2xl border border-stone-200 dark:border-stone-700 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Thêm từ vựng mới vào Sổ từ
              </h4>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomWord} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Từ vựng (Kanji / Kana) *
                </label>
                <input
                  type="text"
                  required
                  value={newWord}
                  onChange={e => setNewWord(e.target.value)}
                  placeholder="Ví dụ: 勉強"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                    Cách đọc (Hiragana)
                  </label>
                  <input
                    type="text"
                    value={newReading}
                    onChange={e => setNewReading(e.target.value)}
                    placeholder="べんきょう"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                    Âm Hán Việt
                  </label>
                  <input
                    type="text"
                    value={newHanViet}
                    onChange={e => setNewHanViet(e.target.value)}
                    placeholder="MIỄN CƯỠNG"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Nghĩa tiếng Việt *
                </label>
                <input
                  type="text"
                  required
                  value={newMeaning}
                  onChange={e => setNewMeaning(e.target.value)}
                  placeholder="Học tập, nghiên cứu"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                    Cấp độ JLPT
                  </label>
                  <select
                    value={newJlpt}
                    onChange={e => setNewJlpt(e.target.value as JLPTLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none"
                  >
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                    Câu ví dụ
                  </label>
                  <input
                    type="text"
                    value={newExample}
                    onChange={e => setNewExample(e.target.value)}
                    placeholder="毎日日本語を勉強します。"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold"
                >
                  Lưu vào sổ từ (+2 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
