import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
  private resumeText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'PauseScene' });
  }

  create() {
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

    // Input handlers
    this.input.keyboard?.on('keydown-ESC', this.resumeGame, this);
    this.input.keyboard?.on('keydown-R', this.restartLevel, this);
    this.input.keyboard?.on('keydown-M', this.goToMainMenu, this);
    this.input.keyboard?.on('keydown-SLASH', this.showHelp, this);
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
}
