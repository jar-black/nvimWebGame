import Phaser from 'phaser';
import { SoundManager } from '../utils/SoundManager';

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
    // Create global sound manager
    const soundManager = new SoundManager();
    this.registry.set('soundManager', soundManager);

    // Go straight to main menu
    this.scene.start('MainMenuScene');
  }

  private createPlaceholderAssets() {
    // Create player sprite (character with face)
    const playerGraphics = this.add.graphics();
    // Body (orange)
    playerGraphics.fillStyle(0xff6f00, 1);
    playerGraphics.fillRoundedRect(8, 10, 16, 18, 4);
    // Head (lighter orange)
    playerGraphics.fillStyle(0xffab40, 1);
    playerGraphics.fillCircle(16, 10, 8);
    // Eyes
    playerGraphics.fillStyle(0x000000, 1);
    playerGraphics.fillCircle(13, 9, 2);
    playerGraphics.fillCircle(19, 9, 2);
    // Smile
    playerGraphics.lineStyle(2, 0x000000, 1);
    playerGraphics.arc(16, 10, 4, 0.2, Math.PI - 0.2);
    // Arms
    playerGraphics.fillStyle(0xff6f00, 1);
    playerGraphics.fillRect(4, 12, 4, 8);
    playerGraphics.fillRect(24, 12, 4, 8);
    // Legs
    playerGraphics.fillRect(10, 26, 5, 6);
    playerGraphics.fillRect(17, 26, 5, 6);
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

    // Create bridge tile (wooden planks over water)
    const bridgeGraphics = this.add.graphics();
    bridgeGraphics.fillStyle(0x42a5f5, 1);
    bridgeGraphics.fillRect(0, 0, 32, 32);
    bridgeGraphics.fillStyle(0x8d6e63, 1);
    bridgeGraphics.fillRect(2, 0, 6, 32);
    bridgeGraphics.fillRect(12, 0, 6, 32);
    bridgeGraphics.fillRect(22, 0, 6, 32);
    bridgeGraphics.fillStyle(0x6d4c41, 1);
    bridgeGraphics.fillRect(0, 12, 32, 3);
    bridgeGraphics.fillRect(0, 20, 32, 3);
    bridgeGraphics.generateTexture('bridge', 32, 32);
    bridgeGraphics.destroy();

    // Create one-way brick (right arrow)
    const oneWayRightGraphics = this.add.graphics();
    oneWayRightGraphics.fillStyle(0xb71c1c, 1);
    oneWayRightGraphics.fillRect(0, 0, 32, 32);
    oneWayRightGraphics.fillStyle(0xc62828, 1);
    oneWayRightGraphics.fillRect(2, 2, 28, 28);
    // Arrow pointing right
    oneWayRightGraphics.fillStyle(0xffeb3b, 1);
    oneWayRightGraphics.beginPath();
    oneWayRightGraphics.moveTo(8, 16);
    oneWayRightGraphics.lineTo(20, 16);
    oneWayRightGraphics.lineTo(20, 10);
    oneWayRightGraphics.lineTo(28, 16);
    oneWayRightGraphics.lineTo(20, 22);
    oneWayRightGraphics.lineTo(20, 16);
    oneWayRightGraphics.closePath();
    oneWayRightGraphics.fillPath();
    oneWayRightGraphics.generateTexture('oneway_right', 32, 32);
    oneWayRightGraphics.destroy();

    // Create one-way brick (left arrow)
    const oneWayLeftGraphics = this.add.graphics();
    oneWayLeftGraphics.fillStyle(0xb71c1c, 1);
    oneWayLeftGraphics.fillRect(0, 0, 32, 32);
    oneWayLeftGraphics.fillStyle(0xc62828, 1);
    oneWayLeftGraphics.fillRect(2, 2, 28, 28);
    // Arrow pointing left
    oneWayLeftGraphics.fillStyle(0xffeb3b, 1);
    oneWayLeftGraphics.beginPath();
    oneWayLeftGraphics.moveTo(24, 16);
    oneWayLeftGraphics.lineTo(12, 16);
    oneWayLeftGraphics.lineTo(12, 10);
    oneWayLeftGraphics.lineTo(4, 16);
    oneWayLeftGraphics.lineTo(12, 22);
    oneWayLeftGraphics.lineTo(12, 16);
    oneWayLeftGraphics.closePath();
    oneWayLeftGraphics.fillPath();
    oneWayLeftGraphics.generateTexture('oneway_left', 32, 32);
    oneWayLeftGraphics.destroy();

    // Create one-way brick (up arrow)
    const oneWayUpGraphics = this.add.graphics();
    oneWayUpGraphics.fillStyle(0xb71c1c, 1);
    oneWayUpGraphics.fillRect(0, 0, 32, 32);
    oneWayUpGraphics.fillStyle(0xc62828, 1);
    oneWayUpGraphics.fillRect(2, 2, 28, 28);
    // Arrow pointing up
    oneWayUpGraphics.fillStyle(0xffeb3b, 1);
    oneWayUpGraphics.beginPath();
    oneWayUpGraphics.moveTo(16, 24);
    oneWayUpGraphics.lineTo(16, 12);
    oneWayUpGraphics.lineTo(10, 12);
    oneWayUpGraphics.lineTo(16, 4);
    oneWayUpGraphics.lineTo(22, 12);
    oneWayUpGraphics.lineTo(16, 12);
    oneWayUpGraphics.closePath();
    oneWayUpGraphics.fillPath();
    oneWayUpGraphics.generateTexture('oneway_up', 32, 32);
    oneWayUpGraphics.destroy();

    // Create one-way brick (down arrow)
    const oneWayDownGraphics = this.add.graphics();
    oneWayDownGraphics.fillStyle(0xb71c1c, 1);
    oneWayDownGraphics.fillRect(0, 0, 32, 32);
    oneWayDownGraphics.fillStyle(0xc62828, 1);
    oneWayDownGraphics.fillRect(2, 2, 28, 28);
    // Arrow pointing down
    oneWayDownGraphics.fillStyle(0xffeb3b, 1);
    oneWayDownGraphics.beginPath();
    oneWayDownGraphics.moveTo(16, 8);
    oneWayDownGraphics.lineTo(16, 20);
    oneWayDownGraphics.lineTo(10, 20);
    oneWayDownGraphics.lineTo(16, 28);
    oneWayDownGraphics.lineTo(22, 20);
    oneWayDownGraphics.lineTo(16, 20);
    oneWayDownGraphics.closePath();
    oneWayDownGraphics.fillPath();
    oneWayDownGraphics.generateTexture('oneway_down', 32, 32);
    oneWayDownGraphics.destroy();

    // Create locked door sprites for progressive unlocking
    // Red door (requires key 1)
    const redDoorGraphics = this.add.graphics();
    redDoorGraphics.fillStyle(0xc62828, 1);
    redDoorGraphics.fillRect(0, 0, 32, 32);
    redDoorGraphics.fillStyle(0xb71c1c, 1);
    redDoorGraphics.fillRect(4, 4, 24, 24);
    redDoorGraphics.fillStyle(0xffd600, 1);
    redDoorGraphics.fillCircle(22, 16, 3);
    redDoorGraphics.lineStyle(2, 0xff0000, 1);
    redDoorGraphics.strokeRect(6, 6, 20, 20);
    redDoorGraphics.generateTexture('door_red', 32, 32);
    redDoorGraphics.destroy();

    // Blue door (requires key 2)
    const blueDoorGraphics = this.add.graphics();
    blueDoorGraphics.fillStyle(0x1565c0, 1);
    blueDoorGraphics.fillRect(0, 0, 32, 32);
    blueDoorGraphics.fillStyle(0x0d47a1, 1);
    blueDoorGraphics.fillRect(4, 4, 24, 24);
    blueDoorGraphics.fillStyle(0xffd600, 1);
    blueDoorGraphics.fillCircle(22, 16, 3);
    blueDoorGraphics.lineStyle(2, 0x1976d2, 1);
    blueDoorGraphics.strokeRect(6, 6, 20, 20);
    blueDoorGraphics.generateTexture('door_blue', 32, 32);
    blueDoorGraphics.destroy();

    // Green door (requires key 3)
    const greenDoorGraphics = this.add.graphics();
    greenDoorGraphics.fillStyle(0x2e7d32, 1);
    greenDoorGraphics.fillRect(0, 0, 32, 32);
    greenDoorGraphics.fillStyle(0x1b5e20, 1);
    greenDoorGraphics.fillRect(4, 4, 24, 24);
    greenDoorGraphics.fillStyle(0xffd600, 1);
    greenDoorGraphics.fillCircle(22, 16, 3);
    greenDoorGraphics.lineStyle(2, 0x43a047, 1);
    greenDoorGraphics.strokeRect(6, 6, 20, 20);
    greenDoorGraphics.generateTexture('door_green', 32, 32);
    greenDoorGraphics.destroy();
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
