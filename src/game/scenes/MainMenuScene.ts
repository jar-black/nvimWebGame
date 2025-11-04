import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
  private startText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Title
    this.add.text(centerX, centerY - 200, 'VIM QUEST', {
      fontFamily: 'Courier New, monospace',
      fontSize: '72px',
      color: '#4ec9b0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(centerX, centerY - 130, 'Learn Vim Through Gameplay', {
      fontFamily: 'Courier New, monospace',
      fontSize: '24px',
      color: '#d4d4d4'
    }).setOrigin(0.5);

    // Level info
    this.add.text(centerX, centerY - 60, 'Level 1: The Basic Plains', {
      fontFamily: 'Courier New, monospace',
      fontSize: '28px',
      color: '#ff6f00'
    }).setOrigin(0.5);

    // Instructions
    this.add.text(centerX, centerY + 20, 'Master the fundamental Vim motion keys', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#7cb342'
    }).setOrigin(0.5);

    // Controls display
    const controlsY = centerY + 80;
    this.add.text(centerX, controlsY, 'Controls:', {
      fontFamily: 'Courier New, monospace',
      fontSize: '20px',
      color: '#d4d4d4',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const controlsBoxY = controlsY + 40;
    this.add.text(centerX - 100, controlsBoxY, 'h ←', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#42a5f5'
    }).setOrigin(0.5);

    this.add.text(centerX + 100, controlsBoxY, 'l →', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#42a5f5'
    }).setOrigin(0.5);

    this.add.text(centerX, controlsBoxY - 30, 'k ↑', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#42a5f5'
    }).setOrigin(0.5);

    this.add.text(centerX, controlsBoxY + 30, 'j ↓', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#42a5f5'
    }).setOrigin(0.5);

    // Start text with animation
    this.startText = this.add.text(centerX, centerY + 200, 'Press any of the movement keys to start!', {
      fontFamily: 'Courier New, monospace',
      fontSize: '22px',
      color: '#ffd600'
    }).setOrigin(0.5);

    // Blinking animation
    this.tweens.add({
      targets: this.startText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Footer
    this.add.text(centerX, this.cameras.main.height - 30, 'Press ESC to pause | Press R to restart | Press ? for help', {
      fontFamily: 'Courier New, monospace',
      fontSize: '14px',
      color: '#757575'
    }).setOrigin(0.5);

    // Set up input handlers for hjkl keys
    this.input.keyboard?.on('keydown-H', this.startGame, this);
    this.input.keyboard?.on('keydown-J', this.startGame, this);
    this.input.keyboard?.on('keydown-K', this.startGame, this);
    this.input.keyboard?.on('keydown-L', this.startGame, this);
  }

  private startGame() {
    this.scene.start('Level1Scene');
  }
}
