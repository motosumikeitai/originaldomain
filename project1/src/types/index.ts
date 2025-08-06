export interface Coin {
  id: string;
  value: number;
  name: string;
  image: string;
  color: string;
}

export interface TrayItem {
  id: string;
  coin: Coin;
  position: { x: number; y: number };
}

export type GameMode = 'conversion' | 'tray' | 'challenge';

export interface Challenge {
  targetAmount: number;
  description: string;
} 