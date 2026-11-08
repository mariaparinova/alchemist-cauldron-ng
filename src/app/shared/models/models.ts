export interface CauldronStats {
  temperature: number;
  density: number;
  magicPower: number;
}

export type GameStatus = 'menu' | 'playing' | 'paused' | 'game-over';
