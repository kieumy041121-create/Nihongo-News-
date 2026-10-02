import React, { useState, useEffect, useRef } from 'react';
import {
  Article,
  Sentence,
  FuriganaToken,
  VocabularyItem,
  GrammarPoint
} from '../../types';
import { useApp } from '../../context/AppContext';
import { SpeechService } from '../../services/speechService';
import { WordLookupModal } from './WordLookupModal';
import { KanjiMatrixModal } from './KanjiMatrixModal';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Printer,
  Grid,
  Bot,
  Radio,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Highlighter,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Mic,
  ChevronRight,
  Share2
} from 'lucide-react';

interface ArticleReaderProps {
  article: Article;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({ article }) => {
  const {
    furiganaMode,
    setFuriganaMode,
    translationMode,
    setTranslationMode,
    speechSpeed,
    setSpeechSpeed,
    completeArticle,
    userProfile,
    awardXp,
    highlights,
    addHighlight,
    removeHighlight,
    addToRadioQueue,
    setIsSenseiOpen,
    setSenseiContextSentence,
    setActiveTab,
    language
  } = useApp();

  // Audio playback state
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);
  const [listenAndReadActive, setListenAndReadActive] = useState(false);

  // Modals & Panels
  const [selectedToken, setSelectedToken] = useState<FuriganaToken | null>(null);
  const [selectedVocabItem, setSelectedVocabItem] = useState<VocabularyItem | null>(null);
  const [isKanjiMatrixOpen, setIsKanjiMatrixOpen] = useState(false);
  const [activeTabBottom, setActiveTabBottom] = useState<'vocab' | 'grammar' | 'quiz' | 'notes'>('vocab');

  // Sentence Highlighting & Note popover
  const [selectedSentenceForAction, setSelectedSentenceForAction] = useState<Sentence | null>(null);
  const [noteInput, setNoteInput] = useState('');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const isCompleted = userProfile.completedArticleIds.includes(article.id);

  // Clean up audio on unmount or article change
  useEffect(() => {
    return () => {
      SpeechService.stop();
    };
  }, [article.id]);

  // Handle Play Full Article
  const handlePlayFullArticle = () => {
    if (isPlayingFull) {
      SpeechService.stop();
      setIsPlayingFull(false);
      setActiveSentenceIndex(null);
      return;
    }

    setIsPlayingFull(true);
    let index = 0;

    const playNextSentence = () => {
      if (index >= article.sentences.length) {
        setIsPlayingFull(false);
        setActiveSentenceIndex(null);
        return;
      }

      setActiveSentenceIndex(index);
      const sentenceText = article.sentences[index].text;

      SpeechService.speak(sentenceText, {
        rate: speechSpeed,
        onEnd: () => {
          index += 1;
          setTimeout(playNextSentence, 400); // 400ms natural breathing pause between sentences
        },
        onError: () => {
          setIsPlayingFull(false);
          setActiveSentenceIndex(null);
        }
      });
    };

    playNextSentence();
  };

  // Play a single sentence
  const handlePlaySentence = (sentence: Sentence, index: number) => {
    SpeechService.stop();
    setIsPlayingFull(false);
    setActiveSentenceIndex(index);

    SpeechService.speak(sentence.text, {
      rate: speechSpeed,
      onEnd: () => {
        setActiveSentenceIndex(null);
      }
    });
  };

  // Open word lookup
  const handleTokenClick = (token: FuriganaToken) => {
    const cleanSurface = token.surface.replace(/[「」、。！？]/g, '');
    const matchingVocab = article.vocabulary.find(v => v.word === cleanSurface || cleanSurface.includes(v.word));
    setSelectedToken(token);
    setSelectedVocabItem(matchingVocab || null);
  };

  // Sentence highlight
  const getSentenceHighlight = (sentenceId: string) => {
    return highlights.find(h => h.sentenceId === sentenceId && h.articleId === article.id);
  };

  const handleApplyHighlight = (sentence: Sentence, color: 'yellow' | 'green' | 'pink') => {
    addHighlight({
      sentenceId: sentence.id,
      sentenceText: sentence.text,
      articleId: article.id,
      articleTitle: article.title,
      color,
      note: noteInput.trim() || undefined
    });
    setSelectedSentenceForAction(null);
    setNoteInput('');
  };

  const handleRemoveHighlight = (sentenceId: string) => {
    removeHighlight(sentenceId, article.id);
    setSelectedSentenceForAction(null);
  };

  // Handle quiz submit
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    article.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    if (correctCount > 0) {
      awardXp(correctCount * 5, `Trả lời đúng ${correctCount}/${article.quiz.length} câu Quiz`);
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Print Article
  const handlePrint = () => {
    window.print();
  };

  // Trigger Sensei with current sentence
  const handleAskSenseiSentence = (sentence: Sentence) => {
    setSenseiContextSentence(`Giải thích chi tiết cấu trúc ngữ pháp và từ vựng câu: "${sentence.text}"`);
    setIsSenseiOpen(true);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 print:py-0 print:px-0">
      {/* Article Header */}
      <div className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold tracking-wider">
              JLPT {article.jlptLevel}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium border border-stone-200 dark:border-stone-700">
              {article.topic}
            </span>
            <span className="text-stone-500 dark:text-stone-400">
              ⏱ {article.readTimeMinutes} phút đọc
            </span>
          </div>

          {/* Source and authenticity disclaimer badge */}
          <div className="flex items-center gap-2 text-[11px]">
            {article.sourceType === 'editorial_sample' ? (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                <ShieldAlert className="w-3 h-3 text-amber-500" />
                Bài luyện tập minh họa, không phải tin tức thật
              </span>
            ) : article.sourceType === 'ai_generated' ? (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Bài luyện tập do AI tạo
              </span>
            ) : (
              <span className="flex items-center gap-1 text-stone-600 dark:text-stone-400">
                Nguồn: {article.sourceName}
                {article.sourceUrl && (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-rose-600 hover:underline inline-flex items-center gap-0.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Titles */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-japanese text-stone-900 dark:text-stone-100 leading-snug tracking-tight">
          {article.title}
        </h1>
        <h2 className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
          {article.titleVi}
        </h2>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 italic bg-stone-100/50 dark:bg-stone-800/40 p-3 rounded-xl border border-stone-200/60 dark:border-stone-800">
          💡 <strong>Tóm tắt:</strong> {article.summary}
        </p>
      </div>

      {/* Sticky Reader Controls Toolbar */}
      <div className="sticky top-16 z-30 bg-[#FBFBFA]/95 dark:bg-[#121316]/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-md flex flex-wrap items-center justify-between gap-3 print:hidden">
        {/* Left: Audio Player controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayFullArticle}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              isPlayingFull
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
            }`}
          >
            {isPlayingFull ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlayingFull ? 'Tạm dừng đọc' : 'Đọc toàn bài'}</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 text-xs font-semibold">
            {[0.75, 1.0, 1.25].map(spd => (
              <button
                key={spd}
                onClick={() => setSpeechSpeed(spd)}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  speechSpeed === spd
                    ? 'bg-white dark:bg-stone-900 text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Add to Radio Queue */}
          <button
            onClick={() => addToRadioQueue(article)}
            title="Thêm bài này vào danh sách phát Radio"
            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-colors"
          >
            <Radio className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Furigana & Translation Switches */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Furigana Mode Switch */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 text-xs">
            <button
              onClick={() => setFuriganaMode('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                furiganaMode === 'all'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Furigana: Tất cả
            </button>
            <button
              onClick={() => setFuriganaMode('difficult_only')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                furiganaMode === 'difficult_only'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Từ khó
            </button>
            <button
              onClick={() => setFuriganaMode('off')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                furiganaMode === 'off'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Tắt
            </button>
          </div>

          {/* Translation Mode Switch */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 text-xs">
            <button
              onClick={() => setTranslationMode('ja_only')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                translationMode === 'ja_only'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Tiếng Nhật
            </button>
            <button
              onClick={() => setTranslationMode('bilingual')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                translationMode === 'bilingual'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Song ngữ
            </button>
            <button
              onClick={() => setTranslationMode('study')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                translationMode === 'study'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Chế độ học
            </button>
          </div>

          {/* Kanji Matrix Button */}
          <button
            onClick={() => setIsKanjiMatrixOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors"
          >
            <Grid className="w-3.5 h-3.5 text-rose-600" />
            <span>Kanji Matrix</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            title="In bài đọc ra giấy hoặc lưu PDF"
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Reading Canvas */}
      <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-6 sm:p-10 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-8 font-japanese leading-loose text-lg sm:text-xl print:shadow-none print:border-none print:p-0">
        {article.sentences.map((sentence, sIndex) => {
          const isActive = activeSentenceIndex === sIndex;
          const highlight = getSentenceHighlight(sentence.id);

          const highlightBg = highlight
            ? highlight.color === 'yellow'
              ? 'bg-amber-100/70 dark:bg-amber-950/40 border-l-4 border-amber-400'
              : highlight.color === 'green'
              ? 'bg-emerald-100/70 dark:bg-emerald-950/40 border-l-4 border-emerald-400'
              : 'bg-rose-100/70 dark:bg-rose-950/40 border-l-4 border-rose-400'
            : '';

          return (
            <div
              key={sentence.id}
              className={`group relative p-3 sm:p-4 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-rose-50/80 dark:bg-rose-950/30 ring-2 ring-rose-400/50 shadow-xs'
                  : highlightBg || 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
              }`}
            >
              {/* Sentence Tokens with Ruby/Furigana */}
              <div className="flex flex-wrap items-end gap-x-0.5 gap-y-2">
                {sentence.tokens.map((token, tIndex) => {
                  const showFurigana =
                    furiganaMode === 'all'
                      ? !!token.reading
                      : furiganaMode === 'difficult_only'
                      ? !!token.reading && (token.jlpt === 'N1' || token.jlpt === 'N2' || token.jlpt === 'N3')
                      : false;

                  const isStudyWord =
                    translationMode === 'study' &&
                    article.vocabulary.some(v => v.word === token.surface);

                  return (
                    <span
                      key={tIndex}
                      onClick={() => handleTokenClick(token)}
                      className={`inline-block cursor-pointer select-none px-0.5 rounded hover:bg-rose-200/50 dark:hover:bg-rose-900/50 transition-colors ${
                        isStudyWord ? 'text-rose-600 dark:text-rose-400 font-bold underline decoration-rose-300 decoration-2 underline-offset-4' : ''
                      }`}
                    >
                      {showFurigana && token.reading ? (
                        <ruby className="ruby-align">
                          {token.surface}
                          <rt className="text-[10px] sm:text-xs text-rose-600 dark:text-rose-400 select-none font-sans font-normal opacity-90">
                            {token.reading}
                          </rt>
                        </ruby>
                      ) : (
                        <span>{token.surface}</span>
                      )}
                    </span>
                  );
                })}
              </div>

              {/* Translation line if bilingual or study mode */}
              {(translationMode === 'bilingual' || translationMode === 'study') && (
                <div className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-sans leading-relaxed pt-1.5 border-t border-stone-100 dark:border-stone-800/60">
                  {sentence.translation}
                </div>
              )}

              {/* User Note display if exists */}
              {highlight?.note && (
                <div className="mt-2 text-xs font-sans bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 p-2.5 rounded-lg border border-amber-200/60 dark:border-amber-900/40 flex items-start gap-2">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                  <span>{highlight.note}</span>
                </div>
              )}

              {/* Action Buttons Toolbar per sentence (Hover / Active) */}
              <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity absolute right-2 top-2 flex items-center gap-1 bg-white/95 dark:bg-stone-800/95 backdrop-blur-xs p-1 rounded-xl shadow-xs border border-stone-200 dark:border-stone-700 text-xs font-sans print:hidden">
                <button
                  onClick={() => handlePlaySentence(sentence, sIndex)}
                  title="Nghe riêng câu này"
                  className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-rose-600"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedSentenceForAction(sentence)}
                  title="Tô màu hoặc thêm ghi chú"
                  className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-amber-600"
                >
                  <Highlighter className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleAskSenseiSentence(sentence)}
                  title="Hỏi Sensei phân tích câu này"
                  className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-indigo-600"
                >
                  <Bot className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sentence Highlight / Note Action Modal */}
      {selectedSentenceForAction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setSelectedSentenceForAction(null)}
        >
          <div
            className="w-full max-w-md bg-[#FBFBFA] dark:bg-[#1A1C20] rounded-2xl p-6 shadow-2xl border border-stone-200 dark:border-stone-700 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Highlighter className="w-4 h-4 text-amber-500" />
                Đánh dấu & Thêm ghi chú cho câu
              </h4>
              <button
                onClick={() => setSelectedSentenceForAction(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 font-japanese italic bg-stone-100 dark:bg-stone-800/50 p-2.5 rounded-xl">
              "{selectedSentenceForAction.text}"
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                Chọn màu tô sáng:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleApplyHighlight(selectedSentenceForAction, 'yellow')}
                  className="flex-1 py-2 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 text-xs font-bold border border-amber-300"
                >
                  Vàng (Trọng tâm)
                </button>
                <button
                  onClick={() => handleApplyHighlight(selectedSentenceForAction, 'green')}
                  className="flex-1 py-2 rounded-xl bg-emerald-200/80 hover:bg-emerald-300 text-emerald-900 text-xs font-bold border border-emerald-300"
                >
                  Xanh lá (Đã hiểu)
                </button>
                <button
                  onClick={() => handleApplyHighlight(selectedSentenceForAction, 'pink')}
                  className="flex-1 py-2 rounded-xl bg-rose-200/80 hover:bg-rose-300 text-rose-900 text-xs font-bold border border-rose-300"
                >
                  Hồng (Cần ôn)
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                Ghi chú cá nhân (tùy chọn):
              </label>
              <textarea
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                placeholder="Ví dụ: Chú ý mẫu ngữ pháp 〜に伴って, cần ôn lại cách dùng..."
                className="w-full h-20 p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs focus:ring-2 focus:ring-rose-500 outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {getSentenceHighlight(selectedSentenceForAction.id) ? (
                <button
                  onClick={() => handleRemoveHighlight(selectedSentenceForAction.id)}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Hủy đánh dấu câu này
                </button>
              ) : <div />}

              <button
                onClick={() => handleApplyHighlight(selectedSentenceForAction, 'yellow')}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold"
              >
                Lưu đánh dấu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion & Rewards Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/20 dark:to-amber-950/20 border border-rose-200/60 dark:border-rose-900/40 print:hidden">
        <div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            {isCompleted ? '🎉 Bạn đã hoàn thành bài đọc này!' : 'Bạn đã đọc xong bài này chưa?'}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {isCompleted
              ? 'Tiếp tục luyện tập từ vựng, ngữ pháp và bài quiz bên dưới để củng cố kiến thức.'
              : 'Nhấn hoàn thành để nhận +20 XP và ghi nhận vào lịch sử học tập của tuần.'}
          </p>
        </div>

        <button
          onClick={() => completeArticle(article.id)}
          disabled={isCompleted}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 ${
            isCompleted
              ? 'bg-emerald-600 text-white cursor-default'
              : 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isCompleted ? 'Đã hoàn thành' : 'Đánh dấu đã đọc (+20 XP)'}</span>
        </button>
      </div>

      {/* Bottom Study Panels (Vocab, Grammar, Quiz, Notes) */}
      <div className="space-y-6 pt-4 print:pt-0">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2 print:hidden">
          {[
            { id: 'vocab', label: `Từ vựng trọng tâm (${article.vocabulary.length})`, icon: <BookOpen className="w-4 h-4" /> },
            { id: 'grammar', label: `Ngữ pháp (${article.grammar.length})`, icon: <HelpCircle className="w-4 h-4" /> },
            { id: 'quiz', label: `Quiz hiểu bài (${article.quiz.length})`, icon: <Sparkles className="w-4 h-4" /> },
            { id: 'notes', label: 'Ghi chú của tôi', icon: <Highlighter className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabBottom(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTabBottom === tab.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Vocabulary List */}
        {activeTabBottom === 'vocab' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {article.vocabulary.map(v => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVocabItem(v)}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-800 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-japanese text-stone-900 dark:text-stone-100">
                          {v.word}
                        </span>
                        <span className="text-xs text-rose-600 dark:text-rose-400 font-japanese font-medium">
                          【{v.reading}】
                        </span>
                      </div>
                      {v.hanViet && (
                        <span className="text-[11px] font-semibold text-stone-400 uppercase">
                          {v.hanViet}
                        </span>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-stone-600 dark:text-stone-300">
                      {v.jlpt}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 mt-2">
                    {v.meaning}
                  </p>
                  <p className="text-[11px] text-stone-500 italic mt-1 font-japanese">
                    {v.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Grammar Points */}
        {activeTabBottom === 'grammar' && (
          <div className="space-y-4">
            {article.grammar.map(g => (
              <div
                key={g.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-xs font-bold">
                      {g.jlpt}
                    </span>
                    <h4 className="text-base font-bold font-japanese text-stone-900 dark:text-stone-100">
                      {g.pattern}
                    </h4>
                  </div>
                  <span className="text-xs font-medium text-stone-600 dark:text-stone-300">
                    Ý nghĩa: {g.meaning}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {g.explanation}
                </p>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 text-xs space-y-1">
                  <div className="font-japanese font-medium text-stone-800 dark:text-stone-200 flex items-center justify-between">
                    <span>{g.example}</span>
                    <button
                      onClick={() => SpeechService.speak(g.example, { rate: 0.9 })}
                      title="Nghe câu ví dụ"
                      className="hover:text-rose-600 text-stone-400"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-stone-500 italic">{g.exampleVi}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Article Quiz */}
        {activeTabBottom === 'quiz' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Kiểm tra mức độ hiểu bài (Reading Comprehension Quiz)
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Trả lời đúng mỗi câu được thưởng +5 XP!
                </p>
              </div>
              {quizSubmitted && (
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại quiz</span>
                </button>
              )}
            </div>

            <div className="space-y-6">
              {article.quiz.map((q, qIndex) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={q.id} className="space-y-3">
                    <h4 className="text-sm font-semibold font-japanese text-stone-900 dark:text-stone-100">
                      Câu {qIndex + 1}: {q.question}
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        const isChosen = selected === optIndex;
                        let optionStyle = 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-800/40 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700';

                        if (quizSubmitted) {
                          if (optIndex === q.correctIndex) {
                            optionStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 dark:bg-emerald-950/60 dark:text-emerald-200 font-semibold';
                          } else if (isChosen && !isCorrect) {
                            optionStyle = 'bg-rose-100 text-rose-900 border-rose-400 dark:bg-rose-950/60 dark:text-rose-200 line-through';
                          }
                        } else if (isChosen) {
                          optionStyle = 'bg-rose-50 text-rose-800 border-rose-500 dark:bg-rose-950/40 dark:text-rose-200 font-semibold ring-1 ring-rose-500';
                        }

                        return (
                          <button
                            key={optIndex}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIndex === q.correctIndex && (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 rounded-xl bg-stone-100/70 dark:bg-stone-800/50 text-xs text-stone-600 dark:text-stone-300 space-y-1">
                        <span className="font-semibold text-rose-600 dark:text-rose-400 block">
                          {isCorrect ? '✅ Bạn đã trả lời chính xác!' : '❌ Chưa chính xác.'}
                        </span>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted && (
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 text-xs font-semibold disabled:opacity-40 shadow-xs"
                >
                  Nộp bài & Xem giải thích chi tiết
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: My Notes in this Article */}
        {activeTabBottom === 'notes' && (
          <div className="space-y-3">
            {highlights.filter(h => h.articleId === article.id).length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-center text-xs text-stone-500">
                Bạn chưa tô màu hoặc tạo ghi chú nào cho bài đọc này. Hãy rê chuột qua bất kỳ câu nào trong bài và bấm biểu tượng bút đánh dấu để lưu ghi chú!
              </div>
            ) : (
              highlights
                .filter(h => h.articleId === article.id)
                .map(hl => (
                  <div
                    key={hl.id}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <p className="font-japanese text-sm font-medium text-stone-900 dark:text-stone-100">
                        {hl.sentenceText}
                      </p>
                      {hl.note && (
                        <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg">
                          📝 {hl.note}
                        </p>
                      )}
                      <span className="text-[10px] text-stone-400">
                        {new Date(hl.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    <button
                      onClick={() => removeHighlight(hl.sentenceId, article.id)}
                      className="text-stone-400 hover:text-rose-600 text-xs shrink-0"
                    >
                      Xóa
                    </button>
                  </div>
                ))
            )}
          </div>
        )}
      </div>

      {/* Interactive Word Lookup Modal */}
      {(selectedToken || selectedVocabItem) && (
        <WordLookupModal
          token={selectedToken}
          vocabularyItem={selectedVocabItem}
          onClose={() => {
            setSelectedToken(null);
            setSelectedVocabItem(null);
          }}
          articleId={article.id}
          articleTitle={article.title}
        />
      )}

      {/* Kanji Matrix Modal */}
      {isKanjiMatrixOpen && (
        <KanjiMatrixModal
          article={article}
          onClose={() => setIsKanjiMatrixOpen(false)}
        />
      )}
    </article>
  );
};
