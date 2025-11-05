import Phaser from 'phaser';
import { Player } from '../entities/Player';
import type { VictoryData } from './VictoryScene';
import { SoundManager } from '../utils/SoundManager';

interface Collectible {
  sprite: Phaser.GameObjects.Sprite;
  type: string;
  id: number;
}

export class Level1Scene extends Phaser.Scene {
  private player!: Player;
  private tilemap!: number[][];
  private tileSprites: Phaser.GameObjects.Sprite[][] = [];
  private collectibles: Collectible[] = [];
  private keysCollected: number = 0;
  private soundManager!: SoundManager;

  // Progress tracking
  private moveCount: number = 0;
  private startTime: number = 0;
  private keysUsed = { h: 0, j: 0, k: 0, l: 0 };
  private mistakes: number = 0;

  // Tutorial
  private tutorialText!: Phaser.GameObjects.Text;
  private tutorialBox!: Phaser.GameObjects.Rectangle;
  private currentPhase: number = 0;
  private waypoint!: Phaser.GameObjects.Sprite | null;

  // HUD
  private moveText!: Phaser.GameObjects.Text;
  private timeText!: Phaser.GameObjects.Text;
  private keysText!: Phaser.GameObjects.Text;
  private lastKeyText!: Phaser.GameObjects.Text;
  private hjklDisplay!: Phaser.GameObjects.Container;

  // Tile types
  private readonly TILE_GRASS = 0;
  private readonly TILE_PATH = 1;
  private readonly TILE_WATER = 2;
  private readonly TILE_TREE = 3;
  private readonly TILE_ROCK = 4;
  private readonly TILE_GATE = 5;

  constructor() {
    super({ key: 'Level1Scene' });
  }

  create() {
    this.startTime = Math.floor(this.time.now / 1000);
    this.moveCount = 0;
    this.keysUsed = { h: 0, j: 0, k: 0, l: 0 };
    this.mistakes = 0;
    this.keysCollected = 0;
    this.currentPhase = 0;
    this.collectibles = [];

    // Initialize sound manager
    this.soundManager = new SoundManager();

    // Create the level map
    this.createLevel();

    // Create player at start position (tile 2, 2)
    this.player = new Player(this, 2 * 32 + 16, 2 * 32 + 16);

    // Set up event listeners
    this.events.on('player:moveAttempt', this.handleMoveAttempt, this);
    this.events.on('player:moveComplete', this.handleMoveComplete, this);

    // Set up keyboard input
    this.setupInput();

    // Create HUD
    this.createHUD();

    // Show initial tutorial
    this.showTutorial(
      'Welcome to Vim Quest!\n\nUse these keys to move:\nh ← | j ↓ | k ↑ | l →\n\nNavigate to the glowing marker!'
    );

    // Create first waypoint
    this.createWaypoint(7, 5);

    // Set up camera
    this.cameras.main.setBounds(0, 0, this.tilemap[0].length * 32, this.tilemap.length * 32);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  update() {
    // Update time display
    const currentTime = Math.floor(this.time.now / 1000);
    const elapsed = currentTime - this.startTime;
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    this.timeText.setText(`Time: ${minutes}:${seconds.toString().padStart(2, '0')}`);
  }

  private createLevel() {
    // Create a 40x22 tile map for Level 1
    // Layout follows the design document with all phases
    this.tilemap = [
      // Row 0-2: Top border and start area
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3],
      [3, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],

      // Row 3-5: Tutorial area and path to tree maze
      [3, 0, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3],

      // Row 6-10: Tree maze (focus on k and h)
      [3, 3, 3, 0, 0, 3, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [3, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 3, 3, 0, 0, 0, 3, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 3, 0, 3, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3],
      [3, 3, 0, 0, 0, 3, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3],

      // Row 11-14: Lake area (focus on l and navigating around)
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],

      // Row 15-17: Rock garden (focus on j - down movement)
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 3],

      // Row 18-19: Final approach to goal
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3],

      // Row 20-21: Bottom area with goal
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ];

    // Render tilemap
    this.tileSprites = [];
    for (let y = 0; y < this.tilemap.length; y++) {
      this.tileSprites[y] = [];
      for (let x = 0; x < this.tilemap[y].length; x++) {
        const tileType = this.tilemap[y][x];
        const sprite = this.add.sprite(x * 32, y * 32, this.getTileTexture(tileType));
        sprite.setOrigin(0);
        sprite.setDepth(0);
        this.tileSprites[y][x] = sprite;

        // Add water animation
        if (tileType === this.TILE_WATER) {
          this.tweens.add({
            targets: sprite,
            alpha: 0.7,
            duration: 1000,
            yoyo: true,
            repeat: -1
          });
        }
      }
    }

    // Place key 1 at end of tree maze (tile 13, 10)
    this.createCollectible(13, 10, 'key', 1);

    // Place key 2 in rock garden (tile 20, 15)
    this.createCollectible(20, 15, 'key', 2);

    // Place goal at end (tile 35, 20)
    this.createCollectible(35, 20, 'goal', 0);
  }

  private getTileTexture(tileType: number): string {
    switch (tileType) {
      case this.TILE_GRASS:
        return 'grass';
      case this.TILE_PATH:
        return 'path';
      case this.TILE_WATER:
        return 'water';
      case this.TILE_TREE:
        return 'tree';
      case this.TILE_ROCK:
        return 'rock';
      case this.TILE_GATE:
        return 'gate';
      default:
        return 'grass';
    }
  }

  private createCollectible(x: number, y: number, type: string, id: number) {
    const sprite = this.add.sprite(x * 32 + 16, y * 32 + 16, type);
    sprite.setDepth(5);

    // Add bobbing animation
    this.tweens.add({
      targets: sprite,
      y: sprite.y - 5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Add glow effect for goal
    if (type === 'goal') {
      this.tweens.add({
        targets: sprite,
        scale: 1.2,
        duration: 800,
        yoyo: true,
        repeat: -1
      });
    }

    this.collectibles.push({ sprite, type, id });
  }

  private createWaypoint(x: number, y: number) {
    if (this.waypoint) {
      this.waypoint.destroy();
    }

    this.waypoint = this.add.sprite(x * 32 + 16, y * 32 + 16, 'waypoint');
    this.waypoint.setDepth(4);
    this.waypoint.setAlpha(0.7);

    // Pulse animation
    this.tweens.add({
      targets: this.waypoint,
      scale: 1.3,
      alpha: 0.3,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });
  }

  private setupInput() {
    // Prevent default browser behavior for vim keys
    this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (['h', 'j', 'k', 'l', 'r', 'R', ' ', 'Escape'].includes(event.key)) {
        event.preventDefault();
      }
    });

    // Movement keys
    this.input.keyboard?.on('keydown-H', () => this.player.moveLeft());
    this.input.keyboard?.on('keydown-J', () => this.player.moveDown());
    this.input.keyboard?.on('keydown-K', () => this.player.moveUp());
    this.input.keyboard?.on('keydown-L', () => this.player.moveRight());

    // Restart
    this.input.keyboard?.on('keydown-R', () => {
      this.scene.restart();
    });

    // Pause (Escape)
    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.pause();
      this.scene.launch('PauseScene');
    });

    // Help (?)
    this.input.keyboard?.on('keydown-SLASH', () => {
      this.scene.pause();
      this.scene.launch('HelpScene');
    });
  }

  private handleMoveAttempt(data: { fromX: number; fromY: number; toX: number; toY: number; key: string }) {
    const { toX, toY, key } = data;

    // Track key usage
    this.keysUsed[key as keyof typeof this.keysUsed]++;
    this.lastKeyText.setText(`Last key: ${key}`);

    // Update hjkl display
    this.updateHjklDisplay(key);

    // Check if move is valid
    if (!this.isValidMove(toX, toY)) {
      this.mistakes++;
      this.player.showInvalidMove();
      this.soundManager.playErrorSound();
      return;
    }

    // Execute the move
    this.player.executeMoveToTile(toX, toY);
    this.moveCount++;
    this.moveText.setText(`Moves: ${this.moveCount}`);
    this.soundManager.playMoveSound();

    // Create movement particle trail
    this.createMovementTrail(data.fromX * 32 + 16, data.fromY * 32 + 16);
  }

  private handleMoveComplete(data: { tileX: number; tileY: number }) {
    const { tileX, tileY } = data;

    // Check for collectibles
    this.checkCollectibles(tileX, tileY);

    // Check for waypoint
    if (this.waypoint && tileX === Math.floor(this.waypoint.x / 32) && tileY === Math.floor(this.waypoint.y / 32)) {
      this.waypoint.destroy();
      this.waypoint = null;
      this.advancePhase();
    }

    // Check for water damage
    if (this.tilemap[tileY] && this.tilemap[tileY][tileX] === this.TILE_WATER) {
      this.createSplashEffect(tileX * 32 + 16, tileY * 32 + 16);
    }
  }

  private isValidMove(tileX: number, tileY: number): boolean {
    // Check bounds
    if (tileY < 0 || tileY >= this.tilemap.length || tileX < 0 || tileX >= this.tilemap[0].length) {
      return false;
    }

    const tileType = this.tilemap[tileY][tileX];

    // Check blocking tiles
    if (tileType === this.TILE_TREE || tileType === this.TILE_ROCK) {
      return false;
    }

    // Check gate (needs keys)
    if (tileType === this.TILE_GATE && this.keysCollected < 2) {
      return false;
    }

    return true;
  }

  private checkCollectibles(tileX: number, tileY: number) {
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const collectible = this.collectibles[i];
      const collectibleX = Math.floor(collectible.sprite.x / 32);
      const collectibleY = Math.floor(collectible.sprite.y / 32);

      if (collectibleX === tileX && collectibleY === tileY) {
        if (collectible.type === 'key') {
          this.collectKey(collectible);
        } else if (collectible.type === 'goal') {
          this.reachGoal();
        }
        this.collectibles.splice(i, 1);
      }
    }
  }

  private collectKey(collectible: Collectible) {
    this.keysCollected++;
    this.keysText.setText(`Keys: ${this.keysCollected}/2`);
    this.soundManager.playCollectSound();

    // Particle effect
    this.createCollectEffect(collectible.sprite.x, collectible.sprite.y);

    // Remove sprite
    collectible.sprite.destroy();

    // Update tutorial
    if (this.keysCollected === 1) {
      this.showTutorial('Great! You found Key 1!\n\nNow navigate through the rock garden\nusing j (down) to find Key 2.');
    } else if (this.keysCollected === 2) {
      this.showTutorial('Excellent! You have both keys!\n\nNow you can pass through the gate.\nHead to the golden star to complete the level!');
      // Open gate
      this.openGate();
    }
  }

  private openGate() {
    // Find and remove gate tiles
    for (let y = 0; y < this.tilemap.length; y++) {
      for (let x = 0; x < this.tilemap[y].length; x++) {
        if (this.tilemap[y][x] === this.TILE_GATE) {
          this.tilemap[y][x] = this.TILE_PATH;
          this.tileSprites[y][x].setTexture('path');

          // Flash effect
          this.tweens.add({
            targets: this.tileSprites[y][x],
            alpha: 0.3,
            duration: 100,
            yoyo: true,
            repeat: 3
          });
        }
      }
    }
  }

  private reachGoal() {
    // Victory!
    const currentTime = Math.floor(this.time.now / 1000);
    const totalTime = currentTime - this.startTime;

    const victoryData: VictoryData = {
      moves: this.moveCount,
      time: totalTime,
      keysUsed: this.keysUsed,
      mistakes: this.mistakes
    };

    // Play victory sound
    this.soundManager.playVictorySound();

    // Celebration effect
    this.createVictoryEffect(this.player.x, this.player.y);

    // Transition to victory scene after short delay
    this.time.delayedCall(1500, () => {
      this.scene.start('VictoryScene', victoryData);
    });
  }

  private advancePhase() {
    this.currentPhase++;

    switch (this.currentPhase) {
      case 1:
        this.showTutorial('Good job! Now navigate through the tree maze.\n\nUse k (up) and h (left) to find your way!');
        this.createWaypoint(13, 10);
        break;
    }
  }

  private createHUD() {
    const hudY = 10;

    // Move counter
    this.moveText = this.add.text(10, hudY, 'Moves: 0', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#d4d4d4',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setDepth(100);

    // Time
    this.timeText = this.add.text(150, hudY, 'Time: 0:00', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#d4d4d4',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setDepth(100);

    // Keys collected
    this.keysText = this.add.text(310, hudY, 'Keys: 0/2', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#ffd600',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 5 }
    }).setScrollFactor(0).setDepth(100);

    // Last key pressed
    this.lastKeyText = this.add.text(this.cameras.main.width - 150, hudY, 'Last key: -', {
      fontFamily: 'Courier New, monospace',
      fontSize: '18px',
      color: '#42a5f5',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 5 }
    }).setOrigin(0, 0).setScrollFactor(0).setDepth(100);

    // HJKL visual display
    this.createHjklDisplay();
  }

  private createHjklDisplay() {
    this.hjklDisplay = this.add.container(this.cameras.main.width - 120, this.cameras.main.height - 120);
    this.hjklDisplay.setScrollFactor(0).setDepth(100);

    const keySize = 30;
    const spacing = 35;

    // Background
    const bg = this.add.rectangle(0, 0, 120, 100, 0x000000, 0.5);
    this.hjklDisplay.add(bg);

    // Title
    const title = this.add.text(0, -35, 'hjkl', {
      fontFamily: 'Courier New, monospace',
      fontSize: '14px',
      color: '#d4d4d4'
    }).setOrigin(0.5);
    this.hjklDisplay.add(title);

    // Keys
    const keys = [
      { key: 'h', x: -spacing, y: 0, label: '←' },
      { key: 'j', x: 0, y: spacing, label: '↓' },
      { key: 'k', x: 0, y: -spacing, label: '↑' },
      { key: 'l', x: spacing, y: 0, label: '→' }
    ];

    keys.forEach(keyData => {
      const keyBg = this.add.rectangle(keyData.x, keyData.y, keySize, keySize, 0x37474f, 1);
      keyBg.setStrokeStyle(2, 0x4ec9b0);
      keyBg.setData('key', keyData.key);
      this.hjklDisplay.add(keyBg);

      const keyText = this.add.text(keyData.x, keyData.y - 2, keyData.key, {
        fontFamily: 'Courier New, monospace',
        fontSize: '16px',
        color: '#d4d4d4',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      this.hjklDisplay.add(keyText);

      const arrow = this.add.text(keyData.x, keyData.y + 10, keyData.label, {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#888888'
      }).setOrigin(0.5);
      this.hjklDisplay.add(arrow);
    });
  }

  private updateHjklDisplay(key: string) {
    // Flash the pressed key
    this.hjklDisplay.iterate((child: Phaser.GameObjects.GameObject) => {
      if (child instanceof Phaser.GameObjects.Rectangle && child.getData('key') === key) {
        this.tweens.add({
          targets: child,
          fillColor: 0x4ec9b0,
          duration: 100,
          yoyo: true,
          onComplete: () => {
            (child as Phaser.GameObjects.Rectangle).setFillStyle(0x37474f, 1);
          }
        });
      }
    });
  }

  private showTutorial(message: string) {
    if (this.tutorialBox) {
      this.tutorialBox.destroy();
    }
    if (this.tutorialText) {
      this.tutorialText.destroy();
    }

    const centerX = this.cameras.main.width / 2;
    const centerY = 100;

    this.tutorialBox = this.add.rectangle(centerX, centerY, 600, 150, 0x1e1e1e, 0.95);
    this.tutorialBox.setStrokeStyle(3, 0x4ec9b0);
    this.tutorialBox.setScrollFactor(0);
    this.tutorialBox.setDepth(99);

    this.tutorialText = this.add.text(centerX, centerY, message, {
      fontFamily: 'Courier New, monospace',
      fontSize: '16px',
      color: '#d4d4d4',
      align: 'center',
      wordWrap: { width: 550 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

    // Auto-hide tutorial after 8 seconds
    this.time.delayedCall(8000, () => {
      if (this.tutorialBox) {
        this.tweens.add({
          targets: [this.tutorialBox, this.tutorialText],
          alpha: 0,
          duration: 500,
          onComplete: () => {
            this.tutorialBox?.destroy();
            this.tutorialText?.destroy();
          }
        });
      }
    });
  }

  private createMovementTrail(x: number, y: number) {
    const trail = this.add.circle(x, y, 8, 0xff6f00, 0.5);
    trail.setDepth(9);

    this.tweens.add({
      targets: trail,
      alpha: 0,
      scale: 2,
      duration: 300,
      onComplete: () => {
        trail.destroy();
      }
    });
  }

  private createCollectEffect(x: number, y: number) {
    // Create multiple particles
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const particle = this.add.circle(x, y, 3, 0xffd600);
      particle.setDepth(20);

      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 40,
        y: y + Math.sin(angle) * 40,
        alpha: 0,
        duration: 600,
        ease: 'Power2',
        onComplete: () => {
          particle.destroy();
        }
      });
    }
  }

  private createSplashEffect(x: number, y: number) {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const particle = this.add.circle(x, y, 2, 0x42a5f5);
      particle.setDepth(20);

      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 20,
        y: y + Math.sin(angle) * 20 - 10,
        alpha: 0,
        duration: 400,
        ease: 'Power2',
        onComplete: () => {
          particle.destroy();
        }
      });
    }
  }

  private createVictoryEffect(x: number, y: number) {
    // Create burst of particles
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const distance = 20 + Math.random() * 60;
      const particle = this.add.circle(x, y, 4, 0xffd600);
      particle.setDepth(20);

      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 2,
        duration: 1000 + Math.random() * 500,
        ease: 'Power2',
        onComplete: () => {
          particle.destroy();
        }
      });
    }
  }
}
