import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private isMoving: boolean = false;
  private currentTileX: number = 0;
  private currentTileY: number = 0;
  private countPrefix: number = 0;
  private countResetTimer?: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5);
    this.setDepth(10);

    // Store grid position
    this.currentTileX = Math.floor(x / 32);
    this.currentTileY = Math.floor(y / 32);
  }

  addToCountPrefix(digit: number) {
    // Add digit to count prefix (max 2 digits)
    if (this.countPrefix < 10) {
      this.countPrefix = this.countPrefix * 10 + digit;
    }

    // Reset count prefix after 2 seconds of no input
    if (this.countResetTimer) {
      this.countResetTimer.destroy();
    }
    this.countResetTimer = this.scene.time.delayedCall(2000, () => {
      this.countPrefix = 0;
      this.scene.events.emit('player:countPrefixChanged', 0);
    });

    // Emit event for UI update
    this.scene.events.emit('player:countPrefixChanged', this.countPrefix);
  }

  getCountPrefix(): number {
    return this.countPrefix;
  }

  moveLeft(count?: number) {
    if (!this.isMoving) {
      const moveCount = count || this.countPrefix || 1;
      this.resetCountPrefix();
      this.attemptMove(-1, 0, 'h', moveCount);
    }
  }

  moveRight(count?: number) {
    if (!this.isMoving) {
      const moveCount = count || this.countPrefix || 1;
      this.resetCountPrefix();
      this.attemptMove(1, 0, 'l', moveCount);
    }
  }

  moveUp(count?: number) {
    if (!this.isMoving) {
      const moveCount = count || this.countPrefix || 1;
      this.resetCountPrefix();
      this.attemptMove(0, -1, 'k', moveCount);
    }
  }

  moveDown(count?: number) {
    if (!this.isMoving) {
      const moveCount = count || this.countPrefix || 1;
      this.resetCountPrefix();
      this.attemptMove(0, 1, 'j', moveCount);
    }
  }

  private resetCountPrefix() {
    this.countPrefix = 0;
    if (this.countResetTimer) {
      this.countResetTimer.destroy();
      this.countResetTimer = undefined;
    }
    this.scene.events.emit('player:countPrefixChanged', 0);
  }

  private attemptMove(dx: number, dy: number, key: string, count: number = 1) {
    const targetTileX = this.currentTileX + dx * count;
    const targetTileY = this.currentTileY + dy * count;

    // Emit event for movement attempt
    this.scene.events.emit('player:moveAttempt', {
      fromX: this.currentTileX,
      fromY: this.currentTileY,
      toX: targetTileX,
      toY: targetTileY,
      key: key,
      count: count,
      dx: dx,
      dy: dy
    });
  }

  executeMoveToTile(tileX: number, tileY: number) {
    if (this.isMoving) return;

    this.isMoving = true;
    this.currentTileX = tileX;
    this.currentTileY = tileY;

    const targetX = tileX * 32 + 16;
    const targetY = tileY * 32 + 16;

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: 150,
      ease: 'Power2',
      onComplete: () => {
        this.isMoving = false;
        this.scene.events.emit('player:moveComplete', {
          tileX: this.currentTileX,
          tileY: this.currentTileY
        });
      }
    });
  }

  showInvalidMove() {
    // Flash red
    this.scene.tweens.add({
      targets: this,
      alpha: 0.5,
      tint: 0xff0000,
      duration: 100,
      yoyo: true,
      onComplete: () => {
        this.clearTint();
        this.setAlpha(1);
      }
    });
  }

  getTilePosition(): { x: number; y: number } {
    return { x: this.currentTileX, y: this.currentTileY };
  }

  isCurrentlyMoving(): boolean {
    return this.isMoving;
  }
}
