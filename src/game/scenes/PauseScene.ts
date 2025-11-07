import Phaser from 'phaser';
import { SoundManager } from '../utils/SoundManager';

export class PauseScene extends Phaser.Scene {
  private resumeText!: Phaser.GameObjects.Text;
  private soundManager!: SoundManager;
  private melodyText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'PauseScene' });
  }

  create() {
    // Get global sound manager
    this.soundManager = this.registry.get('soundManager') as SoundManager;

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Semi-transparent background
    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7)
      .setOrigin(0)
      .setDepth(0);

    // Pause title
    this.add.text(centerX, centerY - 150, 'PAUSED', {
      fontFamily: 'Courier New, monospace',
      fontSize: '64px',
      color: '#4ec9b0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Menu options
    const menuY = centerY - 50;
    const spacing = 50;

    this.resumeText = this.add.text(centerX, menuY, 'Press ESC to Resume', {
      fontFamily: 'Courier New, monospace',
      fontSize: '24px',
      color: '#ffd600'
    }).setOrigin(0.5);

    this.add.text(centerX, menuY + spacing, 'Press R to Restart Level', {
      fontFamily: 'Courier New, monospace',
      fontSize: '24px',
      color: '#d4d4d4'
    }).setOrigin(0.5);

    this.add.text(centerX, menuY + spacing * 2, 'Press M for Main Menu', {
      fontFamily: 'Courier New, monospace',
      fontSize: '24px',
      color: '#d4d4d4'
    }).setOrigin(0.5);

    this.add.text(centerX, menuY + spacing * 3, 'Press ? for Help', {
      fontFamily: 'Courier New, monospace',
      fontSize: '24px',
      color: '#d4d4d4'
    }).setOrigin(0.5);

    // Blinking animation for resume text
    this.tweens.add({
      targets: this.resumeText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Controls reference
    this.add.text(centerX, centerY + 150, 'Movement: h ← | j ↓ | k ↑ | l →', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#42a5f5'
    }).setOrigin(0.5);

    // Melody selector
    const melodyY = centerY + 200;
    this.add.text(centerX, melodyY, 'Music: Press [ ] to change melody', {
      fontFamily: 'Courier New, monospace',
      fontSize: '16px',
      color: '#ce93d8'
    }).setOrigin(0.5);

    // Current melody display
    this.melodyText = this.add.text(centerX, melodyY + 30, this.getMelodyDisplayText(), {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#ba68c8',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Input handlers
    this.input.keyboard?.on('keydown-ESC', this.resumeGame, this);
    this.input.keyboard?.on('keydown-R', this.restartLevel, this);
    this.input.keyboard?.on('keydown-M', this.goToMainMenu, this);
    this.input.keyboard?.on('keydown-SLASH', this.showHelp, this);
    this.input.keyboard?.on('keydown-OPEN_BRACKET', this.previousMelody, this);
    this.input.keyboard?.on('keydown-CLOSE_BRACKET', this.nextMelody, this);
  }

  private resumeGame() {
    this.scene.resume('Level1Scene');
    this.scene.stop();
  }

  private restartLevel() {
    this.scene.stop('Level1Scene');
    this.scene.stop();
    this.scene.start('Level1Scene');
  }

  private goToMainMenu() {
    this.scene.stop('Level1Scene');
    this.scene.stop();
    this.scene.start('MainMenuScene');
  }

  private showHelp() {
    this.scene.launch('HelpScene');
    this.scene.bringToTop('HelpScene');
  }

  private nextMelody() {
    if (this.soundManager) {
      this.soundManager.nextMelody();
      this.melodyText.setText(this.getMelodyDisplayText());

      // Show notification
      this.showMelodyNotification();
    }
  }

  private previousMelody() {
    if (this.soundManager) {
      this.soundManager.previousMelody();
      this.melodyText.setText(this.getMelodyDisplayText());

      // Show notification
      this.showMelodyNotification();
    }
  }

  private getMelodyDisplayText(): string {
    if (!this.soundManager) return '';
    const index = this.soundManager.getCurrentMelodyIndex();
    const name = this.soundManager.getMelodyName(index);
    return `← ${name} (${index + 1}/${this.soundManager.getMelodyCount()}) →`;
  }

  private showMelodyNotification() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const notification = this.add.text(centerX, centerY - 250,
      `♪ Now Playing: ${this.soundManager.getMelodyName(this.soundManager.getCurrentMelodyIndex())} ♪`, {
      fontFamily: 'Courier New, monospace',
      fontSize: '20px',
      color: '#ba68c8',
      fontStyle: 'bold',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setAlpha(0);

    // Fade in and out
    this.tweens.add({
      targets: notification,
      alpha: 1,
      duration: 300,
      yoyo: true,
      hold: 1500,
      onComplete: () => notification.destroy()
    });
  }
}
