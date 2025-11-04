import Phaser from 'phaser';

export class HelpScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HelpScene' });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Semi-transparent background
    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.85)
      .setOrigin(0)
      .setDepth(0);

    // Help box background
    const boxWidth = 700;
    const boxHeight = 550;
    this.add.rectangle(centerX, centerY, boxWidth, boxHeight, 0x1e1e1e, 1)
      .setStrokeStyle(3, 0x4ec9b0);

    // Title
    this.add.text(centerX, centerY - 240, 'VIM QUEST - CONTROLS & HELP', {
      fontFamily: 'Courier New, monospace',
      fontSize: '28px',
      color: '#4ec9b0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Separator
    this.add.rectangle(centerX, centerY - 205, boxWidth - 40, 2, 0x4ec9b0);

    // Help content
    const helpText = `
╔════════════════════════════════════╗
║          MOVEMENT                  ║
╠════════════════════════════════════╣
║  h - Move Left    ←                ║
║  j - Move Down    ↓                ║
║  k - Move Up      ↑                ║
║  l - Move Right   →                ║
╚════════════════════════════════════╝

╔════════════════════════════════════╗
║       GAME CONTROLS                ║
╠════════════════════════════════════╣
║  ESC - Pause/Resume Game           ║
║  R   - Restart Current Level       ║
║  M   - Return to Main Menu         ║
║  ?   - Show This Help Screen       ║
╚════════════════════════════════════╝

╔════════════════════════════════════╗
║         OBJECTIVE                  ║
╠════════════════════════════════════╣
║  Collect 2 keys to unlock the gate ║
║  Navigate to the golden star       ║
║  Use Vim movement keys only!       ║
╚════════════════════════════════════╝
`;

    this.add.text(centerX, centerY - 30, helpText, {
      fontFamily: 'Courier New, monospace',
      fontSize: '14px',
      color: '#d4d4d4',
      align: 'left'
    }).setOrigin(0.5);

    // Close instruction
    const closeText = this.add.text(centerX, centerY + 240, 'Press ESC or ? to close', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#ffd600'
    }).setOrigin(0.5);

    // Blinking animation
    this.tweens.add({
      targets: closeText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Input handlers
    this.input.keyboard?.on('keydown-ESC', this.closeHelp, this);
    this.input.keyboard?.on('keydown-SLASH', this.closeHelp, this);
  }

  private closeHelp() {
    this.scene.stop();
  }
}
