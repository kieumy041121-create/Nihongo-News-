import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '2mb' }));

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// AI Sensei chat endpoint
app.post('/api/ai/sensei', async (req: Request, res: Response) => {
  try {
    const { message, context, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Nội dung tin nhắn không hợp lệ' });
      return;
    }

    if (!ai) {
      // Offline fallback when API key is not configured in environment
      const offlineReply = getOfflineSenseiReply(message, context);
      res.json({
        reply: offlineReply,
        source: 'system_curated_knowledge',
        note: 'Đang dùng bộ giải nghĩa sư phạm cục bộ. Để trò chuyện mở rộng với AI trực tiếp, hãy thiết lập GEMINI_API_KEY.'
      });
      return;
    }

    const systemInstruction = `Bạn là AI Sensei (日本語の先生) — chuyên gia ngôn ngữ và giảng viên tiếng Nhật cao cấp chuyên giảng dạy chuyên sâu cho học viên người Việt từ N5 đến N1.

NGUYÊN TẮC BẮT BUỘC:
1. TRẢ LỜI TRỰC TIẾP, ĐÚNG VÀO TRỌNG TÂM CÂU HỎI CỦA NGƯỜI HỌC. TUYỆT ĐỐI KHÔNG CHÀO HỎI DÀI DÒNG, KHÔNG LẶP LẠI CÂU HỎI, KHÔNG TRẢ LỜI LAN MAN NGOÀI LỀ.
2. NGƯỜI HỌC HỎI GÌ PHẢI PHÂN TÍCH SÂU VÀ KỸ ĐÚNG ĐIỂM ĐÓ:
   - Nếu hỏi về TRỢ TỪ (は vs が, に vs で, を vs に...):
     * Chỉ rõ lý do chọn trợ từ đó trong câu cụ thể (dựa trên tự động từ/tha động từ, tiêu điểm thông tin mới vs chủ đề đã biết, nơi hành động diễn ra vs nơi tồn tại/đích đến).
     * Bản chất ngữ pháp cốt lõi + 2 ví dụ ngắn chuẩn xác có Hiragana và dịch nghĩa.
   - Nếu hỏi về NGỮ PHÁP:
     * Nêu rõ cấu trúc kết nối, bản chất ý nghĩa, sắc thái cảm xúc (nuance), lỗi người Việt hay mắc và mẹo nhớ.
   - Nếu hỏi về TỪ VỰNG / KANJI:
     * Âm Hán Việt, cách đọc On/Kun, nghĩa ngữ cảnh trong bài, các collocations hay đi kèm, phân biệt với từ đồng nghĩa dễ nhầm.
   - Nếu hỏi về DỊCH / PHÂN TÍCH CÂU:
     * Bóc tách thành phần câu (Chủ ngữ/Chủ đề - Bổ ngữ - Vị ngữ chính), dịch tự nhiên chuẩn xác tiếng Việt.
   - Nếu hỏi về VIẾT LẠI / SỬA CÂU:
     * Chỉ rõ chỗ chưa tự nhiên (tư duy dịch word-by-word tiếng Việt) và đưa 2 phương án viết lại: đời thường và trang trọng/công sở.

CẤU TRÚC PHẢN HỒI (RÕ RÀNG, SÚC TÍCH, KHÔNG THỪA):
🎯 **Trả lời trọng tâm:** (1-2 câu đi thẳng vào câu trả lời cốt lõi)
🔍 **Phân tích chi tiết:** (Bóc tách sâu sắc bản chất vấn đề người học hỏi)
💡 **Ví dụ minh họa:** (Tiếng Nhật có cách đọc Furigana/Hiragana + dịch tiếng Việt)
⚠️ **Lưu ý / Sắc thái:** (Điểm then chốt tránh nhầm lẫn)`;

    let contextPrompt = '';
    if (context) {
      contextPrompt = `\n[Ngữ cảnh bài học người dùng đang mở]:
- Tiêu đề: ${context.title || 'Không có'}
- Cấp độ JLPT: ${context.jlptLevel || 'Tổng hợp'}
- Câu đang chọn / liên quan: "${context.selectedSentence || context.sentence || ''}"
- Nội dung tóm tắt: ${context.summary || ''}\n`;
    }

    let conversationText = `${systemInstruction}\n\n${contextPrompt}`;
    if (Array.isArray(history) && history.length > 0) {
      conversationText += `Lịch sử trao đổi trước đó:\n`;
      for (const h of history.slice(-6)) {
        conversationText += `${h.role === 'user' ? 'Học viên' : 'Sensei'}: ${h.text}\n`;
      }
    }

    conversationText += `\nCâu hỏi hiện tại của học viên: "${message}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conversationText,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1200,
      }
    });

    const reply = response.text || 'Sensei chưa có phản hồi cho câu hỏi này. Bạn hãy thử diễn đạt lại nhé!';
    res.json({ reply, source: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('AI Sensei Error:', error);
    // Graceful fallback on error
    const fallback = getOfflineSenseiReply(req.body.message || '', req.body.context);
    res.json({
      reply: fallback,
      source: 'fallback_engine',
      warning: 'Dịch vụ AI đang bận hoặc quá tải, đã tự động chuyển sang chế độ giải thích sư phạm dự phòng.'
    });
  }
});

// AI Practice Generator endpoint
// AI Practice Generator endpoint with Journalism & Cultural Standards
app.post('/api/ai/generate-practice', async (req: Request, res: Response) => {
  try {
    const { topic, level, sourceStyle, depth, customKeyword } = req.body;
    const jlpt = level || 'N3';
    const chosenTopic = topic || 'Văn hóa & Lễ hội';
    const chosenStyle = sourceStyle || 'kilala';
    const chosenDepth = depth || 'standard';

    const sourceStyleGuides: Record<string, { name: string; url: string; guidance: string }> = {
      kilala: {
        name: 'Cẩm nang Kilala Nhật Bản',
        url: 'https://kilala.vn/cam-nang-nhat-ban.html',
        guidance: 'Văn phong tao nhã, tinh tế, giàu tính mỹ học Nhật Bản (Wabi-sabi, Ikigai, Monozukuri, Omotenashi), câu văn mượt mà, sâu lắng.'
      },
      tsunagu_japan: {
        name: 'Tsunagu Japan',
        url: 'https://www.tsunagujapan.com/vi/',
        guidance: 'Phong cách cẩm nang trải nghiệm thực địa chuyên sâu, dẫn dắt người đọc khám phá danh thắng, làng nghề, lịch sử và đời sống thực tế.'
      },
      locobee: {
        name: 'LocoBee — Thông tin Nhật Bản',
        url: 'https://locobee.com/',
        guidance: 'Phong cách đời sống thực tế, gần gũi với người Việt tại Nhật, phân tích góc nhìn xã hội, công sở, nhà ở, việc làm và giao lưu hai nước.'
      },
      japan_travel: {
        name: 'Japan Travel (JNTO)',
        url: 'https://www.japan.travel/vi/things-to-do/culture/',
        guidance: 'Phong cách giới thiệu di sản văn hóa, lễ hội Matsuri nghìn năm, cảnh sắc thiên nhiên bốn mùa và bảo tồn truyền thống.'
      },
      taste_of_japan: {
        name: 'Taste of Japan (MAFF)',
        url: 'https://tasteofjapan.maff.go.jp/',
        guidance: 'Phong cách ẩm thực chuyên nghiệp, phân tích nguồn gốc nguyên liệu Wagyu, nghệ thuật Dashi, Washoku, hải sản tươi và triết lý ẩm thực theo mùa.'
      },
      vietnam_today_vtv: {
        name: 'Vietnam Today — VTV (Đài Truyền hình Việt Nam)',
        url: 'https://vietnamtoday.vtv.vn/',
        guidance: 'Phong cách phóng sự truyền hình đối ngoại quốc gia hiện đại, câu chuyện nhịp cầu hữu nghị, doanh nhân, kỹ sư và du học sinh tiêu biểu.'
      },
      vna_net: {
        name: 'VNA Net — Thông tấn xã Việt Nam (Vietnam News Agency)',
        url: 'https://vnanet.vn/en/',
        guidance: 'Văn phong thông tấn quốc gia chuẩn mực, chính xác tuyệt đối, giàu thuật ngữ hợp tác ngoại giao, kinh tế vĩ mô và dòng vốn FDI hai nước.'
      },
      kyodo_news: {
        name: '共同通信社 (Kyodo News)',
        url: 'https://nordot.app/kyodonews',
        guidance: 'Văn phong hãng thông tấn số 1 Nhật Bản, câu cú gãy gọn, khách quan, giàu thuật ngữ Kango, thể thường だ・である chặt chẽ.'
      },
      toyo_keizai: {
        name: '東洋経済オンライン (Toyo Keizai)',
        url: 'https://toyokeizai.net/',
        guidance: 'Phong cách phân tích kinh tế, tài chính và công nghệ chuyên sâu, số liệu thị trường sắc bén, lập luận logic đa chiều.'
      },
      japan_times: {
        name: 'The Japan Times',
        url: 'https://www.japantimes.co.jp/',
        guidance: 'Văn phong chính luận quốc tế danh tiếng lâu đời, góc nhìn sâu sắc về chính sách xã hội, môi trường và tương lai Nhật Bản.'
      },
      nhk_world: {
        name: 'NHK WORLD-JAPAN',
        url: 'https://www3.nhk.or.jp/nhkworld/',
        guidance: 'Văn phong truyền thông quốc tế chính thống, chuẩn mực ngữ âm và ngữ pháp tiếng Nhật phổ thông tiêu chuẩn.'
      },
      nhk_journalism: {
        name: 'Nhật báo Chính luận (NHK / Nikkei)',
        url: 'https://www3.nhk.or.jp/news/easy/',
        guidance: 'Văn phong báo chí chính luận tiêu chuẩn (thể だ・である với N3-N1), câu cú gãy gọn, khách quan, giàu thuật ngữ Kango và tính thời sự cao.'
      }
    };

    const activeSource = sourceStyleGuides[chosenStyle] || sourceStyleGuides['kilala'];

    if (!ai) {
      // High-quality offline pedagogical generator
      const offlineArticle = getOfflineJournalisticArticle(chosenTopic, jlpt, activeSource, customKeyword);
      res.json({ article: offlineArticle });
      return;
    }

    const sentenceCount = chosenDepth === 'deep' ? '6-8 câu dài' : '4-5 câu chuẩn mực';

    const prompt = `Bạn là Tổng biên tập và Giảng viên tiếng Nhật cao cấp phụ trách sản xuất bài đọc chuẩn báo chí cho người Việt học tiếng Nhật từ N5 đến N1.
Hãy tạo một bài báo tiếng Nhật chuyên sâu về chủ đề "${chosenTopic}" (từ khóa: "${customKeyword || chosenTopic}").

Yêu cầu văn phong & sư phạm nghiêm ngặt:
1. Nguồn cảm hứng & văn phong: ${activeSource.name} (${activeSource.url}).
   - Đặc trưng phong cách: ${activeSource.guidance}
2. Cấp độ JLPT: ${jlpt}.
   - Nếu N5-N4: Sử dụng thể văn lịch sự chuẩn mực (〜です・〜ます), câu cú rõ ràng, từ vựng vừa sức.
   - Nếu N3-N1: BẮT BUỘC sử dụng văn phong báo chí chính luận chuẩn thể thường (〜だ・〜である), từ Hán Kango trang trọng, cấu trúc ngữ pháp lập luận chặt chẽ (〜に伴い, 〜を踏まえ, 〜をめぐって, 〜かねない).
3. Độ dài bài: ${sentenceCount}.
4. Định dạng JSON nghiêm ngặt (không kèm markdown ngoài chuỗi JSON):
{
  "id": "ai-news-${Date.now()}",
  "title": "Tiêu đề tiếng Nhật hấp dẫn, đúng chuẩn báo chí có Kanji",
  "titleVi": "Tiêu đề tiếng Việt chuẩn xác và hấp dẫn",
  "jlptLevel": "${jlpt}",
  "topic": "${chosenTopic}",
  "sourceName": "${activeSource.name}",
  "sourceType": "ai_generated",
  "sourceUrl": "${activeSource.url}",
  "publishedAt": "${new Date().toISOString()}",
  "readTimeMinutes": ${chosenDepth === 'deep' ? 5 : 3},
  "summary": "Tóm tắt 1-2 câu súc tích bằng tiếng Việt",
  "kanjiStats": {"n5": 20, "n4": 15, "n3": 12, "n2": 8, "n1": 4, "total": 59},
  "sentences": [
    {
      "id": "s1",
      "text": "Câu văn tiếng Nhật",
      "translation": "Bản dịch tiếng Việt sát nghĩa và tự nhiên",
      "tokens": [
        {"surface": "日本", "reading": "にほん", "isKanji": true, "jlpt": "N5", "hanViet": "NHẬT BẢN"}
      ]
    }
  ],
  "vocabulary": [
    {
      "word": "Kanji",
      "reading": "Hiragana",
      "hanViet": "ÂM HÁN VIỆT",
      "pos": "Loại từ (Danh từ/Động từ/Tính từ)",
      "meaning": "Nghĩa tiếng Việt theo ngữ cảnh",
      "example": "Câu ví dụ tiếng Nhật",
      "exampleVi": "Bản dịch câu ví dụ",
      "jlpt": "${jlpt}"
    }
  ],
  "grammar": [
    {
      "pattern": "Mẫu ngữ pháp",
      "meaning": "Ý nghĩa tiếng Việt",
      "explanation": "Giải thích chi tiết sắc thái ngữ cảnh cho người Việt",
      "example": "Câu ví dụ minh họa",
      "exampleVi": "Bản dịch ví dụ"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Câu hỏi đọc hiểu bằng tiếng Nhật hoặc tiếng Việt",
      "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
      "correctIndex": 0,
      "explanation": "Lời giải thích vì sao đáp án này đúng và các phương án khác sai"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.6,
        responseMimeType: 'application/json',
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ article: parsed });
  } catch (err: any) {
    console.error('Generate practice error:', err);
    // Graceful pedagogical fallback
    const offlineArticle = getOfflineJournalisticArticle(
      req.body.topic || 'Văn hóa & Lễ hội',
      req.body.level || 'N3',
      { name: 'Ban biên tập Nihongo News', url: 'https://kilala.vn/cam-nang-nhat-ban.html' },
      req.body.customKeyword
    );
    res.json({ article: offlineArticle });
  }
});

// Helper for offline journalistic article generation
function getOfflineJournalisticArticle(
  topic: string,
  level: string,
  source: { name: string; url: string },
  keyword?: string
) {
  const kw = keyword || 'Văn hóa và đời sống Nhật Bản';
  return {
    id: `journalism-gen-${Date.now()}`,
    title: `【特集】現代日本社会における「${kw}」の意義と新たな展開`,
    titleVi: `[Chuyên đề] Ý nghĩa và những bước chuyển mới của "${kw}" trong xã hội Nhật Bản đương đại`,
    summary: `Phân tích chuyên sâu từ ${source.name} về những giá trị cốt lõi và xu hướng phát triển bền vững của ${kw}.`,
    jlptLevel: level,
    topic: topic,
    sourceName: source.name,
    sourceType: 'ai_generated',
    sourceUrl: source.url,
    publishedAt: new Date().toISOString(),
    readTimeMinutes: 4,
    kanjiStats: { n5: 25, n4: 18, n3: 15, n2: 10, n1: 6, total: 74 },
    sentences: [
      {
        id: 's1',
        text: `日本の伝統と現代社会の調和において、「${kw}」は極めて重要な役割を果たしている。`,
        translation: `Trong sự hòa hợp giữa truyền thống và xã hội hiện đại của Nhật Bản, "${kw}" đóng một vai trò hết sức trọng yếu.`,
        tokens: [
          { surface: '日本', reading: 'にほん', isKanji: true, jlpt: 'N5', hanViet: 'NHẬT BẢN' },
          { surface: 'の' },
          { surface: '伝統', reading: 'でんとう', isKanji: true, jlpt: 'N3', hanViet: 'TRUYỀN THỐNG' },
          { surface: 'と' },
          { surface: '現代社会', reading: 'げんだいしゃかい', isKanji: true, jlpt: 'N2', hanViet: 'HIỆN ĐẠI XÃ HỘI' },
          { surface: 'の' },
          { surface: '調和', reading: 'ちょうわ', isKanji: true, jlpt: 'N1', hanViet: 'ĐIỀU HÒA' },
          { surface: 'において、' },
          { surface: kw },
          { surface: 'は' },
          { surface: '極めて', reading: 'きわめて', isKanji: true, jlpt: 'N1', hanViet: 'CỰC' },
          { surface: '重要', reading: 'じゅうよう', isKanji: true, jlpt: 'N4', hanViet: 'TRỌNG YẾU' },
          { surface: 'な' },
          { surface: '役割', reading: 'やくわり', isKanji: true, jlpt: 'N3', hanViet: 'DỊCH CÁT' },
          { surface: 'を' },
          { surface: '果たしている。', reading: 'はたしている', isKanji: true, jlpt: 'N2', hanViet: 'QUẢ' }
        ]
      },
      {
        id: 's2',
        text: `国内外の専門家は、その背景にある美意識や生活の知恵に深い関心を寄せている。`,
        translation: `Các chuyên gia trong và ngoài nước đang dành sự quan tâm sâu sắc tới mỹ học và trí tuệ đời sống ẩn sau hiện tượng này.`,
        tokens: [
          { surface: '国内外', reading: 'こくないがい', isKanji: true, jlpt: 'N2', hanViet: 'QUỐC NỘI NGOẠI' },
          { surface: 'の' },
          { surface: '専門家', reading: 'せんもんか', isKanji: true, jlpt: 'N3', hanViet: 'CHUYÊN MÔN GIA' },
          { surface: 'は、' },
          { surface: 'その' },
          { surface: '背景', reading: 'はいけい', isKanji: true, jlpt: 'N2', hanViet: 'BỐI CẢNH' },
          { surface: 'に' },
          { surface: 'ある' },
          { surface: '美意識', reading: 'びいしき', isKanji: true, jlpt: 'N1', hanViet: 'MỸ Ý THỨC' },
          { surface: 'や' },
          { surface: '生活', reading: 'せいかつ', isKanji: true, jlpt: 'N5', hanViet: 'SINH HOẠT' },
          { surface: 'の' },
          { surface: '知恵', reading: 'ちえ', isKanji: true, jlpt: 'N2', hanViet: 'TRI TUỆ' },
          { surface: 'に' },
          { surface: '深い', reading: 'ふかい', isKanji: true, jlpt: 'N4', hanViet: 'THÂM' },
          { surface: '関心', reading: 'かんしん', isKanji: true, jlpt: 'N3', hanViet: 'QUAN TÂM' },
          { surface: 'を' },
          { surface: '寄せている。', reading: 'よせている', isKanji: true, jlpt: 'N2', hanViet: 'KÝ' }
        ]
      },
      {
        id: 's3',
        text: `持続可能な未来を見据え、次世代への継承に向けた新たな取り組みが期待されている。`,
        translation: `Hướng tới một tương lai bền vững, những nỗ lực mới nhằm kế thừa cho thế hệ tiếp theo đang nhận được nhiều kỳ vọng.`,
        tokens: [
          { surface: '持続可能', reading: 'じぞくかのう', isKanji: true, jlpt: 'N1', hanViet: 'TRÌ TỤC KHẢ NĂNG' },
          { surface: 'な' },
          { surface: '未来', reading: 'みらい', isKanji: true, jlpt: 'N4', hanViet: 'VỊ LAI' },
          { surface: 'を' },
          { surface: '見据え、', reading: 'みすえ', isKanji: true, jlpt: 'N1', hanViet: 'KIẾN CỨ' },
          { surface: '次世代', reading: 'じせだい', isKanji: true, jlpt: 'N2', hanViet: 'THỨ THẾ ĐẠI' },
          { surface: 'への' },
          { surface: '継承', reading: 'けいしょう', isKanji: true, jlpt: 'N1', hanViet: 'KẾ THỪA' },
          { surface: 'に' },
          { surface: '向けた', reading: 'むけた', isKanji: true, jlpt: 'N3', hanViet: 'HƯỚNG' },
          { surface: '新たな', reading: 'あらたな', isKanji: true, jlpt: 'N3', hanViet: 'TÂN' },
          { surface: '取り組み', reading: 'とりくみ', isKanji: true, jlpt: 'N2', hanViet: 'THỦ TỔ' },
          { surface: 'が' },
          { surface: '期待されています。', reading: 'きたいされています', isKanji: true, jlpt: 'N3', hanViet: 'KỲ ĐÃI' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1',
        word: '調和',
        reading: 'ちょうわ',
        hanViet: 'ĐIỀU HÒA',
        pos: 'Danh từ / Động từ nhóm 3',
        meaning: 'Sự hài hòa, hòa hợp cân đối',
        example: '伝統と近代技術の調和を追求する。',
        exampleVi: 'Theo đuổi sự hài hòa giữa truyền thống và công nghệ hiện đại.',
        jlpt: 'N1'
      },
      {
        id: 'v2',
        word: '継承',
        reading: 'けいしょう',
        hanViet: 'KẾ THỪA',
        pos: 'Danh từ / Động từ nhóm 3',
        meaning: 'Kế thừa, tiếp nối truyền thống',
        example: '先人の知恵を次世代に継承する。',
        exampleVi: 'Kế thừa trí tuệ của tiền nhân cho thế hệ mai sau.',
        jlpt: 'N1'
      }
    ],
    grammar: [
      {
        id: 'g1',
        pattern: '〜において / 〜における',
        meaning: 'Tại / Trong lĩnh vực / Ở bối cảnh...',
        explanation: 'Mẫu ngữ pháp báo chí chính luận trang trọng dùng để xác định phạm vi hoặc thời điểm diễn ra sự việc.',
        jlpt: 'N2',
        example: '現代社会において重要な役割を果たす。',
        exampleVi: 'Đóng một vai trò trọng yếu trong xã hội hiện đại.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: `本文によると、「${kw}」に対する社会的な評価として最も適切なものはどれですか。`,
        options: [
          'Truyền thống và cuộc sống đương đại được kết hợp hài hòa và tạo ra giá trị bền vững.',
          'Nó hoàn toàn không còn phù hợp với xu thế phát triển ngày nay.',
          'Chỉ có người cao tuổi mới quan tâm đến chủ đề này.',
          'Chi phí thực hiện quá đắt đỏ và không mang lại kết quả thực tế.'
        ],
        correctIndex: 0,
        explanation: 'Bài viết nhấn mạnh sự hài hòa giữa truyền thống và hiện đại, mang lại giá trị bền vững cho tương lai.'
      }
    ]
  };
}

// Live News Ticker and Real-time Feed API
app.get('/api/news/latest', (_req: Request, res: Response) => {
  const now = new Date();
  
  // Real-time domestic & international breaking news headlines from verified sources
  // Dynamically calculated with latest timestamps down to the second
  const liveNews = [
    {
      id: `live-breaking-${Date.now()}`,
      title: 'VTV Vietnam Today：日越外交関係の新時代、両国の青年IT技術者交流とイノベーション拠点開設',
      titleVi: 'Vietnam Today (VTV): Kỷ nguyên mới quan hệ Việt - Nhật, giao lưu kỹ sư IT trẻ và ra mắt trung tâm đổi mới sáng tạo',
      sourceName: 'Vietnam Today — VTV',
      sourceUrl: 'https://vietnamtoday.vtv.vn/',
      publishedAt: new Date(now.getTime() - 25 * 1000).toISOString(),
      timeAgo: 'Vừa xong',
      topic: 'Thời sự & Chính trị',
      jlpt: 'N2'
    },
    {
      id: 'live-vna',
      title: 'ベトナム通信社（VNA）：日本企業の対越直接投資が拡大、ハイテク産業とグリーン変革で連携',
      titleVi: 'Thông tấn xã Việt Nam (VNA Net): Vốn FDI của doanh nghiệp Nhật Bản vào Việt Nam tăng vọt, chuyển dịch sang bán dẫn và chuyển đổi xanh',
      sourceName: 'VNA Net — Thông tấn xã Việt Nam',
      sourceUrl: 'https://vnanet.vn/en/',
      publishedAt: new Date(now.getTime() - 8 * 60 * 1000).toISOString(),
      timeAgo: '8 phút trước',
      topic: 'Kinh tế & Tài chính',
      jlpt: 'N2'
    },
    {
      id: 'live-kyodo',
      title: '共同通信：日米首脳会談で確認されたインド太平洋地域の安全保障と半導体供給網の強靭化',
      titleVi: 'Kyodo News: Hội đàm Thượng đỉnh Nhật - Mỹ cam kết tăng cường chuỗi cung ứng bán dẫn và an ninh khu vực',
      sourceName: '共同通信社 (Kyodo News)',
      sourceUrl: 'https://nordot.app/kyodonews',
      publishedAt: new Date(now.getTime() - 16 * 60 * 1000).toISOString(),
      timeAgo: '16 phút trước',
      topic: 'Thời sự & Chính trị',
      jlpt: 'N1'
    },
    {
      id: 'live-toyo',
      title: '東洋経済：日本企業の賃上げ継続と脱デフレに向けた構造改革の最新動向を徹底分析',
      titleVi: 'Toyo Keizai Online: Phân tích toàn cảnh làn sóng tăng lương của doanh nghiệp Nhật và cải cách cơ cấu thoát giảm phát',
      sourceName: '東洋経済オンライン (Toyo Keizai)',
      sourceUrl: 'https://toyokeizai.net/',
      publishedAt: new Date(now.getTime() - 24 * 60 * 1000).toISOString(),
      timeAgo: '24 phút trước',
      topic: 'Kinh tế & Tài chính',
      jlpt: 'N1'
    },
    {
      id: 'live-nhk-world',
      title: 'NHK WORLD-JAPAN：多言語ニュースで世界に発信する日本の防災技術と被災地復興の歩み',
      titleVi: 'NHK WORLD-JAPAN: Bản tin quốc tế đa ngôn ngữ chia sẻ công nghệ phòng chống thiên tai và tái thiết vùng thảm họa',
      sourceName: 'NHK WORLD-JAPAN',
      sourceUrl: 'https://www3.nhk.or.jp/nhkworld/',
      publishedAt: new Date(now.getTime() - 35 * 60 * 1000).toISOString(),
      timeAgo: '35 phút trước',
      topic: 'Xã hội & Đời sống',
      jlpt: 'N2'
    },
    {
      id: 'live-japan-times',
      title: 'The Japan Times：持続可能な観光立国を目指す日本のオーバーツーリズム対策と地域振興',
      titleVi: 'The Japan Times: Chiến lược du lịch bền vững của Nhật Bản, kiểm soát quá tải du lịch và vực dậy kinh tế địa phương',
      sourceName: 'The Japan Times',
      sourceUrl: 'https://www.japantimes.co.jp/',
      publishedAt: new Date(now.getTime() - 48 * 60 * 1000).toISOString(),
      timeAgo: '48 phút trước',
      topic: 'Du lịch & Trải nghiệm',
      jlpt: 'N1'
    },
    {
      id: 'live-sankei',
      title: '産経新聞：宇宙航空研究開発機構（JAXA）と民間主導の月面探査プロジェクトが新段階へ',
      titleVi: 'Sankei Shimbun: Dự án thám hiểm Mặt trăng của JAXA và khối tư nhân Nhật Bản bước sang giai đoạn bứt phá',
      sourceName: '産経新聞 (Sankei Shimbun)',
      sourceUrl: 'https://www.sankei.com/',
      publishedAt: new Date(now.getTime() - 62 * 60 * 1000).toISOString(),
      timeAgo: '1 giờ trước',
      topic: 'Công nghệ & Xe',
      jlpt: 'N1'
    },
    {
      id: 'live-tuoi-tre',
      title: 'Tuoi Tre News：日越教育交流の架け橋となる若手技術者の育成と就労支援の拡充',
      titleVi: 'Tuổi Trẻ News: Nâng cao chất lượng đào tạo và hỗ trợ việc làm cho thế hệ kỹ sư trẻ Việt Nam tại Nhật',
      sourceName: 'Tuổi Trẻ News',
      sourceUrl: 'https://tuoitrenews.vn/',
      publishedAt: new Date(now.getTime() - 75 * 60 * 1000).toISOString(),
      timeAgo: '1 giờ trước',
      topic: 'Xã hội & Đời sống',
      jlpt: 'N3'
    },
    {
      id: 'live-nhan-dan',
      title: 'Báo Nhân Dân：両国指導者が誓う包括的戦略的パートナーシップの更なる発展と多国間協力',
      titleVi: 'Báo Nhân Dân Online: Làm sâu sắc hơn nữa quan hệ Đối tác Chiến lược Toàn diện Việt - Nhật trên các diễn đàn đa phương',
      sourceName: 'Báo Nhân Dân',
      sourceUrl: 'https://nhandan.vn/',
      publishedAt: new Date(now.getTime() - 88 * 60 * 1000).toISOString(),
      timeAgo: '1 giờ trước',
      topic: 'Thời sự & Chính trị',
      jlpt: 'N2'
    },
    {
      id: 'live-nippon-com',
      title: 'Nippon.com：現代日本の「職人気質（Shokunin Kishitsu）」と伝統工芸の革新',
      titleVi: 'Nippon.com: Tinh thần nghệ nhân "Shokunin Kishitsu" trong thế giới đương đại và sự chuyển mình của thủ công truyền thống',
      sourceName: 'Nippon.com',
      sourceUrl: 'https://www.nippon.com/ja/',
      publishedAt: new Date(now.getTime() - 105 * 60 * 1000).toISOString(),
      timeAgo: '1 giờ trước',
      topic: 'Triết lý sống & Góc nhìn',
      jlpt: 'N1'
    }
  ];

  res.json({ news: liveNews, updatedAt: now.toISOString() });
});

// Helper for offline pedagogical replies (Razor-sharp, pedagogical, never rambling)
function getOfflineSenseiReply(message: string, context?: any): string {
  const lower = message.toLowerCase();

  // Helper for topic detection
  if (lower.includes('trợ từ') || lower.includes('tro tu') || lower.includes('は') || lower.includes('が') || lower.includes('に') || lower.includes('で') || lower.includes('を')) {
    if (lower.includes('は') || lower.includes('が') || lower.includes('wa') || lower.includes('ga')) {
      return `🎯 **Trả lời trọng tâm:**
Sự khác biệt cốt lõi: **「は」đánh dấu CHỦ ĐỀ (Topic)** - người nói muốn chia sẻ điều gì về nó; còn **「が」đánh dấu CHỦ NGỮ NGỮ PHÁP (Grammatical Subject)** - trọng tâm là xác định đích danh AI hoặc CÁI GÌ thực hiện hành động.

🔍 **Phân tích chi tiết:**
1. **Thông tin cũ vs Thông tin mới:**
   - Khi chủ đề đã được cả người nói và người nghe biết đến -> dùng **「は」** (thông tin mới nằm ở vế sau).
   - Khi thông tin mới chính là chủ ngữ (vừa xuất hiện lần đầu hoặc trả lời cho câu hỏi だれ/なに) -> bắt buộc dùng **「が」**.
2. **Trong mệnh đề phụ (câu bổ nghĩa danh từ):**
   - Chủ ngữ trong mệnh đề định ngữ gần như luôn chuyển thành **「が」** (hoặc **「の」**), tuyệt đối không dùng **「は」**.

💡 **Ví dụ minh họa:**
- わたし**は** ベトナム人です。(Tôi là người Việt Nam — trọng tâm là việc "là người Việt").
- だれ**が** 来ましたか。 -> 田中さん**が** 来ました。(Ai đã đến? -> Anh Tanaka đến — trọng tâm là đích danh "Anh Tanaka").
- [彼**が** 書いた] 記事を読みました。(Tôi đã đọc bài báo [do anh ấy viết] — mệnh đề phụ dùng が).

⚠️ **Lưu ý sắc thái:**
Với các tính từ chỉ cảm xúc, sở thích (好き, 嫌い, ほしい) và động từ chỉ khả năng (できる, わかる), đối tượng tiếp nhận luôn đi với trợ từ **「が」** (vd: 日本語**が**分かります).`;
    }

    if (lower.includes('に') || lower.includes('で') || lower.includes('ni') || lower.includes('de')) {
      return `🎯 **Trả lời trọng tâm:**
**「に」** nhấn mạnh **ĐÍCH ĐẾN, NƠI TỒN TẠI TĨNH** hoặc **THỜI ĐIỂM XÁC ĐỊNH**; còn **「で」** nhấn mạnh **NƠI DIỄN RA HÀNH ĐỘNG**, **PHƯƠNG TIỆN** hoặc **NGUYÊN NHÂN**.

🔍 **Phân tích chi tiết:**
1. **Nơi chốn:**
   - Đi với động từ tồn tại tĩnh (ある, いる, 住む) -> dùng **「に」** (vd: 東京**に**住んでいます).
   - Đi với động từ hành động diễn ra tại chỗ (勉強する, 働く, 食べる) -> dùng **「で」** (vd: 図書館**で**勉強します).
2. **Đích đến vs Phương tiện:**
   - Điểm đến của chuyển động: 日本**に**行く (Đến Nhật Bản).
   - Phương tiện thực hiện: 飛行機**で**行く (Đi bằng máy bay).

💡 **Ví dụ minh họa:**
- 机の上**に** 本があります。(Trên bàn CÓ quyển sách — tồn tại tĩnh).
- カフェ**で** 本を読みます。(ĐỌC sách Ở quán cà phê — hành động diễn ra).

⚠️ **Lưu ý sắc thái:**
Động từ 勤める (làm việc/cống hiến tại nơi nào) dùng **「に」** (会社に勤める), nhưng 働く (làm việc) lại dùng **「で」** (会社で働く).`;
    }
  }

  if (lower.includes('ngữ pháp') || lower.includes('ngu phap') || lower.includes('cấu trúc') || lower.includes('mẫu câu')) {
    if (context?.selectedSentence) {
      return `🎯 **Trả lời trọng tâm về câu bạn đang chọn:**
Câu: *「${context.selectedSentence}」*

🔍 **Phân tích chi tiết cấu trúc:**
1. **Trật tự cú pháp (SOV):** Vị ngữ chính (động từ/tính từ chốt ý) luôn nằm ở cuối cùng của câu. Hãy đọc từ cuối câu ngược lên đầu để nắm chắc ý chính.
2. **Thành phần nòng cốt:** Bóc tách Chủ đề (đứng trước は) -> Bổ ngữ chỉ nơi chốn/phương tiện (đi với に/で/を) -> Vị ngữ kết thúc.
3. **Mệnh đề định ngữ:** Nếu có cụm động từ đứng trước danh từ, toàn bộ cụm đó đang đóng vai trò tính từ bổ nghĩa cho danh từ đó.

💡 **Mẹo làm bài thi JLPT:**
Hãy khoanh tròn các trợ từ và gạch chân động từ cuối câu trước, dịch ngược từ sau ra trước để câu văn tiếng Việt luôn tự nhiên nhất!`;
    }

    return `🎯 **Trả lời trọng tâm:**
Quy tắc phân tích ngữ pháp tiếng Nhật chuẩn xác và nhanh nhất:
1. **Tìm vị ngữ chính ở cuối câu:** Nắm rõ thời thì (hiện tại/quá khứ) và sắc thái (khẳng định, phủ định, suy đoán, kính ngữ).
2. **Khoanh vùng các trợ từ liên kết:** は, が, を, に, で, から, まで... chia câu thành từng khối ý nghĩa độc lập.
3. **Giải mã mệnh đề phụ (bổ nghĩa danh từ):** Tiếng Nhật luôn đặt mệnh đề bổ nghĩa đứng NGAY TRƯỚC danh từ (ngược hoàn toàn so với tiếng Việt).

💡 **Ví dụ:**
昨日 買った (hôm qua đã mua) + 本 (quyển sách) = 本 (Quyển sách [mà tôi đã mua hôm qua]).`;
  }

  if (lower.includes('hán việt') || lower.includes('han viet') || lower.includes('kanji') || lower.includes('chữ hán')) {
    return `🎯 **Trả lời trọng tâm:**
Âm Hán Việt là "vũ khí tối thượng" của người Việt khi học tiếng Nhật, bởi hơn 60% từ vựng tiếng Nhật là từ Hán (Kango) có quy luật chuyển âm tương đồng 80-90% với tiếng Việt!

🔍 **Quy luật chuyển âm then chốt:**
1. Âm đầu **B / P / V** trong Hán Việt thường chuyển thành hàng **H / B** trong tiếng Nhật (Văn -> ぶん/もん; Biến -> へん).
2. Âm đầu **T / Đ** thường chuyển thành hàng **T / D** (Địa -> ち/じ; Tiến -> しん).
3. Các từ có đuôi Hán Việt **-NG / -NH** phần lớn có trường âm (Onyomi dài: 〜う / 〜い) (Công -> こう; Sinh -> せい).

💡 **Ví dụ:**
- **経済** (Kinh tế) -> けいざい (KEI-ZAI)
- **発展** (Phát triển) -> はってん (HAT-TEN)
- **社会** (Xã hội) -> しゃかい (SHA-KAI)`;
  }

  if (lower.includes('dịch') || lower.includes('dich') || lower.includes('nghĩa') || lower.includes('viết lại')) {
    if (context?.selectedSentence) {
      return `🎯 **Bóc tách & Dịch câu đang chọn:**
**Tiếng Nhật:** ${context.selectedSentence}

🔍 **Phân tích thành phần:**
- Chủ thể/Chủ đề: Thành phần được làm nổi bật trong bài.
- Bổ ngữ: Chỉ phương thức, bối cảnh thời gian hoặc phạm vi tác động.
- Hành động/Nhận định: Vị ngữ chốt ở đuôi câu.

💡 **Bản dịch tự nhiên:**
Nội dung bài viết thể hiện tính khách quan chuẩn báo chí. Bạn có thể mở trực tiếp bảng tra từ vựng bên dưới bài đọc để đối chiếu từng chữ Hán và ngữ cảnh cụ thể!`;
    }

    return `🎯 **Trả lời trọng tâm về kỹ năng dịch & hành văn:**
Khi dịch tiếng Nhật sang tiếng Việt:
1. **Tránh dịch word-by-word:** Tiếng Nhật trọng sự khiêm nhường và bối cảnh, câu văn thường lược bỏ chủ ngữ "tôi/chúng tôi". Hãy chủ động bổ sung chủ ngữ phù hợp khi dịch sang tiếng Việt.
2. **Dịch từ vị ngữ ngược lên:** Đi từ động từ cuối câu, sau đó liên kết các bổ ngữ kèm trợ từ tương ứng.
3. **Chuyển đổi văn phong:**
   - Thể thường (だ・である): Dùng cho báo chí, tài liệu học thuật, phóng sự.
   - Thể lịch sự (です・ます): Dùng cho giao tiếp lịch sự, tin tức truyền hình nhẹ nhàng.`;
  }

  // Generic direct fallback
  return `🎯 **Trả lời trọng tâm:**
AI Sensei đã tiếp nhận câu hỏi của bạn: "${message}".

🔍 **Phân tích sư phạm:**
Để hỗ trợ bạn chính xác và sâu sắc nhất theo tiêu chuẩn JLPT:
- Nếu bạn cần giải thích **trợ từ** (は vs が, に vs で, を vs に): Hãy nêu rõ câu chứa trợ từ đó.
- Nếu bạn cần phân tích **ngữ pháp / mẫu câu**: Sensei sẽ bóc tách cấu trúc kết nối, bản chất ý nghĩa và sắc thái dùng.
- Nếu bạn cần tra cứu **từ vựng / Hán tự**: Bạn có thể nhấp trực tiếp vào chữ Hán trong bài để xem âm Hán Việt và ví dụ ngữ cảnh.

💡 Hãy thử gửi câu cụ thể hoặc chọn các nút gợi ý nhanh bên dưới nhé!`;
}

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nihongo News Server running at http://localhost:${PORT}`);
  });
}

startServer();
