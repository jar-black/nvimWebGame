import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private isMoving: boolean = false;
  private currentTileX: number = 0;
  private currentTileY: number = 0;

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

  moveLeft() {
    if (!this.isMoving) {
      this.attemptMove(-1, 0, 'h');
    }
  }

  moveRight() {
    if (!this.isMoving) {
      this.attemptMove(1, 0, 'l');
    }
  }

  moveUp() {
    if (!this.isMoving) {
      this.attemptMove(0, -1, 'k');
    }
  }

  moveDown() {
    if (!this.isMoving) {
      this.attemptMove(0, 1, 'j');
    }
  }

  private attemptMove(dx: number, dy: number, key: string) {
    const targetTileX = this.currentTileX + dx;
    const targetTileY = this.currentTileY + dy;

    // Emit event for movement attempt
    this.scene.events.emit('player:moveAttempt', {
      fromX: this.currentTileX,
      fromY: this.currentTileY,
      toX: targetTileX,
      toY: targetTileY,
      key: key
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
