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
    const palette = {
      panelDark: 0x030814,
      panelMid: 0x0f1f35,
      neonCyan: 0x19fff5,
      neonPink: 0xff3cfb,
      neonGreen: 0x6cff6f,
      neonYellow: 0xfff56c,
      neonOrange: 0xff8a4d,
      neonBlue: 0x4fd1ff,
      accent: 0x152b40
    };

    // Hacker avatar with neon visor and circuitry body
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(palette.panelDark, 1);
    playerGraphics.fillRoundedRect(4, 4, 24, 24, 8);
    playerGraphics.lineStyle(2, palette.neonCyan, 1);
    playerGraphics.strokeRoundedRect(4, 4, 24, 24, 8);
    // Visor
    playerGraphics.fillStyle(palette.neonPink, 1);
    playerGraphics.fillRoundedRect(8, 10, 16, 6, 3);
    playerGraphics.fillStyle(palette.panelDark, 1);
    playerGraphics.fillRoundedRect(10, 12, 12, 2, 1);
    // Circuit chest symbol
    playerGraphics.lineStyle(2, palette.neonGreen, 1);
    playerGraphics.beginPath();
    playerGraphics.moveTo(10, 20);
    playerGraphics.lineTo(16, 24);
    playerGraphics.lineTo(22, 18);
    playerGraphics.strokePath();
    playerGraphics.generateTexture('player', 32, 32);
    playerGraphics.destroy();

    // Neon grass becomes "data turf" with circuit traces
    const grassGraphics = this.add.graphics();
    grassGraphics.fillStyle(0x04121a, 1);
    grassGraphics.fillRect(0, 0, 32, 32);
    grassGraphics.lineStyle(1, palette.neonGreen, 0.3);
    for (let i = 0; i < 4; i++) {
      grassGraphics.strokeRect(2 + i * 6, 2 + (i % 2) * 3, 6, 24);
    }
    grassGraphics.lineStyle(1, palette.neonCyan, 0.5);
    grassGraphics.strokeRect(1, 1, 30, 30);
    grassGraphics.generateTexture('grass', 32, 32);
    grassGraphics.destroy();

    // Path tile becomes glowing circuitry lane
    const pathGraphics = this.add.graphics();
    pathGraphics.fillStyle(palette.panelMid, 1);
    pathGraphics.fillRect(0, 0, 32, 32);
    pathGraphics.lineStyle(3, palette.neonCyan, 1);
    pathGraphics.beginPath();
    pathGraphics.moveTo(4, 28);
    pathGraphics.lineTo(12, 20);
    pathGraphics.lineTo(20, 24);
    pathGraphics.lineTo(28, 12);
    pathGraphics.strokePath();
    pathGraphics.lineStyle(1, palette.neonPink, 0.8);
    pathGraphics.strokeRect(2, 2, 28, 28);
    pathGraphics.generateTexture('path', 32, 32);
    pathGraphics.destroy();

    // Water tile becomes an energy pool
    const waterGraphics = this.add.graphics();
    waterGraphics.fillStyle(0x04132c, 1);
    waterGraphics.fillRect(0, 0, 32, 32);
    waterGraphics.fillStyle(palette.neonBlue, 0.7);
    waterGraphics.fillCircle(16, 16, 12);
    waterGraphics.lineStyle(2, palette.neonCyan, 1);
    waterGraphics.strokeCircle(16, 16, 12);
    waterGraphics.lineStyle(1, palette.neonPink, 1);
    waterGraphics.strokeCircle(16, 16, 6);
    waterGraphics.generateTexture('water', 32, 32);
    waterGraphics.destroy();

    // Tree becomes a glowing data obelisk
    const treeGraphics = this.add.graphics();
    treeGraphics.fillStyle(palette.panelDark, 1);
    treeGraphics.fillRect(12, 8, 8, 20);
    treeGraphics.lineStyle(2, palette.neonGreen, 1);
    treeGraphics.strokeRect(12, 8, 8, 20);
    treeGraphics.fillStyle(palette.neonGreen, 0.3);
    treeGraphics.fillCircle(16, 8, 8);
    treeGraphics.lineStyle(1, palette.neonGreen, 1);
    treeGraphics.strokeCircle(16, 8, 8);
    treeGraphics.generateTexture('tree', 32, 32);
    treeGraphics.destroy();

    // Rock becomes a power capacitor node
    const rockGraphics = this.add.graphics();
    rockGraphics.fillStyle(palette.panelMid, 1);
    rockGraphics.beginPath();
    rockGraphics.moveTo(4, 20);
    rockGraphics.lineTo(10, 8);
    rockGraphics.lineTo(22, 6);
    rockGraphics.lineTo(28, 18);
    rockGraphics.lineTo(20, 26);
    rockGraphics.closePath();
    rockGraphics.fillPath();
    rockGraphics.lineStyle(2, palette.neonOrange, 1);
    rockGraphics.strokePath();
    rockGraphics.lineStyle(1, palette.neonYellow, 1);
    rockGraphics.beginPath();
    rockGraphics.moveTo(12, 14);
    rockGraphics.lineTo(20, 18);
    rockGraphics.lineTo(16, 22);
    rockGraphics.strokePath();
    rockGraphics.generateTexture('rock', 32, 32);
    rockGraphics.destroy();

    // Key becomes a neon circuit keycard
    const keyGraphics = this.add.graphics();
    keyGraphics.fillStyle(palette.panelMid, 1);
    keyGraphics.fillRoundedRect(4, 8, 24, 16, 4);
    keyGraphics.lineStyle(2, palette.neonYellow, 1);
    keyGraphics.strokeRoundedRect(4, 8, 24, 16, 4);
    keyGraphics.fillStyle(palette.neonCyan, 1);
    keyGraphics.fillRect(18, 11, 6, 10);
    keyGraphics.fillStyle(palette.neonPink, 1);
    keyGraphics.fillCircle(12, 16, 3);
    keyGraphics.generateTexture('key', 32, 32);
    keyGraphics.destroy();

    // Gate becomes an energy firewall
    const gateGraphics = this.add.graphics();
    gateGraphics.fillStyle(palette.panelDark, 1);
    gateGraphics.fillRect(0, 0, 32, 32);
    gateGraphics.lineStyle(2, palette.neonPink, 1);
    gateGraphics.strokeRect(2, 2, 28, 28);
    gateGraphics.lineStyle(2, palette.neonCyan, 1);
    gateGraphics.beginPath();
    gateGraphics.moveTo(8, 8);
    gateGraphics.lineTo(24, 24);
    gateGraphics.moveTo(24, 8);
    gateGraphics.lineTo(8, 24);
    gateGraphics.strokePath();
    gateGraphics.generateTexture('gate', 32, 32);
    gateGraphics.destroy();

    // Neon goal glyph
    const goalGraphics = this.add.graphics();
    goalGraphics.fillStyle(palette.neonYellow, 0.8);
    this.drawStar(goalGraphics, 16, 16, 5, 12, 6);
    goalGraphics.lineStyle(2, palette.neonOrange, 1);
    this.drawStar(goalGraphics, 16, 16, 5, 12, 6, true);
    goalGraphics.lineStyle(1, palette.neonPink, 1);
    goalGraphics.strokeCircle(16, 16, 14);
    goalGraphics.generateTexture('goal', 32, 32);
    goalGraphics.destroy();

    // Glowing waypoint beacon
    const waypointGraphics = this.add.graphics();
    waypointGraphics.fillStyle(palette.neonCyan, 0.15);
    waypointGraphics.fillCircle(16, 16, 14);
    waypointGraphics.fillStyle(palette.neonCyan, 0.4);
    waypointGraphics.fillCircle(16, 16, 10);
    waypointGraphics.fillStyle(palette.neonCyan, 0.8);
    waypointGraphics.fillCircle(16, 16, 4);
    waypointGraphics.lineStyle(2, palette.neonPink, 0.8);
    waypointGraphics.strokeCircle(16, 16, 14);
    waypointGraphics.generateTexture('waypoint', 32, 32);
    waypointGraphics.destroy();

    // Bridge becomes an energy conduit
    const bridgeGraphics = this.add.graphics();
    bridgeGraphics.fillStyle(0x031120, 1);
    bridgeGraphics.fillRect(0, 0, 32, 32);
    bridgeGraphics.lineStyle(3, palette.neonCyan, 1);
    bridgeGraphics.beginPath();
    bridgeGraphics.moveTo(4, 0);
    bridgeGraphics.lineTo(12, 32);
    bridgeGraphics.moveTo(20, 0);
    bridgeGraphics.lineTo(28, 32);
    bridgeGraphics.strokePath();
    bridgeGraphics.lineStyle(1, palette.neonPink, 0.8);
    bridgeGraphics.strokeRect(0, 0, 32, 32);
    bridgeGraphics.generateTexture('bridge', 32, 32);
    bridgeGraphics.destroy();

    // Helper to draw neon arrows
    const drawArrow = (graphics: Phaser.GameObjects.Graphics, direction: 'right' | 'left' | 'up' | 'down') => {
      graphics.fillStyle(palette.panelDark, 1);
      graphics.fillRect(0, 0, 32, 32);
      graphics.lineStyle(2, palette.neonPink, 1);
      graphics.strokeRect(2, 2, 28, 28);
      graphics.fillStyle(palette.neonCyan, 1);
      graphics.beginPath();
      if (direction === 'right') {
        graphics.moveTo(8, 10);
        graphics.lineTo(22, 16);
        graphics.lineTo(8, 22);
      } else if (direction === 'left') {
        graphics.moveTo(24, 10);
        graphics.lineTo(10, 16);
        graphics.lineTo(24, 22);
      } else if (direction === 'up') {
        graphics.moveTo(10, 22);
        graphics.lineTo(16, 8);
        graphics.lineTo(22, 22);
      } else {
        graphics.moveTo(10, 10);
        graphics.lineTo(16, 24);
        graphics.lineTo(22, 10);
      }
      graphics.closePath();
      graphics.fillPath();
    };

    const oneWayRightGraphics = this.add.graphics();
    drawArrow(oneWayRightGraphics, 'right');
    oneWayRightGraphics.generateTexture('oneway_right', 32, 32);
    oneWayRightGraphics.destroy();

    const oneWayLeftGraphics = this.add.graphics();
    drawArrow(oneWayLeftGraphics, 'left');
    oneWayLeftGraphics.generateTexture('oneway_left', 32, 32);
    oneWayLeftGraphics.destroy();

    const oneWayUpGraphics = this.add.graphics();
    drawArrow(oneWayUpGraphics, 'up');
    oneWayUpGraphics.generateTexture('oneway_up', 32, 32);
    oneWayUpGraphics.destroy();

    const oneWayDownGraphics = this.add.graphics();
    drawArrow(oneWayDownGraphics, 'down');
    oneWayDownGraphics.generateTexture('oneway_down', 32, 32);
    oneWayDownGraphics.destroy();

    // Create locked door sprites with neon trims
    const createDoor = (key: string, baseColor: number) => {
      const doorGraphics = this.add.graphics();
      doorGraphics.fillStyle(palette.panelDark, 1);
      doorGraphics.fillRect(0, 0, 32, 32);
      doorGraphics.fillStyle(baseColor, 0.8);
      doorGraphics.fillRoundedRect(4, 4, 24, 24, 4);
      doorGraphics.lineStyle(2, baseColor, 1);
      doorGraphics.strokeRoundedRect(4, 4, 24, 24, 4);
      doorGraphics.lineStyle(2, palette.neonYellow, 1);
      doorGraphics.strokeCircle(22, 16, 4);
      doorGraphics.generateTexture(key, 32, 32);
      doorGraphics.destroy();
    };

    createDoor('door_red', 0xff3366);
    createDoor('door_blue', 0x3366ff);
    createDoor('door_green', 0x33ff99);
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
