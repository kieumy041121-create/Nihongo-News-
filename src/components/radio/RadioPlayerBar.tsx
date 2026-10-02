import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SpeechService } from '../../services/speechService';
import {
  Radio,
  Play,
  Pause,
  SkipForward,
  X,
  Volume2,
  Trash2,
  AlertCircle
} from 'lucide-react';

export const RadioPlayerBar: React.FC = () => {
  const {
    radioQueue,
    removeFromRadioQueue,
    isRadioOpen,
    setIsRadioOpen,
    selectArticle,
    speechSpeed
  } = useApp();

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPausedBetweenArticles, setIsPausedBetweenArticles] = useState(false);

  const currentArticle = radioQueue[currentTrackIndex];

  // Stop audio when closed
  useEffect(() => {
    if (!isRadioOpen) {
      SpeechService.stop();
      setIsPlaying(false);
    }
  }, [isRadioOpen]);

  if (!isRadioOpen || radioQueue.length === 0) return null;

  const playArticleByIndex = (index: number) => {
    if (index >= radioQueue.length) {
      setIsPlaying(false);
      return;
    }

    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setIsPausedBetweenArticles(false);

    const targetArticle = radioQueue[index];
    const fullText = targetArticle.sentences.map(s => s.text).join(' ');

    SpeechService.speak(fullText, {
      rate: speechSpeed,
      onEnd: () => {
        // Natural 3-second pause between articles
        setIsPausedBetweenArticles(true);
        setTimeout(() => {
          if (index + 1 < radioQueue.length) {
            playArticleByIndex(index + 1);
          } else {
            setIsPlaying(false);
            setIsPausedBetweenArticles(false);
          }
        }, 3000);
      },
      onError: () => {
        setIsPlaying(false);
        setIsPausedBetweenArticles(false);
      }
    });
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      SpeechService.stop();
      setIsPlaying(false);
    } else {
      playArticleByIndex(currentTrackIndex);
    }
  };

  const handleNextTrack = () => {
    SpeechService.stop();
    const nextIdx = (currentTrackIndex + 1) % radioQueue.length;
    playArticleByIndex(nextIdx);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FBFBFA]/95 dark:bg-[#121316]/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-2xl p-4 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                Radio Mode • Bài {currentTrackIndex + 1}/{radioQueue.length}
              </span>
              {isPausedBetweenArticles && (
                <span className="text-[10px] text-amber-500 font-semibold animate-pulse">
                  Nghỉ 3 giây trước bài tiếp theo...
                </span>
              )}
            </div>
            <h4
              onClick={() => currentArticle && selectArticle(currentArticle)}
              className="text-xs sm:text-sm font-bold font-japanese text-stone-900 dark:text-stone-100 truncate cursor-pointer hover:underline"
            >
              {currentArticle?.title || 'Chưa có bài trong danh sách'}
            </h4>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleTogglePlay}
            className="w-10 h-10 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center hover:scale-105 transition-transform shadow-md"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <button
            onClick={handleNextTrack}
            title="Chuyển sang bài kế tiếp"
            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Playlist Chips & Close */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto max-w-sm">
            {radioQueue.map((item, idx) => (
              <span
                key={item.id}
                onClick={() => playArticleByIndex(idx)}
                className={`text-[11px] font-japanese px-2 py-1 rounded-lg border cursor-pointer truncate max-w-[100px] ${
                  idx === currentTrackIndex
                    ? 'bg-rose-600 text-white border-rose-600 font-bold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 border-stone-200 dark:border-stone-700'
                }`}
              >
                {item.title}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] text-stone-400 hidden md:inline">
              (Phát nền phụ thuộc vào cài đặt trình duyệt)
            </span>
            <button
              onClick={() => setIsRadioOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
