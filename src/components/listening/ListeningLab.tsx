import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SpeechService, AudioRecorderService } from '../../services/speechService';
import { Sentence } from '../../types';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Mic,
  Square,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

export const ListeningLab: React.FC = () => {
  const { articles, awardXp, speechSpeed, setSpeechSpeed } = useApp();
  const [selectedArticleId, setSelectedArticleId] = useState(articles[0].id);

  const article = articles.find(a => a.id === selectedArticleId) || articles[0];

  // Comprehension test state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number | null>(null);
  const [isTranscriptRevealed, setIsTranscriptRevealed] = useState(false);
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, number>>({});
  const [isListeningSubmitted, setIsListeningSubmitted] = useState(false);

  // Shadowing state
  const [selectedShadowSentence, setSelectedShadowSentence] = useState<Sentence>(article.sentences[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recorderInstance] = useState(() => new AudioRecorderService());
  const [recordError, setRecordError] = useState<string | null>(null);

  // Play full audio
  const handlePlayFull = () => {
    if (isAudioPlaying) {
      SpeechService.stop();
      setIsAudioPlaying(false);
      setActiveSentenceIdx(null);
      return;
    }

    setIsAudioPlaying(true);
    let index = 0;

    const playNext = () => {
      if (index >= article.sentences.length) {
        setIsAudioPlaying(false);
        setActiveSentenceIdx(null);
        return;
      }

      setActiveSentenceIdx(index);
      SpeechService.speak(article.sentences[index].text, {
        rate: speechSpeed,
        onEnd: () => {
          index += 1;
          setTimeout(playNext, 500);
        },
        onError: () => {
          setIsAudioPlaying(false);
          setActiveSentenceIdx(null);
        }
      });
    };

    playNext();
  };

  const handlePlaySentence = (s: Sentence, idx: number) => {
    SpeechService.stop();
    setIsAudioPlaying(false);
    setActiveSentenceIdx(idx);
    SpeechService.speak(s.text, {
      rate: speechSpeed,
      onEnd: () => setActiveSentenceIdx(null)
    });
  };

  // Submit listening test
  const handleSubmitTest = () => {
    setIsListeningSubmitted(true);
    setIsTranscriptRevealed(true);
    awardXp(15, 'Hoàn thành bài luyện nghe');
  };

  // Recording actions
  const handleStartRecording = async () => {
    try {
      setRecordError(null);
      setRecordedAudioUrl(null);
      await recorderInstance.startRecording();
      setIsRecording(true);
    } catch (e: any) {
      setRecordError(e.message || 'Không thể truy cập microphone. Vui lòng cấp quyền trong trình duyệt.');
    }
  };

  const handleStopRecording = async () => {
    try {
      const url = await recorderInstance.stopRecording();
      setRecordedAudioUrl(url);
      setIsRecording(false);
      awardXp(5, 'Luyện đọc Shadowing');
    } catch (e: any) {
      setRecordError(e.message || 'Lỗi khi lưu bản ghi âm.');
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <Headphones className="w-3.5 h-3.5" />
            <span>Phòng luyện nghe & Shadowing tương tác</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans tracking-tight">
            Luyện nghe hiểu & Kỹ thuật Shadowing
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Quy trình chuẩn: Nghe không phụ đề → Trả lời câu hỏi → Mở transcript đối chiếu → Ghi âm Shadowing.
          </p>
        </div>

        {/* Article Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-semibold whitespace-nowrap">Chọn bài nghe:</span>
          <select
            value={selectedArticleId}
            onChange={e => {
              setSelectedArticleId(e.target.value);
              setIsTranscriptRevealed(false);
              setIsListeningSubmitted(false);
              setListeningAnswers({});
              SpeechService.stop();
              setIsAudioPlaying(false);
            }}
            className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 outline-none"
          >
            {articles.map(a => (
              <option key={a.id} value={a.id}>
                [{a.jlptLevel}] {a.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Comprehension & Audio Player */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-xs font-bold">
                  JLPT {article.jlptLevel}
                </span>
                <h3 className="text-xl font-bold font-japanese text-stone-900 dark:text-stone-100 mt-2">
                  {article.title}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{article.titleVi}</p>
              </div>

              {/* Speed selector */}
              <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 text-xs font-semibold shrink-0">
                {[0.75, 1.0, 1.25].map(spd => (
                  <button
                    key={spd}
                    onClick={() => setSpeechSpeed(spd)}
                    className={`px-2 py-1 rounded-lg ${
                      speechSpeed === spd
                        ? 'bg-white dark:bg-stone-900 text-rose-600 shadow-xs'
                        : 'text-stone-500'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Master Audio Controller */}
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayFull}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all shadow-md ${
                    isAudioPlaying ? 'bg-amber-600' : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  {isAudioPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                </button>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {isAudioPlaying ? 'Đang phát bài đọc...' : 'Bấm để nghe toàn bài'}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {activeSentenceIdx !== null
                      ? `Đang đọc câu ${activeSentenceIdx + 1}/${article.sentences.length}`
                      : 'Hãy tập trung lắng nghe và ghi nhớ ý chính'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsTranscriptRevealed(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                {isTranscriptRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{isTranscriptRevealed ? 'Ẩn Transcript' : 'Xem Transcript'}</span>
              </button>
            </div>

            {/* Comprehension Quiz (Before transcript) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                  <span>Câu hỏi kiểm tra nghe hiểu ({article.quiz.length} câu)</span>
                </h4>
                {isListeningSubmitted && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Đã nộp bài (+15 XP)
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {article.quiz.map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 space-y-2.5 text-xs">
                    <p className="font-semibold text-stone-900 dark:text-stone-100 font-japanese">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = listeningAnswers[q.id] === oIdx;
                        let btnStyle = 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700';

                        if (isListeningSubmitted) {
                          if (oIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-semibold';
                          } else if (isChosen) {
                            btnStyle = 'bg-rose-100 text-rose-900 border-rose-400 line-through';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-indigo-50 text-indigo-800 border-indigo-500 font-semibold ring-1 ring-indigo-400';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isListeningSubmitted}
                            onClick={() => setListeningAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isListeningSubmitted && (
                      <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-200/60 dark:border-stone-700">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {!isListeningSubmitted && (
                <button
                  onClick={handleSubmitTest}
                  disabled={Object.keys(listeningAnswers).length === 0}
                  className="w-full py-3 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold hover:bg-stone-800 transition-colors disabled:opacity-40"
                >
                  Nộp câu trả lời & Mở Transcript (+15 XP)
                </button>
              )}
            </div>
          </div>

          {/* Transcript view when revealed */}
          {isTranscriptRevealed && (
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Transcript chi tiết từng câu
                </h4>
                <span className="text-xs text-stone-400">Bấm câu bất kỳ để chọn luyện Shadowing</span>
              </div>

              <div className="space-y-3">
                {article.sentences.map((s, idx) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedShadowSentence(s)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedShadowSentence.id === s.id
                        ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
                        : 'bg-stone-50 dark:bg-stone-850 border-stone-200/60 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-japanese text-sm font-bold text-stone-900 dark:text-stone-100">
                        {s.text}
                      </p>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handlePlaySentence(s, idx);
                        }}
                        title="Nghe câu này"
                        className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-500 italic mt-1">{s.translation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Shadowing Studio */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Phòng luyện Shadowing (シャドーイング)
                </h3>
              </div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md">
                Luyện phát âm & ngữ điệu
              </span>
            </div>

            {/* Target Sentence Card */}
            <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 space-y-3">
              <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                Câu mục tiêu đang chọn:
              </span>
              <p className="font-japanese text-xl font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
                {selectedShadowSentence.text}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                {selectedShadowSentence.translation}
              </p>

              <button
                onClick={() => SpeechService.speak(selectedShadowSentence.text, { rate: speechSpeed })}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe giọng đọc bản xứ mẫu</span>
              </button>
            </div>

            {/* Recording Controls */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 text-center space-y-4">
              <div className="text-xs text-stone-500 max-w-sm mx-auto">
                Bấm nút ghi âm dưới đây, đọc nhại theo câu mẫu của người bản xứ (Shadowing), sau đó nghe lại để so sánh ngữ điệu.
              </div>

              {/* Record Button */}
              <div className="flex items-center justify-center">
                {isRecording ? (
                  <button
                    onClick={handleStopRecording}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 text-white text-xs font-bold animate-pulse shadow-lg"
                  >
                    <Square className="w-4 h-4 fill-white" />
                    <span>Dừng ghi âm...</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStartRecording}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 text-xs font-bold shadow-md transition-all"
                  >
                    <Mic className="w-4 h-4 text-rose-500" />
                    <span>Bắt đầu ghi âm giọng bạn</span>
                  </button>
                )}
              </div>

              {recordError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{recordError}</span>
                </div>
              )}

              {/* Playback Recorded Audio */}
              {recordedAudioUrl && (
                <div className="pt-4 border-t border-stone-200 dark:border-stone-700 space-y-3">
                  <div className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Đã ghi âm thành công! Hãy nghe lại và so sánh:</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <audio src={recordedAudioUrl} controls className="h-9 max-w-xs w-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Shadowing Pedagogical Tips (Requirement 6) */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-2 text-xs text-amber-900 dark:text-amber-200">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Mẹo luyện Shadowing hiệu quả:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed opacity-90 pl-1">
                <li>Bắt chước cao độ (Pitch Accent) lên xuống ở từng từ thay vì đọc đều đều giọng Việt.</li>
                <li>Không ngắt câu tùy tiện; chỉ ngắt nghỉ ở sau các trợ từ liên kết chính như は, が, を, に.</li>
                <li>Luyện tập lại 3–5 lần cho tới khi giọng bạn phát ra tự nhiên và ăn khớp với tốc độ bản xứ.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
