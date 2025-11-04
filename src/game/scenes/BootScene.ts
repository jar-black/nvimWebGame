import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Create simple placeholder graphics using the graphics object
    // We'll draw colored rectangles for all game elements
    this.createPlaceholderAssets();
  }

  create() {
    // Go straight to main menu
    this.scene.start('MainMenuScene');
  }

  private createPlaceholderAssets() {
    // Create player sprite (orange square)
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0xff6f00, 1);
    playerGraphics.fillRect(0, 0, 32, 32);
    playerGraphics.generateTexture('player', 32, 32);
    playerGraphics.destroy();

    // Create grass tile (light green)
    const grassGraphics = this.add.graphics();
    grassGraphics.fillStyle(0x7cb342, 1);
    grassGraphics.fillRect(0, 0, 32, 32);
    grassGraphics.lineStyle(1, 0x689f38, 0.3);
    grassGraphics.strokeRect(0, 0, 32, 32);
    grassGraphics.generateTexture('grass', 32, 32);
    grassGraphics.destroy();

    // Create path tile (sandy)
    const pathGraphics = this.add.graphics();
    pathGraphics.fillStyle(0xd4c5a9, 1);
    pathGraphics.fillRect(0, 0, 32, 32);
    pathGraphics.lineStyle(1, 0xc0b090, 0.3);
    pathGraphics.strokeRect(0, 0, 32, 32);
    pathGraphics.generateTexture('path', 32, 32);
    pathGraphics.destroy();

    // Create water tile (blue)
    const waterGraphics = this.add.graphics();
    waterGraphics.fillStyle(0x42a5f5, 1);
    waterGraphics.fillRect(0, 0, 32, 32);
    waterGraphics.fillStyle(0x1e88e5, 0.3);
    waterGraphics.fillRect(8, 8, 16, 16);
    waterGraphics.generateTexture('water', 32, 32);
    waterGraphics.destroy();

    // Create tree (dark green circle on brown rectangle)
    const treeGraphics = this.add.graphics();
    treeGraphics.fillStyle(0x5d4037, 1);
    treeGraphics.fillRect(12, 20, 8, 12);
    treeGraphics.fillStyle(0x2e7d32, 1);
    treeGraphics.fillCircle(16, 16, 12);
    treeGraphics.fillStyle(0x1b5e20, 0.5);
    treeGraphics.fillCircle(12, 12, 6);
    treeGraphics.fillCircle(20, 12, 6);
    treeGraphics.generateTexture('tree', 32, 32);
    treeGraphics.destroy();

    // Create rock (gray irregular shape)
    const rockGraphics = this.add.graphics();
    rockGraphics.fillStyle(0x757575, 1);
    rockGraphics.fillCircle(16, 18, 10);
    rockGraphics.fillCircle(10, 16, 7);
    rockGraphics.fillCircle(22, 16, 7);
    rockGraphics.fillStyle(0x616161, 1);
    rockGraphics.fillCircle(16, 14, 6);
    rockGraphics.generateTexture('rock', 32, 32);
    rockGraphics.destroy();

    // Create key (golden)
    const keyGraphics = this.add.graphics();
    keyGraphics.fillStyle(0xffd600, 1);
    keyGraphics.fillCircle(12, 12, 6);
    keyGraphics.fillRect(12, 12, 12, 4);
    keyGraphics.fillRect(20, 10, 2, 2);
    keyGraphics.fillRect(20, 14, 2, 2);
    keyGraphics.lineStyle(2, 0xffa000, 1);
    keyGraphics.strokeCircle(12, 12, 6);
    keyGraphics.generateTexture('key', 32, 32);
    keyGraphics.destroy();

    // Create gate (brown locked door)
    const gateGraphics = this.add.graphics();
    gateGraphics.fillStyle(0x6d4c41, 1);
    gateGraphics.fillRect(0, 0, 32, 32);
    gateGraphics.fillStyle(0x5d4037, 1);
    gateGraphics.fillRect(2, 2, 28, 28);
    gateGraphics.lineStyle(2, 0x4e342e, 1);
    gateGraphics.strokeRect(6, 6, 20, 20);
    gateGraphics.fillStyle(0xffd600, 1);
    gateGraphics.fillCircle(22, 16, 3);
    gateGraphics.generateTexture('gate', 32, 32);
    gateGraphics.destroy();

    // Create goal (yellow star)
    const goalGraphics = this.add.graphics();
    goalGraphics.fillStyle(0xffd600, 1);
    this.drawStar(goalGraphics, 16, 16, 5, 12, 6);
    goalGraphics.lineStyle(2, 0xffa000, 1);
    this.drawStar(goalGraphics, 16, 16, 5, 12, 6, true);
    goalGraphics.generateTexture('goal', 32, 32);
    goalGraphics.destroy();

    // Create waypoint (glowing marker)
    const waypointGraphics = this.add.graphics();
    waypointGraphics.fillStyle(0x00ff00, 0.3);
    waypointGraphics.fillCircle(16, 16, 14);
    waypointGraphics.fillStyle(0x00ff00, 0.6);
    waypointGraphics.fillCircle(16, 16, 10);
    waypointGraphics.fillStyle(0x00ff00, 1);
    waypointGraphics.fillCircle(16, 16, 6);
    waypointGraphics.generateTexture('waypoint', 32, 32);
    waypointGraphics.destroy();
  }

  private drawStar(
    graphics: Phaser.GameObjects.Graphics,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number,
    strokeOnly: boolean = false
  ) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    graphics.beginPath();
    graphics.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      graphics.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      graphics.lineTo(x, y);
      rot += step;
    }

    graphics.lineTo(cx, cy - outerRadius);
    graphics.closePath();

    if (!strokeOnly) {
      graphics.fillPath();
    } else {
      graphics.strokePath();
    }
  }
}
