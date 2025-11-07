export class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private musicGainNode: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private currentMelodyIndex: number = 0;

  // 10 different melodies to choose from
  private melodies: Array<[number, number][]> = [
    // Melody 0: Upbeat Adventure (Original)
    [
      [523.25, 0.4], [659.25, 0.4], [783.99, 0.4], [659.25, 0.4],
      [698.46, 0.4], [783.99, 0.4], [880.00, 0.4], [783.99, 0.4],
      [698.46, 0.4], [659.25, 0.4], [587.33, 0.4], [523.25, 0.4],
      [587.33, 0.4], [659.25, 0.4], [523.25, 0.8],
    ],
    // Melody 1: Mysterious Journey
    [
      [440.00, 0.5], [493.88, 0.5], [523.25, 0.5], [587.33, 0.5],
      [523.25, 0.5], [493.88, 0.5], [440.00, 1.0],
      [392.00, 0.5], [440.00, 0.5], [493.88, 0.5], [440.00, 0.5],
      [392.00, 1.0],
    ],
    // Melody 2: Victory March
    [
      [523.25, 0.3], [523.25, 0.3], [523.25, 0.3], [659.25, 0.6],
      [783.99, 0.3], [783.99, 0.3], [783.99, 0.3], [1046.50, 0.6],
      [783.99, 0.3], [659.25, 0.3], [523.25, 0.6],
      [659.25, 0.3], [783.99, 0.9],
    ],
    // Melody 3: Peaceful Meadow
    [
      [523.25, 0.6], [587.33, 0.6], [659.25, 0.6], [783.99, 0.6],
      [880.00, 0.6], [783.99, 0.6], [659.25, 0.6], [587.33, 0.6],
      [523.25, 1.2],
    ],
    // Melody 4: Energetic Chase
    [
      [659.25, 0.2], [698.46, 0.2], [783.99, 0.2], [880.00, 0.2],
      [783.99, 0.2], [698.46, 0.2], [659.25, 0.2], [783.99, 0.2],
      [880.00, 0.2], [987.77, 0.2], [880.00, 0.2], [783.99, 0.2],
      [698.46, 0.2], [659.25, 0.4],
    ],
    // Melody 5: Dreamy Exploration
    [
      [392.00, 0.8], [440.00, 0.8], [493.88, 0.8], [523.25, 0.8],
      [587.33, 0.8], [523.25, 0.8], [493.88, 0.8], [440.00, 0.8],
      [392.00, 1.6],
    ],
    // Melody 6: Funky Groove
    [
      [329.63, 0.3], [392.00, 0.3], [329.63, 0.3], [392.00, 0.3],
      [440.00, 0.6], [392.00, 0.3], [329.63, 0.3],
      [293.66, 0.3], [349.23, 0.3], [293.66, 0.6],
      [329.63, 0.6],
    ],
    // Melody 7: Epic Quest
    [
      [261.63, 0.5], [329.63, 0.5], [392.00, 0.5], [523.25, 0.5],
      [659.25, 0.5], [783.99, 0.5], [1046.50, 1.0],
      [783.99, 0.5], [659.25, 0.5], [523.25, 1.0],
    ],
    // Melody 8: Playful Bounce
    [
      [523.25, 0.3], [659.25, 0.3], [523.25, 0.3], [659.25, 0.3],
      [783.99, 0.3], [659.25, 0.3], [783.99, 0.3], [880.00, 0.6],
      [783.99, 0.3], [659.25, 0.3], [523.25, 0.6],
    ],
    // Melody 9: Dark Dungeon
    [
      [293.66, 0.6], [277.18, 0.6], [261.63, 0.6], [246.94, 0.6],
      [261.63, 0.6], [277.18, 0.6], [293.66, 0.6], [329.63, 1.2],
      [293.66, 0.6], [261.63, 1.2],
    ],
  ];

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

  startBackgroundMusic(melodyIndex?: number) {
    if (!this.enabled || !this.audioContext || !this.musicGainNode) {
      return;
    }

    // Stop existing music first
    if (this.isMusicPlaying) {
      this.stopBackgroundMusic();
    }

    // Set melody index if provided
    if (melodyIndex !== undefined && melodyIndex >= 0 && melodyIndex < this.melodies.length) {
      this.currentMelodyIndex = melodyIndex;
    }

    this.initAudioContext();
    this.isMusicPlaying = true;

    const melody = this.melodies[this.currentMelodyIndex];
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

  nextMelody() {
    this.currentMelodyIndex = (this.currentMelodyIndex + 1) % this.melodies.length;
    if (this.isMusicPlaying) {
      this.startBackgroundMusic();
    }
  }

  previousMelody() {
    this.currentMelodyIndex = (this.currentMelodyIndex - 1 + this.melodies.length) % this.melodies.length;
    if (this.isMusicPlaying) {
      this.startBackgroundMusic();
    }
  }

  setMelody(index: number) {
    if (index >= 0 && index < this.melodies.length) {
      this.currentMelodyIndex = index;
      if (this.isMusicPlaying) {
        this.startBackgroundMusic();
      }
    }
  }

  getCurrentMelodyIndex(): number {
    return this.currentMelodyIndex;
  }

  getMelodyCount(): number {
    return this.melodies.length;
  }

  getMelodyName(index: number): string {
    const names = [
      'Upbeat Adventure',
      'Mysterious Journey',
      'Victory March',
      'Peaceful Meadow',
      'Energetic Chase',
      'Dreamy Exploration',
      'Funky Groove',
      'Epic Quest',
      'Playful Bounce',
      'Dark Dungeon'
    ];
    return names[index] || 'Unknown';
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
