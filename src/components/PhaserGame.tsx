import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { gameConfig } from '../game/config';

export function PhaserGame() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the game instance
    gameRef.current = new Phaser.Game({
      ...gameConfig,
      parent: containerRef.current
    });

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="game-container"
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e'
      }}
    />
  );
}
