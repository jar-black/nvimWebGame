import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { Level1Scene } from './scenes/Level1Scene';
import { Level2Scene } from './scenes/Level2Scene';
import { Level3Scene } from './scenes/Level3Scene';
import { Level4Scene } from './scenes/Level4Scene';
import { Level5Scene } from './scenes/Level5Scene';
import { Level6Scene } from './scenes/Level6Scene';
import { VictoryScene } from './scenes/VictoryScene';
import { PauseScene } from './scenes/PauseScene';
import { HelpScene } from './scenes/HelpScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  backgroundColor: '#1e1e1e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: [BootScene, MainMenuScene, Level1Scene, Level2Scene, Level3Scene, Level4Scene, Level5Scene, Level6Scene, VictoryScene, PauseScene, HelpScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    pixelArt: true,
    antialias: false
  }
};
