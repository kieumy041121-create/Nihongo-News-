import React, { useState } from 'react';
import { Article, KanjiDetail } from '../../types';
import { KANJI_DATABASE, getKanjiInfo } from '../../data/kanjiDatabase';
import { SpeechService } from '../../services/speechService';
import {
  Grid,
  X,
  Volume2,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface KanjiMatrixModalProps {
  article: Article;
  onClose: () => void;
}

export const KanjiMatrixModal: React.FC<KanjiMatrixModalProps> = ({ article, onClose }) => {
  // Extract all unique kanji characters from article sentences
  const kanjiRegex = /[\u4e00-\u9faf]/g;
  const allText = article.sentences.map(s => s.text).join('');
  const matchedKanji = Array.from(new Set(allText.match(kanjiRegex) || []));

  const [selectedKanjiChar, setSelectedKanjiChar] = useState<string>(matchedKanji[0] || '日');

  const selectedDetail: KanjiDetail | null = getKanjiInfo(selectedKanjiChar) || {
    kanji: selectedKanjiChar,
    hanViet: 'HÁN TỰ',
    onyomi: [],
    kunyomi: [],
    strokes: 8,
    jlpt: article.jlptLevel,
    meaning: 'Chữ Hán xuất hiện trong văn bản bài đọc',
    examples: []
  };

  const stats = article.kanjiStats;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FBFBFA] dark:bg-[#1A1C20] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700/80 overflow-hidden transform animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-800/40">
          <div className="flex items-center gap-2">
            <Grid className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Kanji Matrix — Ma trận Chữ Hán
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Phân tích cấp độ JLPT & chi tiết từng Hán tự trong bài
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* JLPT Breakdown Stats */}
          {stats ? (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wider">
                Phân bố Kanji theo trình độ (Tổng cộng: {stats.total} chữ Hán)
              </span>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { level: 'N5', count: stats.n5, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' },
                  { level: 'N4', count: stats.n4, color: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800' },
                  { level: 'N3', count: stats.n3, color: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800' },
                  { level: 'N2', count: stats.n2, color: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800' },
                  { level: 'N1', count: stats.n1, color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-center ${item.color}`}
                  >
                    <div className="text-xs font-bold">{item.level}</div>
                    <div className="text-lg font-bold mt-0.5">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 text-xs italic text-center">
              Chưa có dữ liệu phân tích thống kê cấp độ cho bài này.
            </div>
          )}

          {/* Kanji Selection Grid */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wider">
              Chọn một chữ Hán để xem chi tiết ({matchedKanji.length} Hán tự xuất hiện):
            </span>
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
              {matchedKanji.map((char, idx) => {
                const isSelected = char === selectedKanjiChar;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedKanjiChar(char)}
                    className={`w-10 h-10 rounded-xl font-japanese text-lg font-bold transition-all ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-md scale-105 ring-2 ring-rose-300 dark:ring-rose-800'
                        : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-rose-400'
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Kanji Details Card */}
          {selectedDetail && (
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-4 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center font-japanese text-4xl font-bold text-rose-600 dark:text-rose-400 shadow-inner">
                    {selectedDetail.kanji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                        {selectedDetail.hanViet}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold">
                        JLPT {selectedDetail.jlpt}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      Số nét: <span className="font-semibold text-stone-700 dark:text-stone-300">{selectedDetail.strokes} nét</span>
                    </p>
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-200 mt-1">
                      {selectedDetail.meaning}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => SpeechService.speak(selectedDetail.kanji, { rate: 0.8 })}
                  title="Nghe phát âm"
                  className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 transition-colors shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Readings: On & Kun */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100 dark:border-stone-700 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800">
                  <span className="font-semibold text-stone-500 dark:text-stone-400 block mb-1">
                    Âm On (Onyomi):
                  </span>
                  <span className="font-japanese text-sm font-bold text-stone-800 dark:text-stone-200">
                    {selectedDetail.onyomi.length > 0 ? selectedDetail.onyomi.join('、 ') : '—'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800">
                  <span className="font-semibold text-stone-500 dark:text-stone-400 block mb-1">
                    Âm Kun (Kunyomi):
                  </span>
                  <span className="font-japanese text-sm font-bold text-stone-800 dark:text-stone-200">
                    {selectedDetail.kunyomi.length > 0 ? selectedDetail.kunyomi.join('、 ') : '—'}
                  </span>
                </div>
              </div>

              {/* Compound Examples */}
              {selectedDetail.examples.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 block">
                    Từ ghép thường gặp:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDetail.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800 text-xs"
                      >
                        <div>
                          <span className="font-japanese font-bold text-stone-900 dark:text-stone-100">
                            {ex.word}
                          </span>
                          <span className="text-stone-500 dark:text-stone-400 font-japanese ml-1.5">
                            【{ex.reading}】
                          </span>
                        </div>
                        <span className="text-stone-600 dark:text-stone-300 font-medium">
                          {ex.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
