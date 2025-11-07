export class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private musicGainNode: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;

  constructor() {
    // Create audio context on first user interaction
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (this.audioContext) {
        this.musicGainNode = this.audioContext.createGain();
        this.musicGainNode.connect(this.audioContext.destination);
        this.musicGainNode.gain.value = 0.15; // Music volume
      }
    }
  }

  private initAudioContext() {
    if (!this.audioContext) {
      return;
    }

    // Resume audio context if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  playMoveSound() {
    if (!this.enabled || !this.audioContext) return;
    this.initAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = 400;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  playCollectSound() {
    if (!this.enabled || !this.audioContext) return;
    this.initAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.1);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }

  playErrorSound() {
    if (!this.enabled || !this.audioContext) return;
    this.initAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = 200;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  playVictorySound() {
    if (!this.enabled || !this.audioContext) return;
    this.initAudioContext();

    // Play a sequence of notes
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
    const duration = 0.15;

    notes.forEach((frequency, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      const startTime = this.audioContext!.currentTime + (index * duration);
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
  }

  startBackgroundMusic() {
    if (!this.enabled || !this.audioContext || !this.musicGainNode || this.isMusicPlaying) {
      return;
    }

    this.initAudioContext();
    this.isMusicPlaying = true;

    // Simple upbeat melody pattern (notes in Hz)
    const melody = [
      // Measure 1
      [523.25, 0.4], // C5
      [659.25, 0.4], // E5
      [783.99, 0.4], // G5
      [659.25, 0.4], // E5
      // Measure 2
      [698.46, 0.4], // F5
      [783.99, 0.4], // G5
      [880.00, 0.4], // A5
      [783.99, 0.4], // G5
      // Measure 3
      [698.46, 0.4], // F5
      [659.25, 0.4], // E5
      [587.33, 0.4], // D5
      [523.25, 0.4], // C5
      // Measure 4
      [587.33, 0.4], // D5
      [659.25, 0.4], // E5
      [523.25, 0.8], // C5 (longer)
    ];

    let noteIndex = 0;

    const playNote = () => {
      if (!this.isMusicPlaying || !this.audioContext || !this.musicGainNode) {
        return;
      }

      const [frequency, duration] = melody[noteIndex];

      // Create note
      const oscillator = this.audioContext.createOscillator();
      const noteGain = this.audioContext.createGain();

      oscillator.connect(noteGain);
      noteGain.connect(this.musicGainNode);

      oscillator.frequency.value = frequency;
      oscillator.type = 'square'; // Chiptune sound

      const now = this.audioContext.currentTime;
      noteGain.gain.setValueAtTime(0.3, now);
      noteGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      oscillator.start(now);
      oscillator.stop(now + duration);

      // Move to next note
      noteIndex = (noteIndex + 1) % melody.length;

      // Schedule next note
      if (this.isMusicPlaying) {
        this.musicInterval = window.setTimeout(playNote, duration * 1000);
      }
    };

    playNote();
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval !== null) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopBackgroundMusic();
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}
