import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GeminiService, ChatMessage } from '../../services/geminiService';
import { JLPTLevel, TopicCategory } from '../../types';
import { ALL_TOPICS } from '../../data/newsRepository';
import {
  Bot,
  X,
  Send,
  Sparkles,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Loader2,
  FilePlus,
  ArrowRight,
  Info,
  Globe2,
  Newspaper,
  CheckCircle2
} from 'lucide-react';

export const AiSenseiDrawer: React.FC = () => {
  const {
    isSenseiOpen,
    setIsSenseiOpen,
    selectedArticle,
    senseiContextSentence,
    setSenseiContextSentence,
    addCustomArticle,
    awardXp
  } = useApp();

  const [activeTab, setActiveTab] = useState<'chat' | 'generate'>('chat');

  // Chat state
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Konnichiwa! Mình là **AI Sensei** của Nihongo News.
Mình luôn sẵn sàng giải thích cặn kẽ mọi thắc mắc về tiếng Nhật từ N5 đến N1:
- Giải nghĩa từ vựng, âm Hán Việt và phân tích sắc thái ngữ cảnh.
- Cấu trúc ngữ pháp, trợ từ (\`は/が\`, \`に/で\`, v.v.).
- Dịch và viết lại câu tự nhiên hơn theo phong cách người bản xứ.
- Tạo bài đọc tiếng Nhật chuẩn văn phong báo chí theo chủ đề bạn yêu cầu!

Bạn có thể bấm vào các gợi ý nhanh bên dưới hoặc đặt câu hỏi bất kỳ nhé!`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Generate article state
  const [genTopic, setGenTopic] = useState<TopicCategory>('Văn hóa & Lễ hội');
  const [genLevel, setGenLevel] = useState<JLPTLevel>('N3');
  const [genStyle, setGenStyle] = useState<string>('kilala');
  const [genDepth, setGenDepth] = useState<'standard' | 'deep'>('standard');
  const [genKeyword, setGenKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Pre-fill prompt if triggered with context sentence
  useEffect(() => {
    if (senseiContextSentence) {
      setInputMessage(senseiContextSentence);
    }
  }, [senseiContextSentence]);

  if (!isSenseiOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    const context = selectedArticle
      ? {
          title: selectedArticle.title,
          jlptLevel: selectedArticle.jlptLevel,
          selectedSentence: senseiContextSentence || undefined,
          summary: selectedArticle.summary
        }
      : undefined;

    const history = messages.slice(-4).map(m => ({ role: m.role, text: m.text }));

    const response = await GeminiService.askSensei(text, context, history);

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      role: 'assistant',
      text: response.reply,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      source: response.source
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
    awardXp(5, 'Trao đổi cùng AI Sensei');
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleGeneratePracticeArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenError(null);

    try {
      const newArticle = await GeminiService.generatePractice(
        genTopic,
        genLevel,
        {
          sourceStyle: genStyle,
          depth: genDepth,
          customKeyword: genKeyword.trim() || undefined
        }
      );
      addCustomArticle(newArticle);
      setIsSenseiOpen(false);
    } catch (err: any) {
      setGenError(err.message || 'Không thể tạo bài tập lúc này. Hãy thử lại sau ít phút.');
    } finally {
      setIsGenerating(false);
    }
  };

  const sampleInspirations = [
    'Triết lý Ikigai và Wabi-Sabi',
    'Bò Wagyu và nghệ thuật nước dùng Dashi',
    'Pin thể rắn cho xe điện thế hệ mới',
    'Lễ hội Gion Matsuri Kyoto nghìn năm',
    'Thị trấn không rác Kamikatsu',
    'Chế độ lao động đào tạo Ikusei Shuro'
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setIsSenseiOpen(false)}
    >
      <div
        className="w-full max-w-xl h-full bg-[#FBFBFA] dark:bg-[#15171B] border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col transform animate-in slide-in-from-right duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-rose-600/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                  AI Sensei (日本語の先生)
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs text-stone-500">Giảng viên tiếng Nhật & Biên tập viên sư phạm</p>
            </div>
          </div>

          <button
            onClick={() => setIsSenseiOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Chat vs Generate */}
        <div className="flex items-center border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 px-5 pt-2 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('chat')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Trò chuyện & Giải đáp</span>
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'generate'
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span>Tạo bài đọc mới bằng AI (Văn phong báo chí)</span>
          </button>
        </div>

        {/* Tab 1: Chat View */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Context Notification Banner if an article is open */}
            {selectedArticle && (
              <div className="px-5 py-2.5 bg-rose-50/60 dark:bg-rose-950/20 border-b border-rose-200/50 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 flex items-center justify-between">
                <span className="truncate">
                  📖 Đang xem bài: <strong>{selectedArticle.title}</strong>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-rose-200/60 dark:bg-rose-900/60 text-[10px] font-bold shrink-0 ml-2">
                  JLPT {selectedArticle.jlptLevel}
                </span>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      m.role === 'user'
                        ? 'bg-rose-600 text-white rounded-br-xs font-medium'
                        : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-800 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 w-fit text-xs text-stone-500">
                  <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                  <span>Sensei đang phân tích và viết bài giải nghĩa...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-4 py-2 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 flex items-center gap-1.5 overflow-x-auto text-xs whitespace-nowrap">
              <span className="text-[10px] text-stone-400 font-semibold self-center pr-1">Hỏi nhanh:</span>
              {[
                'Phân tích ngữ pháp câu này',
                'Tại sao dùng trợ từ が thay vì は?',
                'Phân biệt trợ từ に và で',
                'Bóc tách chủ vị & dịch câu này',
                'Âm Hán Việt & quy luật chuyển âm',
                'Viết lại theo văn phong báo chí (だ・である)',
                'Tạo 3 câu ví dụ tương tự'
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPrompt(p)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-[11px] font-medium"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="Hỏi về từ vựng, trợ từ, ngữ pháp tiếng Nhật..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Generate Custom AI Journalistic Practice Article */}
        {activeTab === 'generate' && (
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-[11px] font-bold mb-1.5">
                <Newspaper className="w-3.5 h-3.5" />
                Văn phong báo chí & cẩm nang uy tín
              </div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Tạo bài đọc mới bằng AI — Chuẩn mực báo chí tiếng Nhật
              </h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Tự động biên soạn bài đọc theo phong cách của các cẩm nang văn hóa và thời sự hàng đầu (Kilala, Tsunagu Japan, LocoBee, Japan Travel, Taste of Japan, Nikkei/NHK) kèm Furigana, âm Hán Việt, phân tích ngữ pháp và câu hỏi hiểu bài.
              </p>
            </div>

            <form onSubmit={handleGeneratePracticeArticle} className="space-y-4 text-xs">
              {/* Source Style Selector */}
              <div>
                <label className="font-bold text-stone-800 dark:text-stone-200 block mb-1.5">
                  Văn phong & Cơ quan tham khảo:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'vietnam_today_vtv', name: 'Vietnam Today VTV', desc: 'Đối ngoại, nhịp cầu thanh niên & hợp tác' },
                    { id: 'vna_net', name: 'VNA Net Thông tấn xã', desc: 'Chính luận, kinh tế vĩ mô & FDI' },
                    { id: 'kyodo_news', name: 'Kyodo News 共同通信', desc: 'Hãng thông tấn #1, thời sự quốc tế' },
                    { id: 'toyo_keizai', name: 'Toyo Keizai 東洋経済', desc: 'Kinh tế, tài chính, công nghệ cao' },
                    { id: 'kilala', name: 'Cẩm nang Kilala', desc: 'Thẩm mỹ, văn hóa sâu sắc, tinh tế' },
                    { id: 'tsunagu_japan', name: 'Tsunagu Japan', desc: 'Du lịch trải nghiệm, khám phá đời sống' },
                    { id: 'locobee', name: 'LocoBee', desc: 'Đời sống, việc làm người Việt tại Nhật' },
                    { id: 'taste_of_japan', name: 'Taste of Japan', desc: 'Tinh hoa ẩm thực, nông sản Wagyu' },
                    { id: 'japan_travel', name: 'Japan Travel JNTO', desc: 'Di sản, cảnh sắc thiên nhiên 4 mùa' },
                    { id: 'nhk_journalism', name: 'Báo chí chính luận', desc: 'Thể だ・である, số liệu khách quan' }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setGenStyle(s.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        genStyle === s.id
                          ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 ring-1 ring-rose-500'
                          : 'bg-white dark:bg-stone-850 border-stone-200 dark:border-stone-700 hover:border-stone-400'
                      }`}
                    >
                      <div className="font-bold text-stone-900 dark:text-stone-100 text-xs flex items-center justify-between">
                        <span>{s.name}</span>
                        {genStyle === s.id && <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* JLPT Level */}
              <div>
                <label className="font-bold text-stone-800 dark:text-stone-200 block mb-1.5">
                  Cấp độ JLPT mục tiêu:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setGenLevel(lvl)}
                      className={`py-2 rounded-xl font-bold transition-all ${
                        genLevel === lvl
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Selector (12 domains) */}
              <div>
                <label className="font-bold text-stone-800 dark:text-stone-200 block mb-1.5">
                  Lĩnh vực chuyên đề:
                </label>
                <select
                  value={genTopic}
                  onChange={e => setGenTopic(e.target.value as TopicCategory)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none text-xs font-medium text-stone-800 dark:text-stone-200"
                >
                  {ALL_TOPICS.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Depth Selector */}
              <div>
                <label className="font-bold text-stone-800 dark:text-stone-200 block mb-1.5">
                  Độ sâu và dung lượng bài:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGenDepth('standard')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                      genDepth === 'standard'
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600'
                    }`}
                  >
                    Đoản văn chuẩn mực (3 phút đọc)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGenDepth('deep')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                      genDepth === 'deep'
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600'
                    }`}
                  >
                    Phóng sự chuyên sâu (5 phút đọc)
                  </button>
                </div>
              </div>

              {/* Custom Keyword */}
              <div>
                <label className="font-bold text-stone-800 dark:text-stone-200 block mb-1.5">
                  Từ khóa hoặc chủ đề muốn khai thác:
                </label>
                <input
                  type="text"
                  value={genKeyword}
                  onChange={e => setGenKeyword(e.target.value)}
                  placeholder="Ví dụ: Triết lý Ikigai, Bò Wagyu Matsusaka, Pin thể rắn Toyota..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none text-xs"
                />

                {/* Quick Inspiration chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-stone-400 self-center">Gợi ý nhanh:</span>
                  {sampleInspirations.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGenKeyword(chip)}
                      className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 text-[10px] text-stone-600 dark:text-stone-300 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {genError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs">
                  {genError}
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sensei đang chấp bút theo chuẩn báo chí...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Biên soạn bài đọc chuẩn báo chí ngay (+10 XP)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
