import { Article, JLPTLevel } from '../types';

export interface SenseiContext {
  title?: string;
  jlptLevel?: string;
  selectedSentence?: string;
  sentence?: string;
  summary?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

export class GeminiService {
  public static async askSensei(
    message: string,
    context?: SenseiContext,
    history?: Array<{ role: 'user' | 'assistant'; text: string }>
  ): Promise<{ reply: string; source?: string; warning?: string }> {
    try {
      const res = await fetch('/api/ai/sensei', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context, history })
      });

      if (!res.ok) {
        throw new Error(`Mã lỗi máy chủ: ${res.status}`);
      }

      const data = await res.json();
      return {
        reply: data.reply || 'Sensei chưa có phản hồi.',
        source: data.source,
        warning: data.warning
      };
    } catch (err: any) {
      console.warn('Sensei API call failed, falling back to local guidance:', err);
      return {
        reply: this.getClientFallbackReply(message, context),
        source: 'client_fallback',
        warning: 'Không thể kết nối trực tiếp đến AI server. Đang hiển thị hướng dẫn sư phạm từ bộ nhớ đệm.'
      };
    }
  }

  public static async generatePractice(
    topic: string,
    level: JLPTLevel,
    options?: {
      sourceStyle?: string;
      depth?: 'standard' | 'deep';
      customKeyword?: string;
    }
  ): Promise<Article> {
    const res = await fetch('/api/ai/generate-practice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        level,
        sourceStyle: options?.sourceStyle || 'kilala',
        depth: options?.depth || 'standard',
        customKeyword: options?.customKeyword
      })
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.error || 'Không thể tạo bài tập lúc này.');
    }

    const data = await res.json();
    return data.article;
  }

  private static getClientFallbackReply(message: string, context?: SenseiContext): string {
    const lower = message.toLowerCase();
    if (context?.selectedSentence) {
      return `Sensei xin trợ giúp bạn về câu đang chọn:
"${context.selectedSentence}"

- **Mẹo đọc câu dài tiếng Nhật:** Hãy tìm động từ hoặc tính từ ở cuối câu trước để nắm được hành động/trạng thái cốt lõi. Sau đó tìm các trợ từ như 「は」(chủ đề), 「が」(chủ ngữ), 「を」(tân ngữ chịu tác động).
- Bạn có thể nhấp trực tiếp vào bất kỳ từ nào trong câu trên bài đọc để xem phân tích âm Hán Việt và ngữ cảnh cụ thể nhé!`;
    }

    if (lower.includes('trợ từ') || lower.includes('が') || lower.includes('は')) {
      return `### Phân biệt nhanh 「は」 và 「が」:
- **「は」 (Chủ đề):** Đặt sự chú ý vào phần VỊ NGỮ đằng sau câu ("Nói về X thì...").
- **「が」 (Chủ ngữ ngữ pháp):** Đặt sự chú ý vào chính CHỦ NGỮ ("Chính là X làm việc đó!"), dùng khi phát hiện thông tin mới hoặc trong mệnh đề phụ.`;
    }

    return `Chào bạn! Sensei sẵn sàng giải đáp thắc mắc về từ vựng, ngữ pháp tiếng Nhật và mẹo đọc hiểu JLPT. Bạn hãy nhấp vào các gợi ý nhanh bên dưới hoặc đặt câu hỏi cụ thể nhé!`;
  }
}
