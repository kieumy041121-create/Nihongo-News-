import React from 'react';
import { FuriganaToken, VocabularyItem, JLPTLevel } from '../../types';
import { useApp } from '../../context/AppContext';
import { SpeechService } from '../../services/speechService';
import {
  Volume2,
  BookmarkPlus,
  Bot,
  X,
  BookOpen,
  Check,
  Tag
} from 'lucide-react';

interface WordLookupModalProps {
  token: FuriganaToken | null;
  vocabularyItem?: VocabularyItem | null;
  onClose: () => void;
  articleId?: string;
  articleTitle?: string;
}

export const WordLookupModal: React.FC<WordLookupModalProps> = ({
  token,
  vocabularyItem,
  onClose,
  articleId,
  articleTitle
}) => {
  const { saveVocabularyWord, savedWords, setIsSenseiOpen, setSenseiContextSentence } = useApp();

  if (!token) return null;

  const word = vocabularyItem?.word || token.surface.replace(/[「」、。！？]/g, '');
  const reading = vocabularyItem?.reading || token.reading || word;
  const hanViet = vocabularyItem?.hanViet || token.hanViet;
  const pos = vocabularyItem?.pos || token.pos || 'Từ vựng tiếng Nhật';
  const meaning = vocabularyItem?.meaning || token.meaning || `Từ vựng trong bài đọc: ${word}`;
  const otherMeanings = vocabularyItem?.otherMeanings || [];
  const example = vocabularyItem?.example || `${word}を使った例文です。`;
  const exampleVi = vocabularyItem?.exampleVi || 'Ví dụ minh họa cách sử dụng từ.';
  const jlpt: JLPTLevel = vocabularyItem?.jlpt || token.jlpt || 'N3';

  const isAlreadySaved = savedWords.some(w => w.word === word);

  const handleSpeak = (textToSpeak: string) => {
    SpeechService.speak(textToSpeak, { rate: 0.9 });
  };

  const handleSave = () => {
    saveVocabularyWord({
      word,
      reading,
      hanViet,
      pos,
      meaning,
      otherMeanings,
      example,
      exampleVi,
      jlpt,
      articleId,
      articleTitle
    });
  };

  const handleAskSensei = () => {
    setSenseiContextSentence(`Giải thích chi tiết về từ vựng "${word}" (${reading}): cách dùng, sắc thái và ví dụ câu.`);
    setIsSenseiOpen(true);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FBFBFA] dark:bg-[#1A1C20] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700/80 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-800/40">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              Tra từ ngữ cảnh (Contextual Dictionary)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Main Word Display */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold font-japanese text-stone-900 dark:text-stone-100 tracking-wide">
                  {word}
                </h3>
                <span className="text-base text-rose-600 dark:text-rose-400 font-medium font-japanese">
                  【{reading}】
                </span>
              </div>
              {hanViet && (
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1 uppercase tracking-wider">
                  Âm Hán Việt: <span className="text-stone-800 dark:text-stone-200">{hanViet}</span>
                </p>
              )}
            </div>

            {/* Pronunciation button */}
            <button
              onClick={() => handleSpeak(word)}
              title="Phát âm từ này (Audio)"
              className="p-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 transition-colors shadow-xs shrink-0"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium border border-stone-200 dark:border-stone-700">
              {pos}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-900">
              JLPT {jlpt}
            </span>
          </div>

          {/* Meaning Block */}
          <div className="bg-white dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200/80 dark:border-stone-700/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Nghĩa trong ngữ cảnh bài đọc:</span>
            </div>
            <p className="text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug">
              {meaning}
            </p>

            {otherMeanings.length > 0 && (
              <div className="pt-2 border-t border-stone-100 dark:border-stone-700 text-xs text-stone-500 dark:text-stone-400 space-y-1">
                <span className="font-medium text-stone-700 dark:text-stone-300">Các nghĩa phổ biến khác:</span>
                <ul className="list-disc list-inside space-y-0.5 pl-1">
                  {otherMeanings.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Example Sentence */}
          <div className="space-y-1.5 text-sm bg-stone-50 dark:bg-stone-900/40 p-3.5 rounded-xl border border-stone-200/60 dark:border-stone-800">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-medium">
              <span>Ví dụ câu:</span>
              <button
                onClick={() => handleSpeak(example)}
                className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                title="Nghe câu ví dụ"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="font-japanese text-stone-900 dark:text-stone-100 leading-relaxed font-medium">
              {example}
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400 italic">
              {exampleVi}
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isAlreadySaved}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isAlreadySaved
                  ? 'bg-stone-100 dark:bg-stone-800 text-emerald-600 dark:text-emerald-400 cursor-default'
                  : 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 shadow-xs'
              }`}
            >
              {isAlreadySaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Đã lưu vào sổ từ</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Lưu vào sổ từ (+2 XP)</span>
                </>
              )}
            </button>

            <button
              onClick={handleAskSensei}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>Hỏi AI Sensei</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
