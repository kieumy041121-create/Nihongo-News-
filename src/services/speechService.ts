export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public static getJapaneseVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    const voices = this.synth.getVoices();
    return voices.filter(v => v.lang.startsWith('ja') || v.lang.includes('JP'));
  }

  public static speak(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): void {
    if (!this.isSupported() || !this.synth) {
      if (options?.onError) {
        options.onError(new Error('Trình duyệt của bạn hiện chưa hỗ trợ Web Speech API.'));
      }
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = options?.rate || 1.0;
    utterance.pitch = options?.pitch || 1.0;

    const jaVoices = this.getJapaneseVoices();
    if (jaVoices.length > 0) {
      // Prefer natural Japanese voices
      const preferred = jaVoices.find(v => v.name.includes('Google') || v.name.includes('Kyoko') || v.name.includes('Otoya')) || jaVoices[0];
      utterance.voice = preferred;
    }

    utterance.onstart = () => {
      options?.onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      options?.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      options?.onError?.(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public static pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public static resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public static stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}

// Media recorder helper for Shadowing Lab
export class AudioRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  public static isSupported(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia;
  }

  public async startRecording(): Promise<void> {
    if (!AudioRecorderService.isSupported()) {
      throw new Error('Microphone không được hỗ trợ trên thiết bị này.');
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
  }

  public async stopRecording(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('Chưa bắt đầu ghi âm.'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        // Stop all audio tracks to release mic icon
        this.mediaRecorder?.stream?.getTracks().forEach(track => track.stop());
        this.mediaRecorder = null;
        resolve(audioUrl);
      };

      this.mediaRecorder.stop();
    });
  }
}
