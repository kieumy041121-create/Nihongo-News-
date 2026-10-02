import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SimulatorPassage } from '../../types';
import { SIMULATOR_PASSAGES } from '../../data/simulatorPassages';
import {
  GraduationCap,
  Timer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Eye,
  ShieldAlert
} from 'lucide-react';

export const JlptSimulator: React.FC = () => {
  const { awardXp } = useApp();

  const [selectedPassageId, setSelectedPassageId] = useState(SIMULATOR_PASSAGES[0].id);
  const passage: SimulatorPassage =
    SIMULATOR_PASSAGES.find(p => p.id === selectedPassageId) || SIMULATOR_PASSAGES[0];

  // Exam phase: 'intro' | 'testing' | 'result'
  const [examPhase, setExamPhase] = useState<'intro' | 'testing' | 'result'>('intro');
  const [timeLeft, setTimeLeft] = useState(passage.timeLimitSeconds);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeSpent, setTimeSpent] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start exam
  const handleStartExam = () => {
    setExamPhase('testing');
    setTimeLeft(passage.timeLimitSeconds);
    setTimeSpent(0);
    setAnswers({});

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);
  };

  // Finish exam
  const handleFinishExam = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setExamPhase('result');

    // Calculate score
    let correct = 0;
    passage.questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });

    awardXp(25, `Hoàn thành bài thi JLPT Dokkai (${correct}/${passage.questions.length} câu đúng)`);
  };

  // Reset
  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setExamPhase('intro');
    setTimeLeft(passage.timeLimitSeconds);
    setAnswers({});
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const correctCount = passage.questions.filter(q => answers[q.id] === q.correctIndex).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Mô phỏng kỳ thi Năng lực Nhật ngữ chính thức</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans tracking-tight">
            JLPT Dokkai Simulator (Luyện đọc hiểu)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Không furigana, không bản dịch, có áp lực thời gian thực tế để rèn luyện bản lĩnh phòng thi.
          </p>
        </div>

        {/* Passage Selection (Only during intro) */}
        {examPhase === 'intro' && (
          <select
            value={selectedPassageId}
            onChange={e => {
              setSelectedPassageId(e.target.value);
              setExamPhase('intro');
            }}
            className="px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 outline-none"
          >
            {SIMULATOR_PASSAGES.map(p => (
              <option key={p.id} value={p.id}>
                [{p.jlptLevel}] {p.typeName}: {p.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Disclaimers & Ethics */}
      <div className="p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-850 text-stone-600 dark:text-stone-400 text-xs flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          Lưu ý: Đây là bộ đề đọc hiểu luyện tập mô phỏng theo cấu trúc JLPT Dokkai do ban biên tập thiết kế, không phải đề thi rò rỉ hay đề thi có bản quyền.
        </span>
      </div>

      {/* PHASE 1: INTRO */}
      {examPhase === 'intro' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600">
              <span>{passage.typeName}</span> • <span>Cấp độ JLPT {passage.jlptLevel}</span>
            </div>
            <h2 className="text-xl font-bold font-japanese text-stone-900 dark:text-stone-100">
              {passage.title}
            </h2>
            <p className="text-xs text-stone-500">{passage.titleVi}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
            <div>
              <span className="block text-stone-400 text-[10px] uppercase">Thời gian làm bài:</span>
              <span className="font-bold text-base text-stone-900 dark:text-stone-100 mt-0.5 block">
                {Math.floor(passage.timeLimitSeconds / 60)} phút
              </span>
            </div>
            <div>
              <span className="block text-stone-400 text-[10px] uppercase">Số lượng câu hỏi:</span>
              <span className="font-bold text-base text-stone-900 dark:text-stone-100 mt-0.5 block">
                {passage.questions.length} câu trắc nghiệm
              </span>
            </div>
          </div>

          <div className="text-xs text-stone-500 text-left space-y-1.5 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 text-amber-900 dark:text-amber-200">
            <span className="font-bold block">Quy chế phòng thi mô phỏng:</span>
            <ul className="list-disc list-inside space-y-1 text-[11px] opacity-90 pl-1">
              <li>Toàn bộ Furigana và bản dịch tiếng Việt sẽ bị khóa.</li>
              <li>Đồng hồ đếm ngược sẽ bắt đầu chạy ngay khi bạn nhấn nút.</li>
              <li>Sau khi nộp bài, bạn sẽ được mở khóa đáp án, lời giải thích và bản dịch đối chiếu.</li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 font-bold text-sm shadow-md transition-all"
          >
            Bắt đầu làm bài thi ngay
          </button>
        </div>
      )}

      {/* PHASE 2: TESTING (No furigana, countdown running) */}
      {examPhase === 'testing' && (
        <div className="space-y-6">
          {/* Sticky Countdown Header */}
          <div className="sticky top-16 z-30 bg-[#FBFBFA]/95 dark:bg-[#121316]/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold">
                {passage.typeName}
              </span>
              <span className="text-xs text-stone-500 font-semibold hidden sm:inline">
                JLPT {passage.jlptLevel}
              </span>
            </div>

            <div
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-mono text-sm font-bold border transition-colors ${
                timeLeft < 60
                  ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleFinishExam}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              Nộp bài thi
            </button>
          </div>

          {/* Passage Reading Canvas (strictly NO furigana / translation) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-japanese text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-4">
              {passage.title}
            </h3>

            <div className="font-japanese text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-loose whitespace-pre-line select-none">
              {passage.passageText}
            </div>
          </div>

          {/* Test Questions */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-8">
            <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
              Câu hỏi đọc hiểu ({passage.questions.length} câu)
            </h4>

            <div className="space-y-8">
              {passage.questions.map((q, idx) => (
                <div key={q.id} className="space-y-3">
                  <p className="font-japanese font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                    【問 {idx + 1}】 {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = answers[q.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-japanese transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border-rose-500 font-semibold ring-1 ring-rose-500'
                              : 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                          }`}
                        >
                          <span>{opt}</span>
                          <span className="w-5 h-5 rounded-full border border-stone-300 dark:border-stone-600 flex items-center justify-center text-[10px] font-mono shrink-0 ml-2">
                            {oIdx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
              <button
                onClick={handleFinishExam}
                className="px-8 py-3 rounded-2xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 font-bold text-xs shadow-md transition-colors"
              >
                Hoàn thành & Nộp bài (+25 XP)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: RESULTS & EXPLANATION (Unlocks Furigana & Translation) */}
      {examPhase === 'result' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Result Score Banner */}
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm text-center space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 mx-auto">
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                Kết quả bài thi mô phỏng JLPT
              </h2>
              <p className="text-xs text-stone-500">
                Thời gian làm bài: {Math.floor(timeSpent / 60)} phút {timeSpent % 60} giây
              </p>
            </div>

            <div className="inline-block p-4 px-8 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800">
              <div className="text-xs text-stone-400 uppercase font-semibold">Điểm số đạt được:</div>
              <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mt-1">
                {correctCount} / {passage.questions.length} câu đúng
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại bài thi</span>
              </button>
            </div>
          </div>

          {/* Unlocked Bilingual & Explanatory Review */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-600" />
                <span>Bản dịch và giải thích chi tiết (Unlocked Review)</span>
              </h3>
              <span className="text-xs text-emerald-600 font-semibold">
                Đã mở khóa toàn bộ Furigana & Dịch
              </span>
            </div>

            {/* Bilingual Passage */}
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 space-y-3">
              <span className="text-xs font-semibold text-stone-400 uppercase">Bản dịch tiếng Việt tham khảo:</span>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                {passage.passageTextVi}
              </p>
            </div>

            {/* Questions with Explanations */}
            <div className="space-y-6 pt-4">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Phân tích từng câu hỏi:
              </h4>

              {passage.questions.map((q, idx) => {
                const isCorrect = answers[q.id] === q.correctIndex;

                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 dark:text-stone-100 font-japanese">
                        Câu {idx + 1}: {q.question}
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Đúng (+5 XP)
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Sai
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border ${
                            oIdx === q.correctIndex
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-semibold'
                              : answers[q.id] === oIdx
                              ? 'bg-rose-100 text-rose-900 border-rose-400 line-through'
                              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300">
                      <span className="font-bold text-rose-600 block mb-0.5">Lời giải thích:</span>
                      <p>{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
