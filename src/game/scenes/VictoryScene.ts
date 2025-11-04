import Phaser from 'phaser';

export interface VictoryData {
  moves: number;
  time: number;
  keysUsed: { h: number; j: number; k: number; l: number };
  mistakes: number;
}

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VictoryScene' });
  }

  create(data: VictoryData) {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Victory title
    const victoryText = this.add.text(centerX, centerY - 200, 'LEVEL COMPLETE!', {
      fontFamily: 'Courier New, monospace',
      fontSize: '64px',
      color: '#ffd600',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Animate victory text
    this.tweens.add({
      targets: victoryText,
      scale: 1.1,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    // Calculate rating
    const rating = this.calculateRating(data.moves, data.time);
    const stars = this.getStars(rating);

    // Display stars
    this.add.text(centerX, centerY - 120, stars, {
      fontFamily: 'Courier New, monospace',
      fontSize: '48px',
      color: '#ffd600'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY - 70, rating, {
      fontFamily: 'Courier New, monospace',
      fontSize: '32px',
      color: '#4ec9b0'
    }).setOrigin(0.5);

    // Stats
    const statsY = centerY - 20;
    this.add.text(centerX, statsY, 'Statistics', {
      fontFamily: 'Courier New, monospace',
      fontSize: '24px',
      color: '#d4d4d4',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const timeMinutes = Math.floor(data.time / 60);
    const timeSeconds = data.time % 60;
    const timeString = `${timeMinutes}:${timeSeconds.toString().padStart(2, '0')}`;

    const stats = [
      `Total Moves: ${data.moves}`,
      `Time: ${timeString}`,
      `Mistakes: ${data.mistakes}`,
      '',
      'Keys Used:',
      `h: ${data.keysUsed.h}  j: ${data.keysUsed.j}  k: ${data.keysUsed.k}  l: ${data.keysUsed.l}`
    ];

    stats.forEach((stat, index) => {
      this.add.text(centerX, statsY + 40 + (index * 25), stat, {
        fontFamily: 'Courier New, monospace',
        fontSize: '18px',
        color: '#d4d4d4'
      }).setOrigin(0.5);
    });

    // Optimal path comparison
    const optimalMoves = 70;
    const efficiency = Math.min(100, Math.round((optimalMoves / data.moves) * 100));

    this.add.text(centerX, statsY + 210, `Efficiency: ${efficiency}%`, {
      fontFamily: 'Courier New, monospace',
      fontSize: '20px',
      color: efficiency >= 90 ? '#7cb342' : efficiency >= 70 ? '#ff6f00' : '#f44336'
    }).setOrigin(0.5);

    // Continue text
    const continueText = this.add.text(centerX, centerY + 280, 'Press R to restart | Press M for main menu', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#ffd600'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: continueText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Input handlers
    this.input.keyboard?.on('keydown-R', () => {
      this.scene.start('Level1Scene');
    });

    this.input.keyboard?.on('keydown-M', () => {
      this.scene.start('MainMenuScene');
    });
  }

  private calculateRating(moves: number, time: number): string {
    if (moves <= 70 && time <= 600) {
      return 'PLATINUM';
    } else if (moves <= 70) {
      return 'GOLD';
    } else if (moves <= 90) {
      return 'SILVER';
    } else {
      return 'BRONZE';
    }
  }

  private getStars(rating: string): string {
    switch (rating) {
      case 'PLATINUM':
        return '⭐⭐⭐⭐';
      case 'GOLD':
        return '⭐⭐⭐';
      case 'SILVER':
        return '⭐⭐';
      default:
        return '⭐';
    }
  }
}
